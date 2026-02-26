// screens/SettingsScreen.js

import { View, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import MainLayout from "../components/Layout/MainLayout";
import AppText from "../components/UI/AppText";
import StyledButton from "../components/UI/StyledButton";
import { AdjustableSection } from "../components/UI/AdjustableSection";
import { ToggleSection } from "../components/UI/ToggleSection";
import { InputSection } from "../components/UI/InputSection";
import { styles } from "../styles/SettingsStyles";
import { adjustableConfig } from "../constants/settingsConfig";
import { useSettings } from "../hooks/useSettings";
import { reloadApp } from "../services/appReloadService";
import { colors } from "../thema/colors";

export default function SettingsScreen({ navigation }) {
  const {
    tempSettings,
    updateTempSetting,
    saveAll,
    cancelChanges,
    hasChanges,
  } = useSettings();

  const [isSaving, setIsSaving] = useState(false);

  // Mapeo de estados para los componentes ajustables
  const stateMap = {
    fontSize: [
      tempSettings.fontSize,
      (value) => updateTempSetting("fontSize", value),
    ],
    contrast: [
      tempSettings.contrast,
      (value) => updateTempSetting("contrast", value),
    ],
    brightness: [
      tempSettings.brightness,
      (value) => updateTempSetting("brightness", value),
    ],
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (!hasChanges() || isSaving) return;

      e.preventDefault();
      Alert.alert(
        "Descartar cambios",
        "Hay cambios sin guardar. ¿Deseas salir sin guardar?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Salir",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });

    return unsubscribe;
  }, [navigation, hasChanges, isSaving]);

  const increase = (key) => {
    const [value, setter] = stateMap[key];
    const config = adjustableConfig.find((c) => c.key === key);
    if (config) {
      setter(Math.min(value + config.step, config.max));
    }
  };

  const decrease = (key) => {
    const [value, setter] = stateMap[key];
    const config = adjustableConfig.find((c) => c.key === key);
    if (config) {
      setter(Math.max(value - config.step, config.min));
    }
  };

  const handleSaveAll = async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      await saveAll();

      Alert.alert(
        "Cambios guardados",
        "Los cambios se han guardado correctamente. La aplicación se reiniciará para aplicar los cambios.",
        [
          {
            text: "OK",
            onPress: async () => {
              await reloadApp();
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar los cambios.");
      console.error("Error saving all:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    cancelChanges();
  };

  const toggleVoice = () => {
    updateTempSetting("isVoiceOn", !tempSettings.isVoiceOn);
  };

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="settings" size={30} color={colors.lavender[800]} />
          <AppText variant="title" style={styles.headerText}>
            Configuración
          </AppText>
        </View>

        {/* Ajustables */}
        {adjustableConfig.map((section) => {
          const [value] = stateMap[section.key];
          return (
            <AdjustableSection
              key={section.key}
              section={section}
              value={value}
              onIncrease={() => increase(section.key)}
              onDecrease={() => decrease(section.key)}
              disabled={isSaving}
            />
          );
        })}

        {/* Toggles */}
        <ToggleSection
          title="Lectura de voz"
          value={tempSettings.isVoiceOn}
          onToggle={toggleVoice}
          disabled={isSaving}
          iconOn="volume-high"
          iconOff="volume-mute"
        />

        {/* Número de teléfono para mensajes */}
        <InputSection
          title="Ingresa un número de contacto para enviar mensaje rápido"
          placeholder="Ej: +57 300 123 4567"
          value={tempSettings.phoneNumber}
          onChangeText={(value) => updateTempSetting("phoneNumber", value)}
          disabled={isSaving}
          icon="phone-portrait"
          keyboardType="phone-pad"
        />

        {/* Guardar / Cancelar */}
        <View style={styles.saveCancelContainer}>
          <StyledButton
            title="Cancelar"
            tone="danger"
            onPress={handleCancel}
            disabled={isSaving}
          />
          <StyledButton
            title={isSaving ? "Guardando..." : "Guardar"}
            tone="dark"
            onPress={handleSaveAll}
            disabled={isSaving}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
}
