// The single screen template: header (location, optional back + flow progress),
// scrollable content, CTA bar and optional bottom nav. Dark = Fortu speaks, light = user acts.
import { StatusBar } from "expo-status-bar";
import { ReactNode, useEffect, useRef } from "react";
import { AccessibilityInfo, BackHandler, findNodeHandle, Platform, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ui } from "../content/ui";
import { fonts, makeStyles, spacing, useTheme } from "../theme";
import { BottomNav, TabId } from "./BottomNav";
import { DeepBackground } from "./DeepBackground";
import { Icon } from "./Icon";

export type FlowProgress = { done: number; total: number; current: number; label: string };

type Props = {
  testID: string;
  variant?: "light" | "dark";
  title?: string;
  screenLabel?: string;
  onBack?: () => void;
  progress?: FlowProgress;
  nav?: TabId;
  footer?: ReactNode;
  center?: boolean;
  /** Use on screens with text inputs so the focused field stays above the keyboard. */
  keyboard?: boolean;
  children: ReactNode;
};

function HeaderProgress({ done, total, current, label }: FlowProgress) {
  const styles = useStyles();
  const pct = useSharedValue(total ? (done / total) * 100 : 0);
  useEffect(() => {
    pct.value = withTiming(total ? (done / total) * 100 : 0, { duration: 300 });
  }, [done, total, pct]);
  const fill = useAnimatedStyle(() => ({ width: `${pct.value}%` }));
  return (
    <View
      style={styles.progTrack}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: total, now: current }}
      testID="flow-progress"
    >
      <Animated.View style={[styles.progFill, fill]} />
    </View>
  );
}

export function ScreenShell({
  testID,
  variant = "light",
  title,
  screenLabel,
  onBack,
  progress,
  nav,
  footer,
  center,
  keyboard,
  children,
}: Props) {
  const dark = variant === "dark";
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const headerRef = useRef<View>(null);

  useEffect(() => {
    if (!onBack || Platform.OS !== "android") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onBack();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  // Move screen-reader focus to the new screen
  useEffect(() => {
    if (Platform.OS === "web") return;
    const t = setTimeout(() => {
      const node = headerRef.current ? findNodeHandle(headerRef.current) : null;
      if (node) AccessibilityInfo.setAccessibilityFocus(node);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const bottomSpace = footer || nav ? spacing.s3 : spacing.s3 + insets.bottom;
  const scrollProps = {
    style: styles.flex,
    contentContainerStyle: [styles.scroll, center && styles.center, { paddingBottom: bottomSpace }],
    showsVerticalScrollIndicator: false,
    testID: `${testID}-scroll`,
  };
  const body = <Animated.View entering={FadeIn.duration(260)}>{children}</Animated.View>;

  return (
    <View style={[styles.root, dark ? styles.rootDark : styles.rootLight]} testID={testID}>
      {dark && <DeepBackground />}
      <StatusBar style="light" />
      <View style={[styles.header, !dark && styles.headerLight, { paddingTop: insets.top + 14 }]}>
        <View style={styles.headerRow}>
          {onBack ? (
            <Pressable
              testID="header-back-button"
              accessibilityRole="button"
              accessibilityLabel={ui.back}
              onPress={onBack}
              hitSlop={12}
              style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
            >
              <Icon name="back" size={24} color={colors.white} />
            </Pressable>
          ) : null}
          <View
            ref={headerRef}
            accessible
            accessibilityRole="header"
            accessibilityLabel={title ?? screenLabel}
            style={styles.titleWrap}
          >
            <Icon name="leaf" size={20} color={colors.white} strokeWidth={1.75} />
            {title ? (
              <Text style={styles.title} numberOfLines={1} testID="header-title">
                {title}
              </Text>
            ) : null}
          </View>
        </View>
        {progress ? <HeaderProgress {...progress} /> : null}
      </View>

      {keyboard ? (
        <KeyboardAwareScrollView {...scrollProps} bottomOffset={120}>
          {body}
        </KeyboardAwareScrollView>
      ) : (
        <ScrollView {...scrollProps}>{body}</ScrollView>
      )}

      {footer ? (
        <View style={[styles.footer, dark && styles.footerDark, { paddingBottom: nav ? spacing.s1 : spacing.s1 + insets.bottom }]}>
          {footer}
        </View>
      ) : null}
      {nav ? <BottomNav active={nav} dark={dark} /> : null}
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  root: { flex: 1 },
  rootLight: { backgroundColor: c.white },
  rootDark: { backgroundColor: c.deepLow },
  flex: { flex: 1 },
  header: { paddingHorizontal: spacing.page, paddingBottom: 14, backgroundColor: "transparent" },
  headerLight: { backgroundColor: c.primary },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 10, minHeight: 28 },
  back: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  titleWrap: { flexDirection: "row", alignItems: "center", gap: 10, flexShrink: 1 },
  title: { fontFamily: fonts.semibold, fontSize: 16, color: c.white, flexShrink: 1 },
  progTrack: { height: 5, marginTop: 12, borderRadius: 3, backgroundColor: c.headerTrack, overflow: "hidden" },
  progFill: { height: "100%", borderRadius: 3, backgroundColor: c.white },
  scroll: { flexGrow: 1, paddingHorizontal: spacing.page },
  center: { justifyContent: "center" },
  footer: {
    paddingTop: spacing.s1,
    paddingHorizontal: spacing.page,
    backgroundColor: c.white,
    borderTopWidth: 1,
    borderTopColor: c.border,
    gap: 8,
  },
  footerDark: { backgroundColor: "transparent", borderTopColor: c.deepDivider },
}));
