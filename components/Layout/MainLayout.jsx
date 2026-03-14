import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../UI/Button";
import SafeLayout from "./SafeLayout";
import styles from "../../styles";
import AppNavbar from "./AppNavbar";
import { SettingsContext } from "../../context/SettingsContext";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import CalculatorScreen from "../../screens/CalculatorScreen";

export default function MainLayout({ children }) {
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
    <SafeLayout backgroundColor={styles.semanticColors.background}>
      <View style={layoutStyles.container}>
        {/* Navbar superior */}
        <AppNavbar />

        {/* Contenido dinámico */}
        <ScrollView
          style={layoutStyles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={layoutStyles.scrollContent}
        >
          {children}
        </ScrollView>

        {/* Barra inferior fija */}
        <View style={layoutStyles.bottomBar}>
          <Button
            type="light"
            size="flex"
            iconLeft={
              <Ionicons
                name="mail-open-outline"
                size={30}
                color={styles.semanticColors.primary}
              />
            }
            onPress={handleMessageButtonPress}
          >
            Mensaje
          </Button>

          <Button
            type="primary"
            size="flex"
            variant="pill"
            iconLeft={
              <Ionicons
                name="call-outline"
                size={40}
                color={styles.semanticColors.text.inverse}
              />
            }
            onPress={handleCallButtonPress}
          >
            Llamada
          </Button>

          {/* Botón Salir → abre calculadora (camuflaje) */}
          <Button
            type="light"
            size="flex"
            iconLeft={
              <Ionicons
                name="calculator-outline"
                size={30}
                color={styles.semanticColors.primary}
              />
            }
            onPress={handleExitCamouflage}
          >
            Salir
          </Button>
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
    </SafeLayout>
  );
}

const layoutStyles = StyleSheet.create({
  container: {
    ...styles.utilities.flex1,
    backgroundColor: styles.semanticColors.surface,
  },
  content: {
    ...styles.utilities.flex1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomBar: {
    flexDirection: "row",
    width: "100%",
    height: "15%",
    backgroundColor: styles.semanticColors.primaryLight,
    paddingHorizontal: styles.spacing.md,
    ...styles.utilities.center,
    gap: styles.spacing.sm,
  },
});
