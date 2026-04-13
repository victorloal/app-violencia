import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Modal,
  Linking,
  AppState,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../UI/Button";
import AppText from "../UI/AppText";
import SafeLayout from "./SafeLayout";
import styles from "../../styles";
import AppNavbar from "./AppNavbar";
import { SettingsContext } from "../../context/SettingsContext";
import { useNavigation } from "@react-navigation/native";
import AppTutorial from "../UI/AppTutorial";

import CalculatorScreen from "../../screens/CalculatorScreen";
import { colors } from "../../thema/colors";
import { linkingService } from "../../services/linkingService";
import Call24 from "../../assets/icons/Call24";

export default function MainLayout({ children }) {
  const { isCamouflageOn, setIsCamouflageOn, phoneNumber } =
    useContext(SettingsContext);
  const navigation = useNavigation();
  const [isTutorialDemo, setIsTutorialDemo] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  // Listener para ocultar contenido en iOS (App Switcher)
  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setIsInactive(nextAppState === "inactive");
    });
    return () => subscription.remove();
  }, []);

  // Abre la calculadora (activa camuflaje en contexto)
  const handleExitCamouflage = () => {
    setIsCamouflageOn(true);
  };

  // Long-press en "=" dentro de la calculadora → vuelve a la app
  const handleUnlock = () => {
    setIsCamouflageOn(false);
    setIsTutorialDemo(false);
  };

  // Para demo del tutorial
  const handleOpenCalcDemo = () => {
    setIsTutorialDemo(true);
    setIsCamouflageOn(true);
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
            style={{ elevation:0 }}
            onPress={() => linkingService.sendLocationWhatsApp(phoneNumber)}
            accessibilityLabel="Enviar mensaje"
            accessibilityHint="Abre la app de mensajes para enviar un SMS a tu contacto de confianza"
          >
            <View style={layoutStyles.btnContent}>
              <Ionicons
                name="logo-whatsapp"
                size={30}
                color={styles.semanticColors.primary}
              />
              <AppText variant="body" bold color="secondary">
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
            style={{ height: "100%", width: "100%", elevation:4 }}
            accessibilityLabel="Llamada de emergencia"
            accessibilityHint="Ver lugares de emergencia para realizar una llamada"
          >
            <View
              style={[
                layoutStyles.btnContent,
                { height: "100%", width: "100%" },
              ]}
            >
              <Call24
                width={45}
                height={45}
                fill={styles.semanticColors.text.inverse}
              />
              {/* <AppText variant="body" bold color="light">
                24/7
              </AppText> */}
            </View>
          </Button>

          {/* Botón Salir (derecha) */}
          <Button
            type="primaryGhost"
            size="flex"
            onPress={handleExitCamouflage}
            style={{ elevation:0 }}
            accessibilityLabel="Salir con camuflaje"
            accessibilityHint="Abre una calculadora para ocultar la aplicación"
          >
            <View style={layoutStyles.btnContent}>
              <Ionicons
                name="calculator"
                size={30}
                color={styles.semanticColors.primary}
              />
              <AppText variant="body" bold color="secondary">
                Camuflaje
              </AppText>
            </View>
          </Button>
        </View>
      </View>

      {/* ── Tutorial de primera vez ── */}
      <AppTutorial
        onOpenCalcDemo={handleOpenCalcDemo}
        isTutorialDemo={isTutorialDemo}
      />

      {/* ── Calculadora en Modal de pantalla completa ── */}
      <Modal
        visible={isCamouflageOn}
        animationType="slide"
        presentationStyle="fullScreen"
        statusBarTranslucent
        onRequestClose={() => {}}
      >
        <CalculatorScreen onUnlock={handleUnlock} isTutorial={isTutorialDemo} />
      </Modal>

      {/* ── Overlay de Privacidad (para iOS App Switcher) ── */}
      {isInactive && (
        <View style={StyleSheet.absoluteFill}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: colors.lavender[50],
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              },
            ]}
          >
            <Ionicons
              name="shield-checkmark"
              size={80}
              color={colors.lavender[600]}
            />
          </View>
        </View>
      )}
    </SafeLayout>
  );
}

const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    alignContent: "center",
    elevation: 100,
  },
  content: {
    flex: 1,
    width: "100%",
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
  btnContent: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
});
