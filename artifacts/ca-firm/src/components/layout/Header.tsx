import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
    <header
      data-testid="header-nav"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-gray-200 py-3 shadow-sm"
          : "bg-white border-transparent py-5"
      )}
    >
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
          <Button asChild className="bg-secondary text-white hover:bg-secondary/90 shadow-none font-medium" data-testid="button-get-consultation-desktop">
            <Link href="/contact">Get Consultation</Link>
          </Button>
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
            <div className="p-4 pt-6">
              <Button asChild className="w-full bg-secondary text-white hover:bg-secondary/90 shadow-none" data-testid="button-get-consultation-mobile">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Get Consultation</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
