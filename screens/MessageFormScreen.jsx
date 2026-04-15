import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import SafeLayout from "../components/Layout/SafeLayout";
import { components } from "../styles/components";
import { colors } from "../thema/colors";
import { spacing } from "../styles/tokens";

import AppSlider from "../components/UI/AppSlider";

export default function MessageFormScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate("Form");
  };

  const FEATURES = [
    {
      title: "Totalmente anónimo",
      description: "No asociamos tus respuestas con tu identidad",
      icon: "eye-off",
    },
    {
      title: "Solo sera un momento",
      description: "Rápido y sencillo de completar",
      icon: "time",
    },
  ];

  const renderFeatureCard = ({ item }) => (
    <View style={[components.card, styles.featureCard]}>
      <View style={components.iconContainerSmall}>
        <Ionicons name={item.icon} size={24} color={colors.lavender[600]} />
      </View>
      <View style={styles.cardContent}>
        <AppText variant="h4" style={styles.cardTitle}>
          {item.title}
        </AppText>
        <AppText variant="body" color="tertiary" style={styles.cardDescription}>
          {item.description}
        </AppText>
      </View>
    </View>
  );

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

          {/* Cards con las características */}
          <View style={styles.sliderContainer}>
            <AppSlider
              data={FEATURES}
              renderItem={renderFeatureCard}
              dotColor={colors.lavender[200]}
              activeDotColor={colors.lavender[600]}
              autoplay={true}
            />
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
    color: colors.lavender[600],
  },
  message: {
    marginBottom: spacing.xl,
    lineHeight: 24,
    paddingHorizontal: spacing.sm,
    color: colors.neutral[600],
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
  // Contenedor de slider
  sliderContainer: {
    width: "100%",
    marginTop: spacing.md,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
  },
  cardContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  cardTitle: {
    marginBottom: spacing.xs,
  },
  cardDescription: {
    color: colors.neutral[600],
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
