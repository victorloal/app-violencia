// components/common/Button.js
import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  Platform,
} from "react-native";
import AppText from "./AppText";
import { getButtonStyles } from "../../styles/buttons";

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

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
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
    </TouchableOpacity>
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
    <TouchableOpacity
      style={[styles.container, { width: size, height: size }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
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
    </TouchableOpacity>
  );
};

export default Button;
