import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Zap, ShoppingCart, Package,
  BarChart2, Wifi, Battery, Clock, Plus, Minus, CheckCircle,
  AlertTriangle, TrendingUp, ChefHat, Printer, X,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

/* ─── Breakpoint hook ────────────────────────────────────── */
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

/* ─── POS Status Bar ─────────────────────────────────────── */
function PosStatusBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = d => d.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" });

  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"7px 12px",
      background:"#0a0a0f",
      borderBottom:"1px solid #1a1a2e",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <motion.div
          animate={{ opacity:[1,0.3,1] }}
          transition={{ duration:1.8, repeat:Infinity }}
          style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 5px #22c55e" }}
        />
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, fontWeight:700, color:"#22c55e", letterSpacing:"0.1em" }}>LIVE</span>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, color:"#6b7280", letterSpacing:"0.05em" }}>TABLE 5</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <Clock size={9} color="#6b7280" />
        <span style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize:9, color:"#9ca3af" }}>{fmt(time)}</span>
        <Wifi size={9} color="#6b7280" />
        <Battery size={9} color="#6b7280" />
      </div>
    </div>
  );
}

/* ─── BILLING SCREEN ─────────────────────────────────────── */
const menuItems = [
  { name:"Butter Chicken", cat:"Mains",    price:320, emoji:"🍛" },
  { name:"Naan",           cat:"Bread",    price:60,  emoji:"🫓" },
  { name:"Paneer Tikka",   cat:"Starters", price:280, emoji:"🧀" },
  { name:"Masala Chai",    cat:"Drinks",   price:50,  emoji:"🍵" },
  { name:"Gulab Jamun",    cat:"Dessert",  price:120, emoji:"🍮" },
  { name:"Dal Makhani",    cat:"Mains",    price:220, emoji:"🫕" },
  { name:"Lassi",          cat:"Drinks",   price:80,  emoji:"🥛" },
  { name:"Biryani",        cat:"Mains",    price:380, emoji:"🍚" },
];

