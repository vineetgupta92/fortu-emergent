import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { abcConcepts, ABC_CORRECT_INDEX, selfQuestions } from "../content";
import { progressRepository } from "../services/persistence";
import type { FortuState, FortuUser } from "./types";

const today = () => new Date().toISOString().slice(0, 10);
const now = () => new Date().toISOString();
const addDay = (days: string[]) => (days.includes(today()) ? days : [...days, today()]);

export const initialState: FortuState = {
  version: 1,
  user: null,
  self: { answers: selfQuestions.map(() => null), idx: 0, score: null, completedAt: null },
  abc: {
    answers: abcConcepts.map(() => null),
    checked: abcConcepts.map(() => false),
    idx: 0,
    score: null,
    completedAt: null,
  },
  topics: {},
  activeDays: [],
};

function merge(saved: FortuState): FortuState {
  return {
    ...initialState,
    ...saved,
    self: { ...initialState.self, ...saved.self },
    abc: { ...initialState.abc, ...saved.abc },
    topics: saved.topics ?? {},
    activeDays: saved.user ? addDay(saved.activeDays ?? []) : saved.activeDays ?? [],
  };
}

type Actions = {
  signIn: (user: FortuUser) => void;
  selectSelf: (i: number, option: number) => void;
  setSelfIdx: (i: number) => void;
  completeSelf: () => void;
  selectAbc: (i: number, answerIndex: number) => void;
  checkAbc: (i: number) => void;
  setAbcIdx: (i: number) => void;
  completeAbc: () => void;
  /** Session-only (memory): where the dictionary returns to */
  setDictFrom: (href: string) => void;
  resetAll: () => void;
};

type Store = { state: FortuState; hydrated: boolean; dictFrom: string | null } & Actions;

const Ctx = createContext<Store | null>(null);

export function FortuProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FortuState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [dictFrom, setDictFromState] = useState<string | null>(null);

  useEffect(() => {
    progressRepository.load().then((saved) => {
      if (saved) setState(merge(saved));
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) progressRepository.save(state);
  }, [state, hydrated]);

  const actions = useMemo<Actions>(
    () => ({
      signIn: (user) =>
        setState((s) => ({
          ...s,
          user: s.user && s.user.id === user.id ? { ...s.user, lastSeenAt: now() } : user,
          activeDays: addDay(s.activeDays),
        })),
      selectSelf: (i, option) =>
        setState((s) => {
          const answers = [...s.self.answers];
          answers[i] = option;
          return { ...s, self: { ...s.self, answers } };
        }),
      setSelfIdx: (i) => setState((s) => (s.self.idx === i ? s : { ...s, self: { ...s.self, idx: i } })),
      completeSelf: () =>
        setState((s) => ({
          ...s,
          self: {
            ...s.self,
            score: s.self.answers.reduce<number>((sum, a) => sum + (a ?? 0), 0),
            completedAt: s.self.completedAt ?? now(),
          },
        })),
      selectAbc: (i, answerIndex) =>
        setState((s) => {
          if (s.abc.checked[i]) return s; // locked after Kontrolli — no retries
          const answers = [...s.abc.answers];
          answers[i] = answerIndex;
          return { ...s, abc: { ...s.abc, answers } };
        }),
      checkAbc: (i) =>
        setState((s) => {
          if (s.abc.answers[i] === null || s.abc.checked[i]) return s;
          const checked = [...s.abc.checked];
          checked[i] = true;
          return { ...s, abc: { ...s.abc, checked } };
        }),
      setAbcIdx: (i) => setState((s) => (s.abc.idx === i ? s : { ...s, abc: { ...s.abc, idx: i } })),
      completeAbc: () =>
        setState((s) => ({
          ...s,
          abc: {
            ...s.abc,
            score: s.abc.answers.filter((a, i) => s.abc.checked[i] && a === ABC_CORRECT_INDEX).length,
            completedAt: s.abc.completedAt ?? now(),
          },
        })),
      setDictFrom: (href) => setDictFromState(href),
      resetAll: () => {
        setState(initialState);
        progressRepository.clear();
      },
    }),
    [],
  );

  const value = useMemo(() => ({ state, hydrated, dictFrom, ...actions }), [state, hydrated, dictFrom, actions]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFortu() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useFortu must be used inside FortuProvider");
  return v;
}
