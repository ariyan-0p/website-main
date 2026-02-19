import React from "react";
import { useTheme } from "./ThemeContext";

export default function Newsletter() {
  const { isDark, t } = useTheme();

  return (
    <section 
      style={{ 
        // Light gray in light mode, subtle dark transparent in dark mode
        background: isDark ? "rgba(255,255,255,0.02)" : "#f3f4f6", 
        borderTop: `1px solid ${t.border}`
      }} 
      className="py-16 md:py-24 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* ── LEFT: TEXT CONTENT ── */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 
            className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight font-['Plus Jakarta Sans']"
            style={{ color: t.text }}
          >
            Connect to the Future
          </h2>
          <p className="text-base md:text-lg font-medium" style={{ color: t.textMuted }}>
            Get valuable tips on the future of restaurant technology and industry trends.
          </p>
        </div>

        {/* ── RIGHT: INPUT & BUTTON ── */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row w-full max-w-lg gap-0 sm:gap-3"
          >
            <input 
              type="email" 
              placeholder="Add Your Email" 
              required
              className="w-full px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-3 sm:mb-0"
              style={{
                background: isDark ? "rgba(0,0,0,0.5)" : "transparent",
                border: `1px solid ${isDark ? t.borderStrong : "rgba(0,0,0,0.2)"}`,
                color: t.text,
              }}
            />
            <button 
              type="submit"
              className="px-10 py-4 font-bold text-base whitespace-nowrap transition-transform active:scale-95"
              style={{
                // Invert button colors for high contrast based on theme
                background: isDark ? "#ffffff" : "#000000",
                color: isDark ? "#000000" : "#ffffff",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}