import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Zap } from "lucide-react";
import { useTheme } from "./ThemeContext";

import billingMain    from "../assets/pos-billing-main.png";
import inventoryList  from "../assets/pos-inventory-list.png";
import inventoryModal from "../assets/modal.png";
import analyticsGraph from "../assets/pos-analytics-graph.png";
import analyticsCards from "../assets/pos-analytics-cards.png";

// ─────────────────────────────────────────────────────────────
// HOOK — breakpoint detector
// ─────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [breakpoint]);
  return isMobile;
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: "billing", index: 0, num: "01", tag: "POS Terminal",
    headline: ["Speed is", "Everything."],
    body: "Punch in orders with a visual grid, customise items instantly, and fire KOTs to the kitchen in one tap — built for the chaos of peak hour.",
    stats: [
      { label: "Orders / day", value: "148+" },
      { label: "Order time",   value: "0.3s"  },
      { label: "Uptime",       value: "99.9%" },
    ],
    mainImg: billingMain,
    secImg: null as string | null,
    secPos: null as null | { top?: string; bottom?: string; left?: string; right?: string },
  },
  {
    id: "inventory", index: 1, num: "02", tag: "Inventory",
    headline: ["Kitchen", "Control."],
    body: "Track every ingredient in real-time. Low-stock alerts fire before service starts — so you never get caught short in a rush.",
    stats: [
      { label: "Items tracked", value: "340"   },
      { label: "Alert lead",    value: "2 hrs" },
      { label: "Accuracy",      value: "99.2%" },
    ],
    mainImg: inventoryList,
    secImg: inventoryModal,
    secPos: { bottom: "18%", right: "5%" },
  },
  {
    id: "analytics", index: 2, num: "03", tag: "Analytics",
    headline: ["Profit", "Vision."],
    body: "See every rupee at a glance. Live revenue graphs, category breakdowns, and expense tracking — all in one frictionless view.",
    stats: [
      { label: "Revenue lift", value: "+24%"    },
      { label: "Reports",      value: "50+"     },
      { label: "Export",       value: "PDF/XLS" },
    ],
    mainImg: analyticsGraph,
    secImg: analyticsCards,
    secPos: { top: "18%", right: "4%" },
  },
] as const;

type Feature = typeof FEATURES[number];

