import { ActivityIndicator, Pressable, Text } from "react-native";

import { fonts, makeStyles, radius, useTheme } from "../theme";
import { Icon, IconName } from "./Icon";

type BtnProps = {
  label: string;
  onPress: () => void;
  testID: string;
  disabled?: boolean;
  dark?: boolean;
  accessibilityLabel?: string;
};

/** Mint action button. Disabled is genuinely disabled, not just greyed. */
export function PrimaryButton({ label, onPress, testID, disabled, dark }: BtnProps) {
  const styles = useStyles();
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primary,
        pressed && styles.primaryPressed,
        disabled && (dark ? styles.offDark : styles.off),
      ]}
    >
      <Text style={[styles.primaryText, disabled && (dark ? styles.offDarkText : styles.offText)]}>{label}</Text>
    </Pressable>
  );
}

export function SocialButton({
  label,
  icon,
  onPress,
  testID,
  loading,
  disabled,
}: BtnProps & { icon: IconName; loading?: boolean }) {
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.social, pressed && styles.socialPressed]}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : <Icon name={icon} size={20} color={colors.white} />}
      <Text style={styles.socialText}>{label}</Text>
    </Pressable>
  );
}

export function LinkButton({ label, onPress, testID, dark }: BtnProps) {
  const styles = useStyles();
  const { colors } = useTheme();
  const color = dark ? colors.mint : colors.primary;
  return (
    <Pressable
      testID={testID}
      accessibilityRole="link"
      onPress={onPress}
      style={({ pressed }) => [styles.link, pressed && { opacity: 0.7 }]}
    >
      <Text style={[styles.linkText, { color }]}>{label}</Text>
      <Icon name="chevronRight" size={18} color={color} />
    </Pressable>
  );
}

const useStyles = makeStyles((c) => ({
  primary: {
    minHeight: 54,
    borderRadius: radius.button,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.mint,
  },
  primaryPressed: { backgroundColor: c.mintPressed, transform: [{ scale: 0.985 }] },
  primaryText: { fontFamily: fonts.semibold, fontSize: 16, color: c.mintText },
  off: { backgroundColor: c.border, transform: [] },
  offText: { color: c.secondary },
  offDark: { backgroundColor: c.deepButtonOff, transform: [] },
  offDarkText: { color: c.onDeepDim },
  social: {
    minHeight: 54,
    flexDirection: "row",
    gap: 12,
    borderRadius: radius.button,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.deepSurface,
    borderWidth: 1,
    borderColor: c.deepBorder,
  },
  socialPressed: { backgroundColor: c.deepSurfacePressed, transform: [{ scale: 0.985 }] },
  socialText: { fontFamily: fonts.semibold, fontSize: 16, color: c.white },
  link: {
    minHeight: 44,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: radius.button,
  },
  linkText: { fontFamily: fonts.semibold, fontSize: 16 },
}));
