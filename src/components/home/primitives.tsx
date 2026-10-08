import type { ReactNode } from "react";

import { SplitWords } from "@/components/home/motion-kit";
import { Reveal } from "@/components/home/reveal";
import type { Tone } from "@/data/home";
import { cn } from "@/lib/utils";

export const toneIcon: Record<Tone, string> = {
  brand: "bg-wz-brand-soft text-wz-brand",
  amber: "bg-wz-amber-soft text-wz-amber-strong",
  violet: "bg-wz-violet-soft text-wz-violet",
  rose: "bg-wz-rose-soft text-wz-rose",
  sky: "bg-wz-sky-soft text-wz-sky",
};

export const toneText: Record<Tone, string> = {
  brand: "text-wz-brand",
  amber: "text-wz-amber-strong",
  violet: "text-wz-violet",
  rose: "text-wz-rose",
  sky: "text-wz-sky",
};

export function SectionPill({ children }: { children: ReactNode }) {
  return (
    <span className="border-wz-brand/40 bg-wz-brand-soft text-wz-brand inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-semibold tracking-wide uppercase">
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  pill?: string;
  lead: string;
  accent: string;
  accentFirst?: boolean;
  description?: string;
  className?: string;
  id?: string;
};

// Two-tone section header: one part of the title is set in the brand color,
// the rest in ink, stacked over a short description.
export function SectionHeading({
  pill,
  lead,
  accent,
  accentFirst = false,
  description,
  className,
  id,
}: SectionHeadingProps) {
  const accentSeg = { text: accent, className: "text-wz-brand" };
  const leadSeg = { text: lead };
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      {pill ? (
        <Reveal y={10}>
          <SectionPill>{pill}</SectionPill>
        </Reveal>
      ) : null}
      <h2
        id={id}
        className="text-wz-ink mt-5 text-[clamp(2rem,4vw,2.9rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance"
      >
        <SplitWords
          segments={accentFirst ? [accentSeg, leadSeg] : [leadSeg, accentSeg]}
        />
      </h2>
      {description ? (
        <Reveal delay={0.25} y={14}>
          <p className="text-wz-muted mx-auto mt-4 max-w-[60ch] text-base leading-relaxed sm:text-[17px]">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("page-shell", className)}>{children}</div>;
}
