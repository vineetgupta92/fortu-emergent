// Lesson registry for Teema 1 "Raha psühholoogia" (steps 1.1–1.5).
// Steps 6–7 have names in fortu_sisu.json but no supplied material yet.
import type { LessonProgress } from "@/src/state/types";

import { eesmarkideAbc } from "./eesmarkide-abc";
import { rahaJaMina } from "./raha-ja-mina";
import { rahaJaTunded } from "./raha-ja-tunded";
import { rahaJaUskumused } from "./raha-ja-uskumused";
import { rahaJaValikud } from "./raha-ja-valikud";
import type { Lesson, Page, QuestionSection, Section } from "./types";

export * from "./types";

export const lessons: Lesson[] = [rahaJaMina, rahaJaTunded, rahaJaUskumused, rahaJaValikud, eesmarkideAbc];

export const lessonById = (id: string) => lessons.find((l) => l.id === id);

/** `sectionId.itemId` — keys are flat so progress stays a simple map. */
export const itemKey = (sectionId: string, itemId: string) => `${sectionId}.${itemId}`;

const isQuestionSection = (s: Section): s is QuestionSection =>
  s.kind === "profile" || s.kind === "quiz" || s.kind === "sort";

export const questionItems = (s: QuestionSection) => (s.kind === "profile" ? s.questions : s.items);

/** Flattens a lesson into screens: one question per page, then its reflection/feedback. */
export function lessonPages(lesson: Lesson): Page[] {
  const pages: Page[] = [];
  for (const section of lesson.sections) {
    if (isQuestionSection(section)) {
      questionItems(section).forEach((_, itemIndex) => pages.push({ kind: "item", section, itemIndex }));
      pages.push({ kind: "reveal", section });
    } else {
      pages.push({ kind: "section", section });
    }
  }
  return pages;
}

export const pageChoiceKey = (page: Page) => {
  if (page.kind === "item") return itemKey(page.section.id, questionItems(page.section)[page.itemIndex].id);
  if (page.kind === "section" && page.section.kind === "pick") return itemKey(page.section.id, page.section.id);
  return null;
};

/** Which pages need an explicit "Kontrolli" before moving on (right/wrong checks only). */
export const pageNeedsCheck = (page: Page) => page.kind === "item" && page.section.kind === "quiz";

export function pageComplete(page: Page, p: LessonProgress) {
  const key = pageChoiceKey(page);
  return key === null ? true : p.choices[key] !== undefined;
}

/** Option keys (a–d) that the user picked most often; ties return every tied key. */
export function dominantKeys(picked: string[]) {
  const counts = new Map<string, number>();
  for (const k of picked) counts.set(k, (counts.get(k) ?? 0) + 1);
  const max = Math.max(0, ...counts.values());
  return [...counts.entries()].filter(([, n]) => n === max).map(([k]) => k);
}

export const fillTemplate = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "…");
