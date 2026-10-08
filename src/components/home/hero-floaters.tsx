"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { CheckCircle2, FileCheck2, MessageCircle, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

type Floater = {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  meta: string;
  position: string;
  depth: number;
  delay: number;
  rotate: number;
};

// Example notifications that mirror real product events (sample content).
const floaters: readonly Floater[] = [
  {
    icon: MessageCircle,
    iconClass: "bg-[#25d366] text-white",
    title: "New WhatsApp lead",
    meta: "Assigned to Sales",
    position: "top-[16%] left-[3%]",
    depth: 28,
    delay: 0.9,
    rotate: -4,
  },
  {
    icon: FileCheck2,
    iconClass: "bg-wz-violet text-white",
    title: "Quotation accepted",
    meta: "Converted to invoice",
    position: "top-[50%] left-[2%]",
    depth: 44,
    delay: 1.1,
    rotate: 3,
  },
  {
    icon: CheckCircle2,
    iconClass: "bg-[#10b981] text-white",
    title: "Payment recorded",
    meta: "Balances updated",
    position: "top-[14%] right-[3%]",
    depth: 36,
    delay: 1.3,
    rotate: 4,
  },
  {
    icon: Palette,
    iconClass: "bg-wz-rose text-white",
    title: "Palette exported",
    meta: "Tailwind config",
    position: "top-[42%] right-[2%]",
    depth: 22,
    delay: 1.5,
    rotate: -3,
  },
];

function FloaterChip({
  f,
  mx,
  my,
}: {
  f: Floater;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useTransform(mx, (v) => v * f.depth);
  const y = useTransform(my, (v) => v * f.depth);
  const Icon = f.icon;
  return (
    <motion.div style={{ x, y }} className={cn("absolute", f.position)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: f.delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            rotate: `${f.rotate}deg`,
            animationDelay: `${-f.delay * 2}s`,
          }}
          className="wz-glass wz-float flex items-center gap-3 rounded-2xl py-2.5 pr-4 pl-2.5"
        >
          <span
            className={cn(
              "grid size-9 place-items-center rounded-xl",
              f.iconClass,
            )}
          >
            <Icon aria-hidden="true" className="size-4.5" />
          </span>
          <span className="text-left">
            <span className="text-wz-ink block text-[13px] font-semibold">
              {f.title}
            </span>
            <span className="text-wz-muted block text-[11px]">{f.meta}</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Floating product notifications around the hero (wide screens only). They
// drift with the pointer at different depths to give the hero some parallax.
export function HeroFloaters() {
  const reduce = useSafeReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden min-[1400px]:block"
    >
      {floaters.map((f) => (
        <FloaterChip key={f.title} f={f} mx={mx} my={my} />
      ))}
    </div>
  );
}