function BillingScreen({ compact }) {
  const [order, setOrder]     = useState([
    { ...menuItems[0], qty:2 },
    { ...menuItems[1], qty:4 },
    { ...menuItems[2], qty:1 },
  ]);
  const [kotFired, setKotFired] = useState(false);
  const [activeTab, setActiveTab] = useState("Mains");

  const cats  = [...new Set(menuItems.map(m => m.cat))];
  const total = order.reduce((s,i) => s + i.price*i.qty, 0);
  const gst   = Math.round(total * 0.05);

  const addItem = item => setOrder(prev => {
    const ex = prev.find(o => o.name===item.name);
    if (ex) return prev.map(o => o.name===item.name ? {...o, qty:o.qty+1} : o);
    return [...prev, {...item, qty:1}];
  });

  const fireKot = () => { setKotFired(true); setTimeout(()=>setKotFired(false), 2000); };

  const panelBg = "#0f1117";
  const sideBg  = "#060609";
  const itemBg  = "#1a1f2e";
  const textPri = "#f9fafb";
  const textSec = "#9ca3af";

  const sideW = compact ? 160 : 190;

  return (
    <div style={{ display:"flex", height:"100%", overflow:"hidden" }}>
      {/* Menu grid */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", background:panelBg, overflow:"hidden", minWidth:0 }}>
        {/* Category tabs */}
        <div style={{ display:"flex", gap:3, padding:"8px 8px 6px", borderBottom:"1px solid #1f2937", overflowX:"auto", flexShrink:0 }}>
          {cats.map(cat => (
            <button key={cat} onClick={()=>setActiveTab(cat)} style={{
              padding: compact ? "3px 8px" : "4px 10px",
              borderRadius:6, border:"none", cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              fontSize: compact ? 9 : 10, fontWeight:600, whiteSpace:"nowrap",
              background: activeTab===cat ? "#6366f1" : "transparent",
              color: activeTab===cat ? "#fff" : textSec,
              transition:"all 0.2s",
            }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          flex:1, overflowY:"auto", padding:8,
          display:"grid",
          gridTemplateColumns: compact ? "1fr 1fr" : "1fr 1fr",
          gap:6, alignContent:"start",
        }}>
          {menuItems.filter(m=>m.cat===activeTab).map((item,i)=>(
            <motion.button
              key={item.name}
              initial={{ opacity:0, scale:0.92 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ delay:i*0.05 }}
              onClick={()=>addItem(item)}
              whileTap={{ scale:0.95 }}
              style={{
                background:itemBg, border:"1px solid #1f2937", borderRadius:10,
                padding: compact ? "8px 7px" : "12px 10px",
                display:"flex", flexDirection:"column", gap:3,
                cursor:"pointer", textAlign:"left", outline:"none",
              }}
            >
              <span style={{ fontSize: compact ? 18 : 22 }}>{item.emoji}</span>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:11, fontWeight:700, color:textPri, lineHeight:1.3 }}>{item.name}</span>
              <span style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize: compact?9:11, fontWeight:600, color:"#818cf8" }}>₹{item.price}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Order panel */}
      <div style={{ width:sideW, background:sideBg, display:"flex", flexDirection:"column", borderLeft:"1px solid #1f2937", flexShrink:0 }}>
        <div style={{ padding: compact?"8px 10px 6px":"10px 12px 8px", borderBottom:"1px solid #1f2937" }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <ShoppingCart size={11} color="#818cf8" />
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:10, fontWeight:700, color:textPri }}>Order</span>
          </div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, color:textSec }}>{order.reduce((s,i)=>s+i.qty,0)} items</span>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"4px 0" }}>
          <AnimatePresence>
            {order.map(item=>(
              <motion.div
                key={item.name}
                initial={{ opacity:0, x:16 }}
                animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:16 }}
                style={{ padding: compact?"5px 10px":"7px 12px", display:"flex", alignItems:"center", gap:5, borderBottom:"1px solid #0d1117" }}
              >
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:10, fontWeight:600, color:textPri, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.name}</div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize: compact?9:10, color:"#818cf8" }}>₹{item.price*item.qty}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:3, flexShrink:0 }}>
                  <button
                    onClick={()=>setOrder(p=>p.map(o=>o.name===item.name?{...o,qty:Math.max(0,o.qty-1)}:o).filter(o=>o.qty>0))}
                    style={{ width:14, height:14, borderRadius:3, border:"none", background:"#1f2937", color:textSec, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
                    <Minus size={8} />
                  </button>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize: compact?9:10, fontWeight:700, color:textPri, minWidth:10, textAlign:"center" }}>{item.qty}</span>
                  <button
                    onClick={()=>addItem(item)}
                    style={{ width:14, height:14, borderRadius:3, border:"none", background:"#1f2937", color:textSec, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
                    <Plus size={8} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div style={{ padding: compact?"8px 10px":"10px 12px", borderTop:"1px solid #1f2937", display:"flex", flexDirection:"column", gap:4 }}>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?8:10, color:textSec }}>Subtotal</span>
            <span style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize: compact?8:10, color:textPri }}>₹{total}</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?8:10, color:textSec }}>GST 5%</span>
            <span style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize: compact?8:10, color:textPri }}>₹{gst}</span>
          </div>
          <div style={{ height:1, background:"#1f2937", margin:"2px 0" }} />
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:11, fontWeight:700, color:textPri }}>Total</span>
            <motion.span key={total} initial={{ scale:1.15, color:"#818cf8" }} animate={{ scale:1, color:"#f9fafb" }} transition={{ duration:0.3 }}
              style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize: compact?11:13, fontWeight:800 }}>₹{total+gst}</motion.span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:4, marginTop:2 }}>
            <motion.button whileTap={{ scale:0.96 }} onClick={fireKot} style={{
              padding: compact?"6px":"8px", borderRadius:7, border:"none", cursor:"pointer",
              background: kotFired?"#16a34a":"#6366f1",
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:11, fontWeight:700,
              color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", gap:4, transition:"background 0.25s",
            }}>
              <AnimatePresence mode="wait">
                {kotFired
                  ? <motion.span key="ok" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }} style={{ display:"flex", alignItems:"center", gap:3 }}><CheckCircle size={10} /> Fired!</motion.span>
                  : <motion.span key="fire" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }} style={{ display:"flex", alignItems:"center", gap:3 }}><Printer size={10} /> Fire KOT</motion.span>
                }
              </AnimatePresence>
            </motion.button>
            <button style={{
              padding: compact?"5px":"7px", borderRadius:7,
              border:"1px solid #22c55e", background:"transparent", cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:11, fontWeight:700, color:"#22c55e",
            }}>Bill & Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── INVENTORY SCREEN ───────────────────────────────────── */
