import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, ChevronsRight } from "lucide-react";
import { useTheme } from "./ThemeContext";

// Placeholder image (You can swap this with a real composite image later)
import posMockup from "../assets/billing-laptop.png"; 

const RESTAURANT_TYPES = [
  {
    id: "quick-service",
    label: "Quick Service",
    title: "Quick Service",
    description: "A versatile Point of Sale system for your restaurant with a Customer Facing Display which you can set up quickly and easily. Our powerful, cloud-based ecosystem is the perfect companion for efficiently serving Quick-Service Restaurants."
  },
  {
    id: "full-service",
    label: "Full Service",
    title: "Full Service Dining",
    description: "Elevate your guest experience with robust table management, coursing, and split-billing capabilities. Empower your servers to spend more time with guests and less time at the terminal."
  },
  {
    id: "cafes",
    label: "Cafés",
    title: "Cafés & Coffee Shops",
    description: "Keep the morning rush moving with lightning-fast order entry, custom modifiers for complex drinks, and integrated loyalty programs that keep your regulars coming back."
  },
  {
    id: "food-trucks",
    label: "Food Trucks",
    title: "Food Trucks & Pop-ups",
    description: "A compact, offline-first POS that works wherever you park. Process orders on a mobile tablet and track your inventory on the go without worrying about Wi-Fi drops."
  },
  {
    id: "bars",
    label: "Bars & Breweries",
    title: "Bars & Nightclubs",
    description: "Keep the drinks flowing with quick-tab pre-authorizations, fast bartender logins, and robust inventory tracking down to the exact pour."
  },
  {
    id: "enterprise",
    label: "Enterprise",
    title: "Multi-Location Enterprise",
    description: "Manage dozens of outlets from a single master dashboard. Sync menus globally, track franchise performance, and maintain enterprise-grade security."
  }
];

export default function RestaurantTypes() {
  const { isDark, t } = useTheme();
  const [activeTab, setActiveTab] = useState(RESTAURANT_TYPES[0].id);

  const activeData = RESTAURANT_TYPES.find(t => t.id === activeTab) || RESTAURANT_TYPES[0];

  return (
    <section 
      className="py-24 transition-colors duration-300"
      style={{ background: t.bg, borderBottom: `1px solid ${t.border}` }}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ── HEADING ── */}
        <h2 
          className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight"
          style={{ color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Works For All Restaurant Types, Including Yours!
        </h2>

        {/* ── SCROLLABLE TABS ── */}
        <div className="relative w-full mb-12">
          {/* Hide scrollbar using inline styles */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x">
            {RESTAURANT_TYPES.map((type) => {
              const isActive = activeTab === type.id;
              
              // Dynamic tab styling based on Theme & Active State
              const tabBg = isActive 
                ? (isDark ? "#ffffff" : "#0c121c") 
                : "transparent";
              const tabColor = isActive 
                ? (isDark ? "#0c121c" : "#ffffff") 
                : t.text;
              const tabBorder = isActive 
                ? "transparent" 
                : t.border;

              return (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className="px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 snap-start text-sm md:text-base border"
                  style={{
                    background: tabBg,
                    color: tabColor,
                    borderColor: tabBorder,
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  }}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: Visial / Image Area */}
          <div className="relative w-full aspect-[4/3] flex items-center justify-center rounded-3xl p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Visual Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
                
                {/* Main Product Image Placeholder */}
                <img 
                  src={posMockup} 
                  alt="POS System" 
                  className="relative z-10 w-full max-w-md drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
                />

                {/* Floating Labels (Matching the screenshot style) */}
                <div className="absolute top-[15%] right-[10%] z-20 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg" style={{ background: t.bgCard, color: t.text, border: `1px solid ${t.border}` }}>
                  Point of Sale
                </div>
                <div className="absolute bottom-[15%] left-[5%] z-20 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg" style={{ background: t.bgCard, color: t.text, border: `1px solid ${t.border}` }}>
                  Point of Purchase
                </div>
                <div className="absolute bottom-[5%] right-[5%] z-20 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg" style={{ background: t.bgCard, color: t.text, border: `1px solid ${t.border}` }}>
                  Kitchen Display
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Text Card (High Contrast) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 md:p-12 rounded-[2rem] shadow-2xl"
              style={{
                // Invert the colors for the card so it pops exactly like the screenshot
                background: isDark ? "#ffffff" : "#0f172a",
                color: isDark ? "#000000" : "#ffffff",
              }}
            >
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6 font-['Plus Jakarta Sans']">
                {activeData.title}
              </h3>
              <p className="text-base md:text-lg leading-relaxed mb-10 opacity-90 font-medium">
                {activeData.description}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap items-center gap-4">
                
                {/* Learn More Button */}
                <button 
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-transform active:scale-95"
                  style={{
                    background: isDark ? "#000000" : "#ffffff",
                    color: isDark ? "#ffffff" : "#000000"
                  }}
                >
                  Learn More <Info size={16} />
                </button>

                {/* Get Started Outline Button */}
                <button 
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border transition-opacity hover:opacity-70"
                  style={{
                    borderColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
                    color: isDark ? "#000000" : "#ffffff"
                  }}
                >
                  Get Started <ChevronsRight size={18} />
                </button>

                {/* Play Button */}
                <button 
                  className="w-12 h-12 flex items-center justify-center rounded-full border transition-opacity hover:opacity-70 shrink-0"
                  style={{
                    borderColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
                    color: isDark ? "#000000" : "#ffffff"
                  }}
                >
                  <Play size={18} fill="currentColor" className="ml-1" />
                </button>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}