// ─────────────────────────────────────────────────────────────
// SECTION HEADING
// ─────────────────────────────────────────────────────────────
function SectionHeading({ t, isDark, isMobile }: {
  t: Record<string, string>; isDark: boolean; isMobile: boolean;
}) {
  return (
    <div style={{
      width: "100%",
      padding: isMobile ? "72px 24px 48px" : "100px 64px 64px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Ghost watermark */}
      <div aria-hidden style={{
        position: "absolute",
        top: isMobile ? -12 : -20,
        left: isMobile ? 16 : 48,
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 900,
        fontSize: isMobile ? "clamp(5rem, 22vw, 9rem)" : "clamp(7rem, 14vw, 13rem)",
        letterSpacing: "-0.06em",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        color: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
        whiteSpace: "nowrap",
      }}>
        PLATFORM
      </div>

      {/* Eyebrow chip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "6px 14px",
          borderRadius: 9999,
          border: `1px solid ${isDark ? "rgba(93,232,160,0.25)" : "rgba(22,160,80,0.25)"}`,
          background: isDark ? "rgba(93,232,160,0.07)" : "rgba(22,160,80,0.07)",
          marginBottom: isMobile ? 18 : 24,
        }}
      >
        <Zap size={11} color={isDark ? "rgba(93,232,160,0.9)" : "rgba(22,160,80,0.9)"} strokeWidth={2.5} />
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.56rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: isDark ? "rgba(93,232,160,0.85)" : "rgba(22,160,80,0.9)",
        }}>
          Built for bussinesses
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: isMobile ? "clamp(2.2rem, 9vw, 3rem)" : "clamp(3rem, 5.5vw, 4.8rem)",
          letterSpacing: "-0.045em",
          lineHeight: 1.05,
          margin: 0,
          color: t.text,
        }}>
          One complete POS.{" "}
          <br />
          <span style={{
            color: "transparent",
            backgroundImage: isDark
              ? "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.55) 100%)"
              : "linear-gradient(135deg, rgba(12,18,28,0.45) 0%, rgba(12,18,28,0.85) 50%, rgba(12,18,28,0.45) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}>
            Zero compromises.
          </span>
        </h2>
      </motion.div>

      {/* Subtitle + stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          gap: isMobile ? 20 : 40,
          width: "100%",
          marginTop: isMobile ? 16 : 22,
        }}
      >
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 400,
          fontSize: isMobile ? "0.9rem" : "1.05rem",
          lineHeight: 1.7,
          color: t.textMuted,
          margin: 0,
          maxWidth: 520,
        }}>
          From billing to inventory to deep analytics — every tool your restaurant
          needs to run faster, smarter, and more profitably. Scroll to explore.
        </p>

        {/* Stat trio */}
        <div style={{ display: "flex", gap: isMobile ? 20 : 32, flexShrink: 0 }}>
          {[
            { val: "3",     unit: "Modules"  },
            { val: "50+",   unit: "Reports"  },
            { val: "99.9%", unit: "Uptime"   },
          ].map(({ val, unit }, i) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.26 + i * 0.07 }}
              style={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: isMobile ? "1.4rem" : "1.7rem",
                letterSpacing: "-0.04em",
                color: t.text,
                lineHeight: 1,
              }}>{val}</span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.56rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: t.textFaint,
                lineHeight: 1,
              }}>{unit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{
          width: "100%",
          height: 1,
          background: t.border,
          marginTop: isMobile ? 36 : 48,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STAT PILL
// ─────────────────────────────────────────────────────────────
function StatPill({ label, value, delay, t, isDark }: {
  label: string; value: string; delay: number;
  t: Record<string, string>; isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      style={{
        display: "flex", flexDirection: "column", gap: 2,
        padding: "8px 14px", borderRadius: 10, flex: "0 0 auto",
        background: isDark ? "rgba(10,10,14,0.72)" : "rgba(255,255,255,0.82)",
        border: `1px solid ${t.border}`,
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.08)",
        minWidth: 70,
      }}
    >
      <span style={{
        fontFamily: "'Outfit', sans-serif", fontWeight: 800,
        fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
        letterSpacing: "-0.03em", color: t.text, lineHeight: 1,
      }}>{value}</span>
      <span style={{
        fontFamily: "'Outfit', sans-serif", fontWeight: 400,
        fontSize: "0.6rem", letterSpacing: "0.06em",
        textTransform: "uppercase", color: t.textFaint, lineHeight: 1,
      }}>{label}</span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURE SCREEN — DESKTOP
// ─────────────────────────────────────────────────────────────
function FeatureScreenDesktop({ f, active, t, isDark }: {
  f: Feature; active: boolean; t: Record<string, string>; isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "absolute", inset: 0, pointerEvents: active ? "auto" : "none", overflow: "hidden" }}
    >
      <motion.div
        initial={{ scale: 1.04, y: 30 }}
        animate={active ? { scale: 1, y: 0 } : { scale: 1.04, y: 30 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)", width: "62%", maxWidth: 860 }}
      >
        <div style={{
          borderRadius: "16px 0 0 16px", overflow: "hidden",
          boxShadow: isDark
            ? "0 0 0 1px rgba(255,255,255,0.07), -40px 0 80px rgba(0,0,0,0.6)"
            : "0 0 0 1px rgba(0,0,0,0.08), -24px 0 60px rgba(0,0,0,0.12)",
        }}>
          <img src={f.mainImg} alt={f.tag} draggable={false}
            style={{ width: "100%", display: "block", userSelect: "none" }} />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: isDark
              ? "linear-gradient(90deg, rgba(6,6,8,0.55) 0%, transparent 35%)"
              : "linear-gradient(90deg, rgba(255,255,255,0.55) 0%, transparent 35%)",
          }} />
        </div>
      </motion.div>

      {f.secImg && f.secPos && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
          animate={active ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.88, rotate: -3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          style={{
            position: "absolute", ...f.secPos, width: "clamp(130px, 15vw, 200px)",
            zIndex: 10, borderRadius: 12, overflow: "hidden", maxHeight: "40%",
            boxShadow: isDark
              ? "0 0 0 1px rgba(255,255,255,0.10), 0 20px 60px rgba(0,0,0,0.65)"
              : "0 0 0 1px rgba(0,0,0,0.09), 0 16px 48px rgba(0,0,0,0.16)",
          }}
        >
          <img src={f.secImg as string} alt="detail" draggable={false}
            style={{ width: "100%", display: "block", userSelect: "none" }} />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
          }} />
        </motion.div>
      )}

      <div style={{ position: "absolute", bottom: 64, left: 52, maxWidth: 460, zIndex: 20 }}>
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: 0 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: isDark ? "rgba(93,232,160,0.8)" : "rgba(22,160,80,0.85)",
                }}>{f.num} — {f.tag}</span>
              </div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 800,
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                letterSpacing: "-0.045em", lineHeight: 1.0, margin: "0 0 20px", color: t.text,
              }}>
                {f.headline[0]}{" "}
                <span style={{ color: t.textMuted }}>{f.headline[1]}</span>
              </h3>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 400,
                fontSize: "0.93rem", lineHeight: 1.72, color: t.textMuted, margin: "0 0 28px", maxWidth: 400,
              }}>{f.body}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                {f.stats.map((s, i) => (
                  <StatPill key={s.label} {...s} delay={0.1 + i * 0.08} t={t} isDark={isDark} />
                ))}
              </div>
              <button
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 26px", borderRadius: 9999,
                  fontFamily: "'Outfit', sans-serif", fontWeight: 700,
                  fontSize: "0.88rem", letterSpacing: "0.02em",
                  border: "none", cursor: "pointer", outline: "none", alignSelf: "flex-start",
                  background: isDark ? "#ffffff" : "#0c121c",
                  color: isDark ? "#0c121c" : "#ffffff",
                  boxShadow: isDark
                    ? "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4)"
                    : "0 0 0 1px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.12)",
                  transition: "opacity 0.2s ease, transform 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Explore Feature <ArrowUpRight size={14} strokeWidth={2.2} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isDark && (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.03, zIndex: 5 }} aria-hidden>
          <filter id={`grain-${f.id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${f.id})`} />
        </svg>
      )}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(${isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.065)"} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 100% 100% at 0% 100%, black 0%, transparent 65%)",
        WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 0% 100%, black 0%, transparent 65%)",
        opacity: 0.7,
      }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURE SCREEN — MOBILE
