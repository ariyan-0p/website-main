import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Users, Globe, Award } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function About() {
  const { t, isDark } = useTheme();

  // Scroll to top on load
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: t.bg, color: t.text }} className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <Header onContactClick={() => {}} />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* 1. HERO TEXT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              We build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">OS for Restaurants.</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto" style={{ color: t.textMuted }}>
              RenoBill isn't just a billing software. It's the nervous system of modern retail businesses, designed to make complex operations feel invisible.
            </p>
          </motion.div>

          {/* 2. STATS GRID */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-24"
          >
            {[
              { label: "Active Merchants", value: "1,000+", icon: Users },
              { label: "Cities Covered", value: "12+", icon: Globe },
              { label: "Orders Processed", value: "5M+", icon: Award },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl text-center border transition-all hover:scale-105"
                style={{ 
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                  borderColor: t.border
                }}
              >
                <stat.icon className="mx-auto mb-4 text-blue-500" size={32} />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest opacity-60 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* 3. OUR STORY (Simple Text) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg mx-auto"
            style={{ color: t.textMuted }}
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: t.text }}>The Mission</h2>
            <p className="mb-6">
              It started with a simple observation: Restaurant owners were spending more time fixing their software than serving their food. 
              Legacy systems were clunky, offline-only, and ugly.
            </p>
            <p>
              We built RenoBill to change that. We believe that business software should be as delightful to use as your favorite consumer app. 
              Fast, beautiful, and reliable.
            </p>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}