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

export default function MessageConfigScreen({ navigation }) {
  const handleConfigure = () => {
    navigation.replace("Config");
  };

  const FEATURES = [
    {
      title: "Tamaño de letra",
      description: "Ajusta el texto para una mejor lectura",
      icon: "text",
    },
    {
      title: "Contacto de confianza",
      description: "Guarda un número para emergencias",
      icon: "shield",
    },
    {
      title: "Accesibilidad",
      description:
        "Configura la pantalla y las ayudas visuales según tus necesidades",
      icon: "accessibility",
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
        <AppText variant="body" style={styles.cardDescription}>
          {item.description}
        </AppText>
      </View>
    </View>
  );

  return (
    <SafeLayout>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={[components.iconContainerLarge, styles.iconCircle]}>
            <Ionicons name="settings-sharp" size={32} color={colors.white} />
          </View>
          <AppText variant="h1" style={styles.title}>
            Configuremos tu experiencia
          </AppText>

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
    gap: spacing.md,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.lavender[600],
  },
  title: {
    textAlign: "center",
    marginBottom: spacing.md,
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
    backgroundColor: colors.lavender[600],
    padding: spacing.lg,
    borderRadius: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.lavender[600],
    gap: spacing.md,
    width: "80%",
  },
  principalMessageText: {
    flex: 1,
    textAlign: "center",
    color: colors.lavender[600],
  },
  // Contenedor de slider
  sliderContainer: {
    width: "100%",
    marginBottom: spacing.md,
  },
  // Card de característica
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    flex: 1,
    width: "100%",
  },
  cardContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  cardTitle: {
    marginBottom: spacing.none,
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
