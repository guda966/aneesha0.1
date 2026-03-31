import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const serviceLinks = [
  { id: "gst",            label: "GST Registration & Filing" },
  { id: "income-tax",     label: "Income Tax Advisory" },
  { id: "tax-audit",      label: "Tax Audit" },
  { id: "statutory-audit",label: "Statutory & Internal Audit" },
  { id: "company-law",    label: "Company Law & MCA/ROC" },
  { id: "fema",           label: "FEMA & RBI Compliance" },
  { id: "nri",            label: "NRI Taxation & DTAA" },
  { id: "accounting",     label: "Accounting & Bookkeeping" },
  { id: "project-finance",label: "Project Finance & Valuation" },
  { id: "business-advisory", label: "Business Advisory" },
];

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDropdown = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setServicesOpen(true);
  };
  const closeDropdown = () => {
    leaveTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Firm" },
  ];

  const rightLinks = [
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
              <Phone size={11} />+91 22 2282 1234
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-secondary transition-colors" data-testid="topbar-phone2">
              <Phone size={11} />+91 98765 43210
            </a>
            <a href="mailto:info@mehtaandassociates.com" className="flex items-center gap-1.5 hover:text-secondary transition-colors" data-testid="topbar-email">
              <Mail size={11} />info@mehtaandassociates.com
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
          <nav className="hidden md:flex items-center gap-7">
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

            {/* Services dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <Link
                href="/services"
                data-testid="link-nav-services"
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-secondary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full",
                  location === "/services" ? "text-secondary after:w-full" : "text-gray-700"
                )}
              >
                Services
                <ChevronDown size={14} className={cn("transition-transform duration-200", servicesOpen && "rotate-180")} />
              </Link>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] w-[520px] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50"
                  >
                    <div className="mb-3 pb-2 border-b border-gray-100">
                      <p className="text-xs font-semibold tracking-widest text-secondary uppercase">Our Practice Areas</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.id}
                          href={`/services#${s.id}`}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 group-hover:scale-125 transition-transform" />
                          {s.label}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="text-xs font-semibold text-primary hover:text-secondary transition-colors"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {rightLinks.map((link) => (
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

          {/* Mobile right: hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              className="text-primary p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-50"
              data-testid="mobile-menu-container"
            >
              <nav className="flex flex-col p-4">
                {[...navLinks].map((link) => (
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

                {/* Mobile Services accordion */}
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={cn(
                    "flex items-center justify-between py-3 px-4 border-b border-gray-50 text-sm font-medium text-left",
                    location === "/services" ? "text-secondary" : "text-gray-700"
                  )}
                >
                  Services
                  <ChevronDown size={14} className={cn("transition-transform", mobileServicesOpen && "rotate-180")} />
                </button>
                {mobileServicesOpen && (
                  <div className="bg-gray-50/50 pl-6 border-b border-gray-50">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services#${s.id}`}
                        onClick={() => { setMobileMenuOpen(false); setMobileServicesOpen(false); }}
                        className="block py-2.5 px-4 text-xs text-gray-600 hover:text-primary border-b border-gray-100 last:border-0"
                      >
                        › {s.label}
                      </Link>
                    ))}
                  </div>
                )}

                {rightLinks.map((link) => (
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
