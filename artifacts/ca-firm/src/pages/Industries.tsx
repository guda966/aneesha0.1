import { useSEO } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Factory, 
  Building, 
  MonitorPlay, 
  Stethoscope, 
  GraduationCap, 
  ShoppingCart, 
  Hotel, 
  LineChart,
  Heart
} from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" },
  }),
};

export default function Industries() {
  useSEO({
    title: "Industries We Serve",
    description: "Mehta & Associates provides specialized CA services across Manufacturing, Real Estate, IT/Startups, Healthcare, Education, Retail, and more.",
  });

  const industries = [
    { title: "Manufacturing", icon: Factory, desc: "Cost audits, inventory valuation, supply chain GST optimization, and capital expenditure advisory for heavy and light manufacturing sectors." },
    { title: "Real Estate & Construction", icon: Building, desc: "RERA compliance, complex project revenue recognition (Percentage of Completion), joint development agreement taxation, and fund structuring." },
    { title: "IT & Startups", icon: MonitorPlay, desc: "Valuation for funding rounds, ESOP structuring, STPI registration, software export benefits, and virtual CFO services for rapid-growth tech firms." },
    { title: "Healthcare & Pharmaceuticals", icon: Stethoscope, desc: "Capital intensive equipment depreciation advisory, regulatory compliance for trusts/hospitals, and transfer pricing for pharma exports." },
    { title: "Education", icon: GraduationCap, desc: "Tax exemption advisory for educational institutions, fee structure compliance, Section 10(23C) certifications, and FCRA compliance for aided institutions." },
    { title: "NGO & Trusts", icon: Heart, desc: "12A/80G registrations, FCRA compliance, trust audits, CSR fund advisory, and surplus fund deployment guidance adhering to strict regulatory frameworks." },
    { title: "Retail & FMCG", icon: ShoppingCart, desc: "Multi-state GST compliance, POS integration audits, franchise model structuring, and working capital management." },
    { title: "Hospitality", icon: Hotel, desc: "Input tax credit optimization on capital goods, payroll structuring for large workforces, and foreign exchange earning benefits." },
    { title: "Financial Services", icon: LineChart, desc: "Concurrent audits, NBFC compliance, RBI reporting, portfolio valuation, and risk management advisory." },
  ];

  return (
    <div className="w-full pb-20 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-20 relative overflow-hidden" data-testid="section-industries-header">
        <div className="absolute top-[-50px] right-[-50px] w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-[-30px] left-[8%] w-52 h-52 rounded-full bg-white/5 blur-2xl animate-float pointer-events-none" />
        <div className="absolute top-[30%] left-[55%] w-32 h-32 rounded-full bg-secondary/5 blur-xl animate-float-delay pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">Sector Expertise</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Industries We Serve</h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Deep domain knowledge allows us to anticipate industry-specific challenges and provide targeted solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20" data-testid="section-industries-grid">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {industries.map((ind, i) => (
              <motion.div key={ind.title} custom={i} variants={cardVariants} data-testid={`card-industry-${i}`}>
                <Card className="card-hover h-full border-none shadow-md bg-white group cursor-default">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.15, backgroundColor: "rgba(26,46,90,0.12)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <ind.icon className="w-8 h-8 text-secondary" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-xl font-serif font-bold text-primary mb-3">{ind.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{ind.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
