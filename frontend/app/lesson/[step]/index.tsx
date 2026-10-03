import { Href, Redirect, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { FortuSay, Mascot } from "@/src/components/Fortu";
import { Icon } from "@/src/components/Icon";
import { ScreenShell } from "@/src/components/ScreenShell";
import { ui } from "@/src/content/ui";
import { lessonById } from "@/src/content/lessons";
import { go, routes } from "@/src/navigation/routes";
import { lessonProgress } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { fonts, makeStyles, radius, spacing, type, useTheme } from "@/src/theme";

/** Lesson opening — dark because Fortu greets the learner here. */
export default function LessonOpening() {
  const styles = useStyles();
  const { colors } = useTheme();
  const { step } = useLocalSearchParams<{ step: string }>();
  const { state } = useFortu();
  const lesson = lessonById(String(step));

  if (!lesson) return <Redirect href={routes.journey as Href} />;
  if (!lesson.opening) return <Redirect href={routes.lessonSection(lesson.id, 0) as Href} />;

  const progress = lessonProgress(state, lesson.id);
  const resumeAt = progress.completedAt ? 0 : progress.sectionIdx;

  return (
    <ScreenShell
      testID="lesson-opening-screen"
      variant="dark"
      title={lesson.name}
      onBack={() => go(routes.topic(lesson.topicId))}
      nav="journey"
      footer={
        <PrimaryButton
          testID="lesson-opening-start-button"
          label={resumeAt > 0 ? ui.lesson.continue : ui.lesson.start}
          onPress={() => go(routes.lessonSection(lesson.id, resumeAt))}
        />
      }
    >
      <View style={styles.top}>
        <Mascot size={112} dark style={{ marginBottom: spacing.s2 }} />
        <Text style={styles.h1} testID="lesson-opening-title">
          {lesson.name}
        </Text>
        <Text style={styles.sub}>{lesson.opening.subtitle}</Text>
      </View>

      <FortuSay text={lesson.opening.greeting} dark style={{ paddingTop: spacing.s3 }} testID="lesson-opening-greeting" />

      <View style={styles.agenda} testID="lesson-opening-agenda">
        <Text style={styles.agendaTitle}>{ui.lesson.agendaTitle}</Text>
        {lesson.opening.agenda.map((item) => (
          <View key={item.label} style={styles.row}>
            <Icon name={item.icon} size={22} color={colors.gold} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  top: { paddingTop: spacing.s3, alignItems: "center" },
  h1: { ...type.h1, color: c.white, textAlign: "center", marginBottom: 8 },
  sub: { ...type.body, color: c.onDeepDim, textAlign: "center" },
  agenda: { marginTop: spacing.s3, gap: spacing.s1, padding: 20, borderRadius: radius.card, backgroundColor: c.deepSurface },
  agendaTitle: { fontFamily: fonts.semibold, fontSize: 15, color: c.gold },
  row: { flexDirection: "row", gap: 14, alignItems: "flex-start" },
  rowLabel: { ...type.label, color: c.white, marginBottom: 2 },
  rowText: { ...type.small, color: c.onDeepDim },
}));
