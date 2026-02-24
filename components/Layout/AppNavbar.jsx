import { View, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StyledButton from "../UI/StyledButton";
import AppText from "../UI/AppText";
import { colors } from "../../thema/colors";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AppNavbar() {
  const navigation = useNavigation();

  const messages = [
    "No estás sola. Lo que estás viviendo importa.",
    "Nada de lo que pasó es tu culpa.",
    "Tu vida tiene valor y merece respeto.",
    "Eres más fuerte de lo que crees.",
    "Mereces amor sin miedo.",
    "Tu voz merece ser escuchada.",
    "No estás exagerando. Tu dolor es real.",
    "Pedir ayuda es un acto de valentía.",
    "Tu seguridad es lo primero.",
    "Hay un camino hacia una vida tranquila y libre.",
    "Tu historia no define tu futuro.",
    "Dentro de ti hay una fuerza que nadie puede quitarte.",
    "Paso a paso también es avanzar.",
    "Mereces paz, dignidad y respeto.",
    "No tienes que demostrar nada para merecer protección.",
    "Sobrevivir ya demuestra tu valentía.",
    "Puedes reconstruir tu vida a tu ritmo.",
    "No estás rota. Estás sanando.",
    "Tienes derecho a poner límites.",
    "Tu bienestar importa.",
    "El miedo no será eterno.",
    "Hay personas dispuestas a ayudarte.",
    "Tu vida puede volver a sentirse segura.",
    "Mereces relaciones sanas y respetuosas.",
    "Tu futuro no está determinado por la violencia.",
    "Cada día que resistes es una muestra de tu fortaleza.",
    "Tu dignidad nunca depende de nadie más.",
    "Puedes elegir cuidarte.",
    "La ayuda existe y está para ti.",
    "Tu vida vale mucho más que el silencio.",
  ];

  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * messages.length),
  );

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let isMounted = true;

    const interval = setInterval(() => {
      if (!isMounted) return;

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (!isMounted) return;

        setCurrentIndex((prev) => (prev + 1) % messages.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [fadeAnim, messages.length]);

  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      {/* 🔙 IZQUIERDA */}
      <View style={styles.side}>
        {canGoBack && (
          <StyledButton
            variant="text"
            tone="dark"
            icon={
              <Ionicons
                name="arrow-back"
                size={22}
                color={colors.lavender[800]}
              />
            }
            onPress={() => navigation.goBack()}
          />
        )}
      </View>

      {/* 🟣 CENTRO */}
      <View style={styles.center}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <AppText
            variant="body"
            align="center"
            style={{ color: colors.lavender[900] }}
          >
            {messages[currentIndex]}
          </AppText>
        </Animated.View>
      </View>

      {/* ⚙ DERECHA */}
      <View style={styles.side}>
        <StyledButton
          variant="text"
          tone="dark"
          icon={
            <Ionicons
              name="settings-outline"
              size={22}
              color={colors.lavender[800]}
            />
          }
          onPress={() => navigation.navigate("Settings")} // aquí navega a tu pantalla de configuración
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[100],
    paddingHorizontal: 10,
  },
  side: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
