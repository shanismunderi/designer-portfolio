import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Dribbble, Mail, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Dribbble, href: "#", label: "Dribbble" },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { href: "/", label: "Home" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Brand Identity" },
      { href: "/services", label: "UI/UX Design" },
      { href: "/services", label: "Print Design" },
      { href: "/services", label: "Social Media" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-display font-bold text-gradient">
              Studio.
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Crafting visual experiences that captivate, inspire, and elevate brands to new heights.
            </p>
            <div className="flex items-center gap-4 mt-6">
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

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-display font-semibold text-foreground mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
          <a
            href="mailto:hello@studio.design"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail size={16} />
            hello@studio.design
          </a>
        </div>
      </div>
    </footer>
  );
}
