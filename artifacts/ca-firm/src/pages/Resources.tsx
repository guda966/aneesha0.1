import { useSEO } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download, FileText, ArrowRight } from "lucide-react";

export default function Resources() {
  useSEO({
    title: "Resources & Compliance Calendar",
    description: "Stay updated with important Indian tax compliance deadlines, GST due dates, and read our latest tax advisory articles.",
  });

  const compliances = [
    { title: "GSTR-1 (Monthly)", date: "11th of succeeding month", category: "GST", desc: "For taxpayers with turnover > 5Cr or not opted for QRMP" },
    { title: "GSTR-3B (Monthly)", date: "20th of succeeding month", category: "GST", desc: "Summary return and payment of tax" },
    { title: "TDS Payment", date: "7th of succeeding month", category: "Income Tax", desc: "Payment of Tax Deducted at Source" },
    { title: "TDS Return (Quarterly)", date: "31st Jul/Oct/Jan, 31st May", category: "Income Tax", desc: "Form 24Q/26Q filing" },
    { title: "Advance Tax", date: "15th Jun/Sep/Dec/Mar", category: "Income Tax", desc: "Quarterly installments (15%, 45%, 75%, 100%)" },
    { title: "ITR Filing (Non-Audit)", date: "31st July", category: "Income Tax", desc: "Individuals, HUFs, Firms not subject to audit" },
    { title: "ITR Filing (Audit)", date: "31st October", category: "Income Tax", desc: "Companies and entities subject to Tax Audit" },
    { title: "ROC Annual Return", date: "Within 60 days of AGM", category: "Company Law", desc: "Form MGT-7/7A filing" },
  ];

  const articles = [
    { title: "Impact of New Tax Regime vs Old Tax Regime for FY 2024-25", date: "April 15, 2024", excerpt: "A comprehensive analysis of which tax regime is beneficial based on your income brackets and eligible deductions." },
    { title: "Recent changes in GST Input Tax Credit (ITC) Rules", date: "March 22, 2024", excerpt: "Understanding the strict linking of GSTR-2B with 3B and how it impacts your business working capital." },
    { title: "Foreign Direct Investment (FDI) guidelines for Tech Startups", date: "February 10, 2024", excerpt: "Navigating RBI compliance and FEMA regulations when raising capital from foreign investors." }
  ];

  return (
    <div className="w-full pb-20">
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Resources & Insights</h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Knowledge is power. Access our compliance calendar, thought leadership, and essential utility downloads.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <CalendarDays className="text-secondary w-8 h-8" />
              <h2 className="text-3xl font-serif font-bold text-primary">Compliance Calendar</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {compliances.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="h-full border-l-4 border-l-secondary border-t-0 border-r-0 border-b-0 shadow-sm hover:shadow-md transition-shadow rounded-none rounded-r-lg" data-testid={`card-compliance-${i}`}>
                    <CardHeader className="p-5 pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-bold text-primary">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="text-secondary font-semibold mb-2">{item.date}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: Articles & Downloads */}
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-secondary w-6 h-6" />
                <h3 className="text-2xl font-serif font-bold text-primary">Latest Articles</h3>
              </div>
              <div className="space-y-6">
                {articles.map((article, i) => (
                  <div key={i} className="group cursor-pointer" data-testid={`link-article-${i}`}>
                    <p className="text-xs text-gray-500 mb-1">{article.date}</p>
                    <h4 className="font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{article.title}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
                    <span className="text-sm font-semibold text-secondary flex items-center">
                      Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-primary mb-4 border-b pb-4">Utility Downloads</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center justify-between group" data-testid="link-download-kyc">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary">KYC Document Checklist</span>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-secondary" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between group" data-testid="link-download-audit">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary">Tax Audit Data Requirments</span>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-secondary" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between group" data-testid="link-download-inc">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary">Company Incorporation Form</span>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-secondary" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
