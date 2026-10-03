// Navigation layer. All moves use `replace` because back-navigation is rule-driven
// (fortu_arendusjuhis.md §6 "Tagasinool"), not history-driven.
import { Href, router } from "expo-router";

export type From = "flow" | "journey";

export const routes = {
  login: "/login",
  home: "/home",
  why: "/why",
  selfIntro: "/self/intro",
  selfInstructions: "/self/instructions",
  selfQ: (i: number) => `/self/q/${i}`,
  selfHint: (i: number) => `/self/hint/${i}`,
  selfResult: (from: From = "flow") => (from === "journey" ? "/self/result?from=journey" : "/self/result"),
  abcIntro: "/abc/intro",
  abcPack: (p: number) => `/abc/pack/${p}`,
  abcQ: (i: number) => `/abc/q/${i}`,
  abcDone: (from: From = "flow") => (from === "journey" ? "/abc/done?from=journey" : "/abc/done"),
  lesson: (step: string) => `/lesson/${step}`,
  lessonSection: (step: string, s: number) => `/lesson/${step}/${s}`,
  journey: "/journey",
  topic: (id: string) => `/topic/${id}`,
  dictionary: "/dictionary",
  profile: "/profile",
};

export function go(href: string) {
  router.replace(href as Href);
}

export const parseIndex = (v: string | string[] | undefined, max: number) => {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isInteger(n) && n >= 0 && n <= max ? n : null;
};
