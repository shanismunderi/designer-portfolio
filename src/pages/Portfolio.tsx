import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Lightbox } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";

import branding1 from "@/assets/portfolio/branding-1.jpg";
import branding2 from "@/assets/portfolio/branding-2.jpg";
import social1 from "@/assets/portfolio/social-1.jpg";
import print1 from "@/assets/portfolio/print-1.jpg";
import print2 from "@/assets/portfolio/print-2.jpg";
import ui1 from "@/assets/portfolio/ui-1.jpg";

const categories = ["All", "Branding", "UI/UX", "Print", "Social Media"];

const portfolioItems = [
  { id: 1, title: "Evroniere Wine Branding", category: "Branding", image: branding1, description: "Complete brand identity for luxury wine brand" },
  { id: 2, title: "Premium Cosmetics", category: "Branding", image: branding2, description: "Elegant packaging design for skincare line" },
  { id: 3, title: "Social Campaign", category: "Social Media", image: social1, description: "Vibrant social media marketing campaign" },
  { id: 4, title: "Fashion Editorial", category: "Print", image: print1, description: "Magazine spread for luxury fashion brand" },
  { id: 5, title: "Art Exhibition Poster", category: "Print", image: print2, description: "Bold geometric poster for gallery exhibition" },
  { id: 6, title: "Analytics Dashboard", category: "UI/UX", image: ui1, description: "Modern dark theme dashboard interface" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  const lightboxImages = filteredItems.map((item) => ({
    src: item.image,
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
            {categories.map((category) => (
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
            {filteredItems.map((item, index) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 hover-lift cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-sm text-primary font-medium">{item.category}</span>
                  <h3 className="text-xl font-display font-bold text-foreground mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                </div>
              </article>
            ))}
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
