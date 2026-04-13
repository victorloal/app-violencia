// navigation/AppStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FormScreen from "../screens/FormScreen";
import MessageScreen from "../screens/MessageScreen";
import ServicesScreen from "../screens/ServicesScreen";
import PlacesScreen from "../screens/PlacesScreen";
import TermsScreen from "../screens/TermsScreen";
import ConfigScreen from "../screens/ConfigScreen";
import MessageConfigScreen from "../screens/MessageConfigScreen";
import MessageFormScreen from "../screens/MessageFormScreen";
import { SettingsContext } from "../context/SettingsContext";
import { colors } from "../thema/colors";
import EmergencyScreen from "../screens/EmergencyScreen";
import WelcomeScreen from "../screens/WelcomesScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Welcome");
  const { phoneNumber, fontScale } = useContext(SettingsContext);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        // Verificar si ya completó el formulario
        const formCompleted = await AsyncStorage.getItem("formCompleted");

        // Verificar si ya tiene configuración guardada
        const hasConfig = phoneNumber && phoneNumber.trim() !== "" && fontScale;

        if (formCompleted === "true") {
          // Ya completó el formulario, va directo a Home
          setInitialRoute("Home");
        } else if (hasConfig) {
          // Ya tiene configuración pero no ha hecho el formulario
          setInitialRoute("MessageForm");
        } else {
          // Primera vez sin configuración
          setInitialRoute("Welcome");
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
        setInitialRoute("Welcome");
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, [phoneNumber, fontScale]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.lavender[50],
        }}
      >
        <ActivityIndicator size="large" color={colors.lavender[600]} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      {/* Pantallas de primera vez */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="MessageConfig" component={MessageConfigScreen} />
      <Stack.Screen name="MessageForm" component={MessageFormScreen} />
      <Stack.Screen name="Form" component={FormScreen} />

      {/* Pantalla de mensaje después del formulario */}
      <Stack.Screen name="Message" component={MessageScreen} />

      {/* Pantallas principales */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Config" component={ConfigScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="Places" component={PlacesScreen} />
      <Stack.Screen name="Emergency" component={EmergencyScreen} />
    </Stack.Navigator>
  );
}
