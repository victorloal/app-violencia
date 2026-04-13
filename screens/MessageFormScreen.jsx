import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import SafeLayout from "../components/Layout/SafeLayout";
import { components } from "../styles/components";
import { colors } from "../thema/colors";
import { spacing } from "../styles/tokens";

export default function MessageFormScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate("Form");
  };

  return (
    <SafeLayout>
      <View style={styles.container}>
        {/* Contenido principal */}
        <View style={styles.contentContainer}>
          <View style={[components.iconContainerLarge, styles.iconCircle]}>
            <Ionicons name="heart" size={32} color={colors.white} />
          </View>

          <AppText variant="h1" style={styles.title}>
            Nos tomará solo un momento
          </AppText>

          <AppText variant="body" color="secondary" style={styles.message}>
            Estas preguntas son solo para tu primer ingreso.
          </AppText>

          {/* Cards con las características */}
          <View style={styles.cardsContainer}>
            {/* Card 1: Totalmente anónimo */}
            <View style={[components.card, styles.featureCard]}>
              <View style={components.iconContainerSmall}>
                <Ionicons
                  name="eye-off"
                  size={24}
                  color={colors.lavender[600]}
                />
              </View>
              <View style={styles.cardContent}>
                <AppText variant="h4" style={styles.cardTitle}>
                  Totalmente anónimo
                </AppText>
                <AppText variant="body" color="tertiary">
                  No asociamos tus respuestas con tu identidad
                </AppText>
              </View>
            </View>

            {/* Card 2: Menos de 2 minutos */}
            <View style={[components.card, styles.featureCard]}>
              <View style={components.iconContainerSmall}>
                <Ionicons name="time" size={24} color={colors.lavender[600]} />
              </View>
              <View style={styles.cardContent}>
                <AppText variant="h4" style={styles.cardTitle}>
                  Solo sera un momento
                </AppText>
                <AppText variant="body" color="tertiary">
                  Rápido y sencillo de completar
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
            onPress={handleContinue}
            style={styles.continueButton}
          >
            Continuar
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
