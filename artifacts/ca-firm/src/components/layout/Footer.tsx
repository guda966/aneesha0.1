import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3" data-testid="footer-logo-link">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-sm text-primary font-serif font-bold text-xl">
                M&A
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-white text-xl leading-tight tracking-tight">Mehta & Associates</span>
                <span className="text-xs text-gray-300 uppercase tracking-widest font-medium">Chartered Accountants</span>
              </div>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              A heritage firm blending deep expertise with approachable service. Your financial clarity is our expertise.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="https://www.linkedin.com/company/mehtaandassociates" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" data-testid="footer-social-linkedin">
                <Linkedin size={16} />
              </a>
              <a href="https://www.facebook.com/mehtaandassociates" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" data-testid="footer-social-facebook">
                <Facebook size={16} />
              </a>
              <a href="https://www.youtube.com/@mehtaandassociates" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" data-testid="footer-social-youtube">
                <Youtube size={16} />
              </a>
              <a href="https://www.instagram.com/mehtaandassociates" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" data-testid="footer-social-instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-6 text-white border-b border-white/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-secondary transition-colors" data-testid="footer-link-home">Home</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition-colors" data-testid="footer-link-about">About Firm</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors" data-testid="footer-link-services">Our Services</Link></li>
              <li><Link href="/industries" className="hover:text-secondary transition-colors" data-testid="footer-link-industries">Industries We Serve</Link></li>
              <li><Link href="/resources" className="hover:text-secondary transition-colors" data-testid="footer-link-resources">Resources & Insights</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors" data-testid="footer-link-contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-6 text-white border-b border-white/20 pb-2 inline-block">Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/services" className="hover:text-secondary transition-colors" data-testid="footer-service-audit">Audit & Assurance</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors" data-testid="footer-service-direct-tax">Direct Taxation (Income Tax)</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors" data-testid="footer-service-indirect-tax">Indirect Taxation (GST)</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors" data-testid="footer-service-corporate-law">Corporate Law & MCA</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors" data-testid="footer-service-fema">FEMA & NRI Advisory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-6 text-white border-b border-white/20 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span>Nariman Point, Mumbai - 400021<br/>Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <span>+91 22 2282 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <span>info@mehtaandassociates.com</span>
              </li>
              <li className="pt-2 space-y-2">
                <div>
                  <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">ICAI Membership No.</span>
                  <div className="text-secondary font-semibold">FCA 123456</div>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Firm Registration No.</span>
                  <div className="text-secondary font-semibold">123456W</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 text-center md:text-left max-w-2xl">
            <strong>Disclaimer:</strong> The information on this website is for general guidance only and does not constitute professional advice. Please consult our experts for specific situations.
          </p>
          <p className="text-xs text-gray-400 shrink-0">
            &copy; {new Date().getFullYear()} Mehta & Associates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
