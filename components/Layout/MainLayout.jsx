import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert, Modal, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../UI/Button";
import AppText from "../UI/AppText";
import SafeLayout from "./SafeLayout";
import styles from "../../styles";
import AppNavbar from "./AppNavbar";
import { SettingsContext } from "../../context/SettingsContext";
import { useNavigation } from "@react-navigation/native";

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
            onPress: () => navigation.replace("Config"),
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
    <SafeLayout scrollable={false}>
      <View style={layoutStyles.container}>
        {/* Navbar superior */}
        <AppNavbar />

        {/* Contenido dinámico */}
        <View style={layoutStyles.content}>{children}</View>

        {/* Barra inferior fija */}
        <View style={layoutStyles.bottomBar}>
          {/* Botón Mensaje (izquierda) */}
          <Button
            type="primaryGhost"
            size="flex"
            onPress={handleMessageButtonPress}
            accessibilityLabel="Enviar mensaje"
            accessibilityHint="Abre la app de mensajes para enviar un SMS a tu contacto de confianza"
          >
            <View
              style={{
                alignItems: "center",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Ionicons
                name="mail-outline"
                size={30}
                color={styles.semanticColors.primary}
              />
              <AppText variant="caption" color="primary">
                Mensaje
              </AppText>
            </View>
          </Button>

          {/* Botón Llamada (centro - redondo) */}
          <Button
            type="primary"
            size="flex"
            variant="circle"
            iconLeft={
              <Ionicons
                name="call"
                size={30}
                color={styles.semanticColors.text.inverse}
              />
            }
            onPress={handleCallButtonPress}
            style={{ height: "100%", width: "100%" }}
            accessibilityLabel="Llamada de emergencia"
            accessibilityHint="Ver lugares de emergencia para realizar una llamada"
          />

          {/* Botón Salir (derecha) */}
          <Button
            type="primaryGhost"
            size="flex"
            onPress={handleExitCamouflage}
            accessibilityLabel="Salir con camuflaje"
            accessibilityHint="Abre una calculadora para ocultar la aplicación"
          >
            <View
              style={{
                alignItems: "center",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Ionicons
                name="calculator"
                size={30}
                color={styles.semanticColors.primary}
              />
              <AppText variant="caption" color="primary">
                Salir
              </AppText>
            </View>
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
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: "15%", // Espacio para la barra inferior fija
  },
  bottomBar: {
    flexDirection: "row",
    width: "100%",
    height: "15%",
    backgroundColor: styles.semanticColors.primary,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    ...styles.shadow.md,
  },
  callButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
