import { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";
import { AccessibilityInfo, Text, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { fonts, makeStyles, radius } from "../theme";

const Ctx = createContext<(message: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insets = useSafeAreaInsets();
  const styles = useStyles();

  const show = useCallback((m: string) => {
    setMessage(m);
    AccessibilityInfo.announceForAccessibility(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2600);
  }, []);

  return (
    <Ctx.Provider value={show}>
      <View style={styles.flex}>
        {children}
        {message ? (
          <Animated.View
            entering={FadeInUp.duration(200)}
            exiting={FadeOutUp.duration(200)}
            style={[styles.wrap, { top: insets.top + 64, pointerEvents: "none" }]}
          >
            <View style={styles.toast} accessibilityLiveRegion="polite" testID="toast">
              <Text style={styles.text}>{message}</Text>
            </View>
          </Animated.View>
        ) : null}
      </View>
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);

const useStyles = makeStyles((c) => ({
  flex: { flex: 1 },
  wrap: { position: "absolute", left: 24, right: 24, alignItems: "center" },
  toast: { backgroundColor: c.primary, borderRadius: radius.pill, paddingVertical: 11, paddingHorizontal: 18 },
  text: { fontFamily: fonts.semibold, fontSize: 14, color: c.white, textAlign: "center" },
}));
