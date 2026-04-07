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
import { colors } from "../../thema/colors";
import { linkingService } from "../../services/linkingService";

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
    navigation.navigate("Emergency", { tipo: "emergencia" });
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
            onPress={() => linkingService.sendLocationWhatsApp(phoneNumber)}
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
                name="mail"
                size={30}
                color={styles.semanticColors.primary}
              />
              <AppText variant="caption" bold color="secondary">
                Mensaje
              </AppText>
            </View>
          </Button>

          {/* Botón Llamada (centro - redondo) */}
          <Button
            type="primary"
            size="flex"
            variant="circle"
            onPress={handleCallButtonPress}
            onLongPress={() => linkingService.makePhoneCall(phoneNumber)}
            style={{ height: "100%", width: "100%" }}
            accessibilityLabel="Llamada de emergencia"
            accessibilityHint="Ver lugares de emergencia para realizar una llamada"
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Ionicons
                name="call"
                size={35}
                color={styles.semanticColors.text.inverse}
              />
              <AppText variant="body" bold color="light">
                24/7
              </AppText>
            </View>
          </Button>

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
              <AppText variant="caption" bold color="secondary">
                Camuflaje
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
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    elevation: 100,
  },
  content: {
    flex: 1,
    elevation: 100,
  },
  bottomBar: {
    flexDirection: "row",
    width: "100%",
    height: "15%",
    backgroundColor: colors.lavender[100],
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 100,
    ...styles.shadow.xs,
  },
});
