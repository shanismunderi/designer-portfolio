import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Award, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import heroBg from "@/assets/hero-bg.jpg";
import branding1 from "@/assets/portfolio/branding-1.jpg";
import social1 from "@/assets/portfolio/social-1.jpg";
import print1 from "@/assets/portfolio/print-1.jpg";
import ui1 from "@/assets/portfolio/ui-1.jpg";

const featuredWorks = [
  { id: 1, title: "Evroniere Wine", category: "Branding", image: branding1 },
  { id: 2, title: "Social Media Campaign", category: "Social Media", image: social1 },
  { id: 3, title: "Fashion Editorial", category: "Print", image: print1 },
  { id: 4, title: "Dashboard UI", category: "UI/UX", image: ui1 },
];

const stats = [
  { icon: Award, value: "150+", label: "Projects Completed" },
  { icon: Users, value: "80+", label: "Happy Clients" },
  { icon: Sparkles, value: "8+", label: "Years Experience" },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Abstract geometric art background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />

        {/* Content */}
        <div className="relative container mx-auto px-6 pt-32 pb-20 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-6 animate-fade-in">
              Creative Design Studio
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-tight mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Crafting{" "}
              <span className="text-gradient">Visual</span>
              <br />
              Experiences
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Transforming ideas into stunning visual identities that captivate audiences and elevate brands.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" asChild>
                <Link to="/portfolio">
                  View Portfolio
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/contact">Let's Talk</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-4xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <SectionHeader
            label="Portfolio"
            title="Featured Works"
            description="A selection of recent projects showcasing creative excellence and attention to detail."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {featuredWorks.map((work, index) => (
              <Link
                key={work.id}
                to="/portfolio"
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-sm text-primary font-medium">{work.category}</span>
                  <h3 className="text-2xl font-display font-bold text-foreground mt-1">{work.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="gold" size="lg" asChild>
              <Link to="/portfolio">
                View All Works
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
        
        <div className="container mx-auto px-6 relative">
          <Card variant="glass" className="p-12 md:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Start Your{" "}
              <span className="text-gradient">Project?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's collaborate to create something extraordinary. Get in touch and let's discuss your vision.
            </p>
            <Button variant="hero" asChild>
              <Link to="/contact">
                Get in Touch
                <ArrowRight size={18} />
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
