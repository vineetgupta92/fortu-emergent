import { Href, Redirect, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { ScreenShell } from "@/src/components/ScreenShell";
import { abcConcepts, screens, topics } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { abcScore, isAbcDone } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { fonts, makeStyles, spacing, type } from "@/src/theme";

const s = screens.abc_lopp;

/** ABC end — the only numeric learning result shown to the user. */
export default function AbcDone() {
  const styles = useStyles();
  const { from } = useLocalSearchParams<{ from?: string }>();
  const fromJourney = from === "journey";
  const { state } = useFortu();

  if (!isAbcDone(state)) return <Redirect href={routes.abcIntro as Href} />;
  const total = abcConcepts.length;

  return (
    <ScreenShell
      testID="abc-done-screen"
      variant="dark"
      title={ui.titles.abc}
      onBack={() => go(fromJourney ? routes.journey : routes.abcQ(total - 1))}
      progress={{ done: total, total, current: total, label: ui.conceptProgress(total) }}
      nav="journey"
      center
      footer={
        <PrimaryButton testID="abc-done-continue-button" label={s.nupp} onPress={() => go(routes.topic(topics[1].id))} />
      }
    >
      <View style={styles.wrap}>
        <Text style={styles.num} testID="abc-done-score">
          {abcScore(state)}
        </Text>
        <Text style={styles.unit}>{s.skoori_yhik}</Text>
        <Text style={styles.say}>{s.fortu_kone}</Text>
        <Text style={styles.body}>{s.abitekst}</Text>
      </View>
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  wrap: { alignItems: "center", paddingVertical: spacing.s3 },
  num: { fontFamily: fonts.bold, fontSize: 44, lineHeight: 52, color: c.gold, marginBottom: 6 },
  unit: { fontFamily: fonts.regular, fontSize: 15, color: c.onDeepDim, marginBottom: spacing.s3, textAlign: "center" },
  say: { fontFamily: fonts.serif, fontSize: 22, lineHeight: 30, color: c.gold, marginBottom: spacing.s2, textAlign: "center" },
  body: { ...type.body, color: c.onDeepDim, textAlign: "center" },
}));
