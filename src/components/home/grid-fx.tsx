"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

// Grid wrapper with a soft brand-colored spotlight that follows the cursor.
// The pointer position is written to CSS variables, so it never re-renders.
export function SpotlightGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn("group/grid relative isolate", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/grid:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), var(--wz-brand-soft), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

// Cell that pops in with a delay, so a grid of them ripples outward.
export function RippleCell({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
}) {
  const reduce = useSafeReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}
