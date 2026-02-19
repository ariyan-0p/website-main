import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Receipt, Boxes, FileText, Smartphone,
  Printer, PieChart, QrCode, Users, ChefHat,
  ArrowUpRight,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

/* ─── Breakpoint hook ───────────────────────────────────── */
function useIsMobile(bp = 768) {
  const [v, set] = useState(
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const fn = () => set(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return v;
}

/* ─── Data ──────────────────────────────────────────────── */
const features = [
  { icon: Receipt,    title: "Smart Billing",  tag: "Signature",  description: "Lightning-fast POS with customisable receipts, split bills, and instant GST invoicing.", big: true  },
  { icon: ChefHat,    title: "KDS",            tag: "Chef's Pick", description: "Kitchen Display System that replaces paper tickets with a clear digital screen.", big: true  },
  { icon: Boxes,      title: "Inventory",      description: "Real-time stock tracking with automated low-stock alerts and supplier reorder." },
  { icon: FileText,   title: "Reports",        description: "Comprehensive daily, weekly, and monthly analytics with export to PDF or Excel." },
  { icon: Smartphone, title: "Mobile Access",  description: "Manage your entire business from anywhere — real-time data on any device." },
  { icon: Printer,    title: "KOT Printing",   description: "Instant kitchen order tickets to your printer the moment an order is placed." },
  { icon: PieChart,   title: "Analytics",      description: "Track best-sellers, peak hours, staff performance, and revenue trends." },
  { icon: QrCode,     title: "QR Menu",        description: "Contactless digital menu with real-time updates — no reprinting ever needed." },
  { icon: Users,      title: "Waiter App",     description: "Table-side ordering from a handheld device, synced live to kitchen and billing." },
];

const words = [
  "Smart Billing","Inventory","KOT Printing","Analytics",
  "QR Menu","Waiter App","KDS","Reports","Mobile Access",
];

/* ─── Marquee ───────────────────────────────────────────── */
function MarqueeStrip({ isDark }) {
  const border = isDark ? "#222" : "#e8e8e8";
  const bg     = isDark ? "#0e0e0e" : "#ffffff";
  const color  = isDark ? "#333" : "#c8c8c8";
  return (
    <div style={{ overflow:"hidden", borderTop:`1px solid ${border}`, borderBottom:`1px solid ${border}`, padding:"12px 0", background:bg }}>
      <motion.div
        animate={{ x:["0%","-50%"] }}
        transition={{ duration:30, repeat:Infinity, ease:"linear" }}
        style={{ display:"flex", width:"max-content", whiteSpace:"nowrap" }}
      >
        {[...words,...words,...words,...words].map((w,i)=>(
          <span key={i} style={{
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"10px",
            fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase",
            color, padding:"0 22px",
            display:"inline-flex", alignItems:"center", gap:"22px",
          }}>
            {w}
            <span style={{ width:"3px", height:"3px", borderRadius:"50%", background:color, display:"inline-block" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Big hero card ─────────────────────────────────────── */
function BigCard({ feature, index, isDark, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const ref  = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  const Icon = feature.icon;

  const bg      = isDark ? (hovered?"#181818":"#131313") : (hovered?"#ffffff":"#ffffff");
  const border  = isDark ? (hovered?"#2e2e2e":"#1e1e1e") : (hovered?"#d8d8d8":"#ebebeb");
  const textPri = isDark ? "#eeebe6" : "#111111";
  const textSec = isDark ? "#555" : "#999999";
  const tagBg   = isDark ? "#1f1f1f" : "#f0f0f0";
  const tagCol  = isDark ? "#555" : "#999999";
  const iconBg  = isDark ? "#222" : "#f0f0f0";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:32 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.6, delay:index*0.1, ease:[0.22,1,0.36,1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:bg, border:`1px solid ${border}`, borderRadius:"20px",
        padding: isMobile ? "28px 24px" : "40px 36px",
        position:"relative", overflow:"hidden",
        transition:"background 0.3s, border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? (isDark?"0 24px 60px rgba(0,0,0,0.5)":"0 24px 60px rgba(0,0,0,0.09)") : "none",
        display:"flex", flexDirection:"column",
        minHeight: isMobile ? "240px" : "300px",
        cursor:"default",
      }}
    >
      {/* Ghost icon */}
      <div style={{ position:"absolute", right:"-20px", bottom:"-20px", opacity:isDark?0.03:0.05, pointerEvents:"none" }}>
        <Icon size={isMobile?130:180} strokeWidth={0.7} color={isDark?"#fff":"#000"} />
      </div>

      {/* Top row */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"auto" }}>
        <span style={{
          fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"9px", fontWeight:700,
          letterSpacing:"0.2em", textTransform:"uppercase",
          color:tagCol, background:tagBg, padding:"4px 12px", borderRadius:"100px",
        }}>✦ {feature.tag}</span>
        <motion.div animate={{ opacity:hovered?1:0, y:hovered?0:4 }} transition={{ duration:0.2 }}>
          <ArrowUpRight size={16} color={textSec} />
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ paddingTop: isMobile ? "36px" : "48px", position:"relative", zIndex:1 }}>
        <div style={{
          width:"42px", height:"42px", borderRadius:"12px",
          background:iconBg, display:"flex", alignItems:"center", justifyContent:"center",
          marginBottom:"16px",
        }}>
          <Icon size={18} color={isDark?"#ccc":"#555555"} strokeWidth={1.7} />
        </div>
        <h3 style={{
          fontFamily:"'Plus Jakarta Sans',sans-serif",
          fontSize: isMobile ? "20px" : "24px",
          fontWeight:800, color:textPri, margin:"0 0 10px",
          letterSpacing:"-0.03em", lineHeight:1.1,
        }}>{feature.title}</h3>
        <p style={{
          fontFamily:"'Plus Jakarta Sans',sans-serif",
          fontSize: isMobile ? "13px" : "14px",
          lineHeight:1.68, color:textSec, margin:0,
          maxWidth:"280px", fontWeight:400,
        }}>{feature.description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Menu row ──────────────────────────────────────────── */
function MenuRow({ feature, index, isDark, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const ref  = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-30px" });
  const Icon = feature.icon;

  const textPri = isDark ? "#e0dcd8" : "#111111";
  const textSec = isDark ? "#4a4a4a" : "#a0a0a0";
  const hoverBg = isDark ? "#141414" : "#f9f9f9";
  const border  = isDark ? "#181818" : "#ebebeb";
  const iconBg  = isDark ? "#191919" : "#f0f0f0";
  const iconCol = isDark ? "#777" : "#666666";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, x:16 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.45, delay:index*0.06, ease:[0.22,1,0.36,1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:"flex", alignItems:"center", gap:"14px",
        padding: isMobile ? "14px 12px" : "18px 20px",
        borderBottom:`1px solid ${border}`,
        background: hovered ? hoverBg : "transparent",
        borderRadius: hovered ? "12px" : "0",
        transition:"background 0.22s, border-radius 0.22s",
        cursor:"default",
      }}
    >
      <span style={{
        fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"10px",
        fontWeight:700, color:isDark?"#2e2e2e":"#d0d0d0",
        letterSpacing:"0.06em", minWidth:"22px",
      }}>{String(index+1).padStart(2,"0")}</span>

      <div style={{
        width:"34px", height:"34px", borderRadius:"10px",
        background:iconBg, display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0,
      }}>
        <Icon size={15} color={iconCol} strokeWidth={1.8} />
      </div>

      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3px" }}>
          <span style={{
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: isMobile?"13px":"14.5px",
            fontWeight:700, color:textPri, letterSpacing:"-0.01em", whiteSpace:"nowrap",
          }}>{feature.title}</span>
          <div style={{ flex:1, borderBottom:`1px dashed ${isDark?"#232323":"#e0e0e0"}`, marginBottom:"2px" }} />
        </div>
        <p style={{
          fontFamily:"'Plus Jakarta Sans',sans-serif",
          fontSize: isMobile?"11px":"12.5px",
          color:textSec, margin:0, lineHeight:1.5, fontWeight:400,
        }}>{feature.description}</p>
      </div>

      <motion.div
        animate={{ opacity:hovered?1:0, x:hovered?0:-5 }}
        transition={{ duration:0.18 }}
        style={{ flexShrink:0 }}
      >
        <ArrowUpRight size={13} color={textSec} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function Features() {
  const { isDark } = useTheme();
  const isMobile   = useIsMobile(768);
  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once:true });

  const bg       = isDark ? "#0a0a0a" : "#ffffff";
  const textPri  = isDark ? "#eeeae5" : "#111111";
  const textSec  = isDark ? "#4e4e4e" : "#999999";
  const panelBg  = isDark ? "#0f0f0f" : "#ffffff";
  const panelBord= isDark ? "#1e1e1e" : "#e8e8e8";
  const divider  = isDark ? "#1a1a1a" : "#e8e8e8";

  const bigFeatures  = features.filter(f => f.big);
  const listFeatures = features.filter(f => !f.big);

  return (
    <section style={{ background:bg, transition:"background 0.35s" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap');`}</style>

      {/* ── Header ─────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{
          maxWidth:"1220px", margin:"0 auto",
          padding: isMobile ? "64px 20px 40px" : "88px 32px 52px",
        }}
      >
        <div style={{
          display:"flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent:"space-between",
          gap: isMobile ? "20px" : "36px",
        }}>
          <div>
            <motion.div
              initial={{ opacity:0, x:-12 }}
              animate={headerInView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.45 }}
              style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"18px" }}
            >
              <div style={{ width:"24px", height:"1px", background:textSec }} />
              <span style={{
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"10px",
                fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:textSec,
              }}>Features</span>
            </motion.div>

            <motion.h2
              initial={{ opacity:0, y:22 }}
              animate={headerInView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.1 }}
              style={{
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800,
                fontSize: isMobile ? "clamp(32px,9vw,42px)" : "clamp(36px,5.2vw,66px)",
                color:textPri, margin:0, lineHeight:1.06, letterSpacing:"-0.04em",
              }}
            >
              The full menu,<br />
              <span style={{ fontWeight:300, fontStyle:"italic" }}>served fresh.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity:0, y:14 }}
            animate={headerInView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.55, delay:0.2 }}
            style={{
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"15px",
              lineHeight:1.72, color:textSec,
              maxWidth: isMobile ? "100%" : "320px",
              margin:0, fontWeight:400,
            }}
          >
            Nine tools, one platform. Built for restaurants, cafes, cloud kitchens, and every food business in between.
          </motion.p>
        </div>
      </div>

      {/* ── Marquee ─────────────────────────────────────── */}
      <MarqueeStrip isDark={isDark} />

      {/* ── Main layout ─────────────────────────────────── */}
      <div style={{
        maxWidth:"1220px", margin:"0 auto",
        padding: isMobile ? "40px 20px 72px" : "56px 32px 100px",
      }}>

        {isMobile ? (
          /* ── MOBILE LAYOUT ─────────────────────────── */
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {/* Big cards stacked */}
            {bigFeatures.map((f,i) => (
              <BigCard key={f.title} feature={f} index={i} isDark={isDark} isMobile={true} />
            ))}

            {/* Stats strip */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5 }}
              style={{
                display:"grid", gridTemplateColumns:"repeat(3,1fr)",
                background:panelBg, border:`1px solid ${panelBord}`,
                borderRadius:"18px", overflow:"hidden",
              }}
            >
              {[{ val:"9", label:"Modules" }, { val:"1", label:"Platform" }, { val:"∞", label:"Scale" }].map((s,i)=>(
                <div key={i} style={{
                  padding:"20px 12px",
                  borderRight: i<2 ? `1px solid ${divider}` : "none",
                  textAlign:"center",
                }}>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"28px", fontWeight:800, color:textPri, letterSpacing:"-0.05em", lineHeight:1, marginBottom:"5px" }}>{s.val}</div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"9px", fontWeight:600, color:textSec, letterSpacing:"0.15em", textTransform:"uppercase" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* À la carte panel — full width on mobile */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5, delay:0.1 }}
              style={{ background:panelBg, border:`1px solid ${panelBord}`, borderRadius:"18px", overflow:"hidden" }}
            >
              {/* Panel header */}
              <div style={{
                padding:"20px 16px 14px",
                borderBottom:`1px solid ${divider}`,
                display:"flex", alignItems:"center", justifyContent:"space-between",
              }}>
                <div>
                  <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:textSec, margin:"0 0 3px" }}>Today's Essentials</p>
                  <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"16px", fontWeight:700, color:textPri, margin:0, letterSpacing:"-0.02em" }}>À la carte features</h4>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"5px", background:isDark?"#0d1f0d":"#e6f4e6", border:`1px solid ${isDark?"#1a341a":"#c3dfc3"}`, borderRadius:"100px", padding:"4px 10px" }}>
                  <motion.div animate={{ opacity:[1,0.2,1] }} transition={{ duration:1.8, repeat:Infinity }}
                    style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#4caf50" }} />
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.1em", color:"#4caf50" }}>LIVE</span>
                </div>
              </div>

              {/* Rows */}
              <div style={{ padding:"8px" }}>
                {listFeatures.map((f,i)=>(
                  <MenuRow key={f.title} feature={f} index={i} isDark={isDark} isMobile={true} />
                ))}
              </div>

              {/* Footer */}
              <div style={{ padding:"14px 18px", borderTop:`1px solid ${divider}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"12px", color:textSec, fontStyle:"italic" }}>All features included in every plan.</span>
                <div style={{ width:"26px", height:"26px", borderRadius:"50%", border:`1px solid ${divider}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ArrowUpRight size={12} color={textSec} />
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* ── DESKTOP LAYOUT ────────────────────────── */
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", alignItems:"start" }}>
            {/* Left */}
            <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
              {bigFeatures.map((f,i)=>(
                <BigCard key={f.title} feature={f} index={i} isDark={isDark} isMobile={false} />
              ))}
              <motion.div
                initial={{ opacity:0, y:18 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.5, delay:0.15 }}
                style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", background:panelBg, border:`1px solid ${panelBord}`, borderRadius:"20px", overflow:"hidden" }}
              >
                {[{ val:"9", label:"Modules" }, { val:"1", label:"Platform" }, { val:"∞", label:"Scale" }].map((s,i)=>(
                  <div key={i} style={{ padding:"26px 18px", borderRight:i<2?`1px solid ${divider}`:"none", textAlign:"center" }}>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"32px", fontWeight:800, color:textPri, letterSpacing:"-0.05em", lineHeight:1, marginBottom:"6px" }}>{s.val}</div>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"9.5px", fontWeight:600, color:textSec, letterSpacing:"0.18em", textTransform:"uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — à la carte panel */}
            <motion.div
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
              style={{ background:panelBg, border:`1px solid ${panelBord}`, borderRadius:"22px", overflow:"hidden", position:"sticky", top:"28px" }}
            >
              <div style={{ padding:"26px 22px 20px", borderBottom:`1px solid ${divider}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"9.5px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:textSec, margin:"0 0 4px" }}>Today's Essentials</p>
                  <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"17px", fontWeight:700, color:textPri, margin:0, letterSpacing:"-0.025em" }}>À la carte features</h4>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"6px", background:isDark?"#0d1f0d":"#e6f4e6", border:`1px solid ${isDark?"#1a341a":"#c3dfc3"}`, borderRadius:"100px", padding:"5px 12px" }}>
                  <motion.div animate={{ opacity:[1,0.2,1] }} transition={{ duration:1.8, repeat:Infinity }}
                    style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4caf50" }} />
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"9.5px", fontWeight:700, letterSpacing:"0.1em", color:"#4caf50" }}>LIVE</span>
                </div>
              </div>
              <div style={{ padding:"10px" }}>
                {listFeatures.map((f,i)=>(
                  <MenuRow key={f.title} feature={f} index={i} isDark={isDark} isMobile={false} />
                ))}
              </div>
              <div style={{ padding:"18px 22px", borderTop:`1px solid ${divider}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"12px", color:textSec, fontStyle:"italic" }}>All features included in every plan.</span>
                <div style={{ width:"27px", height:"27px", borderRadius:"50%", border:`1px solid ${divider}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ArrowUpRight size={12} color={textSec} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}