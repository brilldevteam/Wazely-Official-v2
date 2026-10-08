import { ArrowUpRight, Bot } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { footerGroups } from "@/data/navigation";
import { siteConfig } from "@/data/site";

const aiPrompt = encodeURIComponent(
  "What is Wazely (wazely.io) and how can its CRM and ERP help a business in the GCC?",
);

const askAi = [
  { label: "ChatGPT", href: `https://chatgpt.com/?q=${aiPrompt}` },
  { label: "Claude", href: `https://claude.ai/new?q=${aiPrompt}` },
  { label: "Perplexity", href: `https://www.perplexity.ai/search?q=${aiPrompt}` },
] as const;

function isExternal(href: string) {
  return href.startsWith("http");
}

export function SiteFooter() {
  return (
    <footer className="bg-wz-bg-2 border-wz-line border-t">
      <div className="page-shell grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <BrandLogo />
          <p className="text-wz-muted mt-5 text-[15px] leading-relaxed">
            Wazely builds connected CRM and ERP software for customer
            relationships, finance, sales, and everyday operations across the
            GCC.
          </p>
          <p className="text-wz-ink mt-6 text-sm font-semibold">Ask AI about Wazely</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {askAi.map((ai) => (
              <li key={ai.label}>
                <Link
                  href={ai.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-wz-surface border-wz-line text-wz-ink hover:border-wz-brand hover:text-wz-brand inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors"
                >
                  <Bot aria-hidden="true" className="size-3.5" />
                  {ai.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-wz-ink text-base font-semibold">{group.title}</h2>
            <span aria-hidden="true" className="bg-wz-brand mt-2 block h-0.5 w-8 rounded-full" />
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(isExternal(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-wz-muted hover:text-wz-brand inline-flex items-center gap-1 text-[15px] transition-colors"
                  >
                    {link.label}
                    {isExternal(link.href) ? <ArrowUpRight aria-hidden="true" className="size-3.5" /> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-wz-line border-t">
        <div className="page-shell text-wz-muted flex flex-col items-center justify-between gap-4 py-6 text-sm sm:flex-row">
          <p>
            © {new Date().getFullYear()} <span className="text-wz-brand font-semibold">Wazely</span>. Built for businesses across the GCC.
          </p>
          <ul className="flex gap-5">
            {Object.entries(siteConfig.socialLinks).map(([network, href]) => (
              <li key={network}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-wz-brand font-medium capitalize transition-colors"
                >
                  {network}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
