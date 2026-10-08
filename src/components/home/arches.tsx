"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Parallax } from "@/components/home/motion-kit";
import { Container } from "@/components/home/primitives";
import { arches } from "@/data/home";
import type { Arch } from "@/data/home";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

const archTone: Record<Arch["tone"], string> = {
  sky: "bg-[#a9d6f3]",
  brand: "bg-[#8fdccf]",
  amber: "bg-[#fcd893]",
};

// Rising heights, like a bar chart.
const archHeight = [
  "sm:min-h-[420px] lg:min-h-[440px]",
  "sm:min-h-[500px] lg:min-h-[540px]",
  "sm:min-h-[580px] lg:min-h-[640px]",
];

export function Arches() {
  const reduce = useSafeReducedMotion();
  return (
    <section
      aria-labelledby="arches-title"
      className="bg-wz-amber-soft relative overflow-hidden pt-20 sm:pt-24"
    >
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-start">
        <div className="lg:pt-6">
          <h2
            id="arches-title"
            className="text-wz-ink text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.05] font-bold tracking-[-0.035em]"
          >
            Fewer tools.
            <br />
            <span className="text-wz-brand">One suite.</span>
          </h2>
          <p className="text-wz-muted mt-4 max-w-[34ch] text-base leading-relaxed">
            Replace scattered phones, spreadsheets, and design files with three
            products that share one record.
          </p>
          <p
            aria-hidden="true"
            className="font-hand text-wz-muted mt-8 hidden -rotate-3 text-2xl lg:block"
          >
            here is what changes
            <svg
              viewBox="0 0 120 50"
              className="mt-1 ml-10 h-12 w-28"
              fill="none"
            >
              <path
                d="M6 6c4 26 30 34 58 26 18-5 34-2 48 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M104 32l9 10-13 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </p>
        </div>

        <div className="grid items-end gap-0 sm:grid-cols-3">
          {arches.map((arch, i) => (
            <motion.div
              key={arch.title}
              initial={reduce ? false : { opacity: 0, y: 120 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "relative flex min-h-[440px] flex-col overflow-hidden rounded-t-full px-6 pt-20 text-center text-[#0f1d35]",
                archTone[arch.tone],
                archHeight[i],
              )}
            >
              <p className="text-[clamp(2.2rem,3.6vw,3.2rem)] leading-none font-extrabold tracking-tight whitespace-nowrap">
                {arch.big}
              </p>
              <p className="mt-4 text-xl leading-tight font-semibold">
                {arch.title}
              </p>
              <p className="mt-2 text-sm text-[#0f1d35]/75">
                {arch.description}
              </p>
              <Parallax className="relative mt-auto h-40 pt-8" distance={22}>
                <Image
                  src={arch.src}
                  alt={arch.alt}
                  width={arch.width}
                  height={arch.height}
                  sizes="(max-width: 640px) 80vw, 300px"
                  className="absolute top-8 left-1/2 h-auto w-[150%] max-w-none -translate-x-[33%] rounded-t-xl shadow-[0_-10px_40px_-10px_rgb(15_29_53/0.35)] ring-1 ring-black/5"
                />
              </Parallax>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
