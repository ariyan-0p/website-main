import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function Contact() {
  const { t, isDark } = useTheme();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: t.bg, color: t.text }} className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <Header onContactClick={() => {}} />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* LEFT: INFO */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-extrabold mb-6">Let's Talk.</h1>
              <p className="text-xl mb-12" style={{ color: t.textMuted }}>
                Ready to upgrade your business? We're here to help.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-500">
                     <Mail size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg">Email Us</h3>
                     <p style={{ color: t.textMuted }}>hello@renobill.com</p>
                     <p style={{ color: t.textMuted }}>support@renobill.com</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 text-purple-500">
                     <Phone size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg">Call Us</h3>
                     <p style={{ color: t.textMuted }}>+91 98765 43210</p>
                     <p className="text-sm opacity-60">Mon-Fri, 9am - 6pm</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 text-green-500">
                     <MapPin size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg">Visit Us</h3>
                     <p style={{ color: t.textMuted }}>
                       12th Floor, Cyber City,<br />
                       Tech Hub, Bangalore - 560001
                     </p>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: SIMPLE FORM */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-3xl border"
              style={{ 
                background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                borderColor: t.border,
                boxShadow: isDark ? "none" : "0 10px 40px -10px rgba(0,0,0,0.05)"
              }}
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1 opacity-80">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-transparent border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    style={{ borderColor: t.border, color: t.text }}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1 opacity-80">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl bg-transparent border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    style={{ borderColor: t.border, color: t.text }}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1 opacity-80">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-transparent border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    style={{ borderColor: t.border, color: t.text }}
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <button 
                  className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ background: t.text, color: t.bg }}
                >
                  Send Message <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}