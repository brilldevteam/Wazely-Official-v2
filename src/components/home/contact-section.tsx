import {
  ArrowUpRight,
  AtSign,
  BookOpenCheck,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  ReceiptText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ContactForm } from "@/components/home/contact-form";
import {
  Container,
  SectionHeading,
  toneIcon,
} from "@/components/home/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/home/reveal";
import { SpotlightCard } from "@/components/home/spotlight-card";
import type { Tone } from "@/data/home";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type InfoCard = {
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
  tone: Tone;
  external?: boolean;
};

function buildCards(): InfoCard[] {
  const { email, whatsapp, phoneDisplay, location } = siteConfig.contact;
  const cards: InfoCard[] = [
    {
      label: "Email us",
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
      tone: "brand",
    },
  ];
  // Only shown once a real number is configured in siteConfig.contact.
  if (whatsapp) {
    cards.push({
      label: "WhatsApp",
      value: phoneDisplay || `+${whatsapp}`,
      href: `https://wa.me/${whatsapp}`,
      icon: MessageCircle,
      tone: "brand",
      external: true,
    });
  }
  cards.push({ label: "Office", value: location, icon: MapPin, tone: "amber" });
  return cards;
}

const selfServe = [
  { label: "Open the CRM demo", href: siteConfig.crmUrl, icon: MessagesSquare },
  { label: "Open the ERP demo", href: siteConfig.erpUrl, icon: ReceiptText },
  {
    label: "Browse the knowledge base",
    href: "/knowledge-base",
    icon: BookOpenCheck,
  },
] as const;

export function ContactSection() {
  const cards = buildCards();
  const socials = Object.entries(siteConfig.socialLinks);

  return (
    <section
      id="contact"
      aria-labelledby="contact-us-title"
      className="relative isolate scroll-mt-28 overflow-hidden py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="wz-grid-bg wz-fade-mask absolute inset-0" />
        <div className="wz-aurora bg-wz-brand/12 absolute -top-24 left-1/4 size-[420px] rounded-full blur-[110px]" />
        <div className="wz-aurora bg-wz-violet/10 absolute right-0 bottom-0 size-[380px] rounded-full blur-[110px] [animation-delay:-7s]" />
      </div>

      <Container>
        <SectionHeading
          id="contact-us-title"
          pill="Contact us"
          lead="Talk to the"
          accent="Wazely team"
          description="Questions about pricing, setup, or which product fits? Send a message and a real person will reply."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <Stagger className="flex flex-col gap-4">
            {cards.map((card) => {
              const Icon = card.icon;
              const inner = (
                <SpotlightCard className="bg-wz-surface border-wz-line group flex h-full items-center gap-5 rounded-[22px] border p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(var(--wz-shadow)/0.45)]">
                  <span
                    className={cn(
                      "grid size-13 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6",
                      toneIcon[card.tone],
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-6"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-wz-muted block text-sm">
                      {card.label}
                    </span>
                    <span className="text-wz-ink mt-0.5 block truncate text-lg font-bold tracking-tight">
                      {card.value}
                    </span>
                  </span>
                  {card.href ? (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-wz-muted group-hover:text-wz-brand size-5 shrink-0 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  ) : null}
                </SpotlightCard>
              );
              return (
                <StaggerItem key={card.label}>
                  {card.href ? (
                    <a
                      href={card.href}
                      {...(card.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="block rounded-[22px]"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </StaggerItem>
              );
            })}

            <StaggerItem className="flex-1">
              <div className="relative isolate flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-[22px] bg-[linear-gradient(150deg,#0aa3aa,#077a7f_55%,#0b3d47)] p-7 text-white">
                <div
                  aria-hidden="true"
                  className="wz-grid-bg absolute inset-0 -z-10 opacity-30 [--wz-shadow:255_255_255]"
                />
                <div
                  aria-hidden="true"
                  className="absolute -top-14 -right-14 -z-10 size-44 rounded-full bg-white/15 blur-2xl"
                />
                <div>
                  <p className="font-hand text-2xl text-[#fbbf3c]">
                    Prefer to look around first?
                  </p>
                  <p className="mt-1 text-xl leading-snug font-bold tracking-tight">
                    Try the products or read the guides, no message needed.
                  </p>
                  <ul className="mt-5 space-y-2">
                    {selfServe.map((item) => {
                      const Icon = item.icon;
                      const external = item.href.startsWith("http");
                      return (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            {...(external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="group/row flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur transition-colors hover:bg-white hover:text-[#0b3d47]"
                          >
                            <Icon
                              aria-hidden="true"
                              className="size-5 shrink-0"
                              strokeWidth={1.8}
                            />
                            <span className="flex-1 text-[15px] font-semibold">
                              {item.label}
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-300 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="mt-6">
                  <p className="mb-2 text-sm text-white/75">
                    Follow along for product updates
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {socials.map(([network, href]) => (
                      <li key={network}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold capitalize backdrop-blur transition-colors hover:bg-white hover:text-[#0b3d47]"
                        >
                          <AtSign aria-hidden="true" className="size-4" />
                          {network}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.1} className="h-full">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