// ─────────────────────────────────────────────────────────────
function FeatureScreenMobile({ f, active, t, isDark }: {
  f: Feature; active: boolean; t: Record<string, string>; isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute", inset: 0, pointerEvents: active ? "auto" : "none",
        overflow: "hidden", display: "flex", flexDirection: "column",
      }}
    >
      <div style={{
        flex: "0 0 46%", position: "relative",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 20px 16px", zIndex: 20,
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `radial-gradient(${isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.065)"} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 120% 100% at 50% 100%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 120% 100% at 50% 100%, black 0%, transparent 70%)",
          opacity: 0.6,
        }} />
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", zIndex: 1 }}
            >
              <div style={{ marginBottom: 10 }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.54rem",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: isDark ? "rgba(93,232,160,0.8)" : "rgba(22,160,80,0.85)",
                }}>{f.num} — {f.tag}</span>
              </div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 800,
                fontSize: "clamp(1.9rem, 8vw, 2.8rem)",
                letterSpacing: "-0.045em", lineHeight: 1.0, margin: "0 0 12px", color: t.text,
              }}>
                {f.headline[0]}{" "}
                <span style={{ color: t.textMuted }}>{f.headline[1]}</span>
              </h3>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 400,
                fontSize: "0.82rem", lineHeight: 1.65, color: t.textMuted, margin: "0 0 14px",
              }}>{f.body}</p>
              <div style={{
                display: "flex", gap: 6, marginBottom: 14,
                overflowX: "auto", WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none", msOverflowStyle: "none",
              }}>
                {f.stats.map((s, i) => (
                  <StatPill key={s.label} {...s} delay={0.08 + i * 0.06} t={t} isDark={isDark} />
                ))}
              </div>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "10px 20px", borderRadius: 9999,
                fontFamily: "'Outfit', sans-serif", fontWeight: 700,
                fontSize: "0.82rem", letterSpacing: "0.02em",
                border: "none", cursor: "pointer", outline: "none", alignSelf: "flex-start",
                background: isDark ? "#ffffff" : "#0c121c",
                color: isDark ? "#0c121c" : "#ffffff",
                boxShadow: isDark
                  ? "0 0 0 1px rgba(255,255,255,0.08), 0 6px 18px rgba(0,0,0,0.4)"
                  : "0 0 0 1px rgba(0,0,0,0.1), 0 6px 14px rgba(0,0,0,0.12)",
                WebkitTapHighlightColor: "transparent", touchAction: "manipulation",
              }}>
                Explore Feature <ArrowUpRight size={13} strokeWidth={2.2} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ flex: "0 0 54%", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 40, zIndex: 5, pointerEvents: "none",
          background: `linear-gradient(to bottom, ${isDark ? "#06060880" : "#ffffff80"}, transparent)`,
        }} />
        <motion.div
          initial={{ scale: 1.06, y: 20 }}
          animate={active ? { scale: 1, y: 0 } : { scale: 1.06, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <img src={f.mainImg} alt={f.tag} draggable={false} style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "top left",
            display: "block", userSelect: "none",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 60, pointerEvents: "none",
            background: `linear-gradient(to top, ${t.bg}, transparent)`,
          }} />
        </motion.div>
        {f.secImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
            animate={active ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.88, rotate: -3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              position: "absolute", bottom: "12%", right: "4%",
              width: "clamp(90px, 22vw, 140px)",
              zIndex: 10, borderRadius: 10, overflow: "hidden",
              boxShadow: isDark
                ? "0 0 0 1px rgba(255,255,255,0.10), 0 16px 40px rgba(0,0,0,0.65)"
                : "0 0 0 1px rgba(0,0,0,0.09), 0 12px 32px rgba(0,0,0,0.16)",
            }}
          >
            <img src={f.secImg as string} alt="detail" draggable={false}
              style={{ width: "100%", display: "block", userSelect: "none" }} />
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
            }} />
          </motion.div>
        )}
      </div>

      {isDark && (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.03, zIndex: 25 }} aria-hidden>
          <filter id={`grain-m-${f.id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-m-${f.id})`} />
        </svg>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEPPER — desktop only
// ─────────────────────────────────────────────────────────────
function Stepper({ features, active, t, isDark, onGo }: {
  features: typeof FEATURES; active: number;
  t: Record<string, string>; isDark: boolean; onGo: (i: number) => void;
}) {
  return (
    <div style={{
      position: "absolute", top: 0, right: 0, height: "100%",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 28px", gap: 6, zIndex: 30,
    }}>
      {features.map((f, i) => (
        <button key={f.id} onClick={() => onGo(i)} style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "transparent", border: "none", cursor: "pointer",
          outline: "none", padding: "6px 0",
          opacity: i === active ? 1 : 0.35,
          transition: "opacity 0.25s ease",
        }}>
          <motion.div
            animate={{
              height: i === active ? 36 : 12,
              background: i === active
                ? (isDark ? "rgba(255,255,255,0.85)" : "rgba(12,18,28,0.85)")
                : (isDark ? "rgba(255,255,255,0.25)" : "rgba(12,18,28,0.2)"),
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: 3, borderRadius: 2 }}
          />
          <AnimatePresence>
            {i === active && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: t.textMuted, whiteSpace: "nowrap",
                }}
              >{f.tag}</motion.span>
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BOTTOM CHROME
// ─────────────────────────────────────────────────────────────
function BottomChrome({ active, total, t, isDark, onNext, onPrev, isMobile }: {
  active: number; total: number; t: Record<string, string>; isDark: boolean;
  onNext: () => void; onPrev: () => void; isMobile: boolean;
}) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: isMobile ? 46 : 52,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "0 16px" : "0 52px",
      zIndex: 30, borderTop: `1px solid ${t.border}`,
      background: isDark ? "rgba(6,6,8,0.7)" : "rgba(255,255,255,0.7)",
      backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <motion.span
          key={active} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontFamily: "'DM Mono', monospace", fontSize: isMobile ? "0.82rem" : "0.95rem", fontWeight: 500, color: t.text }}
        >{String(active + 1).padStart(2, "0")}</motion.span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: t.textFaint }}>
          / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div style={{
        flex: 1, maxWidth: isMobile ? 120 : 200, height: 1, background: t.border,
        margin: isMobile ? "0 14px" : "0 28px", borderRadius: 1, overflow: "hidden",
      }}>
        <motion.div
          key={`p-${active}`} style={{ height: "100%", background: t.textMuted }}
          initial={{ width: "0%" }} animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[
          { fn: onPrev, back: true,  dis: active === 0 },
          { fn: onNext, back: false, dis: active === total - 1 },
        ].map(({ fn, back, dis }, i) => (
          <button key={i} onClick={fn} disabled={dis} style={{
            width: isMobile ? 30 : 32, height: isMobile ? 30 : 32,
            borderRadius: "50%", border: `1px solid ${t.border}`,
            background: "transparent", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: dis ? "default" : "pointer", opacity: dis ? 0.2 : 1, outline: "none",
            transition: "border-color 0.2s, opacity 0.2s",
            WebkitTapHighlightColor: "transparent", touchAction: "manipulation",
          }}
            onMouseEnter={(e) => { if (!dis) e.currentTarget.style.borderColor = t.borderStrong; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; }}
          >
            <ArrowRight size={12} color={t.text} style={{ transform: back ? "rotate(180deg)" : "none" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TOP CHROME
// ─────────────────────────────────────────────────────────────
function TopChrome({ active, t, isDark, onGo, isMobile }: {
  active: number; t: Record<string, string>; isDark: boolean;
  onGo: (i: number) => void; isMobile: boolean;
}) {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0,
      height: isMobile ? 46 : 52,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "0 16px" : "0 52px",
      zIndex: 30, borderBottom: `1px solid ${t.border}`,
      background: isDark ? "rgba(6,6,8,0.7)" : "rgba(255,255,255,0.7)",
      backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
    }}>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: "0.54rem",
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: isDark ? "rgba(93,232,160,0.75)" : "rgba(22,160,80,0.85)",
        whiteSpace: "nowrap",
      }}>Features</span>
      <div style={{
        display: "flex", alignItems: "center", gap: 1, padding: "2px",
        borderRadius: 10,
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
        border: `1px solid ${t.border}`,
      }}>
        {FEATURES.map((f, i) => (
          <button key={f.id} onClick={() => onGo(i)} style={{
            padding: isMobile ? "4px 10px" : "5px 14px",
            borderRadius: 7, border: "none", cursor: "pointer", outline: "none",
            fontFamily: "'Outfit', sans-serif", fontWeight: 600,
            fontSize: isMobile ? "0.67rem" : "0.76rem",
            transition: "background 0.2s, color 0.2s",
            background: i === active
              ? (isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)")
              : "transparent",
            color: i === active ? t.text : t.textFaint,
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation", whiteSpace: "nowrap",
          }}>{f.tag}</button>
        ))}
      </div>
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowRight size={12} color={t.textFaint} />
          </motion.div>
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem",
            letterSpacing: "0.06em", textTransform: "uppercase", color: t.textFaint,
          }}>Scroll to explore</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MOBILE DOT INDICATOR
// ─────────────────────────────────────────────────────────────
function MobileDots({ total, active, isDark }: {
  total: number; active: number; isDark: boolean;
}) {
  return (
    <div style={{
      position: "absolute", bottom: 58, left: 0, right: 0,
      display: "flex", justifyContent: "center", gap: 5,
      zIndex: 30, pointerEvents: "none",
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i}
          animate={{ width: i === active ? 18 : 5, opacity: i === active ? 1 : 0.35, background: isDark ? "#ffffff" : "#0c121c" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 5, borderRadius: 3 }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function PosPresentation() {
  const { isDark, t } = useTheme();
  const TOTAL    = FEATURES.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(768);

  const { scrollYProgress } = useScroll({ target: trackRef });
  const [active, setActive] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActive(Math.min(TOTAL - 1, Math.floor(v * TOTAL + 0.08)));
    });
  }, [TOTAL]);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx > 0) goTo(Math.min(TOTAL - 1, active + 1));
      else        goTo(Math.max(0, active - 1));
    }
  }, [active, TOTAL]);

  const goTo = useCallback((i: number) => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const scrollableH = el.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + (i / Math.max(TOTAL - 1, 1)) * scrollableH,
      behavior: "smooth",
    });
  }, [TOTAL]);

  const chromeH = isMobile ? 46 : 52;

  return (
    <div style={{ background: t.bg, transition: "background 0.4s ease" }}>

      {/* ── SECTION HEADING — normal flow, scrolls away ── */}
      <SectionHeading t={t} isDark={isDark} isMobile={isMobile} />

      {/* ── SCROLL TRACK + STICKY THEATRE ── */}
      <div
        ref={trackRef}
        style={{
          height: isMobile ? `${TOTAL * 120}vh` : `${TOTAL * 100}vh`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky", top: 0,
            height: "100vh", overflow: "hidden",
            background: t.bg, transition: "background 0.4s ease",
          }}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          <div style={{
            position: "absolute", top: chromeH, bottom: chromeH,
            left: 0, right: 0, overflow: "hidden",
          }}>
            {FEATURES.map((f, i) =>
              isMobile ? (
                <FeatureScreenMobile key={f.id} f={f} active={i === active} t={t} isDark={isDark} />
              ) : (
                <FeatureScreenDesktop key={f.id} f={f} active={i === active} t={t} isDark={isDark} />
              )
            )}
          </div>

          <TopChrome active={active} t={t} isDark={isDark} onGo={goTo} isMobile={isMobile} />
          <BottomChrome
            active={active} total={TOTAL} t={t} isDark={isDark}
            onNext={() => goTo(Math.min(TOTAL - 1, active + 1))}
            onPrev={() => goTo(Math.max(0, active - 1))}
            isMobile={isMobile}
          />
          {!isMobile && <Stepper features={FEATURES} active={active} t={t} isDark={isDark} onGo={goTo} />}
          {isMobile  && <MobileDots total={TOTAL} active={active} isDark={isDark} />}
        </div>
      </div>
    </div>
  );
}