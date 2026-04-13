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
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

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

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % WELCOME_MESSAGES.length;
      setActiveIndex(nextIndex);

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, 4000); // 4 segundos por mensaje

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePress = () => {
    if (onMessageSeen) {
      onMessageSeen();
    } else {
      navigation.replace("MessageConfig");
    }
  };

  const renderItem = ({ item }) => (
    <View style={[screenStyles.slide, { width }]}>
      <View style={[components.card, screenStyles.cardVariant]}>
        <AppText variant="body" style={screenStyles.cardText}>
          {item}
        </AppText>
      </View>
    </View>
  );

  const Pagination = () => (
    <View style={screenStyles.paginationContainer}>
      {WELCOME_MESSAGES.map((_, i) => (
        <View
          key={i}
          style={[
            screenStyles.dot,
            activeIndex === i && screenStyles.activeDot,
          ]}
        />
      ))}
    </View>
  );

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
        <FlatList
          ref={flatListRef}
          data={WELCOME_MESSAGES}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          keyExtractor={(_, index) => index.toString()}
        />
        <Pagination />
      </Animated.View>

      <Animated.View
        style={[screenStyles.buttonContainer, slideInX(buttonAnim)]}
        accessible={true}
        accessibilityLabel="Comenzar"
        accessibilityRole="button"
      >
        <Button type="inversePrimary" onPress={handlePress} size="xl">
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
  slide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: styles.spacing.md,
  },
  cardVariant: {
    width: "100%",
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  cardText: {
    color: "#743688",
    textAlign: "center",
    paddingHorizontal: styles.spacing.lg,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: styles.spacing.md,
    gap: styles.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  activeDot: {
    backgroundColor: colors.white,
    width: 24, // Efecto pill para el activo
  },
  buttonContainer: {
    width: "90%",
    marginTop: styles.spacing.xl,
  },
});
