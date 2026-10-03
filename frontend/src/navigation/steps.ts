// Step destinations. Lesson content for topics 2–5 is NOT supplied yet (fortu_disainijuhis.md §12);
// register lesson routes in `lessonRoutes` when the content exists.
import { START_TOPIC_ID, topicById } from "../content";
import { isAbcDone, isAbcStarted, isSelfDone, isSelfStarted } from "../state/selectors";
import type { FortuState } from "../state/types";
import { routes } from "./routes";

/** topicId -> stepId -> href */
export const lessonRoutes: Record<string, Record<string, string>> = {};

export function stepHref(state: FortuState, topicId: string, stepIndex: number): string | null {
  if (topicId === START_TOPIC_ID) {
    if (stepIndex === 0) {
      if (isSelfDone(state)) return routes.selfResult("journey");
      return isSelfStarted(state) ? routes.selfQ(state.self.idx) : routes.selfIntro;
    }
    if (isAbcDone(state)) return routes.abcDone("journey");
    return isAbcStarted(state) ? routes.abcQ(state.abc.idx) : routes.abcIntro;
  }
  const step = topicById(topicId)?.steps[stepIndex];
  return step ? lessonRoutes[topicId]?.[step.id] ?? null : null;
}
