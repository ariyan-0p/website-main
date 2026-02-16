import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/productData";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeContext"; // 1. Import Theme Hook
import Header from "./Header";
import Footer from "./Footer";

const ProductPage = () => {
  const { productId } = useParams();
  const { isDark, t } = useTheme(); // 2. Get current theme values
  
  // @ts-ignore
  const data = products[productId];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!data) return (
    <div style={{ background: t.bg, color: t.text }} className="min-h-screen pt-40 text-center text-2xl font-bold">
      Product Coming Soon
    </div>
  );

  const mainFeature = data.slides[0];

  return (
    // 3. Apply Dynamic Background & Text Colors
    <div 
      style={{ background: t.bg, color: t.text, transition: "background 0.3s ease, color 0.3s ease" }} 
      className="min-h-screen flex flex-col font-sans"
    >
      <Header onContactClick={() => {}} />

      <main className="flex-grow pt-20 lg:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
            
            {/* ── LEFT: STICKY IMAGE ── */}
            <div className="w-full lg:w-1/2 lg:h-[80vh] lg:sticky lg:top-24 flex items-start justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full"
              >
                 {/* Glow Effect (Only visible in Dark Mode for pop) */}
                 {isDark && (
                   <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr ${data.color} opacity-20 blur-[100px] rounded-full pointer-events-none`} />
                 )}
                 
                 <img 
                   src={mainFeature.bgImage} 
                   alt={mainFeature.title} 
                   className="relative z-10 w-full h-auto drop-shadow-2xl rounded-lg"
                 />
              </motion.div>
            </div>

            {/* ── RIGHT: CONTENT ── */}
            <div className="w-full lg:w-1/2 flex flex-col gap-10 pt-2 lg:pt-4">
              
              {/* 1. HERO TEXT */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={`text-sm font-bold tracking-wider uppercase mb-3 bg-gradient-to-r ${data.color} bg-clip-text text-transparent inline-block border-b pb-1`} style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  {data.heroTitle}
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-[1.1]" style={{ color: t.text }}>
                  {mainFeature.title}
                </h1>
                <p className="text-lg leading-relaxed mb-6" style={{ color: t.textMuted }}>
                  {mainFeature.description}
                </p>
                
                {/* Visual Cue */}
                <div className="flex items-center gap-2 text-sm animate-pulse" style={{ color: t.textMuted }}>
                    <ChevronDown size={16} />
                    <span>Scroll for details</span>
                </div>
              </motion.div>

              {/* 2. CORE FEATURES (The Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mainFeature.features && mainFeature.features.map((feature: any, idx: number) => {
                     const Icon = feature.icon;
                     return (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 p-3 rounded-xl transition-colors border"
                        style={{ 
                          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', // Light gray in light mode
                          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' 
                        }}
                      >
                        <div 
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                          style={{ 
                            background: isDark ? '#171717' : '#ffffff', 
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                            color: isDark ? '#a3a3a3' : '#4b5563'
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <span className="font-medium text-sm" style={{ color: t.text }}>{feature.label}</span>
                      </div>
                     );
                  })}
              </div>

              {/* 3. TECH SPECS */}
              {mainFeature.specs && (
                <div 
                  className="rounded-2xl p-5 border mt-2"
                  style={{ 
                    background: isDark ? 'rgba(255,255,255,0.03)' : '#f9fafb',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                  }}
                >
                   <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: t.textMuted }}>Technical Specifications</h3>
                   <div className="space-y-2">
                      {mainFeature.specs.map((spec: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3" style={{ color: t.text }}>
                           <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${data.color}`} />
                           <span className="font-mono text-sm opacity-80">{spec}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {/* 4. DEEP DIVE DESCRIPTION */}
              <div className="border-l-2 pl-6 py-2 mt-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                 <h3 className="text-xl font-bold mb-2" style={{ color: t.text }}>Built for Performance</h3>
                 <p className="leading-relaxed text-base" style={{ color: t.textMuted }}>
                    {mainFeature.longDescription}
                 </p>
              </div>

              {/* 5. WHY CHOOSE */}
              <div className="pt-8 border-t mt-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                 <h3 className="text-2xl font-bold mb-6" style={{ color: t.text }}>Key Benefits</h3>
                 <div className="space-y-6">
                    {mainFeature.bottomFeatures && mainFeature.bottomFeatures.map((detail: any, idx: number) => (
                      <div key={idx} className="flex gap-4 group">
                          <div className={`mt-1 w-8 h-8 rounded-full bg-gradient-to-br ${data.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                              <CheckCircle2 size={16} className="text-white" />
                          </div>
                          <div>
                             <h4 className="font-bold mb-1 group-hover:text-purple-500 transition-colors" style={{ color: t.text }}>{detail.title}</h4>
                             <p className="text-sm leading-relaxed" style={{ color: t.textMuted }}>{detail.desc}</p>
                          </div>
                      </div>
                    ))}
                 </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;