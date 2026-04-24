import { useCallback, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigation/AppStack";
import { StatusBar } from "expo-status-bar";
import { StatusBar as RNStatusBar } from "react-native";
import { SettingsProvider } from "./context/SettingsContext";
import { useFonts } from "expo-font";
import { CopilotProvider } from "react-native-copilot";
import { TutorialTooltip } from "./components/UI/AppTutorial";
import {
  TutorialProvider,
  useTutorialContext,
} from "./context/TutorialContext";
import SplashScreenComponent from "./screens/SplashScreen";
import { DialogProvider } from "./context/DialogContext";

function AppContent({ fontsLoaded }) {
  const { openCalcDemoRef, setTutorialActive, markTutorialCompleted } =
    useTutorialContext();
  const [showSplash, setShowSplash] = useState(true);

  const handleTutorialFinish = () => {
    markTutorialCompleted();
  };

  const handleStart = () => {
    setTutorialActive(true);
  };

  const handleStepChange = (step) => {
    if (step?.name?.includes("camuflaje")) {
      setTimeout(() => {
        openCalcDemoRef.current?.();
      }, 1200);
    }
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreenComponent onFinish={handleSplashFinish} />;
  }

  return (
    <CopilotProvider
      tooltipComponent={TutorialTooltip}
      stepNumberComponent={() => null}
      overlay="svg"
      animated
      backdropColor="rgba(0,0,0,0.74)"
      stopOnOutsideClick={false}
      verticalOffset={RNStatusBar.currentHeight ?? 0}
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
    // Las fuentes ya están cargadas en este punto
  }, [fontsLoaded, fontError]);

  return (
    <SafeAreaProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <StatusBar style="auto" />
        <SettingsProvider>
          <TutorialProvider>
            <DialogProvider>
              <AppContent fontsLoaded={fontsLoaded} />
            </DialogProvider>
          </TutorialProvider>
        </SettingsProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
