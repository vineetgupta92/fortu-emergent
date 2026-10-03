export type AuthProviderId = "google" | "apple";

export type FortuUser = {
  id: string;
  provider: AuthProviderId;
  createdAt: string;
  lastSeenAt: string;
};

export type LessonProgress = {
  /** Last visited section index — used to resume the lesson */
  sectionIdx: number;
  /** Option indexes keyed by `sectionId.itemId` */
  choices: Record<string, number>;
  /** Free-text answers keyed by `sectionId.fieldId` */
  texts: Record<string, string>;
  /** Sections whose feedback/reflection has been revealed */
  revealed: string[];
  completedAt: string | null;
};

export type FortuState = {
  version: 1;
  user: FortuUser | null;
  /** Eneseteadlikkus — answers are option indexes 0–2 */
  self: {
    answers: (number | null)[];
    idx: number;
    score: number | null; // internal 0–10, never displayed
    completedAt: string | null;
  };
  /** Rahatarkuse ABC — answers are indexes into [correct, wrong1, wrong2] */
  abc: {
    answers: (number | null)[];
    checked: boolean[];
    idx: number;
    score: number | null; // 0–15
    completedAt: string | null;
  };
  /** Lesson progress for topic steps after the start topic, keyed by stable step id */
  lessons: Record<string, LessonProgress>;
  /** Recorded only; what "Päevi koos Fortuga" means is undecided (see config.ts) */
  activeDays: string[];
};
