// Fortu's voice (Fraunces serif with gold italic emphasis) and the mascot illustration.
import { Image, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

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

/** Fortu the raccoon. `default` greets, `celebrate` closes a step, `thumbsup` encourages. */
const MASCOTS = {
  default: require("../../assets/images/mascot/fortu-default.png"),
  celebrate: require("../../assets/images/mascot/fortu-celebrate.png"),
  thumbsup: require("../../assets/images/mascot/fortu-thumbsup.png"),
} as const;

export type MascotVariant = keyof typeof MASCOTS;

export function Mascot({
  size,
  variant = "default",
  style,
}: {
  size: number;
  variant?: MascotVariant;
  /** kept for call-site compatibility; the transparent PNG suits both themes */
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={ui.mascotLabel}
      testID="mascot"
      style={[{ alignSelf: "center" }, style]}
    >
      <Image source={MASCOTS[variant]} resizeMode="contain" style={{ width: size, height: size }} />
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  onDark: { color: c.white },
  onLight: { color: c.text },
  em: { fontFamily: fonts.serifItalic },
  emDark: { color: c.gold },
  emLight: { color: c.goldDark },
}));
