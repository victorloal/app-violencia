import { useState } from "react";
import { View, StyleSheet, Alert, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedStyledButton from "../UI/StyledButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../thema/colors";
import AppNavbar from "./AppNavbar";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import CalculatorScreen from "../../screens/CalculatorScreen";

export default function MainLayout({ children }) {
  const insets = useSafeAreaInsets();
  const { setIsCamouflageOn, phoneNumber } = useContext(SettingsContext);
  const navigation = useNavigation();
  const [calcVisible, setCalcVisible] = useState(false);

  // Abre la calculadora (activa camuflaje en contexto)
  const handleExitCamouflage = () => {
    setIsCamouflageOn(true);
    setCalcVisible(true);
  };

  // Long-press en "=" dentro de la calculadora → vuelve a la app
  const handleUnlock = () => {
    setIsCamouflageOn(false);
    setCalcVisible(false);
  };

  const handleCallButtonPress = () => {
    navigation.navigate("Places", { tipo: "emergencia" });
  };

  const handleMessageButtonPress = () => {
    if (!phoneNumber || phoneNumber.trim() === "") {
      Alert.alert(
        "Número no configurado",
        "Por favor, configura tu número de contacto en la pantalla de Configuración.",
        [
          {
            text: "Ir a Configuración",
            onPress: () => navigation.navigate("Settings"),
          },
          { text: "Cancelar", style: "cancel" },
        ],
      );
      return;
    }

    const message = "Hola, necesito ayuda.";
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "No se pudo abrir la aplicación de mensajes.");
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.container}>
        {/* Navbar superior */}
        <AppNavbar />

        {/* Contenido dinámico */}
        <View style={styles.content}>{children}</View>

        {/* Barra inferior fija */}
        <View style={styles.bottomBar}>
          <AnimatedStyledButton
            title="Mensaje"
            size="flex"
            icon={
              <Ionicons
                name="mail-open-outline"
                size={30}
                color={colors.lavender[800]}
              />
            }
            iconPosition="top"
            tone="light"
            onPress={handleMessageButtonPress}
          />

          <AnimatedStyledButton
            title="Llamada"
            size="flex"
            icon={
              <Ionicons
                name="call-outline"
                size={40}
                color={colors.lavender[200]}
              />
            }
            iconPosition="top"
            shape="pill"
            tone="dark"
            onPress={handleCallButtonPress}
          />

          {/* Botón Salir → abre calculadora (camuflaje) */}
          <AnimatedStyledButton
            title="Salir"
            size="flex"
            icon={
              <Ionicons
                name="calculator-outline"
                size={30}
                color={colors.lavender[800]}
              />
            }
            iconPosition="top"
            tone="light"
            onPress={handleExitCamouflage}
          />
        </View>
      </View>
      {/* ── Calculadora en Modal de pantalla completa ── */}
      <Modal
        visible={calcVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        statusBarTranslucent
        onRequestClose={() => {}} // Bloquea el botón atrás en Android
      >
        <CalculatorScreen onUnlock={handleUnlock} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: "row",
    width: "100%",
    height: "15%",
    backgroundColor: colors.lavender[200],
  },
});