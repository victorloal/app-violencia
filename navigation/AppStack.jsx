// navigation/AppStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FormScreen from "../screens/FormScreen";
import MessageScreen from "../screens/MessageScreen";
import ServicesScreen from "../screens/ServicesScreen";
import PlacesScreen from "../screens/PlacesScreen";
import WelcomeScreen from "../screens/WelcomesScreen";
import TermsScreen from "../screens/TermsScreen";
import ConfigScreen from "../screens/ConfigScreen";
import { useState } from "react";
import MessageConfigScreen from "../screens/MessageConfigScreen";
import MessageFormScreen from "../screens/MessageFormScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      {/* Primera vez: mostramos el formulario */}
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="MessageConfig" component={MessageConfigScreen} />
      <Stack.Screen name="Config" component={ConfigScreen} />

      <Stack.Screen name="MessageForm" component={MessageFormScreen} />
      <Stack.Screen name="Form" component={FormScreen} />

      {/* Pantalla de mensaje después del formulario */}
      <Stack.Screen name="Message" component={MessageScreen} />

      {/* Pantalla principal */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="Places" component={PlacesScreen} />
    </Stack.Navigator>
  );
}
