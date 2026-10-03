import { Href, Redirect, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { AccessibilityInfo, Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { LessonPageBody } from "@/src/components/lesson/Page";
import { ScreenShell } from "@/src/components/ScreenShell";
import { ui } from "@/src/content/ui";
import {
  lessonById,
  lessonPages,
  pageChoiceKey,
  pageComplete,
  pageNeedsCheck,
} from "@/src/content/lessons";
import { go, parseIndex, routes } from "@/src/navigation/routes";
import { lessonProgress } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { makeStyles, spacing, type } from "@/src/theme";

/** One lesson page. Light = the learner reads or acts, dark = Fortu closes the step. */
export default function LessonPage() {
  const styles = useStyles();
  const { step, s: rawIndex } = useLocalSearchParams<{ step: string; s: string }>();
  const { state, setLessonSection, revealLessonSection, completeLesson } = useFortu();
  const lesson = lessonById(String(step));
  const pages = lesson ? lessonPages(lesson) : [];
  const index = parseIndex(rawIndex, Math.max(pages.length - 1, 0));

  useEffect(() => {
    if (lesson && index !== null) setLessonSection(lesson.id, index);
  }, [lesson, index, setLessonSection]);

  if (!lesson) return <Redirect href={routes.journey as Href} />;
  if (index === null) return <Redirect href={routes.lessonSection(lesson.id, 0) as Href} />;

  const page = pages[index];
  const section = page.section;
  const dark = page.kind === "section" && section.kind === "summary";
  const last = index === pages.length - 1;
  const progress = lessonProgress(state, lesson.id);
  const choiceKey = pageChoiceKey(page);
  const needsCheck = pageNeedsCheck(page);
  const checked = needsCheck && choiceKey ? progress.revealed.includes(choiceKey) : false;
  const answered = pageComplete(page, progress);

  const label = needsCheck && !checked ? ui.lesson.check : last ? ui.lesson.finish : ui.lesson.continue;

  const onPress = () => {
    if (needsCheck && !checked && choiceKey) {
      revealLessonSection(lesson.id, choiceKey);
      const correct =
        section.kind === "quiz" && page.kind === "item"
          ? section.items[page.itemIndex].correct.includes(progress.choices[choiceKey])
          : false;
      AccessibilityInfo.announceForAccessibility(correct ? ui.verdict.correct : ui.verdict.wrong);
      return;
    }
    if (last) {
      completeLesson(lesson.id);
      go(routes.topic(lesson.topicId));
      return;
    }
    go(routes.lessonSection(lesson.id, index + 1));
  };

  const onBack = () => {
    if (index > 0) go(routes.lessonSection(lesson.id, index - 1));
    else go(lesson.opening ? routes.lesson(lesson.id) : routes.topic(lesson.topicId));
  };

  return (
    <ScreenShell
      testID="lesson-page-screen"
      variant={dark ? "dark" : "light"}
      title={lesson.name}
      onBack={onBack}
      progress={{
        done: index + 1,
        total: pages.length,
        current: index + 1,
        label: ui.lesson.sectionProgress(index + 1, pages.length),
      }}
      nav="journey"
      keyboard={page.kind === "section" && (section.kind === "write" || section.kind === "generator")}
      footer={
        <PrimaryButton
          testID="lesson-page-button"
          label={label}
          dark={dark}
          disabled={!answered}
          onPress={onPress}
        />
      }
    >
      <View style={{ paddingTop: spacing.s3, gap: spacing.s2 }}>
        <Text style={[styles.title, dark && styles.titleDark]} testID="lesson-page-title">
          {section.title}
        </Text>
        <LessonPageBody lesson={lesson} page={page} />
      </View>
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  title: { ...type.h1, fontSize: 24, lineHeight: 32, color: c.text },
  titleDark: { color: c.white },
}));
