import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { View, StyleSheet, Modal, AppState } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CopilotStep, walkthroughable, useCopilot } from "react-native-copilot";
import Button from "../UI/Button";
import AppText from "../UI/AppText";
import SafeLayout from "./SafeLayout";
import styles from "../../styles";
import AppNavbar from "./AppNavbar";
import { SettingsContext } from "../../context/SettingsContext";
import { useNavigation } from "@react-navigation/native";
import { useTutorialAutoStart } from "../UI/AppTutorial";
import { useTutorialContext } from "../../context/TutorialContext";
import CalculatorScreen from "../../screens/CalculatorScreen";
import { colors } from "../../thema/colors";
import { linkingService } from "../../services/linkingService";
import Call24 from "../../assets/icons/Call24";
import { Animated } from "react-native";

const WalkthroughView = walkthroughable(View);

export const TUTORIAL_STEPS = {
  bienvenida: {
    order: 1,
    name: "hand-left-outline:bienvenida",
    text: "Bienvenida a Perla|Te mostramos cómo usar las funciones principales en pocos pasos. Puedes cerrar este tutorial en cualquier momento.",
  },
  ajustes: {
    order: 2,
    name: "settings-outline:ajustes",
    text: "Ajustes|Toca el ícono de engranaje para configurar la app: tamaño de letra, accesibilidad, contraste y el número de tu contacto de emergencia.",
  },
  mensaje: {
    order: 3,
    name: "logo-whatsapp:mensaje",
    text: "Botón Mensaje|Envía tu ubicación por WhatsApp a tu contacto de confianza con un solo toque. Úsalo cuando necesites que alguien sepa dónde estás.",
  },
  llamada: {
    order: 4,
    name: "call-outline:llamada",
    text: "Botón 24/7|Accede a los centros de atención de emergencia. Mantén presionado para llamar directamente a tu contacto de confianza.",
  },
  camuflaje: {
    order: 5,
    name: "calculator-outline:camuflaje",
    text: "Botón Camuflaje|Ahora verás la calculadora en acción. Pruébala y cuando quieras volver, mantén presionado el botón '=' durante 1 segundo.",
  },
  carrusel: {
    order: 6,
    name: "apps-outline:carrusel",
    text: "Carrusel de violencias|Desliza las tarjetas para conocer los tipos de violencia. En cada una puedes ver más información y solicitar ayuda.",
  },
};

