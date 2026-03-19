import { Link } from "react-router-dom";
import { Instagram, Mail, ArrowUpRight, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/ziyan.zakariya", label: "Instagram" },
  { icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345c-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>, href: "https://in.pinterest.com/Ziyaanzakariya/", label: "Pinterest" },
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
              Graphic designer specializing in poster making, magazine design, and visual storytelling.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <a href="tel:+919400210747" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={14} />
                +91 9400210747
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                Raza Manzil, Poduvachery, PO Poduvachery
              </div>
            </div>
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
            href="tel:+919400210747"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Phone size={16} />
            +91 9400210747
          </a>
        </div>
      </div>
    </footer>
  );
}
