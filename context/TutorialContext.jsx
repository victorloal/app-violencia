// context/TutorialContext.jsx
import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TUTORIAL_KEY = "@Perla/tutorial_completed";
const TutorialContext = createContext({
  openCalcDemoRef: { current: null },
  isTutorialActive: false,
  setTutorialActive: () => {},
  isTutorialCompleted: false,
  setTutorialCompleted: () => {},
});
export function TutorialProvider({ children }) {
  const openCalcDemoRef = useRef(null);
  const [isTutorialActive, setTutorialActive] = useState(false);
  const [isTutorialCompleted, setTutorialCompleted] = useState(false);
  // Cargar estado completado desde AsyncStorage al montar
  useEffect(() => {
    AsyncStorage.getItem(TUTORIAL_KEY).then((value) => {
      if (value === "true") {
        setTutorialCompleted(true);
      }
    });
  }, []);
  // Función helper para marcar completado (sync storage)
  const markTutorialCompleted = async () => {
    setTutorialCompleted(true);
    await AsyncStorage.setItem(TUTORIAL_KEY, "true");
  };
  const value = {
    openCalcDemoRef,
    isTutorialActive,
    setTutorialActive,
    isTutorialCompleted,
    setTutorialCompleted,
    markTutorialCompleted,
  };
  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
}
export function useTutorialContext() {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error("useTutorialContext debe usarse dentro de TutorialProvider");
  }
  return context;
}