import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Briefcase, Building2, Calculator, CheckCircle2, ChevronRight, Landmark, ScrollText, Users } from "lucide-react";
import officeImg from "@/assets/images/office.png";
import caWorkImg from "@/assets/images/ca-work.png";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  useSEO({
    title: "Home",
    description: "Mehta & Associates - Chartered Accountants in Mumbai. Over 25 years of delivering financial clarity and expert advisory to businesses, individuals, and NRIs.",
  });

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-primary text-white min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/80 z-10" />
          <img 
            src={officeImg} 
            alt="Luxury wood-paneled executive office" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-20 pt-20 pb-24">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 block">Established 1998</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                Your Financial Clarity.<br/>
                <span className="text-secondary">Our Expertise.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light leading-relaxed">
                Trusted by corporations, businesses, and individuals for over 25 years. We provide comprehensive audit, taxation, and advisory services grounded in deep expertise and unwavering integrity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-secondary text-white hover:bg-secondary/90 text-base h-14 px-8" data-testid="link-hero-contact">
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 text-base h-14 px-8" data-testid="link-hero-services">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white border-b border-gray-100 py-12 relative z-30 -mt-10 mx-4 md:mx-auto container rounded-lg shadow-xl" data-testid="section-trust-signals">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center divide-x divide-gray-100">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-serif font-bold text-primary mb-2">25+</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Years Experience</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-serif font-bold text-primary mb-2">2000+</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Clients Served</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-serif font-bold text-primary mb-2">50+</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Professional Experts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-serif font-bold text-primary mb-2">Pan-India</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Presence</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50" data-testid="section-home-services">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">Our Core Practices</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Comprehensive Financial Solutions</h3>
              <p className="text-gray-600 text-lg">We deliver tailored solutions across the entire spectrum of financial services, regulatory compliance, and business advisory.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Audit & Assurance", icon: ScrollText, desc: "Statutory audits, internal audits, and tax audits providing independent assurance to stakeholders." },
              { title: "Direct Taxation", icon: Landmark, desc: "Corporate and individual income tax planning, filing, assessment representation, and litigation." },
              { title: "Indirect Taxation (GST)", icon: Calculator, desc: "End-to-end GST compliance, advisory, transition, and representation services." },
              { title: "Corporate Advisory", icon: Building2, desc: "Company formation, ROC compliances, mergers & acquisitions, and valuation services." },
              { title: "FEMA & NRI Services", icon: Users, desc: "Advisory on inbound/outbound investments, RBI compliance, and specialized NRI taxation." },
              { title: "Business Outsourcing", icon: Briefcase, desc: "Comprehensive accounting, payroll, and virtual CFO services for growing enterprises." },
            ].map((service, index) => (
              <FadeIn key={service.title} delay={index * 0.1}>
                <Card className="h-full border-gray-100 hover:border-secondary/30 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                      <service.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
                    </div>
                    <h4 className="text-xl font-serif font-bold text-primary mb-3">{service.title}</h4>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                    <Link href="/services" className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors" data-testid={`link-learn-more-${index}`}>
                      Learn more <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="h-12 px-8 border-primary text-primary hover:bg-primary hover:text-white" data-testid="link-view-all-services">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Two Column Layout: About Intro & Compliance */}
      <section className="py-24 bg-white" data-testid="section-home-about">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <FadeIn>
              <div className="relative">
                <div className="absolute -inset-4 bg-gray-50 rounded-lg transform -rotate-2 -z-10"></div>
                <img 
                  src={caWorkImg} 
                  alt="CA reviewing documents" 
                  className="rounded-lg shadow-xl relative z-10 w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-lg shadow-xl z-20 max-w-xs hidden md:block">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="text-secondary w-6 h-6" />
                    <span className="font-serif font-bold text-lg">ICAI Registered</span>
                  </div>
                  <p className="text-sm text-gray-300">Upholding the highest standards of professional ethics since 1998.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">About The Firm</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Navigating Complexity with Insight and Integrity</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Mehta & Associates is a premier accounting and advisory firm based in Mumbai. We go beyond traditional numbers to provide strategic insights that drive growth, ensure compliance, and protect wealth.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Personalized attention from senior partners",
                  "Deep domain expertise across industries",
                  "Proactive advisory approach",
                  "Strict adherence to confidentiality"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-primary text-white hover:bg-primary/90" data-testid="link-read-our-story">
                <Link href="/about">Read Our Story</Link>
              </Button>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Compliance Strip */}
      <section className="bg-primary text-white py-16" data-testid="section-home-compliance">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-serif font-bold mb-2">Upcoming Deadlines</h3>
              <p className="text-gray-300 text-sm">Stay compliant with statutory filings. Missing deadlines can attract severe penalties.</p>
            </div>
            <div className="lg:w-2/3 flex flex-wrap lg:flex-nowrap gap-4">
              <div className="bg-white/10 p-4 rounded-md border border-white/20 flex-1 min-w-[200px]">
                <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1 block">GST</span>
                <span className="font-semibold block mb-1">GSTR-3B</span>
                <span className="text-sm text-gray-300">20th of Every Month</span>
              </div>
              <div className="bg-white/10 p-4 rounded-md border border-white/20 flex-1 min-w-[200px]">
                <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1 block">Income Tax</span>
                <span className="font-semibold block mb-1">Advance Tax</span>
                <span className="text-sm text-gray-300">15th Jun/Sep/Dec/Mar</span>
              </div>
              <div 
                className="bg-white/10 p-4 rounded-md border border-white/20 flex-1 min-w-[200px] flex items-center justify-between group cursor-pointer" 
                onClick={() => window.location.href='/resources'}
                data-testid="link-compliance-calendar"
              >
                <div>
                  <span className="font-semibold block">Full Calendar</span>
                  <span className="text-sm text-gray-300">View all dates</span>
                </div>
                <ChevronRight className="text-secondary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50" data-testid="section-home-testimonials">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">Client Trust</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Relationships Built on Results</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Mehta & Associates has been our statutory auditor for 10 years. Their meticulous approach and deep knowledge of accounting standards give our board immense confidence.", author: "Rajiv D.", role: "CFO, Manufacturing Enterprise" },
              { text: "As an NRI, navigating Indian tax laws was overwhelming until I engaged this firm. Their DTAA expertise saved me significant tax and completely removed my compliance anxiety.", author: "Priya S.", role: "NRI Client, Dubai" },
              { text: "They are more than just accountants; they are true business advisors. Their restructuring advice was pivotal during our recent acquisition phase.", author: "Amit K.", role: "Director, IT Services Co." }
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="h-full border-none shadow-md bg-white">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="text-secondary text-4xl font-serif leading-none mb-4">"</div>
                    <p className="text-gray-600 mb-8 flex-1 italic">{t.text}</p>
                    <div>
                      <div className="font-bold text-primary">{t.author}</div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center" data-testid="section-home-cta">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Streamline Your Finances?</h2>
          <p className="text-lg text-gray-300 mb-10 font-light">
            Partner with a firm that understands your business as well as you do. Reach out for a confidential consultation with our partners.
          </p>
          <Button asChild size="lg" className="bg-secondary text-white hover:bg-secondary/90 h-14 px-10 text-lg" data-testid="link-cta-contact">
            <Link href="/contact">Contact Our Experts</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
