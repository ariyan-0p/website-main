import React from "react";
import { useTheme } from "./ThemeContext";

const Footer = () => {
  const { t, isDark } = useTheme();

  return (
    <footer style={{ background:t.bg, borderTop:`1px solid ${t.border}`, position:"relative", overflow:"hidden", transition:"background 0.4s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .footer-link { font-family:'DM Mono',monospace; font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; text-decoration:none; transition:color 0.2s ease; }
      `}</style>

      <div style={{ position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:500,height:1,pointerEvents:"none",
        background:`linear-gradient(90deg,transparent,${t.borderStrong} 30%,${t.borderStrong} 70%,transparent)` }}/>

      <div style={{ maxWidth:1160,margin:"0 auto",paddingInline:24,paddingTop:52,paddingBottom:48 }}>
        <div style={{ display:"flex",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-between",gap:36,marginBottom:48 }}>

          {/* Brand */}
          <div style={{ maxWidth:260 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14,cursor:"pointer" }}
              onClick={() => window.scrollTo({ top:0,behavior:"smooth" })}>
              <span style={{ fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:"1.2rem",letterSpacing:"-0.04em",color:t.text }}>
                Reno<span style={{ color:t.textFaint }}>Bill</span>
              </span>
            </div>
            <p style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.8rem",color:t.textFaint,lineHeight:1.65,margin:0 }}>
              The all-in-one POS and management platform built for modern restaurants, cafes, and retail.
            </p>
          </div>

          {/* Links */}
          <div style={{ display:"flex",gap:56,flexWrap:"wrap" }}>
            <div>
              <p style={{ fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",letterSpacing:"0.18em",textTransform:"uppercase",color:t.textFaint,marginBottom:16,marginTop:0 }}>Product</p>
              <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                {["Features","Pricing","Changelog"].map(l=>(
                  <a key={l} href={`#${l.toLowerCase()}`} className="footer-link" style={{ color:t.textMuted }}
                    onMouseEnter={(e)=>(e.currentTarget.style.color=t.text)}
                    onMouseLeave={(e)=>(e.currentTarget.style.color=t.textMuted)}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",letterSpacing:"0.18em",textTransform:"uppercase",color:t.textFaint,marginBottom:16,marginTop:0 }}>Company</p>
              <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                <a href="/about" className="footer-link" style={{ color:t.textMuted }} onMouseEnter={(e)=>(e.currentTarget.style.color=t.text)} onMouseLeave={(e)=>(e.currentTarget.style.color=t.textMuted)}>About</a>
                <a href="/contact" className="footer-link" style={{ color:t.textMuted }} onMouseEnter={(e)=>(e.currentTarget.style.color=t.text)} onMouseLeave={(e)=>(e.currentTarget.style.color=t.textMuted)}>Contact</a>
                <a href="https://linkedin.com/company/renobill" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color:t.textMuted }} onMouseEnter={(e)=>(e.currentTarget.style.color=t.text)} onMouseLeave={(e)=>(e.currentTarget.style.color=t.textMuted)}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height:1,background:t.border,marginBottom:24 }}/>

        <div style={{ display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:12 }}>
          <p style={{ fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",letterSpacing:"0.08em",color:t.textFaint,margin:0 }}>
            © {new Date().getFullYear()} RenoBill. All rights reserved.
          </p>
          <div style={{ display:"flex",gap:20 }}>
            {["Privacy","Terms"].map(l=>(
              <a key={l} href="#" className="footer-link" style={{ color:t.textFaint }}
                onMouseEnter={(e)=>(e.currentTarget.style.color=t.textMuted)}
                onMouseLeave={(e)=>(e.currentTarget.style.color=t.textFaint)}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;