// styles/animations.js
import { StyleSheet } from "react-native";

export const animationStyles = {
  // Timing
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },

  // Easings
  easing: {
    default: "ease",
    linear: "linear",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },

  // Scale animations
  scale: {
    pressIn: 0.95,
    pressOut: 1,
    hover: 1.02,
  },

  // Opacity animations
  opacity: {
    disabled: 0.5,
    active: 1,
    hover: 0.8,
  },
};

// Estilos base para elementos animados
export const animatedStyles = StyleSheet.create({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
});

/**
 * Crea una transformación de deslizamiento lateral basada en un valor animado.
 * @param {Animated.Value} animValue - Valor de 0 a 1.
 * @param {number} distance - Distancia inicial (default -50).
 * @returns {object} Objeto de estilo para transform.
 */
export const slideInX = (animValue, distance = -50) => ({
  opacity: animValue,
  transform: [
    {
      translateX: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [distance, 0],
      }),
    },
  ],
});

/**
 * Crea una transformación de deslizamiento vertical basada en un valor animado.
 * @param {Animated.Value} animValue - Valor de 0 a 1.
 * @param {number} distance - Distancia inicial (default 20).
 * @returns {object} Objeto de estilo para transform.
 */
export const slideInY = (animValue, distance = 20) => ({
  opacity: animValue,
  transform: [
    {
      translateY: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [distance, 0],
      }),
    },
  ],
});

/**
 * Configuración estándar para animaciones de entrada.
 */
export const animationConfig = {
  entrance: {
    duration: 800,
    useNativeDriver: true,
  },
  stagger: {
    duration: 1000,
    useNativeDriver: true,
  },
};
