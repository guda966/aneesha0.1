import { useSEO } from "@/hooks/use-seo";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CalendarDays, ExternalLink, FileText, AlertCircle, Download, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";

type Category = "All" | "GST" | "Income Tax" | "TDS / TCS" | "Company Law" | "PF / ESI" | "FEMA";

interface DueDate {
  form: string;
  description: string;
  dueDate: string;
  category: Exclude<Category, "All">;
  note?: string;
}

const dueDates: DueDate[] = [
  // GST
  { form: "GSTR-1 (Monthly)", description: "Outward supply details for taxpayers with turnover > ₹5 Crore or not opted QRMP", dueDate: "11th of every month", category: "GST" },
  { form: "GSTR-1 (Quarterly – QRMP)", description: "Outward supply details for taxpayers with turnover ≤ ₹5 Crore opted for QRMP scheme", dueDate: "13th of month following the quarter", category: "GST" },
  { form: "IFF (Invoice Furnishing Facility)", description: "Invoices for B2B supplies in months 1 & 2 of quarter under QRMP", dueDate: "13th of each of the first 2 months of the quarter", category: "GST" },
  { form: "GSTR-3B (Monthly, >5 Cr)", description: "Summary return and tax payment for turnover > ₹5 Crore", dueDate: "20th of every month", category: "GST" },
  { form: "GSTR-3B (Monthly, ≤5 Cr – Cat I States)", description: "Maharashtra, Karnataka, etc. — turnover ≤ ₹5 Crore", dueDate: "22nd of every month", category: "GST" },
  { form: "GSTR-3B (Monthly, ≤5 Cr – Cat II States)", description: "Chhattisgarh, Uttarakhand, HP, etc. — turnover ≤ ₹5 Crore", dueDate: "24th of every month", category: "GST" },
  { form: "PMT-06 (QRMP Payment)", description: "Tax payment challan for M1 & M2 under QRMP scheme", dueDate: "25th of each of the first 2 months of the quarter", category: "GST" },
  { form: "GSTR-7 (TDS under GST)", description: "Return for persons required to deduct TDS under GST", dueDate: "10th of every month", category: "GST" },
  { form: "GSTR-8 (TCS by E-Commerce Operators)", description: "Return for e-commerce operators collecting TCS at source", dueDate: "10th of every month", category: "GST" },
  { form: "GSTR-9 (Annual Return)", description: "Annual return for all regular taxpayers with turnover > ₹2 Crore", dueDate: "31st December of next FY", category: "GST" },
  { form: "GSTR-9C (Reconciliation Statement)", description: "Self-certified reconciliation statement for turnover > ₹5 Crore", dueDate: "31st December of next FY", category: "GST" },

  // Income Tax
  { form: "ITR Filing – Individuals / HUF (Non-Audit)", description: "Income Tax Return for individuals, HUFs, and firms not requiring audit", dueDate: "31st July of Assessment Year", category: "Income Tax" },
  { form: "ITR Filing – Audit Cases (Companies / Firms)", description: "ITR for entities subject to Tax Audit under Sec 44AB", dueDate: "31st October of Assessment Year", category: "Income Tax" },
  { form: "ITR Filing – Transfer Pricing Cases", description: "ITR for entities with international transactions requiring TP report", dueDate: "30th November of Assessment Year", category: "Income Tax" },
  { form: "Tax Audit Report (Form 3CA/3CB/3CD)", description: "Tax Audit report under Section 44AB of the Income Tax Act", dueDate: "30th September of Assessment Year", category: "Income Tax" },
  { form: "Advance Tax – Q1 (15%)", description: "First instalment of advance tax for FY", dueDate: "15th June", category: "Income Tax" },
  { form: "Advance Tax – Q2 (45%)", description: "Second instalment (cumulative 45%) of advance tax", dueDate: "15th September", category: "Income Tax" },
  { form: "Advance Tax – Q3 (75%)", description: "Third instalment (cumulative 75%) of advance tax", dueDate: "15th December", category: "Income Tax" },
  { form: "Advance Tax – Q4 (100%)", description: "Final instalment (100%) of advance tax for the FY", dueDate: "15th March", category: "Income Tax" },
  { form: "Form 15CA / 15CB", description: "Certificate for foreign remittances — filed before remittance", dueDate: "Before each remittance", category: "Income Tax" },
  { form: "Form 10B / 10BB (Audit Report – Trusts)", description: "Audit report for charitable/religious trusts registered u/s 10(23C)/12AB", dueDate: "30th September", category: "Income Tax" },

  // TDS / TCS
  { form: "TDS Payment (Monthly)", description: "Payment of Tax Deducted at Source to the credit of Central Government", dueDate: "7th of the following month (30th April for March)", category: "TDS / TCS" },
  { form: "TDS Return – Q1 (Apr–Jun)", description: "Quarterly TDS return in Form 24Q / 26Q / 27Q", dueDate: "31st July", category: "TDS / TCS" },
  { form: "TDS Return – Q2 (Jul–Sep)", description: "Quarterly TDS return in Form 24Q / 26Q / 27Q", dueDate: "31st October", category: "TDS / TCS" },
  { form: "TDS Return – Q3 (Oct–Dec)", description: "Quarterly TDS return in Form 24Q / 26Q / 27Q", dueDate: "31st January", category: "TDS / TCS" },
  { form: "TDS Return – Q4 (Jan–Mar)", description: "Quarterly TDS return in Form 24Q / 26Q / 27Q", dueDate: "31st May", category: "TDS / TCS" },
  { form: "TCS Return (Quarterly)", description: "Quarterly TCS return in Form 27EQ", dueDate: "Same as TDS return dates", category: "TDS / TCS" },
  { form: "Form 16 / 16A (TDS Certificates)", description: "TDS certificate issued to deductees", dueDate: "15 days from due date of TDS return", category: "TDS / TCS" },

  // Company Law
  { form: "Form AOC-4 (Financial Statements)", description: "Filing of annual financial statements with MCA", dueDate: "30 days from AGM (OPC: 27th September)", category: "Company Law" },
  { form: "Form MGT-7 / 7A (Annual Return)", description: "Annual return for companies other than OPC and small companies", dueDate: "60 days from AGM (typically 28th November)", category: "Company Law" },
  { form: "Form DIR-3 KYC (Director KYC)", description: "Annual KYC update for all directors holding DIN", dueDate: "30th September", category: "Company Law" },
  { form: "Form MSME-1 (MSME Dues)", description: "Half-yearly return for outstanding payments to MSMEs > 45 days", dueDate: "30th April (H2) and 31st October (H1)", category: "Company Law" },
  { form: "Form BEN-2 (Beneficial Ownership)", description: "Declaration of significant beneficial ownership under Sec 90", dueDate: "Within 30 days of receiving Form BEN-1", category: "Company Law" },
  { form: "Form DPT-3 (Deposits / Loans)", description: "Return of deposits and outstanding receipt of loans", dueDate: "30th June annually", category: "Company Law" },
  { form: "Form INC-20A (Commencement of Business)", description: "Declaration of commencement of business by newly incorporated companies", dueDate: "Within 180 days of incorporation", category: "Company Law" },
  { form: "Form ADT-1 (Auditor Appointment)", description: "Notice of appointment of auditor", dueDate: "Within 15 days of AGM", category: "Company Law" },

  // PF / ESI
  { form: "PF Contribution Payment", description: "Payment of Provident Fund contributions for the month (employer + employee)", dueDate: "15th of the following month", category: "PF / ESI" },
  { form: "ESI Contribution Payment", description: "Payment of Employees' State Insurance contributions", dueDate: "15th of the following month", category: "PF / ESI" },
  { form: "PF Monthly Return (ECR)", description: "Electronic Challan cum Return filed on EPFO portal", dueDate: "25th of the following month", category: "PF / ESI" },
  { form: "ESI Half-Yearly Return", description: "Contribution returns for April–September and October–March", dueDate: "11th November and 11th May", category: "PF / ESI" },
  { form: "PF Annual Return (Form 3A / 6A)", description: "Annual member-wise contribution statement", dueDate: "30th April", category: "PF / ESI" },

  // FEMA
  { form: "FC-GPR (FDI Reporting)", description: "Report of foreign direct investment received — equity issued to non-residents", dueDate: "Within 30 days of allotment", category: "FEMA" },
  { form: "FC-TRS (Transfer of Shares)", description: "Report on transfer of shares between resident and non-resident", dueDate: "Within 60 days of receipt / payment", category: "FEMA" },
  { form: "FLA Return (Foreign Liabilities & Assets)", description: "Annual return on foreign liabilities and assets held by Indian companies", dueDate: "15th July annually", category: "FEMA" },
  { form: "APR (Annual Performance Report)", description: "Annual performance report for Indian companies with overseas investment", dueDate: "31st December annually", category: "FEMA" },
  { form: "ECB Reporting (Form ECB-2)", description: "Monthly return for external commercial borrowings", dueDate: "7th of every month", category: "FEMA" },
];

