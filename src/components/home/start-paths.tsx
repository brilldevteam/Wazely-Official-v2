import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TiltCard } from "@/components/home/motion-kit";
import { Container, SectionHeading } from "@/components/home/primitives";
import { Stagger, StaggerItem } from "@/components/home/reveal";
import { paths } from "@/data/home";
import { cn } from "@/lib/utils";

export function StartPaths() {
  return (
    <section
      id="resources"
      aria-labelledby="paths-title"
      className="scroll-mt-28 py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="paths-title"
          pill="Get started"
          accent="Three ways"
          lead="to start today"
          accentFirst
          description="Click through a live demo, explore the ERP, or read the step-by-step guides."
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {paths.map((path) => {
            const external = path.href.startsWith("http");
            return (
              <StaggerItem key={path.title} className="h-full">
                <TiltCard
                  className="h-full"
                  innerClassName="rounded-[24px]"
                  max={5}
                >
                  <Link
                    href={path.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group bg-wz-surface border-wz-line hover:border-wz-brand/60 flex h-full flex-col overflow-hidden rounded-[24px] border transition-[transform,box-shadow,border-color] duration-400 hover:-translate-y-2.5 hover:shadow-[0_40px_70px_-40px_rgb(var(--wz-shadow)/0.6)]"
                  >
                    <div className="bg-wz-surface-2 relative aspect-[16/10] overflow-hidden">
                      <div
                        aria-hidden="true"
                        className="wz-grid-bg absolute inset-0"
                      />
                      <Image
                        src={path.src}
                        alt={path.alt}
                        width={path.width}
                        height={path.height}
                        sizes="(max-width: 768px) 90vw, 400px"
                        className="border-wz-line absolute top-8 left-8 h-auto w-[130%] max-w-none rounded-xl border shadow-[0_30px_50px_-25px_rgb(var(--wz-shadow)/0.6)] transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-center px-6 pt-7 pb-8 text-center">
                      <h3 className="text-wz-ink text-2xl font-bold tracking-tight">
                        {path.title}
                      </h3>
                      <p className="text-wz-muted mt-2.5 max-w-[32ch] text-[15px] leading-relaxed">
                        {path.description}
                      </p>
                      <span
                        className={cn(
                          "mt-6 inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-sm font-semibold transition-colors",
                          path.accent === "amber"
                            ? "bg-wz-amber group-hover:bg-wz-amber-strong text-[#2a1a00]"
                            : "bg-wz-brand text-wz-on-brand group-hover:bg-wz-brand-strong",
                        )}
                      >
                        {path.cta}{" "}
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