const stockItems = [
  { name:"Chicken",      unit:"kg", stock:4.2,  max:20, warn:5, emoji:"🍗" },
  { name:"Basmati Rice", unit:"kg", stock:12.5, max:25, warn:5, emoji:"🍚" },
  { name:"Tomatoes",     unit:"kg", stock:2.1,  max:10, warn:3, emoji:"🍅" },
  { name:"Paneer",       unit:"kg", stock:1.8,  max:8,  warn:2, emoji:"🧀" },
  { name:"Onions",       unit:"kg", stock:0.8,  max:10, warn:2, emoji:"🧅" },
  { name:"Cooking Oil",  unit:"L",  stock:6.0,  max:15, warn:3, emoji:"🫙" },
  { name:"Milk",         unit:"L",  stock:3.5,  max:10, warn:2, emoji:"🥛" },
];

function InventoryScreen({ compact }) {
  const [filter, setFilter] = useState("all");
  const textPri = "#f9fafb";
  const textSec = "#9ca3af";
  const items = stockItems.filter(i => filter==="all" ? true : i.stock<=i.warn);

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:"#060609", overflowY:"auto" }}>
      {/* Alert */}
      {stockItems.filter(i=>i.stock<=i.warn).length > 0 && (
        <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
          style={{ margin:8, padding: compact?"6px 10px":"8px 12px", borderRadius:8, background:"#1c0a0a", border:"1px solid #7f1d1d", display:"flex", alignItems:"center", gap:7 }}>
          <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.4, repeat:Infinity }}>
            <AlertTriangle size={11} color="#f87171" />
          </motion.div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:11, fontWeight:600, color:"#f87171" }}>
            {stockItems.filter(i=>i.stock<=i.warn).length} items low — reorder now
          </span>
        </motion.div>
      )}

      {/* Filter */}
      <div style={{ display:"flex", gap:4, padding: compact?"0 8px 6px":"0 10px 8px", alignItems:"center" }}>
        {["all","low"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{
            padding: compact?"3px 8px":"4px 10px", borderRadius:6, border:"none", cursor:"pointer",
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:10, fontWeight:600,
            background: filter===f?"#6366f1":"#1f2937", color: filter===f?"#fff":textSec,
          }}>{f==="all"?"All":compact?"⚠ Low":"⚠ Low Stock"}</button>
        ))}
        <span style={{ marginLeft:"auto", fontFamily:"'Plus Jakarta Sans',monospace", fontSize:9, color:textSec }}>{stockItems.length} items</span>
      </div>

      {/* Header */}
      <div style={{ display:"grid", gridTemplateColumns:`1fr ${compact?60:80}px 1fr ${compact?44:56}px`, padding: compact?"4px 10px":"6px 12px", borderBottom:"1px solid #1f2937" }}>
        {["Item","Stock","Level",""].map((h,i)=>(
          <span key={i} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:8, fontWeight:700, color:textSec, letterSpacing:"0.1em", textTransform:"uppercase" }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex:1 }}>
        <AnimatePresence>
          {items.map((item,i)=>{
            const pct = item.stock/item.max;
            const low = item.stock<=item.warn;
            const color = low?"#f87171": pct<0.5?"#fb923c":"#22c55e";
            return (
              <motion.div
                key={item.name}
                initial={{ opacity:0, x:-10 }}
                animate={{ opacity:1, x:0 }}
                exit={{ opacity:0 }}
                transition={{ delay:i*0.05 }}
                style={{ display:"grid", gridTemplateColumns:`1fr ${compact?60:80}px 1fr ${compact?44:56}px`, padding: compact?"7px 10px":"9px 12px", borderBottom:"1px solid #0d1117", alignItems:"center", background:low?"#1c0a0a22":"transparent" }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize: compact?12:14 }}>{item.emoji}</span>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:11, fontWeight:600, color:textPri, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</span>
                </div>
                <div>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize: compact?9:11, fontWeight:700, color:low?"#f87171":textPri }}>{item.stock}{item.unit}</span>
                </div>
                <div style={{ paddingRight:8 }}>
                  <div style={{ height:4, background:"#1f2937", borderRadius:2, overflow:"hidden" }}>
                    <motion.div initial={{ width:0 }} animate={{ width:`${pct*100}%` }} transition={{ duration:0.7, delay:i*0.06, ease:[0.22,1,0.36,1] }}
                      style={{ height:"100%", borderRadius:2, background:color }} />
                  </div>
                </div>
                <div>
                  {low ? (
                    <motion.span animate={{ opacity:[1,0.4,1] }} transition={{ duration:1.2, repeat:Infinity }}
                      style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:8, fontWeight:700, color:"#f87171", background:"#7f1d1d44", padding:"2px 5px", borderRadius:4 }}>LOW</motion.span>
                  ) : (
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:8, fontWeight:700, color:"#22c55e", background:"#14532d44", padding:"2px 5px", borderRadius:4 }}>OK</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── ANALYTICS SCREEN ───────────────────────────────────── */
const DAYS    = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const REVENUE = [18400,22100,19800,25600,31200,42800,38500];
const EXPENSES= [8200, 9400, 8800, 10200,12100,15800,14200];

