import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message too long"),
});

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 9400210747", href: "tel:+919400210747" },
  { icon: MapPin, label: "Location", value: "Raza Manzil, Poduvachery, PO Poduvachery", href: "#" },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/ziyan.zakariya", label: "Instagram" },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      contactSchema.parse(formData);
      
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            label="Contact"
            title="Let's Work Together"
            description="Have a project in mind? I'd love to hear from you. Send me a message and let's create something amazing."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
            {/* Contact Form */}
            <Card variant="glass" className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-card/60 border-border/50"
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-card/60 border-border/50"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-card/60 border-border/50"
                  />
                  {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-card/60 border-border/50 resize-none"
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>
                <Button variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Get in Touch</h3>
                <p className="text-muted-foreground mb-8">
                  Whether you have a question, want to discuss a project, or just want to say hello, 
                  I'm always happy to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-8 border-t border-border/50">
                <h4 className="font-display font-semibold text-foreground mb-4">Follow Me</h4>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <Card variant="glass" className="p-6 mt-8">
                <h4 className="font-display font-semibold text-foreground mb-4">Quick Connect</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="glass" size="sm" asChild>
                    <a
                      href={`https://wa.me/919400210747?text=${encodeURIComponent("Hi! I'm interested in your design services.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="glass" size="sm" asChild>
                    <a href="tel:+919400210747">
                      Call
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
