// styles/buttons.js
import { StyleSheet } from "react-native";
import { spacing, borderRadius, borderWidth, semanticColors } from "./tokens";
import { textVariants, textColors, textModifiers } from "./typography";

export const buttonStyles = StyleSheet.create({
  // Base styles
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: borderWidth.none,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },

  // Variantes de forma
  default: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  pill: {
    borderRadius: borderRadius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  round: {
    borderRadius: borderRadius.round,
  },
  circle: {
    borderRadius: borderRadius.circle,
    width: "100%",
    aspectRatio: 1,
  },

  // Tamaños
  xs: {
    width: "20%",
  },
  small: {
    width: "35%",
  },
  medium: {
    width: "50%",
  },
  large: {
    width: "80%",
  },
  xl: {
    width: "100%",
    paddingVertical: spacing.lg,
  },
  xxl: {
    width: "100%",
    paddingVertical: spacing.xl,
  },
  flex: {
    flex: 1,
  },

  // Estado disabled
  disabled: {
    opacity: 0.6,
  },
});

// Variantes de texto para botones
export const buttonTextVariants = {
  // Texto estándar para botones
  default: {
    ...textVariants.button,
  },
  // Texto grande para botones principales
  large: {
    ...textVariants.button,
    fontSize: textVariants.h1fontSize,
  },
  // Texto pequeño para botones secundarios
  small: {
    ...textVariants.button,
    fontSize: textVariants.bodySmall.fontSize,
  },
  // Texto con peso bold
  bold: {
    ...textVariants.button,
    fontWeight: textModifiers.bold.fontWeight,
  },
  // Texto para botones circulares (solo icono)
  iconOnly: {
    fontSize: 0, // Ocultar texto cuando solo hay icono
  },
};

// Tipos de botones con colores semánticos
export const buttonTypes = {
  primary: {
    container: {
      backgroundColor: semanticColors.primary,
      borderColor: semanticColors.primary,
      borderWidth: borderWidth.none,
    },
    text: {
      color: semanticColors.text.inverse,
    },
  },
  primaryOutline: {
    container: {
      backgroundColor: "transparent",
      borderColor: semanticColors.primary,
      borderWidth: borderWidth.normal,
    },
    text: {
      color: semanticColors.primary,
    },
  },
  primaryGhost: {
    container: {
      backgroundColor: semanticColors.primaryLight,
      borderColor: "transparent",
      borderWidth: borderWidth.none,
    },
    text: {
      color: semanticColors.primary,
    },
  },
  secondary: {
    container: {
      backgroundColor: semanticColors.secondary,
      borderColor: semanticColors.secondary,
      borderWidth: borderWidth.none,
    },
    text: {
      color: semanticColors.text.inverse,
    },
  },
  secondaryOutline: {
    container: {
      backgroundColor: "transparent",
      borderColor: semanticColors.secondary,
      borderWidth: borderWidth.normal,
    },
    text: {
      color: semanticColors.secondary,
    },
  },
  success: {
    container: {
      backgroundColor: semanticColors.success,
      borderColor: semanticColors.success,
      borderWidth: borderWidth.none,
    },
    text: {
      color: semanticColors.text.inverse,
    },
  },
  danger: {
    container: {
      backgroundColor: semanticColors.error,
      borderColor: semanticColors.error,
      borderWidth: borderWidth.none,
    },
    text: {
      color: semanticColors.text.inverse,
    },
  },
  dangerOutline: {
    container: {
      backgroundColor: "transparent",
      borderColor: semanticColors.error,
      borderWidth: borderWidth.normal,
    },
    text: {
      color: semanticColors.error,
    },
  },
  warning: {
    container: {
      backgroundColor: semanticColors.warning,
      borderColor: semanticColors.warning,
      borderWidth: borderWidth.none,
    },
    text: {
      color: semanticColors.text.inverse,
    },
  },
  disabled: {
    container: {
      backgroundColor: semanticColors.text.disabled,
      borderColor: semanticColors.border.dark,
      borderWidth: borderWidth.none,
      opacity: 0.4,
    },
    text: {
      color: semanticColors.text.inverse,
    },
  },
};

// Función helper para combinar estilos de botón
export const getButtonStyles = ({
  type = "primary",
  variant = "default",
  size = "medium",
  textVariant = "default",
  disabled = false,
}) => {
  const buttonType = disabled
    ? buttonTypes.disabled
    : buttonTypes[type] || buttonTypes.primary;
  const buttonVariant = buttonStyles[variant] || buttonStyles.default;
  const buttonSize = buttonStyles[size] || buttonStyles.medium;
  const buttonTextVariant =
    buttonTextVariants[textVariant] || buttonTextVariants.default;

  return {
    container: [
      buttonStyles.base,
      buttonVariant,
      buttonSize,
      buttonType.container,
    ],
    text: [buttonTextVariant, buttonType.text],
  };
};
