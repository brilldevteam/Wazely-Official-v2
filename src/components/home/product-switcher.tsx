"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ScrollTiltUp } from "@/components/home/motion-kit";
import { Container, SectionHeading } from "@/components/home/primitives";
import { Reveal } from "@/components/home/reveal";
import { showcaseProducts } from "@/data/home";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

const AUTOPLAY_MS = 3500;

export function ProductSwitcher() {
  const reduce = useSafeReducedMotion();
  const [productIndex, setProductIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const product = showcaseProducts[productIndex];
  const slides = product.slides;
  const current = slides[slide % slides.length];

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;
    const id = window.setInterval(
      () => setSlide((s) => (s + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, paused, slides.length, productIndex]);

  function selectProduct(i: number) {
    setProductIndex(i);
    setSlide(0);
  }

  function step(delta: number) {
    setSlide((s) => (s + delta + slides.length) % slides.length);
  }

  const external = product.href.startsWith("http");

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="scroll-mt-28 pb-20 sm:pb-24"
    >
      <Container>
        <SectionHeading
          id="products-title"
          pill="Explore the products"
          accent="Find the right product"
          lead="and see it live"
          accentFirst
        />

        <Reveal className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Wazely products"
            className="bg-wz-surface border-wz-line flex justify-center gap-0.5 rounded-full border p-1 shadow-[0_10px_30px_-20px_rgb(var(--wz-shadow)/0.4)] sm:gap-1 sm:p-1.5"
          >
            {showcaseProducts.map((p, i) => {
              const selected = i === productIndex;
              return (
                <button
                  key={p.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="product-preview"
                  onClick={() => selectProduct(i)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors sm:px-7 sm:py-2.5 sm:text-sm",
                    selected
                      ? "text-wz-on-brand"
                      : "text-wz-muted hover:text-wz-ink",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="product-pill"
                      className="bg-wz-brand absolute inset-0 rounded-full shadow-[0_8px_20px_-8px_rgb(10_155_161/0.7)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  ) : null}
                  <span className="relative">{p.name}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <ScrollTiltUp className="relative mx-auto mt-10 max-w-[1120px]">
          <div
            aria-hidden="true"
            className="bg-wz-brand/25 absolute inset-x-16 -top-6 bottom-10 -z-10 rounded-[40px] blur-[80px]"
          />
          <div
            id="product-preview"
            role="tabpanel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="bg-wz-surface border-wz-line overflow-hidden rounded-[22px] border shadow-[0_50px_120px_-60px_rgb(var(--wz-shadow)/0.6)]"
          >
            <div className="border-wz-line bg-wz-surface-2 relative flex h-11 items-center border-b px-4">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="bg-wz-surface border-wz-line text-wz-muted absolute left-1/2 flex h-7 w-[min(60%,320px)] -translate-x-1/2 items-center justify-center gap-1.5 rounded-lg border text-xs">
                <Lock aria-hidden="true" className="size-3" />
                {product.url}
              </span>
              {slides.length > 1 && !paused && !reduce ? (
                <motion.span
                  key={`${productIndex}-${slide}`}
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="bg-wz-brand absolute bottom-0 left-0 h-[2px] w-full origin-left"
                />
              ) : null}
            </div>

            <div className="bg-wz-surface-2 relative aspect-[1917/905] overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.src}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="(max-width: 1200px) 94vw, 1120px"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              {slides.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous screen"
                    onClick={() => step(-1)}
                    className="bg-wz-brand text-wz-on-brand absolute top-1/2 left-4 grid size-11 -translate-y-1/2 place-items-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft aria-hidden="true" className="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next screen"
                    onClick={() => step(1)}
                    className="bg-wz-brand text-wz-on-brand absolute top-1/2 right-4 grid size-11 -translate-y-1/2 place-items-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    <ChevronRight aria-hidden="true" className="size-5" />
                  </button>
                  <div className="wz-glass absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full px-4 py-2">
                    <span
                      className="text-wz-ink text-xs font-semibold"
                      aria-live="polite"
                    >
                      {current.caption}
                    </span>
                    <span className="flex gap-1.5">
                      {slides.map((s, i) => (
                        <button
                          key={s.src}
                          type="button"
                          aria-label={`Show ${s.caption}`}
                          onClick={() => setSlide(i)}
                          className={cn(
                            "h-1.5 rounded-full transition-all",
                            i === slide % slides.length
                              ? "bg-wz-brand w-5"
                              : "bg-wz-muted/40 w-1.5",
                          )}
                        />
                      ))}
                    </span>
                  </div>
                </>
              ) : null}
            </div>

            <div className="border-wz-line flex flex-col gap-4 border-t px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-wz-ink text-xl font-bold tracking-tight">
                  {product.name}
                </p>
                <p className="text-wz-muted mt-1 text-[15px]">
                  {product.tagline}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href={product.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wz-shine bg-wz-amber hover:bg-wz-amber-strong inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-[#2a1a00] transition-colors"
                >
                  Open the app{" "}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
                {external ? null : (
                  <Link
                    href={product.href}
                    className="bg-wz-brand text-wz-on-brand hover:bg-wz-brand-strong inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors"
                  >
                    Product details{" "}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </ScrollTiltUp>
      </Container>
    </section>
  );
}
