"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

let toastQueue: ((toast: Omit<Toast, "id">) => void)[] = [];

export function toast(opts: Omit<Toast, "id">) {
  toastQueue.forEach((fn) => fn(opts));
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    const fn = (t: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...t, id }]);
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
    };
    toastQueue.push(fn);
    return () => { toastQueue = toastQueue.filter((f) => f !== fn); };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "rounded-xl border px-4 py-3 shadow-xl animate-fade-in",
            t.variant === "destructive"
              ? "border-red-500/30 bg-red-950/80 text-red-200"
              : "border-border bg-surface-2 text-text-primary"
          )}
        >
          <p className="text-sm font-semibold">{t.title}</p>
          {t.description && <p className="text-xs text-text-secondary mt-0.5">{t.description}</p>}
        </div>
      ))}
    </div>
  );
}
