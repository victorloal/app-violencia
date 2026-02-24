// navigation/AppStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FormScreen from "../screens/FormScreen";
import MessageScreen from "../screens/MessageScreen";
import ServicesScreen from "../screens/ServicesScreen";
import PlacesScreen from "../screens/PlacesScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Primera vez: mostramos el formulario */}
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
