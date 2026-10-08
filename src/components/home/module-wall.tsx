import { MessagesSquare, Palette, ReceiptText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Container,
  SectionHeading,
  toneIcon,
  toneText,
} from "@/components/home/primitives";
import { RippleCell, SpotlightGrid } from "@/components/home/grid-fx";
import { Reveal } from "@/components/home/reveal";
import { modules } from "@/data/home";
import type { Tone } from "@/data/home";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type CenterCard = {
  name: string;
  href: string;
  icon: LucideIcon;
  tone: Tone;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

const centerCards: readonly CenterCard[] = [
  {
    name: "Wazely CRM",
    href: "/crm",
    icon: MessagesSquare,
    tone: "brand",
    src: "/screenshots/crm-dashboard.png",
    alt: "Wazely CRM dashboard preview",
    width: 1672,
    height: 940,
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    name: "Wazely ERP",
    href: "/erp",
    icon: ReceiptText,
    tone: "violet",
    src: "/screenshots/erp/dashboard.png",
    alt: "Wazely ERP dashboard preview",
    width: 1920,
    height: 950,
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    name: "Wazely Color",
    href: siteConfig.colorUrl,
    icon: Palette,
    tone: "rose",
    src: "/screenshots/color-hero-light.png",
    alt: "Wazely Color brand board preview",
    width: 1200,
    height: 630,
    className: "sm:col-span-2 lg:col-span-4 lg:row-span-2",
  },
];

// Desktop position of feature cell `i`: row 1 and row 6 hold 10 cells, rows
// 2-5 hold 6 cells (3 each side of the 4-column center block). The delay grows
// with distance from the grid center, so cells ripple outward.
function rippleDelay(i: number) {
  let row: number;
  let col: number;
  if (i < 10) {
    row = 0;
    col = i;
  } else if (i < 34) {
    const k = i - 10;
    row = 1 + Math.floor(k / 6);
    const c = k % 6;
    col = c < 3 ? c : c + 4;
  } else {
    row = 5;
    col = i - 34;
  }
  const distance = Math.hypot(col - 4.5, (row - 2.5) * 1.2);
  return 0.08 + distance * 0.06;
}

// 10 x 6 grid on desktop. The 4 x 4 center block holds the three products and
// the 44 feature cells auto-flow around it.
export function ModuleWall() {
  return (
    <section
      aria-labelledby="modules-title"
      className="overflow-hidden py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="modules-title"
          pill="Features"
          lead="Everything your business needs,"
          accent="in one suite"
          description="Conversations, operations, accounting, and brand tools that work together."
        />
      </Container>

      <Reveal className="page-shell mt-14">
        <SpotlightGrid className="lg:wz-edge-mask grid grid-cols-3 sm:grid-cols-5 lg:auto-rows-[104px] lg:grid-cols-10">
          <div className="col-span-3 mb-4 grid gap-3 sm:col-span-5 sm:grid-cols-2 lg:col-span-4 lg:col-start-4 lg:row-span-4 lg:row-start-2 lg:mb-0 lg:grid-cols-4 lg:grid-rows-4 lg:p-3">
            {centerCards.map((card) => {
              const Icon = card.icon;
              const external = card.href.startsWith("http");
              return (
                <Link
                  key={card.name}
                  href={card.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    "group bg-wz-surface border-wz-line relative flex min-h-[170px] flex-col justify-end overflow-hidden rounded-2xl border p-4 shadow-[0_24px_50px_-35px_rgb(var(--wz-shadow)/0.6)] transition-transform duration-300 hover:-translate-y-1",
                    card.className,
                  )}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={card.width}
                    height={card.height}
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="border-wz-line absolute top-4 left-1/2 h-auto w-[92%] -translate-x-1/2 rounded-lg border shadow-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]"
                  />
                  <div className="from-wz-surface via-wz-surface/90 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t to-transparent" />
                  <span className="relative flex items-center gap-2.5">
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-lg",
                        toneIcon[card.tone],
                      )}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className="text-wz-ink text-base font-bold">
                      {card.name}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <RippleCell
                key={`${m.label}-${i}`}
                delay={rippleDelay(i)}
                className={cn(
                  "group border-wz-line hover:bg-wz-surface flex flex-col items-center justify-center gap-2 border-r border-b px-2 py-5 text-center transition-[background-color,box-shadow] duration-300 hover:shadow-[0_10px_30px_-15px_rgb(var(--wz-shadow)/0.35)] lg:py-0",
                  i >= 12 && "hidden sm:flex",
                  i >= 20 && "sm:hidden lg:flex",
                )}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className={cn(
                    "size-6 transition-transform duration-300 group-hover:scale-110",
                    toneText[m.tone],
                  )}
                />
                <span className="text-wz-muted group-hover:text-wz-ink text-[13px] leading-tight transition-colors">
                  {m.label}
                </span>
              </RippleCell>
            );
          })}
        </SpotlightGrid>
      </Reveal>
    </section>
  );
}
