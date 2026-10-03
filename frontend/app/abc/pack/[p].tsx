import { Href, Redirect, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { FortuSay } from "@/src/components/Fortu";
import { ScreenShell } from "@/src/components/ScreenShell";
import { abcConcepts, abcPacks, screens } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, parseIndex, routes } from "@/src/navigation/routes";
import { abcCheckedCount } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { fonts, makeStyles } from "@/src/theme";

/** ABC pack introduction — dark transit screen, does not advance progress. */
export default function AbcPack() {
  const styles = useStyles();
  const { p: raw } = useLocalSearchParams<{ p: string }>();
  const p = parseIndex(raw, abcPacks.length - 1);
  const { state } = useFortu();

  if (p === null) return <Redirect href={routes.abcIntro as Href} />;
  const pack = abcPacks[p];

  return (
    <ScreenShell
      testID="abc-pack-screen"
      variant="dark"
      title={ui.titles.abc}
      onBack={() => go(pack.start === 0 ? routes.abcIntro : routes.abcQ(pack.start - 1))}
      progress={{ done: abcCheckedCount(state), total: abcConcepts.length, current: pack.start + 1, label: ui.conceptProgress(pack.start + 1) }}
      center
      footer={
        <PrimaryButton
          testID="abc-pack-continue-button"
          label={screens.abc_kysimus.nupp_parast}
          onPress={() => go(routes.abcQ(pack.start))}
        />
      }
    >
      <Text style={styles.kick} testID="abc-pack-label">
        {pack.label}
      </Text>
      <FortuSay text={pack.sentence} dark big testID="abc-pack-sentence" />
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  kick: { fontFamily: fonts.semibold, fontSize: 13, letterSpacing: 1.5, color: c.gold, marginBottom: 14 },
}));
