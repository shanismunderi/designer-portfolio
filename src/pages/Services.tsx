import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Layout as LayoutIcon, Printer, Share2, PenTool, Sparkles } from "lucide-react";

const services = [
  {
    icon: Printer,
    title: "Poster Making",
    description: "Eye-catching posters designed for events, promotions, and creative campaigns that grab attention.",
    features: ["Event Posters", "Promotional Posters", "Movie Posters", "Concert Posters"],
    price: "Contact for Quote",
  },
  {
    icon: PenTool,
    title: "Magazine Design",
    description: "Professional magazine layouts with compelling typography and visual hierarchy.",
    features: ["Magazine Covers", "Editorial Layouts", "Content Design", "Print-Ready Files"],
    price: "Contact for Quote",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Complete brand identity systems including logos, color palettes, typography, and brand guidelines.",
    features: ["Logo Design", "Brand Guidelines", "Color Systems", "Visual Identity"],
    price: "Contact for Quote",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Engaging social media content and campaign visuals that boost engagement and brand awareness.",
    features: ["Post Templates", "Story Designs", "Ad Creatives", "Content Strategy"],
    price: "Contact for Quote",
  },
  {
    icon: LayoutIcon,
    title: "UI/UX Design",
    description: "User-centered digital experiences for web and mobile applications that delight users.",
    features: ["Web Design", "Mobile App Design", "Dashboard UI", "Prototyping"],
    price: "Contact for Quote",
  },
  {
    icon: Sparkles,
    title: "Print Design",
    description: "High-quality print materials from business cards to large format and packaging.",
    features: ["Business Cards", "Brochures", "Packaging", "Editorial"],
    price: "Contact for Quote",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <SectionHeader
            label="Services"
            title="What I Offer"
            description="Comprehensive design services tailored to elevate your brand and achieve your business goals."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                variant="glass"
                className="group hover:border-primary/30 transition-all duration-500"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-lg font-display font-bold text-gradient">{service.price}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/contact">
                      Get Quote
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <SectionHeader
            label="Process"
            title="How I Work"
            description="A structured approach that ensures exceptional results on every project."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {[
              { step: "01", title: "Discovery", description: "Understanding your goals, audience, and vision through in-depth consultation." },
              { step: "02", title: "Strategy", description: "Developing a creative strategy and concept direction aligned with your objectives." },
              { step: "03", title: "Design", description: "Bringing concepts to life through iterative design and refinement." },
              { step: "04", title: "Deliver", description: "Finalizing and delivering production-ready assets with full support." },
            ].map((phase, index) => (
              <div key={index} className="relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <span className="text-5xl font-display font-bold text-primary/20">{phase.step}</span>
                <h3 className="text-xl font-display font-bold text-foreground mt-4">{phase.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Card variant="glow" className="p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's discuss your project and create something remarkable together.
            </p>
            <Button variant="hero" asChild>
              <Link to="/contact">
                Start a Project
                <ArrowRight size={18} />
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
