import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import SvgComponent from "../assets/icons/logo.jsx";
import { colors } from "../thema/colors";
import SafeLayout from "../components/Layout/SafeLayout";

export default function MessageFormScreen({ navigation }) {
  const handleConfigure = () => {
    navigation.replace("Form");
  };

  const handleSkip = () => {
    navigation.replace("Form");
  };

  return (
    <SafeLayout>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <SvgComponent width={100} height={100} />
          <AppText variant="h2" style={styles.appName}>
            Violencia Cero
          </AppText>
        </View>

        {/* Contenido principal */}
        <View style={styles.contentContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="settings" size={50} color={colors.lavender[600]} />
          </View>

          <AppText variant="h1" style={styles.title}>
            ⚙️ Configuremos tu experiencia
          </AppText>

          <AppText variant="body" style={styles.message}>
            Para brindarte una mejor experiencia, te invitamos a configurar:
          </AppText>

          <View style={styles.configItems}>
            <View style={styles.configItem}>
              <Ionicons name="text" size={28} color={colors.lavender[600]} />
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
              <Ionicons name="shield" size={28} color={colors.lavender[600]} />
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
                size={28}
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
              Puedes cambiar estos ajustes en cualquier momento desde el menú de
              configuración.
            </AppText>
          </View>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <Button
            type="primary"
            size="large"
            onPress={handleConfigure}
            style={styles.configureButton}
          >
            Ir a Configuración
          </Button>

          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <AppText variant="body" color="tertiary">
              Omitir por ahora
            </AppText>
          </TouchableOpacity>
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
    paddingHorizontal: 10,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.lavender[50],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 2,
    borderColor: colors.lavender[200],
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: colors.lavender[800],
  },
  message: {
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 24,
  },
  configItems: {
    width: "100%",
    marginBottom: 25,
  },
  configItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
    marginTop: 5,
  },
  noteText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  configureButton: {
    width: "100%",
    marginBottom: 15,
  },
  skipButton: {
    padding: 10,
  },
});
