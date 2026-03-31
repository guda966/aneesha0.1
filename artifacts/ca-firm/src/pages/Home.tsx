import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, Briefcase, Building2, Calculator, CheckCircle2,
  ChevronRight, ChevronLeft, Landmark, ScrollText, Users,
  Mail, Send, Award, Clock, Shield, Star
} from "lucide-react";
import officeImg from "@/assets/images/office.png";
import caWorkImg from "@/assets/images/ca-work.png";
import meetingImg from "@/assets/images/meeting.png";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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

function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(to);
    };
    requestAnimationFrame(step);
  }, [isInView, to, duration]);
  return <span ref={ref}>{count}</span>;
}

const heroSlides = [
  {
    tag: "Established 1998",
    headline: "Tailored Solutions for Every Client",
    sub: "Personalized financial services designed to meet your unique business needs with precision and care.",
    img: officeImg,
    imgAlt: "Luxury executive office — personalized CA services",
  },
  {
    tag: "ICAI Registered Firm",
    headline: "Trusted Expertise in Tax & Audit",
    sub: "Experienced professionals ensuring compliance, accurate reporting, and zero-penalty filings for 25+ years.",
    img: meetingImg,
    imgAlt: "CA professionals in a client meeting",
  },
  {
    tag: "Client-Centric Practice",
    headline: "Commitment to Integrity & Excellence",
    sub: "Dedicated to ethical practices, complete transparency, and exceptional service delivery every engagement.",
    img: caWorkImg,
    imgAlt: "Chartered accountant reviewing financial documents",
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrent((c) => (c + 1) % heroSlides.length);

  return (
    <section
      className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-testid="section-hero-carousel"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-primary/75 z-10" />
          <img
            src={heroSlides[current].img}
            alt={heroSlides[current].imgAlt}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 relative z-20 pt-28 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 block">
              {heroSlides[current].tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              {heroSlides[current].headline}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light leading-relaxed">
              {heroSlides[current].sub}
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
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        aria-label="Previous slide"
        data-testid="hero-prev"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        aria-label="Next slide"
        data-testid="hero-next"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-secondary" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: "Home",
    description: "Gantasala & Associates - Chartered Accountants in Mumbai. Over 25 years of delivering financial clarity and expert advisory to businesses, individuals, and NRIs.",
  });

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />

      {/* Trust Signals */}
      <section className="bg-white border-b border-gray-100 py-10 relative z-30 -mt-10 mx-4 md:mx-auto container rounded-lg shadow-xl" data-testid="section-trust-signals">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 text-center divide-x divide-gray-100">
          {[
            { to: 25, suffix: "+", label: "Years Experience" },
            { to: 2000, suffix: "+", label: "Clients Served" },
            { to: 50, suffix: "+", label: "Professional Experts" },
            { to: null, suffix: "Pan-India", label: "Presence" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-serif font-bold text-primary mb-1">
                {item.to !== null ? <><CountUp to={item.to} />{item.suffix}</> : item.suffix}
              </span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Intro */}
      <section className="py-20 bg-white" data-testid="section-home-about">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -inset-4 bg-gray-50 rounded-lg transform -rotate-2 -z-10" />
                <img
                  src={caWorkImg}
                  alt="CA reviewing documents"
                  className="rounded-lg shadow-xl relative z-10 w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-5 rounded-lg shadow-xl z-20 hidden md:block">
                  <div className="flex items-center gap-3 mb-1">
                    <CheckCircle2 className="text-secondary w-5 h-5" />
                    <span className="font-serif font-bold">ICAI Registered</span>
                  </div>
                  <p className="text-xs text-gray-300">Upholding highest professional ethics since 1998.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">About The Firm</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Navigating Complexity with Insight and Integrity</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Gantasala & Associates is a trusted Chartered Accountants firm offering customized Assurance, Taxation, and Advisory services designed to empower your business with integrity and precision.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Client-Centric Approach",
                  "Experienced Professionals",
                  "Integrity and Transparency",
                  "Comprehensive Services",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-primary text-white hover:bg-primary/90" data-testid="link-read-our-story">
                <Link href="/about">Read More</Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50" data-testid="section-home-services">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Our Core Practices</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Comprehensive Financial Solutions</h3>
              <p className="text-gray-600">Comprehensive financial solutions in assurance, taxation, advisory, and corporate compliance.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Audit & Assurance", icon: ScrollText, desc: "Statutory audits, internal audits, and tax audits providing independent assurance to stakeholders.", href: "/services" },
              { title: "GST Services", icon: Calculator, desc: "End-to-end GST compliance, registration, return filings, advisory, and representation services.", href: "/services" },
              { title: "Income Tax & Advisory", icon: Landmark, desc: "Corporate and individual income tax planning, filing, assessment representation, and litigation.", href: "/services" },
              { title: "Corporate Advisory", icon: Building2, desc: "Company formation, ROC compliances, mergers & acquisitions, secretarial, and valuation services.", href: "/services" },
              { title: "FEMA & NRI Services", icon: Users, desc: "Advisory on inbound/outbound investments, RBI compliance, DTAA, and specialized NRI taxation.", href: "/services" },
              { title: "Business Support Services", icon: Briefcase, desc: "Comprehensive accounting, payroll, virtual CFO, and project finance for growing enterprises.", href: "/services" },
            ].map((service, index) => (
              <FadeIn key={service.title} delay={index * 0.08}>
                <Card className="h-full border-gray-100 hover:border-secondary/40 hover:shadow-lg transition-all duration-300 group bg-white">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center mb-5 group-hover:bg-secondary/10 transition-colors">
                      <service.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
                    </div>
                    <h4 className="text-xl font-serif font-bold text-primary mb-3">{service.title}</h4>
                    <p className="text-gray-600 mb-5 leading-relaxed text-sm">{service.desc}</p>
                    <Link href={service.href} className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors" data-testid={`link-learn-more-${index}`}>
                      View Detail <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="h-12 px-8 border-primary text-primary hover:bg-primary hover:text-white" data-testid="link-view-all-services">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-14 bg-white border-y border-gray-100" data-testid="section-home-clients">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <h2 className="text-center text-xs font-semibold tracking-widest text-secondary uppercase mb-10">Our Clients</h2>
          </FadeIn>
          <div className="relative overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {[
                "Reliance Industries", "Tata Group", "HDFC Bank", "Infosys", "Wipro",
                "Bajaj Finance", "Adani Enterprises", "L&T Group", "Mahindra & Mahindra", "Sun Pharma",
                "Reliance Industries", "Tata Group", "HDFC Bank", "Infosys", "Wipro",
                "Bajaj Finance", "Adani Enterprises", "L&T Group", "Mahindra & Mahindra", "Sun Pharma",
              ].map((name, i) => (
                <div
                  key={i}
                  className="inline-flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg px-7 py-4 min-w-[160px] shrink-0"
                  data-testid={i < 10 ? `client-logo-${i}` : undefined}
                >
                  <span className="text-sm font-semibold text-gray-500 text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Partners Preview */}
      <section className="py-20 bg-gray-50" data-testid="section-home-team">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Our Team</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Partners</h3>
              <p className="text-gray-600">A dedicated team of experienced professionals committed to providing exceptional financial solutions and expert guidance.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "CA Ramesh Gantasala",
                role: "Founder & Senior Partner",
                credentials: "B.Com, FCA, Regd.Valuer",
                exp: "35+ Years Experience",
                initials: "RM",
                color: "from-primary to-primary/70",
              },
              {
                name: "CA Priya Sharma",
                role: "Managing Partner",
                credentials: "B.Com, FCA, DISA (ICAI)",
                exp: "20+ Years Experience",
                initials: "PS",
                color: "from-secondary to-secondary/70",
              },
              {
                name: "CA Vikram Desai",
                role: "Partner — Indirect Tax",
                credentials: "B.Com, FCA, LL.B",
                exp: "15+ Years Experience",
                initials: "VD",
                color: "from-primary/80 to-secondary/60",
              },
            ].map((partner, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group" data-testid={`card-partner-home-${i}`}>
                  <div className={`h-52 w-full bg-gradient-to-br ${partner.color} flex items-center justify-center relative`}>
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center">
                      <span className="text-3xl font-serif font-bold text-white">{partner.initials}</span>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <span className="text-xs text-white/80 font-medium bg-black/20 px-3 py-1 rounded-full">{partner.credentials}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-serif font-bold text-primary mb-1">{partner.name}</h4>
                    <p className="text-secondary font-medium text-sm mb-2">{partner.role}</p>
                    <p className="text-gray-500 text-xs font-medium">{partner.exp}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="h-11 px-7 border-primary text-primary hover:bg-primary hover:text-white" data-testid="link-view-more-team">
              <Link href="/about">View More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary text-white" data-testid="section-home-cta-banner">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">Let a Dedicated Tax Expert Do Your Taxes For You.</h2>
            <p className="text-gray-300 text-base font-light">Get a Consultation — our team offers trusted expertise to guide you through every step, simplifying the process and ensuring you get the best possible outcome.</p>
          </div>
          <div className="shrink-0">
            <Button asChild size="lg" className="bg-secondary text-white hover:bg-secondary/90 h-14 px-10 text-base" data-testid="link-cta-contact">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Compliance Strip */}
      <section className="bg-white py-14 border-y border-gray-100" data-testid="section-home-compliance">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Stay Compliant</h2>
              <h3 className="text-2xl font-serif font-bold text-primary">Upcoming Statutory Deadlines</h3>
            </div>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { cat: "GST", label: "GSTR-1", date: "11th of Every Month" },
              { cat: "GST", label: "GSTR-3B", date: "20th of Every Month" },
              { cat: "Income Tax", label: "Advance Tax", date: "15th Jun/Sep/Dec/Mar" },
              { cat: "TDS", label: "TDS Return", date: "31st Jul/Oct/Jan/May" },
              { cat: "ROC", label: "AOC-4 / MGT-7", date: "Within 60 days of AGM" },
            ].map((d, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-5 min-w-[175px] text-center" data-testid={`deadline-card-${i}`}>
                <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 block">{d.cat}</span>
                <span className="font-semibold text-primary block text-lg font-serif">{d.label}</span>
                <span className="text-xs text-gray-500 mt-1 block">{d.date}</span>
              </div>
            ))}
            <div
              className="bg-primary text-white rounded-lg p-5 min-w-[175px] text-center flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={() => window.location.href = '/resources'}
              data-testid="link-compliance-calendar"
            >
              <span className="font-semibold block font-serif">Full Calendar</span>
              <span className="text-xs text-gray-300">View all due dates</span>
              <ChevronRight className="text-secondary" size={18} />
            </div>
          </div>
        </div>
      </section>

      {/* Blogs & Insights */}
      <section className="py-20 bg-gray-50" data-testid="section-home-blogs">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Expert Insights</h2>
                <h3 className="text-3xl font-serif font-bold text-primary">Blogs & Insights</h3>
                <p className="text-gray-600 mt-2">Stay updated with expert insights and the latest in finance and compliance.</p>
              </div>
              <Button asChild variant="outline" className="shrink-0 border-primary text-primary hover:bg-primary hover:text-white" data-testid="link-discover-more">
                <Link href="/resources">Discover More</Link>
              </Button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tag: "Direct Tax",
                title: "Permissive Tax Planning Under the Income Tax Act",
                excerpt: "Understand the distinction between permissive and purposive tax planning and how to structure your income efficiently within the law.",
                img: meetingImg,
              },
              {
                tag: "GST",
                title: "Purposive Tax Planning: GST Input Tax Credit Strategies",
                excerpt: "A practical guide to maximizing ITC claims, reconciling GSTR-2B mismatches, and avoiding common compliance pitfalls.",
                img: caWorkImg,
              },
              {
                tag: "Compliance",
                title: "Short-Range Tax Planning Before Financial Year End",
                excerpt: "Key actions to take before March 31 — from advance tax computation to section 80C investments and TDS obligations.",
                img: officeImg,
              },
            ].map((blog, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer h-full" data-testid={`card-blog-${i}`}>
                  <div className="overflow-hidden h-52">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 block">{blog.tag}</span>
                    <h4 className="font-serif font-bold text-primary text-lg mb-3 leading-snug">{blog.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{blog.excerpt}</p>
                    <Link href="/resources" className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                      View Detail <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white" data-testid="section-home-testimonials">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Client Trust</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary">Relationships Built on Results</h3>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Gantasala & Associates has been our statutory auditor for 10 years. Their meticulous approach and deep knowledge of accounting standards give our board immense confidence.", author: "Rajiv D.", role: "CFO, Manufacturing Enterprise" },
              { text: "As an NRI, navigating Indian tax laws was overwhelming until I engaged this firm. Their DTAA expertise saved me significant tax and completely removed my compliance anxiety.", author: "Priya S.", role: "NRI Client, Dubai" },
              { text: "They are more than just accountants; they are true business advisors. Their restructuring advice was pivotal during our recent acquisition phase.", author: "Amit K.", role: "Director, IT Services Co." }
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="h-full border-none shadow-md bg-gray-50">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 fill-secondary text-secondary" />)}
                    </div>
                    <p className="text-gray-600 mb-8 flex-1 italic text-sm leading-relaxed">"{t.text}"</p>
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

      {/* Why Choose Us */}
      <section className="py-16 bg-primary text-white" data-testid="section-home-why-us">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Why Us</h2>
              <h3 className="text-3xl font-serif font-bold">Why Choose Gantasala & Associates?</h3>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "ICAI Accredited", desc: "Firm Reg. No. 123456W — operating under strict ICAI professional standards." },
              { icon: Clock, title: "Timely Delivery", desc: "Zero-delay filings — we track every deadline so you never face a penalty." },
              { icon: Shield, title: "Confidentiality", desc: "Absolute discretion in handling your financial information and sensitive data." },
              { icon: Users, title: "Senior Attention", desc: "Every engagement is personally supervised by a qualified partner." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center p-6" data-testid={`why-us-card-${i}`}>
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h4 className="font-serif font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50 border-t border-gray-100" data-testid="section-home-newsletter">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <FadeIn>
            <Mail className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-3">Newsletter</h2>
            <p className="text-gray-600 mb-8">Stay Informed with Our Latest Insights and Expert Financial Solutions — Subscribe Today!</p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-6 py-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Thank you! You're now subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" data-testid="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 px-4 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary text-sm"
                  data-testid="newsletter-email-input"
                />
                <Button type="submit" className="h-12 px-6 bg-secondary text-white hover:bg-secondary/90 shrink-0" data-testid="newsletter-submit">
                  <Send size={16} className="mr-2" />
                  Subscribe
                </Button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
