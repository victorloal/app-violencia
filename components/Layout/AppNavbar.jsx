import { View, StyleSheet, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../UI/Button";
import AppText from "../UI/AppText";
import { colors } from "../../thema/colors";
import { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { spacing } from "../../styles/tokens";

export default function AppNavbar() {
  const navigation = useNavigation();
  const route = useRoute(); // Para obtener la ruta actual

  // Mensajes aprobados
  const messages = [
    "Estás en un espacio seguro",
    "No estás sola",
    "Tu bienestar importa",
    "Tu vida es valiosa",
    "Tu seguridad es prioridad",
    "Mereces vivir en paz",
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

  // Verificar si puede ir atrás Y no está en Home
  const canGoBack = navigation.canGoBack() && route.name !== "Home";

  return (
    <View style={styles.container}>
      {/* 🔙 IZQUIERDA - Solo visible si no está en Home */}
      <View style={styles.side}>
        {canGoBack ? (
          <Button
            type="primaryGhost"
            variant="circle"
            size="small"
            onPress={() => navigation.goBack()}
            accessibilityLabel="Volver atrás"
            accessibilityHint="Navega a la pantalla anterior"
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={colors.lavender[800]}
            />
          </Button>
        ) : (
          <Button
            type="primaryGhost"
            variant="circle"
            size="small"
            accessibilityLabel="Volver atrás"
            accessibilityHint="Navega a la pantalla anterior"
          ></Button>
        )}
      </View>

      {/* 🟣 CENTRO - Mensaje rotativo */}
      <View style={styles.center}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <AppText
            variant="body"
            center
            color="tertiary"
            style={styles.messageText}
          >
            {messages[currentIndex]}
          </AppText>
        </Animated.View>
      </View>

      {/* ⚙ DERECHA - Configuración */}
      <View style={styles.side}>
        <Button
          type="primaryGhost"
          variant="circle"
          size="small"
          onPress={() => navigation.replace("Settings")}
          accessibilityLabel="Configuración"
          accessibilityHint="Ir a la pantalla de configuración"
        >
          <Ionicons
            name="settings-outline"
            size={22}
            color={colors.lavender[800]}
          />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lavender[100],
    ...Platform.select({
      ios: {
        shadowColor: colors.lavender[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  side: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    justifyContent: "center",
    width: "60%",
  },
  messageText: {
    textAlign: "center",
  },
});
