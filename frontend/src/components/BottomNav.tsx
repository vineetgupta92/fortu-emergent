import { useGlobalSearchParams, usePathname } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ui } from "../content/ui";
import { go, routes } from "../navigation/routes";
import { useFortu } from "../state/store";
import { makeStyles, useTheme } from "../theme";
import { Icon, IconName } from "./Icon";

export type TabId = "home" | "journey" | "dictionary" | "profile";

const TABS: { id: TabId; icon: IconName; label: string; href: string }[] = [
  { id: "home", icon: "home", label: ui.nav.home, href: routes.home },
  { id: "journey", icon: "route", label: ui.nav.journey, href: routes.journey },
  { id: "dictionary", icon: "dictionary", label: ui.nav.dictionary, href: routes.dictionary },
  { id: "profile", icon: "profile", label: ui.nav.profile, href: routes.profile },
];

export function BottomNav({ active, dark }: { active: TabId; dark: boolean }) {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const params = useGlobalSearchParams<{ from?: string }>();
  const { setDictFrom } = useFortu();

  const onPress = (tab: (typeof TABS)[number]) => {
    if (tab.id === "dictionary" && pathname !== routes.dictionary) {
      // Dictionary must return to the exact screen the user came from
      setDictFrom(params.from ? `${pathname}?from=${params.from}` : pathname);
    }
    go(tab.href);
  };

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={ui.nav.menu}
      style={[styles.nav, dark && styles.navDark, { paddingBottom: Math.max(18, insets.bottom) }]}
      testID="bottom-nav"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        const color = isActive ? (dark ? colors.mint : colors.primary) : dark ? colors.onDeepDim : colors.secondary;
        return (
          <Pressable
            key={tab.id}
            testID={`nav-tab-${tab.id}`}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => onPress(tab)}
            style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}
          >
            <Icon name={tab.icon} size={26} color={color} />
            <View style={[styles.pip, isActive && { backgroundColor: color }]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  nav: {
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: c.white,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  navDark: { backgroundColor: "transparent", borderTopColor: c.deepDivider },
  item: { flex: 1, alignItems: "center", gap: 6, paddingVertical: 6, minHeight: 48 },
  pip: { width: 5, height: 5, borderRadius: 3, backgroundColor: "transparent" },
}));
