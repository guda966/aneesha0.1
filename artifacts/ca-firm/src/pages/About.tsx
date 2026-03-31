import { useSEO } from "@/hooks/use-seo";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle2, MapPin, Award, Shield, Clock, Users,
  TrendingUp, Globe, Zap, Phone, ArrowRight,
  Scale, FileCheck, Handshake, GraduationCap,
} from "lucide-react";
import meetingImg from "@/assets/images/meeting.png";
import officeImg from "@/assets/images/office.png";

function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(to);
    };
    requestAnimationFrame(step);
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { value: 30, suffix: "+", label: "Years of Excellence", icon: Award },
  { value: 2000, suffix: "+", label: "Clients Served", icon: Users },
  { value: 50, suffix: "+", label: "Professional Experts", icon: GraduationCap },
  { value: 15, suffix: "+", label: "Industry Sectors", icon: Globe },
];

const milestones = [
  { year: "1998", title: "Firm Founded", desc: "CA Ramesh Gantasala established the firm with a single-partner practice in Fort, Mumbai, focusing on individual tax and audit." },
  { year: "2003", title: "Corporate Practice Expands", desc: "Launched dedicated Corporate Audit & Company Law division; first Fortune 500 client onboarded." },
  { year: "2010", title: "GST & Indirect Tax Desk", desc: "Established a full-service Indirect Tax practice, seamlessly transitioning clients from VAT/Service Tax to GST on its rollout in 2017." },
  { year: "2015", title: "NRI & FEMA Division", desc: "Dedicated NRI Taxation and FEMA compliance desk set up to serve the growing Indian diaspora investing back into India." },
  { year: "2020", title: "Tech-Enabled Practice", desc: "Adopted cloud-based compliance tools, e-filing infrastructure, and secure client data portals for round-the-clock access." },
  { year: "2024", title: "Pan-India Operations", desc: "Associates and correspondent offices across Delhi, Hyderabad, Bengaluru, and Chennai serving clients nationally." },
];

const whyUs = [
  { icon: Shield, title: "ICAI Registered Firm", desc: "ICAI Firm Reg. No. 123456W. We operate under the strict ethical guidelines set by the Institute of Chartered Accountants of India." },
  { icon: Zap, title: "Rapid Response Time", desc: "Dedicated client managers ensure queries are addressed within 24 hours. No auto-replies — you speak to a qualified professional." },
  { icon: Scale, title: "Zero-Penalty Track Record", desc: "100% on-time filing track record for retainer clients across GST, TDS, and Income Tax — zero penalty, zero interest exposure." },
  { icon: FileCheck, title: "End-to-End Compliance", desc: "From bookkeeping to board-level advisory — we handle every compliance touchpoint so you can focus entirely on your business." },
  { icon: Handshake, title: "Long-Term Partnerships", desc: "Over 70% of our clients have been with us for 10+ years. We invest in long-term relationships, not transactional engagements." },
  { icon: TrendingUp, title: "Proactive Advisory", desc: "We don't wait for you to ask — we proactively alert you to regulatory changes, new exemptions, and tax-saving opportunities." },
];

