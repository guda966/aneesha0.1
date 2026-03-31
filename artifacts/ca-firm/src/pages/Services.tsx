import { useSEO } from "@/hooks/use-seo";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
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
  Lightbulb,
  Factory,
  MonitorPlay,
  Stethoscope,
  GraduationCap,
  ShoppingCart,
  Hotel,
  LineChart,
  Heart,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "gst",
    title: "GST Registration & Filing",
    icon: Calculator,
    description:
      "We handle end-to-end GST compliance — from registration and return filing to annual reconciliation and departmental representations. Our team ensures timely GSTR-1, GSTR-3B, and GSTR-9 filings with error-free reconciliation against GSTR-2B, minimising ITC reversal risks and interest exposure.",
    items: [
      "Fresh GST Registrations (Regular, Composition, Voluntary)",
      "Monthly/Quarterly Return Filings (GSTR-1, GSTR-3B)",
      "Annual Returns (GSTR-9) & Reconciliation Statement (GSTR-9C)",
      "GST Refunds — Export of Goods/Services, Inverted Duty Structure",
      "Representation before GST Authorities & Appeals",
    ],
  },
  {
    id: "income-tax",
    title: "Income Tax Advisory",
    icon: Landmark,
    description:
      "From individual ITR filing to complex corporate tax structuring, we provide holistic income tax advisory. We represent clients before Assessment Officers, CIT(Appeals), and ITAT, and conduct transfer pricing studies for international transactions to minimise litigation exposure.",
    items: [
      "ITR Filing for Individuals, HUF, Firms & Companies",
      "Tax Planning & Restructuring for Optimal Efficiency",
      "TDS/TCS Compliance — Returns, Certificates & Corrections",
      "Faceless Assessment, Appeals & Appellate Representation",
      "Transfer Pricing Studies & Documentation (Form 3CEB)",
    ],
  },
  {
    id: "tax-audit",
    title: "Tax Audit",
    icon: FileSearch,
    description:
      "We conduct tax audits under Section 44AB with the rigour required to withstand departmental scrutiny. Our audit reports cover books of accounts, method of accounting, quantitative details, and related party transactions — fully compliant with ICAI standards.",
    items: [
      "Form 3CA/3CB/3CD under Section 44AB",
      "Certification under Sections 44AD, 44ADA & 44AE",
      "Trust & NGO Audits under Section 12A/80G",
      "Transfer Pricing Audits — Form 3CEB",
      "Specialised Certification for Deductions & Allowances",
    ],
  },
  {
    id: "statutory-audit",
    title: "Statutory & Internal Audit",
    icon: BookOpenCheck,
    description:
      "Our statutory audit practice serves listed and unlisted companies, banks, PSUs, and co-operatives. Internal audits go beyond compliance to deliver actionable insights on process efficiency, internal controls, and risk mitigation — in line with Standards on Auditing (SAs) issued by ICAI.",
    items: [
      "Corporate Statutory Audits under Companies Act 2013",
      "Bank Branch Audits — Concurrent & Statutory",
      "Internal & Management Audits with Process Reviews",
      "Ind AS Implementation & Advisory",
      "Audit Committee Reporting & Board Presentations",
    ],
  },
  {
    id: "company-law",
    title: "Company Law & MCA/ROC",
    icon: Building2,
    description:
      "We manage the complete lifecycle of a company — from incorporation to wind-up. Our secretarial team handles all MCA e-forms, board resolutions, share transfers, and ROC filings with strict adherence to Companies Act 2013 timelines and penalties.",
    items: [
      "Company & LLP Incorporation — MOA, AOA, PAN, TAN",
      "Annual ROC Returns — AOC-4, MGT-7, DIR-3 KYC",
      "Secretarial Compliances & Board Resolutions",
      "Share Capital Changes, Director Appointments & DIN",
      "Winding Up, Strike Off & Insolvency Proceedings",
    ],
  },
  {
    id: "fema",
    title: "FEMA & RBI Compliance",
    icon: Globe2,
    description:
      "India's foreign exchange regulations are intricate. We advise on structuring FDI and ODI transactions, file FC-GPR, FC-TRS, and FLA returns on FIRMS portal, assist with ECB documentation, and represent clients in FEMA compounding proceedings before the RBI.",
    items: [
      "FDI & ODI Advisory — Structuring & Regulatory Approvals",
      "FC-GPR, FC-TRS & FLA Return Filings on RBI FIRMS Portal",
      "External Commercial Borrowings (ECB) — Form ECB & ECB-2",
      "Branch / Liaison / Project Office Establishment in India",
      "FEMA Compounding Applications & RBI Representation",
    ],
  },
  {
    id: "nri",
    title: "NRI Taxation & DTAA",
    icon: Scale,
    description:
      "Non-resident Indians face unique tax challenges across income sources, capital gains, and fund repatriation. We determine residential status under FEMA and the Income Tax Act, advise on DTAA treaty benefits across jurisdictions, and handle foreign asset disclosures under Schedule FA.",
    items: [
      "Residential Status Determination — FEMA & Income Tax Act",
      "DTAA Advisory across USA, UK, UAE, Singapore & other jurisdictions",
      "Form 15CB/15CA Certification for Foreign Remittances",
      "Capital Gains on Indian Property & Investment Repatriation",
      "Foreign Asset Disclosure — Schedule FA in ITR",
    ],
  },
  {
    id: "accounting",
    title: "Accounting & Bookkeeping",
    icon: Briefcase,
    description:
      "We offer cloud-based bookkeeping using Tally Prime, Zoho Books, and QuickBooks, with monthly MIS reporting and payroll processing. Our Virtual CFO services give growing businesses access to senior financial oversight, cash flow management, and investor reporting at a fraction of in-house costs.",
    items: [
      "Cloud-based Bookkeeping — Tally Prime, Zoho Books, QuickBooks",
      "Payroll Processing — PF, ESI, PT, TDS on Salary",
      "Monthly/Quarterly MIS Reports & Variance Analysis",
      "Preparation of Financial Statements — Balance Sheet, P&L",
      "Virtual CFO Services — Cash Flow, Investor Reporting",
    ],
  },
  {
    id: "project-finance",
    title: "Project Finance & Valuation",
    icon: TrendingUp,
    description:
      "We prepare bankable project reports and CMA data packages for term loans and working capital financing from scheduled banks. Business and share valuations are conducted per ICAI guidelines and DCF/NAV methodologies — essential for M&A, ESOP grants, and regulatory filings.",
    items: [
      "Project Reports & Feasibility Studies for Bank Loans",
      "CMA Data Preparation for Working Capital Facilities",
      "Business Valuation — DCF, NAV, Market Approach",
      "Share Valuation for ESOP, M&A & Regulatory Filings",
      "Due Diligence Reviews & M&A Advisory",
    ],
  },
  {
    id: "business-advisory",
    title: "Business Advisory",
    icon: Lightbulb,
    description:
      "Beyond compliance, we serve as strategic partners. We help promoters structure or restructure their businesses for tax efficiency and operational effectiveness, advise start-ups on fundraising compliance, and provide succession planning for family-run enterprises across generations.",
    items: [
      "Business Structuring & Tax-Efficient Restructuring",
      "Start-up Advisory — Valuation, ESOP & Fundraising Compliance",
      "Risk Management Frameworks & Internal Controls",
      "Succession Planning & Family Business Advisory",
      "Virtual CFO & Management Consulting Retainers",
    ],
  },
];

