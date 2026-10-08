"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { heroChips, searchIndex } from "@/data/home";
import type { SearchEntry } from "@/data/home";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/components/home/use-safe-reduced-motion";

const productTone: Record<SearchEntry["product"], string> = {
  CRM: "bg-wz-brand-soft text-wz-brand",
  ERP: "bg-wz-violet-soft text-wz-violet",
  Color: "bg-wz-rose-soft text-wz-rose",
};

function matches(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return searchIndex
    .filter((entry) => {
      const hay = `${entry.label} ${entry.product}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    })
    .slice(0, 6);
}

// Feature search: filters a local index of real Wazely features and routes
// to the product that covers the chosen one.
export function HeroSearch() {
  const router = useRouter();
  const reduce = useSafeReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const results = useMemo(() => matches(query), [query]);
  const showList = open && query.trim().length > 0;

  function go(entry: SearchEntry) {
    setOpen(false);
    if (entry.href.startsWith("http")) {
      window.open(entry.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(entry.href);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const pick = results[active];
      if (pick) go(pick);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  function pickChip(chip: string) {
    setQuery(chip);
    setActive(0);
    setOpen(true);
    inputRef.current?.focus();
  }

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <div className="relative">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const pick = results[active];
            if (pick) go(pick);
          }}
          className="bg-wz-surface border-wz-line focus-within:border-wz-brand/60 relative flex items-center gap-3 rounded-full border p-1.5 pl-5 shadow-[0_18px_50px_-24px_rgb(var(--wz-shadow)/0.35)] transition-[border-color,box-shadow] focus-within:shadow-[0_18px_50px_-20px_rgb(10_155_161/0.45)]"
        >
          <Search
            aria-hidden="true"
            className="text-wz-muted size-5 shrink-0"
          />
          <label htmlFor={`${listId}-input`} className="sr-only">
            Search Wazely features
          </label>
          <input
            ref={inputRef}
            id={`${listId}-input`}
            type="text"
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              showList && results[active] ? `${listId}-${active}` : undefined
            }
            autoComplete="off"
            value={query}
            placeholder="Search features, e.g. invoices, WhatsApp, palettes"
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => window.setTimeout(() => setOpen(false), 120)}
            onKeyDown={onKeyDown}
            className="text-wz-ink placeholder:text-wz-muted/80 min-w-0 flex-1 bg-transparent py-2.5 text-[15px] outline-none"
          />
          <button
            type="submit"
            className="bg-wz-brand text-wz-on-brand hover:bg-wz-brand-strong shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98]"
          >
            Search
          </button>
        </form>

        <AnimatePresence>
          {showList ? (
            <motion.ul
              id={listId}
              role="listbox"
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="wz-glass absolute inset-x-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-3xl p-2 text-left"
            >
              {results.length === 0 ? (
                <li className="text-wz-muted px-4 py-3 text-sm">
                  No feature matches &ldquo;{query}&rdquo;. Try invoices, inbox,
                  or palette.
                </li>
              ) : (
                results.map((entry, i) => (
                  <li
                    key={entry.label}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      go(entry);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-2.5 text-sm transition-colors",
                      i === active ? "bg-wz-brand-soft" : "",
                    )}
                  >
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-bold",
                        productTone[entry.product],
                      )}
                    >
                      {entry.product}
                    </span>
                    <span className="text-wz-ink flex-1 font-medium">
                      {entry.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-wz-muted size-4"
                    />
                  </li>
                ))
              )}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="text-wz-muted mr-1 text-sm">Popular:</span>
        {heroChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => pickChip(chip)}
            className="border-wz-line text-wz-muted hover:border-wz-brand hover:bg-wz-brand-soft hover:text-wz-brand bg-wz-surface/70 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors active:scale-[0.97]"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
