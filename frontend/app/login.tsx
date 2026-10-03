import { useState } from "react";
import { Text, View } from "react-native";

import { SocialButton } from "@/src/components/Buttons";
import { Mascot } from "@/src/components/Fortu";
import { ScreenShell } from "@/src/components/ScreenShell";
import { StatusMessage } from "@/src/components/StatusMessage";
import { screens } from "@/src/content";
import { systemCopy } from "@/src/content/systemCopy";
import { ui } from "@/src/content/ui";
import { go, routes } from "@/src/navigation/routes";
import { authService } from "@/src/services/auth";
import { useFortu } from "@/src/state/store";
import type { AuthProviderId } from "@/src/state/types";
import { fonts, makeStyles, spacing, type } from "@/src/theme";

const s = screens.avavaade;

function LegalNote() {
  const styles = useStyles();
  const parts = s.markus.split(new RegExp(`(${ui.legalEmphasis.join("|")})`));
  return (
    <Text style={styles.note} testID="login-legal-note">
      {parts.map((p, i) =>
        ui.legalEmphasis.includes(p) ? (
          <Text key={i} style={styles.noteEm}>
            {p}
          </Text>
        ) : (
          p
        ),
      )}
    </Text>
  );
}

export default function Login() {
  const styles = useStyles();
  const { signIn } = useFortu();
  const [busy, setBusy] = useState<AuthProviderId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSignIn = async (provider: AuthProviderId) => {
    setBusy(provider);
    setError(null);
    const res = await authService.signIn(provider);
    setBusy(null);
    if (res.ok) {
      signIn(res.user);
      go(routes.home);
    } else {
      setError(res.error === "offline" ? systemCopy.offline : systemCopy.signInFailed);
    }
  };

  return (
    <ScreenShell testID="login-screen" variant="dark" screenLabel={ui.screenLabels.login} center>
      <Mascot size={176} dark style={{ marginTop: spacing.s3 }} />
      <View style={styles.texts}>
        <Text style={styles.h1} testID="login-title">
          {s.pealkiri}
        </Text>
        <Text style={styles.sub}>{s.abitekst}</Text>
      </View>
      <View style={styles.stack}>
        <SocialButton
          testID="login-google-button"
          icon="google"
          label={s.nupud[0]}
          loading={busy === "google"}
          disabled={!!busy}
          onPress={() => onSignIn("google")}
        />
        <SocialButton
          testID="login-apple-button"
          icon="apple"
          label={s.nupud[1]}
          loading={busy === "apple"}
          disabled={!!busy}
          onPress={() => onSignIn("apple")}
        />
        {error ? <StatusMessage testID="login-error" dark message={error} /> : null}
      </View>
      <LegalNote />
    </ScreenShell>
  );
}

const useStyles = makeStyles((c) => ({
  texts: { alignItems: "center", paddingVertical: spacing.s3, gap: spacing.s1 },
  h1: { ...type.h1, color: c.white, textAlign: "center" },
  sub: { ...type.body, color: c.mint, textAlign: "center" },
  stack: { gap: spacing.s1 },
  note: { ...type.small, color: c.onDeepDim, textAlign: "center", paddingVertical: spacing.s3 },
  noteEm: { fontFamily: fonts.semibold, color: c.gold },
}));
