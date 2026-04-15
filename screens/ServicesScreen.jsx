import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import { spacing, borderRadius, shadow, borderWidth } from "../styles/tokens";
import SaludIcon from "../assets/icons/Salud";
import ProteccionIcon from "../assets/icons/Protección";
import JusticiaIcon from "../assets/icons/Justicia";
import MPublicoIcon from "../assets/icons/ministerio_publico";
import { getTypeConfig } from "../thema/placesTypes";
import MainLayout from "../components/Layout/MainLayout";
import { colors } from "../thema/colors";
import { enviarSolicitud, registrarEvento } from "../services/apiService";
const { width, height } = Dimensions.get("window");

const questions = [
  {
    id: "1",
    question: "¿Necesitas atención médica o psicológica urgente?",
    options: ["Sí", "No"],
    key: "atencion_medica",
    placeType: "salud",
    icon: SaludIcon,
    redirectTo: {
      tumaco: "hospital_san_andres",
      buenaventura: "hospital_luis_ablanque_distrital",
    },
  },
  {
    id: "2",
    question:
      "¿Quieres presentar una denuncia sobre la violencia que sufriste?",
    options: ["Sí", "No"],
    key: "denuncia",
    placeType: "justicia",
    icon: JusticiaIcon,
    redirectTo: {
      tumaco: "fiscalia_tumaco",
      buenaventura: "fiscalia_buenaventura",
    },
  },
  {
    id: "3",
    question:
      "¿La persona que te agredió es tu pareja, expareja o alguien de tu familia?",
    options: ["Sí", "No"],
    key: "agresor",
    placeType: "protección",
    icon: ProteccionIcon,
    redirectTo: {
      tumaco: "comisaria_tumaco",
      buenaventura: "comisaria_buenaventura",
    },
  },
  {
    id: "4",
    question:
      "¿La persona que te agrede ha utilizado a tu hijo o hija para lastimarte emocionalmente?",
    options: ["Sí", "No"],
    key: "amenaza_hijos",
    placeType: "protección",
    icon: ProteccionIcon,
    redirectTo: {
      tumaco: "icbf_tumaco",
      buenaventura: "icbf_buenaventura",
    },
  },
  {
    id: "5",
    question:
      "¿Consideras que tus derechos como víctima fueron vulnerados durante la atención de tu caso por una persona empleada, funcionaria o contratista?",
    options: ["Sí", "No"],
    key: "derechos_vulnerados",
    placeType: "ministerio_publico",
    icon: MPublicoIcon,
    redirectTo: {
      tumaco: "defensoria_del_pueblo_tumaco",
      buenaventura: "defensoria_del_pueblo_buenaventura",
    },
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
    const answer = formData[currentKey];
    let updatedData = { ...formData };

    // Guardar temporalmente los datos
    await AsyncStorage.setItem("userData", JSON.stringify(updatedData));

    // Si la respuesta es "Sí", buscar redirección específica
    if (answer === "Sí") {
      const region = await AsyncStorage.getItem("region");
      const normalizedRegion = region ? region.trim().toLowerCase() : null;

      let targetPlaceId = null;
      if (currentQuestion.redirectTo && normalizedRegion) {
        targetPlaceId = currentQuestion.redirectTo[normalizedRegion];
      }

      const placeType = currentQuestion.placeType;

      console.log(
        `Redirigiendo a: ${targetPlaceId || placeType} (Region: ${normalizedRegion})`,
      );
      await AsyncStorage.setItem("hasYesAnswer", "true");

      enviarSolicitud(updatedData, placeType);
      registrarEvento("solicitar_ayuda", placeType, "ServicesScreen");

      // Redirigir a Places con el tipo y el ID específico (si existe)
      navigation.replace("Places", {
        tipo: placeType,
        placeId: targetPlaceId,
      });
      return;
    }

    // Si no es "Sí" y no es la última pregunta, continuar
    if (currentIndex < questions.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      // Si llegó al final sin haber respondido "Sí" a NADA significativo (o al menos a esta última)
      // Nota: El comportamiento actual redirige al primer "SÍ" encontrado en el histórico si existe,
      // pero el usuario pidió "Siguiente" -> Redirección.
      // Vamos a verificar si HUBO algún "SÍ" previo que no disparó redirección (aunque con la lógica anterior sí lo hacía).

      const previousYesType = getPlaceTypeFromYesAnswer();

      if (previousYesType) {
        navigation.replace("Places", { tipo: previousYesType });
      } else {
        enviarSolicitud(updatedData, "otro");
        await AsyncStorage.setItem("formCompleted", "true");
        navigation.replace("Places", { tipo: "otro" });
      }
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
          case "justicia":
            return "Ver asesoría legal";
          case "protección":
            return "Ver centros de protección";
          default:
            return "Ver lugares de ayuda";
        }
      }
      return isLastQuestion ? "Finalizar" : "Siguiente";
    };

    const currentType = item.placeType;
    const theme = getTypeConfig(currentType);

    return (
      <View style={[styles.slide, { backgroundColor: theme.background }]}>
        <View style={styles.card}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            indicatorStyle="default"
            automaticallyAdjustsScrollIndicatorInsets={true}
            persistentScrollbar={true}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header pregunta con icono */}
            <View style={styles.questionHeader}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                  },
                ]}
              >
                <item.icon
                  width={50}
                  height={50}
                  fill={theme.primary}
                  fillSecondary={theme.primary}
                />
              </View>
              <AppText
                variant="h2"
                style={[styles.question, { color: theme.text }]}
              >
                {item.question}
              </AppText>
            </View>
          </ScrollView>

          {/* Opciones */}
          <View style={styles.optionsContainer}>
            {item.options.map((option) => {
              const isSelected = formData[item.key] === option;

              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.7}
                  style={[
                    [
                      styles.option,
                      {
                        borderColor: theme.border,
                      },
                    ],
                    isSelected && {
                      borderColor: theme.primary,
                      backgroundColor: theme.background,
                    },
                  ]}
                  onPress={() => handleSelect(item.key, option)}
                >
                  <AppText
                    variant="body"
                    style={{
                      color: isSelected ? theme.primary : colors.neutral[600],
                    }}
                  >
                    {option}
                  </AppText>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={theme.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

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
                      [
                        styles.progressItem,
                        {
                          backgroundColor: theme.badgeBg,
                          borderRadius: borderRadius.circle,
                        },
                      ],
                      isPast && { backgroundColor: theme.primary },
                      isCurrent && {
                        backgroundColor: theme.primary,
                        width: 48,
                        height: 48,
                      },
                    ]}
                  >
                    {(isCurrent && (
                      <q.icon fill={colors.white} width={38} height={38} />
                    )) ||
                      (isPast && (
                        <q.icon fill={colors.white} width={32} height={32} />
                      )) || (
                        <q.icon fill={theme.primary} width={32} height={32} />
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
              style={{ backgroundColor: theme.primary }}
            >
              {getButtonTitle()}
            </Button>
          </View>
        </View>
      </View>
    );
  };

  return (
    <MainLayout>
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
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.lavender[50],
  },
  slide: {
    width: width,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    ...shadow.md,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionHeader: {
    alignItems: "center",
    marginBottom: spacing.lg,
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