const categoryColors: Record<Exclude<Category, "All">, string> = {
  "GST": "bg-blue-100 text-blue-800",
  "Income Tax": "bg-green-100 text-green-800",
  "TDS / TCS": "bg-purple-100 text-purple-800",
  "Company Law": "bg-orange-100 text-orange-800",
  "PF / ESI": "bg-pink-100 text-pink-800",
  "FEMA": "bg-teal-100 text-teal-800",
};

const categoryBorderColors: Record<Exclude<Category, "All">, string> = {
  "GST": "border-l-blue-500",
  "Income Tax": "border-l-green-500",
  "TDS / TCS": "border-l-purple-500",
  "Company Law": "border-l-orange-500",
  "PF / ESI": "border-l-pink-500",
  "FEMA": "border-l-teal-500",
};

const officialPortals = [
  { name: "GST Portal", url: "https://www.gst.gov.in", desc: "File returns, pay tax, check registration status", tag: "GST" },
  { name: "Income Tax e-Filing", url: "https://www.incometax.gov.in", desc: "File ITR, view Form 26AS, download TDS certificates", tag: "Income Tax" },
  { name: "MCA21 Portal", url: "https://www.mca.gov.in", desc: "Company filings, director KYC, ROC compliance", tag: "Company Law" },
  { name: "TRACES Portal", url: "https://www.tdscpc.gov.in", desc: "Download Form 16/16A, verify TDS credits, corrections", tag: "TDS / TCS" },
  { name: "EPFO Member Portal", url: "https://unifiedportal-mem.epfindia.gov.in", desc: "PF balance check, UAN activation, claim processing", tag: "PF / ESI" },
  { name: "RBI FIRMS Portal", url: "https://firms.rbi.org.in", desc: "FC-GPR, FC-TRS, FLA return, FEMA filings", tag: "FEMA" },
];

