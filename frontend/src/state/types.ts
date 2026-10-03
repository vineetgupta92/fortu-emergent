export type AuthProviderId = "google" | "apple";

export type FortuUser = {
  id: string;
  provider: AuthProviderId;
  createdAt: string;
  lastSeenAt: string;
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
  /** Progress for topics after the start topic (t2Done etc.), keyed by stable topic id */
  topics: Record<string, { stepsDone: number; completedAt: string | null }>;
  /** Recorded only; what "Päevi koos Fortuga" means is undecided (see config.ts) */
  activeDays: string[];
};
