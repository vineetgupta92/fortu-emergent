// Radio-style option. Self-awareness uses only idle/picked (frame), ABC adds verdicts (fill + icon).
import * as Haptics from "expo-haptics";
import { Platform, Pressable, Text, View } from "react-native";

import { ui } from "../content/ui";
import { fonts, makeStyles, radius, useTheme } from "../theme";
import { Icon } from "./Icon";

export type OptionState = "idle" | "picked" | "ok" | "no" | "dim";

type Props = {
  text: string;
  state: OptionState;
  checked: boolean;
  disabled?: boolean;
  onPress: () => void;
  testID: string;
};

export function OptionCard({ text, state, checked, disabled, onPress, testID }: Props) {
  const styles = useStyles();
  const { colors } = useTheme();
  const tone =
    state === "ok"
      ? { border: colors.ok, bg: colors.okBg, mark: colors.ok }
      : state === "no"
        ? { border: colors.no, bg: colors.noBg, mark: colors.no }
        : state === "picked"
          ? { border: colors.primary, bg: colors.fSurface, mark: colors.primary }
          : null;
  const verdictText = state === "ok" ? ui.verdict.correct : state === "no" ? ui.verdict.wrong : null;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled: !!disabled }}
      accessibilityLabel={verdictText ? `${text}. ${verdictText}` : text}
      disabled={disabled}
      onPress={() => {
        if (Platform.OS !== "web") Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      style={({ pressed }) => [
        styles.opt,
        tone && { borderWidth: 1.5, borderColor: tone.border, backgroundColor: tone.bg, padding: 15.5 },
        state === "dim" && styles.dim,
        pressed && !tone && styles.pressed,
      ]}
    >
      <View style={[styles.mark, tone && { borderColor: tone.mark, backgroundColor: tone.bg }]}>
        {tone ? <View style={[styles.markDot, { backgroundColor: tone.mark }]} /> : null}
      </View>
      <Text style={styles.text}>{text}</Text>
      {state === "ok" ? <Icon name="check" size={20} color={colors.ok} strokeWidth={2.5} /> : null}
      {state === "no" ? <Icon name="x" size={20} color={colors.no} strokeWidth={2.5} /> : null}
    </Pressable>
  );
}

const useStyles = makeStyles((c) => ({
  opt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 56,
    padding: 16,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.white,
  },
  pressed: { backgroundColor: c.fSurface },
  dim: { opacity: 0.45 },
  mark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: c.border,
    alignItems: "center",
    justifyContent: "center",
  },
  markDot: { width: 13, height: 13, borderRadius: 7 },
  text: { flex: 1, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: c.text },
}));
