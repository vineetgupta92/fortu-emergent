import { Href, Redirect, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { AccessibilityInfo, Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { OptionCard, OptionState } from "@/src/components/OptionCard";
import { ScreenShell } from "@/src/components/ScreenShell";
import { abcConcepts, ABC_CORRECT_INDEX, packIndexStartingAt, screens } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, parseIndex, routes } from "@/src/navigation/routes";
import { abcCheckedCount } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { makeStyles, spacing, type } from "@/src/theme";

const s = screens.abc_kysimus;

/** ABC concept — knowledge check: select → Kontrolli → verdict (locked) → Jätka. No retries. */
export default function AbcQuestion() {
  const styles = useStyles();
  const { i: raw } = useLocalSearchParams<{ i: string }>();
  const i = parseIndex(raw, abcConcepts.length - 1);
  const { state, selectAbc, checkAbc, setAbcIdx, completeAbc } = useFortu();

  useEffect(() => {
    if (i !== null) setAbcIdx(i);
  }, [i, setAbcIdx]);

  if (i === null) return <Redirect href={routes.abcIntro as Href} />;
  const concept = abcConcepts[i];
  const picked = state.abc.answers[i];
  const checked = state.abc.checked[i];
  const last = i === abcConcepts.length - 1;

  const onButton = () => {
    if (!checked) {
      checkAbc(i);
      AccessibilityInfo.announceForAccessibility(picked === ABC_CORRECT_INDEX ? ui.verdict.correct : ui.verdict.wrong);
      return;
    }
    if (last) {
      completeAbc();
      go(routes.abcDone("flow"));
      return;
    }
    const pack = packIndexStartingAt(i + 1);
    go(pack >= 0 ? routes.abcPack(pack) : routes.abcQ(i + 1));
  };

  const onBack = () => {
    const pack = packIndexStartingAt(i);
    go(pack >= 0 ? routes.abcPack(pack) : routes.abcQ(i - 1));
  };

  const stateFor = (answerIndex: number): OptionState => {
    if (checked) {
      if (answerIndex === ABC_CORRECT_INDEX) return "ok";
      if (answerIndex === picked) return "no";
      return "dim";
    }
    return answerIndex === picked ? "picked" : "idle";
  };

  return (
    <ScreenShell
      testID="abc-question-screen"
      title={ui.titles.abc}
      onBack={onBack}
      progress={{ done: abcCheckedCount(state), total: abcConcepts.length, current: i + 1, label: ui.conceptProgress(i + 1) }}
      nav="journey"
      footer={
        <PrimaryButton
          testID="abc-question-button"
          label={checked ? s.nupp_parast : s.nupp_enne}
          disabled={picked === null}
          onPress={onButton}
        />
      }
    >
      <View style={{ paddingTop: spacing.s3 }}>
        <Text style={styles.h2} testID="abc-question-term">
          {concept.term}
        </Text>
        <Text style={styles.sub}>{s.juhis}</Text>
        <View accessibilityRole="radiogroup" accessibilityLabel={concept.term} style={{ gap: spacing.s1 }}>
          {/* Fixed order from kuvamisjarjekord — never randomised */}
          {concept.displayOrder.map((answerIndex, pos) => (
            <OptionCard
              key={answerIndex}
              testID={`abc-option-${pos}`}
              text={concept.answers[answerIndex]}
              state={stateFor(answerIndex)}
              checked={picked === answerIndex}
              disabled={checked}
              onPress={() => selectAbc(i, answerIndex)}
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
