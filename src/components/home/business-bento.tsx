import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TiltCard } from "@/components/home/motion-kit";
import { Container, SectionHeading } from "@/components/home/primitives";
import { Stagger, StaggerItem } from "@/components/home/reveal";
import { bentoTiles } from "@/data/home";
import type { BentoTile, Tone } from "@/data/home";
import { cn } from "@/lib/utils";

const toneBg: Record<Tone, string> = {
  brand: "bg-[linear-gradient(150deg,#0bb1b8_0%,#077a7f_50%,#06323b_100%)]",
  violet: "bg-[linear-gradient(150deg,#8b6cf0_0%,#5b3fc4_50%,#241a52_100%)]",
  rose: "bg-[linear-gradient(150deg,#ef6fae_0%,#b8357a_50%,#4a1532_100%)]",
  amber: "bg-[linear-gradient(150deg,#f7b632_0%,#c97c06_50%,#4d2c00_100%)]",
  sky: "bg-[linear-gradient(150deg,#4aa3f0_0%,#1f63b5_50%,#0c2547_100%)]",
};

const spanClass: Record<BentoTile["span"], string> = {
  hero: "md:col-span-2 md:row-span-2 min-h-[320px]",
  single: "min-h-[240px]",
  wide: "md:col-span-2 lg:col-span-4 min-h-[240px]",
};

// 6 tiles fill a 4x3 grid exactly: one 2x2 hero, four singles, one full row.
export function BusinessBento() {
  return (
    <section aria-labelledby="bento-title" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="bento-title"
          lead="Built for the way"
          accent="GCC businesses work"
          description="From trading houses to clinics, teams use Wazely for the work in front of them."
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:auto-rows-[240px] lg:grid-cols-4">
          {bentoTiles.map((tile) => (
            <StaggerItem key={tile.title} className={spanClass[tile.span]}>
              <TiltCard
                className="h-full"
                innerClassName="rounded-[24px]"
                max={tile.span === "single" ? 7 : 4}
              >
                <Link
                  href={tile.href}
                  className={cn(
                    "group relative isolate flex h-full overflow-hidden rounded-[24px] p-6 text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(var(--wz-shadow)/0.7)]",
                    toneBg[tile.tone],
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="wz-grid-bg absolute inset-0 -z-10 opacity-30 [--wz-shadow:255_255_255]"
                  />
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    width={tile.width}
                    height={tile.height}
                    sizes={
                      tile.span === "single"
                        ? "(max-width: 768px) 90vw, 300px"
                        : "(max-width: 768px) 90vw, 640px"
                    }
                    className={cn(
                      "absolute -z-10 h-auto max-w-none rounded-xl shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] ring-1 ring-white/20 transition-transform duration-700 ease-out group-hover:scale-[1.05]",
                      tile.span === "hero"
                        ? "top-[18%] left-[10%] w-[130%] group-hover:-translate-y-1"
                        : tile.span === "wide"
                          ? "top-[16%] left-[42%] w-[70%] group-hover:-translate-x-2"
                          : "top-[22%] left-[14%] w-[150%]",
                    )}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/5"
                  />
                  <span className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-white/90 text-[#0f1d35] transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                  <div
                    className={cn(
                      "mt-auto",
                      tile.span === "wide" && "lg:max-w-[38%]",
                    )}
                  >
                    <h3
                      className={cn(
                        "font-bold tracking-tight",
                        tile.span === "hero" ? "text-3xl" : "text-xl",
                      )}
                    >
                      {tile.title}
                    </h3>
                    <p className="mt-1.5 max-w-[34ch] text-sm leading-relaxed text-white/80">
                      {tile.description}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
