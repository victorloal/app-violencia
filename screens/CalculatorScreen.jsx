// screens/CalculatorScreen.jsx
import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Vibration,
  Dimensions,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import SafeLayout from "../components/Layout/SafeLayout";
import AppText from "../components/UI/AppText";

// ── Medidas responsive ──────────────────────────────────────────
const { width: W, height: H } = Dimensions.get("window");

// El teclado ocupa ~60% del alto de pantalla
// 5 filas con GAP entre ellas → calculamos BTN dinámicamente
const KEYBOARD_HEIGHT = H * 0.6;
const ROWS = 5;
const COLS = 4;
const GAP = W * 0.03; // ~3% del ancho
const PAD_H = W * 0.04; // padding horizontal del teclado

// BTN = (ancho disponible - gaps entre 4 cols - padding) / 4
const BTN = (W - PAD_H * 2 - GAP * (COLS - 1)) / COLS;

// Alto de fila = (alto del teclado - gaps entre 5 filas) / 5
const ROW_H = (KEYBOARD_HEIGHT - GAP * (ROWS - 1)) / ROWS;

// Usamos el menor de BTN y ROW_H para mantener proporciones
const SZ = Math.min(BTN, ROW_H);

// ── Paleta ──────────────────────────────────────────────────────
const C = {
  bg: "#1c1c1e",
  topBtn: "#623284",
  topBtnText: "#ffffff",
  opBtn: "#801AD3",
  opBtnText: "#ffffff",
  opActive: "#801AD3",
  opActiveTxt: "#ffffffff",
  numBtn: "#82368C",
  numBtnText: "#ffffff",
  eqBtn: "#F31A73",
  eqBtnText: "#ffffff",
  hint: "#623284",
};

