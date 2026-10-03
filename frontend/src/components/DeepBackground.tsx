// radial-gradient(120% 62% at 50% 0%, glow 0%, primary 45%, deep-low 100%)
import { StyleSheet } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

import { useTheme } from "../theme";

export function DeepBackground() {
  const { colors } = useTheme();
  return (
    <Svg style={[StyleSheet.absoluteFill, { pointerEvents: "none" }]} width="100%" height="100%" preserveAspectRatio="none">
      <Defs>
        <RadialGradient
          id="fortuDeep"
          cx="0.5"
          cy="0"
          r="1"
          fx="0.5"
          fy="0"
          gradientUnits="objectBoundingBox"
          gradientTransform="translate(0.5 0) scale(1.2 0.62) translate(-0.5 0)"
        >
          <Stop offset="0" stopColor={colors.glow} />
          <Stop offset="0.45" stopColor={colors.primary} />
          <Stop offset="1" stopColor={colors.deepLow} />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#fortuDeep)" />
    </Svg>
  );
}
