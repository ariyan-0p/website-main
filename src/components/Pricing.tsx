import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface PricingProps { onOpenModal: () => void; }

const plans = [
  { name:"Starter",      price:"399", description:"Perfect for cafes & small eateries",  highlight:false,
    features:["Smart Billing","Inventory Management","Mobile App","KOT Printing","Basic Reports"] },
  { name:"Professional", price:"599", description:"For growing restaurants",              highlight:true,
    features:["All Starter Features","QR Menu","Waiter App","Kitchen Display","Advanced Analytics","Priority Support"] },
  { name:"Enterprise",   price:"799", description:"For chains & franchises",              highlight:false,
    features:["All Pro Features","Advanced SEO","Custom Branding","API Access","White-label","Dedicated Manager"] },
];

const Pricing = ({ onOpenModal }: PricingProps) => {
  const { t, isDark } = useTheme();

  return (
    <section id="pricing" style={{ background:t.bg, paddingTop:110, paddingBottom:120, position:"relative", overflow:"hidden", transition:"background 0.4s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus Jakarta Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .price-card { position:relative; border-radius:22px; padding:36px 32px; display:flex; flex-direction:column; transition:transform 0.28s cubic-bezier(0.22,1,0.36,1),box-shadow 0.28s ease; }
        .price-card:hover { transform:translateY(-5px); }
      `}</style>

      <div style={{ position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:`radial-gradient(${isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"} 1px,transparent 1px)`,
        backgroundSize:"30px 30px",
        maskImage:"radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 100%)",
        WebkitMaskImage:"radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 100%)",
      }}/>
      <div style={{ position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"60%",height:1,pointerEvents:"none",background:`linear-gradient(90deg,transparent,${t.border} 30%,${t.border} 70%,transparent)` }}/>

      <div style={{ maxWidth:1080,margin:"0 auto",paddingInline:24,position:"relative",zIndex:1 }}>
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true,margin:"-60px" }} transition={{ duration:0.65,ease:[0.22,1,0.36,1] }}
          style={{ textAlign:"center",marginBottom:68 }}>
          <span style={{ display:"inline-block",fontFamily:"'Plus Jakarta Sans',monospace",fontSize:"0.65rem",letterSpacing:"0.2em",textTransform:"uppercase",color:t.textFaint,marginBottom:16 }}>Pricing</span>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,2.8rem)",letterSpacing:"-0.04em",color:t.text,margin:0,lineHeight:1.1 }}>
            Simple, transparent pricing
          </h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"1rem",color:t.textMuted,marginTop:12,lineHeight:1.6 }}>
            All plans include 24/7 priority support.
          </p>
        </motion.div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,alignItems:"stretch" }}>
          {plans.map((plan,i) => (
            <motion.div key={plan.name} initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true,margin:"-40px" }} transition={{ delay:i*0.1,duration:0.6,ease:[0.22,1,0.36,1] }}
              className="price-card"
              style={plan.highlight
                ? { background:isDark?"#ffffff":"#0c121c", border:`1px solid ${isDark?"rgba(255,255,255,0.9)":"rgba(12,18,28,0.9)"}`, boxShadow:isDark?"0 32px 72px rgba(0,0,0,0.6)":"0 32px 72px rgba(0,0,0,0.15)" }
                : { background:t.bgCard, border:`1px solid ${t.border}` }}
              onMouseEnter={(e)=>{ if(!plan.highlight) e.currentTarget.style.boxShadow=isDark?"0 24px 56px rgba(0,0,0,0.5)":"0 24px 56px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e)=>{ if(!plan.highlight) e.currentTarget.style.boxShadow="none"; }}
            >
              {plan.highlight && (
                <span style={{ display:"inline-block",fontFamily:"'Plus Jakarta Sans',monospace",fontSize:"0.6rem",letterSpacing:"0.2em",textTransform:"uppercase",color:isDark?"#050505":"#ffffff",background:isDark?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.15)",borderRadius:4,padding:"3px 9px",marginBottom:14,alignSelf:"flex-start" }}>
                  Most Popular
                </span>
              )}
              <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.3rem",letterSpacing:"-0.03em",color:plan.highlight?(isDark?"#050505":"#ffffff"):t.text,margin:"0 0 6px" }}>{plan.name}</h3>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"0.8rem",color:plan.highlight?(isDark?"rgba(0,0,0,0.45)":"rgba(255,255,255,0.55)"):t.textMuted,margin:"0 0 26px",lineHeight:1.5 }}>{plan.description}</p>
              <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:28 }}>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"2.8rem",letterSpacing:"-0.05em",lineHeight:1,color:plan.highlight?(isDark?"#050505":"#ffffff"):t.text }}>₹{plan.price}</span>
                <span style={{ fontFamily:"'Plus Jakarta Sans',monospace",fontSize:"0.72rem",color:plan.highlight?(isDark?"rgba(0,0,0,0.4)":"rgba(255,255,255,0.45)"):t.textFaint,letterSpacing:"0.05em" }}>/mo</span>
              </div>
              <div style={{ height:1,background:plan.highlight?(isDark?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.12)"):t.border,marginBottom:24 }}/>
              <ul style={{ listStyle:"none",padding:0,margin:"0 0 32px",display:"flex",flexDirection:"column",gap:13,flex:1 }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                    <Check size={15} strokeWidth={2.5} color={plan.highlight?(isDark?"#050505":"#ffffff"):"#5de8a0"} style={{ flexShrink:0,marginTop:2 }}/>
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"0.83rem",fontWeight:500,color:plan.highlight?(isDark?"rgba(0,0,0,0.7)":"rgba(255,255,255,0.75)"):t.textMuted,lineHeight:1.4 }}>{feat}</span>
                  </li>
                ))}
              </ul>
              <button onClick={onOpenModal} style={{
                width:"100%",padding:"13px 0",borderRadius:9999,
                fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.84rem",letterSpacing:"0.02em",
                color:      plan.highlight?(isDark?"#ffffff":"#0c121c"):t.text,
                background: plan.highlight?(isDark?"#050505":"#ffffff"):t.bgCardHover,
                border:     plan.highlight?"none":`1px solid ${t.border}`,
                cursor:"pointer",outline:"none",transition:"opacity 0.2s ease,transform 0.15s ease",
              }}
              onMouseEnter={(e)=>(e.currentTarget.style.opacity="0.85")}
              onMouseLeave={(e)=>(e.currentTarget.style.opacity="1")}
              onMouseDown={(e)=>(e.currentTarget.style.transform="scale(0.97)")}
              onMouseUp={(e)=>(e.currentTarget.style.transform="scale(1)")}
              >
                {plan.highlight?"Get Started":plan.name==="Enterprise"?"Contact Sales":"Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;