const industries = [
  { title: "Manufacturing", icon: Factory, desc: "Cost audits, inventory valuation, supply chain GST optimisation, and capex advisory." },
  { title: "Real Estate & Construction", icon: Building2, desc: "RERA compliance, POC revenue recognition, JDA taxation, and project fund structuring." },
  { title: "IT & Startups", icon: MonitorPlay, desc: "Valuation for funding rounds, ESOP structuring, STPI benefits, and virtual CFO services." },
  { title: "Healthcare & Pharma", icon: Stethoscope, desc: "Equipment depreciation advisory, hospital trust compliance, and pharma transfer pricing." },
  { title: "Education", icon: GraduationCap, desc: "Tax exemptions for institutions, Sec 10(23C) certifications, and FCRA compliance." },
  { title: "NGO & Trusts", icon: Heart, desc: "12A/80G registrations, trust audits, CSR fund advisory, and FCRA compliance." },
  { title: "Retail & FMCG", icon: ShoppingCart, desc: "Multi-state GST compliance, POS audits, franchise structuring, and working capital management." },
  { title: "Hospitality", icon: Hotel, desc: "ITC optimisation on capital goods, payroll structuring, and foreign exchange earning benefits." },
  { title: "Financial Services", icon: LineChart, desc: "Concurrent audits, NBFC compliance, RBI reporting, and portfolio valuation." },
];

export default function Services() {
  useSEO({
    title: "Our Services",
    description: "Comprehensive CA services including Audit, Income Tax, GST, Company Law, FEMA, and Business Advisory by Gantasala & Associates.",
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [location]);

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

      {/* Quick Nav — horizontal scrollable tab strip */}
      <div className="bg-white border-b border-gray-100 sticky top-[88px] z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-none">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="shrink-0 px-4 py-2 text-xs font-medium rounded-full text-gray-600 hover:bg-primary hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services — stacked sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 space-y-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.2) }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden scroll-mt-36"
              data-testid={`card-service-${service.id}`}
            >
              {/* Card header — always visible */}
              <div className="flex items-start gap-5 p-6 md:p-8">
                <motion.div
                  className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm shrink-0"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <service.icon className="w-7 h-7" />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h3 className="text-xl font-serif font-bold text-primary">{service.title}</h3>
                    <button
                      onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary transition-colors shrink-0 mt-0.5"
                      data-testid={`btn-expand-${service.id}`}
                    >
                      {expandedId === service.id ? "Less" : "Details"}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${expandedId === service.id ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Bullet list — always visible */}
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <span className="text-secondary mr-2 mt-0.5 text-base leading-none shrink-0">›</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expandable description */}
              <AnimatePresence>
                {expandedId === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                      <div className="border-t border-gray-100 pt-5">
                        <p className="text-sm text-gray-600 leading-relaxed mb-5">{service.description}</p>
                        <Link href="/contact">
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5">
                            Enquire about this service <ArrowRight size={13} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-white border-t border-gray-100" data-testid="section-industries">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-2">Sector Expertise</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Industries We Serve</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Deep domain knowledge across sectors — so your advice is never generic.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50 hover:border-secondary/40 hover:bg-white hover:shadow-md transition-all duration-200 h-full group">
                  <div className="mt-0.5 shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
                    <ind.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm mb-1 font-serif">{ind.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 mt-10 pb-4" data-testid="section-services-cta">
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
