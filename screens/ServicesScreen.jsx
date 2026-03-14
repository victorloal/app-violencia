import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import StyledButton from "../components/UI/Button";
import { colors } from "../thema/colors";

const { width, height } = Dimensions.get("window");

const questions = [
  {
    id: "1",
    question: "¿Necesitas atención médica?",
    options: ["Sí", "No"],
    key: "atencion_medica",
    placeType: "salud", // Tipo de lugar al que redirigir si responde Sí
  },
  {
    id: "2",
    question: "¿Te gustaría recibir apoyo psicológico?",
    options: ["Sí", "No"],
    key: "apoyo_psicologico",
    placeType: "psicologico",
  },
  {
    id: "3",
    question: "¿Necesitas denunciar lo ocurrido?",
    options: ["Sí", "No"],
    key: "denuncia",
    placeType: "legal",
  },
  {
    id: "4",
    question: "¿Te gustaría hablar con la policía?",
    options: ["Sí", "No"],
    key: "hablar_con_policia",
    placeType: "proteccion",
  },
  {
    id: "5",
    question: "¿Sientes que necesitas protección?",
    options: ["Sí", "No"],
    key: "proteccion",
    placeType: "proteccion",
  },
  {
    id: "6",
    question: "¿Te gustaría recibir asesoría legal?",
    options: ["Sí", "No"],
    key: "asesoria_legal",
    placeType: "legal",
  },
  {
    id: "7",
    question: "¿Estás buscando apoyo para tus niños o niñas?",
    options: ["Sí", "No"],
    key: "apoyo_ninos",
    placeType: "psicologico",
  },
];

export default function ServicesScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [otherText, setOtherText] = useState("");

  // Función para obtener el tipo de lugar basado en la respuesta "Sí"
  const getPlaceTypeFromYesAnswer = () => {
    // Buscamos la primera pregunta con respuesta "Sí"
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

  const handleSelect = (key, value, multiple = false) => {
    if (multiple) {
      const currentValues = Array.isArray(formData[key]) ? formData[key] : [];
      if (currentValues.includes(value)) {
        setFormData({
          ...formData,
          [key]: currentValues.filter((v) => v !== value),
        });
      } else {
        setFormData({ ...formData, [key]: [...currentValues, value] });
      }
    } else {
      setFormData({ ...formData, [key]: value });

      if (value === "Sí") {
        console.log("Respuesta Sí detectada en:", key);
      }
    }
  };

  const handleNext = async () => {
    const currentQuestion = questions[currentIndex];
    const currentKey = currentQuestion.key;
    let updatedData = { ...formData };

    // Manejar la opción "Otro" (si existiera)
    if (currentQuestion.multiple) {
      const currentValues = Array.isArray(formData[currentKey])
        ? formData[currentKey]
        : [];
      if (currentValues.includes("Otro") && otherText) {
        updatedData[currentKey] = currentValues.map((v) =>
          v === "Otro" ? otherText : v,
        );
      }
    } else if (formData[currentKey] === "Otro" && otherText) {
      updatedData[currentKey] = otherText;
    }

    setFormData(updatedData);
    setOtherText("");

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
          <AppText variant="title" align="center" style={styles.question}>
            {item.question}
          </AppText>

          <View style={styles.optionsContainer}>
            {item.options.map((option) => {
              const isSelected = item.multiple
                ? Array.isArray(formData[item.key]) &&
                  formData[item.key].includes(option)
                : formData[item.key] === option;

              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.7}
                  style={[
                    styles.option,
                    isSelected && styles.selected,
                    option === "Sí" &&
                      hasYes &&
                      !isSelected &&
                      styles.yesOptionHighlighted,
                  ]}
                  onPress={() => handleSelect(item.key, option, item.multiple)}
                >
                  <AppText
                    variant="body"
                    tone={isSelected ? "normal" : "muted"}
                    style={isSelected && styles.selectedText}
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
                size={20}
                color={colors.lavender[600]}
              />
              <AppText variant="small" style={styles.infoText}>
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

          <View style={styles.footer}>
            {/* Indicador de progreso */}
            <View style={styles.progressContainer}>
              {questions.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentIndex && styles.activeDot,
                    index < currentIndex && styles.completedDot,
                  ]}
                />
              ))}
            </View>

            <StyledButton
              title={getButtonTitle()}
              tone="dark"
              size="large"
              onPress={handleNext}
              disabled={
                item.multiple
                  ? !formData[item.key] ||
                    formData[item.key].length === 0 ||
                    (formData[item.key].includes("Otro") && !otherText)
                  : !formData[item.key] ||
                    (formData[item.key] === "Otro" && !otherText)
              }
              icon={
                <Ionicons
                  name={getButtonIcon()}
                  size={20}
                  color={colors.white}
                />
              }
              iconPosition="right"
            />
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
    backgroundColor: colors.lavender[50],
  },
  slide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  question: {
    marginBottom: 32,
    color: colors.lavender[900],
  },
  optionsContainer: {
    width: "100%",
    marginBottom: 24,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderWidth: 2,
    borderColor: colors.neutral[100],
    borderRadius: 16,
    marginVertical: 6,
    backgroundColor: colors.neutral[50],
  },
  selected: {
    borderColor: colors.lavender[500],
    backgroundColor: colors.lavender[50],
  },
  selectedText: {
    fontWeight: "700",
    color: colors.lavender[800],
  },
  yesOptionHighlighted: {
    borderColor: colors.lavender[300],
    backgroundColor: colors.lavender[50],
  },
  input: {
    borderWidth: 2,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    fontSize: 16,
    color: colors.neutral[900],
  },
  infoMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[50],
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  infoText: {
    color: colors.lavender[700],
    flex: 1,
  },
  footer: {
    marginTop: 16,
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral[200],
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.lavender[600],
  },
  completedDot: {
    backgroundColor: colors.lavender[300],
  },
});
