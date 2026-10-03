import { Href, Redirect, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { Mascot } from "@/src/components/Fortu";
import { Icon } from "@/src/components/Icon";
import { ScreenShell } from "@/src/components/ScreenShell";
import { levelForScore, screens, selfQuestions } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { isAbcDone, isSelfDone, selfScore } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { fonts, makeStyles, radius, spacing, type, useTheme } from "@/src/theme";

const t = screens.tulemus;

/** Result — the numeric 0–10 score is internal and never shown. */
export default function SelfResult() {
  const styles = useStyles();
  const { colors } = useTheme();
  const { from } = useLocalSearchParams<{ from?: string }>();
  const fromJourney = from === "journey";
  const { state } = useFortu();
  const [open, setOpen] = useState(false);

  if (!isSelfDone(state)) return <Redirect href={routes.selfIntro as Href} />;
  const level = levelForScore(selfScore(state));

  return (
    <ScreenShell
      testID="self-result-screen"
      variant="dark"
      title={ui.titles.self}
      screenLabel={ui.screenLabels.result}
      onBack={() => go(fromJourney ? routes.journey : routes.selfQ(selfQuestions.length - 1))}
      progress={{ done: selfQuestions.length, total: selfQuestions.length, current: selfQuestions.length, label: ui.questionProgress(selfQuestions.length) }}
      nav="journey"
      footer={
        <PrimaryButton
          testID="self-result-continue-button"
          label={t.nupp}
          onPress={() => go(isAbcDone(state) ? routes.journey : routes.abcIntro)}
        />
      }
    >
      <View style={styles.top}>
        <Mascot size={144} dark style={{ marginBottom: spacing.s2 }} />
        <View style={{ marginBottom: 14 }} testID="result-heart">
          <Icon name="heart" size={30} color={colors.pink} filled />
        </View>
        <Text style={styles.lead} testID="self-result-lead">
          {level.lead}
        </Text>
      </View>

      <View style={{ paddingTop: spacing.s3 }}>
        <Pressable
          testID="self-result-toggle-answers"
          accessibilityRole="button"
          accessibilityState={{ expanded: open }}
          onPress={() => setOpen((o) => !o)}
          style={({ pressed }) => [styles.toggle, pressed && styles.togglePressed]}
        >
          <Text style={styles.toggleText}>{open ? t.vastuste_nupp_avatud : t.vastuste_nupp}</Text>
          <Icon name={open ? "chevronUp" : "chevronDown"} size={20} color={colors.white} />
        </Pressable>
        {open ? (
          <View style={styles.sumCard} testID="self-result-summary">
            {selfQuestions.map((q, i) => {
              const a = state.self.answers[i];
              if (a === null) return null;
              return (
                <View key={q.id} style={[styles.sumRow, i > 0 && styles.sumRowBorder]}>
                  <Text style={styles.sumTopic}>{q.topic}</Text>
                  <Text style={styles.sumAnswer}>{q.options[a]}</Text>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>

      <Text style={styles.body} testID="self-result-body">
        {level.body}
      </Text>
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  top: { paddingTop: spacing.s3, alignItems: "center" },
  lead: { fontFamily: fonts.serif, fontSize: 23, lineHeight: 32, color: c.gold, textAlign: "center" },
  toggle: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: c.deepBorder,
    backgroundColor: c.deepSurface,
  },
  togglePressed: { backgroundColor: c.deepSurfacePressed },
  toggleText: { fontFamily: fonts.semibold, fontSize: 16, color: c.white },
  sumCard: { marginTop: spacing.s1, padding: 20, borderRadius: radius.card, backgroundColor: c.deepSurface },
  sumRow: { paddingVertical: spacing.s1 },
  sumRowBorder: { borderTopWidth: 1, borderTopColor: c.deepDivider },
  sumTopic: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: c.onDeepDim, marginBottom: 6 },
  sumAnswer: { ...type.body, lineHeight: 24, color: c.white },
  body: { ...type.body, color: c.onDeepDim, paddingTop: spacing.s3 },
}));
