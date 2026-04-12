import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import { colors } from "../thema/colors";
import AppTextInput from "../components/UI/AppTextInput";
import RuralIcon from "../assets/icons/Rural";
import UrbanoIcon from "../assets/icons/Urbano";

const { width, height } = Dimensions.get("window");

// Configuración de iconos para cada pregunta y opción
const questions = [
  {
    id: "1",
    question: "¿En qué distrito te encuentras?",
    options: [{ label: "Tumaco" }, { label: "Buenaventura" }],
    key: "region",
    icon: "location-outline", // Icono para la pregunta
  },
  {
    id: "2",
    question: "Seleccione su zona",
    options: [
      { label: "Rural", icon: "rural" },
      { label: "Urbana", icon: "urbano" },
    ],
    key: "zona",
    icon: "home-outline",
  },
  {
    id: "3",
    question: "Seleccione su grupo étnico",
    options: [
      { label: "Indígena" },
      { label: "Afrodescendiente", icon: "people" },
      { label: "Mestizo", icon: "people" },
      { label: "Otro", icon: "ellipsis-horizontal-circle-outline" },
    ],
    key: "etnia",
    icon: "people-outline",
  },
  {
    id: "4",
    question: "¿En que rango de edad se encuentra?",
    options: [
      { label: "Menor de edad (10 - 17)", value: "menor", icon: "person" },
      { label: "Joven (18 - 28)", value: "joven", icon: "person" },
      { label: "Adulto (29 - 59)", value: "adulto", icon: "person" },
      { label: "Adulto mayor (60+)", value: "adulto_mayor", icon: "person" },
    ],
    key: "edad",
    icon: "calendar-outline",
  },
  {
    id: "5",
    question: "¿En que situación laboral se encuentra?",
    options: [
      { label: "Empleado", icon: "briefcase" },
      { label: "Desempleado", icon: "remove-circle" },
      { label: "Estudiante", icon: "school" },
      { label: "Independiente", icon: "construct" },
    ],
    key: "laboral",
    icon: "cash-outline",
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

      // Enviar al backend (no bloquea la navegación)
      import("../services/apiService").then(({ enviarPerfil }) => {
        enviarPerfil(updatedData);
      });

      navigation.replace("Home");
    }
  };

  const renderItem = ({ item }) => {
    const isLastQuestion = currentIndex === questions.length - 1;

    return (
      <View style={styles.slide}>
        <View style={styles.card}>
          {/* Header pregunta */}
          <View style={styles.questionHeader}>
            <View style={styles.questionIcon}>
              <Ionicons
                name={item.icon}
                size={28}
                color={colors.lavender[600]}
              />
            </View>

            <AppText variant="h2" align="center" style={styles.question}>
              {item.question}
            </AppText>
          </View>

          {/* Opciones */}
          <View style={styles.optionsContainer}>
            {item.options.map((option) => {
              const isSelected = item.multiple
                ? Array.isArray(formData[item.key]) &&
                  formData[item.key].includes(option.label)
                : formData[item.key] === option.label;

              return (
                <Button
                  key={option.label}
                  type="primaryOutline"
                  size="xl"
                  variant="default"
                  textVariant="bold"
                  style={[styles.option, isSelected && styles.selected]}
                  onPress={() =>
                    handleSelect(item.key, option.label, item.multiple)
                  }
                >
                  <View style={styles.optionContent}>
                    {option.icon === "rural" ? (
                      <RuralIcon
                        width={22}
                        height={22}
                        color={
                          isSelected
                            ? colors.lavender[600]
                            : colors.neutral[500]
                        }
                      />
                    ) : option.icon === "urbano" ? (
                      <UrbanoIcon
                        width={22}
                        height={22}
                        color={
                          isSelected
                            ? colors.lavender[600]
                            : colors.neutral[500]
                        }
                      />
                    ) : (
                      <Ionicons
                        name={option.icon}
                        size={22}
                        color={
                          isSelected
                            ? colors.lavender[600]
                            : colors.neutral[500]
                        }
                      />
                    )}

                    <AppText variant="h4">{option.label}</AppText>

                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        style={{ alignItems: "flex-end" }}
                        size={22}
                        color={colors.lavender[600]}
                      />
                    )}
                  </View>
                </Button>
              );
            })}
          </View>

          {/* Input para "Otro" */}
          {(item.multiple
            ? Array.isArray(formData[item.key]) &&
              formData[item.key].includes("Otro")
            : formData[item.key] === "Otro") && (
            <View style={styles.otherContainer}>
              <AppTextInput
                placeholder="Especifica aquí..."
                type="default"
                variant="default"
                size="large"
                keyboardType="default"
                bold
                state="focused"
                onChangeText={setOtherText}
                value={otherText}
                leftIcon={
                  <Ionicons
                    name="create"
                    size={18}
                    color={colors.lavender[500]}
                    style={styles.otherIcon}
                  />
                }
              ></AppTextInput>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            {/* progreso */}
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
                    <Ionicons
                      name={q.icon}
                      size={isCurrent ? 18 : 14}
                      color={
                        isCurrent
                          ? colors.white
                          : isPast
                            ? colors.white
                            : colors.neutral[600]
                      }
                    />
                  </View>
                );
              })}
            </View>

            {/* botón siguiente */}
            <Button
              type="primary"
              size="xl"
              textVariant="bold"
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
            >
              {isLastQuestion ? "Finalizar" : "Siguiente"}
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
    backgroundColor: colors.lavender[50],
  },
  questionHeader: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  questionIcon: {
    marginRight: 12,
    alignItems: "center",
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
    alignSelf: "center",
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    marginBottom: 24,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 16,
    marginVertical: 6,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  optionIcon: {
    marginRight: 12,
  },
  selected: {
    backgroundColor: colors.lavender[200],
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.neutral[50],
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: colors.neutral[900],
  },
  otherContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  otherInputWrapper: {
    backgroundColor: colors.lavender[500],
  },

  otherIcon: {
    marginRight: 8,
  },

  footer: {
    marginTop: 16,
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 8,
  },
  progressItem: {
    width: 32,
    height: 32,
    borderRadius: 90,
    backgroundColor: colors.lavender[100],
    justifyContent: "center",
    alignItems: "center",
  },
  progressPast: {
    backgroundColor: colors.lavender[600],
  },
  progressCurrent: {
    width: 40,
    height: 40,
    backgroundColor: colors.lavender[700],
  },
  activeProgressItem: {
    backgroundColor: colors.lavender[700],
  },
});
