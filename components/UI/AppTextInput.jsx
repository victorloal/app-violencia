// components/common/AppTextInput.js
import React, { useContext, forwardRef, useState } from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";
import { getInputStyles } from "../../styles/inputs";
import { SettingsContext } from "../../context/SettingsContext";
import Button from "./Button";

const AppTextInput = forwardRef(
  (
    {
      // Valores del input
      value,
      onChangeText,
      placeholder,
      keyboardType = "default",
      secureTextEntry = false,
      multiline = false,
      numberOfLines = 1,
      maxLength,
      editable = true,

      // Variantes y estilos
      variant = "default",
      size = "medium",
      state = "default",
      errorMessage,
      successMessage,

      // Iconos
      leftIcon,
      rightIcon,
      onRightIconPress,

      // Props de accesibilidad
      accessibilityLabel,
      accessibilityHint,

      // Estilos personalizados
      style,
      inputStyle,

      // Texto
      bold = false,

      // Eventos
      onFocus,
      onBlur,
      onSubmitEditing,

      ...props
    },
    ref,
  ) => {
    const { fontScale } = useContext(SettingsContext);
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] =
      useState(!secureTextEntry);

    const textVariant = bold ? "bold" : "default";

    const styles = getInputStyles({
      variant,
      size,
      state: isFocused ? "focused" : state,
      disabled: !editable,
      multiline,
      numberOfLines,
      fontScale,
      textVariant,
    });

    // Determinar si mostrar botón de borrar
    const showClearButton = value && value.length > 0 && editable;

    // Manejar visibilidad de contraseña
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    // Label por defecto para accesibilidad
    const defaultAccessibilityLabel = placeholder || "Campo de texto";

    return (
      <View style={[styles.container, style]}>
        {/* Contenedor del input */}
        <View
          style={styles.wrapper}
          accessible={true}
          accessibilityLabel={accessibilityLabel || defaultAccessibilityLabel}
          accessibilityHint={accessibilityHint || "Ingresa texto en este campo"}
          accessibilityState={{ disabled: !editable }}
        >
          {/* Icono izquierdo - siempre al inicio */}
          {leftIcon && (
            <View style={styles.leftIcon} accessible={false}>
              {leftIcon}
            </View>
          )}

          {/* Input principal - ocupa todo el espacio disponible */}
          <TextInput
            ref={ref}
            style={[styles.input, inputStyle]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={styles.placeholderColor}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : undefined}
            maxLength={maxLength}
            editable={editable}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onSubmitEditing={onSubmitEditing}
            accessible={false}
            {...props}
          />

          {/* Iconos derechos - agrupados al final */}
          <View style={styles.rightIcons}>
            {/* Botón para borrar */}
            {showClearButton && (
              <Button
                onPress={() => onChangeText?.("")}
                type="primaryOutline"
                variant="circle"
                textVariant="iconOnly"
                size="small"
                accessibilityLabel="Borrar texto"
                accessibilityHint="Elimina todo el texto ingresado"
              >
                <Ionicons name="close" size={15} />
              </Button>
            )}

            {/* Botón para mostrar/ocultar contraseña */}
            {secureTextEntry && (
              <Button
                onPress={togglePasswordVisibility}
                type="primaryGhost"
                variant="circle"
                size="xs"
                textVariant="iconOnly"
                accessibilityLabel={
                  isPasswordVisible
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color={styles.iconColor}
                />
              </Button>
            )}

            {/* Icono derecho con acción */}
            {rightIcon && onRightIconPress && (
              <Button
                onPress={onRightIconPress}
                type="primaryGhost"
                variant="circle"
                size="xs"
                textVariant="iconOnly"
                style={styles.iconButton}
                accessibilityLabel="Botón de acción"
              >
                {rightIcon}
              </Button>
            )}

            {/* Icono derecho estático (sin acción) */}
            {rightIcon && !onRightIconPress && (
              <View style={styles.iconButton} accessible={false}>
                {rightIcon}
              </View>
            )}
          </View>
        </View>

        {/* Mensajes de estado */}
        {state === "error" && errorMessage && (
          <AppText
            variant="caption"
            color="danger"
            style={styles.feedbackText}
            accessibilityRole="alert"
            accessibilityLiveRegion="assertive"
          >
            {errorMessage}
          </AppText>
        )}

        {state === "success" && successMessage && (
          <AppText
            variant="caption"
            color="success"
            style={styles.feedbackText}
            accessibilityRole="status"
            accessibilityLiveRegion="polite"
          >
            {successMessage}
          </AppText>
        )}
      </View>
    );
  },
);

AppTextInput.displayName = "AppTextInput";

export default AppTextInput;
