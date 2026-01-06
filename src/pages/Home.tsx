import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Award, Users, Camera } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { AdobeCarousel } from "@/components/ui/adobe-carousel";
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
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse-soft" />
          <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] animate-float" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float-delayed" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

        {/* Content */}
        <div className="relative container mx-auto px-6 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Creative Design Studio</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Crafting{" "}
                <span className="text-gradient">Digital</span>
                <br />
                <span className="text-gradient-secondary">Experiences</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                I transform ideas into stunning visual identities that captivate audiences and elevate brands to new heights.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 group">
                  <Link to="/portfolio" className="flex items-center gap-2">
                    View Portfolio
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="glass border-border/50 hover:border-primary/50 transition-all">
                  <Link to="/contact">Let's Talk</Link>
                </Button>
              </div>

              {/* Adobe Tools Carousel */}
              <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <p className="text-sm text-muted-foreground mb-6">Tools I Master</p>
                <AdobeCarousel className="max-w-lg" />
              </div>
            </div>

            {/* Right Content - Profile Picture Placeholder */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                {/* Decorative Ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-spin-slow opacity-20" />
                
                {/* Profile Container */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full glass-card overflow-hidden animate-morph border-2 border-primary/20">
                  {/* Placeholder for profile picture */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <Camera size={48} className="mx-auto mb-4 text-primary/50" />
                      <p className="text-muted-foreground text-sm">Your Photo Here</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements - Adobe Icons */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-gradient-to-br from-[#31A8FF] to-[#001E36] flex items-center justify-center animate-float shadow-lg">
                  <span className="text-2xl font-bold text-white">Ps</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-xl bg-gradient-to-br from-[#FF9A00] to-[#330000] flex items-center justify-center animate-float-delayed shadow-lg">
                  <span className="text-2xl font-bold text-white">Ai</span>
                </div>
                <div className="absolute top-1/2 -right-8 w-16 h-16 rounded-lg bg-gradient-to-br from-[#FF3366] to-[#49021F] flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: "1s" }}>
                  <span className="text-xl font-bold text-white">Id</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {stats.map((stat, index) => (
              <Card key={index} variant="glass" className="p-6 text-center hover-lift hover-glow transition-all duration-500">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
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
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-6 relative">
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
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover-lift glass-card"
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
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all group">
              <Link to="/portfolio" className="flex items-center gap-2">
                View All Works
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
        </div>
        
        <div className="container mx-auto px-6 relative">
          <Card variant="glass" className="p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 relative">
              Ready to Start Your{" "}
              <span className="text-gradient">Project?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative">
              Let's collaborate to create something extraordinary. Get in touch and let's discuss your vision.
            </p>
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all group relative">
              <Link to="/contact" className="flex items-center gap-2">
                Get in Touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
