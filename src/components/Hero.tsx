import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Zap, BarChart2, ShieldCheck, Clock } from "lucide-react";
import { useTheme } from "./ThemeContext";

import dashboardImg  from "../assets/dashboard-monitor.png";
import analyticsImg  from "../assets/analytics-desktop.png";
import kioskImg      from "../assets/kiosk-tablet.png";
import billingImg    from "../assets/billing-laptop.png";
import mobileImg     from "../assets/mobile-app-phone.png";

interface HeroProps {
  onOpenModal: () => void;
}

const HEADLINE_PREFIX = "Built for modern";
const ACCENT_WORDS    = ["enterprises.", "restaurants.", "retailers.", "boutiques.", "cafes."];

const slides = [
  {
    image: dashboardImg, label: "Dashboard",
    heading: "Real-time command center",
    description: "A birds-eye view of your entire operation — sales, orders, staff, and inventory all in one live dashboard.",
    features: [
      { icon: Zap,         label: "Live updates"  },
      { icon: BarChart2,   label: "Sales trends"  },
      { icon: ShieldCheck, label: "Secure access" },
      { icon: Clock,       label: "24/7 uptime"   },
    ],
    tag: "Dashboard", link: "/product/dashboard",
  },
  {
    image: analyticsImg, label: "Analytics",
    heading: "Insights that drive growth",
    description: "Deep dive into sales performance, peak hours, best-sellers, and staff metrics — all updated in real time.",
    features: [
      { icon: BarChart2,   label: "50+ reports"   },
      { icon: Zap,         label: "Real-time data" },
      { icon: ShieldCheck, label: "PDF / Excel"   },
      { icon: Clock,       label: "Date filters"  },
    ],
    tag: "Analytics", link: "/product/analytics",
  },
  {
    image: kioskImg, label: "Kiosk",
    heading: "Self-order, zero friction",
    description: "Let customers place orders themselves with a sleek touchscreen kiosk — reduce wait times by up to 60%.",
    features: [
      { icon: Zap,         label: "Self-serve"    },
      { icon: Clock,       label: "60% less wait" },
      { icon: ShieldCheck, label: "Always on"     },
      { icon: BarChart2,   label: "Order history" },
    ],
    tag: "Kiosk", link: "/product/kiosk",
  },
  {
    image: billingImg, label: "Billing",
    heading: "One-tap billing, anywhere",
    description: "Cloud-based POS that works on any device. GST-ready invoices, split bills, and instant KOT printing.",
    features: [
      { icon: Zap,         label: "1-tap billing" },
      { icon: ShieldCheck, label: "GST ready"     },
      { icon: BarChart2,   label: "Any device"    },
      { icon: Clock,       label: "KOT printing"  },
    ],
    tag: "POS", link: "/product/pos",
  },
  {
    image: mobileImg, label: "Mobile App",
    heading: "Your restaurant in your pocket",
    description: "Manage your entire business on the go — iOS and Android. Check sales, manage staff, and stay in control anywhere.",
    features: [
      { icon: Zap,         label: "iOS + Android" },
      { icon: Clock,       label: "Live sync"     },
      { icon: ShieldCheck, label: "Push alerts"   },
      { icon: BarChart2,   label: "Staff control" },
    ],
    tag: "Mobile", link: "/product/mobile",
  },
];

const CAROUSEL_SPEED = 4000;
const TEXT_SPEED     = 3200;