interface Article {
  title: string;
  date: string;
  tag: Exclude<Category, "All">;
  excerpt: string;
  url: string;
  fy: string;
}

const articles: Article[] = [
  // FY 2024-25
  {
    title: "New Tax Regime vs Old Tax Regime — Which is Better for FY 2024-25?",
    date: "April 2024",
    tag: "Income Tax",
    excerpt: "A comprehensive analysis of which regime benefits salaried individuals, business owners, and senior citizens based on deductions and income slabs.",
    url: "https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1#taxregime",
    fy: "FY 2024-25",
  },
  {
    title: "Budget 2024 — Key Changes in Income Tax Slabs & Deductions",
    date: "February 2024",
    tag: "Income Tax",
    excerpt: "Union Budget 2024 revised the new tax regime slabs, raised the standard deduction to ₹75,000, and amended capital gains tax provisions. Full summary.",
    url: "https://incometaxindia.gov.in/Pages/press-releases/2024-budget.aspx",
    fy: "FY 2024-25",
  },
  {
    title: "GSTR-9 Annual Return FY 2024-25 — Filing Guide & Common Errors",
    date: "October 2024",
    tag: "GST",
    excerpt: "Step-by-step guidance for filing GSTR-9 for FY 2024-25, reconciliation with books of accounts, and avoiding the most common reconciliation errors.",
    url: "https://tutorial.gst.gov.in/downloads/training/returnsofgst/GSTR9_user_manual.pdf",
    fy: "FY 2024-25",
  },
  {
    title: "FLA Return 2024 — Who Must File and How",
    date: "June 2024",
    tag: "FEMA",
    excerpt: "Indian companies with foreign investment or overseas investment are required to file FLA returns by 15th July. Complete guidance on data points and filing on RBI portal.",
    url: "https://flair.rbi.org.in/fla/faces/pages/login.xhtml",
    fy: "FY 2024-25",
  },
  // FY 2023-24
  {
    title: "Section 43B(h) — Disallowance for Delayed Payments to MSMEs",
    date: "March 2024",
    tag: "TDS / TCS",
    excerpt: "New amendment effective FY 2023-24: expenses to MSMEs disallowed if not paid within 15/45 days. Form MSME-1 compliance and impact on P&L.",
    url: "https://www.incometax.gov.in/iec/foportal/help/individual/section43b",
    fy: "FY 2023-24",
  },
  {
    title: "GST ITC (Input Tax Credit) — GSTR-2B Reconciliation & Blocked Credits",
    date: "January 2024",
    tag: "GST",
    excerpt: "Understanding GSTR-2B auto-population, blocked credits under Sec 17(5), ITC reversals, and the two-year time limit for claiming input tax credit.",
    url: "https://www.gst.gov.in/newsandupdates/read/614",
    fy: "FY 2023-24",
  },
  {
    title: "Director KYC (DIR-3 KYC) — Annual Compliance for All DIN Holders",
    date: "August 2023",
    tag: "Company Law",
    excerpt: "Every director holding a DIN must file DIR-3 KYC by 30th September each year. Failure results in deactivation of DIN. Complete guide to filing on MCA21.",
    url: "https://www.mca.gov.in/content/mca/global/en/mca/master-data/MDS.html",
    fy: "FY 2023-24",
  },
  // FY 2022-23
  {
    title: "FDI in India — FC-GPR Filing & FEMA Compliance for Startups",
    date: "December 2022",
    tag: "FEMA",
    excerpt: "Step-by-step guide to FEMA compliance when raising foreign capital — FC-GPR filings within 30 days, valuation certificates, and sectoral cap restrictions.",
    url: "https://firms.rbi.org.in/firms/faces/pages/login.xhtml",
    fy: "FY 2022-23",
  },
  {
    title: "Understanding TDS on Salary — Form 12BB, Form 16, and Section 192",
    date: "June 2022",
    tag: "TDS / TCS",
    excerpt: "Employer obligations under Sec 192, collecting investment declaration in Form 12BB, and issuing Form 16 to employees — a practical employer's guide.",
    url: "https://www.tdscpc.gov.in/app/login.xhtml",
    fy: "FY 2022-23",
  },
];

