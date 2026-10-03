// Renders a single lesson page. Question sections show one question per page
// (see lessonPages) so the learner never scrolls to find the next question.
import { Text, View } from "react-native";

import {
  dominantKeys,
  fillTemplate,
  itemKey,
  questionItems,
  type Lesson,
  type Page,
  type QuestionSection,
} from "../../content/lessons";
import { ui } from "../../content/ui";
import { lessonProgress } from "../../state/selectors";
import { useFortu } from "../../state/store";
import { fonts, makeStyles, radius, spacing, type } from "../../theme";
import { FortuSay } from "../Fortu";
import { OptionCard, OptionState } from "../OptionCard";
import { Blocks } from "./Blocks";
import { Scale, WriteField } from "./Inputs";

export function LessonPageBody({ lesson, page }: { lesson: Lesson; page: Page }) {
  if (page.kind === "item") return <ItemPage lesson={lesson} section={page.section} itemIndex={page.itemIndex} />;
  if (page.kind === "reveal") return <RevealPage lesson={lesson} section={page.section} />;
  return <SectionPage lesson={lesson} section={page.section} />;
}

function ItemPage({
  lesson,
  section,
  itemIndex,
}: {
  lesson: Lesson;
  section: QuestionSection;
  itemIndex: number;
}) {
  const styles = useStyles();
  const { state, setLessonChoice } = useFortu();
  const p = lessonProgress(state, lesson.id);
  const items = questionItems(section);
  const item = items[itemIndex];
  const key = itemKey(section.id, item.id);
  const picked = p.choices[key];
  const checked = section.kind === "quiz" && p.revealed.includes(key);

  const options =
    section.kind === "profile"
      ? section.questions[itemIndex].options.map((o) => o.text)
      : section.kind === "quiz"
        ? section.items[itemIndex].options
        : section.categories;

  const stateFor = (k: number): OptionState => {
    if (section.kind === "quiz" && checked) {
      if (section.items[itemIndex].correct.includes(k)) return "ok";
      return picked === k ? "no" : "dim";
    }
    return picked === k ? "picked" : "idle";
  };

  return (
    <View style={{ gap: spacing.s2 }}>
      <View style={{ gap: 8 }}>
        <Text style={styles.counter} testID="lesson-item-counter">
          {section.kind === "sort" ? ui.lesson.statementOf(itemIndex + 1, items.length) : ui.lesson.questionOf(itemIndex + 1, items.length)}
        </Text>
        <Text style={styles.question} testID="lesson-item-question">
          {item.text}
        </Text>
        <Text style={styles.lead}>{section.lead}</Text>
      </View>
      <View accessibilityRole="radiogroup" accessibilityLabel={item.text} style={{ gap: 10 }}>
        {options.map((o, k) => (
          <OptionCard
            key={k}
            testID={`lesson-option-${k}`}
            text={o}
            state={stateFor(k)}
            checked={picked === k}
            disabled={checked}
            onPress={() => setLessonChoice(lesson.id, key, k)}
          />
        ))}
      </View>
    </View>
  );
}

