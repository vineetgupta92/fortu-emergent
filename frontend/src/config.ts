// Configurable product decisions that are UNRESOLVED in fortu_arendusjuhis.md.
// Keep them here so the product owner can change them without touching screens.
import type { FortuState } from "./state/types";

export const config = {
  /** Q1: what "Päevi koos Fortuga" counts is undecided. Prototype hard-codes 14. */
  daysWithFortu: {
    mode: "demo-fixed" as "demo-fixed" | "active-days" | "calendar-days",
    demoValue: 14,
  },
  /** Q8: is "Rahatarkuse algus" a topic? Source numbers it `null`; others 1–4. */
  topicNumbering: { showSourceNumbers: true },
  /** Q8: prototype counts "Rahatarkuse algus" in "Teemad läbitud: x / 5". */
  homeTopicsCounter: { includeStartTopic: true },
  /** Prototype switches Home to returning state once self-awareness is completed. */
  homeReturningAfter: "selfAwareness" as "selfAwareness" | "startTopic",
};

export function getDaysWithFortu(state: FortuState): number {
  switch (config.daysWithFortu.mode) {
    case "active-days":
      return state.activeDays.length;
    case "calendar-days": {
      if (!state.user) return 0;
      const ms = Date.now() - new Date(state.user.createdAt).getTime();
      return Math.max(1, Math.floor(ms / 86400000) + 1);
    }
    default:
      return config.daysWithFortu.demoValue;
  }
}