interface Download {
  label: string;
  desc: string;
  url: string;
  tag: Exclude<Category, "All">;
  fy: string;
}

const downloads: Download[] = [
  // FY 2024-25
  {
    label: "ITR-1 to ITR-7 Excel Utilities (AY 2025-26)",
    desc: "Offline Excel utilities for filing ITR for AY 2025-26 (FY 2024-25)",
    url: "https://www.incometax.gov.in/iec/foportal/downloads/income-tax-returns",
    tag: "Income Tax",
    fy: "FY 2024-25",
  },
  {
    label: "GST Return Filing — Offline Tool",
    desc: "GSTN offline tool for preparing GSTR-1, GSTR-3B, and GSTR-9 returns",
    url: "https://www.gst.gov.in/download/returns",
    tag: "GST",
    fy: "FY 2024-25",
  },
  {
    label: "Form 3CA-3CB-3CD — Tax Audit Report Format",
    desc: "ICAI prescribed format for Tax Audit Report under Section 44AB",
    url: "https://resource.cdn.icai.org/69052bos54210.pdf",
    tag: "Income Tax",
    fy: "FY 2024-25",
  },
  // FY 2023-24
  {
    label: "ROC Annual Filing — AOC-4 & MGT-7 Forms",
    desc: "MCA e-forms for annual accounts and annual return filing on MCA21 portal",
    url: "https://www.mca.gov.in/content/mca/global/en/mca/e-filing/company-forms-download.html",
    tag: "Company Law",
    fy: "FY 2023-24",
  },
  {
    label: "GSTR-9 / GSTR-9C User Manual (FY 2023-24)",
    desc: "Official GSTN user manual for filing Annual Return and Reconciliation Statement",
    url: "https://tutorial.gst.gov.in/downloads/training/returnsofgst/GSTR9_user_manual.pdf",
    tag: "GST",
    fy: "FY 2023-24",
  },
  {
    label: "Form 16 / 16A TDS Certificate (TRACES)",
    desc: "Download Form 16/16A for employees and deductees from TRACES portal",
    url: "https://www.tdscpc.gov.in/app/login.xhtml",
    tag: "TDS / TCS",
    fy: "FY 2023-24",
  },
  // FY 2022-23
  {
    label: "FC-GPR / FLA Return — RBI FIRMS Portal Guide",
    desc: "RBI FIRMS portal for reporting FDI inflows, share transfers, and FLA returns",
    url: "https://firms.rbi.org.in/firms/faces/pages/login.xhtml",
    tag: "FEMA",
    fy: "FY 2022-23",
  },
  {
    label: "EPFO — ECR (Electronic Challan cum Return)",
    desc: "Unified EPFO employer portal for PF ECR upload and payment",
    url: "https://unifiedportal-emp.epfindia.gov.in/epfo/",
    tag: "PF / ESI",
    fy: "FY 2022-23",
  },
];

