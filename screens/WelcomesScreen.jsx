import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Animated,
  FlatList,
  View,
  useWindowDimensions,
} from "react-native";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import AppSlider from "../components/UI/AppSlider";
import SvgComponent from "../assets/icons/logo.jsx";
import styles from "../styles";
import { components } from "../styles/components";
import CenteredLayout from "../components/Layout/CenteredLayout";
import { slideInX, animationConfig } from "../styles/animations";
import { colors } from "../thema/colors";

const WELCOME_MESSAGES = [
  "Este espacio es seguro y confidencial.",
  "Te orientamos en rutas de atención frente a violencias contra las mujeres.",
  "Aquí puedes informarte y buscar apoyo.",
  "Tu autonomía, decisión y elección es lo más importante.",
];

export default function WelcomeScreen({ navigation, route }) {
  const { onMessageSeen } = route.params || {};
  const { width } = useWindowDimensions();

  // Animaciones para cada elemento principal
  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const sliderAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const config = animationConfig.stagger;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoAnim, { ...config, toValue: 1 }),
        Animated.timing(titleAnim, { ...config, toValue: 1 }),
      ]),
      Animated.timing(sliderAnim, { ...config, toValue: 1 }),
      Animated.timing(buttonAnim, { ...config, toValue: 1 }),
    ]).start();
  }, []);

  const handlePress = () => {
    if (onMessageSeen) {
      onMessageSeen();
    } else {
      navigation.replace("MessageConfig");
    }
  };

  return (
    <CenteredLayout style={{ backgroundColor: "#743688" }}>
      {/* Logo principal */}
      <Animated.View
        style={[screenStyles.logoContainer, slideInX(logoAnim)]}
        accessible={true}
        accessibilityLabel="Logo de la aplicación"
        accessibilityRole="image"
        accessibilityHint="Logo de la aplicación"
      >
        <SvgComponent width={300} height={300} />
      </Animated.View>

      {/* Slider de mensajes */}
      <Animated.View style={[screenStyles.sliderWrapper, slideInX(sliderAnim)]}>
        <AppSlider data={WELCOME_MESSAGES} textStyle={screenStyles.cardText} />
      </Animated.View>

      <Animated.View
        style={[screenStyles.buttonContainer, slideInX(buttonAnim)]}
        accessible={true}
        accessibilityLabel="Comenzar"
        accessibilityRole="button"
      >
        <Button
          type="inversePrimary"
          onPress={handlePress}
          size="xl"
          accessible={false}
        >
          Comenzar
        </Button>
      </Animated.View>
    </CenteredLayout>
  );
}

const screenStyles = StyleSheet.create({
  logoContainer: {
    marginBottom: styles.spacing.xl,
    alignItems: "center",
  },
  sliderWrapper: {
    height: 180,
    width: "100%",
  },
  cardText: {
    color: "#743688",
    textAlign: "center",
    paddingHorizontal: styles.spacing.lg,
  },
  buttonContainer: {
    width: "90%",
    marginTop: styles.spacing.xl,
  },
});
