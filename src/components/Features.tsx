import React from "react";
import { motion } from "framer-motion";
import { Receipt, Boxes, FileText, Smartphone, Printer, PieChart, QrCode, Users, ChefHat } from "lucide-react";
import { useTheme } from "./ThemeContext";

const features = [
  { icon: Receipt,    title: "Smart Billing",  description: "Lightning-fast POS with customisable receipts, split bills, and instant GST invoicing." },
  { icon: Boxes,      title: "Inventory",      description: "Real-time stock tracking with automated low-stock alerts and supplier reorder." },
  { icon: FileText,   title: "Reports",        description: "Comprehensive daily, weekly, and monthly analytics with export to PDF or Excel." },
  { icon: Smartphone, title: "Mobile Access",  description: "Manage your entire business from anywhere — real-time data on any device." },
  { icon: Printer,    title: "KOT Printing",   description: "Instant kitchen order tickets to your printer the moment an order is placed." },
  { icon: PieChart,   title: "Analytics",      description: "Track best-sellers, peak hours, staff performance, and revenue trends." },
  { icon: QrCode,     title: "QR Menu",        description: "Contactless digital menu with real-time updates — no reprinting ever needed." },
  { icon: Users,      title: "Waiter App",     description: "Table-side ordering from a handheld device, synced live to kitchen and billing." },
  { icon: ChefHat,    title: "KDS",            description: "Kitchen Display System that replaces paper tickets with a clear digital screen." },
];

const Features = () => {
  const { t, isDark } = useTheme();

  return (
    <section id="features" style={{
      background: t.bg, paddingTop: 100, paddingBottom: 120,
      position: "relative", overflow: "hidden",
      transition: "background 0.4s ease",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .feat-card { position:relative; border-radius:18px; padding:28px; transition:border-color 0.25s ease,transform 0.25s ease,box-shadow 0.25s ease; cursor:default; overflow:hidden; }
        .feat-card:hover { transform:translateY(-4px); }
      `}</style>

      <div style={{ position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:`radial-gradient(${isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"} 1px,transparent 1px)`,
        backgroundSize:"30px 30px",
        maskImage:"radial-gradient(ellipse 85% 80% at 50% 50%,black 20%,transparent 100%)",
        WebkitMaskImage:"radial-gradient(ellipse 85% 80% at 50% 50%,black 20%,transparent 100%)",
      }}/>

      <div style={{ maxWidth:1160, margin:"0 auto", paddingInline:24, position:"relative", zIndex:1 }}>
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true,margin:"-60px" }} transition={{ duration:0.65,ease:[0.22,1,0.36,1] }}
          style={{ textAlign:"center", marginBottom:72 }}>
          <span style={{ display:"inline-block", fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:t.textFaint, marginBottom:16 }}>
            What's inside
          </span>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:"clamp(2rem,4vw,2.8rem)", letterSpacing:"-0.04em", color:t.text, margin:0, lineHeight:1.1 }}>
            Everything your restaurant needs
          </h2>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"1rem", color:t.textMuted, marginTop:14, maxWidth:460, marginInline:"auto", lineHeight:1.6 }}>
            A complete operating system for modern food businesses.
          </p>
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true,margin:"-40px" }} transition={{ delay:i*0.06,duration:0.55,ease:[0.22,1,0.36,1] }}
                className="feat-card"
                style={{ background:t.bgCard, border:`1px solid ${t.border}` }}
                onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=t.borderStrong; e.currentTarget.style.boxShadow=isDark?"0 20px 48px rgba(0,0,0,0.45)":"0 20px 48px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ width:44,height:44,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18,background:t.bgCardHover,border:`1px solid ${t.border}` }}>
                  <Icon size={19} color={t.textMuted} strokeWidth={1.7}/>
                </div>
                <h3 style={{ fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:"1rem",letterSpacing:"-0.02em",color:t.text,margin:"0 0 8px" }}>{f.title}</h3>
                <p style={{ fontFamily:"'Outfit',sans-serif",fontWeight:400,fontSize:"0.82rem",color:t.textFaint,margin:0,lineHeight:1.65 }}>{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;