// Reusable empty / error / offline state. Copy is supplied by the caller (see systemCopy.ts).
import { Pressable, Text, View } from "react-native";

import { fonts, makeStyles, radius } from "../theme";
import { Icon, IconName } from "./Icon";

type Props = {
  message: string;
  icon?: IconName;
  dark?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  testID: string;
};

export function StatusMessage({ message, icon = "info", dark, actionLabel, onAction, testID }: Props) {
  const styles = useStyles();
  return (
    <View style={[styles.box, dark && styles.boxDark]} testID={testID} accessibilityLiveRegion="polite">
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Icon name={icon} size={22} color={dark ? styles.textDark.color : styles.icon.color} />
        </View>
        <Text style={[styles.text, dark && styles.textDark]}>{message}</Text>
      </View>
      {actionLabel && onAction ? (
        <Pressable testID={`${testID}-action`} accessibilityRole="button" onPress={onAction} style={styles.action}>
          <Text style={[styles.actionText, dark && styles.actionTextDark]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  box: { backgroundColor: c.fSurface, borderRadius: radius.card, padding: 20, gap: 12 },
  boxDark: { backgroundColor: c.deepSurface },
  row: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  iconWrap: { paddingTop: 1 },
  icon: { color: c.primary },
  text: { flex: 1, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: c.text },
  textDark: { color: c.white },
  action: { alignSelf: "flex-start", minHeight: 44, justifyContent: "center" },
  actionText: { fontFamily: fonts.semibold, fontSize: 16, color: c.primary },
  actionTextDark: { color: c.mint },
}));
