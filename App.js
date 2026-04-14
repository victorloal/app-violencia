// App.js
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigation/AppStack";
import { StatusBar } from "expo-status-bar";
import { SettingsProvider } from "./context/SettingsContext";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { CopilotProvider } from "react-native-copilot";
import { TutorialTooltip } from "./components/UI/AppTutorial";
import { TutorialProvider, useTutorialContext } from "./context/TutorialContext";

SplashScreen.preventAutoHideAsync();

function AppWithCopilot() {
  const { openCalcDemoRef, setTutorialActive, markTutorialCompleted } = useTutorialContext();

  const handleTutorialFinish = () => {
    markTutorialCompleted();
  };

  const handleStart = () => {
    setTutorialActive(true);
  };

  // Cuando Copilot avanza al paso camuflaje, abre la calculadora demo.
  // El paso carrusel lo maneja goToNext() desde MainLayout.handleUnlock.
  const handleStepChange = (step) => {
    if (step?.name?.includes("camuflaje")) {
      setTimeout(() => {
        openCalcDemoRef.current?.();
      }, 1200);
    }
  };

  return (
    <CopilotProvider
      tooltipComponent={TutorialTooltip}
      stepNumberComponent={() => null}
      overlay="svg"
      animated
      backdropColor="rgba(0,0,0,0.74)"
      stopOnOutsideClick={false}
      onStart={handleStart}
      onStop={handleTutorialFinish}
      onFinish={handleTutorialFinish}
      onStepChange={handleStepChange}
    >
      <AppStack />
    </CopilotProvider>
  );
}

export function App() {
  const [fontsLoaded, fontError] = useFonts({
    Verdana: require("./assets/fonts/Verdana.ttf"),
    "Verdana-Bold": require("./assets/fonts/Verdana-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <SettingsProvider>
          <TutorialProvider>
            <AppWithCopilot />
          </TutorialProvider>
        </SettingsProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}