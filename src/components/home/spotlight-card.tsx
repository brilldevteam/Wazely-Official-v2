"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

// Card whose border lights up under the cursor. Pointer position is written
// straight to CSS custom properties, so moving the mouse never re-renders.
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn("wz-spotlight", className)}
    >
      {children}
    </div>
  );
}
