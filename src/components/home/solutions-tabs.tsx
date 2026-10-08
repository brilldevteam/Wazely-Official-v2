"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CircleCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Container, SectionHeading } from "@/components/home/primitives";
import { Reveal } from "@/components/home/reveal";
import { solutions } from "@/data/home";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

function linkProps(href: string) {
  return href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

export function SolutionsTabs() {
  const reduce = useSafeReducedMotion();
  const [index, setIndex] = useState(0);
  const solution = solutions[index];

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
      className="bg-wz-bg-2 scroll-mt-28 py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="solutions-title"
          pill="Solutions"
          accent="Pick the work"
          lead="Wazely takes off your plate"
          accentFirst
          description="Conversations, accounting, and brand work, each handled by a product built for it."
        />

        <Reveal className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Solutions"
            className="bg-wz-surface border-wz-line flex max-w-full gap-1 overflow-x-auto rounded-full border p-1.5 shadow-[0_10px_30px_-20px_rgb(var(--wz-shadow)/0.4)]"
          >
            {solutions.map((s, i) => {
              const Icon = s.icon;
              const selected = i === index;
              return (
                <button
                  key={s.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="solution-panel"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors sm:px-5",
                    selected
                      ? "text-wz-on-brand"
                      : "text-wz-muted hover:text-wz-ink",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="solution-pill"
                      className="bg-wz-brand absolute inset-0 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  ) : null}
                  <Icon aria-hidden="true" className="relative size-4" />
                  <span className="relative">{s.tab}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div id="solution-panel" role="tabpanel" className="mt-14">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={solution.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]"
            >
              <div>
                <p className="font-hand text-wz-brand text-[30px] leading-none">
                  {solution.script}
                </p>
                <h3 className="text-wz-ink mt-3 text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.1] font-bold tracking-[-0.03em]">
                  {solution.titleLead}
                  <br />
                  <span className="text-wz-brand">{solution.titleAccent}</span>
                </h3>
                <p className="text-wz-muted mt-4 max-w-[52ch] text-base leading-relaxed sm:text-[17px]">
                  {solution.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {solution.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-wz-ink flex items-center gap-3 text-[15px] font-medium"
                    >
                      <CircleCheck
                        aria-hidden="true"
                        className="text-wz-brand size-5 shrink-0"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="bg-wz-surface border-wz-line text-wz-ink mt-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
                  <Sparkles
                    aria-hidden="true"
                    className="text-wz-amber-strong size-4 shrink-0"
                  />
                  {solution.banner}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={solution.primary.href}
                    {...linkProps(solution.primary.href)}
                    className="bg-wz-amber hover:bg-wz-amber-strong inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-[#2a1a00] transition-colors"
                  >
                    {solution.primary.label}{" "}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                  <Link
                    href={solution.secondary.href}
                    {...linkProps(solution.secondary.href)}
                    className="border-wz-brand text-wz-brand hover:bg-wz-brand-soft inline-flex h-11 items-center gap-2 rounded-full border-[1.5px] px-5 text-sm font-semibold transition-colors"
                  >
                    {solution.secondary.label}{" "}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {solution.cards.map((card, i) => (
                  <motion.article
                    key={card.title}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.12 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      "group bg-wz-surface border-wz-line overflow-hidden rounded-[22px] border p-3 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgb(var(--wz-shadow)/0.5)]",
                      i === 1 && "sm:mt-10",
                    )}
                  >
                    <div className="bg-wz-brand-soft relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <span className="bg-wz-brand text-wz-on-brand absolute top-3 right-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-bold">
                        {solution.script}
                      </span>
                      <Image
                        src={card.src}
                        alt={card.alt}
                        width={card.width}
                        height={card.height}
                        sizes="(max-width: 640px) 90vw, 320px"
                        className="absolute top-10 left-6 h-auto w-[160%] max-w-none rounded-lg shadow-[0_20px_40px_-20px_rgb(var(--wz-shadow)/0.6)] transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="px-2 pt-4 pb-2">
                      <p className="text-wz-brand text-xs font-semibold">
                        {solution.tab}
                      </p>
                      <h4 className="text-wz-ink mt-1 text-lg font-bold tracking-tight">
                        {card.title}
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {card.tags.map((t) => (
                          <span
                            key={t}
                            className="bg-wz-surface-2 border-wz-line text-wz-muted rounded-full border px-2.5 py-0.5 text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
