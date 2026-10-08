import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

import { HeroFloaters } from "@/components/home/hero-floaters";
import { HeroRotator } from "@/components/home/hero-rotator";
import { HeroSearch } from "@/components/home/hero-search";
import { SplitWords, TiltCard } from "@/components/home/motion-kit";
import { Container, toneIcon } from "@/components/home/primitives";
import { Reveal } from "@/components/home/reveal";
import { featuredProducts } from "@/data/home";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24"
    >
      {/* Backdrop: brand-tinted wash, light beams, engineering grid, aurora. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="from-wz-brand-soft via-wz-bg to-wz-bg-2 absolute inset-0 bg-gradient-to-b" />
        <div className="wz-grid-bg wz-fade-mask absolute inset-0" />
        <div className="absolute inset-x-0 top-0 mx-auto flex h-[560px] max-w-[1240px] justify-between px-6 opacity-60">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="from-wz-brand/12 h-full w-[52px] bg-gradient-to-b to-transparent"
            />
          ))}
        </div>
        <div className="wz-aurora bg-wz-brand/20 absolute -top-40 left-1/2 h-[520px] w-[780px] -translate-x-1/2 rounded-full blur-[120px]" />
        <div className="wz-aurora bg-wz-violet/15 absolute top-40 -right-40 h-[380px] w-[480px] rounded-full blur-[110px] [animation-delay:-6s]" />
      </div>

      <HeroFloaters />
      <Container className="relative">
        <div className="mx-auto max-w-[980px] text-center">
          <Reveal y={16}>
            <p className="font-hand text-wz-brand text-2xl sm:text-[28px]">
              Built for businesses across the GCC
            </p>
          </Reveal>
          <h1
            id="hero-title"
            className="text-wz-ink mt-3 text-[clamp(2.6rem,6.4vw,4.75rem)] leading-[1.04] font-extrabold tracking-[-0.045em]"
          >
            <SplitWords
              onMount
              delay={0.1}
              segments={[{ text: "Run your whole business" }]}
            />
            <br />
            <SplitWords
              onMount
              delay={0.4}
              segments={[{ text: "from" }]}
            />{" "}
            <HeroRotator />
          </h1>
          <Reveal delay={0.16}>
            <p className="text-wz-muted mx-auto mt-6 max-w-[56ch] text-[17px] leading-relaxed sm:text-lg">
              Wazely connects CRM, ERP, and brand tools so chats, invoices, and
              payments live on one record.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="relative mt-9">
            <HeroSearch />
            <div
              aria-hidden="true"
              className="absolute top-2 -right-4 hidden w-44 rotate-[-4deg] xl:block"
            >
              <svg
                viewBox="0 0 120 70"
                className="text-wz-muted ml-6 h-14 w-24"
                fill="none"
              >
                <path
                  d="M8 8c22 2 30 22 16 30-12 7-18-12 2-16 26-5 52 14 74 40"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M92 52l10 10 2-14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p className="font-hand text-wz-ink -mt-1 text-[26px] leading-tight">
                Everything in
                <br />
                one place
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={siteConfig.demoUrl}
                className="wz-shine group bg-wz-amber hover:bg-wz-amber-strong inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-[#2a1a00] shadow-[0_14px_30px_-14px_rgb(242_162_13/0.8)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgb(242_162_13/0.95)] active:translate-y-0 active:scale-[0.98]"
              >
                Try the demo{" "}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="#products"
                className="wz-shine group bg-wz-brand text-wz-on-brand hover:bg-wz-brand-strong inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold shadow-[0_14px_30px_-14px_rgb(10_155_161/0.8)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgb(10_155_161/0.95)] active:translate-y-0 active:scale-[0.98]"
              >
                See the products{" "}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-16 sm:mt-20">
          <TiltCard max={3}>
            <FeaturedCard />
          </TiltCard>
        </Reveal>
      </Container>
    </section>
  );
}

function FeaturedCard() {
  return (
    <div className="bg-wz-surface border-wz-line grid gap-3 rounded-[28px] border p-3 shadow-[0_40px_100px_-50px_rgb(var(--wz-shadow)/0.45)] lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-[linear-gradient(150deg,#0aa3aa,#077a7f_55%,#0b3d47)] p-8 text-center text-white">
        <div
          aria-hidden="true"
          className="wz-grid-bg absolute inset-0 -z-10 opacity-40 [--wz-shadow:255_255_255]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 -z-10 size-48 rounded-full bg-white/15 blur-2xl"
        />
        <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur">
          <ArrowUpRight aria-hidden="true" className="size-5" />
        </span>
        <h2 className="mt-5 text-2xl leading-tight font-bold tracking-tight">
          See it live before you decide
        </h2>
        <p className="mx-auto mt-3 max-w-[30ch] text-[15px] leading-relaxed text-white/85">
          Open a working Wazely workspace and click through real screens.
        </p>
        <Link
          href={siteConfig.crmUrl}
          className="mt-6 inline-flex h-11 items-center gap-1.5 rounded-full bg-[#fff] px-5 text-sm font-semibold text-[#0f1d35] transition-transform hover:-translate-y-0.5"
        >
          Open CRM demo <ChevronRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div className="p-4 sm:p-6">
        <div className="border-wz-line flex items-center justify-between border-b pb-4">
          <p className="text-wz-muted text-[13px] font-semibold tracking-wide uppercase">
            Our products
          </p>
          <Link
            href="#products"
            className="text-wz-brand hover:text-wz-brand-strong inline-flex items-center gap-1 text-[13px] font-semibold tracking-wide uppercase"
          >
            Compare all <ChevronRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ul className="mt-2 grid gap-2 sm:grid-cols-3">
          {featuredProducts.map((product) => {
            const Icon = product.icon;
            const external = product.href.startsWith("http");
            return (
              <li key={product.name}>
                <Link
                  href={product.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group hover:bg-wz-surface-2 flex h-full flex-col rounded-2xl p-4 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-xl",
                        toneIcon[product.tone],
                      )}
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className="text-wz-ink text-lg font-bold tracking-tight">
                      {product.name}
                    </span>
                  </span>
                  <span className="text-wz-muted mt-3 text-sm leading-relaxed">
                    {product.description}
                  </span>
                  <span className="mt-4 flex items-center justify-between">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase",
                        product.tier === "Free"
                          ? "bg-wz-amber-soft text-wz-amber-strong"
                          : "bg-wz-brand-soft text-wz-brand",
                      )}
                    >
                      {product.tier}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-wz-muted group-hover:text-wz-brand size-4 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
