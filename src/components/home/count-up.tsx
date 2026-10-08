"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

// Counts from 0 to `value` once the number scrolls into view. Writes straight
// to the DOM node so the animation never re-renders React.
export function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useSafeReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v).toLocaleString("en-US")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
}
