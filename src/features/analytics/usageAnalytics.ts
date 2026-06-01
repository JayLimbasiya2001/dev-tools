/**
 * Usage Analytics Architecture (frontend-only)
 *
 * All metrics are stored locally via Zustand persist (toolStore.usage).
 * This module defines the shape for future optional telemetry integration.
 */

export interface ToolAnalyticsEvent {
  type: 'tool_open' | 'tool_action' | 'tool_export' | 'tool_share';
  slug: string;
  timestamp: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface AggregatedToolStats {
  slug: string;
  opens: number;
  lastOpened: number;
  trendingScore: number;
}

/** Compute trending score: recency-weighted usage count */
export function computeTrendingScore(opens: number, lastOpened: number): number {
  const daysSince = (Date.now() - lastOpened) / (1000 * 60 * 60 * 24);
  const recencyDecay = Math.exp(-daysSince / 7);
  return opens * recencyDecay;
}

/** Hook point for future analytics providers (Plausible, GA4, etc.) */
export function trackEvent(event: ToolAnalyticsEvent): void {
  if (import.meta.env.DEV) {
    console.debug('[velomint-analytics]', event);
  }
  // Production: window.plausible?.(event.type, { props: { tool: event.slug } });
}
