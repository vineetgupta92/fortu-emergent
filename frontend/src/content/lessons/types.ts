// Lesson data model. All copy comes from the supplied lesson documents (1.1–1.5);
// nothing here is invented beyond small wording fixes required by the no-praise rule.
import type { IconName } from "@/src/components/Icon";

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "list"; items: string[] }
  | { t: "quote"; items: string[] }
  | { t: "note"; text: string }
  | { t: "say"; text: string; rohk?: string };

export type ProfileQuestion = {
  id: string;
  text: string;
  options: { key: string; text: string }[];
};

export type QuizItem = {
  id: string;
  text: string;
  options: string[];
  /** Indexes of accepted answers. */
  correct: number[];
};

export type SortItem = { id: string; text: string };

export type Field = { id: string; label: string; placeholder?: string };

export type TextSection = { kind: "text"; id: string; title: string; blocks: Block[] };

/** No right answer — the reflection depends on which option letter dominates. */
export type ProfileSection = {
  kind: "profile";
  id: string;
  title: string;
  lead: string;
  questions: ProfileQuestion[];
  reflectionTitle: string;
  reflections: { key: string; text: string }[];
};

/** Knowledge check with correct answers, like Rahatarkuse ABC. */
export type QuizSection = {
  kind: "quiz";
  id: string;
  title: string;
  lead: string;
  items: QuizItem[];
  closing: string;
};

/** Tap-to-sort: the learner places each statement into one category. */
export type SortSection = {
  kind: "sort";
  id: string;
  title: string;
  lead: string;
  categories: string[];
  items: SortItem[];
  feedback: string;
  reflection?: string;
};

export type WriteSection = {
  kind: "write";
  id: string;
  title: string;
  blocks: Block[];
  fields: Field[];
  after: Block[];
};

export type PickSection = {
  kind: "pick";
  id: string;
  title: string;
  lead: string;
  options: { id: string; text: string; value: string }[];
  /** `{v}` is replaced by the chosen option's value. */
  feedbackTemplate: string;
};

export type GeneratorSection = {
  kind: "generator";
  id: string;
  title: string;
  lead: string;
  fields: Field[];
  scale: { id: string; label: string };
  /** `{fieldId}` placeholders are replaced by the user's text. */
  sentenceTemplate: string;
  after: Block[];
};

export type SummarySection = {
  kind: "summary";
  id: string;
  title: string;
  blocks: Block[];
  teaser: { title: string; text: string };
};

export type QuestionSection = ProfileSection | QuizSection | SortSection;

export type Section =
  | TextSection
  | ProfileSection
  | QuizSection
  | SortSection
  | WriteSection
  | PickSection
  | GeneratorSection
  | SummarySection;

export type Lesson = {
  /** Stable step id — matches the slug of the step name in fortu_sisu.json. */
  id: string;
  topicId: string;
  code: string;
  name: string;
  opening?: {
    subtitle: string;
    greeting: string;
    agenda: { icon: IconName; label: string; text: string }[];
  };
  sections: Section[];
};

/** One screen. Question sections are split so the learner answers one question per page. */
export type Page =
  | { kind: "section"; section: Exclude<Section, QuestionSection> }
  | { kind: "item"; section: QuestionSection; itemIndex: number }
  | { kind: "reveal"; section: QuestionSection };
