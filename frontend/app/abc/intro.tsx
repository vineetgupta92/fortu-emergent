import { Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { FortuSay } from "@/src/components/Fortu";
import { Icon } from "@/src/components/Icon";
import { ScreenShell } from "@/src/components/ScreenShell";
import { screens } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { isAbcDone, isAbcStarted } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { makeStyles, type, useTheme } from "@/src/theme";

const s = screens.abc_sissejuhatus;

export default function AbcIntro() {
  const styles = useStyles();
  const { colors } = useTheme();
  const { state } = useFortu();

  const onContinue = () => {
    if (isAbcDone(state)) go(routes.abcDone("journey"));
    else if (isAbcStarted(state)) go(routes.abcQ(state.abc.idx));
    else go(routes.abcPack(0));
  };

  return (
    <ScreenShell
      testID="abc-intro-screen"
      variant="dark"
      title={ui.titles.abc}
      nav="journey"
      center
      footer={
        <>
          <PrimaryButton testID="abc-intro-continue-button" label={s.nupp} onPress={onContinue} />
          <View style={styles.note}>
            <Icon name="info" size={16} color={colors.onDeepDim} />
            <Text style={styles.noteText}>{s.markus}</Text>
          </View>
        </>
      }
    >
      <FortuSay text={s.fortu_kone} rohk={s.rohk} dark big testID="abc-intro-say" />
      <Text style={styles.sm}>{s.abitekst}</Text>
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  sm: { ...type.small, fontSize: 15, lineHeight: 24, color: c.onDeepDim, marginTop: 14 },
  note: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 },
  noteText: { ...type.small, color: c.onDeepDim },
}));
