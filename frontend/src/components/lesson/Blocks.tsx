// Renders lesson text content (paragraphs, sub-headings, lists, quoted sayings, callouts, Fortu's voice).
import { Text, View } from "react-native";

import { fonts, makeStyles, radius, spacing, type, useTheme } from "../../theme";
import type { Block } from "../../content/lessons";
import { FortuSay } from "../Fortu";
import { Icon } from "../Icon";

export function Blocks({ blocks, dark, testID }: { blocks: Block[]; dark?: boolean; testID?: string }) {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <View style={{ gap: spacing.s1 }} testID={testID}>
      {blocks.map((b, i) => {
        if (b.t === "h")
          return (
            <Text key={i} style={[styles.h, dark && styles.onDark]}>
              {b.text}
            </Text>
          );
        if (b.t === "p")
          return (
            <Text key={i} style={[styles.p, dark && styles.onDarkDim]}>
              {b.text}
            </Text>
          );
        if (b.t === "list")
          return (
            <View key={i} style={styles.list}>
              {b.items.map((item, k) => (
                <View key={k} style={styles.li}>
                  <View style={[styles.bullet, dark && styles.bulletDark]} />
                  <Text style={[styles.p, styles.liText, dark && styles.onDarkDim]}>{item}</Text>
                </View>
              ))}
            </View>
          );
        if (b.t === "quote")
          return (
            <View key={i} style={[styles.quotes, dark && styles.quotesDark]}>
              {b.items.map((item, k) => (
                <Text key={k} style={[styles.quote, dark && styles.onDark]}>
                  „{item}“
                </Text>
              ))}
            </View>
          );
        if (b.t === "note")
          return (
            <View key={i} style={[styles.note, dark && styles.quotesDark]}>
              <Icon name="bulb" size={20} color={dark ? colors.gold : colors.primary} />
              <Text style={[styles.noteText, dark && styles.onDark]}>{b.text}</Text>
            </View>
          );
        return <FortuSay key={i} text={b.text} rohk={b.rohk} dark={dark} />;
      })}
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  h: { ...type.h2, fontSize: 18, color: c.primary },
  p: { ...type.body, color: c.text },
  onDark: { color: c.white },
  onDarkDim: { color: c.onDeepDim },
  list: { gap: 10 },
  li: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  bullet: { width: 7, height: 7, borderRadius: 4, marginTop: 9, backgroundColor: c.primary },
  bulletDark: { backgroundColor: c.gold },
  liText: { flex: 1 },
  quotes: { gap: 10, padding: 20, borderRadius: radius.card, backgroundColor: c.fSurface },
  quotesDark: { backgroundColor: c.deepSurface },
  quote: { fontFamily: fonts.serif, fontSize: 17, lineHeight: 26, color: c.text },
  note: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    padding: 20,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: c.border,
    backgroundColor: c.white,
  },
  noteText: { flex: 1, fontFamily: fonts.semibold, fontSize: 16, lineHeight: 25, color: c.text },
}));
