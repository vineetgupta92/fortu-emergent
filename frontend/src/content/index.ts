// Central content layer. fortu_sisu.json is the canonical source of all Estonian copy.
// This module only reshapes it into typed structures with stable IDs.
import raw from "./fortu_sisu.json";

export type Segment = { text: string; em: boolean };

/** Splits a Fortu sentence into plain/emphasised parts using <em> tags or the `rohk` field. */
export function parseEmphasis(text: string, rohk?: string): Segment[] {
  if (text.includes("<em>")) {
    return text
      .split(/(<em>.*?<\/em>)/)
      .filter(Boolean)
      .map((part) =>
        part.startsWith("<em>")
          ? { text: part.replace(/<\/?em>/g, ""), em: true }
          : { text: part, em: false },
      );
  }
  if (rohk && text.includes(rohk)) {
    const at = text.indexOf(rohk);
    return [
      { text: text.slice(0, at), em: false },
      { text: rohk, em: true },
      { text: text.slice(at + rohk.length), em: false },
    ].filter((s) => s.text.length > 0);
  }
  return [{ text, em: false }];
}

export const plainText = (text: string) => text.replace(/<\/?em>/g, "");

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ---------- Eneseteadlikkus ----------
export type SelfQuestion = {
  id: string;
  topic: string;
  question: string;
  instruction: string;
  options: string[];
  hint: string;
};

export const selfQuestions: SelfQuestion[] = raw.eneseteadlikkus.kysimused.map((q, i) => ({
  id: `eneseteadlikkus-${i + 1}`,
  topic: q.teema,
  question: q.kysimus,
  instruction: q.juhis,
  options: q.valikud,
  hint: q.vihje,
}));

export const selfLevels = raw.eneseteadlikkus.tasemed.map((t) => ({
  max: t.kuni,
  lead: t.juhtlause,
  body: t.selgitus,
}));

export function levelForScore(score: number) {
  return selfLevels.find((l) => score <= l.max) ?? selfLevels[selfLevels.length - 1];
}

// ---------- Rahatarkuse ABC ----------
export type AbcConcept = {
  id: string;
  term: string;
  correct: string;
  /** [correct, wrong1, wrong2] — index 0 is always the correct answer */
  answers: string[];
  /** Fixed display order from `kuvamisjarjekord`. NEVER randomise. */
  displayOrder: number[];
};

export const abcConcepts: AbcConcept[] = raw.rahatarkuse_abc.moisted.map((m) => ({
  id: slugify(m.moiste),
  term: m.moiste,
  correct: m.oige,
  answers: [m.oige, ...m.valed],
  displayOrder: m.kuvamisjarjekord,
}));

export const ABC_CORRECT_INDEX = 0;

export const abcPacks = raw.rahatarkuse_abc.pakid.map((p, i) => ({
  id: `pakk-${i + 1}`,
  start: p.algab,
  label: p.silt,
  sentence: p.lause,
}));

export const packIndexStartingAt = (conceptIdx: number) =>
  abcPacks.findIndex((p) => p.start === conceptIdx);

// ---------- Teekond ----------
export type Step = { id: string; name: string };
export type Topic = {
  id: string;
  name: string;
  number: number | null;
  description: string;
  stepCount: number;
  /** Known step names. Empty when lesson material is not yet supplied. */
  steps: Step[];
};

const stepNamesByTopicIndex: string[][] = [raw.teema1_sammud, raw.teema2_sammud];

export const topics: Topic[] = raw.teekond.map((t, i) => ({
  id: slugify(t.nimi),
  name: t.nimi,
  number: t.number,
  description: t.kirjeldus,
  stepCount: t.samme,
  steps: (stepNamesByTopicIndex[i] ?? []).map((n) => ({ id: slugify(n), name: n })),
}));

export const START_TOPIC_ID = topics[0].id; // "rahatarkuse-algus"
export const topicById = (id: string) => topics.find((t) => t.id === id);

// ---------- Sõnaraamat ----------
const ET_ALPHABET = "abcdefghijklmnoprsšzžtuvwõäöüxy";

function etKey(word: string) {
  return Array.from(word.toLowerCase()).map((ch) => {
    const k = ET_ALPHABET.indexOf(ch);
    return k < 0 ? 99 : k;
  });
}

/** Estonian alphabetical comparison (õ, ä, ö, ü after v). */
export function compareEt(a: string, b: string) {
  const x = etKey(a);
  const y = etKey(b);
  for (let i = 0; i < Math.min(x.length, y.length); i++) {
    if (x[i] !== y[i]) return x[i] - y[i];
  }
  return x.length - y.length;
}

export type DictionaryEntry = { id: string; term: string; definition: string };

export const dictionaryEntries: DictionaryEntry[] = [
  ...abcConcepts.map((c) => ({ id: c.id, term: c.term, definition: c.correct })),
  ...raw.sonaraamat_lisaks.map((e) => ({ id: slugify(e.moiste), term: e.moiste, definition: e.seletus })),
].sort((a, b) => compareEt(a.term, b.term));

export function groupDictionary(entries: DictionaryEntry[]) {
  const groups: { letter: string; items: DictionaryEntry[] }[] = [];
  for (const e of entries) {
    const letter = e.term.charAt(0).toUpperCase();
    const last = groups[groups.length - 1];
    if (last && last.letter === letter) last.items.push(e);
    else groups.push({ letter, items: [e] });
  }
  return groups;
}

// ---------- Ekraanide tekstid ----------
export const screens = raw.ekraanid;
