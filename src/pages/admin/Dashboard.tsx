import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Image, FolderOpen, Star } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalWorks: 0,
    featuredWorks: 0,
    categories: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [worksResult, featuredResult, categoriesResult] = await Promise.all([
          supabase.from("portfolio_works").select("id", { count: "exact" }),
          supabase.from("portfolio_works").select("id", { count: "exact" }).eq("is_featured", true),
          supabase.from("portfolio_categories").select("id", { count: "exact" }),
        ]);

        setStats({
          totalWorks: worksResult.count || 0,
          featuredWorks: featuredResult.count || 0,
          categories: categoriesResult.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Works", value: stats.totalWorks, icon: Image, color: "text-primary" },
    { title: "Featured Works", value: stats.featuredWorks, icon: Star, color: "text-yellow-500" },
    { title: "Categories", value: stats.categories, icon: FolderOpen, color: "text-green-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your portfolio admin panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index} variant="glass">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold text-foreground">
                  {isLoading ? (
                    <div className="h-9 w-16 bg-muted animate-pulse rounded" />
                  ) : (
                    stat.value
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/admin/works"
                className="p-4 rounded-lg bg-card/60 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
              >
                <Image className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  Manage Works
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add, edit, or remove portfolio items
                </p>
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-card/60 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
              >
                <Star className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  View Portfolio
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  See your public portfolio site
                </p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
