import { useSEO } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MapPin } from "lucide-react";
import meetingImg from "@/assets/images/meeting.png";

export default function About() {
  useSEO({
    title: "About The Firm",
    description: "Learn about Mehta & Associates history, our mission, core values, and meet our founding partners.",
  });

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden" data-testid="section-about-header">
        <div className="absolute top-[-40px] right-[-40px] w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-[-50px] left-[5%] w-56 h-56 rounded-full bg-white/5 blur-2xl animate-float pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-3">Our Firm</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About The Firm</h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              A legacy of trust, excellence, and unwavering commitment to financial clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-20 bg-white" data-testid="section-about-history">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">Our History</h2>
              <h3 className="text-3xl font-serif font-bold text-primary mb-6">Building Trust Since 1998</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded by CA Ramesh Mehta in a modest office in Fort, Mumbai, Mehta & Associates began with a simple philosophy: provide technical excellence with personal attention. Over the past 25 years, the firm has grown from a single-partner practice to a robust team of professionals serving clients globally.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Today, we operate from our modern headquarters in Nariman Point, but our core ethos remains unchanged. We treat our clients' businesses as our own, providing insights that protect their interests and propel their growth.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-secondary" data-testid="mission-box">
                  <h4 className="font-serif font-bold text-primary text-lg mb-2">Our Mission</h4>
                  <p className="text-sm text-gray-600">To provide reliable, timely, and quality professional services while upholding the highest standards of ethics.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary" data-testid="vision-box">
                  <h4 className="font-serif font-bold text-primary text-lg mb-2">Our Vision</h4>
                  <p className="text-sm text-gray-600">To be the most trusted and respected professional services firm in India.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src={meetingImg} alt="Indian business professionals in a meeting" className="rounded-lg shadow-xl w-full object-cover aspect-[4/3]" data-testid="about-image"/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50" data-testid="section-about-values">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">The Foundation</h2>
            <h3 className="text-3xl font-serif font-bold text-primary">Our Core Values</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Integrity", desc: "Uncompromising adherence to moral and ethical principles in all our dealings." },
              { title: "Excellence", desc: "Commitment to delivering the highest quality of service and technical accuracy." },
              { title: "Confidentiality", desc: "Absolute discretion and protection of our clients' sensitive information." },
              { title: "Client-Centricity", desc: "Deep understanding of client needs and providing tailored, practical solutions." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow" data-testid={`card-value-${i}`}>
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="text-primary w-6 h-6" />
                    </div>
                    <h4 className="font-serif font-bold text-xl text-primary mb-3">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white" data-testid="section-about-partners">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">Leadership</h2>
            <h3 className="text-3xl font-serif font-bold text-primary">Meet Our Partners</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "CA Ramesh Mehta", role: "Founder & Senior Partner", credentials: "FCA, B.Com", memNo: "Mem No: 045123", exp: "35+ Years Experience", desc: "Specializes in Corporate Taxation, Representation before ITAT, and Strategic Business Advisory." },
              { name: "CA Priya Sharma", role: "Managing Partner", credentials: "FCA, DISA (ICAI)", memNo: "Mem No: 128945", exp: "20+ Years Experience", desc: "Leads the Statutory Audit and Assurance practice. Expert in Ind AS compliance and corporate governance." },
              { name: "CA Vikram Desai", role: "Partner - Indirect Tax", credentials: "FCA, LL.B", memNo: "Mem No: 145678", exp: "15+ Years Experience", desc: "Heads the GST and Indirect Tax division. Regularly advises Fortune 500 companies on complex supply chain taxation." }
            ].map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-gray-100 overflow-hidden" data-testid={`card-partner-${i}`}>
                  <div className="bg-gray-100 h-48 w-full flex items-center justify-center border-b border-gray-200">
                     <span className="text-4xl font-serif text-gray-300 font-bold">{partner.name.charAt(3)}</span>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-serif font-bold text-primary mb-1">{partner.name}</h4>
                    <p className="text-secondary font-medium text-sm mb-3">{partner.role}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium">{partner.credentials}</span>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium">{partner.memNo}</span>
                    </div>
                    <p className="text-primary text-sm font-semibold mb-2">{partner.exp}</p>
                    <p className="text-gray-600 text-sm">{partner.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Office location tease */}
      <section className="py-16 border-t border-gray-100 bg-gray-50" data-testid="section-about-location">
         <div className="container mx-auto px-4 text-center">
            <MapPin className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">Headquartered in Mumbai</h3>
            <p className="text-gray-600 max-w-lg mx-auto">Operating from the heart of India's financial capital at Nariman Point, we are strategically positioned to serve corporate clients seamlessly.</p>
         </div>
      </section>
    </div>
  );
}
