import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import SvgComponent from "../assets/icons/logo.jsx";
import { colors } from "../thema/colors";
import SafeLayout from "../components/Layout/SafeLayout";
import { slideInX, slideInY, animationConfig } from "../styles/animations";

export default function WelcomeOnboardingScreen() {
  const [step, setStep] = useState(0); // 0: mensaje, 1: configuración

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  const handleContinue = () => {
    if (step === 0) {
      // Ir al mensaje de configuración
      setStep(1);
    } else {
      // Ir a la pantalla de configuración
      navigation.replace("Config");
    }
  };

  const handleSkip = () => {
    // Saltar directamente a la app
    navigation.replace("Home");
  };

  return (
    <SafeLayout>
      <View styles={styles.container}>
        {/* Logo siempre visible */}
        <Animated.View
          styles={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <SvgComponent width={100} height={100} />
          <AppText variant="h2" style={styles.appName}>
            Violencia Cero
          </AppText>
        </Animated.View>

        {/* Contenido según el paso */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {step === 0 ? (
            // Primer mensaje: Bienvenida y propósito
            <View style={styles.messageContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="heart" size={40} color={colors.lavender[600]} />
              </View>

              <AppText variant="h1" style={styles.title}>
                💜 Nos tomará solo un momento
              </AppText>

              <AppText variant="body" style={styles.message}>
                Estas preguntas son solo para tu primer ingreso y nos ayudan a
                mejorar la aplicación.
              </AppText>

              <AppText variant="body" style={styles.submessage}>
                No solicitaremos datos personales.
              </AppText>

              <View style={styles.bulletPoints}>
                <View style={styles.bulletItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.lavender[600]}
                  />
                  <AppText variant="body" style={styles.bulletText}>
                    Totalmente anónimo
                  </AppText>
                </View>
                <View style={styles.bulletItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.lavender[600]}
                  />
                  <AppText variant="body" style={styles.bulletText}>
                    Menos de 2 minutos
                  </AppText>
                </View>
                <View style={styles.bulletItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.lavender[600]}
                  />
                  <AppText variant="body" style={styles.bulletText}>
                    Puedes cambiarlo después
                  </AppText>
                </View>
              </View>
            </View>
          ) : (
            // Segundo mensaje: Configuración inicial
            <View style={styles.messageContainer}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name="settings"
                  size={40}
                  color={colors.lavender[600]}
                />
              </View>

              <AppText variant="h1" style={styles.title}>
                ⚙️ Configuremos tu experiencia
              </AppText>

              <AppText variant="body" style={styles.message}>
                Para brindarte una mejor experiencia, te invitamos a configurar:
              </AppText>

              <View style={styles.configItems}>
                <View style={styles.configItem}>
                  <Ionicons
                    name="text"
                    size={24}
                    color={colors.lavender[600]}
                  />
                  <View style={styles.configItemText}>
                    <AppText variant="h4" style={styles.configItemTitle}>
                      Tamaño de letra
                    </AppText>
                    <AppText variant="body" tone="muted">
                      Ajusta el texto para una mejor lectura
                    </AppText>
                  </View>
                </View>

                <View style={styles.configItem}>
                  <Ionicons
                    name="shield"
                    size={24}
                    color={colors.lavender[600]}
                  />
                  <View style={styles.configItemText}>
                    <AppText variant="h4" style={styles.configItemTitle}>
                      Contacto de confianza
                    </AppText>
                    <AppText variant="body" tone="muted">
                      Guarda un número para emergencias
                    </AppText>
                  </View>
                </View>

                <View style={styles.configItem}>
                  <Ionicons
                    name="accessibility"
                    size={24}
                    color={colors.lavender[600]}
                  />
                  <View style={styles.configItemText}>
                    <AppText variant="h4" style={styles.configItemTitle}>
                      Accesibilidad
                    </AppText>
                    <AppText variant="body" tone="muted">
                      Configura TalkBack/VoiceOver
                    </AppText>
                  </View>
                </View>
              </View>

              <View style={styles.noteBox}>
                <Ionicons
                  name="information-circle"
                  size={24}
                  color={colors.lavender[600]}
                />
                <AppText variant="body" style={styles.noteText}>
                  Puedes cambiar estos ajustes en cualquier momento desde el
                  menú de configuración.
                </AppText>
              </View>
            </View>
          )}
        </Animated.View>

        {/* Botones de acción */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Button
            type="primary"
            size="large"
            onPress={handleContinue}
            styles={styles.continueButton}
          >
            {step === 0 ? "Continuar" : "Ir a Configuración"}
          </Button>

          <TouchableOpacity onPress={handleSkip} styles={styles.skipButton}>
            <AppText variant="body" colors="tertiary">
              {step === 0 ? "Omitir mensaje" : "Omitir configuración"}
            </AppText>
          </TouchableOpacity>
        </Animated.View>

        {/* Indicador de pasos */}
        <View style={styles.stepIndicator}>
          <View style={[styles.stepDot, step === 0 && styles.stepDotActive]} />
          <View styles={[styles.stepDot, step === 1 && styles.stepDotActive]} />
        </View>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  appName: {
    marginTop: 10,
    color: colors.lavender[800],
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  messageContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.lavender[50],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 2,
    borderColor: colors.lavender[200],
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: colors.lavender[800],
  },
  message: {
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 24,
  },
  submessage: {
    textAlign: "center",
    color: colors.lavender[600],
    fontWeight: "600",
    marginBottom: 30,
  },
  bulletPoints: {
    width: "100%",
    marginTop: 20,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  bulletText: {
    marginLeft: 12,
    flex: 1,
  },
  configItems: {
    width: "100%",
    marginVertical: 30,
  },
  configItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: colors.lavender[50],
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  configItemText: {
    flex: 1,
    marginLeft: 15,
  },
  configItemTitle: {
    marginBottom: 4,
  },
  noteBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[50],
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lavender[200],
    marginTop: 10,
  },
  noteText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  continueButton: {
    width: "100%",
    marginBottom: 15,
  },
  skipButton: {
    padding: 10,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lavender[300],
    marginHorizontal: 6,
  },
  stepDotActive: {
    width: 16,
    backgroundColor: colors.lavender[600],
  },
});