export default function MainLayout({ children }) {
  const { isCamouflageOn, setIsCamouflageOn, phoneNumber } =
    useContext(SettingsContext);
  const navigation = useNavigation();
  const { goToNext } = useCopilot();
  const { openCalcDemoRef, setTutorialActive, markTutorialCompleted } =
    useTutorialContext();

  const [isTutorialDemo, setIsTutorialDemo] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  useTutorialAutoStart();

  // Registra la función para que App.js pueda abrirla desde onStepChange
  const openCalcDemo = useCallback(() => {
    setIsTutorialDemo(true);
    setIsCamouflageOn(true);
  }, [setIsCamouflageOn]);

  useEffect(() => {
    openCalcDemoRef.current = openCalcDemo;
    return () => {
      openCalcDemoRef.current = null;
    };
  }, [openCalcDemo, openCalcDemoRef]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setIsInactive(nextAppState === "inactive");
    });
    return () => subscription?.remove();
  }, []);

  const handleExitCamouflage = () => {
    setIsTutorialDemo(false);
    setIsCamouflageOn(true);
  };

  const handleUnlock = () => {
    const wasDemo = isTutorialDemo;

    // 1. Primero actualizamos el estado local
    setIsTutorialDemo(false);
    setIsCamouflageOn(false);

    if (wasDemo) {
      // 2. Esperamos a que el Modal termine de desmontarse en Android
      //    y a que HomeScreen re-pinte sus elementos antes de goToNext.
      //    Dos requestAnimationFrame + 300ms es suficiente en la mayoría de dispositivos.
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            goToNext();
          });
        });
      }, 350);
    }
  };

  const handleCallButtonPress = () =>
    navigation.navigate("Emergency", { tipo: "emergencia" });
  // Animación para el botón de llamada
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;

  // Efecto de pulso continuo para llamar la atención
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  // Efecto de anillo/sombra pulsante
  useEffect(() => {
    const ring = Animated.loop(
      Animated.sequence([
        Animated.timing(ringAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(ringAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }),
      ]),
    );
    ring.start();

    return () => ring.stop();
  }, []);
  // Interpolación para el efecto de anillo
  const ringScale = ringAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.15, 1],
  });

  const ringOpacity = ringAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.1, 0.3],
  });
  return (
    <SafeLayout scrollable={false}>
      <View style={layoutStyles.container}>
        <AppNavbar
          bienvenidaStep={TUTORIAL_STEPS.bienvenida}
          ajustesStep={TUTORIAL_STEPS.ajustes}
        />

        <View style={layoutStyles.content}>{children}</View>

        <View style={layoutStyles.bottomBar}>
          {/* Paso 3: Mensaje */}
          <CopilotStep {...TUTORIAL_STEPS.mensaje}>
            <WalkthroughView style={layoutStyles.btnWrapper}>
              <Button
                type="primaryGhost"
                size="flex"
                style={{ elevation: 0 }}
                onPress={() => linkingService.sendLocationWhatsApp(phoneNumber)}
                accessibilityLabel="Enviar mensaje"
                accessibilityHint="Abre WhatsApp para enviar tu ubicación a tu contacto de confianza"
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
            </WalkthroughView>
          </CopilotStep>

          {/* Paso 4: Llamada */}
          <CopilotStep {...TUTORIAL_STEPS.llamada}>
            <WalkthroughView style={layoutStyles.btnWrapper}>
              <Animated.View
                style={{
                  position: "absolute",
                  height: "80%",
                  aspectRatio: 1,
                  backgroundColor: styles.semanticColors.primary,
                  borderRadius: 100,
                  transform: [{ scale: ringScale }],
                  opacity: ringOpacity,
                }}
              />
              <Animated.View
                style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                transform: [{ scale: pulseAnim }]}}
              >
                <Button
                  type="primary"
                  size="flex"
                  variant="circle"
                  onPress={handleCallButtonPress}
                  onLongPress={() => linkingService.makePhoneCall(phoneNumber)}
                  style={{ height: "100%", width: "100%", elevation: 4 }}
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
                  </View>
                </Button>
              </Animated.View>
            </WalkthroughView>
          </CopilotStep>

          {/* Paso 5: Camuflaje */}
          <CopilotStep {...TUTORIAL_STEPS.camuflaje}>
            <WalkthroughView style={layoutStyles.btnWrapper}>
              <Button
                type="primaryGhost"
                size="flex"
                onPress={handleExitCamouflage}
                style={{ elevation: 0 }}
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
            </WalkthroughView>
          </CopilotStep>
        </View>
      </View>

      {/* Calculadora — isTutorial=true suprime el modal de instrucciones interno */}
      <Modal
        visible={isCamouflageOn}
        animationType="slide"
        presentationStyle="fullScreen"
        statusBarTranslucent={true}
        onRequestClose={() => {}}
      >
        <CalculatorScreen onUnlock={handleUnlock} isTutorial={isTutorialDemo} />
      </Modal>

      {/* Overlay privacidad iOS App Switcher */}
      {isInactive && (
        <View style={[StyleSheet.absoluteFill, layoutStyles.privacyOverlay]}>
          <Ionicons
            name="shield-checkmark"
            size={80}
            color={colors.lavender[600]}
          />
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
  btnWrapper: {
    flex: 1,
    height: "100%",
  },
  btnContent: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  privacyOverlay: {
    backgroundColor: colors.lavender[50],
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
