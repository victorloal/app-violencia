import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import { colors } from "../thema/colors";
import AppTextInput from "../components/UI/AppTextInput";
import RuralIcon from "../assets/icons/Rural";
import UrbanoIcon from "../assets/icons/Urbano";
import MujerIcon from "../assets/icons/mujer";

const { width, height } = Dimensions.get("window");

// Configuración de preguntas con soporte para iconos personalizados
const questions = [
  {
    id: "1",
    question: "¿En qué distrito te encuentras?",
    options: [
      { label: "Tumaco", value: "tumaco" },
      { label: "Buenaventura", value: "buenaventura" },
    ],
    key: "region",
    icon: "location-outline",
  },
  {
    id: "2",
    question: "Seleccione su zona",
    options: [
      { label: "Rural", value: "rural", icon: "rural", isSvg: true },
      { label: "Urbana", value: "urbana", icon: "urbano", isSvg: true },
    ],
    key: "zona",
    icon: "home-outline",
  },
  {
    id: "3",
    question: "Seleccione su grupo étnico",
    options: [
      { label: "Indígena", value: "indigena" },
      { label: "Afrodescendiente", value: "afro" },
      { label: "Mestizo", value: "mestizo" },
      { label: "Otro, ¿cual?", value: "otro", hasInput: true },
    ],
    key: "etnia",
    icon: "mujer",
    isSvgIcon: true,
  },
  {
    id: "4",
    question: "¿En qué rango de edad se encuentra?",
    options: [
      { label: "Menor de edad (10 - 17)", value: "menor" },
      { label: "Joven (18 - 28)", value: "joven" },
      { label: "Adulta (29 - 59)", value: "adulto" },
      { label: "Adulta mayor (60+)", value: "adulto_mayor" },
    ],
    key: "edad",
    icon: "calendar-outline",
  },
  {
    id: "5",
    question: "¿En qué situación laboral se encuentra?",
    options: [
      { label: "Empleada", value: "empleado", icon: "briefcase-outline" },
      {
        label: "Desempleada",
        value: "desempleado",
        icon: "remove-circle-outline",
      },
      { label: "Estudiante", value: "estudiante", icon: "school-outline" },
      {
        label: "Independiente",
        value: "independiente",
        icon: "construct-outline",
      },
    ],
    key: "laboral",
    icon: "briefcase-outline",
  },
];

// Componente para renderizar iconos en opciones (Soporta SVG personalizados)
const OptionIcon = ({ icon, isSvg, color, size = 22 }) => {
  if (isSvg) {
    if (icon === "rural")
      return <RuralIcon width={size} height={size} fill={color} />;
    if (icon === "urbano")
      return <UrbanoIcon width={size} height={size} fill={color} />;
    if (icon === "mujer")
      return <MujerIcon width={size} height={size} fill={color} />;
  }
  return <Ionicons name={icon} size={size} color={color} />;
};

// Componente para el icono de la pregunta (soporta SVG e Ionicons)
const QuestionIcon = ({ icon, isSvg, color, size = 28 }) => {
  if (isSvg && icon === "mujer") {
    return <MujerIcon width={size} height={size} fill={color} />;
  }
  return <Ionicons name={icon} size={size} color={color} />;
};

// Componente para el icono de progreso (tamaños más pequeños)
const ProgressIcon = ({ icon, isSvg, color, size = 14 }) => {
  if (isSvg && icon === "mujer") {
    return <MujerIcon width={size} height={size} fill={color} />;
  }
  return <Ionicons name={icon} size={size} color={color} />;
};

