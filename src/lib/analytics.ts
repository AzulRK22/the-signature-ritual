import { track } from "@vercel/analytics/react";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: string, properties: EventProperties = {}) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    track(name, properties);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`Analytics event failed: ${name}`, error);
    }
  }
}
