import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { linkingService } from "../services/linkingService";

export const useDeviceFeatures = () => {
  const [currentBrightness, setCurrentBrightness] = useState(null);

  // WhatsApp
  const openWhatsApp = useCallback(async (phone, message) => {
    await linkingService.openWhatsApp(phone, message);
  }, []);

  const openWhatsAppChat = useCallback(async (phone) => {
    if (!phone) {
      Alert.alert("Error", "Número de teléfono requerido");
      return;
    }
    await linkingService.openWhatsApp(phone, "");
  }, []);

  // Llamadas
  const makeCall = useCallback(async (phone) => {
    if (!phone) {
      Alert.alert("Error", "Número de teléfono requerido");
      return;
    }
    await linkingService.makePhoneCall(phone);
  }, []);

  // Accesibilidad de voz
  const openVoiceAccessibility = useCallback(async () => {
    await linkingService.openVoiceAccessibility();
  }, []);

  // Brillo
  const getBrightness = useCallback(async () => {
    const brightness = await linkingService.getCurrentBrightness();
    setCurrentBrightness(brightness);
    return brightness;
  }, []);

  const setBrightness = useCallback(async (value) => {
    const success = await linkingService.setBrightness(value);
    if (success) {
      setCurrentBrightness(value);
    }
    return success;
  }, []);

  const increaseBrightness = useCallback(async (step = 10) => {
    const newValue = await linkingService.increaseBrightness(step);
    if (newValue !== null) {
      setCurrentBrightness(newValue);
    }
    return newValue;
  }, []);

  const decreaseBrightness = useCallback(async (step = 10) => {
    const newValue = await linkingService.decreaseBrightness(step);
    if (newValue !== null) {
      setCurrentBrightness(newValue);
    }
    return newValue;
  }, []);

  // Contraste
  const openContrastSettings = useCallback(async () => {
    await linkingService.openContrastSettings();
  }, []);

  return {
    // WhatsApp
    openWhatsApp,
    openWhatsAppChat,

    // Llamadas
    makeCall,

    // Accesibilidad voz
    openVoiceAccessibility,

    // Brillo
    currentBrightness,
    getBrightness,
    setBrightness,
    increaseBrightness,
    decreaseBrightness,

    // Contraste
    openContrastSettings,
  };
};
