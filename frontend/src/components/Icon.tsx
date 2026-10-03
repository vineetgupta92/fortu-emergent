// Stroke icons taken from fortu_prototuup.html (24×24 viewBox).
import { View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

type El =
  | { t: "p"; d: string }
  | { t: "c"; cx: number; cy: number; r: number }
  | { t: "r"; x: number; y: number; w: number; h: number; rx: number };

const p = (d: string): El => ({ t: "p", d });
const c = (cx: number, cy: number, r: number): El => ({ t: "c", cx, cy, r });
const r = (x: number, y: number, w: number, h: number, rx: number): El => ({ t: "r", x, y, w, h, rx });

const CLIP = [p("M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"), r(9, 3, 6, 4, 1)];

const ICONS = {
  back: [p("M19 12H5M11 6l-6 6 6 6")],
  leaf: [p("M5 21c.5-4.5 2.5-8 7-10"), p("M9 18c6.218 0 10.5-3.288 11-12-5.5.5-10.328 1.5-12.5 5-1.5 2.5-.5 5.5 1.5 7z")],
  google: [p("M20.945 11a9 9 0 1 1-3.284-5.997l-2.655 2.392A5.5 5.5 0 1 0 17.125 13H13v-2z")],
  apple: [
    p("M12 5.5c-1.5-2-4-2.5-5.5-1.5-2 1.3-2.6 4.6-1.4 8.2 1 3 2.9 6.3 4.6 6.3 1.1 0 1.6-.7 2.3-.7s1.2.7 2.3.7c1.7 0 3.6-3.3 4.6-6.3.6-1.8.7-3.5.3-4.9"),
    p("M12 5.5c0-2 1.6-3.5 3.5-3.5"),
  ],
  chevronRight: [p("m9 6 6 6-6 6")],
  chevronDown: [p("m6 9 6 6 6-6")],
  chevronUp: [p("m6 15 6-6 6 6")],
  book: [p("M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0"), p("M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0"), p("M3 6v13M12 6v13M21 6v13")],
  target: [c(12, 12, 9), c(12, 12, 5), c(12, 12, 1)],
  trending: [p("m3 17 6-6 4 4 8-8"), p("M14 7h7v7")],
  lock: [r(5, 11, 14, 10, 2), p("M8 11V7a4 4 0 0 1 8 0v4")],
  heart: [p("M19.5 12.6 12 20l-7.5-7.4a5 5 0 1 1 7.5-6.6 5 5 0 1 1 7.5 6.6z")],
  info: [c(12, 12, 9), p("M12 8h.01M11 12h1v4h1")],
  home: [p("M5 12H3l9-9 9 9h-2"), p("M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"), p("M9 21v-6h6v6")],
  route: [c(6, 19, 2), c(18, 5, 2), p("M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H12")],
  dictionary: [
    p("M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z"),
    p("M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5A2.5 2.5 0 0 1 4 20.5z"),
    p("M8 7h7M8 10.5h5"),
  ],
  profile: [c(12, 8, 4), p("M6 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1")],
  checkCircle: [c(12, 12, 9), p("m9 12 2 2 4-4")],
  circle: [c(12, 12, 9)],
  arrowRight: [p("M5 12h14M13 6l6 6-6 6")],
  check: [p("m5 13 4 4L19 7")],
  x: [p("M6 6l12 12M18 6L6 18")],
  userCircle: [c(12, 12, 9), c(12, 10, 3), p("M6.2 18a6 6 0 0 1 11.6 0")],
  bulb: [p("M9 18h6M10 21h4"), p("M8.5 14a5.5 5.5 0 1 1 7 0c-.6.5-1 1.2-1 2h-5c0-.8-.4-1.5-1-2z")],
  switch: [p("M4 5h4l8 14h4"), p("M4 19h4l3-5"), p("M17 3l3 2-3 2"), p("M17 17l3 2-3 2")],
  compass: [c(12, 12, 9), p("m15 9-2.5 5.5L7 17l2.5-5.5z")],
  clipboardCheck: [...CLIP, p("m9 13 2 2 4-4")],
  clipboardList: [...CLIP, p("M9 12h6M9 16h4")],
} satisfies Record<string, El[]>;

export type IconName = keyof typeof ICONS;

type Props = { name: IconName; size?: number; color: string; strokeWidth?: number; filled?: boolean };

export function Icon({ name, size = 24, color, strokeWidth = 2, filled = false }: Props) {
  const common = {
    stroke: filled ? "none" : color,
    fill: filled ? color : "none",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        {(ICONS[name] as El[]).map((el, i) => {
          if (el.t === "p") return <Path key={i} d={el.d} {...common} />;
          if (el.t === "c") return <Circle key={i} cx={el.cx} cy={el.cy} r={el.r} {...common} />;
          return <Rect key={i} x={el.x} y={el.y} width={el.w} height={el.h} rx={el.rx} {...common} />;
        })}
      </Svg>
    </View>
  );
}

/** Step icons for journey rows and topic plans, keyed by stable step id. */
export const stepIcons: Record<string, IconName> = {
  eneseteadlikkus: "userCircle",
  "rahatarkuse-abc": "clipboardList",
  "raha-ja-mina": "userCircle",
  "raha-ja-tunded": "heart",
  "raha-ja-uskumused": "bulb",
  "raha-ja-valikud": "switch",
  "eesmarkide-abc": "target",
  "minu-miks-ja-tulevikupilt": "compass",
  kokkuvote: "clipboardCheck",
};
