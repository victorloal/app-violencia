import { View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../thema/colors";
import AppText from "../UI/AppText";
import AnimatedStyledButton from "../UI/StyledButton";
import { Ionicons } from "@expo/vector-icons";

export default function ViolenceTypeCard({
  title,
  description,
  icon,
  onPressServices,
  onPressInfo,
}) {
  return (
    <View style={styles.card}>
      {/* Botón de información arriba a la derecha */}
      <View style={styles.infoButton}>
        <AnimatedStyledButton
          title="Información"
          size="flex"
          icon={
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.lavender[800]}
            />
          }
          iconPosition="left"
          tone="dark"
          variant="text"
          onPress={onPressInfo}
        />
      </View>

      {/* Título de la violencia */}
      <AppText variant="title" style={styles.title}>
        {title}
      </AppText>

      {/* Icono de la violencia */}
      <View style={styles.iconContainer}>{icon}</View>

      {/* Descripción de la violencia */}

      <ScrollView style={styles.descriptionContainer}>
        <AppText variant="body" style={styles.description}>
          {description}
        </AppText>
      </ScrollView>

      {/* Botón "Necesitas ayuda?" en la parte inferior */}
      <View style={styles.buttonsContainer}>
        <AnimatedStyledButton
          title="¿Necesitas Atención?"
          size="flex"
          tone="dark"
          onPress={onPressServices}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lavender[100],
    borderRadius: 15,
    padding: 15,
    width: "95%",
    height: "100%",
    shadowColor: colors.lavender[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: "center", // Centramos la card
  },
  // Estilo para el botón de información
  infoButton: {
    position: "absolute", // Lo ponemos de manera absoluta
    top: 10,
    right: 10,
  },
  // Título de la violencia
  title: {
    textAlign: "center",
    marginTop: 40, // Espacio para el botón de información
    marginBottom: 10,
    color: colors.lavender[900],
  },
  // Icono debajo del título
  iconContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  // Descripción de la violencia
  description: {
    textAlign: "center",
    color: colors.lavender[800],
    marginHorizontal: 10,
  },
  // Botón "Necesitas ayuda?"
  buttonsContainer: {
    position: "absolute", // Lo ponemos de manera absoluta
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  descriptionContainer: {
    flex: 1,
    maxHeight: 150,
    marginBottom: 60,
  },
});
