import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigation/AppStack";
import { StatusBar } from "expo-status-bar";
import { SettingsProvider } from "./context/SettingsContext";

export function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <SettingsProvider>
          <AppStack />
        </SettingsProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
