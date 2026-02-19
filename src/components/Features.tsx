import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Receipt, Boxes, FileText, Smartphone,
  Printer, PieChart, QrCode, Users, ChefHat,
  ArrowUpRight,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

/* ─── Data ─────────────────────────────────────────── */
const features = [
  { icon: Receipt,    title: "Smart Billing",  tag: "Signature",   description: "Lightning-fast POS with customisable receipts, split bills, and instant GST invoicing.", big: true },
  { icon: ChefHat,    title: "KDS",            tag: "Chef's Pick",  description: "Kitchen Display System that replaces paper tickets with a clear digital screen.", big: true },
  { icon: Boxes,      title: "Inventory",      description: "Real-time stock tracking with automated low-stock alerts and supplier reorder." },
  { icon: FileText,   title: "Reports",        description: "Comprehensive daily, weekly, and monthly analytics with export to PDF or Excel." },
  { icon: Smartphone, title: "Mobile Access",  description: "Manage your entire business from anywhere — real-time data on any device." },
  { icon: Printer,    title: "KOT Printing",   description: "Instant kitchen order tickets to your printer the moment an order is placed." },
  { icon: PieChart,   title: "Analytics",      description: "Track best-sellers, peak hours, staff performance, and revenue trends." },
  { icon: QrCode,     title: "QR Menu",        description: "Contactless digital menu with real-time updates — no reprinting ever needed." },
  { icon: Users,      title: "Waiter App",     description: "Table-side ordering from a handheld device, synced live to kitchen and billing." },
];

/* ─── Scrolling marquee strip ───────────────────────── */
const words = ["Smart Billing","Inventory","KOT Printing","Analytics","QR Menu","Waiter App","KDS","Reports","Mobile Access"];

const MarqueeStrip = ({ isDark }) => {
  const c = isDark;
  return (
    <div style={{
      overflow: "hidden",
      borderTop: `1px solid ${c ? "#222" : "#e8e8e8"}`,
      borderBottom: `1px solid ${c ? "#222" : "#e8e8e8"}`,
      padding: "13px 0",
      background: c ? "#0e0e0e" : "#ffffff",
    }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", width: "max-content", whiteSpace: "nowrap" }}
      >
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "10.5px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: c ? "#333" : "#c8c8c8",
            padding: "0 24px",
            display: "inline-flex",
            alignItems: "center",
            gap: "24px",
          }}>
            {w}
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: c ? "#333" : "#c8c8c8", display: "inline-block" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Big "hero" feature card ───────────────────────── */
const BigCard = ({ feature, index, isDark }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = feature.icon;
  const c = isDark;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: c ? (hovered ? "#181818" : "#131313") : (hovered ? "#ffffff" : "#ffffff"),
        border: `1px solid ${c ? (hovered ? "#2e2e2e" : "#1e1e1e") : (hovered ? "#d8d8d8" : "#ebebeb")}`,
        borderRadius: "22px",
        padding: "40px 36px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? (c ? "0 24px 60px rgba(0,0,0,0.55)" : "0 24px 60px rgba(0,0,0,0.10)") : "none",
        display: "flex",
        flexDirection: "column",
        minHeight: "300px",
        cursor: "default",
      }}
    >
      {/* Ghost icon */}
      <div style={{
        position: "absolute",
        right: "-24px",
        bottom: "-24px",
        opacity: c ? 0.035 : 0.055,
        pointerEvents: "none",
        transition: "opacity 0.3s",
      }}>
        <Icon size={180} strokeWidth={0.7} color={c ? "#fff" : "#000"} />
      </div>

      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "auto" }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "9.5px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: c ? "#3a3a3a" : "#b8b8b8",
          background: c ? "#1a1a1a" : "#f0f0f0",
          padding: "5px 13px",
          borderRadius: "100px",
        }}>
          ✦ {feature.tag}
        </span>
        <motion.div animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }} transition={{ duration: 0.2 }}>
          <ArrowUpRight size={17} color={c ? "#555" : "#b8b8b8"} />
        </motion.div>
      </div>

      {/* Bottom content */}
      <div style={{ paddingTop: "52px", position: "relative", zIndex: 1 }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: c ? "#1e1e1e" : "#f0f0f0",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "18px",
        }}>
          <Icon size={19} color={c ? "#ccc" : "#555555"} strokeWidth={1.7} />
        </div>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "24px",
          fontWeight: 800,
          color: c ? "#eeebe6" : "#111111",
          margin: "0 0 11px",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}>
          {feature.title}
        </h3>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "14px",
          lineHeight: 1.68,
          color: c ? "#555" : "#999999",
          margin: 0,
          maxWidth: "280px",
          fontWeight: 400,
        }}>
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

