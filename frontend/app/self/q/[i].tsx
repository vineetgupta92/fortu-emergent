import { Redirect, useLocalSearchParams, Href } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { OptionCard } from "@/src/components/OptionCard";
import { ScreenShell } from "@/src/components/ScreenShell";
import { screens, selfQuestions } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, parseIndex, routes } from "@/src/navigation/routes";
import { selfAnsweredCount } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { makeStyles, spacing, type } from "@/src/theme";

const CONTINUE = screens.eneseteadlikkus_juhis.nupp; // "Jätka"

/** Self-awareness question — NOT right/wrong: frame + radio only, no verdict. */
export default function SelfQuestion() {
  const styles = useStyles();
  const { i: raw } = useLocalSearchParams<{ i: string }>();
  const i = parseIndex(raw, selfQuestions.length - 1);
  const { state, selectSelf, setSelfIdx } = useFortu();

  useEffect(() => {
    if (i !== null) setSelfIdx(i);
  }, [i, setSelfIdx]);

  if (i === null) return <Redirect href={routes.selfIntro as Href} />;
  const q = selfQuestions[i];
  const picked = state.self.answers[i];

  return (
    <ScreenShell
      testID="self-question-screen"
      title={ui.titles.self}
      onBack={() => go(i > 0 ? routes.selfQ(i - 1) : routes.selfInstructions)}
      progress={{ done: selfAnsweredCount(state), total: selfQuestions.length, current: i + 1, label: ui.questionProgress(i + 1) }}
      nav="journey"
      footer={
        <PrimaryButton
          testID="self-question-continue-button"
          label={CONTINUE}
          disabled={picked === null}
          onPress={() => go(routes.selfHint(i))}
        />
      }
    >
      <View style={{ paddingTop: spacing.s3 }}>
        <Text style={styles.h2} testID="self-question-title" nativeID="self-q-title">
          {q.question}
        </Text>
        <Text style={styles.sub}>{q.instruction}</Text>
        <View accessibilityRole="radiogroup" accessibilityLabel={q.question} style={{ gap: spacing.s1 }}>
          {q.options.map((opt, k) => (
            <OptionCard
              key={k}
              testID={`self-option-${k}`}
              text={opt}
              state={picked === k ? "picked" : "idle"}
              checked={picked === k}
              onPress={() => selectSelf(i, k)}
            />
          ))}
        </View>
      </View>
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  h2: { ...type.h2, color: c.text, marginBottom: 8 },
  sub: { ...type.body, color: c.secondary, marginBottom: spacing.s2 },
}));
