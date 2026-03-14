// components/common/AppText.js
import React, { useContext } from "react";
import { Text } from "react-native";
import { typography } from "../../styles/typography";
import { SettingsContext } from "../../context/SettingsContext";

const AppText = ({
  children,
  variant = "body",
  color = "primary",
  style,
  bold,
  semiBold,
  italic,
  underline,
  center,
  right,
  uppercase,
  capitalize,
  scale: propScale,

  // Parámetros de accesibilidad
  accessibilityLabel, // Texto personalizado para el lector de pantalla
  accessibilityHint, // Descripción de lo que hace este texto
  accessibilityRole, // Rol semántico (header, text, button, link, etc.)
  accessibilityState, // Estado (disabled, selected, etc.)
  accessibilityLiveRegion, // "polite", "assertive" para actualizaciones
  importantForAccessibility, // "auto", "yes", "no", "no-hide-descendants"

  ...props
}) => {
  const { fontScale: contextScale } = useContext(SettingsContext);
  const fontScale = propScale ?? contextScale;

  const variantStyle = typography[variant] || typography.body;
  const colorStyle = typography[color] || typography.primary;

  const modifiers = [
    bold && typography.bold,
    semiBold && typography.semiBold,
    italic && typography.italic,
    underline && typography.underline,
    center && typography.center,
    right && typography.right,
    uppercase && typography.uppercase,
    capitalize && typography.capitalize,
  ].filter(Boolean);

  const scaledStyle = {
    ...variantStyle,
    fontSize: variantStyle.fontSize * fontScale,
    lineHeight: variantStyle.lineHeight
      ? variantStyle.lineHeight * fontScale
      : undefined,
  };

  // Determinar el rol de accesibilidad basado en la variante si no se especifica
  const getAccessibilityRole = () => {
    if (accessibilityRole) return accessibilityRole;

    switch (variant) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
        return "header";
      case "button":
        return "button";
      default:
        return "text";
    }
  };

  // Generar texto de accesibilidad por defecto si no se proporciona
  const getDefaultAccessibilityLabel = () => {
    if (typeof children === "string") {
      return children;
    }
    return undefined;
  };

  return (
    <Text
      style={[scaledStyle, colorStyle, ...modifiers, style]}
      // Propiedades de accesibilidad
      accessible={true}
      accessibilityLabel={accessibilityLabel || getDefaultAccessibilityLabel()}
      accessibilityHint={accessibilityHint}
      accessibilityRole={getAccessibilityRole()}
      accessibilityState={accessibilityState}
      accessibilityLiveRegion={accessibilityLiveRegion}
      importantForAccessibility={importantForAccessibility}
      {...props}
    >
      {children}
    </Text>
  );
};

export default AppText;