export default function About() {
  useSEO({
    title: "About The Firm",
    description: "Learn about Gantasala & Associates — our 25-year history, core values, founding partners, and why over 2,000 clients trust us for CA services in India.",
  });

  return (
    <div className="w-full">

      {/* ── Page Hero ─────────────────────────────────────────────── */}
      <section className="bg-primary text-white py-24 relative overflow-hidden" data-testid="section-about-header">
        <div className="absolute top-[-50px] right-[-50px] w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[5%] w-64 h-64 rounded-full bg-white/5 blur-2xl animate-float pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">Our Firm</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About The Firm</h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed max-w-2xl">
              A legacy of trust, excellence, and unwavering commitment to financial clarity — built over 25 years of serving India's finest businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Animated Stats Bar ─────────────────────────────────────── */}
      <section className="bg-secondary py-14" data-testid="section-about-stats">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <s.icon className="w-7 h-7 text-white/70 mb-3" />
                <span className="text-4xl md:text-5xl font-serif font-bold text-white leading-none">
                  <CountUp to={s.value} duration={2} />{s.suffix}
                </span>
                <span className="text-white/80 text-xs font-semibold tracking-widest uppercase mt-2">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── History & Mission ──────────────────────────────────────── */}
      <section className="py-24 bg-white" data-testid="section-about-history">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">Our History</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Building Trust Since 1998</h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Founded by CA Ramesh Gantasala in a modest office in Fort, Mumbai, Gantasala & Associates began with a simple philosophy: provide technical excellence with personal attention. Over 25 years, the firm has grown from a single-partner practice to a robust team of professionals serving clients globally.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Today, we operate from our modern headquarters at Nariman Point — the heart of India's financial capital — but our core ethos remains unchanged. We treat our clients' businesses as our own, providing insights that protect their interests and propel their growth.
              </p>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-secondary" data-testid="mission-box">
                  <h4 className="font-serif font-bold text-primary text-base mb-2">Our Mission</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">To provide reliable, timely, and quality professional services while upholding the highest standards of ethics set by ICAI.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-primary" data-testid="vision-box">
                  <h4 className="font-serif font-bold text-primary text-base mb-2">Our Vision</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">To be the most trusted and respected professional services firm for Indian businesses, NRIs, and global investors.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gray-50 rounded-2xl transform rotate-1 -z-10" />
              <img
                src={meetingImg}
                alt="Gantasala & Associates professionals in a client meeting"
                className="rounded-xl shadow-xl w-full object-cover aspect-[4/3] relative z-10"
                data-testid="about-image"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-5 rounded-xl shadow-xl z-20 hidden md:block">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="text-secondary w-5 h-5" />
                  <span className="font-serif font-bold text-sm">ICAI Reg. Firm</span>
                </div>
                <p className="text-xs text-gray-300">No. 123456W · Est. 1998</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Milestones Timeline ────────────────────────────────────── */}
      <section className="py-24 bg-gray-50" data-testid="section-about-timeline">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">Our Journey</p>
            <h2 className="text-3xl font-serif font-bold text-primary">Key Milestones</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  data-testid={`milestone-${i}`}
                >
                  <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <span className="inline-block bg-primary text-white font-serif font-bold text-lg px-4 py-1.5 rounded-lg mb-3">{m.year}</span>
                    <h4 className="font-serif font-bold text-primary text-lg mb-1">{m.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="hidden md:flex w-8 h-8 rounded-full bg-secondary border-4 border-white shadow-md shrink-0 z-10 items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="md:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────── */}
      <section className="py-24 bg-primary text-white" data-testid="section-about-why">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">Our Differentiators</p>
            <h2 className="text-3xl font-serif font-bold">Why Clients Choose Us</h2>
            <p className="text-gray-300 mt-4 font-light">Over 70% of our clients have been with us for 10+ years. Here is why they stay.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                data-testid={`why-card-${i}`}
              >
                <div className="bg-white/5 border border-white/10 rounded-xl p-7 h-full hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h4 className="font-serif font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────── */}
      <section className="py-24 bg-white" data-testid="section-about-values">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">The Foundation</p>
            <h2 className="text-3xl font-serif font-bold text-primary">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Integrity", desc: "Uncompromising adherence to moral and ethical principles in all our dealings — zero tolerance for tax evasion or misrepresentation.", icon: Shield },
              { title: "Excellence", desc: "Commitment to delivering the highest quality of service and technical accuracy, staying ahead of every regulatory change.", icon: Award },
              { title: "Confidentiality", desc: "Absolute discretion and protection of our clients' sensitive financial information under strict professional secrecy.", icon: CheckCircle2 },
              { title: "Client-Centricity", desc: "Deep understanding of each client's unique context, providing tailored solutions — not one-size-fits-all compliance.", icon: Handshake },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-gray-100 hover:shadow-lg transition-shadow" data-testid={`card-value-${i}`}>
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto w-14 h-14 bg-primary/8 rounded-full flex items-center justify-center mb-5">
                      <value.icon className="text-primary w-7 h-7" />
                    </div>
                    <h4 className="font-serif font-bold text-xl text-primary mb-3">{value.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ──────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50" data-testid="section-about-partners">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">Leadership</p>
            <h2 className="text-3xl font-serif font-bold text-primary">Meet Our Partners</h2>
            <p className="text-gray-600 mt-4">Qualified professionals with deep domain expertise and decades of combined experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "CA Ramesh Gantasala",
                role: "Founder & Senior Partner",
                credentials: "FCA, B.Com, Regd. Valuer",
                memNo: "Mem No: 045123",
                exp: "35+ Years Experience",
                desc: "Specializes in Corporate Taxation, representation before ITAT & High Court, and Strategic Business Advisory for large corporates.",
                initials: "RG",
                gradient: "from-primary to-primary/70",
              },
              {
                name: "CA Priya Sharma",
                role: "Managing Partner",
                credentials: "FCA, DISA (ICAI)",
                memNo: "Mem No: 128945",
                exp: "20+ Years Experience",
                desc: "Leads the Statutory Audit and Assurance practice. Expert in Ind AS, CARO compliance, and corporate governance for listed entities.",
                initials: "PS",
                gradient: "from-secondary to-secondary/70",
              },
              {
                name: "CA Vikram Desai",
                role: "Partner — Indirect Tax",
                credentials: "FCA, LL.B",
                memNo: "Mem No: 145678",
                exp: "15+ Years Experience",
                desc: "Heads the GST and Indirect Tax division. Regularly advises Fortune 500 companies on complex cross-border supply chain taxation and litigation.",
                initials: "VD",
                gradient: "from-primary/80 to-secondary/60",
              },
            ].map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300" data-testid={`card-partner-${i}`}>
                  <div className={`h-52 w-full bg-gradient-to-br ${partner.gradient} flex items-center justify-center relative rounded-t-lg overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }} />
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center z-10">
                      <span className="text-3xl font-serif font-bold text-white">{partner.initials}</span>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <span className="text-xs text-white/90 font-medium bg-black/20 px-3 py-1 rounded-full">{partner.credentials}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-serif font-bold text-primary mb-1">{partner.name}</h4>
                    <p className="text-secondary font-semibold text-sm mb-1">{partner.role}</p>
                    <p className="text-xs text-gray-400 mb-3 font-medium">{partner.memNo} · {partner.exp}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{partner.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Office & Contact CTA ──────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100" data-testid="section-about-location">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={officeImg}
                  alt="Gantasala & Associates office at Nariman Point Mumbai"
                  className="rounded-xl shadow-xl w-full object-cover aspect-video"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                    <MapPin className="w-4 h-4 text-secondary" />
                    Nariman Point, Mumbai
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">Our Office</p>
              <h2 className="text-3xl font-serif font-bold text-primary mb-5">Headquartered in Mumbai</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Operating from the 14th Floor, Maker Chambers VI, Nariman Point — the heart of India's financial capital — we are strategically positioned to serve corporate clients, multinational companies, and high-net-worth individuals seamlessly.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: MapPin, text: "14th Floor, Maker Chambers VI, Nariman Point, Mumbai 400 021" },
                  { icon: Phone, text: "+91 22 2282 1234  |  +91 98765 43210" },
                  { icon: Clock, text: "Mon–Sat: 9:30 AM – 6:30 PM  |  Sun: Closed" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-4 h-4 text-secondary shrink-0 mt-1" />
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-primary text-white hover:bg-primary/90">
                  <Link href="/contact">
                    Schedule a Meeting <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
