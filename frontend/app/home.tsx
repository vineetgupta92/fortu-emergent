import { Pressable, Text, View } from "react-native";

import { LinkButton, PrimaryButton } from "@/src/components/Buttons";
import { FortuSay, Mascot } from "@/src/components/Fortu";
import { Icon } from "@/src/components/Icon";
import { ScreenShell } from "@/src/components/ScreenShell";
import { getDaysWithFortu } from "@/src/config";
import { screens } from "@/src/content";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { currentStepCard, isReturningUser, topicsCompletedCounter } from "@/src/state/selectors";
import { useFortu } from "@/src/state/store";
import { fonts, makeStyles, spacing, type, useTheme } from "@/src/theme";

const n = screens.kodu_uus;
const r = screens.kodu_naasev;

function NewUserHome() {
  const styles = useStyles();
  return (
    <View style={{ paddingTop: spacing.s3 }} testID="home-new">
      <Text style={styles.hello}>{n.silt}</Text>
      <Text style={styles.h1} testID="home-title">
        {n.pealkiri}
      </Text>
      <Text style={styles.dim}>{n.kehatekst}</Text>
      <FortuSay text={n.fortu_kone} rohk={n.rohk} dark testID="home-fortu-say" />
      <Mascot size={184} dark style={{ marginVertical: spacing.s3 }} />
    </View>
  );
}

function ReturningHome() {
  const styles = useStyles();
  const { colors } = useTheme();
  const { state } = useFortu();
  const card = currentStepCard(state);
  const counter = topicsCompletedCounter(state);
  const pct = card.total ? (card.done / card.total) * 100 : 0;

  return (
    <View style={{ paddingTop: spacing.s3 }} testID="home-returning">
      <Text style={[styles.h1, { fontSize: 24, lineHeight: 32, marginBottom: 6 }]} testID="home-title">
        {r.pealkiri}
      </Text>
      <Text style={[styles.dim, { fontSize: 15 }]}>{r.abitekst}</Text>
      <Mascot size={124} dark style={{ marginVertical: spacing.s2 }} />

      <Pressable
        testID="home-continue-card"
        accessibilityRole="button"
        accessibilityLabel={`${r.kaart_pealkiri}. ${ui.stepPrefix(card.stepNo)}: ${card.stepName ?? ""}`}
        onPress={() => go(card.href)}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <Text style={styles.cardTitle}>{r.kaart_pealkiri}</Text>
        <Text style={styles.meta} testID="home-continue-step">
          <Text style={styles.metaStrong}>{ui.stepPrefix(card.stepNo)}</Text>
          {card.stepName ? ` · ${card.stepName}` : ""}
        </Text>
        <View style={styles.hrow}>
          <View style={styles.track}>
            <View style={[styles.trackFill, { width: `${pct}%` }]} />
          </View>
          <Text style={styles.count}>
            {card.done} / {card.total}
          </Text>
          <View style={styles.go}>
            <Icon name="arrowRight" size={19} color={colors.mintText} strokeWidth={2.2} />
          </View>
        </View>
      </Pressable>

      <View style={styles.duo}>
        <View style={[styles.card, styles.duoCard]} testID="home-days-card">
          <Text style={styles.lbl}>{r.naitaja1}</Text>
          <Text style={[styles.big, { color: colors.gold }]} testID="home-days-value">
            {getDaysWithFortu(state)}
          </Text>
          <Text style={styles.unit}>{r.naitaja1_yhik}</Text>
        </View>
        <View style={[styles.card, styles.duoCard]} testID="home-topics-card">
          <Text style={styles.lbl}>{r.naitaja2}</Text>
          <Text style={styles.big} testID="home-topics-value">
            {counter.done}
            <Text style={styles.bigOf}> / {counter.total}</Text>
          </Text>
          <Text style={styles.unit}>{r.naitaja2_yhik}</Text>
        </View>
      </View>
      <Text style={styles.hsay}>{r.sonum}</Text>
    </View>
  );
}

export default function Home() {
  const { state } = useFortu();
  const returning = isReturningUser(state);
  return (
    <ScreenShell
      testID="home-screen"
      variant="dark"
      screenLabel={ui.screenLabels.home}
      nav="home"
      footer={
        returning ? undefined : (
          <>
            <PrimaryButton testID="home-start-button" label={n.nupp} onPress={() => go(routes.selfIntro)} />
            <LinkButton testID="home-how-it-works-link" dark label={n.link} onPress={() => go(routes.why)} />
          </>
        )
      }
    >
      {returning ? <ReturningHome /> : <NewUserHome />}
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  hello: { ...type.h2, color: c.gold, marginBottom: 8 },
  h1: { ...type.h1, color: c.white, marginBottom: spacing.s1 },
  dim: { ...type.body, color: c.onDeepDim, marginBottom: spacing.s1 },
  card: { backgroundColor: c.deepSurface, borderRadius: 20, padding: 16 },
  cardPressed: { backgroundColor: c.deepSurfacePressed },
  cardTitle: { fontFamily: fonts.semibold, fontSize: 15, color: c.white, marginBottom: 8 },
  meta: { fontFamily: fonts.regular, fontSize: 13, color: c.onDeepDim, marginBottom: 12 },
  metaStrong: { fontFamily: fonts.semibold, color: c.mint },
  hrow: { flexDirection: "row", alignItems: "center", gap: 12 },
  track: { flex: 1, height: 6, borderRadius: 4, backgroundColor: c.deepDivider, overflow: "hidden" },
  trackFill: { height: "100%", borderRadius: 4, backgroundColor: c.mint },
  count: { fontFamily: fonts.semibold, fontSize: 13, color: c.onDeepDim },
  go: { width: 44, height: 44, borderRadius: 22, backgroundColor: c.mint, alignItems: "center", justifyContent: "center" },
  duo: { flexDirection: "row", gap: 10, marginTop: 12 },
  duoCard: { flex: 1, alignItems: "center", paddingVertical: 14, paddingHorizontal: 10 },
  lbl: { fontFamily: fonts.regular, fontSize: 13, color: c.onDeepDim, marginBottom: 6, textAlign: "center" },
  big: { fontFamily: fonts.bold, fontSize: 26, lineHeight: 30, color: c.white },
  bigOf: { fontFamily: fonts.bold, fontSize: 16, color: c.onDeepDim },
  unit: { fontFamily: fonts.regular, fontSize: 13, color: c.onDeepDim, marginTop: 3 },
  hsay: { fontFamily: fonts.serif, fontSize: 16, lineHeight: 23, color: c.gold, textAlign: "center", marginTop: spacing.s2 },
}));
