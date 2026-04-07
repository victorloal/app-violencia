// screens/HomeScreen.jsx
import { View, StyleSheet } from "react-native";
import { colors } from "../thema/colors";
import MainLayout from "../components/Layout/MainLayout";
import AppText from "../components/UI/AppText";
import ViolenceCarousel from "../components/UI/ViolenceCarousel";
import { Ionicons } from "@expo/vector-icons";

// Datos de ejemplo para los tipos de violencia
const violenceTypes = [
  {
    id: "0",
    title: "Violencia Física",
    description:
      "Golpes, empujones, quemaduras o ataque con armas, objectos o líquidos químicos.",
    icon: <Ionicons name="fitness" size={40} color={colors.lavender[700]} />,
  },
  {
    id: "1",
    title: "Violencia Psicológica",
    description:
      "Insultos, humillaciones, chantaje, descalificaciones, burlas, amenazas contra su vida, la de sus hijos, hijas u otros integrantes de su familia, celos extremos e intentos de control",
    icon: <Ionicons name="sad" size={40} color={colors.lavender[700]} />,
  },
  {
    id: "2",
    title: "Violencia Económica",
    description:
      "Limitación y control para el uso del dinero, destrucción de elementos de trabajo, prohibición para el uso de sus pertenecias y documentos personales, entre otros.",
    icon: <Ionicons name="cash" size={40} color={colors.lavender[700]} />,
  },
  {
    id: "3",
    title: "Violencia Patrimonial",
    description:
      "Destrucción de objetos personales, bienes materiales o patrimoniales, manipulación o control sobre el acceso a bienes familiares, entre otros.",
    icon: <Ionicons name="key" size={40} color={colors.lavender[700]} />,
  },
  {
    id: "4",
    title: "Violencia Sexual",
    description:
      "Manoseo, acoso, relaciones o actos sexuales en contra de su voluntad.",
    icon: (
      <Ionicons name="heart-dislike" size={40} color={colors.lavender[700]} />
    ),
  },
  {
    id: "5",
    title: "Violencia Intrafamiliar",
    description:
      "Violencia que ocurre dentro del núcleo familiar, ya sea física, psicológica, económica, patrimonial o sexual.",
    icon: <Ionicons name="home" size={40} color={colors.lavender[700]} />,
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <MainLayout>
      <View style={styles.header}>
        <AppText variant="h1" style={styles.mainTitle}>
          Tipos de Violencia
        </AppText>
      </View>

      <ViolenceCarousel data={violenceTypes} navigation={navigation} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
  },
  mainTitle: {
    textAlign: "center",
  },
});