function AnalyticsScreen({ compact }) {
  const maxVal = Math.max(...REVENUE);
  const textPri = "#f9fafb";
  const textSec = "#6b7280";
  const cardBg  = "#0f1117";

  const metrics = [
    { label:"Revenue",  value:"₹38.5k", delta:"+12%",  icon:TrendingUp,  color:"#22c55e" },
    { label:"Orders",   value:"148",    delta:"+8",     icon:ShoppingCart,color:"#818cf8" },
    { label:"Avg Bill", value:"₹260",   delta:"+5.2%",  icon:BarChart2,   color:"#fb923c" },
  ];

  const categories = [
    { name:"Mains",    pct:44, color:"#818cf8" },
    { name:"Drinks",   pct:21, color:"#22c55e" },
    { name:"Starters", pct:19, color:"#fb923c" },
    { name:"Desserts", pct:16, color:"#f87171" },
  ];

  return (
    <div style={{ height:"100%", background:"#060609", overflowY:"auto", padding: compact?7:10, display:"flex", flexDirection:"column", gap: compact?6:8 }}>
      {/* Metric pills */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: compact?5:6 }}>
        {metrics.map((m,i)=>{
          const Icon = m.icon;
          return (
            <motion.div key={m.label} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              style={{ background:cardBg, border:"1px solid #1f2937", borderRadius: compact?8:10, padding: compact?"7px 8px":"10px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                <Icon size={compact?10:13} color={m.color} />
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:8, fontWeight:600, color:"#22c55e", background:"#14532d44", padding:"1px 4px", borderRadius:3 }}>{m.delta}</span>
              </div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize: compact?11:14, fontWeight:800, color:textPri, letterSpacing:"-0.02em" }}>{m.value}</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:8, color:textSec, marginTop:1 }}>{m.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Bar chart */}
      <div style={{ background:cardBg, border:"1px solid #1f2937", borderRadius: compact?8:10, padding: compact?"8px 10px":"10px 12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: compact?7:10 }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:11, fontWeight:700, color:textPri }}>Weekly Revenue</span>
        </div>
        <div style={{ display:"flex", alignItems:"flex-end", gap: compact?4:6, height: compact?60:80 }}>
          {DAYS.map((day,i)=>{
            const h  = (REVENUE[i]/maxVal)*100;
            const eh = (EXPENSES[i]/maxVal)*100;
            const isToday = (i+1)===new Date().getDay();
            return (
              <div key={day} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, height:"100%", justifyContent:"flex-end" }}>
                <div style={{ width:"100%", position:"relative", height:"85%" }}>
                  <motion.div initial={{ height:0 }} animate={{ height:`${eh}%` }} transition={{ duration:0.6, delay:i*0.07, ease:[0.22,1,0.36,1] }}
                    style={{ position:"absolute", bottom:0, left:0, right:0, borderRadius:"3px 3px 0 0", background:"#374151" }} />
                  <motion.div initial={{ height:0 }} animate={{ height:`${h}%` }} transition={{ duration:0.7, delay:i*0.07, ease:[0.22,1,0.36,1] }}
                    style={{ position:"absolute", bottom:0, left:1, right:1, borderRadius:"3px 3px 0 0", background:isToday?"linear-gradient(180deg,#a5b4fc,#6366f1)":"#4f46e5", boxShadow:isToday?"0 0 10px #6366f155":"none" }} />
                </div>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?7:8, color:isToday?"#818cf8":textSec, fontWeight:isToday?700:400 }}>{day.slice(0,compact?1:3)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category breakdown */}
      <div style={{ background:cardBg, border:"1px solid #1f2937", borderRadius: compact?8:10, padding: compact?"8px 10px":"10px 12px" }}>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?9:11, fontWeight:700, color:textPri, display:"block", marginBottom: compact?5:8 }}>Top Categories</span>
        <div style={{ display:"flex", flexDirection:"column", gap: compact?5:7 }}>
          {categories.map((cat,i)=>(
            <motion.div key={cat.name} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?8:10, color:textSec }}>{cat.name}</span>
                <span style={{ fontFamily:"'Plus Jakarta Sans',monospace", fontSize: compact?8:10, fontWeight:700, color:textPri }}>{cat.pct}%</span>
              </div>
              <div style={{ height: compact?3:4, background:"#1f2937", borderRadius:2, overflow:"hidden" }}>
                <motion.div initial={{ width:0 }} animate={{ width:`${cat.pct}%` }} transition={{ duration:0.8, delay:0.2+i*0.1, ease:[0.22,1,0.36,1] }}
                  style={{ height:"100%", borderRadius:2, background:cat.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SCREENS CONFIG ─────────────────────────────────────── */
const SCREENS = [
  { id:"billing",   num:"01", tag:"POS Terminal", icon:ShoppingCart, headline:["Speed is","Everything."], body:"Punch in orders with a visual grid, customise items instantly, and fire KOTs in one tap.", stats:[{ label:"Orders / day", value:"148+" },{ label:"Order time", value:"0.3s" },{ label:"Uptime", value:"99.9%" }], color:"#818cf8", Screen:BillingScreen },
  { id:"inventory", num:"02", tag:"Inventory",    icon:Package,      headline:["Kitchen","Control."],     body:"Track every ingredient in real-time. Low-stock alerts fire before service starts.",        stats:[{ label:"Items tracked",value:"340"  },{ label:"Alert lead", value:"2 hrs"},{ label:"Accuracy", value:"99.2%"}], color:"#22c55e", Screen:InventoryScreen },
  { id:"analytics", num:"03", tag:"Analytics",    icon:BarChart2,    headline:["Profit","Vision."],       body:"See every rupee at a glance. Live revenue graphs, category breakdowns, and P&L — all in one view.", stats:[{ label:"Revenue lift",value:"+24%"  },{ label:"Reports",    value:"50+"  },{ label:"Export", value:"PDF/XLS"}], color:"#fb923c", Screen:AnalyticsScreen },
];

/* ─── POS TERMINAL MOCKUP ────────────────────────────────── */
function PosTerminal({ active, isMobile }) {
  const f = SCREENS[active];
  const { Screen } = f;
  const compact = isMobile;

  const termH = isMobile ? 360 : 500;
  const bezelP = isMobile ? 6 : 10;

  return (
    <div style={{ position:"relative", width:"100%", maxWidth: isMobile ? "100%" : 560, margin:"0 auto" }}>
      {/* Bezel */}
      <div style={{
        background:"#18181b",
        borderRadius: isMobile ? 16 : 22,
        padding: `${bezelP}px ${bezelP}px ${isMobile?16:24}px`,
        boxShadow:"0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}>
        {/* Top bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:`0 8px ${bezelP}px` }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#3f3f46" }} />
          <div style={{ width:36, height:3, borderRadius:2, background:"#3f3f46" }} />
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#3f3f46" }} />
        </div>

        {/* Screen */}
        <div style={{
          borderRadius: isMobile ? 10 : 14, overflow:"hidden",
          height:termH, position:"relative",
          boxShadow:"inset 0 0 0 1px rgba(0,0,0,0.5)",
        }}>
          {/* Sticky top chrome inside screen */}
          <div style={{ position:"absolute", top:0, left:0, right:0, zIndex:20, background:"#0d0d12", borderBottom:"1px solid #1f2937" }}>
            <PosStatusBar />
            {/* Module tabs */}
            <div style={{ display:"flex", padding:`3px ${isMobile?6:8}px 3px` }}>
              {SCREENS.map((s,i)=>{
                const Icon = s.icon;
                return (
                  <div key={s.id} style={{
                    flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:1,
                    padding: compact?"4px 2px":"5px 4px", borderRadius:5, cursor:"default",
                    borderBottom:`2px solid ${i===active ? s.color : "transparent"}`,
                    transition:"border-color 0.25s",
                  }}>
                    <Icon size={compact?9:11} color={i===active ? s.color:"#4b5563"} strokeWidth={2} />
                    <span style={{
                      fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: compact?7:8, fontWeight:700,
                      color:i===active ? s.color:"#4b5563", letterSpacing:"0.04em",
                      transition:"color 0.25s",
                    }}>{compact ? s.tag.split(" ")[0] : s.tag}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content area */}
          <div style={{ position:"absolute", top: compact?64:72, bottom:0, left:0, right:0, overflow:"hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={f.id}
                initial={{ opacity:0, y:10 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-10 }}
                transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
                style={{ height:"100%" }}
              >
                <Screen compact={compact} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stand */}
        <div style={{ display:"flex", justifyContent:"center", paddingTop: isMobile?8:12 }}>
          <div style={{ width:50, height:3, borderRadius:2, background:"linear-gradient(90deg,#3f3f46,#52525b,#3f3f46)" }} />
        </div>
      </div>

      {/* Glow */}
      <motion.div
        animate={{ background:f.color }}
        transition={{ duration:0.5 }}
        style={{ position:"absolute", bottom:-16, left:"15%", right:"15%", height:50, filter:"blur(36px)", opacity:0.18, borderRadius:"50%", pointerEvents:"none", zIndex:-1 }}
      />
    </div>
  );
}

/* ─── SECTION HEADING ────────────────────────────────────── */
function SectionHeading({ isDark, isMobile, t }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true });

  return (
    <div ref={ref} style={{ width:"100%", padding: isMobile?"60px 20px 36px":"100px 64px 64px", position:"relative", overflow:"hidden" }}>
      {/* Watermark */}
      <div aria-hidden style={{
        position:"absolute", top: isMobile?-6:-16, left: isMobile?16:48,
        fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900,
        fontSize: isMobile?"clamp(4rem,22vw,7rem)":"clamp(7rem,14vw,13rem)",
        letterSpacing:"-0.06em", lineHeight:1, userSelect:"none", pointerEvents:"none",
        color: isDark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)", whiteSpace:"nowrap",
      }}>PLATFORM</div>

      <motion.div initial={{ opacity:0, y:10 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.5 }}
        style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"6px 14px", borderRadius:9999, marginBottom: isMobile?16:24, border:`1px solid ${isDark?"rgba(93,232,160,0.25)":"rgba(22,160,80,0.25)"}`, background:isDark?"rgba(93,232,160,0.07)":"rgba(22,160,80,0.07)" }}>
        <Zap size={10} color={isDark?"rgba(93,232,160,0.9)":"rgba(22,160,80,0.9)"} strokeWidth={2.5} />
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.58rem", letterSpacing:"0.2em", textTransform:"uppercase", color:isDark?"rgba(93,232,160,0.85)":"rgba(22,160,80,0.9)" }}>Built for Restaurants & Cafes</span>
      </motion.div>

      <motion.h2 initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.6, delay:0.08 }}
        style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize: isMobile?"clamp(2rem,9vw,2.8rem)":"clamp(3rem,5.5vw,4.8rem)", letterSpacing:"-0.045em", lineHeight:1.05, margin:0, color:t.text }}>
        One complete POS.{" "}
        <span style={{ color:"transparent", backgroundImage: isDark?"linear-gradient(135deg,rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.85) 50%,rgba(255,255,255,0.5) 100%)":"linear-gradient(135deg,rgba(12,18,28,0.4) 0%,rgba(12,18,28,0.8) 50%,rgba(12,18,28,0.4) 100%)", WebkitBackgroundClip:"text", backgroundClip:"text" }}>
          Zero compromises.
        </span>
      </motion.h2>

      <motion.div initial={{ opacity:0, y:14 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.55, delay:0.18 }}
        style={{ display:"flex", flexDirection: isMobile?"column":"row", alignItems: isMobile?"flex-start":"flex-end", justifyContent:"space-between", gap: isMobile?20:40, width:"100%", marginTop: isMobile?14:22 }}>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:400, fontSize: isMobile?"0.88rem":"1.05rem", lineHeight:1.7, color:t.textMuted, margin:0, maxWidth:520 }}>
          From billing to inventory to deep analytics — every tool your restaurant needs to run faster, smarter, and more profitably.
        </p>
        <div style={{ display:"flex", gap: isMobile?20:32, flexShrink:0 }}>
          {[{ val:"3", unit:"Modules" },{ val:"50+", unit:"Reports" },{ val:"99.9%", unit:"Uptime" }].map(({ val, unit },i)=>(
            <motion.div key={unit} initial={{ opacity:0, y:8 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.4, delay:0.26+i*0.07 }}
              style={{ display:"flex", flexDirection:"column", gap:2 }}>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize: isMobile?"1.3rem":"1.7rem", letterSpacing:"-0.04em", color:t.text, lineHeight:1 }}>{val}</span>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.58rem", letterSpacing:"0.14em", textTransform:"uppercase", color:t.textFaint, lineHeight:1 }}>{unit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ scaleX:0, originX:0 }} animate={inView?{ scaleX:1 }:{}} transition={{ duration:0.8, delay:0.3 }}
        style={{ width:"100%", height:1, background:t.border, marginTop: isMobile?28:48 }} />
    </div>
  );
}

