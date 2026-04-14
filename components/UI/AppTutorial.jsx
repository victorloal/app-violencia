// components/UI/AppTutorial.jsx
import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCopilot } from "react-native-copilot";
import AppText from "./AppText";
import { colors } from "../../thema/colors";
import { useTutorialContext } from "../../context/TutorialContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TUTORIAL_KEY = "@Perla/tutorial_completed";
// ── Tooltip personalizado ────────────────────────────────────────
// Esta versión de react-native-copilot solo pasa { labels } como prop.
// La navegación se controla con useCopilot() desde adentro.
export function TutorialTooltip({ labels }) {
  const { goToNext, stop, currentStep, isLastStep } = useCopilot();
const { setTutorialActive, markTutorialCompleted, openCalcDemoRef } = useTutorialContext();

  const iconName =
    currentStep?.name?.split(":")[0] ?? "information-circle-outline";
  const title = currentStep?.text?.split("|")[0] ?? "";
  const desc  = currentStep?.text?.split("|")[1] ?? "";

const handleNext = () => {
    // Step 5: Open calculator demo instead of just advancing
    if (currentStep?.name === "calculator-outline:camuflaje") {
      openCalcDemoRef.current?.();
      setTutorialActive(true);
      return;
    }

    setTutorialActive(true);
    if (isLastStep) {
      markTutorialCompleted();
      stop();
    } else {
      goToNext();
    }
  };
  const handleStop = () => {
    setTutorialActive(true);
    markTutorialCompleted();
    stop();
  };


  return (
    <View style={styles.tooltip}>
      {/* Cabecera */}
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name={iconName} size={18} color={colors.lavender[700]} />
        </View>
        <AppText variant="h3" bold style={styles.title}>
          {title}
        </AppText>
        <TouchableOpacity
          onPress={handleStop}
          style={styles.closeBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="close" size={16} color={colors.neutral[500]} />
        </TouchableOpacity>
      </View>

      {/* Descripción */}
      <AppText variant="body" style={styles.desc}>
        {desc}
      </AppText>

      {/* Acciones */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleStop} style={styles.skipBtn}>
          <AppText variant="caption" style={styles.skipText}>
            Saltar tutorial
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
          <AppText variant="body" bold style={styles.nextText}>
            {isLastStep ? "¡Entendido!" : "Continuar"}
          </AppText>
          {!isLastStep && (
            <Ionicons
              name="arrow-forward"
              size={14}
              color={colors.white}
              style={{ marginLeft: 5 }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Hook para iniciar el tutorial automáticamente ────────────────
// Usa doble requestAnimationFrame para garantizar que todos los
// CopilotStep ya están medidos antes de llamar start().
export function useTutorialAutoStart() {
  const { start } = useCopilot();
  const { isTutorialActive, isTutorialCompleted } = useTutorialContext();

  const startIfNeeded = useCallback(() => {
    if (!isTutorialActive && !isTutorialCompleted) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => start());
      });
    }
  }, [start, isTutorialActive, isTutorialCompleted]);

  useEffect(() => {
    startIfNeeded();
  }, [startIfNeeded]);
}

// ── Resetear desde Settings ──────────────────────────────────────
export async function resetTutorial() {
  await AsyncStorage.removeItem(TUTORIAL_KEY);
}

// ── Estilos ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    minWidth: 280,
    maxWidth: 340,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.lavender[100],
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    color: colors.lavender[900],
    fontSize: 14,
  },
  closeBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: colors.neutral[100],
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    color: colors.neutral[600],
    lineHeight: 21,
    marginBottom: 14,
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skipBtn: { padding: 8 },
  skipText: {
    color: colors.neutral[400],
    textDecorationLine: "underline",
    fontSize: 12,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[600],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  nextText: {
    color: colors.white,
    fontSize: 13,
  },
});