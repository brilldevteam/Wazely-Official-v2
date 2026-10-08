"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Framer's useReducedMotion reads the media query during the first client
// render, which can differ from the server render and break hydration. This
// version reports `false` until after hydration, then the real preference.
export function useSafeReducedMotion(): boolean {
  const prefers = useReducedMotion();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return hydrated ? Boolean(prefers) : false;
}
