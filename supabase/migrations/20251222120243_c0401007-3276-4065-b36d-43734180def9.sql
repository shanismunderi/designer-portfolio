-- Ensure role/profile assignment without triggers on auth schema

CREATE OR REPLACE FUNCTION public.ensure_user_bootstrap()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  role_count integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Create profile if missing
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    auth.uid(),
    (SELECT email FROM auth.jwt()),
    NULL
  )
  ON CONFLICT (id) DO NOTHING;

  -- Assign role if missing (first-ever user becomes admin)
  SELECT COUNT(*) INTO role_count FROM public.user_roles;

  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = auth.uid()
  ) THEN
    IF role_count = 0 THEN
      INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin');
    ELSE
      INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'user');
    END IF;
  END IF;
END;
$$;