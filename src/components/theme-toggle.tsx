"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as Switch from "@radix-ui/react-switch";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const safeTheme = mounted ? resolvedTheme ?? theme : "light";

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-200/60 px-3 py-2 shadow-inner shadow-slate-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
      <Sun className="h-4 w-4 text-amber-400" />
      <Switch.Root
        aria-label="Toggle dark mode"
        checked={safeTheme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="relative h-7 w-12 rounded-full border border-slate-300 bg-slate-300 shadow-inner transition-colors data-[state=checked]:bg-sky-400 dark:border-slate-600 dark:bg-slate-700"
      >
        <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-5 dark:bg-slate-100" />
      </Switch.Root>
      <Moon className="h-4 w-4 text-sky-400" />
    </div>
  );
}
