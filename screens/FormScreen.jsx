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
import StyledButton from "../components/UI/StyledButton";
import { colors } from "../thema/colors";

const { width, height } = Dimensions.get("window");

const questions = [
  {
    id: "1",
    question: "¿En qué región te encuentras?",
    options: ["Tumaco", "Buenaventura"],
    key: "region",
  },
  {
    id: "2",
    question: "Zona",
    options: ["Rural", "Urbana"],
    key: "zona",
  },
  {
    id: "3",
    question: "Grupo étnico",
    options: ["Indígena", "Afrodescendiente", "Mestizo", "Otro"],
    key: "etnia",
    multiple: true,
  },
  {
    id: "4",
    question: "Rango de edad",
    options: ["18-25", "26-35", "36-50", "50+"],
    key: "edad",
  },
  {
    id: "5",
    question: "Situación laboral",
    options: ["Empleado", "Desempleado", "Estudiante", "Independiente"],
    key: "laboral",
  },
  {
    id: "6",
    question: "Orientación sexual",
    options: ["Heterosexual", "Homosexual", "Bisexual", "Otro"],
    key: "orientacion",
  },
];

export default function FormScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [otherText, setOtherText] = useState("");

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
    }
  };

  const handleNext = async () => {
    const currentQuestion = questions[currentIndex];
    const currentKey = currentQuestion.key;
    let updatedData = { ...formData };

    // Manejar la opción "Otro"
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

    if (currentIndex < questions.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
      await AsyncStorage.setItem("formCompleted", "true");
      navigation.replace("Message");
    }
  };

  const renderItem = ({ item }) => {
    const isLastQuestion = currentIndex === questions.length - 1;

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
                  style={[styles.option, isSelected && styles.selected]}
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

          {(item.multiple
            ? Array.isArray(formData[item.key]) &&
              formData[item.key].includes("Otro")
            : formData[item.key] === "Otro") && (
            <TextInput
              placeholder="Especifica aquí..."
              placeholderTextColor={colors.neutral[400]}
              style={styles.input}
              onChangeText={setOtherText}
              value={otherText}
            />
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
              title={isLastQuestion ? "Finalizar" : "Siguiente"}
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
                  name={isLastQuestion ? "checkmark" : "arrow-forward"}
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
  input: {
    borderWidth: 2,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    fontSize: 16,
    color: colors.neutral[900],
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
