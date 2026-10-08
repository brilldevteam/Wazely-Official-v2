import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { KnowledgeBaseMenu } from "@/components/layout/knowledge-base-menu";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { NavigationLink } from "@/components/layout/navigation-link";
import { ProductMenu } from "@/components/layout/product-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-40">
      <div className="wz-promo text-white">
        <div className="page-shell flex min-h-10 items-center justify-center gap-3 py-1.5 text-center text-[13px] font-medium sm:text-sm">
          <Sparkles
            aria-hidden="true"
            className="hidden size-4 shrink-0 sm:block"
          />
          <span>
            Wazely Color is free. Generate a brand palette in minutes.
          </span>
          <Link
            href={siteConfig.colorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fff] px-3 py-1 text-xs font-semibold text-[#0f1d35] transition-transform hover:-translate-y-px"
          >
            Try it <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>
      <header className="site-header border-b border-slate-200/80 bg-white/90 shadow-[0_4px_20px_-12px_rgba(15,29,53,0.18)] backdrop-blur-xl">
        <div className="page-shell flex h-[72px] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Wazely home"
            className="shrink-0 rounded-sm focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            <BrandLogo preload />
          </Link>
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-0.5 lg:flex"
          >
            <ProductMenu />
            {navigation.map((item) => (
              <NavigationLink
                key={item.label}
                item={item}
                className="hover:text-navy rounded-full px-3.5 py-2 text-[15px] font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
              />
            ))}
            <KnowledgeBaseMenu />
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Link
              href={siteConfig.demoUrl}
              className="wz-shine bg-wz-brand text-wz-on-brand hover:bg-wz-brand-strong hidden h-11 items-center gap-1.5 rounded-full px-5 text-sm font-semibold shadow-[0_10px_24px_-12px_rgb(10_155_161/0.8)] transition-[background-color,transform] hover:-translate-y-0.5 sm:inline-flex"
            >
              Try the demo{" "}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <MobileNavigation />
          </div>
        </div>
      </header>
    </div>
  );
}
