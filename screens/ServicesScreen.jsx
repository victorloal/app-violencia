import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import { colors } from "../thema/colors";
import { spacing, borderRadius, shadow } from "../styles/tokens";

const { width, height } = Dimensions.get("window");

const questions = [
  {
    id: "1",
    question: "¿Necesitas atención médica o psicológica urgente?",
    options: ["Sí", "No"],
    key: "atencion_medica",
    placeType: "salud",
    icon: "medkit-outline",
  },
  {
    id: "2",
    question:
      "¿Quieres presentar una denuncia sobre la violencia que sufriste?",
    options: ["Sí", "No"],
    key: "denuncia",
    placeType: "legal",
    icon: "alert-circle-outline",
  },
  {
    id: "3",
    question:
      "¿La persona que te agredió es tu pareja, expareja o alguien de tu familia?",
    options: ["Sí", "No"],
    key: "agresor",
    placeType: "legal",
    icon: "alert-circle-outline",
  },
  {
    id: "4",
    question:
      "¿La persona que te agrede ha utilizado a tu hijo o hija para lastimarte emocionalmente?",
    options: ["Sí", "No"],
    key: "amenaza_hijos",
    placeType: "proteccion",
    icon: "shield-outline",
  },
  {
    id: "5",
    question:
      "¿Consideras que tus derechos como víctima fueron vulnerados durante la atención de tu caso por una persona empleada, funcionaria o contratista?",
    options: ["Sí", "No"],
    key: "derechos_vulnerados",
    placeType: "proteccion",
    icon: "lock-closed-outline",
  },
];

export default function ServicesScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});

  // Función para obtener el tipo de lugar basado en la respuesta "Sí"
  const getPlaceTypeFromYesAnswer = () => {
    for (let i = 0; i <= currentIndex; i++) {
      const question = questions[i];
      if (formData[question.key] === "Sí") {
        return question.placeType;
      }
    }
    return null;
  };

  // Función para verificar si hay alguna respuesta "Sí"
  const hasAnyYesAnswer = () => {
    const answeredQuestions = questions.slice(0, currentIndex + 1);
    return answeredQuestions.some((question) => {
      const answer = formData[question.key];
      return answer === "Sí";
    });
  };

  const handleSelect = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleNext = async () => {
    const currentQuestion = questions[currentIndex];
    const currentKey = currentQuestion.key;
    let updatedData = { ...formData };

    // Guardar temporalmente los datos
    await AsyncStorage.setItem("userData", JSON.stringify(updatedData));

    // Verificar si hay alguna respuesta "Sí"
    if (hasAnyYesAnswer() || updatedData[currentKey] === "Sí") {
      const placeType = getPlaceTypeFromYesAnswer();
      console.log(`Redirigiendo a Place con tipo: ${placeType}`);
      await AsyncStorage.setItem("hasYesAnswer", "true");

      // Redirigir a Place con el tipo correspondiente
      navigation.replace("Places", { tipo: placeType });
      return;
    }

    // Si no hay respuestas "Sí" y no es la última pregunta, continuar
    if (currentIndex < questions.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      // Si llegó al final sin respuestas "Sí", guardar y redirigir a Message
      await AsyncStorage.setItem("formCompleted", "true");
      navigation.replace("Places", { tipo: "otro" });
    }
  };

  const renderItem = ({ item }) => {
    const isLastQuestion = currentIndex === questions.length - 1;
    const hasYes = hasAnyYesAnswer();
    const placeType = getPlaceTypeFromYesAnswer();

    // Texto del botón según el contexto
    const getButtonTitle = () => {
      if (hasYes) {
        switch (placeType) {
          case "salud":
            return "Ver centros de salud";
          case "psicologico":
            return "Ver apoyo psicológico";
          case "legal":
            return "Ver asesoría legal";
          case "proteccion":
            return "Ver centros de protección";
          default:
            return "Ver lugares de ayuda";
        }
      }
      return isLastQuestion ? "Finalizar" : "Siguiente";
    };

    // Ícono del botón según el contexto
    const getButtonIcon = () => {
      if (hasYes) {
        switch (placeType) {
          case "salud":
            return "medical";
          case "psicologico":
            return "heart";
          case "legal":
            return "scale";
          case "proteccion":
            return "shield";
          default:
            return "location";
        }
      }
      return isLastQuestion ? "checkmark" : "arrow-forward";
    };

    return (
      <View style={styles.slide}>
        <View style={styles.card}>
          {/* Header pregunta con icono */}
          <View style={styles.questionHeader}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={item.icon}
                size={32}
                color={colors.lavender[600]}
              />
            </View>
            <AppText variant="h2" style={styles.question}>
              {item.question}
            </AppText>
          </View>

          {/* Opciones */}
          <View style={styles.optionsContainer}>
            {item.options.map((option) => {
              const isSelected = formData[item.key] === option;

              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.7}
                  style={[styles.option, isSelected && styles.selected]}
                  onPress={() => handleSelect(item.key, option)}
                >
                  <AppText
                    variant="h4"
                    color={isSelected ? "primary" : "secondary"}
                  >
                    {option}
                  </AppText>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={colors.lavender[600]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Mensaje informativo si hay respuestas "Sí" */}
          {hasYes && (
            <View style={styles.infoMessage}>
              <Ionicons
                name="information-circle"
                size={24}
                color={colors.lavender[600]}
              />
              <AppText variant="body" color="secondary" style={styles.infoText}>
                {placeType === "salud" &&
                  "Te mostraremos centros de salud cercanos"}
                {placeType === "psicologico" &&
                  "Te mostraremos centros de apoyo psicológico"}
                {placeType === "legal" &&
                  "Te mostraremos opciones de asesoría legal"}
                {placeType === "proteccion" &&
                  "Te mostraremos centros de protección"}
              </AppText>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            {/* Indicador de progreso */}
            <View style={styles.progressContainer}>
              {questions.map((q, index) => {
                const isPast = index < currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <View
                    key={index}
                    style={[
                      styles.progressItem,
                      isPast && styles.progressPast,
                      isCurrent && styles.progressCurrent,
                    ]}
                  >
                    {isCurrent && (
                      <Ionicons name={q.icon} size={16} color={colors.white} />
                    )}
                  </View>
                );
              })}
            </View>

            <Button
              type="primary"
              size="xl"
              onPress={handleNext}
              disabled={!formData[item.key]}
              iconRight={
                <Ionicons
                  name={getButtonIcon()}
                  size={20}
                  color={colors.white}
                />
              }
            >
              {getButtonTitle()}
            </Button>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={questions}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      scrollEnabled={false}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender[50],
  },
  slide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: "100%",
    maxWidth: 400,
    ...shadow.md,
  },
  questionHeader: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.lavender[50],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.lavender[200],
  },
  question: {
    textAlign: "center",
    color: colors.lavender[900],
  },
  optionsContainer: {
    width: "100%",
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.lavender[100],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
  },
  selected: {
    borderColor: colors.lavender[600],
    backgroundColor: colors.lavender[50],
  },
  infoMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[50],
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.lavender[600],
  },
  infoText: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
    gap: spacing.xl,
  },
  progressContainer: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  progressItem: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.lavender[100],
    justifyContent: "center",
    alignItems: "center",
  },
  progressPast: {
    backgroundColor: colors.lavender[400],
  },
  progressCurrent: {
    width: 48,
    height: 48,
    backgroundColor: colors.lavender[600],
  },
});
