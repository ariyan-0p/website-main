import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Sun, Moon, ChevronDown, 
  Zap, Tablet, BarChart2, Smartphone, Monitor 
} from "lucide-react";
import { useTheme } from "./ThemeContext";

interface HeaderProps {
  onContactClick: () => void;
}

// --- DROPDOWN DATA ---
const PRODUCTS = [
  { icon: Zap, label: "Billing / POS", desc: "Fast, cloud-based billing", path: "/product/pos", color: "#f59e0b" },
  { icon: Tablet, label: "Kiosk", desc: "Self-order experience", path: "/product/kiosk", color: "#10b981" },
  { icon: BarChart2, label: "Analytics", desc: "Real-time insights", path: "/product/analytics", color: "#a855f7" },
  { icon: Smartphone, label: "Mobile App", desc: "Manage from anywhere", path: "/product/mobile", color: "#3b82f6" },
  { icon: Monitor, label: "Dashboard", desc: "Central command center", path: "/product/dashboard", color: "#64748b" }
];

export default function Header({ onContactClick }: HeaderProps) {
  const { isDark, toggleTheme, t } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(true);
  
  const dropRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setProductOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductOpen(false);
  }, [location]);

  // Original Transparency Logic
  const headerBg = scrolled
    ? `${t.headerBg}0.94)`
    : `${t.headerBg}0.55)`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        /* --- RESTORED ORIGINAL NAV STYLES --- */
        .nav-link {
          position: relative;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          padding-bottom: 4px;
          transition: color 0.22s ease;
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; cursor: pointer;
          outline: none;
        }
        /* The specific underline animation you liked */
        .nav-link::after {
          content: '';
          position: absolute; bottom: 0px; left: 0;
          width: 0%; height: 1px;
          background: currentColor;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-link:hover::after {
          width: 100%;
        }

        .contact-btn {
          position: relative; overflow: hidden;
          font-family: 'Outfit', sans-serif; font-weight: 700;
          font-size: 0.8rem; letter-spacing: 0.03em;
          border-radius: 9999px; padding: 10px 24px;
          cursor: pointer; outline: none; border: none;
          transition: opacity 0.2s ease, transform 0.15s ease;
        }
        .contact-btn:hover { opacity: 0.88; }
        .contact-btn:active { transform: scale(0.96); }

        .hamburger-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          cursor: pointer; outline: none;
          transition: background 0.2s ease;
        }

        /* --- NEW COOL DROPDOWN STYLE (Matches reference) --- */
        .cool-dropdown {
          position: absolute; top: calc(100% + 15px); left: 50%;
          transform: translateX(-50%);
          width: 320px; 
          border-radius: 16px; 
          overflow: hidden;
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          z-index: 200;
          padding: 8px;
          box-shadow: 0 20px 50px -12px rgba(0,0,0,0.5);
        }
        .cool-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 12px 14px;
          text-decoration: none;
          transition: background 0.2s ease;
          border-radius: 12px;
          cursor: pointer;
        }
        /* Hover effect for items */
        .cool-item:hover {
          background: rgba(255,255,255,0.08); 
        }
        /* Light mode hover adjustment handled in inline styles below */

        /* --- THEME TOGGLE SWITCH --- */
        .theme-switch {
          width: 50px; height: 28px;
          border-radius: 99px;
          display: flex; align-items: center;
          padding: 2px;
          cursor: pointer;
          border: 1px solid;
          transition: background 0.3s ease, border-color 0.3s ease;
          position: relative;
        }
        .switch-knob {
          width: 22px; height: 22px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      `}</style>

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: headerBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${scrolled ? t.borderStrong : t.border}`,
          transition: "background 0.4s ease, border-color 0.4s ease",
          height: 70
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: isDark
            ? "linear-gradient(90deg,transparent,rgba(255,255,255,0.1) 30%,rgba(255,255,255,0.05) 70%,transparent)"
            : "linear-gradient(90deg,transparent,rgba(0,0,0,0.06) 30%,rgba(0,0,0,0.03) 70%,transparent)",
          pointerEvents: "none",
        }}/>

        <nav style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 24px",
          height: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* ── LOGO (Clean Text Only) ── */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ textDecoration: 'none', display: "flex", alignItems: "center" }}
          >
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800, fontSize: "1.5rem",
              letterSpacing: "-0.04em",
              color: t.text, // Dynamic Black/White
              lineHeight: 1,
            }}>
              RenoBill
            </span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden md:flex items-center gap-10">

            {/* PRODUCT DROPDOWN */}
            <div ref={dropRef} style={{ position: "relative" }}>
              <button
                className="nav-link"
                style={{ color: productOpen ? t.text : t.textMuted }}
                onClick={() => setProductOpen((p) => !p)}
              >
                Products
                <motion.span animate={{ rotate: productOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={12} />
                </motion.span>
              </button>

              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    className="cool-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{   opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{
                      // Dark dropdown always looks cool, or adapt to theme
                      background: isDark ? "rgba(10, 10, 12, 0.95)" : "rgba(255, 255, 255, 0.95)",
                      border: `1px solid ${t.border}`,
                    }}
                  >
                    <div>
                      {PRODUCTS.map((p) => {
                        const Icon = p.icon;
                        return (
                          <Link 
                            key={p.label} 
                            to={p.path} 
                            className="cool-item" 
                            onClick={() => setProductOpen(false)}
                            // Manual hover handling for light mode visibility
                            onMouseEnter={(e) => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            <div style={{
                              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: p.color // Colored icons
                            }}>
                              <Icon size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: "0.9rem", color: t.text, marginBottom: 2 }}>
                                {p.label}
                              </div>
                              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em", color: t.textMuted }}>
                                {p.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ABOUT */}
            <Link to="/about" className="nav-link" style={{ color: t.textMuted }}
               onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
               onMouseLeave={(e) => (e.currentTarget.style.color = t.textMuted)}>
               About
            </Link>

            {/* CONTACT */}
            <Link to="/contact" className="nav-link" style={{ color: t.textMuted }}
               onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
               onMouseLeave={(e) => (e.currentTarget.style.color = t.textMuted)}>
               Contact
            </Link>
          </div>

          {/* ── RIGHT CONTROLS ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

            {/* THEME TOGGLE SWITCH */}
            <div 
              className="theme-switch" 
              onClick={toggleTheme}
              style={{
                background: t.bgCard,
                borderColor: t.border
              }}
            >
              <motion.div 
                className="switch-knob"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{
                  background: isDark ? "#ffffff" : "#0f172a",
                  marginLeft: isDark ? "22px" : "0px",
                  color: isDark ? "#000" : "#fff"
                }}
              >
                 {isDark ? <Moon size={12} fill="currentColor" /> : <Sun size={12} fill="currentColor" />}
              </motion.div>
            </div>

            {/* CTA */}
            <button
              className="contact-btn hidden md:block"
              onClick={onContactClick}
              style={{
                background: isDark ? "#ffffff" : "#0c121c",
                color:      isDark ? "#0c121c" : "#ffffff",
                boxShadow:  isDark ? "0 0 0 1px rgba(255,255,255,0.08)" : "0 0 0 1px rgba(0,0,0,0.1)",
              }}
            >
              Get in Touch
            </button>

            {/* HAMBURGER (Mobile) */}
            <button
              className="hamburger-btn md:hidden"
              onClick={() => setMobileOpen((p) => !p)}
              style={{
                background: t.bgCard,
                border: `1px solid ${t.border}`,
                color: t.textMuted,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? <X key="x" size={16} /> : <Menu key="m" size={16} />}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* ── MOBILE MENU (Kept Functional) ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{   opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease: [0.22,1,0.36,1] }}
              style={{
                position: "fixed", top: 70, left: 0, right: 0,
                overflow: "hidden",
                borderTop: `1px solid ${t.border}`,
                background: isDark ? "rgba(6,6,8,0.98)" : "rgba(255,255,255,0.98)",
              }}
            >
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
                
                {/* Mobile Products */}
                <button
                  onClick={() => setMobileProducts((p) => !p)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 0", background: "none", border: "none", cursor: "pointer", width: "100%",
                  }}
                >
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.textMuted }}>
                    Products
                  </span>
                  <motion.span animate={{ rotate: mobileProducts ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} color={t.textFaint} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileProducts && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: "hidden", paddingLeft: 12 }}
                    >
                      {PRODUCTS.map((p) => {
                        const Icon = p.icon;
                        return (
                          <Link 
                            key={p.label} 
                            to={p.path} 
                            onClick={() => setMobileOpen(false)}
                            style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", textDecoration: "none", color: t.text }}
                          >
                            <Icon size={16} color={p.color} />
                            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>{p.label}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ height: 1, background: t.border, margin: "6px 0" }}/>

                <Link to="/about" onClick={() => setMobileOpen(false)} style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.textMuted, textDecoration: "none", padding: "12px 0", display: "block" }}>About</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.textMuted, textDecoration: "none", padding: "12px 0", display: "block" }}>Contact</Link>

                <button
                  onClick={() => { onContactClick(); setMobileOpen(false); }}
                  style={{
                    marginTop: 12, padding: "14px", borderRadius: 9999,
                    fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: "0.9rem",
                    background: isDark ? "#ffffff" : "#0c121c",
                    color:      isDark ? "#0c121c" : "#ffffff",
                    border: "none", cursor: "pointer", width: "100%"
                  }}
                >
                  Get in Touch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}