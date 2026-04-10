// components/UI/AppTutorial.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";
import Button from "./Button";
import { colors } from "../../thema/colors";

const { width, height } = Dimensions.get("window");
const TUTORIAL_KEY = "sorora_tutorial_done";

// ── Pasos del tutorial ────────────────────────────────────────────
// spotlightX / spotlightY: centro del elemento a destacar
// tooltipSide: "center" | "top" | "bottom"
const STEPS = [
  {
    id: 1,
    icon: "hand-left-outline",
    title: "Bienvenida a Perla",
    description:
      "Te mostramos cómo usar las funciones principales de la app en pocos pasos. Puedes cerrar este tutorial en cualquier momento.",
    tooltipSide: "center",
    spotlightX: null,
    spotlightY: null,
  },
  {
    id: 2,
    icon: "settings-outline",
    title: "Ajustes",
    description:
      "Toca el ícono de engranaje para configurar la app: tamaño de letra, accesibilidad, contraste y el número de tu contacto de emergencia.",
    tooltipSide: "bottom",
    spotlightX: width - 80,       
    spotlightY: height * 0.088,   
  },
  {
    id: 3,
    icon: "mail-outline",
    title: "Botón Mensaje",
    description:
      "Envía tu ubicación por WhatsApp a tu contacto de confianza con un solo toque. Úsalo cuando necesites que alguien sepa dónde estás.",
    tooltipSide: "top",
    spotlightX: width * 0.175,
    spotlightY: height - height * 0.068,
  },
  {
    id: 4,
    icon: "call-outline",
    title: "Botón 24/7",
    description:
      "Accede a los centros de atención de emergencia. Mantén presionado para llamar directamente a tu contacto de confianza.",
    tooltipSide: "top",
    spotlightX: width * 0.5,
    spotlightY: height - height * 0.072,
  },
  {
    id: 5,
    icon: "calculator-outline",
    title: "Botón Camuflaje",
    description:
      "Oculta la app convirtiéndola en una calculadora. Para volver, mantén presionado el botón '=' de la calculadora.",
    tooltipSide: "top",
    spotlightX: width * 0.825,
    spotlightY: height - height * 0.068,
    hasDemo: true,
  },
  {
    id: 6,
    icon: "apps-outline",
    title: "Carrusel de violencias",
    description:
      "Desliza las tarjetas para conocer los tipos de violencia. En cada una puedes ver más información y solicitar ayuda.",
    tooltipSide: "bottom",
    spotlightX: width * 0.5,
    spotlightY: height * 0.45,
  },
];

