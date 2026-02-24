import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../thema/colors";
import AppText from "../components/UI/AppText";
import StyledButton from "../components/UI/StyledButton";

export default function MessageScreen({ navigation, route }) {
  const { onMessageSeen } = route.params || {};

  const handlePress = () => {
    if (onMessageSeen) {
      onMessageSeen();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.emojiContainer}>
        <AppText style={styles.emoji}>🤝</AppText>
      </View>

      <View style={styles.headerContainer}>
        <AppText variant="title" style={styles.title}>
          Hola, bienvenido
        </AppText>
      </View>

      <View style={styles.bodyContainer}>
        <AppText variant="body" style={styles.text}>
          Esta aplicación nace para acompañarte en un tema difícil pero
          necesario: entender la violencia y saber cómo enfrentarla.
        </AppText>

        <AppText variant="body" style={styles.text}>
          En Colombia, la Ley 1257 de 2008 reconoce que la violencia no es solo
          física. También duele cuando es psicológica, económica, sexual o
          cuando te limitan la libertad. Y duele en la casa, en la calle, en
          cualquier lugar.
        </AppText>

        <AppText variant="body" style={styles.highlightedText}>
          Porque nadie debería enfrentar esto solo.
        </AppText>

        <AppText variant="body" style={styles.text}>
          Aquí encontrarás información clara sobre los tipos de violencia que
          existen y, lo más importante, qué puedes hacer si tú o alguien que
          conoces está pasando por una situación así.
        </AppText>
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Conocer los tipos de violencia"
          onPress={handlePress}
          tone="dark"
          size="large"
        />
      </View>

      <View style={styles.footerContainer}>
        <AppText variant="caption" style={styles.footerText}>
          Tómate tu tiempo. Esto es importante.
        </AppText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: colors.white,
  },
  emojiContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 64,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.lavender[900],
    textAlign: "center",
  },
  bodyContainer: {
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    color: colors.lavender[700],
    lineHeight: 28,
    marginBottom: 22,
    textAlign: "left",
  },
  highlightedText: {
    fontSize: 20,
    color: colors.lavender[900],
    lineHeight: 30,
    marginBottom: 22,
    textAlign: "center",
    fontWeight: "600",
    fontStyle: "italic",
    backgroundColor: colors.lavender[100],
    padding: 16,
    borderRadius: 12,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: colors.lavender[500],
    textAlign: "center",
  },
});
