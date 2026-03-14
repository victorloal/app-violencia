// styles/inputs.js
import { Platform } from "react-native";
import {
  spacing,
  borderRadius,
  borderWidth,
  semanticColors,
  fontWeight,
} from "./tokens";
import { textVariants } from "./typography";

export const getInputStyles = ({
  variant = "default",
  size = "medium",
  state = "default",
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  fontScale = 1,
  textVariant = "default",
}) => {
  // Alturas según tamaño
  const heights = {
    small: 40,
    medium: 48,
    large: 56,
  };

  // Colores según estado
  const getBorderColor = () => {
    if (disabled) return semanticColors.border.dark;
    if (state === "error") return semanticColors.error;
    if (state === "success") return semanticColors.success;
    if (state === "focused") return semanticColors.primary;
    return semanticColors.border.normal;
  };

  const getBackgroundColor = () => {
    if (disabled) return semanticColors.primaryLight;
    if (variant === "filled") return semanticColors.primaryLight;
    return semanticColors.surface;
  };

  const height = multiline
    ? numberOfLines * (textVariants.body.fontSize * fontScale * 1.5) +
      spacing.lg * 2
    : heights[size] || heights.medium;

  return {
    container: {
      flex: 1,
    },
    wrapper: {
      flexDirection: "row",
      alignItems: multiline ? "flex-start" : "center",
      borderRadius: borderRadius.md,
      borderWidth: state === "focused" ? borderWidth.thick : borderWidth.thin,
      borderColor: getBorderColor(),
      backgroundColor: getBackgroundColor(),
      minHeight: height,
      overflow: "hidden",
      opacity: disabled ? 0.7 : 1,
    },
    input: {
      flex: 1,
      paddingVertical: multiline ? spacing.md : 0,
      paddingHorizontal: spacing.md,
      fontSize: textVariants.body.fontSize * fontScale,
      fontWeight:
        textVariant === "bold" ? fontWeight.bold : textVariants.body.fontWeight,
      lineHeight: textVariants.body.lineHeight
        ? textVariants.body.lineHeight * fontScale
        : textVariants.body.fontSize * fontScale * 1.2,
      color: disabled
        ? semanticColors.text.disabled
        : semanticColors.text.primary,
      textAlignVertical: multiline ? "top" : "center",
      ...Platform.select({
        ios: {
          outlineStyle: "none",
        },
      }),
    },
    leftIcon: {
      flexDirection: "row",
      paddingLeft: spacing.md,
      justifyContent: "center",
      alignItems: "center",
    },
    rightIcons: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    iconButton: {
      height: "100%",
      aspectRatio: 1,
      paddingRight: spacing.xxs,
      marginRight: spacing.xxs,
      backgroundColor: "transparent",
    },
    iconColor: semanticColors.text.tertiary,
    placeholderColor: semanticColors.text.disabled,
    feedbackText: {
      marginTop: spacing.xs,
      marginLeft: spacing.md,
    },
  };
};
