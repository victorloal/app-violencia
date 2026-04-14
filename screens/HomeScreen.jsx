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

// walkthroughable sobre View nativo — siempre funciona porque View acepta ref
const WalkthroughView = walkthroughable(View);

const violenceTypes = [
  {
    id: "0",
    title: "Violencia Física",
    description: "Golpes, empujones, quemaduras o ataque con armas, objectos o líquidos químicos.",
    icon: <ViolenciaFísicaIcon width={100} height={100} />,
  },
  {
    id: "1",
    title: "Violencia Sexual",
    description: "Manoseo, acoso, relaciones o actos sexuales en contra de su voluntad.",
    icon: <ViolenciaSexualIcon width={100} height={100} />,
  },
  {
    id: "2",
    title: "Violencia Psicológica",
    description: "Insultos, humillaciones, chantaje, descalificaciones, burlas, amenazas contra su vida, la de sus hijos, hijas u otros integrantes de su familia, celos extremos e intentos de control",
    icon: <ViolenciaPsicológicaIcon width={100} height={100} />,
  },
  {
    id: "3",
    title: "Violencia Económica",
    description: "Limitación y control para el uso del dinero, destrucción de elementos de trabajo, prohibición para el uso de sus pertenecias y documentos personales, entre otros.",
    icon: <ViolenciaEconómicaIcon width={100} height={100} />,
  },
  {
    id: "4",
    title: "Violencia Patrimonial",
    description: "Destrucción de objetos personales, bienes materiales o patrimoniales, manipulación o control sobre el acceso a bienes familiares, entre otros.",
    icon: <ViolenciaPatrimonialIcon width={100} height={100} />,
  },
  {
    id: "5",
    title: "Violencia Digital",
    description: "Acoso, suplantación de identidad, compartición de contenido íntimo sin consentimiento, ciberacoso o control mediante dispositivos digitales.",
    icon: <ViolenciaDigitalIcon width={100} height={100} />,
  },
  {
    id: "6",
    title: "Violencia Vicaria",
    description: "Violencia ejercida sobre hijos, hijas u otros integrantes de la familia como forma de causar daño a la mujer.",
    icon: <ViolenciaVicariaIcon width={100} height={100} />,
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

      <CopilotStep {...TUTORIAL_STEPS.carrusel}>
        <WalkthroughView style={styles.carouselAnchor} />
      </CopilotStep>

      {/* Carrusel real — fuera del CopilotStep para no interferir con la medición */}
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
  carouselAnchor: {
    height: 8,
    width: "80%",
    alignSelf: "center",
  },
});