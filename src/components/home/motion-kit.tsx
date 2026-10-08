"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Fragment, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* Scroll progress ---------------------------------------------------------- */

// Thin bar under the header showing how far down the page the reader is.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[linear-gradient(90deg,var(--wz-brand),#36c6ff,var(--wz-violet))]"
    />
  );
}

/* Split-word heading reveal -------------------------------------------------- */

export type WordSegment = { text: string; className?: string };

// Each word rises out of its own mask, staggered left to right.
export function SplitWords({
  segments,
  className,
  delay = 0,
  onMount = false,
}: {
  segments: readonly WordSegment[];
  className?: string;
  delay?: number;
  onMount?: boolean;
}) {
  const reduce = useSafeReducedMotion();
  const words = segments.flatMap((seg) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, className: seg.className })),
  );

  if (reduce) {
    return (
      <span className={className}>
        {segments.map((s, i) => (
          <span key={i} className={s.className}>
            {s.text}
            {i < segments.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  const trigger = onMount
    ? { initial: "hidden", animate: "show" }
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.6 },
      };

  return (
    <motion.span
      className={className}
      {...trigger}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
    >
      {words.map(({ w, className: wc }, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={cn("inline-block", wc)}
              variants={{
                hidden: { y: "105%", rotate: 4 },
                show: {
                  y: "0%",
                  rotate: 0,
                  transition: { duration: 0.8, ease },
                },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

/* Magnetic wrapper ----------------------------------------------------------- */

// Pulls its child a few pixels toward the cursor, springing back on leave.
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useSafeReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* 3D tilt card ------------------------------------------------------------------ */

// Tilts toward the cursor in 3D with a moving glare highlight.
export function TiltCard({
  children,
  className,
  innerClassName,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  max?: number;
}) {
  const reduce = useSafeReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 18,
  });
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(420px circle at ${gx} ${gy}, rgb(255 255 255 / 0.22), transparent 60%)`,
  );

  if (reduce) return <div className={className}>{children}</div>;

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  return (
    <div className={cn("[perspective:1100px]", className)}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("group/tilt relative h-full", innerClassName)}
      >
        {children}
        <motion.span
          aria-hidden="true"
          style={{ backgroundImage: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      </motion.div>
    </div>
  );
}

/* Scroll-linked tilt-up (product frame) ------------------------------------------- */

// Lays the element back in 3D and stands it upright as it scrolls into view.
export function ScrollTiltUp({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.25"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  if (reduce)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  return (
    <div ref={ref} className={cn("[perspective:1400px]", className)}>
      <motion.div style={{ rotateX, scale, y, transformOrigin: "50% 100%" }}>
        {children}
      </motion.div>
    </div>
  );
}

/* Parallax --------------------------------------------------------------------------- */

// Moves its child vertically at a different speed than the page scroll.
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  if (reduce)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
