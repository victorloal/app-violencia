import React from "react";
import {
  Pressable,
  ActivityIndicator,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import AppText from "./AppText";
import { getButtonStyles } from "../../styles/buttons";
import { colors } from "../../thema/colors";

const Button = ({
  children,
  onPress,
  type = "primary",
  variant = "default",
  size = "medium",
  textVariant = "default",
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  style,
  textStyle,

  // Parámetros de accesibilidad
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  accessibilityState,
  ...props
}) => {
  const styles = getButtonStyles({
    type,
    variant,
    size,
    textVariant,
    disabled,
  });

  // Generar label por defecto si no se proporciona
  const defaultAccessibilityLabel =
    typeof children === "string" ? children : "Botón";

  // Determinar color del ripple basado en el tipo
  const rippleColor = type.includes("Outline")
    ? styles.text.color + "20" // Color del texto con baja opacidad
    : "rgba(255, 255, 255, 0.2)";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && Platform.OS === "ios" && { opacity: 0.7 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      android_ripple={{
        color: rippleColor,
        borderless: false,
      }}
      // Propiedades de accesibilidad
      accessible={true}
      accessibilityLabel={accessibilityLabel || defaultAccessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
        ...accessibilityState,
      }}
      {...props}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            color={styles.text.color}
            accessibilityLabel="Cargando"
          />
        ) : (
          <>
            {iconLeft && (
              <View
                style={styles.iconLeft}
                accessible={false}
                importantForAccessibility="no"
              >
                {iconLeft}
              </View>
            )}

            {children && (
              <AppText
                style={[styles.text, textStyle]}
                // No duplicar información de accesibilidad
                accessible={false}
                importantForAccessibility="no"
              >
                {children}
              </AppText>
            )}

            {iconRight && (
              <View
                style={styles.iconRight}
                accessible={false}
                importantForAccessibility="no"
              >
                {iconRight}
              </View>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
};

// Componente IconButton con accesibilidad
export const IconButton = ({
  icon,
  onPress,
  type = "primary",
  size = 48,
  disabled = false,
  style,

  // Parámetros de accesibilidad
  accessibilityLabel,
  accessibilityHint,
  ...props
}) => {
  const styles = getButtonStyles({
    type,
    variant: "circle",
    size: "custom",
    textVariant: "iconOnly",
    disabled,
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { width: size, height: size },
        pressed && Platform.OS === "ios" && { opacity: 0.7 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{
        color: type.includes("Outline")
          ? styles.text.color + "20"
          : "rgba(255, 255, 255, 0.2)",
        borderless: false,
      }}
      // Propiedades de accesibilidad
      accessible={true}
      accessibilityLabel={accessibilityLabel || "Botón de icono"}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      {...props}
    >
      <View accessible={false} importantForAccessibility="no">
        {icon}
      </View>
    </Pressable>
  );
};

export default Button;
