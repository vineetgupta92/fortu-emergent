import { View } from "react-native";

import { ScreenShell } from "@/src/components/ScreenShell";
import { StatusMessage } from "@/src/components/StatusMessage";
import { screens } from "@/src/content";
import { ui } from "@/src/content/ui";
import { spacing } from "@/src/theme";

/** Profile content is not defined in the source — show only the prototype message. */
export default function Profile() {
  return (
    <ScreenShell testID="profile-screen" title={ui.titles.profile} nav="profile">
      <View style={{ paddingTop: spacing.s3 }}>
        <StatusMessage testID="profile-empty" icon="profile" message={screens.profiil.teade} />
      </View>
    </ScreenShell>
  );
}
