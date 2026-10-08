"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { productNavigation } from "@/data/navigation";

export function ProductMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    detailsRef.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const menu = detailsRef.current;
      if (!menu?.open || menu.contains(event.target as Node)) return;
      menu.removeAttribute("open");
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || !detailsRef.current?.open) return;
      detailsRef.current.removeAttribute("open");
      detailsRef.current.querySelector("summary")?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeMenu() {
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <details ref={detailsRef} className="group relative">
      <summary className="hover:text-navy flex cursor-pointer list-none items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none">
        Products
        <ChevronDown
          aria-hidden="true"
          size={14}
          className="transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="product-menu absolute top-full left-1/2 mt-3 w-80 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_70px_-28px_rgba(15,29,53,.45)]">
        <Link
          href="/#products"
          onClick={closeMenu}
          className="text-teal block rounded-xl px-4 py-3 text-xs font-semibold tracking-[.12em] uppercase hover:bg-slate-50"
        >
          View all products
        </Link>
        {productNavigation.map((product) => (
          <Link
            key={product.href}
            href={product.href}
            onClick={closeMenu}
            className="block rounded-xl px-4 py-3 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
          >
            <span className="flex items-center gap-2">
              <span className="text-navy text-sm font-semibold">
                {product.label}
              </span>
              <span
                className={
                  product.tier === "Pro"
                    ? "rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-violet-500"
                    : "rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-semibold text-cyan-700 dark:text-cyan-300"
                }
              >
                {product.tier}
              </span>
            </span>
            <span className="mt-1 block text-xs leading-5 text-slate-500">
              {product.description}
            </span>
          </Link>
        ))}
      </div>
    </details>
  );
}
