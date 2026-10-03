// Journey progress: done = filled dot, current = ring with white centre, ahead = grey dot.
import { View } from "react-native";

import { makeStyles } from "../theme";

export function StepPips({ done, total }: { done: number; total: number }) {
  const styles = useStyles();
  const items = [];
  for (let i = 0; i < total; i++) {
    const state = i < done ? "done" : i === done ? "now" : "next";
    items.push(
      <View
        key={`d${i}`}
        testID={`pip-${i}-${state}`}
        style={[styles.dot, state === "done" && styles.dotDone, state === "now" && styles.dotNow]}
      />,
    );
    if (i < total - 1) {
      items.push(
        <View key={`b${i}`} style={styles.bar}>
          <View style={[styles.barFill, { width: i < done ? "100%" : "0%" }]} />
        </View>,
      );
    }
  }
  return (
    <View style={styles.row} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {items}
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  row: { flex: 1, flexDirection: "row", alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.border },
  dotDone: { backgroundColor: c.primary },
  dotNow: { width: 12, height: 12, borderRadius: 6, backgroundColor: c.white, borderWidth: 2.5, borderColor: c.primary },
  bar: { flex: 1, height: 3, borderRadius: 2, backgroundColor: c.border, overflow: "hidden" },
  barFill: { height: "100%", backgroundColor: c.primary },
}));
