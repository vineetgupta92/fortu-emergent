import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { ScreenShell } from "@/src/components/ScreenShell";
import { Icon, stepIcons } from "@/src/components/Icon";
import { StepPips } from "@/src/components/StepPips";
import { screens, Topic, topics } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { stepHref } from "@/src/navigation/steps";
import { stepsDone, topicDisplayName, TopicStatus, topicStatus } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { fonts, makeStyles, radius, spacing, type, useTheme } from "@/src/theme";

const lock = screens.lukupohjus;

function StepRow({ topic, index, done }: { topic: Topic; index: number; done: number }) {
  const styles = useStyles();
  const { colors } = useTheme();
  const { state } = useFortu();
  const step = topic.steps[index];
  const kind = index < done ? "done" : index === done ? "now" : "next";
  const stateLabel = kind === "done" ? ui.stepState.done : kind === "now" ? ui.stepState.current : ui.stepState.next;
  const onPress = () => go(stepHref(state, topic.id, index) ?? routes.topic(topic.id));

  return (
    <Pressable
      testID={`journey-step-${topic.id}-${step.id}`}
      accessibilityRole="button"
      accessibilityLabel={ui.stepA11y(index + 1, topic.stepCount, step.name, stateLabel)}
      onPress={onPress}
      style={({ pressed }) => [styles.stepRow, kind === "now" && styles.stepRowNow, pressed && { opacity: 0.7 }]}
    >
      <Icon name={stepIcons[step.id] ?? "circle"} size={22} color={kind === "next" ? colors.secondary : colors.primary} />
      <Text style={[styles.stepName, kind === "now" && styles.stepNameNow, kind === "next" && { color: colors.secondary }]}>
        {step.name}
      </Text>
      {kind === "done" ? <Icon name="checkCircle" size={22} color={colors.primary} /> : null}
      {kind === "now" ? <Icon name="arrowRight" size={22} color={colors.primary} /> : null}
      {kind === "next" ? <Icon name="circle" size={22} color={colors.border} /> : null}
    </Pressable>
  );
}

function Meter({ done, total }: { done: number; total: number }) {
  const styles = useStyles();
  return (
    <View style={styles.meter}>
      <StepPips done={done} total={total} />
      <Text style={styles.count}>
        {done} / {total} {ui.stepsUnit}
      </Text>
    </View>
  );
}

function TopicCard({ topic, index, status }: { topic: Topic; index: number; status: TopicStatus }) {
  const styles = useStyles();
  const { colors } = useTheme();
  const { state } = useFortu();
  const [open, setOpen] = useState(status === "inProgress" && index === 0);
  const [told, setTold] = useState(false);
  const { label } = topicDisplayName(topic);
  const done = stepsDone(state, topic);

  if (status === "locked") {
    const reason = index === 1 ? lock.teema1 : lock.muud;
    return (
      <Pressable
        testID={`journey-topic-${topic.id}-locked`}
        accessibilityRole="button"
        accessibilityLabel={`${label}. ${ui.locked}. ${topic.description}`}
        accessibilityState={{ expanded: told }}
        onPress={() => setTold((t) => !t)}
        style={styles.locked}
      >
        <View style={styles.top}>
          <Text style={[styles.name, { color: colors.secondary }]}>{label}</Text>
          <Icon name="lock" size={20} color={colors.secondary} />
        </View>
        <Text style={styles.desc}>{topic.description}</Text>
        {told ? (
          <Text style={styles.why} testID={`journey-topic-${topic.id}-lock-reason`}>
            {reason}
          </Text>
        ) : null}
      </Pressable>
    );
  }

  if (status === "notStarted") {
    return (
      <View style={styles.open} testID={`journey-topic-${topic.id}-not-started`}>
        <View style={styles.head}>
          <Text style={[styles.name, { marginBottom: 6 }]}>{label}</Text>
          <Text style={styles.desc}>{topic.description}</Text>
          <View style={{ marginTop: spacing.s1, marginBottom: spacing.s1 }}>
            <Meter done={0} total={topic.stepCount} />
          </View>
          <PrimaryButton
            testID={`journey-topic-${topic.id}-start-button`}
            label={screens.kodu_uus.nupp}
            onPress={() => go(index === 0 ? (stepHref(state, topic.id, 0) ?? routes.journey) : routes.topic(topic.id))}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.open} testID={`journey-topic-${topic.id}-${status === "completed" ? "completed" : "in-progress"}`}>
      <Pressable
        testID={`journey-topic-${topic.id}-toggle`}
        accessibilityRole="button"
        accessibilityLabel={`${label}. ${done} / ${topic.stepCount} ${ui.stepsUnit}`}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((o) => !o)}
        style={styles.head}
      >
        <View style={styles.top}>
          <Text style={styles.name}>{label}</Text>
          <Icon name={open ? "chevronUp" : "chevronDown"} size={20} color={colors.primary} />
        </View>
        {index > 0 ? <Text style={[styles.desc, { marginBottom: spacing.s1 }]}>{topic.description}</Text> : null}
        <Meter done={done} total={topic.stepCount} />
      </Pressable>
      {open ? (
        <View style={styles.days}>
          {topic.steps.map((_, k) => (
            <StepRow key={k} topic={topic} index={k} done={done} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

export default function Journey() {
  const { state } = useFortu();
  return (
    <ScreenShell testID="journey-screen" title={ui.titles.journey} nav="journey">
      <View style={{ paddingTop: spacing.s3, gap: spacing.s1 }}>
        {topics.map((t, i) => (
          <TopicCard key={`${t.id}-${topicStatus(state, i)}`} topic={t} index={i} status={topicStatus(state, i)} />
        ))}
      </View>
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  open: { borderWidth: 1.5, borderColor: c.primary, borderRadius: radius.card, overflow: "hidden", backgroundColor: c.white },
  head: { padding: 20 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 6 },
  name: { ...type.label, color: c.text, flexShrink: 1 },
  desc: { ...type.body, color: c.secondary },
  meter: { flexDirection: "row", alignItems: "center", gap: 12 },
  count: { fontFamily: fonts.semibold, fontSize: 14, color: c.secondary },
  days: { paddingHorizontal: 12, paddingBottom: 12, paddingTop: 4 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 48, padding: 12, borderRadius: radius.input },
  stepRowNow: { backgroundColor: c.fSurface },
  stepName: { flex: 1, fontFamily: fonts.regular, fontSize: 16, color: c.text },
  stepNameNow: { fontFamily: fonts.semibold },
  locked: { backgroundColor: c.fSurface, borderRadius: radius.card, padding: 20 },
  why: { ...type.small, color: c.secondary, marginTop: 12 },
}));
