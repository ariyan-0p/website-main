import { 
  Zap, Layers, TrendingUp, Tablet, Smartphone, Monitor, Globe, 
  ShieldCheck, BarChart2, Clock, Printer, Layout, Wifi, FileText, 
  Cpu, Database, Lock, Share2
} from "lucide-react";

// --- ASSET IMPORTS ---
import dashboardImg  from "../assets/dashboard-monitor.png";
import analyticsImg  from "../assets/analytics-desktop.png";
import kioskImg      from "../assets/kiosk-tablet.png";
import billingImg    from "../assets/billing-laptop.png";
import mobileImg     from "../assets/mobile-app-phone.png";

export const products = {
  // 1. DASHBOARD
  "dashboard": {
    heroTitle: "Command Center",
    color: "from-slate-700 to-slate-900",
    slides: [
      {
        id: "live-view",
        title: "Real-Time Oversight",
        description: "A centralized master screen that tracks live sales, active tables, and staff performance across all your outlets in real-time.",
        longDescription: "Eliminate the need for constant phone calls to check on your restaurant. The Command Center gives you a live pulse of your business, aggregating data from every terminal and location into a single, actionable dashboard.",
        bgImage: dashboardImg,
        features: [
          { icon: Zap, label: "Live Updates" },
          { icon: BarChart2, label: "Sales Trends" },
          { icon: ShieldCheck, label: "Secure Access" },
          { icon: Clock, label: "24/7 Uptime" },
        ],
        specs: [
          "Refresh Rate: Real-time (<500ms)",
          "Compatibility: Web, Tablet, Mobile",
          "Data Retention: Unlimited History",
          "Export Formats: PDF, CSV, Excel"
        ],
        bottomFeatures: [
          { title: "Centralized Control", desc: "Manage menus, pricing, and taxes for multiple locations from one dashboard." },
          { title: "Staff Oversight", desc: "Monitor staff login times, voids, and discounts to prevent theft." },
          { title: "Inventory Sync", desc: "Watch stock levels deplete in real-time as orders are punched." }
        ]
      }
    ]
  },

  // 2. ANALYTICS
  "analytics": {
    heroTitle: "Deep Analytics",
    color: "from-purple-600 to-pink-500",
    slides: [
      {
        id: "growth-reports",
        title: "Visual Intelligence",
        description: "Turn data into decisions. Analyze peak hours, best-selling items, and profit margins with beautiful, easy-to-read graphs.",
        longDescription: "Stop guessing what works. Our analytics engine breaks down your sales by hour, item, category, and even waiter performance. Identify your most profitable dishes and cut the ones that are costing you money.",
        bgImage: analyticsImg,
        features: [
          { icon: BarChart2, label: "50+ Reports" },
          { icon: Zap, label: "Real-time Data" },
          { icon: FileText, label: "PDF / Excel" },
          { icon: Clock, label: "Date Filters" },
        ],
        specs: [
          "Report Types: Sales, Tax, Inventory, Staff",
          "Visualization: Bar, Line, Pie Charts",
          "Granularity: Hourly, Daily, Monthly",
          "Integration: Tally, Zoho Books"
        ],
        bottomFeatures: [
          { title: "Trend Analysis", desc: "Identify which dishes are trending up and which are dead stock." },
          { title: "Loss Prevention", desc: "Spot suspicious activity like excessive voids or cancellations." },
          { title: "Menu Engineering", desc: "Optimize your menu pricing based on actual sales data." }
        ]
      }
    ]
  },

  // 3. KIOSK
  "kiosk": {
    heroTitle: "Self-Serve Kiosk",
    color: "from-green-500 to-emerald-600",
    slides: [
      {
        id: "kiosk-ui",
        title: "Customer Autonomy",
        description: "An intuitive touch interface that lets customers browse the menu, customize orders, and pay instantly without waiting for staff.",
        longDescription: "Transform your waiting area into a profit center. The self-ordering kiosk allows customers to explore your menu at their own pace, prompting them with intelligent up-sells like extra cheese or drinks, increasing your average ticket size.",
        bgImage: kioskImg,
        features: [
          { icon: Zap, label: "Self-serve" },
          { icon: Clock, label: "60% Less Wait" },
          { icon: ShieldCheck, label: "Always On" },
          { icon: Layout, label: "Visual Menu" },
        ],
        specs: [
          "Display: Responsive Touch UI",
          "Payments: Integrated UPI / Card",
          "Language: Multi-language Support",
          "Hardware: Android/iPad Compatible"
        ],
        bottomFeatures: [
          { title: "Queue Busting", desc: "Keep the line moving during rush hours by offloading orders to kiosks." },
          { title: "Larger Ticket Sizes", desc: "Customers order 20% more when they can visually browse add-ons." },
          { title: "Labor Savings", desc: "Reassign front-of-house staff to more critical tasks like service." }
        ]
      }
    ]
  },

  // 4. POS (One-Tap Billing)
  "pos": {
    heroTitle: "Cloud POS",
    color: "from-amber-500 to-orange-600",
    slides: [
      {
        id: "billing-speed",
        title: "One-tap billing, anywhere",
        description: "Cloud-based POS that works on any device. GST-ready invoices, split bills, and instant KOT printing.",
        longDescription: "Built for speed and reliability. Whether the internet is up or down, your billing never stops. Our offline-first architecture ensures you can punch orders, print bills, and manage tables without interruption.",
        bgImage: billingImg,
        features: [
          { icon: Zap, label: "1-tap billing" },
          { icon: ShieldCheck, label: "GST Ready" },
          { icon: Layout, label: "Any Device" },
          { icon: Printer, label: "KOT Printing" },
        ],
        specs: [
          "Mode: Online & Offline Hybrid",
          "Printers: Thermal (USB/LAN/WiFi)",
          "OS: Windows, Mac, Android, iOS",
          "Shortcuts: Keyboard Support"
        ],
        bottomFeatures: [
          { title: "Offline Mode", desc: "Keep billing even when the internet goes down. Syncs automatically later." },
          { title: "Table Management", desc: "Visual table map to track occupancy and running orders." },
          { title: "Kitchen Sync", desc: "Orders sent from the POS appear instantly on the Kitchen Display System." }
        ]
      }
    ]
  },

  // 5. MOBILE APP
  "mobile": {
    heroTitle: "Owner App",
    color: "from-blue-600 to-indigo-600",
    slides: [
      {
        id: "mobile-control",
        title: "Manage Anywhere",
        description: "Your restaurant business in your pocket. Get push notifications for every voided bill, discount, or end-of-day report.",
        longDescription: "Freedom to leave the restaurant without losing control. The Owner App puts the power of your back-office into your pocket, giving you live alerts on critical events and allowing you to approve discounts remotely.",
        bgImage: mobileImg,
        features: [
          { icon: Smartphone, label: "iOS + Android" },
          { icon: Wifi, label: "Live Sync" },
          { icon: ShieldCheck, label: "Push Alerts" },
          { icon: Layers, label: "Staff Control" },
        ],
        specs: [
          "Platform: iOS & Android Store",
          "Notifications: Real-time Push",
          "Security: Biometric Login",
          "Permissions: Role-based View"
        ],
        bottomFeatures: [
          { title: "Remote Access", desc: "Check your total sales while you are on vacation." },
          { title: "Instant Alerts", desc: "Get notified immediately if a high-value bill is voided." },
          { title: "Multi-Store View", desc: "Switch between different outlets with a single tap." }
        ]
      }
    ]
  }
};