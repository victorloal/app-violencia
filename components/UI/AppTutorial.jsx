// components/UI/AppTutorial.jsx
import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, AccessibilityInfo } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCopilot } from "react-native-copilot";
import AppText from "./AppText";
import { colors } from "../../thema/colors";
import { useTutorialContext } from "../../context/TutorialContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "./Button";

const TUTORIAL_KEY = "@Perla/tutorial_completed";
// ── Tooltip personalizado ────────────────────────────────────────
// Esta versión de react-native-copilot solo pasa { labels } como prop.
// La navegación se controla con useCopilot() desde adentro.
export function TutorialTooltip({ labels }) {
  const { goToNext, stop, currentStep, isLastStep } = useCopilot();
  const { setTutorialActive, markTutorialCompleted, openCalcDemoRef } =
    useTutorialContext();

  const iconName =
    currentStep?.name?.split(":")[0] ?? "information-circle-outline";
  const title = currentStep?.text?.split("|")[0] ?? "";
  const desc = currentStep?.text?.split("|")[1] ?? "";

  useEffect(() => {
    if (!title && !desc) return;
    const timer = setTimeout(() => {
      AccessibilityInfo.announceForAccessibility(`${title}. ${desc}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [currentStep?.name]);

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
    <View style={styles.tooltip} accessibilityViewIsModal={true}>
      {/* Cabecera */}
      <View
        style={styles.header}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden={true}
      >
        <View style={styles.iconWrap}>
          <Ionicons
            name={iconName}
            size={18}
            color={colors.lavender[700]}
            accessible={false}
            importantForAccessibility="no"
          />
        </View>
        <AppText
          variant="h3"
          style={styles.title}
          accessible={false}
          importantForAccessibility="no"
        >
          {title}
        </AppText>
      </View>

      {/* Descripción */}
      <AppText
        variant="body"
        style={styles.desc}
        accessible={true}
        importantForAccessibility="yes"
        accessibilityLabel={`${title}. ${desc}`}
      >
        {desc}
      </AppText>

      {/* Acciones */}
      <View style={styles.actions}>
        <Button
          type="ghost"
          size="sm"
          importantForAccessibility="yes"
          accessibilityLabel="Saltar tutorial"
          accessibilityHint="Termina el tutorial ahora"
          accessibilityRole="button"
          accessible={true}
          onPress={handleStop}
        >
          Saltar
        </Button>

        <Button
          onPress={handleNext}
          type="primary"
          size="lg"
          accessible={true}
          importantForAccessibility="yes"
          accessibilityLabel={
            isLastStep ? "Entendido, finalizar" : "Continuar tutorial"
          }
          accessibilityHint={
            isLastStep ? "Completar el tutorial" : "Avanzar al siguiente paso"
          }
          accessibilityRole="button"
        >
          {isLastStep ? "¡Entendido!" : "Continuar"}
        </Button>
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
    padding: 10,
    width: "100%",
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
  },
  closeBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: colors.lavender[100],
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    color: colors.neutral[600],
    marginBottom: 14,
  },
  actions: {
    gap: 10,
    flexDirection: "row",
  },
});
