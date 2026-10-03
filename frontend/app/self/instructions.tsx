import { Text } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { FortuSay } from "@/src/components/Fortu";
import { ScreenShell } from "@/src/components/ScreenShell";
import { screens } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { useFortu } from "@/src/state/store";
import { makeStyles, type } from "@/src/theme";

const s = screens.eneseteadlikkus_juhis;

/** Instructions — dark, transit screen: no bottom nav, no back. */
export default function SelfInstructions() {
  const styles = useStyles();
  const { state } = useFortu();
  return (
    <ScreenShell
      testID="self-instructions-screen"
      variant="dark"
      title={ui.titles.self}
      center
      footer={
        <PrimaryButton
          testID="self-instructions-continue-button"
          label={s.nupp}
          onPress={() => go(routes.selfQ(state.self.idx))}
        />
      }
    >
      <FortuSay text={s.fortu_kone} rohk={s.rohk} dark big testID="self-instructions-say" />
      <Text style={styles.sm}>{s.abitekst}</Text>
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  sm: { ...type.small, fontSize: 15, lineHeight: 24, color: c.onDeepDim, marginTop: 14 },
}));
