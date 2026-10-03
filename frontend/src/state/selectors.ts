// Derived state. Journey unlock logic is DECIDED (fortu_arendusjuhis.md §6).
import { config } from "../config";
import { ABC_CORRECT_INDEX, START_TOPIC_ID, Topic, topics } from "../content";
import { routes } from "../navigation/routes";
import type { FortuState } from "./types";

export const isSelfDone = (s: FortuState) => !!s.self.completedAt;
export const isAbcDone = (s: FortuState) => !!s.abc.completedAt;
export const isAbcStarted = (s: FortuState) => s.abc.checked.some(Boolean);
export const isSelfStarted = (s: FortuState) => s.self.answers.some((a) => a !== null);
export const selfAnsweredCount = (s: FortuState) => s.self.answers.filter((a) => a !== null).length;
export const abcCheckedCount = (s: FortuState) => s.abc.checked.filter(Boolean).length;
export const abcScore = (s: FortuState) =>
  s.abc.score ?? s.abc.answers.filter((a, i) => s.abc.checked[i] && a === ABC_CORRECT_INDEX).length;
export const selfScore = (s: FortuState) => s.self.answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);

export function stepsDone(s: FortuState, topic: Topic): number {
  if (topic.id === START_TOPIC_ID) {
    if (!isSelfDone(s)) return 0;
    return isAbcDone(s) ? 2 : 1;
  }
  return s.topics[topic.id]?.stepsDone ?? 0;
}

/** Topic 1 complete only when BOTH self-awareness and ABC are complete. */
export function isTopicComplete(s: FortuState, topic: Topic) {
  if (topic.id === START_TOPIC_ID) return isSelfDone(s) && isAbcDone(s);
  return stepsDone(s, topic) >= topic.stepCount;
}

export function isTopicUnlocked(s: FortuState, topicIndex: number) {
  if (topicIndex === 0) return true;
  return isTopicComplete(s, topics[topicIndex - 1]);
}

export type TopicStatus = "locked" | "completed" | "inProgress" | "notStarted";

export function topicStatus(s: FortuState, topicIndex: number): TopicStatus {
  const t = topics[topicIndex];
  if (!isTopicUnlocked(s, topicIndex)) return "locked";
  if (isTopicComplete(s, t)) return "completed";
  return stepsDone(s, t) > 0 ? "inProgress" : "notStarted";
}

/** Where the actual unfinished step is. */
export function resumeHref(s: FortuState): string {
  if (!isSelfDone(s)) return isSelfStarted(s) ? routes.selfQ(s.self.idx) : routes.selfIntro;
  if (!isAbcDone(s)) return isAbcStarted(s) ? routes.abcQ(s.abc.idx) : routes.abcIntro;
  const idx = topics.findIndex((t, i) => i > 0 && isTopicUnlocked(s, i) && !isTopicComplete(s, t));
  return idx > 0 ? routes.topic(topics[idx].id) : routes.journey;
}

/** Data for Home's "Jätka teekonda" card. */
export function currentStepCard(s: FortuState) {
  const idx = topics.findIndex((t, i) => isTopicUnlocked(s, i) && !isTopicComplete(s, t));
  const topic = topics[idx >= 0 ? idx : topics.length - 1];
  const done = stepsDone(s, topic);
  return {
    topic,
    done,
    total: topic.stepCount,
    stepNo: Math.min(done + 1, topic.stepCount),
    stepName: topic.steps[done]?.name ?? null,
    href: resumeHref(s),
  };
}

export function topicsCompletedCounter(s: FortuState) {
  const counted = config.homeTopicsCounter.includeStartTopic ? topics : topics.slice(1);
  return { done: counted.filter((t) => isTopicComplete(s, t)).length, total: counted.length };
}

export function isReturningUser(s: FortuState) {
  return config.homeReturningAfter === "selfAwareness"
    ? isSelfDone(s)
    : isTopicComplete(s, topics[0]);
}

export function topicDisplayName(topic: Topic) {
  return topic.number !== null && config.topicNumbering.showSourceNumbers
    ? { label: `Teema ${topic.number}: ${topic.name}` }
    : { label: topic.name };
}
