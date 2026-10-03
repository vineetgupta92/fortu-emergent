// Fortu's voice (Fraunces serif with gold italic emphasis) and the mascot placeholder.
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

import { parseEmphasis } from "../content";
import { ui } from "../content/ui";
import { fonts, makeStyles, type } from "../theme";

type SayProps = {
  text: string;
  rohk?: string;
  dark?: boolean;
  big?: boolean;
  style?: StyleProp<TextStyle>;
  testID?: string;
};

/** Serif means Fortu speaks — use at most once per screen. */
export function FortuSay({ text, rohk, dark, big, style, testID }: SayProps) {
  const styles = useStyles();
  return (
    <Text style={[big ? type.deepBig : type.say, dark ? styles.onDark : styles.onLight, style]} testID={testID}>
      {parseEmphasis(text, rohk).map((s, i) =>
        s.em ? (
          <Text key={i} style={[styles.em, dark ? styles.emDark : styles.emLight]}>
            {s.text}
          </Text>
        ) : (
          s.text
        ),
      )}
    </Text>
  );
}

/** Raccoon-in-a-green-hoodie placeholder — no real illustration supplied yet. */
export function Mascot({ size, dark, style }: { size: number; dark?: boolean; style?: StyleProp<ViewStyle> }) {
  const styles = useStyles();
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={ui.mascotLabel}
      testID="mascot"
      style={[styles.mascot, dark && styles.mascotDark, { width: size, height: size, borderRadius: size / 2 }, style]}
    >
      <Text style={[styles.mascotText, dark && styles.mascotTextDark]}>{ui.mascotPlaceholder}</Text>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  onDark: { color: c.white },
  onLight: { color: c.text },
  em: { fontFamily: fonts.serifItalic },
  emDark: { color: c.gold },
  emLight: { color: c.goldDark },
  mascot: { alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: c.fSurface },
  mascotDark: { backgroundColor: c.deepMascot },
  mascotText: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 21, textAlign: "center", color: c.primary },
  mascotTextDark: { color: c.white },
}));
