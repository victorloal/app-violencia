import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking, Platform, AccessibilityInfo } from "react-native";

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [fontSize, setFontSize] = useState(18);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [isVoiceOn, setIsVoiceOn] = useState(false);
  const [isCamouflageOn, setIsCamouflageOn] = useState(false);

  // Cargar valores guardados
  useEffect(() => {
    const loadSettings = async () => {
      const f = await AsyncStorage.getItem("fontSize");
      const c = await AsyncStorage.getItem("contrast");
      const b = await AsyncStorage.getItem("brightness");
      const v = await AsyncStorage.getItem("isVoiceOn");
      const m = await AsyncStorage.getItem("isCamouflageOn");

      if (f) setFontSize(Number(f));
      if (c) setContrast(Number(c));
      if (b) setBrightness(Number(b));
      if (v) setIsVoiceOn(v === "true");
      if (m) setIsCamouflageOn(m === "true");
    };
    loadSettings();
  }, []);

  const saveSetting = async (key, value) => {
    await AsyncStorage.setItem(key, value.toString());
  };

  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        setFontSize: (val) => {
          setFontSize(val);
          saveSetting("fontSize", val);
        },
        contrast,
        setContrast: (val) => {
          setContrast(val);
          saveSetting("contrast", val);
        },
        brightness,
        setBrightness: (val) => {
          setBrightness(val);
          saveSetting("brightness", val);
        },
        isVoiceOn,
        setIsVoiceOn: (val) => {
          setIsVoiceOn(val);
          saveSetting("isVoiceOn", val);
        },
        isCamouflageOn,
        setIsCamouflageOn: (val) => {
          setIsCamouflageOn(val);
          saveSetting("isCamouflageOn", val);
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
