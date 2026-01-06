import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Lightbox } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface Work {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  image_url: string;
  tags: string[];
  is_featured: boolean;
  sort_order: number;
}

interface Category {
  id: string;
  name: string;
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [works, setWorks] = useState<Work[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [worksResult, categoriesResult] = await Promise.all([
          supabase.from("portfolio_works").select("*").order("sort_order"),
          supabase.from("portfolio_categories").select("*").order("name"),
        ]);

        if (worksResult.data) setWorks(worksResult.data);
        if (categoriesResult.data) setCategories(categoriesResult.data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoryNames = ["All", ...categories.map(c => c.name)];

  const filteredItems = activeCategory === "All"
    ? works
    : works.filter((item) => {
        const category = categories.find(c => c.id === item.category_id);
        return category?.name === activeCategory;
      });

  const lightboxImages = filteredItems.map((item) => ({
    src: item.image_url,
    alt: item.title,
    title: item.title,
  }));

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            label="Portfolio"
            title="Creative Works"
            description="Explore a collection of projects that showcase creativity, precision, and passion for design."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
            {categoryNames.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-card/60 backdrop-blur-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {isLoading ? (
              // Loading Skeleton
              [...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 animate-pulse" />
              ))
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 hover-lift cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-sm text-primary font-medium">
                      {categories.find(c => c.id === item.category_id)?.name}
                    </span>
                    <h3 className="text-xl font-display font-bold text-foreground mt-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-24 text-center">
                <p className="text-muted-foreground">No works found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        initialIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </Layout>
  );
}