export default function AppTutorial({ onDone, onOpenCalcDemo, isTutorialDemo }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep]       = useState(0);
  const fadeAnim              = useRef(new Animated.Value(0)).current;
  const scaleAnim             = useRef(new Animated.Value(0.88)).current;

  // Solo mostrar la primera vez
  useEffect(() => {
    AsyncStorage.getItem(TUTORIAL_KEY).then((done) => {
      if (!done) setVisible(true);
    });
  }, []);

  // Animación de entrada al cambiar paso
  useEffect(() => {
    if (!visible) return;
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.88);
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 240, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 7,   useNativeDriver: true }),
    ]).start();
  }, [step, visible]);

  // Cuando termina la demo de calculadora, continuar al siguiente paso
  useEffect(() => {
    if (isTutorialDemo === false && step === 4) {
      // Volvió de la calculadora, mostrar tutorial nuevamente y continuar
      setStep((s) => s + 1);
      setVisible(true);
    }
  }, [isTutorialDemo]);

  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;

  // Si tutorial demo está activo, ocultar el modal principal
  if (isTutorialDemo) {
    return null;
  }

  const handleNext = () => {
    // Si es el paso con demo de calculadora, abrir calculadora
    if (current.hasDemo && onOpenCalcDemo) {
      setVisible(false);
      onOpenCalcDemo();
      return;
    }

    if (isLast) handleClose();
    else setStep((s) => s + 1);
  };

  const handleClose = async () => {
    await AsyncStorage.setItem(TUTORIAL_KEY, "true");
    setVisible(false);
    onDone?.();
  };

  if (!visible) return null;

  // ── Posición del tooltip ─────────────────────────────────────────
  const tooltipStyle = (() => {
    switch (current.tooltipSide) {
      case "center":
        return { top: height * 0.28, left: 20, right: 20 };
      case "top":
        // Tooltip encima de la barra inferior
        return { bottom: height * 0.19, left: 20, right: 20 };
      case "bottom":
      default:
        // Tooltip debajo del elemento (navbar o carrusel)
        return { top: height * 0.14, left: 20, right: 20 };
    }
  })();

  // ── Flecha del tooltip ───────────────────────────────────────────
  const arrowEl = (() => {
    if (!current.spotlightX || current.tooltipSide === "center") return null;

    // Clamp para que la flecha no salga de la tarjeta
    const cardLeft   = 20;
    const cardRight  = width - 20;
    const cardWidth  = cardRight - cardLeft;
    const rawLeft    = current.spotlightX - cardLeft - 12;
    const clampedLeft = Math.max(16, Math.min(cardWidth - 40, rawLeft));

    if (current.tooltipSide === "top") {
      // Flecha apunta hacia abajo (hacia la barra inferior)
      return (
        <View style={[arrowStyles.base, arrowStyles.down, { left: clampedLeft }]} />
      );
    }
    // Flecha apunta hacia arriba (hacia navbar o carrusel)
    return (
      <View style={[arrowStyles.base, arrowStyles.up, { left: clampedLeft }]} />
    );
  })();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={tutStyles.overlay}>

        {/* Spotlight circular */}
        {current.spotlightX && current.spotlightY && (
          <View
            pointerEvents="none"
            style={[
              tutStyles.spotlight,
              {
                left:   current.spotlightX - 44,
                top:    current.spotlightY - 44,
                width:  88,
                height: 88,
              },
            ]}
          />
        )}

        {/* Tooltip */}
        <Animated.View
          style={[
            tutStyles.tooltip,
            tooltipStyle,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          {/* Flecha */}
          {arrowEl}

          {/* Cabecera */}
          <View style={tutStyles.header}>
            <View style={tutStyles.iconWrap}>
              <Ionicons name={current.icon} size={20} color={colors.lavender[700]} />
            </View>
            <AppText variant="h3" bold style={tutStyles.title}>
              {current.title}
            </AppText>
            <TouchableOpacity
              onPress={handleClose}
              style={tutStyles.closeBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={18} color={colors.neutral[500]} />
            </TouchableOpacity>
          </View>

          {/* Descripción */}
          <AppText variant="body" style={tutStyles.desc}>
            {current.description}
          </AppText>

          {/* Puntos de progreso */}
          <View style={tutStyles.dots}>
            {STEPS.map((_, i) => (
              <View
                key={i}
                style={[
                  tutStyles.dot,
                  i === step && tutStyles.dotActive,
                  i < step  && tutStyles.dotDone,
                ]}
              />
            ))}
          </View>

          {/* Acciones */}
          <View style={tutStyles.actions}>
            <TouchableOpacity onPress={handleClose} style={tutStyles.skipBtn}>
              <AppText variant="caption" style={tutStyles.skipText}>
                Saltar tutorial
              </AppText>
            </TouchableOpacity>

            <Button type="primary" size="md" onPress={handleNext} style={tutStyles.nextBtn}>
              <View style={tutStyles.nextContent}>
                <AppText variant="body" bold color="light">
                  {current.hasDemo ? "Ver demostración" : isLast ? "¡Entendido!" : "Continuar"}
                </AppText>
                {!isLast && !current.hasDemo && (
                  <Ionicons
                    name="arrow-forward"
                    size={15}
                    color={colors.white}
                    style={{ marginLeft: 6 }}
                  />
                )}
              </View>
            </Button>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ── Utilidad para resetear desde Settings ────────────────────────
export async function resetTutorial() {
  await AsyncStorage.removeItem(TUTORIAL_KEY);
}

// ── Estilos ──────────────────────────────────────────────────────
const arrowStyles = StyleSheet.create({
  base: {
    position: "absolute",
    width: 0,
    height: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  down: {
    bottom: -13,
    borderTopWidth: 14,
    borderTopColor: colors.white,
  },
  up: {
    top: -13,
    borderBottomWidth: 14,
    borderBottomColor: colors.white,
  },
});

const tutStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.74)",
  },

  spotlight: {
    position: "absolute",
    borderRadius: 44,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 2.5,
    borderColor: "rgba(255,255,255,0.55)",
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 14,
    elevation: 12,
  },

  tooltip: {
    position: "absolute",
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.lavender[100],
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    color: colors.lavender[900],
    fontSize: 15,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.neutral[100],
    alignItems: "center",
    justifyContent: "center",
  },

  desc: {
    color: colors.neutral[600],
    lineHeight: 22,
    marginBottom: 14,
  },

  dots: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 14,
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.neutral[200],
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.lavender[600],
  },
  dotDone: {
    backgroundColor: colors.lavender[300],
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skipBtn: { padding: 8 },
  skipText: {
    color: colors.neutral[400],
    textDecorationLine: "underline",
  },
  nextBtn: {
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  nextContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});