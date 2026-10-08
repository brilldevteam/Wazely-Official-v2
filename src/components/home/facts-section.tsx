import { ArrowRight, Gift, MapPinned } from "lucide-react";
import Link from "next/link";

import { CountUp } from "@/components/home/count-up";
import {
  Container,
  SectionHeading,
  toneIcon,
} from "@/components/home/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/home/reveal";
import { facts } from "@/data/home";
import type { Tone } from "@/data/home";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const tileBg: Record<Tone, string> = {
  brand: "bg-wz-brand-soft",
  amber: "bg-wz-amber-soft",
  sky: "bg-wz-sky-soft",
  violet: "bg-wz-violet-soft",
  rose: "bg-wz-rose-soft",
};

export function FactsSection() {
  return (
    <section aria-labelledby="facts-title" className="pb-20 sm:pb-24">
      <Container>
        <SectionHeading
          id="facts-title"
          lead="Wazely"
          accent="at a glance"
          description="A small, focused suite built for how businesses in the region actually work."
        />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <StaggerItem key={fact.label}>
                <div
                  className={cn(
                    "group flex items-center gap-5 rounded-[22px] p-6 transition-transform duration-300 hover:-translate-y-1",
                    tileBg[fact.tone],
                  )}
                >
                  <span
                    className={cn(
                      "bg-wz-surface grid size-14 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[360deg]",
                      toneIcon[fact.tone],
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-6"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span>
                    <span className="text-wz-ink block text-4xl font-extrabold tracking-tight tabular-nums">
                      <CountUp value={fact.value} suffix={fact.suffix} />
                    </span>
                    <span className="text-wz-muted mt-1 block text-[15px] font-medium">
                      {fact.label}
                    </span>
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative isolate h-full overflow-hidden rounded-[26px] bg-[linear-gradient(140deg,#0aa3aa,#077a7f_50%,#0b3d47)] p-9 text-center text-white">
              <div
                aria-hidden="true"
                className="wz-grid-bg absolute inset-0 -z-10 opacity-30 [--wz-shadow:255_255_255]"
              />
              <p className="font-hand text-2xl text-white/90">
                Free for everyone
              </p>
              <span className="wz-float mx-auto mt-4 grid size-20 place-items-center rounded-3xl border border-white/25 bg-white/15 backdrop-blur">
                <Gift aria-hidden="true" className="size-9" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 text-3xl font-bold tracking-tight">
                Wazely Color
              </h3>
              <p className="mx-auto mt-2 max-w-[42ch] text-[15px] leading-relaxed text-white/85">
                The AI brand color toolkit costs nothing. Palettes, boards,
                contrast checks, and exports included.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative isolate h-full overflow-hidden rounded-[26px] border border-[#f2cf7a] bg-[linear-gradient(160deg,#fff8e6,#fde7ad)] p-9 text-center text-[#0f1d35] dark:border-[#6b5216] dark:bg-[linear-gradient(160deg,#2a210b,#3d2e0a)] dark:text-[#fff4d6]">
              <span className="wz-float mx-auto grid size-20 place-items-center rounded-3xl bg-[#f2a20d]/20 text-[#c47f00] [animation-delay:-2s] dark:text-[#fbbf3c]">
                <MapPinned
                  aria-hidden="true"
                  className="size-9"
                  strokeWidth={1.6}
                />
              </span>
              <h3 className="mt-6 text-3xl font-bold tracking-tight">
                Made for the GCC
              </h3>
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {siteConfig.targetMarkets.map((market) => (
                  <li
                    key={market}
                    className="rounded-full border border-[#e9c46a] bg-white/60 px-3 py-1 text-sm font-medium dark:border-[#6b5216] dark:bg-black/20"
                  >
                    {market}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link
            href="#products"
            className="bg-wz-brand text-wz-on-brand hover:bg-wz-brand-strong inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors"
          >
            Explore the Wazely suite{" "}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
