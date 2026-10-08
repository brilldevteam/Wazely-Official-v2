"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { Container, SectionHeading } from "@/components/home/primitives";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useSafeReducedMotion();
  const baseId = useId();

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-28 py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="faq-title"
          pill="FAQ"
          lead="Frequently asked"
          accent="questions"
          description="Straight answers about the products. Still unsure? Open a demo and look for yourself."
        />
        <div className="mx-auto mt-12 grid max-w-[1120px] items-start gap-4 md:grid-cols-2">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <div
                key={item.question}
                className={cn(
                  "bg-wz-surface rounded-[18px] border transition-[border-color,box-shadow] duration-300",
                  isOpen
                    ? "border-wz-brand/50 shadow-[0_20px_40px_-30px_rgb(10_155_161/0.6)]"
                    : "border-wz-line",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="text-wz-ink flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold sm:text-base"
                  >
                    {item.question}
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300",
                        isOpen
                          ? "bg-wz-brand text-wz-on-brand rotate-45"
                          : "bg-wz-brand-soft text-wz-brand",
                      )}
                    >
                      <Plus aria-hidden="true" className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-wz-muted px-5 pb-5 text-[15px] leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