/* ─── Menu-list row (à la carte style) ─────────────── */
const MenuRow = ({ feature, index, isDark }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = feature.icon;
  const c = isDark;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.48, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "18px 20px",
        borderBottom: `1px solid ${c ? "#181818" : "#ebebeb"}`,
        background: hovered ? (c ? "#141414" : "#f9f9f9") : "transparent",
        borderRadius: hovered ? "12px" : "0",
        transition: "background 0.22s, border-radius 0.22s",
        cursor: "default",
      }}
    >
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        color: c ? "#292929" : "#d0c9bf",
        letterSpacing: "0.06em",
        minWidth: "26px",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div style={{
        width: "36px", height: "36px", borderRadius: "10px",
        background: c ? "#191919" : "#f0f0f0",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.22s",
      }}>
        <Icon size={16} color={c ? "#777" : "#666666"} strokeWidth={1.8} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "14.5px",
            fontWeight: 700,
            color: c ? "#e0dcd8" : "#111111",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}>
            {feature.title}
          </span>
          <div style={{
            flex: 1,
            borderBottom: `1px dashed ${c ? "#232323" : "#e0e0e0"}`,
            marginBottom: "2px",
          }} />
        </div>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "12.5px",
          color: c ? "#4a4a4a" : "#a8a8a8",
          margin: 0,
          lineHeight: 1.5,
          fontWeight: 400,
        }}>
          {feature.description}
        </p>
      </div>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -5 }}
        transition={{ duration: 0.18 }}
        style={{ flexShrink: 0 }}
      >
        <ArrowUpRight size={14} color={c ? "#555" : "#b8b8b8"} />
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────── */
const Features = () => {
  const { isDark } = useTheme();
  const c = isDark;

  const bg        = c ? "#0a0a0a" : "#ffffff";
  const textPri   = c ? "#eeeae5" : "#111111";
  const textSec   = c ? "#4e4e4e" : "#999999";
  const panelBg   = c ? "#0f0f0f" : "#ffffff";
  const panelBord = c ? "#1e1e1e" : "#e8e8e8";
  const divider   = c ? "#1a1a1a" : "#e8e8e8";

  const bigFeatures  = features.filter(f => f.big);
  const listFeatures = features.filter(f => !f.big);

  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section style={{ background: bg, transition: "background 0.35s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap');
      `}</style>

      {/* ── Section header ───────────────────────────── */}
      <div ref={headerRef} style={{ maxWidth: "1220px", margin: "0 auto", padding: "88px 32px 52px" }}>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "36px",
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45 }}
              style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}
            >
              <div style={{ width: "28px", height: "1px", background: textSec }} />
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: textSec,
              }}>
                Features
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(36px, 5.2vw, 66px)",
                fontWeight: 800,
                color: textPri,
                margin: 0,
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
              }}
            >
              The full menu,
              <br />
              <span style={{ fontWeight: 300, fontStyle: "italic" }}>
                served fresh.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "15px",
              lineHeight: 1.72,
              color: textSec,
              maxWidth: "320px",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Nine tools, one platform. Built for restaurants, cafes, cloud kitchens, and every food business in between.
          </motion.p>
        </div>
      </div>

      {/* ── Marquee ──────────────────────────────────── */}
      <MarqueeStrip isDark={c} />

      {/* ── Main grid ────────────────────────────────── */}
      <div style={{ maxWidth: "1220px", margin: "0 auto", padding: "56px 32px 100px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "20px",
          alignItems: "start",
        }}>

          {/* LEFT — two big cards + stat strip */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {bigFeatures.map((f, i) => (
              <BigCard key={f.title} feature={f} index={i} isDark={c} />
            ))}

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                background: panelBg,
                border: `1px solid ${panelBord}`,
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              {[
                { val: "9",    label: "Modules" },
                { val: "1",    label: "Platform" },
                { val: "∞",   label: "Scale" },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: "26px 18px",
                  borderRight: i < 2 ? `1px solid ${divider}` : "none",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "32px",
                    fontWeight: 800,
                    color: textPri,
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}>{s.val}</div>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "9.5px",
                    fontWeight: 600,
                    color: textSec,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — à la carte menu panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: panelBg,
              border: `1px solid ${panelBord}`,
              borderRadius: "22px",
              overflow: "hidden",
              position: "sticky",
              top: "28px",
            }}
          >
            {/* Panel header */}
            <div style={{
              padding: "26px 22px 20px",
              borderBottom: `1px solid ${divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: textSec,
                  margin: "0 0 4px",
                }}>
                  Today's Essentials
                </p>
                <h4 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: textPri,
                  margin: 0,
                  letterSpacing: "-0.025em",
                }}>
                  À la carte features
                </h4>
              </div>

              {/* Live pulse */}
              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: c ? "#0d1f0d" : "#e6f4e6",
                border: `1px solid ${c ? "#1a341a" : "#c3dfc3"}`,
                borderRadius: "100px",
                padding: "5px 12px",
              }}>
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4caf50" }}
                />
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#4caf50",
                }}>LIVE</span>
              </div>
            </div>

            {/* Rows */}
            <div style={{ padding: "10px" }}>
              {listFeatures.map((f, i) => (
                <MenuRow key={f.title} feature={f} index={i} isDark={c} />
              ))}
            </div>

            {/* Footer */}
            <div style={{
              padding: "18px 22px",
              borderTop: `1px solid ${divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "12px",
                color: textSec,
                fontStyle: "italic",
                fontWeight: 400,
              }}>
                All features included in every plan.
              </span>
              <div style={{
                width: "27px", height: "27px",
                borderRadius: "50%",
                border: `1px solid ${divider}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ArrowUpRight size={12} color={textSec} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;