const BUTTONS = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export default function CalculatorScreen({ onUnlock, isTutorial = false }) {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingNext, setWaitingNext] = useState(false);
  const [activeOp, setActiveOp] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  // ── Helper: label accesible por botón ──────────────────────────
  const getAccessibilityLabel = (btn) => {
    const labels = {
      AC: "Limpiar todo",
      "+/-": "Cambiar signo",
      "%": "Porcentaje",
      "÷": "Dividir",
      "×": "Multiplicar",
      "−": "Restar",
      "+": "Sumar",
      "=": "Igual, mantén presionado para volver a la app",
      ".": "Punto decimal",
      0: "Cero",
    };
    return labels[btn] ?? btn; // dígitos 1-9 se leen solos
  };

  const getAccessibilityHint = (btn) => {
    if (btn === "=")
      return "Mantén presionado 1 segundo para cerrar la calculadora";
    if (activeOp === btn) return "Operador activo";
    return undefined;
  };

  // Mostrar instrucciones solo la primera vez que abre calculadora (independiente de main tutorial)
  useEffect(() => {
    const checkFirstTime = async () => {
      const hasSeenCalcInstructions = await AsyncStorage.getItem(
        "calc_instructions_seen",
      );
      if (!hasSeenCalcInstructions) {
        setShowInstructions(true);
        await AsyncStorage.setItem("calc_instructions_seen", "true");
      }
    };
    checkFirstTime();
  }, []);

  const calculate = (a, b, op) => {
    switch (op) {
      case "÷":
        return b === 0 ? "Error" : a / b;
      case "×":
        return a * b;
      case "−":
        return a - b;
      case "+":
        return a + b;
      default:
        return b;
    }
  };

  const formatResult = (n) => {
    if (n === "Error") return "Error";
    const s = parseFloat(n.toFixed(10)).toString();
    if (s.length > 12) return parseFloat(n.toPrecision(9)).toString();
    return s;
  };

  const handlePress = useCallback(
    (btn) => {
      Vibration.vibrate(25);

      if ("0123456789".includes(btn)) {
        if (waitingNext) {
          setDisplay(btn === "0" ? "0" : btn);
          setWaitingNext(false);
        } else {
          setDisplay((prev) =>
            prev === "0" ? btn : prev.length < 12 ? prev + btn : prev,
          );
        }
        return;
      }

      if (btn === ".") {
        if (waitingNext) {
          setDisplay("0.");
          setWaitingNext(false);
          return;
        }
        if (!display.includes(".")) setDisplay((d) => d + ".");
        return;
      }

      if (btn === "AC") {
        setDisplay("0");
        setExpression("");
        setOperand(null);
        setOperator(null);
        setWaitingNext(false);
        setActiveOp(null);
        return;
      }

      if (btn === "+/-") {
        setDisplay((d) =>
          d.startsWith("-") ? d.slice(1) : d === "0" ? "0" : "-" + d,
        );
        return;
      }

      if (btn === "%") {
        setDisplay(formatResult(parseFloat(display) / 100));
        setWaitingNext(true);
        return;
      }

      if (["÷", "×", "−", "+"].includes(btn)) {
        const current = parseFloat(display);
        if (operand !== null && !waitingNext) {
          const result = calculate(operand, current, operator);
          const formatted = formatResult(result);
          setDisplay(formatted);
          setOperand(parseFloat(formatted));
          setExpression(formatted + " " + btn);
        } else {
          setOperand(current);
          setExpression(display + " " + btn);
        }
        setOperator(btn);
        setActiveOp(btn);
        setWaitingNext(true);
        return;
      }

      if (btn === "=") {
        if (operator && operand !== null) {
          const current = parseFloat(display);
          const result = calculate(operand, current, operator);
          const formatted = formatResult(result);
          setExpression(expression + " " + display + " =");
          setDisplay(formatted);
          setOperand(null);
          setOperator(null);
          setActiveOp(null);
          setWaitingNext(true);
        }
      }
    },
    [display, operand, operator, waitingNext, expression],
  );

  const handleEqualLongPress = () => {
    Vibration.vibrate([0, 60, 40, 80]);
    if (onUnlock) onUnlock();
  };

  // ── Helpers de estilo por botón ─────────────────────────────
  const isOp = (b) => ["÷", "×", "−", "+"].includes(b);
  const isTop = (b) => ["AC", "+/-", "%"].includes(b);
  const isZero = (b) => b === "0";
  const isEq = (b) => b === "=";

  const btnBg = (btn) => {
    if (isOp(btn)) return activeOp === btn ? C.opActive : C.opBtn;
    if (isEq(btn)) return C.eqBtn;
    if (isTop(btn)) return C.topBtn;
    return C.numBtn;
  };

  const btnColor = (btn) => {
    if (isOp(btn)) return activeOp === btn ? C.opActiveTxt : C.opBtnText;
    if (isEq(btn)) return C.eqBtnText;
    if (isTop(btn)) return C.topBtnText;
    return C.numBtnText;
  };

  // Fuente escalada al tamaño del botón
  const FONT_SIZE = SZ * 0.38;
  const FONT_SMALL = SZ * 0.28; // para +/- y %

  return (
    <>
      <SafeLayout style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />

        {/* ── Display ── */}
        <View style={styles.displayArea}>
          {expression.length > 0 && (
            <Text
              style={[styles.expression, { fontSize: SZ * 0.22 }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {expression}
            </Text>
          )}
          <Text
            style={[styles.displayText, { fontSize: SZ * 0.85 }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.4}
          >
            {display}
          </Text>
        </View>

        {/* ── Teclado ── */}
        <View style={[styles.keyboard, { gap: GAP, paddingHorizontal: PAD_H }]}>
          {BUTTONS.map((row, ri) => (
            <View key={ri} style={[styles.row, { gap: GAP }]}>
              {row.map((btn) => {
                const wide = isZero(btn);
                const btnW = wide ? SZ * 2 + GAP : SZ;
                const bg = btnBg(btn);
                const color = btnColor(btn);
                const fs = isTop(btn) ? FONT_SMALL : FONT_SIZE;

                const btnStyle = {
                  width: btnW,
                  height: SZ,
                  borderRadius: SZ / 2,
                  backgroundColor: bg,
                  alignItems: wide ? "flex-start" : "center",
                  justifyContent: "center",
                  paddingLeft: wide ? SZ * 0.32 : 0,
                };
                const textStyle = {
                  fontSize: fs,
                  fontWeight: "400",
                  color: color,
                };

                if (btn === "=") {
                  return (
                    <TouchableOpacity
                      key={btn}
                      style={btnStyle}
                      onPress={() => handlePress(btn)}
                      onLongPress={handleEqualLongPress}
                      delayLongPress={800}
                      activeOpacity={0.75}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={getAccessibilityLabel(btn)}
                      accessibilityHint={getAccessibilityHint(btn)}
                    >
                      <Text
                        style={textStyle}
                        accessible={false}
                        importantForAccessibility="no"
                      >
                        {btn}
                      </Text>
                    </TouchableOpacity>
                  );
                }

                return (
                  <TouchableOpacity
                    key={btn}
                    style={btnStyle}
                    onPress={() => handlePress(btn)}
                    activeOpacity={0.75}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel={getAccessibilityLabel(btn)}
                    accessibilityHint={getAccessibilityHint(btn)}
                  >
                    <Text
                      style={textStyle}
                      accessible={false}
                      importantForAccessibility="no"
                    >
                      {btn}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </SafeLayout>

      {/* ── Modal de instrucciones para tutorial ── */}
      {showInstructions && (
        <Modal
          visible={true}
          transparent
          animationType="fade"
          onRequestClose={() => setShowInstructions(false)}
        >
          <SafeAreaView style={styles.instructionsOverlay}>
            <View
              style={styles.instructionsContainer}
              accessibilityViewIsModal={true}
            >
              {/* Instrucción 1: Uso normal */}
              <View style={styles.instructionCard}>
                <View
                  style={styles.instructionHeader}
                  accessible={false}
                  importantForAccessibility="no-hide-descendants"
                >
                  <Ionicons
                    name="calculator"
                    size={28}
                    color="#F31A73"
                    accessible={false}
                  />
                  <AppText
                    variant="h4"
                    color="light"
                    style={styles.instructionTitle}
                    accessible={false}
                  >
                    Uso normal
                  </AppText>
                </View>
                <AppText
                  variant="body"
                  color="light"
                  style={styles.instructionText}
                  accessible={true}
                  accessibilityLabel="Uso normal: Funciona como cualquier calculadora para tus operaciones diarias."
                >
                  Funciona como cualquier calculadora para tus operaciones
                  diarias.
                </AppText>
              </View>

              {/* Instrucción 2: Cerrar */}
              <View style={styles.instructionCard}>
                <View
                  style={styles.instructionHeader}
                  accessible={false}
                  importantForAccessibility="no-hide-descendants"
                >
                  <Ionicons
                    name="hand-left"
                    size={28}
                    color="#82368C"
                    accessible={false}
                  />
                  <AppText
                    variant="h4"
                    color="light"
                    style={styles.instructionTitle}
                    accessible={false}
                  >
                    Ocultar calculadora
                  </AppText>
                </View>
                <AppText
                  variant="body"
                  color="light"
                  style={styles.instructionText}
                  accessible={true}
                  accessibilityLabel="Para volver a la app. Mantén presionado el botón igual durante 1 segundo para regresar a Perla."
                >
                  Mantén presionado el botón &quot;=&quot; por 1 segundo para
                  regresar a la app principal.
                </AppText>
              </View>

              {/* Botón para cerrar instrucciones */}
              <TouchableOpacity
                style={styles.dismissButton}
                onPress={() => setShowInstructions(false)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Entendido, cerrar instrucciones"
              >
                <AppText variant="h4" color="light" accessible={false}>
                  Entendido
                </AppText>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  displayArea: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: W * 0.06,
    paddingBottom: H * 0.01,
  },
  expression: {
    color: "rgba(255,255,255,0.40)",
    marginBottom: 4,
  },
  displayText: {
    color: "#ffffff",
    fontWeight: "200",
    letterSpacing: -1,
  },
  hint: {
    color: C.hint,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  keyboard: {
    // gap y paddingHorizontal se aplican inline (dinámicos)
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  instructionsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: W * 0.05,
  },
  instructionsContainer: {
    backgroundColor: "#1c1c1e",
    borderRadius: 20,
    padding: W * 0.06,
    width: "100%",
    maxWidth: 400,
  },
  instructionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Más contraste
    borderLeftWidth: 4,
    borderLeftColor: "#F31A73", // Rosa brillante en vez del morado oscuro
    padding: W * 0.04,
    marginBottom: W * 0.05,
    borderRadius: 12,
  },
  instructionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: W * 0.03,
  },
  instructionTitle: {
    color: "#ffffff", // Blanco puro
    fontSize: 16,
    fontWeight: "700", // Más grueso
    marginLeft: W * 0.03,
    flex: 1,
  },
  instructionText: {
    color: "#ffffff", // Blanco 100% en vez de 75%
    fontSize: 15, // Un poco más grande
    lineHeight: 22,
  },
  dismissButton: {
    backgroundColor: "#F31A73",
    paddingVertical: W * 0.035,
    borderRadius: 10,
    alignItems: "center",
    marginTop: W * 0.03,
  },
  dismissButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
