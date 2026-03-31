import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Linkedin, Facebook, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Firm" },
    { href: "/services", label: "Services" },
    { href: "/industries", label: "Industries" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50" data-testid="header-nav">
      {/* Top Contact Bar */}
      <div className={cn(
        "bg-primary text-white transition-all duration-300 overflow-hidden",
        isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"
      )}>
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 py-2 text-xs">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <a href="tel:+912222821234" className="flex items-center gap-1.5 hover:text-secondary transition-colors" data-testid="topbar-phone1">
              <Phone size={11} />
              +91 22 2282 1234
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-secondary transition-colors" data-testid="topbar-phone2">
              <Phone size={11} />
              +91 98765 43210
            </a>
            <a href="mailto:info@mehtaandassociates.com" className="flex items-center gap-1.5 hover:text-secondary transition-colors" data-testid="topbar-email">
              <Mail size={11} />
              info@mehtaandassociates.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 hidden sm:block">Follow Us:</span>
            <a href="https://www.linkedin.com/company/mehtaandassociates" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-secondary transition-colors" data-testid="topbar-linkedin">
              <Linkedin size={13} />
            </a>
            <a href="https://www.facebook.com/mehtaandassociates" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-secondary transition-colors" data-testid="topbar-facebook">
              <Facebook size={13} />
            </a>
            <a href="https://www.youtube.com/@mehtaandassociates" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-secondary transition-colors" data-testid="topbar-youtube">
              <Youtube size={13} />
            </a>
            <a href="https://www.instagram.com/mehtaandassociates" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-secondary transition-colors" data-testid="topbar-instagram">
              <Instagram size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={cn(
        "transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-gray-200 py-3 shadow-sm"
          : "bg-white border-transparent py-4"
      )}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" data-testid="link-logo">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm text-secondary font-serif font-bold text-xl group-hover:bg-primary/90 transition-colors">
              M&A
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-primary text-xl leading-tight tracking-tight">Mehta & Associates</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Chartered Accountants</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-secondary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full",
                  location === link.href ? "text-secondary after:w-full" : "text-gray-700"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top-2" data-testid="mobile-menu-container">
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  className={cn(
                    "py-3 px-4 border-b border-gray-50 text-sm font-medium",
                    location === link.href ? "text-secondary bg-gray-50/50" : "text-gray-700"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 px-4 pt-4 pb-2 text-xs text-gray-500">
                <a href="tel:+912222821234" className="flex items-center gap-1 hover:text-secondary">
                  <Phone size={11} /> +91 22 2282 1234
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
