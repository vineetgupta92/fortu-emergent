import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { Icon, stepIcons } from "@/src/components/Icon";
import { ScreenShell } from "@/src/components/ScreenShell";
import { StatusMessage } from "@/src/components/StatusMessage";
import { useToast } from "@/src/components/Toast";
import { screens, topicById, topics } from "@/src/content";
import { systemCopy } from "@/src/content/systemCopy";
import { ui } from "@/src/content/ui";
import { go } from "@/src/navigation/routes";
import { stepHref } from "@/src/navigation/steps";
import { isLessonDone, isTopicUnlocked, stepsDone } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { makeStyles, spacing, type, useTheme } from "@/src/theme";

const plan = screens.teema_kava;

/** Topic plan — header is the topic name without number. */
export default function TopicPlan() {
  const styles = useStyles();
  const { colors } = useTheme();
  const toast = useToast();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state } = useFortu();
  const topic = topicById(String(id));
  const index = topic ? topics.indexOf(topic) : -1;

  if (!topic) {
    return (
      <ScreenShell testID="topic-screen" title={ui.titles.journey} nav="journey">
        <View style={{ paddingTop: spacing.s3 }}>
          <StatusMessage testID="topic-not-found" message={systemCopy.contentLoadFailed} />
        </View>
      </ScreenShell>
    );
  }

  const unlocked = isTopicUnlocked(state, index);
  const hasSteps = topic.steps.length > 0;

  const onStart = () => {
    const href = stepHref(state, topic.id, Math.min(stepsDone(state, topic), topic.steps.length - 1));
    if (href) go(href);
    else toast(systemCopy.stepContentMissing);
  };

  const onSelectStep = (stepIndex: number) => {
    const href = stepHref(state, topic.id, stepIndex);
    if (href) go(href);
    else toast(systemCopy.stepContentMissing);
  };

  return (
    <ScreenShell
      testID="topic-screen"
      title={topic.name}
      nav="journey"
      footer={
        unlocked && hasSteps ? <PrimaryButton testID="topic-start-button" label={plan.nupp} onPress={onStart} /> : undefined
      }
    >
      <View style={{ paddingTop: spacing.s3 }}>
        {!unlocked ? (
          <StatusMessage
            testID="topic-locked"
            icon="lock"
            message={index === 1 ? screens.lukupohjus.teema1 : screens.lukupohjus.muud}
          />
        ) : hasSteps ? (
          <Text style={styles.lead}>{plan.abitekst}</Text>
        ) : (
          <StatusMessage testID="topic-content-missing" message={systemCopy.topicContentMissing} />
        )}
      </View>
      {unlocked && hasSteps ? (
        <View style={{ paddingTop: spacing.s3 }} testID="topic-plan-steps">
          {topic.steps.map((s, i) => {
            const done = isLessonDone(state, s.id);
            return (
              <Pressable
                key={s.id}
                style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                onPress={() => onSelectStep(i)}
                accessibilityRole="button"
                accessibilityLabel={s.name}
                testID={`topic-plan-step-${s.id}`}
              >
                <Icon
                  name={done ? "checkCircle" : stepIcons[s.id] ?? "circle"}
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.rowText}>{s.name}</Text>
                <Icon name="chevronRight" size={20} color={colors.secondary} />
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  lead: { ...type.body, color: c.secondary },
  row: { flexDirection: "row", alignItems: "center", gap: 16, paddingVertical: 12 },
  rowPressed: { opacity: 0.6 },
  rowText: { ...type.body, color: c.text, flex: 1 },
}));
