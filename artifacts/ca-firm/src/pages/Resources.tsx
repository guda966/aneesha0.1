import { useSEO } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CalendarDays, ExternalLink, FileText, AlertCircle, Download, Info } from "lucide-react";
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

const articles = [
  { title: "New Tax Regime vs Old Tax Regime — Which is Better for FY 2024-25?", date: "April 15, 2024", tag: "Income Tax", excerpt: "A comprehensive analysis of which regime benefits salaried individuals, business owners, and senior citizens based on deductions and income slabs." },
  { title: "GST ITC (Input Tax Credit) — Common Mistakes and How to Avoid Them", date: "March 22, 2024", tag: "GST", excerpt: "Understanding GSTR-2B reconciliation, blocked credits under Sec 17(5), and time limit for ITC claims — practical guidance for businesses." },
  { title: "Section 43B(h) — TDS on Payments to MSMEs from FY 2023-24", date: "February 10, 2024", tag: "TDS / TCS", excerpt: "New disallowance provision for delayed payments to MSMEs and how to ensure your business remains compliant with Form MSME-1." },
  { title: "FDI in India — FEMA Compliance Checklist for Startups Raising Foreign Capital", date: "January 5, 2024", tag: "FEMA", excerpt: "Step-by-step FEMA/RBI compliance guide covering FC-GPR filings, valuation certificates, and sectoral caps for foreign investments." },
];

export default function Resources() {
  useSEO({
    title: "Due Dates & Compliance Calendar",
    description: "Comprehensive Indian compliance calendar — GST, Income Tax, TDS, Company Law, PF/ESI, and FEMA due dates. Stay penalty-free with Mehta & Associates.",
  });

  const [activeTab, setActiveTab] = useState<Category>("All");

  const filtered = activeTab === "All" ? dueDates : dueDates.filter(d => d.category === activeTab);

  const categories: Category[] = ["All", "GST", "Income Tax", "TDS / TCS", "Company Law", "PF / ESI", "FEMA"];

  return (
    <div className="w-full pb-20">
      {/* Page Header */}
      <section className="bg-primary text-white py-20" data-testid="section-resources-header">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
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

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10" data-testid="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                data-testid={`tab-${cat.toLowerCase().replace(/\s|\//g, "-")}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeTab === cat
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-2 text-xs opacity-70">
                    ({dueDates.filter(d => d.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Table — Desktop */}
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
              <tbody>
                {filtered.map((item, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
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
              </tbody>
            </table>
          </div>

          {/* Cards — Mobile */}
          <div className="md:hidden space-y-4">
            {filtered.map((item, i) => (
              <Card key={i} className={`border-l-4 ${categoryBorderColors[item.category]} shadow-sm`} data-testid={`due-date-card-mobile-${i}`}>
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
            ))}
          </div>

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
                className="group flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-secondary/50 hover:shadow-md transition-all duration-300"
                data-testid={`portal-link-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                  <ExternalLink className="text-white w-5 h-5" />
                </div>
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

      {/* Articles + Downloads */}
      <section className="py-16 bg-gray-50 border-t border-gray-100" data-testid="section-articles">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Articles */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="text-secondary w-6 h-6" />
                <h3 className="text-2xl font-serif font-bold text-primary">Latest Articles & Insights</h3>
              </div>
              <div className="space-y-6">
                {articles.map((article, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-secondary/40 hover:shadow-md transition-all duration-300 cursor-pointer"
                    data-testid={`article-card-${i}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${categoryColors[article.tag as Exclude<Category, "All">]}`}>
                            {article.tag}
                          </span>
                          <span className="text-xs text-gray-400">{article.date}</span>
                        </div>
                        <h4 className="font-bold text-primary font-serif text-lg leading-snug mb-2 group-hover:text-secondary transition-colors">{article.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{article.excerpt}</p>
                      </div>
                      <ArrowRight className="text-gray-300 group-hover:text-secondary transition-colors shrink-0 mt-1 group-hover:translate-x-1 duration-300" size={20} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Downloads */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5 border-b border-gray-100 pb-4">
                  <Download className="text-secondary w-5 h-5" />
                  <h4 className="text-lg font-serif font-bold text-primary">Useful Downloads</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    { label: "KYC Document Checklist", testId: "download-kyc" },
                    { label: "Tax Audit Data Requirements", testId: "download-audit" },
                    { label: "Company Incorporation Checklist", testId: "download-inc" },
                    { label: "GST Registration Documents List", testId: "download-gst" },
                    { label: "NRI / FEMA Compliance Guide", testId: "download-fema" },
                  ].map((item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="flex items-center justify-between group py-2 border-b border-gray-50"
                        data-testid={item.testId}
                        onClick={e => e.preventDefault()}
                      >
                        <span className="text-sm text-gray-700 group-hover:text-primary transition-colors font-medium">{item.label}</span>
                        <Download className="w-4 h-4 text-gray-300 group-hover:text-secondary transition-colors" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div className="bg-primary text-white rounded-xl p-6">
                <CalendarDays className="text-secondary w-8 h-8 mb-4" />
                <h4 className="font-serif font-bold text-lg mb-2">Need Help with Filings?</h4>
                <p className="text-gray-300 text-sm mb-5 leading-relaxed">Our team tracks every deadline for you. Never miss a filing or pay a penalty again.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-secondary text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-secondary/90 transition-colors" data-testid="link-resources-contact">
                  Get In Touch <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