// ─────────────────────────────────────────────────────────────
// MOBILE ONLY: swipeable single card + dots
// ─────────────────────────────────────────────────────────────
function MobileCard({
  active, setActive, isDark,
}: {
  active: number; setActive: (i: number) => void; isDark: boolean;
}) {
  const total  = slides.length;
  const dragX  = useMotionValue(0);
  const cardOp = useTransform(dragX, [-80, 0, 80], [0.6, 1, 0.6]);

  const onDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -40) setActive((active + 1) % total);
    if (info.offset.x >  40) setActive((active - 1 + total) % total);
    dragX.set(0);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.95, y: 10  }}
          animate={{ opacity: 1, scale: 1,    y: 0   }}
          exit={{   opacity: 0, scale: 0.95,  y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          style={{
            x: dragX, opacity: cardOp,
            cursor: "grab", width: "100%",
            filter: `drop-shadow(0 24px 48px rgba(0,0,0,${isDark ? 0.55 : 0.15}))`,
          }}
        >
          <Link to={slides[active].link} style={{ display: "block" }}>
            <img
              src={slides[active].image}
              alt={slides[active].label}
              draggable={false}
              style={{ width: "100%", display: "block", borderRadius: 10, userSelect: "none" }}
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 20 : 6, height: 6, borderRadius: 3,
              border: "none", outline: "none", cursor: "pointer", padding: 0,
              background: i === active
                ? (isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)")
                : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"),
              transition: "width 0.28s ease, background 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MOBILE ONLY: scrollable tab strip
// ─────────────────────────────────────────────────────────────
function MobileTabs({
  active, setActive, isDark, t,
}: {
  active: number; setActive: (i: number) => void;
  isDark: boolean; t: Record<string, string>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = ref.current?.children[active] as HTMLElement;
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex", gap: 6,
        overflowX: "auto", paddingBottom: 2,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      } as React.CSSProperties}
    >
      {slides.map((s, i) => (
        <button
          key={s.tag}
          onClick={() => setActive(i)}
          style={{
            flexShrink: 0, outline: "none", cursor: "pointer",
            padding: "6px 14px", borderRadius: 20,
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.75rem",
            background: i === active
              ? (isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)")
              : "transparent",
            color: i === active ? t.text : t.textFaint,
            border: `1px solid ${i === active ? t.borderStrong : "transparent"}`,
            transition: "all 0.2s ease",
          }}
        >
          {s.tag}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function Hero({ onOpenModal }: HeroProps) {
  const { isDark, t } = useTheme();
  const [active,      setActive]      = useState(0);
  const [accentIndex, setAccentIndex] = useState(0);
  const [isMobile,    setIsMobile]    = useState(false);

  const carouselTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const textTimer     = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── breakpoint detection ────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── text cycle ──────────────────────────────────────────────
  useEffect(() => {
    textTimer.current = setInterval(
      () => setAccentIndex((p) => (p + 1) % ACCENT_WORDS.length),
      TEXT_SPEED
    );
    return () => { if (textTimer.current) clearInterval(textTimer.current); };
  }, []);

  // ── carousel auto-advance ───────────────────────────────────
  const startCarousel = useCallback(() => {
    if (carouselTimer.current) clearInterval(carouselTimer.current);
    carouselTimer.current = setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      CAROUSEL_SPEED
    );
  }, []);

  useEffect(() => {
    startCarousel();
    return () => { if (carouselTimer.current) clearInterval(carouselTimer.current); };
  }, [startCarousel]);

  const handleSetActive = useCallback((i: number) => {
    setActive(i);
    startCarousel();
  }, [startCarousel]);

  const slide = slides[active];

  // ── YOUR EXACT original carousel position logic ─────────────
  const getCarouselItemStyle = (index: number) => {
    const total = slides.length;
    const diff  = (index - active + total) % total;
    if (diff === 0)         return { x: 140, y: 0,  scale: 1,    opacity: 1,   zIndex: 50, blur: 0, pointerEvents: "auto"  };
    if (diff === total - 1) return { x: -60, y: 30, scale: 0.75, opacity: 0.6, zIndex: 35, blur: 4, pointerEvents: "none"  };
    if (diff === total - 2) return { x: -200, y: 50, scale: 0.62, opacity: 0.4, zIndex: 25, blur: 6, pointerEvents: "none" };
    return                         { x: -300, y: 80, scale: 0.3,  opacity: 0,   zIndex: 5,  blur: 8, pointerEvents: "none" };
  };

  return (
    <div style={{
      position: "relative", width: "100%", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      background: t.bg,
      paddingTop: 80, paddingBottom: 40,
      transition: "background 0.4s ease",
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
        @keyframes hero-glow-pulse { 0%,100%{ opacity:0.45; } 50%{ opacity:0.85; } }
        .feat-chip {
          display:flex; align-items:center; gap:7px;
          padding:8px 12px; border-radius:9px;
          transition:border-color 0.2s ease, background 0.2s ease;
          cursor:default;
        }
        .know-more-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; border-radius:9999px;
          font-family:'Outfit',sans-serif; font-weight:700;
          font-size:0.88rem; letter-spacing:0.02em;
          border:none; cursor:pointer; outline:none;
          text-decoration:none;
          transition:opacity 0.2s ease, transform 0.15s ease;
        }
        .know-more-btn:hover  { opacity:0.88; }
        .know-more-btn:active { transform:scale(0.97); }
        ::-webkit-scrollbar { display:none; }
      `}</style>

      {/* ── YOUR EXACT background ─────────────────────────────── */}
      {isDark && (
        <>
          <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.035,zIndex:1 }} aria-hidden>
            <filter id="hero-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/>
              <feColorMatrix type="saturate" values="0"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#hero-noise)"/>
          </svg>
          <div style={{
            position:"absolute",inset:0,pointerEvents:"none",zIndex:1,
            backgroundImage:"radial-gradient(rgba(255,255,255,0.065) 1px,transparent 1px)",
            backgroundSize:"28px 28px",
            maskImage:"radial-gradient(ellipse 85% 70% at 50% 42%,black 10%,transparent 100%)",
            WebkitMaskImage:"radial-gradient(ellipse 85% 70% at 50% 42%,black 10%,transparent 100%)",
          }}/>
          <div style={{
            position:"absolute",pointerEvents:"none",zIndex:1,
            top:"30%",left:"35%",transform:"translate(-50%,-50%)",
            width:800,height:500,borderRadius:"50%",
            background:"radial-gradient(ellipse,rgba(255,255,255,0.04) 0%,transparent 70%)",
            animation:"hero-glow-pulse 6s ease-in-out infinite",
          }}/>
          <div style={{ position:"absolute",bottom:0,left:0,right:0,pointerEvents:"none",zIndex:1,height:180,background:`linear-gradient(to top,${t.bg} 10%,transparent)` }}/>
        </>
      )}
      {!isDark && (
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:1,
          backgroundImage:`radial-gradient(${t.border} 1px,transparent 1px)`,
          backgroundSize:"28px 28px",
          maskImage:"radial-gradient(ellipse 85% 70% at 50% 42%,black 10%,transparent 100%)",
          WebkitMaskImage:"radial-gradient(ellipse 85% 70% at 50% 42%,black 10%,transparent 100%)",
        }}/>
      )}

      {/* ── YOUR EXACT headline ───────────────────────────────── */}
      <div style={{
        position:"relative", zIndex:10, width:"100%",
        display:"flex", flexDirection:"column", alignItems:"center",
        textAlign:"center",
        paddingInline: isMobile ? 20 : 20,
        marginBottom: isMobile ? 32 : 56,
      }}>
        <h1 style={{
          margin:0, fontFamily:"'Outfit',sans-serif", fontWeight:800,
          fontSize: isMobile ? "clamp(1.35rem,6vw,1.85rem)" : "clamp(1.38rem,4.5vw,3.2rem)",
          letterSpacing:"-0.04em", lineHeight:1.1,
          color: t.text,
          display:"flex", alignItems:"center", justifyContent:"center",
          flexWrap:"nowrap", gap:"0.28em", width:"100%",
        }}>
          <span style={{ flexShrink:0, whiteSpace:"nowrap" }}>{HEADLINE_PREFIX}</span>
          <span style={{
            position:"relative", display:"inline-block",
            width: isMobile ? "8ch" : "9.5ch",
            height:"1.2em", overflow:"hidden", flexShrink:0,
          }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={accentIndex}
                initial={{ y:"100%", opacity:0 }}
                animate={{ y:"0%",   opacity:1 }}
                exit={{   y:"-100%", opacity:0 }}
                transition={{ duration:0.38, ease:[0.22,1,0.36,1] }}
                style={{
                  position:"absolute", top:0, left:0,
                  width:"100%", textAlign:"left",
                  color: isDark ? "rgba(200,210,225,0.42)" : "rgba(80,95,120,0.45)",
                  fontWeight:800, whiteSpace:"nowrap",
                  fontFamily:"'Outfit',sans-serif",
                  fontSize: isMobile ? "clamp(1.35rem,6vw,1.85rem)" : "clamp(1.38rem,4.5vw,3.2rem)",
                  letterSpacing:"-0.04em", lineHeight:1.1,
                }}
              >
                {ACCENT_WORDS[accentIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
      </div>

      {/* ════════════════════════════════════════════════════════
          DESKTOP — YOUR EXACT ORIGINAL, untouched
      ════════════════════════════════════════════════════════ */}
      {!isMobile && (
        <motion.div
          initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.3, duration:0.8, ease:[0.22,1,0.36,1] }}
          style={{
            position:"relative", zIndex:10,
            width:"100%", maxWidth:1280,
            paddingInline:40,
            display:"flex", alignItems:"center",
            justifyContent:"space-between", gap:20,
          }}
        >
          {/* LEFT: carousel — YOUR EXACT original */}
          <div style={{ flex:"0 0 580px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ position:"relative", width:"100%", height:420, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {slides.map((s, index) => {
                const style    = getCarouselItemStyle(index);
                const isActive = index === active;
                return (
                  <motion.div
                    key={index}
                    animate={{ x: style.x, y: style.y, scale: style.scale, opacity: style.opacity }}
                    transition={{ type:"spring", stiffness:200, damping:30, mass:0.8 }}
                    style={{
                      position:"absolute", width:340,
                      zIndex: style.zIndex,
                      filter:`blur(${style.blur}px) drop-shadow(0 ${isActive ? 32 : 16}px ${isActive ? 64 : 32}px rgba(0,0,0,${isActive ? 0.5 : 0.25}))`,
                      pointerEvents: style.pointerEvents as any,
                    }}
                  >
                    {isActive ? (
                      <Link to={s.link} className="hero-img-link" style={{ display:"block" }}>
                        <img src={s.image} alt={s.label} draggable={false}
                          style={{ width:"100%", display:"block", userSelect:"none", borderRadius:8 }}/>
                      </Link>
                    ) : (
                      <img src={s.image} alt={s.label} draggable={false}
                        style={{ width:"100%", display:"block", userSelect:"none", borderRadius:8 }}/>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: content — YOUR EXACT original */}
          <div style={{ flex:1, paddingLeft:0, display:"flex", flexDirection:"column", maxWidth:560, position:"relative", zIndex:60 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity:0, x:28, filter:"blur(6px)" }}
                animate={{ opacity:1, x:0,  filter:"blur(0px)" }}
                exit={{   opacity:0, x:-16, filter:"blur(4px)" }}
                transition={{ duration:0.44, ease:[0.22,1,0.36,1] }}
                style={{ display:"flex", flexDirection:"column" }}
              >
                <span style={{
                  display:"inline-block", alignSelf:"flex-start",
                  fontFamily:"'DM Mono',monospace", fontSize:"0.6rem",
                  letterSpacing:"0.2em", textTransform:"uppercase",
                  color: isDark ? "rgba(93,232,160,0.75)" : "rgba(22,160,80,0.8)",
                  marginBottom:14,
                }}>
                  {slide.tag}
                </span>

                <h2 style={{
                  fontFamily:"'Outfit',sans-serif", fontWeight:800,
                  fontSize:"clamp(1.5rem,3vw,2.4rem)",
                  letterSpacing:"-0.035em", lineHeight:1.15,
                  color: t.text, margin:"0 0 14px",
                }}>
                  {slide.heading}
                </h2>

                <p style={{
                  fontFamily:"'Outfit',sans-serif", fontWeight:400,
                  fontSize:"0.95rem", lineHeight:1.72,
                  color: t.textMuted, margin:"0 0 28px", maxWidth:480,
                }}>
                  {slide.description}
                </p>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:32 }}>
                  {slide.features.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={f.label}
                        className="feat-chip"
                        style={{ background:t.bgCard, border:`1px solid ${t.border}` }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = t.bgCardHover)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = t.bgCard)}
                      >
                        <div style={{
                          width:28, height:28, borderRadius:7, flexShrink:0,
                          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                          border:`1px solid ${t.border}`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                        }}>
                          <Icon size={13} color={t.textMuted} strokeWidth={1.8}/>
                        </div>
                        <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"0.78rem", color:t.textMuted }}>
                          {f.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Link
                  to={slide.link}
                  className="know-more-btn"
                  style={{
                    alignSelf:"flex-start",
                    background: isDark ? "#ffffff" : "#0c121c",
                    color:      isDark ? "#0c121c" : "#ffffff",
                    boxShadow: isDark
                      ? "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4)"
                      : "0 0 0 1px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.12)",
                  }}
                >
                  Know More <ArrowRight size={15} strokeWidth={2.2}/>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ════════════════════════════════════════════════════════
          MOBILE — new layout, only shown below 768px
      ════════════════════════════════════════════════════════ */}
      {isMobile && (
        <motion.div
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.25, duration:0.7, ease:[0.22,1,0.36,1] }}
          style={{
            position:"relative", zIndex:10,
            width:"100%", paddingInline:20,
            display:"flex", flexDirection:"column", gap:24,
          }}
        >
          {/* 1. Tab strip to switch slides */}
          <MobileTabs
            active={active}
            setActive={handleSetActive}
            isDark={isDark}
            t={t}
          />

          {/* 2. Full-width swipeable image */}
          <MobileCard
            active={active}
            setActive={handleSetActive}
            isDark={isDark}
          />

          {/* 3. Content — same structure as desktop, adapted for mobile */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity:0, y:16, filter:"blur(5px)" }}
              animate={{ opacity:1, y:0,  filter:"blur(0px)" }}
              exit={{   opacity:0, y:-10, filter:"blur(4px)" }}
              transition={{ duration:0.38, ease:[0.22,1,0.36,1] }}
              style={{ display:"flex", flexDirection:"column" }}
            >
              {/* Tag — same style as desktop */}
              <span style={{
                display:"inline-block", alignSelf:"flex-start",
                fontFamily:"'DM Mono',monospace", fontSize:"0.6rem",
                letterSpacing:"0.2em", textTransform:"uppercase",
                color: isDark ? "rgba(93,232,160,0.75)" : "rgba(22,160,80,0.8)",
                marginBottom:12,
              }}>
                {slide.tag}
              </span>

              {/* Heading */}
              <h2 style={{
                fontFamily:"'Outfit',sans-serif", fontWeight:800,
                fontSize:"clamp(1.4rem,5.5vw,1.85rem)",
                letterSpacing:"-0.035em", lineHeight:1.15,
                color: t.text, margin:"0 0 10px",
              }}>
                {slide.heading}
              </h2>

              {/* Description */}
              <p style={{
                fontFamily:"'Outfit',sans-serif", fontWeight:400,
                fontSize:"0.9rem", lineHeight:1.72,
                color: t.textMuted, margin:"0 0 20px",
              }}>
                {slide.description}
              </p>

              {/* Feature chips — same 2×2 grid as desktop */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:24 }}>
                {slide.features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.label}
                      className="feat-chip"
                      style={{ background:t.bgCard, border:`1px solid ${t.border}` }}
                    >
                      <div style={{
                        width:26, height:26, borderRadius:6, flexShrink:0,
                        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                        border:`1px solid ${t.border}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                      }}>
                        <Icon size={12} color={t.textMuted} strokeWidth={1.8}/>
                      </div>
                      <span style={{
                        fontFamily:"'Outfit',sans-serif", fontWeight:600,
                        fontSize:"0.75rem", color:t.textMuted,
                      }}>
                        {f.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA — same style as desktop */}
              <Link
                to={slide.link}
                className="know-more-btn"
                style={{
                  alignSelf:"flex-start",
                  background: isDark ? "#ffffff" : "#0c121c",
                  color:      isDark ? "#0c121c" : "#ffffff",
                  boxShadow: isDark
                    ? "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4)"
                    : "0 0 0 1px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.12)",
                }}
              >
                Know More <ArrowRight size={14} strokeWidth={2.2}/>
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

    </div>
  );
}