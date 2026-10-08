import { ArrowUpRight, CircleCheck } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/home/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/home/reveal";
import { contactLinks } from "@/data/home";
import { siteConfig } from "@/data/site";

const demoChecklist = [
  "A working CRM workspace with a shared inbox",
  "Real screens, not a slide deck",
  "No installation needed",
  "Contacts, segments, and broadcast campaigns to explore",
  "A visual automation builder you can click through",
  "Light and dark mode, right in the browser",
];

export function ContactCta() {
  return (
    <section
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-[#0b3d47] py-20 text-white sm:py-24 dark:bg-[#062a33]"
    >
      <div
        aria-hidden="true"
        className="wz-grid-bg absolute inset-0 -z-10 opacity-25 [--wz-shadow:255_255_255]"
      />
      <div
        aria-hidden="true"
        className="wz-aurora absolute -top-32 -left-24 -z-10 size-[460px] rounded-full bg-[#14c2c9]/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="wz-aurora absolute -right-24 -bottom-40 -z-10 size-[460px] rounded-full bg-[#7c5ce6]/25 blur-[120px] [animation-delay:-8s]"
      />

      <Container className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col">
          <Reveal>
            <p className="font-hand text-[28px] text-[#fbbf3c]">
              Let&apos;s get you started
            </p>
            <h2
              id="contact-title"
              className="mt-2 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.05] font-bold tracking-[-0.035em]"
            >
              See Wazely with
              <br />
              your own eyes
            </h2>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-white/80 sm:text-[17px]">
              Pick where you want to begin. Every link opens a real product or
              guide.
            </p>
          </Reveal>
          <Stagger className="mt-auto grid grid-cols-2 gap-4 pt-8">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              const external = link.href.startsWith("http");
              return (
                <StaggerItem key={link.label}>
                  <Link
                    href={link.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-full flex-col items-center gap-3 rounded-2xl bg-[#fff] px-4 py-6 text-center text-[#0f1d35] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)]"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-7 text-[#e8960a] transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6"
                      strokeWidth={1.7}
                    />
                    <span className="text-[15px] font-semibold">
                      {link.label}
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal delay={0.15} className="h-full">
          <div className="flex h-full flex-col rounded-[28px] bg-[#fff] p-8 text-[#0f1d35] shadow-[0_50px_100px_-40px_rgb(0_0_0/0.6)] sm:p-10">
            <p className="text-2xl font-bold tracking-tight">
              Start with a live demo
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#55627a]">
              The fastest way to judge software is to use it. Open the CRM demo
              in a new tab and look around.
            </p>
            <ul className="mt-6 space-y-3 border-t border-dashed border-[#e2e8ef] pt-6">
              {demoChecklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[15px] font-medium"
                >
                  <CircleCheck
                    aria-hidden="true"
                    className="size-5 shrink-0 text-[#0a9ba1]"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Link
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wz-shine flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#f2a20d] text-[15px] font-semibold text-[#2a1a00] transition-colors hover:bg-[#d98c04]"
              >
                Try the demo{" "}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
              <p className="mt-4 text-center text-sm text-[#55627a]">
                Prefer to read first?{" "}
                <Link
                  href="/knowledge-base"
                  className="font-semibold text-[#077a7f] underline-offset-4 hover:underline"
                >
                  Browse the knowledge base
                </Link>
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
