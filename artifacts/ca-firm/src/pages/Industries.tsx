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

export default function Industries() {
  useSEO({
    title: "Industries We Serve",
    description: "Mehta & Associates provides specialized CA services across Manufacturing, Real Estate, IT/Startups, Healthcare, Education, Retail, and more.",
  });

  const industries = [
    {
      title: "Manufacturing",
      icon: Factory,
      desc: "Cost audits, inventory valuation, supply chain GST optimization, and capital expenditure advisory for heavy and light manufacturing sectors."
    },
    {
      title: "Real Estate & Construction",
      icon: Building,
      desc: "RERA compliance, complex project revenue recognition (Percentage of Completion), joint development agreement taxation, and fund structuring."
    },
    {
      title: "IT & Startups",
      icon: MonitorPlay,
      desc: "Valuation for funding rounds, ESOP structuring, STPI registration, software export benefits, and virtual CFO services for rapid-growth tech firms."
    },
    {
      title: "Healthcare & Pharmaceuticals",
      icon: Stethoscope,
      desc: "Capital intensive equipment depreciation advisory, regulatory compliance for trusts/hospitals, and transfer pricing for pharma exports."
    },
    {
      title: "Education",
      icon: GraduationCap,
      desc: "Tax exemption advisory for educational institutions, fee structure compliance, Section 10(23C) certifications, and FCRA compliance for aided institutions."
    },
    {
      title: "NGO & Trusts",
      icon: Heart,
      desc: "12A/80G registrations, FCRA compliance, trust audits, CSR fund advisory, and surplus fund deployment guidance adhering to strict regulatory frameworks."
    },
    {
      title: "Retail & FMCG",
      icon: ShoppingCart,
      desc: "Multi-state GST compliance, POS integration audits, franchise model structuring, and working capital management."
    },
    {
      title: "Hospitality",
      icon: Hotel,
      desc: "Input tax credit optimization on capital goods, payroll structuring for large workforces, and foreign exchange earning benefits."
    },
    {
      title: "Financial Services",
      icon: LineChart,
      desc: "Concurrent audits, NBFC compliance, RBI reporting, portfolio valuation, and risk management advisory."
    }
  ];

  return (
    <div className="w-full pb-20 bg-gray-50 min-h-screen">
      <section className="bg-primary text-white py-20" data-testid="section-industries-header">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Industries We Serve</h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Deep domain knowledge allows us to anticipate industry-specific challenges and provide targeted solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20" data-testid="section-industries-grid">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, index) => (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group cursor-default" data-testid={`card-industry-${index}`}>
                  <CardContent className="p-8">
                    <ind.icon className="w-12 h-12 text-secondary mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    <h3 className="text-xl font-serif font-bold text-primary mb-4">{ind.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{ind.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
