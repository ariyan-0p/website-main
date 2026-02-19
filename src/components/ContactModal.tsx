import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, Linkedin, ArrowRight } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { t, isDark } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>

          {/* Backdrop */}
          <motion.div key="bd"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.25 }}
            onClick={onClose}
            style={{ position:"absolute",inset:0,background:isDark?"rgba(0,0,0,0.82)":"rgba(0,0,0,0.45)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)" }}
          />

          {/* Modal */}
          <motion.div key="modal"
            initial={{ opacity:0,scale:0.95,y:20 }} animate={{ opacity:1,scale:1,y:0 }} exit={{ opacity:0,scale:0.95,y:16 }}
            transition={{ duration:0.35,ease:[0.22,1,0.36,1] }}
            style={{
              position:"relative",width:"100%",maxWidth:820,borderRadius:24,overflow:"hidden",
              display:"flex",flexDirection:"row",
              background:isDark?"#0b0c10":"#ffffff",
              border:`1px solid ${t.border}`,
              boxShadow:isDark?"0 40px 100px rgba(0,0,0,0.75)":"0 40px 100px rgba(0,0,0,0.15)",
            }}
          >
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Plus Jakarta Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
              .cm-input { width:100%; box-sizing:border-box; border-radius:10px; padding:12px 16px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.88rem; outline:none; transition:border-color 0.2s ease,box-shadow 0.2s ease; }
              .cm-label { display:block; font-family:'Plus Jakarta Sans',monospace; font-size:0.62rem; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:8px; }
              .cm-contact-row { display:flex; align-items:center; gap:14px; padding:12px 14px; border-radius:12px; text-decoration:none; transition:background 0.2s ease; }
              .cm-icon-box { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:transform 0.2s ease; }
              .cm-contact-row:hover .cm-icon-box { transform:scale(1.07); }
              @media(max-width:600px){ .cm-modal-row { flex-direction:column !important; } }
            `}</style>

            {/* Close */}
            <button onClick={onClose} style={{
              position:"absolute",top:16,right:16,zIndex:10,width:32,height:32,borderRadius:"50%",
              background:t.bgCard,border:`1px solid ${t.border}`,display:"flex",alignItems:"center",
              justifyContent:"center",cursor:"pointer",color:t.textMuted,outline:"none",transition:"background 0.2s ease",
            }}
            onMouseEnter={(e)=>(e.currentTarget.style.background=t.bgCardHover)}
            onMouseLeave={(e)=>(e.currentTarget.style.background=t.bgCard)}>
              <X size={14} color={t.textMuted}/>
            </button>

            {/* LEFT */}
            <div className="cm-modal-row" style={{
              width:"38%",flexShrink:0,padding:"40px 32px",
              background:t.bgCard,borderRight:`1px solid ${t.border}`,
              display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative",overflow:"hidden",
            }}>
              <div style={{ position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",pointerEvents:"none",
                background:"radial-gradient(circle,rgba(99,150,255,0.07) 0%,transparent 70%)" }}/>
              <div style={{ position:"relative",zIndex:1 }}>
                <span style={{ display:"block",fontFamily:"'Plus Jakarta Sans',monospace",fontSize:"0.62rem",letterSpacing:"0.18em",textTransform:"uppercase",color:t.textFaint,marginBottom:12 }}>RenoBill</span>
                <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.65rem",letterSpacing:"-0.04em",color:t.text,margin:"0 0 10px",lineHeight:1.15 }}>Get in touch</h3>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"0.82rem",color:t.textMuted,margin:"0 0 36px",lineHeight:1.65 }}>
                  Ready to modernise your restaurant? We'll set up a free demo — just reach out.
                </p>
                <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
                  {[
                    { href:"tel:+919849529644", icon:Phone, label:"Call us", value:"+91 98495 29644" },
                    { href:"mailto:renobillindia@gmail.com", icon:Mail, label:"Email us", value:"renobillindia@gmail.com" },
                    { href:"https://linkedin.com/company/renobill", icon:Linkedin, label:"Follow us", value:"@renobill" },
                  ].map(({ href, icon: Icon, label, value }) => (
                    <a key={label} href={href} target={href.startsWith("http")?"_blank":undefined}
                      rel={href.startsWith("http")?"noopener noreferrer":undefined}
                      className="cm-contact-row"
                      onMouseEnter={(e)=>(e.currentTarget.style.background=t.bgCardHover)}
                      onMouseLeave={(e)=>(e.currentTarget.style.background="transparent")}
                    >
                      <div className="cm-icon-box" style={{ background:t.bgCard,border:`1px solid ${t.border}` }}>
                        <Icon size={16} color={t.textMuted}/>
                      </div>
                      <div>
                        <p style={{ fontFamily:"'Plus Jakarta Sans',monospace",fontSize:"0.58rem",letterSpacing:"0.14em",textTransform:"uppercase",color:t.textFaint,margin:"0 0 2px" }}>{label}</p>
                        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"0.83rem",color:t.textMuted,margin:0 }}>{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <p style={{ fontFamily:"'Plus Jakarta Sans',monospace",fontSize:"0.6rem",letterSpacing:"0.1em",color:t.textFaint,margin:0,paddingTop:24,position:"relative",zIndex:1 }}>
                © {new Date().getFullYear()} RenoBill
              </p>
            </div>

            {/* RIGHT — Form */}
            <div style={{ flex:1,padding:"40px 36px" }}>
              <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.05rem",letterSpacing:"-0.025em",color:t.text,margin:"0 0 28px" }}>
                Send us a message
              </h4>
              <form style={{ display:"flex",flexDirection:"column",gap:18 }} onSubmit={(e)=>e.preventDefault()}>
                <div>
                  <label className="cm-label" style={{ color:t.textFaint }}>Restaurant Name</label>
                  <input type="text" className="cm-input" placeholder="E.g. The Spicy Spoon"
                    style={{ background:t.bgCard,border:`1px solid ${t.border}`,color:t.text }}
                    onFocus={(e)=>{ e.currentTarget.style.borderColor=t.borderStrong; e.currentTarget.style.boxShadow=`0 0 0 3px ${t.bgCard}`; }}
                    onBlur={(e)=>{ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.boxShadow="none"; }}
                  />
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                  <div>
                    <label className="cm-label" style={{ color:t.textFaint }}>Your Name</label>
                    <input type="text" className="cm-input" placeholder="Full name"
                      style={{ background:t.bgCard,border:`1px solid ${t.border}`,color:t.text }}
                      onFocus={(e)=>{ e.currentTarget.style.borderColor=t.borderStrong; }}
                      onBlur={(e)=>{ e.currentTarget.style.borderColor=t.border; }}
                    />
                  </div>
                  <div>
                    <label className="cm-label" style={{ color:t.textFaint }}>Phone</label>
                    <input type="tel" className="cm-input" placeholder="+91..."
                      style={{ background:t.bgCard,border:`1px solid ${t.border}`,color:t.text }}
                      onFocus={(e)=>{ e.currentTarget.style.borderColor=t.borderStrong; }}
                      onBlur={(e)=>{ e.currentTarget.style.borderColor=t.border; }}
                    />
                  </div>
                </div>
                <div>
                  <label className="cm-label" style={{ color:t.textFaint }}>Message</label>
                  <textarea className="cm-input" rows={4} placeholder="I'm interested in..."
                    style={{ background:t.bgCard,border:`1px solid ${t.border}`,color:t.text,resize:"none",lineHeight:1.6 }}
                    onFocus={(e)=>{ e.currentTarget.style.borderColor=t.borderStrong; }}
                    onBlur={(e)=>{ e.currentTarget.style.borderColor=t.border; }}
                  />
                </div>
                <button type="submit" style={{
                  width:"100%",padding:"14px 0",borderRadius:9999,
                  fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.9rem",letterSpacing:"0.02em",
                  color:      isDark?"#050505":"#ffffff",
                  background: isDark?"#ffffff":"#0c121c",
                  border:"none",cursor:"pointer",outline:"none",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  boxShadow:isDark?"0 4px 20px rgba(255,255,255,0.08)":"0 4px 20px rgba(0,0,0,0.15)",
                  transition:"opacity 0.2s ease,transform 0.15s ease",
                }}
                onMouseEnter={(e)=>(e.currentTarget.style.opacity="0.88")}
                onMouseLeave={(e)=>(e.currentTarget.style.opacity="1")}
                onMouseDown={(e)=>(e.currentTarget.style.transform="scale(0.97)")}
                onMouseUp={(e)=>(e.currentTarget.style.transform="scale(1)")}
                >
                  Send Message <ArrowRight size={16}/>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;