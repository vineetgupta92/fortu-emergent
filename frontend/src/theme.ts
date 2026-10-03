// Fortu design tokens — source: fortu_disainijuhis.md + fortu_prototuup.html.
// Light scheme only (dark/light in Fortu are *screen contexts*, not a device theme).
// Generic keys are kept for template compatibility; Fortu keys follow the design guide.

import { useMemo } from "react";
import { Appearance, StyleSheet, useColorScheme } from "react-native";

export type ColorScheme = "light" | "dark";

const light = {
  // Generic template keys (mapped to Fortu values)
  surface: "#FFFFFF",
  onSurface: "#16211E",
  surfaceSecondary: "#F1F7F4",
  onSurfaceSecondary: "#16211E",
  surfaceTertiary: "#F1F7F4",
  onSurfaceTertiary: "#5A6B63",
  surfaceInverse: "#12332C",
  onSurfaceInverse: "#FFFFFF",
  muted: "#5A6B63",
  brand: "#12332C",
  onBrand: "#FFFFFF",
  brandPrimary: "#9BE3B8",
  onBrandPrimary: "#0A2620",
  brandSecondary: "#12332C",
  onBrandSecondary: "#FFFFFF",
  brandTertiary: "#F1F7F4",
  onBrandTertiary: "#12332C",
  success: "#1B5E2A",
  onSuccess: "#FFFFFF",
  warning: "#7A4A05",
  onWarning: "#FFFFFF",
  error: "#B3261E",
  onError: "#FFFFFF",
  info: "#12332C",
  onInfo: "#FFFFFF",
  border: "#E2EBE6",
  borderStrong: "#12332C",
  divider: "#E2EBE6",

  // Fortu tokens (design guide §1)
  primary: "#12332C",
  glow: "#1E4A3F",
  deepLow: "#0A211C",
  fSurface: "#F1F7F4",
  text: "#16211E",
  secondary: "#5A6B63",
  mint: "#9BE3B8",
  mintPressed: "#8ADCAE",
  mintText: "#0A2620",
  gold: "#E8C46A",
  goldDark: "#7A4A05",
  pink: "#F5B8D0",
  pinkDark: "#B03A6A",
  ok: "#1B5E2A",
  okBg: "#E4F2E6",
  no: "#B3261E",
  noBg: "#FBEAE7",
  onDeepDim: "#A9BFB4",
  white: "#FFFFFF",

  // Translucent surfaces on dark (Fortu speaks) screens
  deepSurface: "rgba(255,255,255,0.07)",
  deepSurfacePressed: "rgba(255,255,255,0.13)",
  deepBorder: "rgba(255,255,255,0.22)",
  deepDivider: "rgba(255,255,255,0.16)",
  deepMascot: "rgba(255,255,255,0.20)",
  deepButtonOff: "rgba(255,255,255,0.14)",
  headerTrack: "rgba(255,255,255,0.25)",
  shadow: "#12332C",
};

export type ThemeColors = typeof light;

export const defaultScheme = "light" satisfies ColorScheme;

export const themes: { light: ThemeColors; dark?: ThemeColors } = { light };

export function setColorScheme(scheme: ColorScheme | null) {
  Appearance.setColorScheme?.(scheme ?? "unspecified");
}

setColorScheme?.(themes.dark ? null : defaultScheme);

export function useTheme(): { scheme: ColorScheme; colors: ThemeColors } {
  const system = useColorScheme();
  const scheme: ColorScheme = (system === "light" || system === "dark") && themes[system] ? system : defaultScheme;
  return { scheme, colors: themes[scheme] ?? themes.light };
}

export const colors = light;

export function makeStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  factory: (colors: ThemeColors) => T & StyleSheet.NamedStyles<any>,
): () => T {
  return function useStyles(): T {
    const { colors } = useTheme();
    return useMemo(() => StyleSheet.create(factory(colors)), [colors]);
  };
}

// Layout tokens (design guide §3)
export const spacing = { s1: 16, s2: 24, s3: 32, page: 24 } as const;
export const radius = { card: 24, button: 18, input: 16, pill: 999 } as const;

// Fonts are loaded in app/_layout.tsx via expo-font
export const fonts = {
  regular: "Inter-Regular",
  semibold: "Inter-SemiBold",
  bold: "Inter-Bold",
  serif: "Fraunces-Regular",
  serifItalic: "Fraunces-Italic",
} as const;

// Typography scale (design guide §2) — colour-free so it can live at module level
export const type = {
  h1: { fontFamily: fonts.bold, fontSize: 28, lineHeight: 36 },
  h2: { fontFamily: fonts.semibold, fontSize: 20, lineHeight: 28 },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 26 },
  label: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 22 },
  small: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 22 },
  caption: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 18 },
  say: { fontFamily: fonts.serif, fontSize: 19, lineHeight: 28 },
  deepBig: { fontFamily: fonts.serif, fontSize: 26, lineHeight: 34 },
} as const;

export const shadow = {
  shadowColor: light.shadow,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.07,
  shadowRadius: 20,
  elevation: 2,
} as const;
