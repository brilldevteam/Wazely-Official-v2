"use client";

import {
  MessagesSquare,
  Palette,
  Pause,
  Play,
  ReceiptText,
} from "lucide-react";
import { useState } from "react";

import { Container, SectionHeading } from "@/components/home/primitives";
import { highlights } from "@/data/home";
import type { Highlight } from "@/data/home";
import { cn } from "@/lib/utils";

const productMeta: Record<
  Highlight["product"],
  { name: string; icon: typeof Palette; tone: string }
> = {
  CRM: {
    name: "Wazely CRM",
    icon: MessagesSquare,
    tone: "bg-wz-brand-soft text-wz-brand",
  },
  ERP: {
    name: "Wazely ERP",
    icon: ReceiptText,
    tone: "bg-wz-violet-soft text-wz-violet",
  },
  Color: {
    name: "Wazely Color",
    icon: Palette,
    tone: "bg-wz-rose-soft text-wz-rose",
  },
};

// The page's only marquee. It shows what the products do, written as plain
// statements, until real customer testimonials are available.
export function HighlightsMarquee() {
  const [paused, setPaused] = useState(false);
  const loop = [...highlights, ...highlights];

  return (
    <section
      aria-labelledby="highlights-title"
      className="bg-wz-bg-2 overflow-hidden py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="highlights-title"
          pill="In practice"
          accent="What a day in Wazely"
          lead="looks like"
          accentFirst
        />
      </Container>

      <div className="wz-marquee-mask mt-12 overflow-hidden">
        <ul
          data-paused={paused}
          className="wz-marquee-track flex w-max gap-5 px-3 hover:[animation-play-state:paused]"
        >
          {loop.map((item, i) => {
            const meta = productMeta[item.product];
            const Icon = meta.icon;
            const featured = i % highlights.length === 1;
            return (
              <li
                key={`${item.text}-${i}`}
                aria-hidden={i >= highlights.length}
                className={cn(
                  "flex w-[340px] shrink-0 flex-col justify-between rounded-[22px] border p-6",
                  featured
                    ? "border-transparent bg-[linear-gradient(150deg,#0b8f95,#0b3d47)] text-white"
                    : "bg-wz-surface border-wz-line",
                )}
              >
                <p
                  className={cn(
                    "text-[15px] leading-relaxed",
                    featured ? "text-white/90" : "text-wz-ink",
                  )}
                >
                  {item.text}
                </p>
                <div
                  className={cn(
                    "mt-6 flex items-center gap-3 border-t border-dashed pt-4",
                    featured ? "border-white/25" : "border-wz-line",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-lg",
                      featured ? "bg-white/15 text-white" : meta.tone,
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      featured ? "text-white" : "text-wz-ink",
                    )}
                  >
                    {meta.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Play highlights" : "Pause highlights"}
          className="bg-wz-surface border-wz-line text-wz-ink hover:border-wz-brand hover:text-wz-brand grid size-11 place-items-center rounded-full border transition-colors"
        >
          {paused ? (
            <Play aria-hidden="true" className="size-4" />
          ) : (
            <Pause aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>
    </section>
  );
}
