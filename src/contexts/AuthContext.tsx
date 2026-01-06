import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (error) {
      console.error("Error checking admin role:", error);
      return false;
    }
    return !!data;
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Defer admin check to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id).then(setIsAdmin);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        checkAdminRole(session.user.id).then(setIsAdmin);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (username: string, password: string) => {
    // Mapping username to email for Supabase Auth
    // The designated admin is 'adminziyan'
    const email = username.includes("@") ? username : `${username}@ziyan.admin`;

    // First attempt: Normal Sign In
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // If login failed and it's our specific admin account, try to register it
    // This handles the "change the admin into..." request if the account doesn't exist yet
    if (error && error.message.includes("Invalid login credentials") && username === "adminziyan" && password === "ziyan@admin") {
      console.log("Attempting to initialize admin account...");
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: "Admin Ziyan",
          },
        },
      });

      if (!signUpError) {
        // If sign up worked, try to sign in again (in case auto-login didn't happen)
        const secondAttempt = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (secondAttempt.error) {
          if (secondAttempt.error.message.includes("Email not confirmed")) {
            return { error: new Error("Admin account created! Please check your email to confirm, or disable 'Confirm Email' in Supabase project settings to finish login.") };
          }
          return { error: new Error(secondAttempt.error.message) };
        }

        // Successfully registered and signed in
        return { error: null };
      } else {
        // If sign up failed with "User already registered", then the password must be wrong
        if (signUpError.message.includes("User already registered")) {
          return { error: new Error("Invalid username or password.") };
        }
        return { error: new Error(signUpError.message) };
      }
    }

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        return { error: new Error("Please confirm your email address before logging in.") };
      }
      return { error: new Error(error.message) };
    }

    return { error: null };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
