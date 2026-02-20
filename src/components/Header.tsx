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

const PRODUCTS = [
  { icon: Zap,        label: "Billing / POS", desc: "Fast, cloud-based billing",   path: "/product/pos",       color: "#f59e0b" },
  { icon: Tablet,     label: "Kiosk",         desc: "Self-order experience",        path: "/product/kiosk",     color: "#10b981" },
  { icon: BarChart2,  label: "Analytics",     desc: "Real-time insights",           path: "/product/analytics", color: "#a855f7" },
  { icon: Smartphone, label: "Mobile App",    desc: "Manage from anywhere",         path: "/product/mobile",    color: "#3b82f6" },
  { icon: Monitor,    label: "Dashboard",     desc: "Central command center",       path: "/product/dashboard", color: "#64748b" },
];

export default function Header({ onContactClick }: HeaderProps) {
  const { isDark, toggleTheme, t } = useTheme();
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [productOpen,    setProductOpen]    = useState(false);
  const [mobileProducts, setMobileProducts] = useState(true);

  const dropRef  = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setProductOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductOpen(false);
  }, [location]);

  // ── Colours that respond to scroll + theme ──────────────────
  const navBg = scrolled
    ? isDark
      ? "rgba(10,10,14,0.88)"
      : "rgba(255,255,255,0.88)"
    : "transparent";

  const navBorder = scrolled
    ? isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
    : "transparent";                    // c) no border when at top

  const logoColor  = isDark ? "#ffffff" : "#0c121c";
  const linkColor  = isDark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.5)";
  const linkHover  = isDark ? "#ffffff" : "#0c121c";
  const ctaBg      = isDark ? "#ffffff" : "#0c121c";
  const ctaText    = isDark ? "#0c121c" : "#ffffff";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        /* ── Nav link — subtle underline slide ───────────────── */
        .nav-link {
          position: relative;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          padding-bottom: 2px;
          transition: color 0.22s ease;
          display: flex; align-items: center; gap: 5px;
          background: none; border: none; cursor: pointer; outline: none;
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 0%; height: 1.5px;
          background: currentColor;
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-link:hover::after { width: 100%; }

        /* ── CTA button ──────────────────────────────────────── */
        .cta-btn {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
          border-radius: 9999px;
          padding: 10px 22px;
          cursor: pointer; outline: none; border: none;
          transition: opacity 0.18s ease, transform 0.14s ease;
          white-space: nowrap;
        }
        .cta-btn:hover  { opacity: 0.85; }
        .cta-btn:active { transform: scale(0.96); }

        /* ── Theme toggle ────────────────────────────────────── */
        .theme-switch {
          width: 46px; height: 26px; border-radius: 99px;
          display: flex; align-items: center; padding: 2px;
          cursor: pointer; border: 1px solid;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .switch-knob {
          width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          transition: margin 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        /* ── Dropdown ────────────────────────────────────────── */
        .prod-dropdown {
          position: absolute; top: calc(100% + 14px); left: 50%;
          transform: translateX(-50%);
          width: 300px;
          border-radius: 18px;
          overflow: hidden;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 300;
          padding: 6px;
        }
        .prod-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 12px; border-radius: 12px;
          text-decoration: none;
          transition: background 0.15s ease;
          cursor: pointer;
        }

        /* ── Hamburger ───────────────────────────────────────── */
        .ham-btn {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 9px;
          cursor: pointer; outline: none;
          transition: background 0.2s ease;
        }
      `}</style>

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          // c) No border at top — completely transparent over hero
          background:     navBg,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:   `1px solid ${navBorder}`,
          transition:     "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
          height: 70,
        }}
      >
        <nav style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 32px",
          height: "100%",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}>

          {/* ── LOGO ───────────────────────────────────────────── */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ textDecoration: "none", flexShrink: 0 }}
          >
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900,
              fontSize: "1.45rem",
              letterSpacing: "-0.05em",
              color: logoColor,
              lineHeight: 1,
            }}>
              RenoBill
            </span>
          </Link>

          {/* ── DESKTOP NAV ────────────────────────────────────── */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 36 }}
          >
            {/* Products dropdown */}
            <div ref={dropRef} style={{ position: "relative" }}>
              <button
                className="nav-link"
                style={{ color: productOpen ? linkHover : linkColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = productOpen ? linkHover : linkColor)}
                onClick={() => setProductOpen((p) => !p)}
              >
                Products
                <motion.span
                  animate={{ rotate: productOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex" }}
                >
                  <ChevronDown size={13} strokeWidth={2} />
                </motion.span>
              </button>

              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    className="prod-dropdown"
                    initial={{ opacity: 0, y: 8,  scale: 0.97 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{   opacity: 0, y: 8,  scale: 0.97 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    style={{
                      background: isDark
                        ? "rgba(12,12,18,0.96)"
                        : "rgba(255,255,255,0.96)",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
                      boxShadow: isDark
                        ? "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)"
                        : "0 24px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
                    }}
                  >
                    {PRODUCTS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <Link
                          key={p.label}
                          to={p.path}
                          className="prod-item"
                          onClick={() => setProductOpen(false)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = isDark
                              ? "rgba(255,255,255,0.07)"
                              : "rgba(0,0,0,0.04)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          <div style={{
                            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                            background: isDark ? "rgba(255,255,255,0.06)" : `${p.color}18`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Icon size={17} strokeWidth={2} color={p.color} />
                          </div>
                          <div>
                            <div style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 600, fontSize: "0.875rem",
                              color: isDark ? "#ffffff" : "#0c121c",
                              marginBottom: 2,
                            }}>
                              {p.label}
                            </div>
                            <div style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontSize: "0.72rem", color: linkColor,
                            }}>
                              {p.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About */}
            <Link
              to="/about"
              className="nav-link"
              style={{ color: linkColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              About
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className="nav-link"
              style={{ color: linkColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              Contact
            </Link>
          </div>

          {/* ── RIGHT CONTROLS ─────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>

            {/* Theme toggle */}
            <div
              className="theme-switch"
              onClick={toggleTheme}
              style={{
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="switch-knob"
                style={{
                  background: isDark ? "#ffffff" : "#0f172a",
                  marginLeft: isDark ? "20px" : "0px",
                  color: isDark ? "#000" : "#fff",
                }}
              >
                {isDark
                  ? <Moon size={11} fill="currentColor" />
                  : <Sun  size={11} fill="currentColor" />
                }
              </div>
            </div>

            {/* CTA — desktop */}
            <button
              className="cta-btn hidden md:block"
              onClick={onContactClick}
              style={{
                background: ctaBg,
                color:      ctaText,
                boxShadow: isDark
                  ? "0 0 0 1px rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.4)"
                  : "0 0 0 1px rgba(0,0,0,0.08), 0 4px 14px rgba(0,0,0,0.1)",
              }}
            >
              Get in Touch
            </button>

            {/* Hamburger — mobile */}
            <button
              className="ham-btn md:hidden"
              onClick={() => setMobileOpen((p) => !p)}
              style={{
                background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <X    key="x" size={16} />
                  : <Menu key="m" size={16} />
                }
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* ── MOBILE MENU ──────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{   opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed", top: 70, left: 0, right: 0,
                overflow: "hidden",
                borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
                background: isDark ? "rgba(6,6,10,0.98)" : "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div style={{
                padding: "20px 24px",
                display: "flex", flexDirection: "column", gap: 4,
              }}>
                {/* Products accordion */}
                <button
                  onClick={() => setMobileProducts((p) => !p)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 0",
                    background: "none", border: "none", cursor: "pointer", width: "100%",
                  }}
                >
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600, fontSize: "0.9rem",
                    color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
                  }}>
                    Products
                  </span>
                  <motion.span
                    animate={{ rotate: mobileProducts ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "flex" }}
                  >
                    <ChevronDown size={14} color={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileProducts && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{   height: 0, opacity: 0 }}
                      style={{ overflow: "hidden", paddingLeft: 8 }}
                    >
                      {PRODUCTS.map((p) => {
                        const Icon = p.icon;
                        return (
                          <Link
                            key={p.label}
                            to={p.path}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              display: "flex", alignItems: "center", gap: 12,
                              padding: "11px 8px", textDecoration: "none",
                              borderRadius: 10,
                            }}
                          >
                            <div style={{
                              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                              background: `${p.color}18`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <Icon size={15} strokeWidth={2} color={p.color} />
                            </div>
                            <span style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 600, fontSize: "0.9rem",
                              color: isDark ? "#ffffff" : "#0c121c",
                            }}>
                              {p.label}
                            </span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ height: 1, background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", margin: "6px 0" }} />

                {["About", "Contact"].map((label) => (
                  <Link
                    key={label}
                    to={`/${label.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600, fontSize: "0.9rem",
                      color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
                      textDecoration: "none",
                      padding: "12px 0", display: "block",
                    }}
                  >
                    {label}
                  </Link>
                ))}

                <button
                  onClick={() => { onContactClick(); setMobileOpen(false); }}
                  style={{
                    marginTop: 16, padding: "14px",
                    borderRadius: 9999,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700, fontSize: "0.9rem",
                    background: ctaBg, color: ctaText,
                    border: "none", cursor: "pointer", width: "100%",
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