/* ─── MAIN EXPORT ────────────────────────────────────────── */
export default function PosPresentation() {
  const { isDark, t } = useTheme();
  const isMobile = useIsMobile(768);
  const [active, setActive] = useState(0);
  const f = SCREENS[active];

  // Auto-cycle every 9s
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p+1) % SCREENS.length), 9000);
    return () => clearInterval(id);
  }, []);

  // Swipe support on mobile
  const touchStartX = useRef(0);
  const handleTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = e => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 44) {
      if (dx>0) setActive(p => Math.min(SCREENS.length-1, p+1));
      else      setActive(p => Math.max(0, p-1));
    }
  };

  return (
    <div style={{ background:t.bg, transition:"background 0.4s" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap');`}</style>

      <SectionHeading isDark={isDark} isMobile={isMobile} t={t} />

      {/* ── Showcase ─────────────────────────────────── */}
      <div style={{
        maxWidth:1200, margin:"0 auto",
        padding: isMobile ? "0 20px 72px" : "0 64px 100px",
        display:"flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 32 : 64,
        alignItems: isMobile ? "stretch" : "center",
      }}>

        {/* ── LEFT: Info panel ─────────────────────── */}
        <div style={{ flex:"0 0 auto", maxWidth: isMobile ? "100%" : 380, width:"100%" }}>
          {/* Module tabs */}
          <div style={{ display:"flex", gap:6, marginBottom: isMobile?24:32, flexWrap:"wrap" }}>
            {SCREENS.map((s,i)=>{
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={()=>setActive(i)} style={{
                  display:"flex", alignItems:"center", gap:6,
                  padding: isMobile ? "7px 14px" : "8px 16px",
                  borderRadius:9999, border:"none", cursor:"pointer",
                  fontFamily:"'Plus Jakarta Sans',sans-serif",
                  fontSize: isMobile ? 11 : 12, fontWeight:700,
                  background: i===active ? s.color : (isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"),
                  color: i===active ? "#fff" : t.textMuted,
                  transition:"all 0.25s",
                  boxShadow: i===active ? `0 4px 18px ${s.color}44` : "none",
                  WebkitTapHighlightColor:"transparent",
                }}>
                  <Icon size={11} strokeWidth={2.2} />
                  {s.tag}
                </button>
              );
            })}
          </div>

          {/* Feature content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={f.id}
              initial={{ opacity:0, y:18, filter:"blur(6px)" }}
              animate={{ opacity:1, y:0, filter:"blur(0px)" }}
              exit={{ opacity:0, y:-12, filter:"blur(4px)" }}
              transition={{ duration:0.42, ease:[0.22,1,0.36,1] }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:f.color }}>{f.num} — {f.tag}</span>
                <div style={{ flex:1, height:1, background:isDark?"#1f1f1f":"#e5e7eb" }} />
              </div>

              <h3 style={{
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800,
                fontSize: isMobile ? "clamp(1.8rem,7vw,2.6rem)" : "clamp(2.4rem,4vw,3.6rem)",
                letterSpacing:"-0.045em", lineHeight:1.0, margin:"0 0 16px", color:t.text,
              }}>
                {f.headline[0]}{" "}
                <span style={{ color:t.textMuted, fontWeight:300, fontStyle:"italic" }}>{f.headline[1]}</span>
              </h3>

              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:400, fontSize: isMobile?"0.88rem":"0.93rem", lineHeight:1.72, color:t.textMuted, margin:"0 0 22px" }}>{f.body}</p>

              {/* Stats */}
              <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:24 }}>
                {f.stats.map((s,i)=>(
                  <motion.div key={s.label} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1+i*0.07 }}
                    style={{ display:"flex", flexDirection:"column", gap:2, padding:"8px 13px", borderRadius:10, background:isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)", border:`1px solid ${t.border}` }}>
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize: isMobile?"0.95rem":"1.1rem", letterSpacing:"-0.03em", color:t.text, lineHeight:1 }}>{s.value}</span>
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.58rem", letterSpacing:"0.1em", textTransform:"uppercase", color:t.textFaint, lineHeight:1 }}>{s.label}</span>
                  </motion.div>
                ))}
              </div>

              <button style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding: isMobile ? "11px 22px" : "12px 26px",
                borderRadius:9999, border:"none", cursor:"pointer",
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700,
                fontSize: isMobile ? "0.84rem" : "0.88rem",
                background: isDark?"#ffffff":"#0c121c",
                color: isDark?"#0c121c":"#ffffff",
                boxShadow: isDark?"0 8px 24px rgba(0,0,0,0.4)":"0 8px 20px rgba(0,0,0,0.12)",
                WebkitTapHighlightColor:"transparent",
              }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}
              >
                Explore Feature <ArrowUpRight size={14} strokeWidth={2.2} />
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div style={{ display:"flex", gap:6, marginTop:28 }}>
            {SCREENS.map((s,i)=>(
              <motion.div key={s.id} onClick={()=>setActive(i)}
                animate={{ width:i===active?28:7, background:i===active ? f.color : (isDark?"#333":"#d1d5db") }}
                transition={{ duration:0.3 }}
                style={{ height:4, borderRadius:2, cursor:"pointer" }}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Terminal ───────────────────────── */}
        <div
          style={{ flex:1, minWidth:0 }}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity:0, scale:0.97, y:14 }}
              animate={{ opacity:1, scale:1, y:0 }}
              exit={{ opacity:0, scale:0.97, y:-8 }}
              transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
            >
              <PosTerminal active={active} isMobile={isMobile} />
            </motion.div>
          </AnimatePresence>

          {/* Swipe hint — mobile only */}
          {isMobile && (
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
              style={{ display:"flex", justifyContent:"center", marginTop:14, gap:6, alignItems:"center" }}>
              <ArrowRight size={12} color={t.textFaint} style={{ transform:"rotate(180deg)" }} />
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"10px", color:t.textFaint, letterSpacing:"0.1em" }}>swipe to explore</span>
              <ArrowRight size={12} color={t.textFaint} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}