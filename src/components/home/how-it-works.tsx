"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, CheckCheck, Layers } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container, SectionHeading } from "@/components/home/primitives";
import { Stagger, StaggerItem } from "@/components/home/reveal";
import { flowSteps } from "@/data/home";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function FlowConnector({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative hidden h-px w-20 transition-opacity duration-700 lg:block xl:w-28",
        active ? "opacity-100" : "opacity-25",
      )}
    >
      <span className="border-wz-brand/40 absolute inset-0 border-t-2 border-dashed" />
      {active
        ? [0, 0.8, 1.6].map((delay) => (
            <span
              key={delay}
              style={{
                animationDelay: `${delay}s`,
                ["--flow-distance" as string]: "100px",
              }}
              className="wz-flow-dot bg-wz-brand absolute -top-[4px] left-0 size-2 rounded-full shadow-[0_0_10px_2px_rgb(10_155_161/0.6)]"
            />
          ))
        : null}
    </div>
  );
}

// Timeline (ms after the scene scrolls into view) for the order story:
// 1 message arrives, 2 agent typing, 3 reply sent, 4 Wazely links,
// 5 invoice created, 6 payment stamped.
const timeline = [250, 900, 1900, 2500, 3100, 3900];

// Story of one order: a chat arrives, Wazely links it, an invoice is paid.
function FlowScene() {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const delays = reduce ? timeline.map(() => 0) : timeline;
    const timers = delays.map((ms, i) =>
      window.setTimeout(() => setStep(i + 1), ms),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduce]);

  const show = (at: number) => ({
    initial: false as const,
    animate:
      step >= at
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: 14, scale: 0.96 },
    transition: { duration: reduce ? 0 : 0.55, ease },
  });

  return (
    <div
      ref={ref}
      className="mt-14 flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-4"
    >
      <motion.div
        {...show(1)}
        className="wz-glass w-full max-w-[290px] rotate-[-2deg] rounded-3xl p-5"
      >
        <div className="flex items-center gap-3">
          <span className="relative grid size-9 place-items-center rounded-full bg-[#25d366] text-sm font-bold text-white">
            W
            {step >= 1 && step < 3 ? (
              <span className="wz-ping absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-[#10b981]" />
            ) : null}
          </span>
          <div>
            <p className="text-wz-ink text-sm font-semibold">
              New WhatsApp chat
            </p>
            <p className="text-wz-muted text-xs">Shared inbox</p>
          </div>
        </div>
        <motion.p
          {...show(1)}
          className="bg-wz-surface-2 text-wz-ink mt-4 rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed"
        >
          Hi, could you send a quotation for 40 units?
        </motion.p>
        <div className="relative mt-2 flex h-[42px] justify-end">
          <AnimatePresence mode="wait">
            {step === 2 ? (
              <motion.span
                key="typing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="wz-typing bg-wz-brand-soft flex items-center gap-1 rounded-2xl rounded-tr-sm px-4"
              >
                <span className="bg-wz-brand size-1.5 rounded-full" />
                <span className="bg-wz-brand size-1.5 rounded-full" />
                <span className="bg-wz-brand size-1.5 rounded-full" />
              </motion.span>
            ) : step >= 3 ? (
              <motion.p
                key="reply"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="bg-wz-brand text-wz-on-brand w-fit self-center rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm"
              >
                Sure, sending it now.
                <CheckCheck
                  aria-hidden="true"
                  className="ml-1.5 inline size-4"
                />
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      <FlowConnector active={step >= 3} />

      <motion.div
        {...show(4)}
        className="relative grid size-48 shrink-0 place-items-center"
      >
        <span
          aria-hidden="true"
          className="wz-spin absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--wz-brand),var(--wz-violet),var(--wz-amber),var(--wz-brand))] p-[3px] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2px))]"
        />
        {step >= 4 && !reduce ? (
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut", repeat: 2 }}
            className="border-wz-brand absolute inset-0 rounded-full border-2"
          />
        ) : null}
        <span className="bg-wz-surface grid size-40 place-items-center rounded-full shadow-[0_20px_50px_-20px_rgb(var(--wz-shadow)/0.5)]">
          <span className="text-center">
            <motion.span
              animate={step >= 4 && !reduce ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto grid size-12 place-items-center rounded-2xl bg-[linear-gradient(140deg,#14c2c9,#7c5ce6)] text-white shadow-lg"
            >
              <Layers aria-hidden="true" className="size-6" />
            </motion.span>
            <span className="text-wz-ink mt-3 block text-sm font-bold">
              Linked in Wazely
            </span>
            <span className="text-wz-muted block text-xs">CRM to ERP</span>
          </span>
        </span>
      </motion.div>

      <FlowConnector active={step >= 5} />

      <motion.div
        {...show(5)}
        className="bg-wz-surface border-wz-line relative w-full max-w-[300px] rotate-[2deg] rounded-3xl border p-5 shadow-[0_30px_60px_-35px_rgb(var(--wz-shadow)/0.6)]"
      >
        <div className="flex items-center justify-between">
          <p className="text-wz-ink text-sm font-bold">Sales invoice</p>
          <AnimatePresence mode="wait" initial={false}>
            {step >= 6 ? (
              <motion.span
                key="paid"
                initial={{ scale: 1.8, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 16 }}
                className="flex items-center gap-1.5 rounded-full bg-[rgb(16_185_129/0.12)] px-2.5 py-1 text-[11px] font-bold text-[#0f9f6e]"
              >
                <span className="wz-ping size-1.5 rounded-full bg-[#10b981]" />
                Paid
              </motion.span>
            ) : (
              <motion.span
                key="draft"
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-wz-surface-2 text-wz-muted rounded-full px-2.5 py-1 text-[11px] font-bold"
              >
                Awaiting payment
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <p className="text-wz-muted mt-1 text-xs">
          Converted from quotation, sample data
        </p>
        <div className="border-wz-line mt-4 space-y-2.5 border-t pt-4 text-sm">
          {[
            ["40 x Item", "QAR 9,600.00"],
            ["Delivery", "QAR 400.00"],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={false}
              animate={
                step >= 5 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
              }
              transition={{
                duration: reduce ? 0 : 0.45,
                delay: reduce ? 0 : 0.25 + i * 0.12,
                ease,
              }}
              className="flex justify-between"
            >
              <span className="text-wz-muted">{k}</span>
              <span className="text-wz-ink font-medium">{v}</span>
            </motion.div>
          ))}
          <div className="border-wz-line flex justify-between border-t pt-2.5">
            <span className="text-wz-ink font-semibold">Total</span>
            <span className="text-wz-brand font-bold">QAR 10,000.00</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-title"
      className="bg-wz-bg-2 relative overflow-hidden py-20 sm:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-wz-amber/10 absolute top-10 left-[8%] size-80 rounded-full blur-[90px]" />
        <div className="bg-wz-brand/12 absolute right-[6%] bottom-10 size-96 rounded-full blur-[100px]" />
      </div>
      <Container className="relative">
        <SectionHeading
          id="how-title"
          pill="How it works"
          lead="From first message to"
          accent="paid invoice"
        />

        <FlowScene />

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flowSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.title}>
                <div className="bg-wz-surface border-wz-line group hover:border-wz-brand/50 h-full rounded-[22px] border p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <span className="group-hover:text-wz-brand text-4xl leading-none font-extrabold tracking-tight text-transparent transition-colors duration-300 [-webkit-text-stroke:1.5px_var(--wz-brand)]">
                      0{i + 1}
                    </span>
                    <span className="bg-wz-brand-soft text-wz-brand grid size-10 place-items-center rounded-xl">
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                  <h3 className="text-wz-ink mt-5 text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-wz-muted mt-2 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="bg-wz-surface border-wz-line mt-6 flex flex-col items-start justify-between gap-4 rounded-[22px] border px-6 py-4 sm:flex-row sm:items-center sm:rounded-full">
          <p className="text-wz-muted text-[15px]">
            <span className="text-wz-ink font-semibold">
              Want to see it end to end?
            </span>{" "}
            Open both demos and follow one order through.
          </p>
          <div className="flex shrink-0 gap-3">
            <Link
              href={siteConfig.crmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-wz-brand text-wz-on-brand hover:bg-wz-brand-strong inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-sm font-semibold transition-colors"
            >
              CRM demo <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href={siteConfig.erpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-wz-brand text-wz-brand hover:bg-wz-brand-soft inline-flex h-10 items-center gap-1.5 rounded-full border-[1.5px] px-5 text-sm font-semibold transition-colors"
            >
              ERP demo <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
