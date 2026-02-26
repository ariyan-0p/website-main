import React from "react";
import { useTheme } from "./ThemeContext";
import { 
  Coffee, Utensils, ShoppingBag, Pizza, 
  Store, Wine, Croissant, ChefHat, ArrowRight 
} from "lucide-react";

// --- DUMMY BRANDS DATA ---
const BRANDS = [
  { name: "Urban Brew", icon: Coffee, type: "Cafe" },
  { name: "Burger Joint", icon: Pizza, type: "QSR" }, // Pizza icon as placeholder for food
  { name: "Metro Retail", icon: ShoppingBag, type: "Retail" },
  { name: "Saffron Grill", icon: Utensils, type: "Fine Dine" },
  { name: "The Bakery", icon: Croissant, type: "Bakery" },
  { name: "Fusion Bistro", icon: ChefHat, type: "Restaurant" },
  { name: "Moda Store", icon: Store, type: "Boutique" },
  { name: "Elite Club", icon: Wine, type: "Lounge" },
];

export default function TrustedBy() {
  const { isDark, t } = useTheme();

  return (
    <section 
      style={{ 
        background: isDark ? "#050505" : "#fafafa", // Slightly darker/lighter than main bg
        borderBottom: `1px solid ${t.border}`,
        padding: "80px 0",
        position: "relative",
        overflow: "hidden"
      }}
    >
      
      {/* ── SECTION TITLE ── */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 
          style={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif", 
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: t.text,
            letterSpacing: "-0.03em"
          }}
        >
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">1000+ Businesses.</span>
        </h2>
      </div>

      {/* ── INFINITE SCROLLING CARDS ── */}
      <div className="relative w-full overflow-hidden">
        
        {/* Gradient Masks (Fade edges) */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${isDark ? "#050505" : "#fafafa"}, transparent)` }}
        />
        <div 
          className="absolute top-0 bottom-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${isDark ? "#050505" : "#fafafa"}, transparent)` }}
        />

        {/* Scrolling Track */}
        <div className="flex animate-marquee gap-6 w-max px-6">
          {/* We duplicate the array 3 times to ensure smooth infinite loop */}
          {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, index) => {
            const Icon = brand.icon;
            return (
              <div 
                key={index} 
                className="group relative flex flex-col items-center justify-center w-[200px] h-[140px] rounded-2xl transition-all duration-300 hover:scale-105 cursor-default"
                style={{ 
                  background: isDark ? "rgba(255,255,255,0.03)" : "white",
                  border: `1px solid ${t.border}`,
                  boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.05)"
                }}
              >
                {/* Icon Box */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ 
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    color: t.textMuted
                  }}
                >
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                
                {/* Brand Name */}
                <span 
                  style={{ 
                    fontFamily: "'Plus Jakarta Sans', sans-serif", 
                    fontWeight: 600, 
                    color: t.text,
                    fontSize: "0.95rem"
                  }}
                >
                  {brand.name}
                </span>
                
                {/* Hover Glow Effect (Optional for Dark Mode) */}
                {isDark && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM CTA (Matches your screenshot) ── */}
      {/* <div className="text-center mt-24">
        <p className="text-sm text-gray-500 mb-6 font-medium tracking-wide">
          From independent cafes to established franchises, we drive growth.
        </p>
        
        <div className="flex items-center justify-center gap-2">
          <span style={{ fontSize: "1.2rem", fontWeight: 700, color: t.text }}>
            Ready to scale your <span className="text-blue-500">Business?</span>
          </span>
          
          <button 
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-transform active:scale-95 ml-4"
            style={{ 
              background: t.text, 
              color: t.bg 
            }}
          >
            Let's Add Your Logo <ArrowRight size={16} />
          </button>
        </div>
      </div> */}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Move half the total width */
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        /* Pause on hover for better UX */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}