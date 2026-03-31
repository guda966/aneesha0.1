import { useSEO } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  city: z.string().min(2, "City is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide more details"),
});

export default function Contact() {
  useSEO({
    title: "Contact Us",
    description: "Get in touch with Mehta & Associates for professional CA services in Mumbai. Request a consultation for audit, tax, or advisory needs.",
  });

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      service: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulate API call
    toast({
      title: "Inquiry Submitted Successfully",
      description: "Our team will contact you within 24 business hours.",
    });
    form.reset();
  }

  return (
    <div className="w-full pb-20 bg-gray-50 min-h-screen">
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              We look forward to discussing how we can add value to your business. Reach out to schedule a consultation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-8">Firm Details</h2>
              </div>
              
              <Card className="border-none shadow-md">
                <CardContent className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center shrink-0">
                      <MapPin className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Head Office</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        14th Floor, Maker Chambers VI,<br />
                        Nariman Point, Mumbai - 400021,<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center shrink-0">
                      <Phone className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Phone</h4>
                      <p className="text-sm text-gray-600">+91 22 2282 1234</p>
                      <p className="text-sm text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center shrink-0">
                      <Mail className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Email</h4>
                      <p className="text-sm text-gray-600">info@mehtaandassociates.com</p>
                      <p className="text-sm text-gray-600">consult@mehtaandassociates.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center shrink-0">
                      <Clock className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Business Hours</h4>
                      <p className="text-sm text-gray-600">Mon - Fri: 10:00 AM - 7:00 PM</p>
                      <p className="text-sm text-gray-600">Sat: 10:00 AM - 2:00 PM</p>
                      <p className="text-sm text-gray-600">Sun: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                 <span className="relative z-10 text-gray-500 font-medium flex items-center gap-2">
                   <MapPin /> Google Maps Integration
                 </span>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Card className="border-none shadow-lg bg-white h-full">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-6">Send an Inquiry</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="bg-gray-50 border-gray-200" data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 XXXXX XXXXX" {...field} className="bg-gray-50 border-gray-200" data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">Email Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="john@company.com" {...field} className="bg-gray-50 border-gray-200" data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">City *</FormLabel>
                              <FormControl>
                                <Input placeholder="Mumbai" {...field} className="bg-gray-50 border-gray-200" data-testid="input-city" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary font-semibold">Service Required *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-50 border-gray-200" data-testid="select-service">
                                  <SelectValue placeholder="Select a service category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="audit">Audit & Assurance</SelectItem>
                                <SelectItem value="income-tax">Income Tax Advisory</SelectItem>
                                <SelectItem value="gst">GST Compliance</SelectItem>
                                <SelectItem value="company-law">Company Law & ROC</SelectItem>
                                <SelectItem value="fema">FEMA & NRI Services</SelectItem>
                                <SelectItem value="other">Other/General Inquiry</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary font-semibold">Message / Requirements *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Briefly describe your business and requirements..." 
                                className="min-h-[120px] bg-gray-50 border-gray-200 resize-none" 
                                {...field} 
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full bg-secondary text-white hover:bg-secondary/90 h-14 text-lg" data-testid="button-submit">
                        Submit Inquiry
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
