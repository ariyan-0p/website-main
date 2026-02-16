import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  t: {
    bg: string;
    bgSecondary: string;
    bgCard: string;
    bgCardHover: string;
    border: string;
    borderStrong: string;
    text: string;
    textMuted: string;
    textFaint: string;
    headerBg: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("renobill-theme") as Theme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("renobill-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  const isDark = theme === "dark";

  // All colour tokens in one place
  const t = isDark ? {
    bg:           "#060608",
    bgSecondary:  "#0b0c10",
    bgCard:       "rgba(255,255,255,0.03)",
    bgCardHover:  "rgba(255,255,255,0.06)",
    border:       "rgba(255,255,255,0.07)",
    borderStrong: "rgba(255,255,255,0.13)",
    text:         "rgba(228,238,255,0.95)",
    textMuted:    "rgba(165,185,215,0.55)",
    textFaint:    "rgba(145,165,200,0.35)",
    headerBg:     "rgba(6,6,8,",      // append opacity + ")"
  } : {
    bg:           "#ffffff",
    bgSecondary:  "#f5f6f8",
    bgCard:       "rgba(0,0,0,0.03)",
    bgCardHover:  "rgba(0,0,0,0.06)",
    border:       "rgba(0,0,0,0.08)",
    borderStrong: "rgba(0,0,0,0.15)",
    text:         "rgba(12,18,28,0.95)",
    textMuted:    "rgba(60,75,100,0.65)",
    textFaint:    "rgba(80,95,120,0.45)",
    headerBg:     "rgba(255,255,255,",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, t }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};