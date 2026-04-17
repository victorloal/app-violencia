// screens/HomeScreen.jsx
import { View, StyleSheet } from "react-native";
import { CopilotStep, walkthroughable } from "react-native-copilot";
import MainLayout, { TUTORIAL_STEPS } from "../components/Layout/MainLayout";
import AppText from "../components/UI/AppText";
import ViolenceCarousel from "../components/UI/ViolenceCarousel";
import ViolenciaFísicaIcon from "../assets/icons/ViolenciaFísica";
import ViolenciaSexualIcon from "../assets/icons/ViolenciaSexual";
import ViolenciaPsicológicaIcon from "../assets/icons/ViolenciaPsicológica";
import ViolenciaEconómicaIcon from "../assets/icons/ViolenciaEconómica";
import ViolenciaPatrimonialIcon from "../assets/icons/ViolenciaPatrimonial";
import ViolenciaDigitalIcon from "../assets/icons/ViolenciaDigital";
import ViolenciaVicariaIcon from "../assets/icons/ViolenciaVicaria";
import ViolenciaBasadaPrejuiciosIcon from "../assets/icons/ViolenciaPrejuicio";

// walkthroughable sobre View nativo — siempre funciona porque View acepta ref
const WalkthroughView = walkthroughable(View);
const violenceTypes = [
  {
    id: "0",
    title: "Violencia Física",
    description:
      "Golpes, empujones, quemaduras o ataque con armas, objectos o líquidos químicos.",
    icon: <ViolenciaFísicaIcon width={100} height={100} />,
  },
  {
    id: "1",
    title: "Violencia Sexual",
    description:
      "Manoseo, acoso, relaciones o actos sexuales en contra de su voluntad.",
    icon: <ViolenciaSexualIcon width={100} height={100} />,
  },
  {
    id: "2",
    title: "Violencia Psicológica",
    description:
      "Insultos, humillaciones, chantaje, descalificaciones, burlas, amenazas contra su vida, la de sus hijos, hijas u otros integrantes de su familia, celos extremos e intentos de control",
    icon: <ViolenciaPsicológicaIcon width={100} height={100} />,
  },
  {
    id: "3",
    title: "Violencia Económica",
    description:
      "Limitación y control para el uso del dinero, destrucción de elementos de trabajo, prohibición para el uso de sus pertenecias y documentos personales, entre otros.",
    icon: <ViolenciaEconómicaIcon width={100} height={100} />,
  },
  {
    id: "4",
    title: "Violencia Patrimonial",
    description:
      "Destrucción de objetos personales, bienes materiales o patrimoniales, manipulación o control sobre el acceso a bienes familiares, entre otros.",
    icon: <ViolenciaPatrimonialIcon width={100} height={100} />,
  },
  {
    id: "5",
    title: "Violencia Digital",
    description:
      "Es la violencia ejercida a través de redes sociales (WhatsApp, Facebook, Instagram, TikTok), páginas web o aplicaciones móviles, mediante mensajes, comentarios u otras formas de interacción digital.",
    icon: <ViolenciaDigitalIcon width={100} height={100} />,
  },
  {
    id: "6",
    title: "Violencia Vicaria",
    description:
      "Es cuando el agresor utiliza a tus hijos, hijas o mascotas para causarte daño, amenazarte o ejercer control sobre ti.",
    icon: <ViolenciaVicariaIcon width={100} height={100} />,
  },
  {
    id: "7",
    title: "Violencia Basada en Prejuicios",
    description:
      "Es todo tipo de violencia que se ejerce contra una persona por ideas, creencias, estereotipos negativos o prejuicios sobre su orientación sexual, su identidad o su expresión de género diversa.",
    icon: <ViolenciaBasadaPrejuiciosIcon width={100} height={100} />,
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <MainLayout>
      <CopilotStep {...TUTORIAL_STEPS.carrusel}>
        <WalkthroughView style={styles.header}>
          <View style={styles.header}>
            <AppText variant="h1" style={styles.mainTitle}>
              Tipos de Violencia
            </AppText>
            <AppText variant="body" style={styles.mainTitle}>
              (Ley 1257 de 2008 - Colombia)
            </AppText>
          </View>
        </WalkthroughView>
      </CopilotStep>
      <ViolenceCarousel data={violenceTypes} navigation={navigation} />

      {/* Carrusel real — fuera del CopilotStep para no interferir con la medición */}
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