export default function FormScreen({ navigation }) {
  const OTHER_VALUE = "otro";
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [otherText, setOtherText] = useState("");
  const [otherInputVisible, setOtherInputVisible] = useState(false);

  // Cargar datos guardados previamente
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("userData");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setFormData(parsed);

          // Verificar si hay un valor "otro" guardado para mostrar el input
          const currentQuestion = questions[currentIndex];
          if (currentQuestion) {
            const currentValue = parsed[currentQuestion.key];
            if (
              currentValue &&
              currentValue !== OTHER_VALUE &&
              !currentQuestion.options.find((opt) => opt.value === currentValue)
            ) {
              setOtherText(currentValue);
              setOtherInputVisible(true);
              setFormData((prev) => ({
                ...prev,
                [currentQuestion.key]: OTHER_VALUE,
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error cargando datos del formulario:", error);
      }
    };
    loadSavedData();
  }, []);

  // Verificar si la opción actual es "Otro" y mostrar input
  useEffect(() => {
    const currentQuestion = questions[currentIndex];
    const currentValue = formData[currentQuestion?.key];
    const hasOtherOption = currentQuestion?.options.some((opt) => opt.hasInput);
    const isOtherSelected = currentValue === OTHER_VALUE;

    setOtherInputVisible(hasOtherOption && isOtherSelected);

    // Si no está seleccionado "Otro", limpiar el texto
    if (!isOtherSelected && otherText) {
      setOtherText("");
    }
  }, [currentIndex, formData]);

  const handleSelect = (key, value, hasInput = false) => {
    if (hasInput && value === OTHER_VALUE) {
      setFormData({ ...formData, [key]: OTHER_VALUE });
      setOtherInputVisible(true);
    } else {
      setFormData({ ...formData, [key]: value });
      if (otherInputVisible) {
        setOtherInputVisible(false);
        setOtherText("");
      }
    }
  };

  const handleOtherTextChange = (text) => {
    setOtherText(text);
  };

  const handleNext = async () => {
    const currentQuestion = questions[currentIndex];
    const currentKey = currentQuestion.key;
    let updatedData = { ...formData };

    if (otherInputVisible && otherText.trim()) {
      updatedData[currentKey] = otherText.trim();
    } else if (formData[currentKey] === OTHER_VALUE && !otherText.trim()) {
      return;
    }

    setFormData(updatedData);
    await AsyncStorage.setItem("userData", JSON.stringify(updatedData));

    if (updatedData.region) {
      await AsyncStorage.setItem("region", updatedData.region);
    }

    if (currentIndex < questions.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
      setOtherInputVisible(false);
      setOtherText("");
    } else {
      await AsyncStorage.setItem("formCompleted", "true");
      import("../services/apiService").then(({ enviarPerfil }) => {
        enviarPerfil(updatedData);
      });
      navigation.replace("Home");
    }
  };

  const isNextDisabled = () => {
    const currentQuestion = questions[currentIndex];
    const currentValue = formData[currentQuestion.key];

    if (!currentValue) return true;
    if (currentValue === OTHER_VALUE && !otherText.trim()) return true;
    return false;
  };

  // Función para verificar si una pregunta está completada
  const isQuestionCompleted = (question, index) => {
    if (index < currentIndex) return true;
    const value = formData[question.key];
    if (!value) return false;
    if (value === OTHER_VALUE && !otherText.trim()) return false;
    return true;
  };

  const renderItem = ({ item }) => {
    const isLastQuestion = currentIndex === questions.length - 1;
    const currentValue = formData[item.key];

    return (
      <View style={styles.slide}>
        <View style={styles.card}>
          <ScrollView
            style={styles.contentScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header pregunta */}
            <View style={styles.questionHeader}>
              <QuestionIcon
                icon={item.icon}
                isSvg={item.isSvgIcon}
                color={colors.lavender[600]}
                size={32}
              />
              <AppText variant="h2" style={styles.question}>
                {item.question}
              </AppText>
            </View>

            {/* Opciones */}
            <View style={styles.optionsContainer}>
              {item.options.map((option) => {
                const isSelected = currentValue === option.value;

                return (
                  <Button
                    key={option.value}
                    type={isSelected ? "primary" : "primaryOutline"}
                    size="xl"
                    variant="default"
                    onPress={() =>
                      handleSelect(item.key, option.value, option.hasInput)
                    }
                    style={[styles.option, isSelected && styles.selected]}
                  >
                    <View style={styles.optionContent}>
                      {option.icon && (
                        <OptionIcon
                          icon={option.icon}
                          isSvg={option.isSvg}
                          color={
                            isSelected ? colors.white : colors.lavender[600]
                          }
                          size={35}
                        />
                      )}
                      <AppText
                        variant="body"
                        color={isSelected ? "light" : "secondary"}
                        style={styles.optionLabel}
                      >
                        {option.label}
                      </AppText>
                      {isSelected && !option.hasInput && (
                        <Ionicons
                          name="checkmark-circle"
                          size={22}
                          color={colors.white}
                        />
                      )}
                    </View>
                  </Button>
                );
              })}
            </View>

            {/* Input para "Otro" */}
            {otherInputVisible && (
              <View style={styles.otherContainer}>
                <AppTextInput
                  placeholder="Especifica aquí..."
                  variant="default"
                  size="large"
                  keyboardType="default"
                  onChangeText={handleOtherTextChange}
                  value={otherText}
                  autoFocus={true}
                  leftIcon={
                    <Ionicons
                      name="create-outline"
                      size={18}
                      color={colors.lavender[500]}
                    />
                  }
                />
              </View>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            {/* Progreso */}
            <View style={styles.progressContainer}>
              {questions.map((q, index) => {
                const isPast = index < currentIndex;
                const isCurrent = index === currentIndex;
                const isCompleted = isQuestionCompleted(q, index);

                // Determinar el color del icono según el estado
                let iconColor;
                if (isCurrent) {
                  iconColor = colors.white;
                } else if (isPast || isCompleted) {
                  iconColor = colors.white;
                } else {
                  iconColor = colors.neutral[600];
                }

                // Tamaño del icono según el estado
                const iconSize = isCurrent ? 18 : 14;

                return (
                  <View
                    key={index}
                    style={[
                      styles.progressItem,
                      (isPast || isCompleted) && styles.progressPast,
                      isCurrent && styles.progressCurrent,
                    ]}
                  >
                    <ProgressIcon
                      icon={q.icon}
                      isSvg={q.isSvgIcon}
                      color={iconColor}
                      size={iconSize}
                    />
                  </View>
                );
              })}
            </View>

            {/* Botón siguiente */}
            <Button
              type="primary"
              size="xl"
              onPress={handleNext}
              disabled={isNextDisabled()}
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
    maxHeight: "90%", // Evitar que la card sea más alta que la pantalla
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  contentScroll: {
    flexShrink: 1, // Permite que el scroll ocupe el espacio necesario sin empujar el footer fuera
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 8, // Aire al final del scroll
  },
  questionHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    gap: 12,
  },
  question: {
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    marginBottom: 24,
    gap: 8,
  },
  option: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionLabel: {
    flex: 1,
  },
  selected: {
    backgroundColor: colors.lavender[600],
    borderColor: colors.lavender[600],
  },
  otherContainer: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
    alignItems: "center",
    gap: 24,
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
  },
  progressItem: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lavender[100],
    justifyContent: "center",
    alignItems: "center",
  },
  progressPast: {
    backgroundColor: colors.lavender[600],
  },
  progressCurrent: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lavender[700],
  },
});
