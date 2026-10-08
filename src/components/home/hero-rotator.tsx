"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { heroWords } from "@/data/home";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

// Rotating last words of the hero headline. The wrapper animates its width to
// fit each word (layout animation), so the centered line re-balances smoothly
// instead of leaving a gap sized for the longest word.
export function HeroRotator() {
  const reduce = useSafeReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % heroWords.length),
      3000,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <>
      <span className="sr-only">{heroWords[0]}</span>
      <motion.span
        aria-hidden="true"
        layout
        initial={reduce ? false : { opacity: 0, y: "40%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{
          layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          default: { duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative inline-flex overflow-hidden pb-[0.1em] align-bottom whitespace-nowrap"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={heroWords[index]}
            className="wz-text-gradient block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {heroWords[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