function RevealPage({ lesson, section }: { lesson: Lesson; section: QuestionSection }) {
  const styles = useStyles();
  const { state } = useFortu();
  const p = lessonProgress(state, lesson.id);
  const choice = (itemId: string) => p.choices[itemKey(section.id, itemId)];

  if (section.kind === "profile") {
    const picked = section.questions
      .map((q) => {
        const i = choice(q.id);
        return i === undefined ? null : q.options[i].key;
      })
      .filter((k): k is string => k !== null);
    const dominant = dominantKeys(picked);
    return (
      <View style={styles.card} testID="lesson-reflection">
        <Text style={styles.cardTitle}>{section.reflectionTitle}</Text>
        {section.reflections
          .filter((r) => dominant.includes(r.key))
          .map((r) => (
            <Text key={r.key} style={styles.cardText}>
              {r.text}
            </Text>
          ))}
      </View>
    );
  }

  if (section.kind === "quiz")
    return (
      <View style={styles.card} testID="lesson-quiz-closing">
        <Text style={styles.cardText}>{section.closing}</Text>
      </View>
    );

  return (
    <View style={{ gap: spacing.s2 }}>
      <View style={styles.card} testID="lesson-sort-feedback">
        <Text style={styles.cardText}>{section.feedback}</Text>
        {section.reflection ? <Text style={styles.cardText}>{section.reflection}</Text> : null}
      </View>
      <View style={{ gap: 12 }} testID="lesson-sort-recap">
        {section.items.map((item) => {
          const k = choice(item.id);
          return (
            <View key={item.id} style={styles.recap}>
              <Text style={styles.recapText}>{item.text}</Text>
              <Text style={styles.recapChoice}>
                {k === undefined ? "—" : ui.lesson.yourChoice(section.categories[k])}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function SectionPage({ lesson, section }: { lesson: Lesson; section: Exclude<Page["section"], QuestionSection> }) {
  const styles = useStyles();
  const { state, setLessonChoice, setLessonText } = useFortu();
  const p = lessonProgress(state, lesson.id);
  const text = (fieldId: string) => p.texts[itemKey(section.id, fieldId)] ?? "";
  const write = (fieldId: string, value: string) => setLessonText(lesson.id, itemKey(section.id, fieldId), value);

  if (section.kind === "text") return <Blocks blocks={section.blocks} testID={`lesson-blocks-${section.id}`} />;

  if (section.kind === "summary")
    return (
      <View style={{ gap: spacing.s2 }}>
        <Blocks blocks={section.blocks} dark testID={`lesson-blocks-${section.id}`} />
        <View style={styles.teaser} testID="lesson-teaser">
          <Text style={styles.teaserTitle}>{section.teaser.title}</Text>
          <Text style={styles.teaserText}>{section.teaser.text}</Text>
        </View>
      </View>
    );

  if (section.kind === "write")
    return (
      <View style={{ gap: spacing.s2 }}>
        <Blocks blocks={section.blocks} />
        <View style={{ gap: spacing.s1 }}>
          {section.fields.map((f) => (
            <WriteField
              key={f.id}
              testID={`lesson-field-${f.id}`}
              label={f.label}
              placeholder={f.placeholder}
              value={text(f.id)}
              onChange={(v) => write(f.id, v)}
            />
          ))}
        </View>
        <Text style={styles.hint}>{ui.lesson.savedLocally}</Text>
        {section.after.length ? <Blocks blocks={section.after} /> : null}
      </View>
    );

  if (section.kind === "pick") {
    const key = itemKey(section.id, section.id);
    const chosen = p.choices[key];
    return (
      <View style={{ gap: spacing.s2 }}>
        <Text style={styles.lead}>{section.lead}</Text>
        <View accessibilityRole="radiogroup" accessibilityLabel={section.lead} style={{ gap: 10 }}>
          {section.options.map((o, k) => (
            <OptionCard
              key={o.id}
              testID={`lesson-option-${k}`}
              text={o.text}
              state={chosen === k ? "picked" : "idle"}
              checked={chosen === k}
              onPress={() => setLessonChoice(lesson.id, key, k)}
            />
          ))}
        </View>
        {chosen !== undefined ? (
          <View style={styles.card} testID="lesson-pick-feedback">
            <Text style={styles.cardText}>
              {fillTemplate(section.feedbackTemplate, { v: section.options[chosen].value })}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  const values = Object.fromEntries(section.fields.map((f) => [f.id, text(f.id).trim()]));
  const ready = section.fields.every((f) => values[f.id].length > 0);
  return (
    <View style={{ gap: spacing.s2 }}>
      <Text style={styles.lead}>{section.lead}</Text>
      <View style={{ gap: spacing.s1 }}>
        {section.fields.map((f) => (
          <WriteField
            key={f.id}
            testID={`lesson-field-${f.id}`}
            label={f.label}
            placeholder={f.placeholder}
            value={text(f.id)}
            onChange={(v) => write(f.id, v)}
          />
        ))}
        <Scale
          testID="lesson-scale"
          label={section.scale.label}
          value={p.choices[itemKey(section.id, section.scale.id)]}
          onChange={(v) => setLessonChoice(lesson.id, itemKey(section.id, section.scale.id), v)}
        />
      </View>
      <Text style={styles.hint}>{ui.lesson.savedLocally}</Text>
      {ready ? (
        <View style={styles.sentence} testID="lesson-generated-sentence">
          <Text style={styles.sentenceTitle}>{ui.lesson.yourGoal}</Text>
          <FortuSay text={fillTemplate(section.sentenceTemplate, values)} />
        </View>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  counter: { ...type.caption, color: c.secondary },
  question: { ...type.h2, color: c.text },
  lead: { ...type.body, color: c.secondary },
  card: { gap: 10, padding: 20, borderRadius: radius.card, backgroundColor: c.fSurface },
  cardTitle: { ...type.label, color: c.primary },
  cardText: { ...type.body, color: c.text },
  recap: { gap: 4, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: c.border },
  recapText: { ...type.small, color: c.text },
  recapChoice: { ...type.caption, color: c.primary },
  hint: { ...type.small, color: c.secondary },
  sentence: { gap: 10, padding: 20, borderRadius: radius.card, borderWidth: 1.5, borderColor: c.primary, backgroundColor: c.white },
  sentenceTitle: { ...type.caption, color: c.secondary },
  teaser: { gap: 8, padding: 20, borderRadius: radius.card, backgroundColor: c.deepSurface },
  teaserTitle: { fontFamily: fonts.semibold, fontSize: 15, color: c.gold },
  teaserText: { ...type.body, color: c.white },
}));
