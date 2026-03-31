import { useSEO } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Calculator, 
  Building2, 
  Landmark, 
  FileSearch, 
  Briefcase, 
  Globe2, 
  BookOpenCheck,
  TrendingUp,
  Scale,
  Lightbulb
} from "lucide-react";

export default function Services() {
  useSEO({
    title: "Our Services",
    description: "Comprehensive CA services including Audit, Income Tax, GST, Company Law, FEMA, and Business Advisory by Mehta & Associates.",
  });

  const services = [
    {
      id: "gst",
      title: "GST Registration & Filing",
      icon: Calculator,
      items: ["Fresh GST Registrations", "Monthly/Quarterly Return Filings (GSTR-1, 3B)", "Annual Returns (GSTR-9/9C)", "GST Refunds & Assessment", "Representation before GST Authorities"]
    },
    {
      id: "income-tax",
      title: "Income Tax Advisory",
      icon: Landmark,
      items: ["ITR Filing for Individuals, Firms & Companies", "Tax Planning & Restructuring", "TDS/TCS Compliance & Returns", "Faceless Assessment & Appeals", "Transfer Pricing Studies"]
    },
    {
      id: "tax-audit",
      title: "Tax Audit",
      icon: FileSearch,
      items: ["Form 3CA/3CB/3CD under Sec 44AB", "Certification under Income Tax Act", "Trust & NGO Audits", "Transfer Pricing Audits (Form 3CEB)"]
    },
    {
      id: "statutory-audit",
      title: "Statutory & Internal Audit",
      icon: BookOpenCheck,
      items: ["Corporate Statutory Audits under Companies Act", "Bank Audits (Concurrent & Statutory)", "Internal & Concurrent Audits", "Management Audits", "Ind AS Implementation & Advisory"]
    },
    {
      id: "company-law",
      title: "Company Law & MCA/ROC",
      icon: Building2,
      items: ["Company & LLP Incorporation", "Annual ROC Returns Filing", "Secretarial Compliances", "Changes in Directors/Capital", "Winding Up & Strike Off"]
    },
    {
      id: "fema",
      title: "FEMA & RBI Compliance",
      icon: Globe2,
      items: ["FDI & ODI Advisory", "FCGPR & FCTRS Filings", "External Commercial Borrowings (ECB)", "Setting up Branch/Liaison Offices in India", "Compounding of Offences"]
    },
    {
      id: "nri",
      title: "NRI Taxation & DTAA",
      icon: Scale,
      items: ["Determining Residential Status", "Advisory on Double Taxation Avoidance Agreements", "Form 15CB/15CA Certification", "Capital Gains on Property Sale", "Repatriation of Funds"]
    },
    {
      id: "accounting",
      title: "Accounting & Bookkeeping",
      icon: Briefcase,
      items: ["Cloud-based Bookkeeping", "Payroll Processing", "Preparation of Financial Statements", "Virtual CFO Services", "MIS Reporting"]
    },
    {
      id: "project-finance",
      title: "Project Finance & Valuation",
      icon: TrendingUp,
      items: ["Preparation of Project Reports", "CMA Data for Bank Loans", "Business & Share Valuations", "Due Diligence Reviews", "Mergers & Acquisitions Advisory"]
    },
    {
      id: "business-advisory",
      title: "Business Advisory",
      icon: Lightbulb,
      items: ["Business Structuring & Restructuring", "Start-up Advisory & Fundraising Compliance", "Virtual CFO & Management Consulting", "Risk Management & Internal Controls", "Succession Planning & Family Business Advisory"]
    }
  ];

  return (
    <div className="w-full pb-20">
      {/* Page Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-secondary/10 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5 blur-2xl animate-float-delay pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">What We Do</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              End-to-end financial, taxation, and regulatory solutions designed to keep you compliant and competitive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              >
                <Card className="card-hover h-full border-gray-200 hover:border-secondary/40 bg-white group" data-testid={`card-service-${service.id}`}>
                  <CardContent className="p-8">
                    <motion.div
                      className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center mb-6 shadow-sm"
                      whileHover={{ scale: 1.12, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <service.icon className="w-7 h-7" />
                    </motion.div>
                    <h3 className="text-xl font-serif font-bold text-primary mb-4">{service.title}</h3>
                    <ul className="space-y-2.5">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <span className="text-secondary mr-2 mt-0.5 text-base leading-none">›</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 mt-10 pb-20" data-testid="section-services-cta">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="bg-primary rounded-2xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/5 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl animate-float-delay" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">Require a Custom Solution?</h2>
            <p className="text-gray-300 mb-8">Every business is unique. Contact us to discuss your specific requirements and we will design a service package tailored to your needs.</p>
            <Button asChild size="lg" className="bg-secondary text-white hover:bg-secondary/90 hover:scale-105 transition-transform" data-testid="button-request-consultation">
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
