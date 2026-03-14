import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [fontScale, setFontScaleState] = useState(1);

  const [contrast, setContrastState] = useState(100);
  const [brightness, setBrightnessState] = useState(100);
  const [isVoiceOn, setIsVoiceOnState] = useState(false);
  const [isCamouflageOn, setIsCamouflageOnState] = useState(false);
  const [phoneNumber, setPhoneNumberState] = useState("");

  // Cargar valores guardados
  useEffect(() => {
    const loadSettings = async () => {
      const f = await AsyncStorage.getItem("fontScale");
      const c = await AsyncStorage.getItem("contrast");
      const b = await AsyncStorage.getItem("brightness");
      const v = await AsyncStorage.getItem("isVoiceOn");
      const m = await AsyncStorage.getItem("isCamouflageOn");
      const p = await AsyncStorage.getItem("phoneNumber");

      if (f) setFontScaleState(Number(f));
      if (c) setContrastState(Number(c));
      if (b) setBrightnessState(Number(b));
      if (v) setIsVoiceOnState(v === "true");
      if (m) setIsCamouflageOnState(m === "true");
      if (p) setPhoneNumberState(p);
    };

    loadSettings();
  }, []);

  const saveSetting = async (key, value) => {
    await AsyncStorage.setItem(key, value.toString());
  };

  // setters persistentes
  const setFontScale = (val) => {
    setFontScaleState(val);
    saveSetting("fontScale", val);
  };

  const setContrast = (val) => {
    setContrastState(val);
    saveSetting("contrast", val);
  };

  const setBrightness = (val) => {
    setBrightnessState(val);
    saveSetting("brightness", val);
  };

  const setIsVoiceOn = (val) => {
    setIsVoiceOnState(val);
    saveSetting("isVoiceOn", val);
  };

  const setIsCamouflageOn = (val) => {
    setIsCamouflageOnState(val);
    saveSetting("isCamouflageOn", val);
  };

  const setPhoneNumber = (val) => {
    setPhoneNumberState(val);
    saveSetting("phoneNumber", val);
  };

  return (
    <SettingsContext.Provider
      value={{
        fontScale,
        setFontScale,
        contrast,
        setContrast,
        brightness,
        setBrightness,
        isVoiceOn,
        setIsVoiceOn,
        isCamouflageOn,
        setIsCamouflageOn,
        phoneNumber,
        setPhoneNumber,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
