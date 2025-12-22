import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  Image, 
  FolderOpen, 
  Star, 
  TrendingUp, 
  Plus, 
  ExternalLink,
  Sparkles,
  BarChart3,
  Eye
} from "lucide-react";

interface RecentWork {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
  is_featured: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalWorks: 0,
    featuredWorks: 0,
    categories: 0,
  });
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [worksResult, featuredResult, categoriesResult, recentResult] = await Promise.all([
          supabase.from("portfolio_works").select("id", { count: "exact" }),
          supabase.from("portfolio_works").select("id", { count: "exact" }).eq("is_featured", true),
          supabase.from("portfolio_categories").select("id", { count: "exact" }),
          supabase.from("portfolio_works").select("id, title, image_url, created_at, is_featured").order("created_at", { ascending: false }).limit(4),
        ]);

        setStats({
          totalWorks: worksResult.count || 0,
          featuredWorks: featuredResult.count || 0,
          categories: categoriesResult.count || 0,
        });

        setRecentWorks(recentResult.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { 
      title: "Total Works", 
      value: stats.totalWorks, 
      icon: Image, 
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400",
      description: "Portfolio items"
    },
    { 
      title: "Featured Works", 
      value: stats.featuredWorks, 
      icon: Star, 
      color: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-yellow-400",
      description: "Highlighted projects"
    },
    { 
      title: "Categories", 
      value: stats.categories, 
      icon: FolderOpen, 
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
      description: "Work categories"
    },
  ];

  const quickActions = [
    {
      title: "Add New Work",
      description: "Upload a new portfolio item",
      icon: Plus,
      href: "/admin/works",
      color: "bg-primary/10 hover:bg-primary/20 border-primary/20",
      iconColor: "text-primary",
    },
    {
      title: "Manage Portfolio",
      description: "Edit or remove existing works",
      icon: Image,
      href: "/admin/works",
      color: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "View Site",
      description: "See your public portfolio",
      icon: ExternalLink,
      href: "/",
      external: true,
      color: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "View Portfolio",
      description: "Browse all portfolio items",
      icon: Eye,
      href: "/portfolio",
      external: true,
      color: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's an overview of your portfolio.
            </p>
          </div>
          <Button variant="gold" asChild>
            <Link to="/admin/works" className="flex items-center gap-2">
              <Plus size={18} />
              Add New Work
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card 
              key={index} 
              variant="glass" 
              className="relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-card/80 ${stat.iconColor}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-display font-bold text-foreground">
                  {isLoading ? (
                    <div className="h-10 w-16 bg-muted animate-pulse rounded" />
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                <TrendingUp className="absolute bottom-0 right-0 h-24 w-24 text-primary/5 -mb-4 -mr-4" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card variant="glass" className="overflow-hidden">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className={`p-6 transition-all duration-300 group ${action.color} border-b sm:border-b-0 border-border/50 last:border-b-0`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${action.color} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                    </div>
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Works */}
          <Card variant="glass" className="overflow-hidden">
            <CardHeader className="border-b border-border/50 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                Recent Works
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/works">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-muted animate-pulse rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                        <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentWorks.length === 0 ? (
                <div className="p-8 text-center">
                  <Image className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">No works yet</p>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link to="/admin/works">Add Your First Work</Link>
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {recentWorks.map((work) => (
                    <Link
                      key={work.id}
                      to="/admin/works"
                      className="flex items-center gap-4 p-4 hover:bg-card/60 transition-colors group"
                    >
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={work.image_url}
                          alt={work.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {work.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(work.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {work.is_featured && (
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card variant="glass" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-foreground">Pro Tip</h3>
                <p className="text-muted-foreground mt-1">
                  Feature your best works to showcase them prominently on your portfolio homepage. 
                  Featured works appear in the hero carousel and get more visibility.
                </p>
              </div>
              <Button variant="outline" asChild className="flex-shrink-0">
                <Link to="/admin/works">Manage Featured Works</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
