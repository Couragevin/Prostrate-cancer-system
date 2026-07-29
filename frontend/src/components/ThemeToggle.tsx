"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-[#073543] border border-slate-300 dark:border-white/10 flex items-center justify-center animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#073543] dark:hover:bg-[#0A3D4C] border border-slate-300 dark:border-white/20 text-slate-800 dark:text-[#00C9A7] flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95"
      aria-label="Toggle theme mode"
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[#00C9A7] animate-in spin-in-90 duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-[#03242E] animate-in spin-in-90 duration-300" />
      )}
    </button>
  );
}
