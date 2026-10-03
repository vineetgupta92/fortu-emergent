import { Text, View } from "react-native";

import { ScreenShell } from "@/src/components/ScreenShell";
import { dictionaryEntries, groupDictionary, screens } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { useFortu } from "@/src/state/store";
import { fonts, makeStyles, radius, spacing } from "@/src/theme";

const groups = groupDictionary(dictionaryEntries); // Estonian alphabet order

export default function Dictionary() {
  const styles = useStyles();
  const { dictFrom } = useFortu();
  return (
    <ScreenShell
      testID="dictionary-screen"
      title={ui.titles.dictionary}
      onBack={() => go(dictFrom ?? routes.home)}
      nav="dictionary"
    >
      <View style={styles.intro} testID="dictionary-intro">
        <Text style={styles.introText}>{screens.sonaraamat.sissejuhatus}</Text>
      </View>
      {groups.map((g, gi) => (
        <View key={g.letter} testID={`dictionary-group-${g.letter}`}>
          <Text style={[styles.letter, gi === 0 && { marginTop: spacing.s2 }]} accessibilityRole="header">
            {g.letter}
          </Text>
          {g.items.map((e, k) => (
            <View key={e.id} style={[styles.item, k > 0 && styles.itemBorder]} testID={`dictionary-entry-${e.id}`}>
              <Text style={styles.term}>{e.term}</Text>
              <Text style={styles.def}>{e.definition}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  intro: { marginTop: spacing.s2, backgroundColor: c.fSurface, borderRadius: radius.input, paddingVertical: 18, paddingHorizontal: 20 },
  introText: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23, color: c.secondary },
  letter: { fontFamily: fonts.semibold, fontSize: 13, letterSpacing: 1.4, color: c.secondary, marginTop: spacing.s3, marginBottom: spacing.s1 },
  item: { paddingVertical: spacing.s1 },
  itemBorder: { borderTopWidth: 1, borderTopColor: c.border },
  term: { fontFamily: fonts.semibold, fontSize: 16, color: c.text, marginBottom: 5 },
  def: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23, color: c.secondary },
}));
