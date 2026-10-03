import { Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/Buttons";
import { Icon, IconName } from "@/src/components/Icon";
import { ScreenShell } from "@/src/components/ScreenShell";
import { screens } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { makeStyles, spacing, type, useTheme } from "@/src/theme";

const s = screens.miks_valida_fortu;
const ICONS: IconName[] = ["book", "target", "trending", "lock", "heart"];

export default function Why() {
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <ScreenShell
      testID="why-screen"
      title={ui.titles.why}
      nav="home"
      footer={<PrimaryButton testID="why-start-button" label={s.nupp} onPress={() => go(routes.selfIntro)} />}
    >
      <View style={{ paddingTop: spacing.s3 }}>
        {s.read.map(([title, body], i) => (
          <View key={title} style={[styles.row, i > 0 && styles.rowBorder]} testID={`why-row-${i}`}>
            <View style={styles.icon}>
              <Icon name={ICONS[i]} size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.body}>{body}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  row: { flexDirection: "row", gap: spacing.s1, paddingVertical: spacing.s2 },
  rowBorder: { borderTopWidth: 1, borderTopColor: c.border },
  icon: { width: 48, height: 48, borderRadius: 24, backgroundColor: c.fSurface, alignItems: "center", justifyContent: "center" },
  title: { ...type.label, color: c.text, marginBottom: 6 },
  body: { ...type.body, color: c.secondary },
}));
