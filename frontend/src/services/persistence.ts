// Persistence behind a replaceable repository interface.
// PROPOSAL (fortu_arendusjuhis.md §5): progress/scores/answers eventually on a server,
// dictionary source in memory, unfinished questionnaire local + server.
// Prototype: everything (except dictionary source) is stored locally.
import { storage } from "@/src/utils/storage";

import type { FortuState } from "../state/types";

export interface ProgressRepository {
  load(): Promise<FortuState | null>;
  save(state: FortuState): Promise<void>;
  clear(): Promise<void>;
}

const KEY = "fortu.progress.v1";

export const localProgressRepository: ProgressRepository = {
  async load() {
    const raw = await storage.getItem(KEY, null);
    if (typeof raw !== "string") return null;
    try {
      const parsed = JSON.parse(raw) as FortuState;
      return parsed?.version === 1 ? parsed : null;
    } catch {
      return null;
    }
  },
  async save(state) {
    await storage.setItem(KEY, JSON.stringify(state));
  },
  async clear() {
    await storage.removeItem(KEY);
  },
};

/** Swap this for a server-backed implementation later. */
export const progressRepository: ProgressRepository = localProgressRepository;
