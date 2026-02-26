import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deviceSettingsService } from "../services/deviceSettingsService";

const STORAGE_KEYS = {
  FONT_SIZE: "fontSize",
  CONTRAST: "contrast",
  BRIGHTNESS: "brightness",
  VOICE: "isVoiceOn",
  CAMOUFLAGE: "isCamouflageOn",
  PHONE_NUMBER: "phoneNumber",
};

const DEFAULT_VALUES = {
  fontSize: 18,
  contrast: 100,
  brightness: 100,
  isVoiceOn: false,
  isCamouflageOn: false,
  phoneNumber: "",
};

export const useSettings = () => {
  const [settings, setSettings] = useState({ ...DEFAULT_VALUES });
  const [tempSettings, setTempSettings] = useState({ ...DEFAULT_VALUES });
  const [systemBrightness, setSystemBrightness] = useState(null);

  useEffect(() => {
    loadSettings();
    loadSystemBrightness();
  }, []);

  const loadSettings = async () => {
    try {
      const savedFont = await AsyncStorage.getItem(STORAGE_KEYS.FONT_SIZE);
      const savedContrast = await AsyncStorage.getItem(STORAGE_KEYS.CONTRAST);
      const savedBrightness = await AsyncStorage.getItem(
        STORAGE_KEYS.BRIGHTNESS,
      );
      const voice = await AsyncStorage.getItem(STORAGE_KEYS.VOICE);
      const camo = await AsyncStorage.getItem(STORAGE_KEYS.CAMOUFLAGE);
      const phone = await AsyncStorage.getItem(STORAGE_KEYS.PHONE_NUMBER);

      const newSettings = { ...DEFAULT_VALUES };

      if (savedFont) newSettings.fontSize = Number(savedFont);
      if (savedContrast) newSettings.contrast = Number(savedContrast);
      if (savedBrightness) newSettings.brightness = Number(savedBrightness);
      if (voice !== null) newSettings.isVoiceOn = voice === "true";
      if (camo !== null) newSettings.isCamouflageOn = camo === "true";
      if (phone) newSettings.phoneNumber = phone;

      setSettings(newSettings);
      setTempSettings(newSettings);
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const loadSystemBrightness = async () => {
    const brightness = await deviceSettingsService.getSystemBrightness();
    if (brightness !== null) {
      setSystemBrightness(brightness);
    }
  };

  const saveValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  };

  const saveAll = async () => {
    await saveValue(STORAGE_KEYS.FONT_SIZE, tempSettings.fontSize);
    await saveValue(STORAGE_KEYS.CONTRAST, tempSettings.contrast);
    await saveValue(STORAGE_KEYS.BRIGHTNESS, tempSettings.brightness);
    await saveValue(STORAGE_KEYS.VOICE, tempSettings.isVoiceOn);
    await saveValue(STORAGE_KEYS.CAMOUFLAGE, tempSettings.isCamouflageOn);
    await saveValue(STORAGE_KEYS.PHONE_NUMBER, tempSettings.phoneNumber);

    setSettings({ ...tempSettings });
  };

  const cancelChanges = () => {
    setTempSettings({ ...settings });
  };

  const hasChanges = () => {
    return (
      tempSettings.fontSize !== settings.fontSize ||
      tempSettings.contrast !== settings.contrast ||
      tempSettings.brightness !== settings.brightness ||
      tempSettings.isVoiceOn !== settings.isVoiceOn ||
      tempSettings.isCamouflageOn !== settings.isCamouflageOn ||
      tempSettings.phoneNumber !== settings.phoneNumber
    );
  };

  const updateTempSetting = (key, value) => {
    setTempSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Funciones del dispositivo
  const openDeviceVoiceSettings = async () => {
    await deviceSettingsService.openVoiceAccessibility();
  };

  const openDeviceContrastSettings = async () => {
    await deviceSettingsService.openContrastSettings();
  };

  const openDeviceBrightnessSettings = async () => {
    await deviceSettingsService.openBrightnessSettings();
  };

  const setDeviceBrightness = async (value) => {
    const success = await deviceSettingsService.setSystemBrightness(value);
    if (success) {
      setSystemBrightness(value);
    }
    return success;
  };

  return {
    // Settings de la app
    settings,
    tempSettings,
    updateTempSetting,
    saveAll,
    cancelChanges,
    hasChanges,

    // Sistema
    systemBrightness,
    openDeviceVoiceSettings,
    openDeviceContrastSettings,
    openDeviceBrightnessSettings,
    setDeviceBrightness,
  };
};