const fyYears = ["FY 2024-25", "FY 2023-24", "FY 2022-23"];

export default function Resources() {
  useSEO({
    title: "Due Dates & Compliance Calendar",
    description: "Comprehensive Indian compliance calendar — GST, Income Tax, TDS, Company Law, PF/ESI, and FEMA due dates. Stay penalty-free with Mehta & Associates.",
  });

  const [activeTab, setActiveTab] = useState<Category>("All");
  const [openArticleFY, setOpenArticleFY] = useState<string>("FY 2024-25");
  const [openDownloadFY, setOpenDownloadFY] = useState<string>("FY 2024-25");

  const filtered = activeTab === "All" ? dueDates : dueDates.filter(d => d.category === activeTab);

  const categories: Category[] = ["All", "GST", "Income Tax", "TDS / TCS", "Company Law", "PF / ESI", "FEMA"];

  return (
    <div className="w-full pb-20">
      {/* Page Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden" data-testid="section-resources-header">
        <div className="absolute top-[-50px] right-[-50px] w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[6%] w-56 h-56 rounded-full bg-white/5 blur-2xl animate-float-delay pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">Compliance Centre</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Due Dates & Compliance Calendar</h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Stay penalty-free. A complete reference of statutory filing deadlines across GST, Income Tax, TDS, Company Law, PF/ESI, and FEMA — updated for FY 2024-25.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert Banner */}
      <div className="bg-secondary/10 border-b border-secondary/20 py-3" data-testid="resources-alert">
        <div className="container mx-auto px-4 md:px-6 flex items-center gap-3 text-sm text-primary">
          <AlertCircle className="text-secondary shrink-0 w-5 h-5" />
          <span><strong>Note:</strong> Due dates may be extended by the government via notifications. Always verify with the official portal or contact our office before filing.</span>
        </div>
      </div>

      {/* Due Dates Table */}
      <section className="py-16 bg-gray-50" data-testid="section-due-dates">
        <div className="container mx-auto px-4 md:px-6">

          {/* Category Filter Tabs — with animated pill indicator */}
          <div className="flex flex-wrap gap-2 mb-10" data-testid="category-tabs">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveTab(cat)}
                data-testid={`tab-${cat.toLowerCase().replace(/\s|\//g, "-")}`}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border overflow-hidden ${
                  activeTab === cat
                    ? "text-white border-primary shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {activeTab === cat && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-primary rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative z-10">
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-2 text-xs opacity-70">
                      ({dueDates.filter(d => d.category === cat).length})
                    </span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Table — Desktop (re-animates rows on tab change) */}
          <div className="hidden md:block rounded-xl overflow-hidden shadow-md border border-gray-200" data-testid="due-dates-table">
            <table className="w-full text-sm bg-white">
              <thead>
                <tr className="bg-primary text-white text-left">
                  <th className="px-5 py-4 font-semibold w-[22%]">Form / Compliance</th>
                  <th className="px-5 py-4 font-semibold w-[38%]">Description</th>
                  <th className="px-5 py-4 font-semibold w-[22%]">Due Date</th>
                  <th className="px-5 py-4 font-semibold w-[18%]">Category</th>
                </tr>
              </thead>
              <AnimatePresence mode="wait">
                <motion.tbody
                  key={activeTab}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  variants={{ visible: { transition: { staggerChildren: 0.035 } } }}
                >
                  {filtered.map((item, i) => (
                    <motion.tr
                      key={item.form}
                      variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } } }}
                      className={`border-b border-gray-100 hover:bg-amber-50/30 transition-colors cursor-default ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                      data-testid={`due-date-row-${i}`}
                    >
                      <td className="px-5 py-4 font-semibold text-primary">{item.form}</td>
                      <td className="px-5 py-4 text-gray-600 leading-relaxed">{item.description}</td>
                      <td className="px-5 py-4 font-semibold text-secondary">{item.dueDate}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[item.category]}`}>
                          {item.category}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </AnimatePresence>
            </table>
          </div>

          {/* Cards — Mobile (stagger on tab change) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="md:hidden space-y-3"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.form}
                  variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
                  data-testid={`due-date-card-mobile-${i}`}
                >
                  <Card className={`border-l-4 ${categoryBorderColors[item.category]} shadow-sm`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-bold text-primary text-sm leading-snug">{item.form}</h4>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${categoryColors[item.category]}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{item.description}</p>
                      <p className="text-sm font-semibold text-secondary">📅 {item.dueDate}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-gray-500 mt-6 flex items-start gap-2">
            <Info size={14} className="shrink-0 mt-0.5 text-secondary" />
            Showing {filtered.length} of {dueDates.length} compliance items. Dates are for general reference — extension notifications supersede these dates.
          </p>
        </div>
      </section>

      {/* Official Portals */}
      <section className="py-16 bg-white border-t border-gray-100" data-testid="section-portals">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">Quick Access</h2>
            <h3 className="text-3xl font-serif font-bold text-primary">Official Government Portals</h3>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm">Direct links to statutory portals for filing, payments, and status checks.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {officialPortals.map((portal, i) => (
              <motion.a
                key={i}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: "0 14px 36px -8px rgba(26,46,90,0.14)" }}
                className="group flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-secondary/50 transition-colors duration-200"
                data-testid={`portal-link-${i}`}
              >
                <motion.div
                  className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.1, backgroundColor: "#c9a84c" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <ExternalLink className="text-white w-5 h-5" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-primary text-sm group-hover:text-secondary transition-colors">{portal.name}</h4>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${categoryColors[portal.tag as Exclude<Category, "All">]}`}>
                      {portal.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{portal.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Articles by FY */}
      <section className="py-16 bg-gray-50 border-t border-gray-100" data-testid="section-articles">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-10">
            <FileText className="text-secondary w-6 h-6" />
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary">Articles & Insights</h3>
              <p className="text-sm text-gray-500 mt-0.5">Segregated by Financial Year — click any article to read on the official source</p>
            </div>
          </div>

          <div className="space-y-4">
            {fyYears.map(fy => {
              const fyArticles = articles.filter(a => a.fy === fy);
              const isOpen = openArticleFY === fy;
              return (
                <motion.div
                  key={fy}
                  layout
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                  data-testid={`article-fy-${fy}`}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenArticleFY(isOpen ? "" : fy)}
                    data-testid={`article-fy-toggle-${fy}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-serif font-bold text-primary">{fy}</span>
                      <motion.span
                        key={isOpen ? "open" : "closed"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xs font-semibold bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full"
                      >
                        {fyArticles.length} articles
                      </motion.span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
                      <ChevronDown className={`w-5 h-5 shrink-0 ${isOpen ? "text-secondary" : "text-gray-400"}`} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ height: { duration: 0.32, ease: [0.33, 1, 0.68, 1] }, opacity: { duration: 0.22 } }}
                        style={{ overflow: "hidden" }}
                      >
                        <motion.div
                          className="border-t border-gray-100 divide-y divide-gray-50"
                          initial="hidden"
                          animate="visible"
                          variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                        >
                          {fyArticles.map((article, i) => (
                            <motion.a
                              key={i}
                              variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.28 } } }}
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-start gap-4 px-6 py-5 hover:bg-gray-50 transition-colors"
                              data-testid={`article-link-${fy}-${i}`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${categoryColors[article.tag]}`}>{article.tag}</span>
                                  <span className="text-xs text-gray-400">{article.date}</span>
                                </div>
                                <h4 className="font-bold text-primary font-serif text-base leading-snug mb-1.5 group-hover:text-secondary transition-colors">{article.title}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{article.excerpt}</p>
                              </div>
                              <ExternalLink className="text-gray-300 group-hover:text-secondary transition-colors shrink-0 mt-1 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </motion.a>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Downloads by FY */}
      <section className="py-16 bg-white border-t border-gray-100" data-testid="section-downloads">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <Download className="text-secondary w-6 h-6" />
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary">Forms & Downloads</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Segregated by Financial Year — all links redirect to official government portals</p>
                </div>
              </div>

              <div className="space-y-4">
                {fyYears.map(fy => {
                  const fyDownloads = downloads.filter(d => d.fy === fy);
                  const isOpen = openDownloadFY === fy;
                  return (
                    <motion.div key={fy} layout className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm" data-testid={`download-fy-${fy}`}>
                      <button
                        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-100 transition-colors"
                        onClick={() => setOpenDownloadFY(isOpen ? "" : fy)}
                        data-testid={`download-fy-toggle-${fy}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-serif font-bold text-primary">{fy}</span>
                          <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">{fyDownloads.length} resources</span>
                        </div>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
                          <ChevronDown className={`w-5 h-5 shrink-0 ${isOpen ? "text-secondary" : "text-gray-400"}`} />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ height: { duration: 0.32, ease: [0.33, 1, 0.68, 1] }, opacity: { duration: 0.22 } }}
                          style={{ overflow: "hidden" }}
                        >
                        <motion.div
                          className="border-t border-gray-200 bg-white divide-y divide-gray-50"
                          initial="hidden"
                          animate="visible"
                          variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } } }}
                        >
                          {fyDownloads.map((item, i) => (
                            <motion.a
                              key={i}
                              variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.28 } } }}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                              data-testid={`download-link-${fy}-${i}`}
                            >
                              <div className="w-10 h-10 rounded-lg bg-primary/5 group-hover:bg-secondary/10 flex items-center justify-center shrink-0 transition-colors">
                                <Download className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="font-semibold text-primary text-sm group-hover:text-secondary transition-colors">{item.label}</span>
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full hidden sm:inline-block ${categoryColors[item.tag]}`}>{item.tag}</span>
                                </div>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                              </div>
                              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-secondary shrink-0 transition-colors" />
                            </motion.a>
                          ))}
                        </motion.div>
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-6">
              <div className="bg-primary text-white rounded-xl p-6">
                <CalendarDays className="text-secondary w-8 h-8 mb-4" />
                <h4 className="font-serif font-bold text-lg mb-2">Need Help with Filings?</h4>
                <p className="text-gray-300 text-sm mb-5 leading-relaxed">Our team tracks every deadline for you. Never miss a filing or pay a penalty again.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-secondary text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-secondary/90 transition-colors" data-testid="link-resources-contact">
                  Get In Touch <ArrowRight size={16} />
                </Link>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-serif font-bold text-primary mb-3">Official Portals</h4>
                <ul className="space-y-3">
                  {officialPortals.map((p, i) => (
                    <li key={i}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between text-sm hover:text-secondary transition-colors" data-testid={`sidebar-portal-${i}`}>
                        <span className="font-medium text-gray-700 group-hover:text-secondary">{p.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-secondary shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
