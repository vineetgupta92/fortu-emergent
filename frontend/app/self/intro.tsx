import { Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { FortuSay, Mascot } from "@/src/components/Fortu";
import { ScreenShell } from "@/src/components/ScreenShell";
import { screens } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { makeStyles, spacing, type } from "@/src/theme";

const s = screens.eneseteadlikkus_sissejuhatus;

export default function SelfIntro() {
  const styles = useStyles();
  return (
    <ScreenShell
      testID="self-intro-screen"
      title={ui.titles.self}
      nav="journey"
      footer={<PrimaryButton testID="self-intro-continue-button" label={s.nupp} onPress={() => go(routes.selfInstructions)} />}
    >
      <View style={{ paddingTop: spacing.s3 }}>
        <Text style={styles.h1} testID="self-intro-title">
          {s.pealkiri}
        </Text>
        <FortuSay text={s.fortu_kone} rohk={s.rohk} style={{ marginBottom: spacing.s2 }} />
        <Text style={[styles.body, { marginBottom: spacing.s1 }]}>{s["lõik2"]}</Text>
        <Text style={styles.body}>{s["lõik3"]}</Text>
      </View>
      <Mascot size={168} style={{ marginTop: spacing.s3 }} />
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  h1: { ...type.h1, color: c.text, marginBottom: spacing.s2 },
  body: { ...type.body, color: c.secondary },
}));
