import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import SvgComponent from "../assets/icons/logo.jsx";
import styles from "../styles";
import { components } from "../styles/components";
import CenteredLayout from "../components/Layout/CenteredLayout";
import { slideInX, animationConfig } from "../styles/animations";

export default function WelcomeScreen({ navigation, route }) {
  const { onMessageSeen } = route.params || {};

  // Animaciones para cada elemento
  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const message1Anim = useRef(new Animated.Value(0)).current;
  const message2Anim = useRef(new Animated.Value(0)).current;
  const message3Anim = useRef(new Animated.Value(0)).current;
  const message4Anim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const config = animationConfig.stagger;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoAnim, { ...config, toValue: 1 }),
        Animated.timing(titleAnim, { ...config, toValue: 1 }),
      ]),
      Animated.timing(message1Anim, { ...config, toValue: 1 }),
      Animated.timing(message2Anim, { ...config, toValue: 1 }),
      Animated.timing(message3Anim, { ...config, toValue: 1 }),
      Animated.timing(message4Anim, { ...config, toValue: 1 }),
      Animated.timing(buttonAnim, { ...config, toValue: 1 }),
    ]).start();
  }, [
    buttonAnim,
    logoAnim,
    message1Anim,
    message2Anim,
    message3Anim,
    message4Anim,
    titleAnim,
  ]);

  const handlePress = () => {
    if (onMessageSeen) {
      onMessageSeen();
    } else {
      navigation.replace("MessageConfig");
    }
  };

  // Estilos de animación importados de styles/animations.js

  return (
    <CenteredLayout>
      {/* Logo principal */}
      <Animated.View
        style={[screenStyles.logoContainer, slideInX(logoAnim)]}
        accessible={true}
        accessibilityLabel="Logo de la aplicación"
        accessibilityRole="image"
        accessibilityHint="Logo de la aplicación"
      >
        <SvgComponent width={100} height={100} />
        <AppText variant="h1" style={screenStyles.appName} accessible={false}>
          Nombre de la app
        </AppText>
      </Animated.View>

      <Animated.View
        style={[
          components.card,
          screenStyles.cardVariant,
          slideInX(message1Anim),
        ]}
        accessible={true}
        accessibilityLabel="Este espacio es seguro y confidencial"
        accessibilityRole="text"
      >
        <AppText variant="h3" style={screenStyles.cardText} accessible={false}>
          Este espacio es seguro y confidencial.
        </AppText>
      </Animated.View>

      <Animated.View
        style={[
          components.card,
          screenStyles.cardVariant,
          slideInX(message2Anim),
        ]}
        accessible={true}
        accessibilityLabel="Te orientamos en rutas de atención frente a violencias contra las mujeres"
        accessibilityRole="text"
      >
        <AppText variant="h3" style={screenStyles.cardText} accessible={false}>
          Te orientamos en rutas de atención frente a violencias contra las
          mujeres.
        </AppText>
      </Animated.View>

      <Animated.View
        style={[
          components.card,
          screenStyles.cardVariant,
          slideInX(message3Anim),
        ]}
        accessible={true}
        accessibilityLabel="Aquí puedes informarte y buscar apoyo"
        accessibilityRole="text"
      >
        <AppText variant="h3" style={screenStyles.cardText} accessible={false}>
          Aquí puedes informarte y buscar apoyo.
        </AppText>
      </Animated.View>

      <Animated.View
        style={[
          components.card,
          screenStyles.cardVariant,
          slideInX(message4Anim),
        ]}
        accessible={true}
        accessibilityLabel="Tu autonomía, decisión y elección es lo más importante"
        accessibilityRole="text"
      >
        <AppText variant="h3" style={screenStyles.cardText} accessible={false}>
          Tu autonomía, decisión y elección es lo más importante.
        </AppText>
      </Animated.View>

      {/* Botón para continuar */}
      <Animated.View
        style={[screenStyles.buttonContainer, slideInX(buttonAnim)]}
        accessible={true}
        accessibilityLabel="Comenzar"
        accessibilityRole="button"
      >
        <Button type="primary" onPress={handlePress} size="xl">
          Comenzar
        </Button>
      </Animated.View>
    </CenteredLayout>
  );
}

const screenStyles = StyleSheet.create({
  logoContainer: {
    marginBottom: styles.spacing.sm,
    alignItems: "center",
  },
  nameContainer: {
    alignItems: "center",
    marginBottom: styles.spacing.xxxl,
  },
  appName: {
    textAlign: "center",
    color: styles.semanticColors.text.primary,
  },
  cardVariant: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: styles.spacing.md,
    marginHorizontal: styles.spacing.md,
  },
  cardText: {
    flex: 1,
    color: styles.semanticColors.text.secondary,
    textAlign: "center",
  },
  buttonContainer: {
    width: "90%",
    marginTop: styles.spacing.md,
  },
});
