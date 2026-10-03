import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Href, router, Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { LogBox, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { ErrorBoundary } from "@/src/components/error-boundary";
import { ToastProvider } from "@/src/components/Toast";
import { routes } from "@/src/navigation/routes";
import { queryClient } from "@/src/query-client";
import { FortuProvider, useFortu } from "@/src/state/store";
import { useTheme } from "@/src/theme";

// Disable logbox errors etc so that users can see the app
// and agent works as expected.
LogBox.ignoreAllLogs(true);

SplashScreen.preventAutoHideAsync().catch(() => {});

function AppGate({ fontsReady }: { fontsReady: boolean }) {
  const { hydrated, state } = useFortu();
  const { colors } = useTheme();
  const pathname = usePathname();
  const ready = fontsReady && hydrated;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  // Signed-out users always land on the opening screen
  useEffect(() => {
    if (ready && !state.user && pathname !== routes.login && pathname !== "/") router.replace(routes.login as Href);
  }, [ready, state.user, pathname]);

  if (!ready) return <View style={{ flex: 1, backgroundColor: colors.deepLow }} />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        animationDuration: 200,
        contentStyle: { backgroundColor: colors.deepLow },
      }}
    />
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": require("../assets/fonts/inter-400-normal.ttf"),
    "Inter-SemiBold": require("../assets/fonts/inter-600-normal.ttf"),
    "Inter-Bold": require("../assets/fonts/inter-700-normal.ttf"),
    "Fraunces-Regular": require("../assets/fonts/fraunces-400-normal.ttf"),
    "Fraunces-Italic": require("../assets/fonts/fraunces-400-italic.ttf"),
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <FortuProvider>
            <ToastProvider>
              <AppGate fontsReady={fontsLoaded || !!fontError} />
            </ToastProvider>
          </FortuProvider>
        </KeyboardProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
