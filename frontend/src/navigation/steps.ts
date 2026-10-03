// Step destinations. Lessons for "Raha psühholoogia" steps 1.1–1.5 live in src/content/lessons;
// steps without supplied material resolve to null so the caller can show a missing-content message.
import { START_TOPIC_ID, topicById } from "../content";
import { lessonById } from "../content/lessons";
import { isAbcDone, isAbcStarted, isSelfDone, isSelfStarted } from "../state/selectors";
import type { FortuState } from "../state/types";
import { routes } from "./routes";

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
  const lesson = step ? lessonById(step.id) : undefined;
  if (!lesson) return null;

  const progress = state.lessons[lesson.id];
  if (progress && !progress.completedAt && progress.sectionIdx > 0) {
    return routes.lessonSection(lesson.id, progress.sectionIdx);
  }
  return lesson.opening ? routes.lesson(lesson.id) : routes.lessonSection(lesson.id, 0);
}
