import { useEffect, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigation/AppStack";
import { StatusBar } from "expo-status-bar";
import { SettingsProvider } from "./context/SettingsContext";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

// Previene que la splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Verdana": require("./assets/fonts/Verdana.ttf"),
    "Verdana-Bold": require("./assets/fonts/Verdana-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <SettingsProvider>
          <AppStack />
        </SettingsProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
