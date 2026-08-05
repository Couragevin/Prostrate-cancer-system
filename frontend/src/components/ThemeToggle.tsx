"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * True once running on the client. `useSyncExternalStore` returns the server
 * snapshot during SSR and the client snapshot after hydration, which avoids the
 * hydration mismatch without a setState-inside-useEffect cascade.
 */
const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  React.useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-muted dark:bg-card border border-border dark:border-border flex items-center justify-center animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-card dark:hover:bg-muted border border-border dark:border-border text-foreground dark:text-primary flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95"
      aria-label="Toggle theme mode"
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-primary animate-in spin-in-90 duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-primary-foreground animate-in spin-in-90 duration-300" />
      )}
    </button>
  );
}
