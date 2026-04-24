import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Animated,
  FlatList,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import AppSlider from "../components/UI/AppSlider";
import SvgComponent from "../assets/icons/logo.jsx";
import styles from "../styles";
import { components } from "../styles/components";
import SafeLayout from "../components/Layout/SafeLayout";
import { slideInX, animationConfig } from "../styles/animations";
import { colors } from "../thema/colors";
import Cintilla from "../assets/icons/cintilla";

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
    <SafeLayout style={{ backgroundColor: "#743688" }} scrollable={false}>
      <ScrollView
        contentContainerStyle={screenStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
        <Animated.View
          style={[screenStyles.sliderWrapper, slideInX(sliderAnim)]}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel="Mensajes de bienvenida"
        >
          <AppSlider
            data={WELCOME_MESSAGES}
            textStyle={screenStyles.cardText}
          />
        </Animated.View>
        <Animated.View
          style={[screenStyles.buttonContainer, slideInX(buttonAnim)]}
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        >
          <View style={screenStyles.cintillaCard}>
            <Cintilla
              width="100%"
              height="220px"
              preserveAspectRatio="xMidYMidMeet"
            />
          </View>
        </Animated.View>
        <Animated.View
          style={[screenStyles.buttonContainer, slideInX(buttonAnim)]}
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        >
          <Button
            type="inversePrimary"
            onPress={handlePress}
            size="xl"
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Comenzar"
            accessibilityHint="Avanza a la configuración inicial de la aplicación"
          >
            Comenzar
          </Button>
        </Animated.View>
      </ScrollView>
    </SafeLayout>
  );
}

const screenStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: styles.spacing.xl,
  },
  logoContainer: {
    marginBottom: styles.spacing.xl,
    alignItems: "center",
  },
  sliderWrapper: {
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
  cintillaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: styles.borderRadius.xl,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
