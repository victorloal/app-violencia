// components/Layout/AppNavbar.jsx
import { View, StyleSheet, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CopilotStep, walkthroughable } from "react-native-copilot";
import Button from "../UI/Button";
import AppText from "../UI/AppText";
import { colors } from "../../thema/colors";
import { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const WalkthroughView = walkthroughable(View);

export default function AppNavbar({ ajustesStep }) {
  const navigation = useNavigation();
  const route = useRoute();

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

  const canGoBack = navigation.canGoBack() && route.name !== "Home";

  const settingsBtn = (
    <Button
      type="primaryGhost"
      variant="circle"
      size="small"
      style={{ elevation: 0 }}
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
  );

  return (
    <View style={styles.container}>
      {/* Izquierda: botón atrás */}
      <View style={styles.side}>
        {canGoBack ? (
          <Button
            type="primaryGhost"
            variant="circle"
            size="small"
            style={{ elevation: 0 }}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Volver atrás"
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={colors.lavender[800]}
            />
          </Button>
        ) : (
          <View style={{ width: 36, height: 36 }} />
        )}
      </View>

      {/* Centro: mensaje rotativo */}
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

      {/* Derecha: ajustes — paso 2 */}
      <View style={styles.side}>
        {ajustesStep ? (
          <CopilotStep {...ajustesStep}>
            <WalkthroughView style={styles.sideInner}>
              {settingsBtn}
            </WalkthroughView>
          </CopilotStep>
        ) : (
          settingsBtn
        )}
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
      android: { elevation: 4 },
    }),
  },
  side: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sideInner: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  center: {
    justifyContent: "center",
    width: "60%",
  },
  centerInner: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    textAlign: "center",
  },
});
