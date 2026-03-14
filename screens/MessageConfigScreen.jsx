import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import SafeLayout from "../components/Layout/SafeLayout";
import { components } from "../styles/components";
import { colors } from "../thema/colors";
import { spacing } from "../styles/tokens";

export default function MessageConfigScreen({ navigation }) {
  const handleConfigure = () => {
    navigation.replace("Config");
  };

  return (
    <SafeLayout>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={[components.iconContainerLarge, styles.iconCircle]}>
            <AppText variant="h1">⚙️</AppText>
          </View>
          <AppText variant="h1" style={styles.title}>
            Configuremos tu experiencia
          </AppText>
          <AppText variant="body" color="secondary" style={styles.message}>
            Te invitamos a configurar tu experiencia en la app
          </AppText>

          {/* Cards usando los estilos de components.js */}
          <View style={styles.cardsContainer}>
            {/* Card Tamaño de letra */}
            <View style={[components.card, styles.featureCard]}>
              <View style={components.iconContainerSmall}>
                <Ionicons name="text" size={24} color={colors.lavender[600]} />
              </View>
              <View style={styles.cardContent}>
                <AppText variant="h4" style={styles.cardTitle}>
                  Tamaño de letra
                </AppText>
                <AppText variant="body" color="secondary">
                  Ajusta el texto para una mejor lectura
                </AppText>
              </View>
            </View>

            {/* Card Contacto de confianza */}
            <View style={[components.card, styles.featureCard]}>
              <View style={components.iconContainerSmall}>
                <Ionicons
                  name="shield"
                  size={24}
                  color={colors.lavender[600]}
                />
              </View>
              <View style={styles.cardContent}>
                <AppText variant="h4" style={styles.cardTitle}>
                  Contacto de confianza
                </AppText>
                <AppText variant="body" color="secondary">
                  Guarda un número para emergencias
                </AppText>
              </View>
            </View>

            {/* Card Accesibilidad */}
            <View style={[components.card, styles.featureCard]}>
              <View style={components.iconContainerSmall}>
                <Ionicons
                  name="accessibility"
                  size={24}
                  color={colors.lavender[600]}
                />
              </View>
              <View style={styles.cardContent}>
                <AppText variant="h4" style={styles.cardTitle}>
                  Accesibilidad
                </AppText>
                <AppText variant="body" color="secondary">
                  Configura TalkBack/VoiceOver
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Botón */}
        <View style={styles.buttonContainer}>
          <Button
            type="primary"
            size="large"
            onPress={handleConfigure}
            style={styles.continueButton}
          >
            Ir a Configuración
          </Button>
        </View>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.lavender[200],
  },
  title: {
    textAlign: "center",
    marginBottom: spacing.md,
    color: colors.lavender[800],
  },
  message: {
    marginBottom: spacing.xl,
    lineHeight: 24,
    paddingHorizontal: spacing.sm,
  },
  // Mensaje principal destacado
  principalMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[100],
    padding: spacing.lg,
    borderRadius: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.lavender[400],
    gap: spacing.md,
    width: "100%",
  },
  principalMessageText: {
    flex: 1,
    textAlign: "center",
    color: colors.lavender[800],
  },
  // Contenedor de cards
  cardsContainer: {
    width: "100%",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  // Card de característica
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    marginBottom: 0, // Usamos gap del contenedor
  },
  cardContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  cardTitle: {
    marginBottom: spacing.xxs,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: spacing.md,
  },
  continueButton: {
    width: "100%",
  },
});
