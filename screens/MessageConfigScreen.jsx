import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import SvgComponent from "../assets/icons/logo.jsx";
import { colors } from "../thema/colors";
import SafeLayout from "../components/Layout/SafeLayout";

export default function MessageConfigScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate("Config");
  };

  const handleSkip = () => {
    navigation.replace("Config");
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
            <Ionicons name="heart" size={50} color={colors.lavender[600]} />
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

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <Button
            type="primary"
            size="large"
            onPress={handleContinue}
            style={styles.continueButton}
          >
            Continuar
          </Button>

          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <AppText variant="body" color="tertiary">
              Omitir
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
    alignItems: "center",
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
    marginTop: 10,
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
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  continueButton: {
    width: "100%",
    marginBottom: 15,
  },
  skipButton: {
    padding: 10,
  },
});
