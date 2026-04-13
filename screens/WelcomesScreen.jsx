// screens/WelcomeScreen.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  StyleSheet,
  Animated,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import SvgComponent from "../assets/icons/logo.jsx";
import Proteccion from "../assets/icons/Protección.jsx";
import Salud from "../assets/icons/Salud.jsx";
import Justicia from "../assets/icons/Justicia.jsx";

const { width, height } = Dimensions.get("window");

// ── Mensajes del carrusel ─────────────────────────────────────────
const MESSAGES = [
  {
    id: "1",
    text: "Este espacio es seguro y confidencial.",
    icon: <Proteccion width={80} height={80} />,
    accent: "#F31A73",
  },
  {
    id: "2",
    text: "Te orientamos en rutas de atención frente a violencias contra las mujeres.",
    icon: <Salud width={80} height={80} />,
    accent: "#801AD3",
  },
  {
    id: "3",
    text: "Aquí puedes informarte y buscar apoyo.",
    icon: <Justicia width={80} height={80} />,
    accent: "#7ED842",
  },
  {
    id: "4",
    text: "Tu autonomía, decisión y elección es lo más importante.",
    icon: "star-outline", 
    accent: "#FFFFFF",
  },
];

export default function WelcomeScreen({ navigation, route }) {
  const { onMessageSeen } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  // ── Animaciones ────────────────────────────────────────────────
  const logoAnim    = useRef(new Animated.Value(0)).current;   // opacidad logo
  const contentAnim = useRef(new Animated.Value(0)).current;   // opacidad carrusel + botón
  const contentY    = useRef(new Animated.Value(60)).current;  // slide up carrusel

  useEffect(() => {
    // 1. Logo aparece
    Animated.timing(logoAnim, {
      toValue: 1, duration: 700, useNativeDriver: true,
    }).start(() => {
      // 2. Contenido sube desde abajo
      Animated.parallel([
        Animated.timing(contentAnim, {
          toValue: 1, duration: 500, delay: 200, useNativeDriver: true,
        }),
        Animated.spring(contentY, {
          toValue: 0, tension: 55, friction: 9, delay: 200, useNativeDriver: true,
        }),
      ]).start();
    });

    // Auto-avance carrusel
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % MESSAGES.length;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // ── Navegación carrusel ────────────────────────────────────────
  const goTo = useCallback((index) => {
    clearInterval(intervalRef.current);
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  }, []);

  const goNext = useCallback(() => goTo((currentIndex + 1) % MESSAGES.length), [currentIndex]);
  const goPrev = useCallback(() => goTo((currentIndex - 1 + MESSAGES.length) % MESSAGES.length), [currentIndex]);

  const handlePress = () => {
    if (onMessageSeen) onMessageSeen();
    else navigation.replace("MessageConfig");
  };

  // ── Render tarjeta ─────────────────────────────────────────────
  const renderItem = ({ item }) => (
    <View style={[ws.card, { width }]}>
      <View style={[ws.cardInner]}>
        <View style={[{ borderColor: item.accent + "88" }]}>
          {typeof item.icon === "string" ? (
            <Ionicons name={item.icon} size={60} color={item.accent} />
          ) : (
            item.icon
          )}
        </View>
        <AppText style={ws.cardText}>{item.text}</AppText>
        <View style={[ws.cardLine, { backgroundColor: item.accent }]} />
      </View>
    </View>
  );

  return (
    <View style={ws.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── Logo fondo completo ── */}
      <Animated.View style={[ws.logoContainer, { opacity: logoAnim }]}>
        <SvgComponent
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid slice"
        />
      </Animated.View>

      {/* ── Overlay degradado inferior para legibilidad ── */}
      <View style={ws.overlay} pointerEvents="none" />

      {/* ── Nombre app (arriba) ── */}
      <Animated.View style={[ws.topBrand, { opacity: logoAnim }]}>
        <AppText style={ws.brandSub}>Tu espacio seguro</AppText>
      </Animated.View>

      {/* ── Carrusel + botón (abajo, sobre el logo) ── */}
      <Animated.View
        style={[
          ws.bottomContent,
          {
            opacity: contentAnim,
            transform: [{ translateY: contentY }],
          },
        ]}
      >
        {/* Carrusel de mensajes */}
        <FlatList
          ref={flatListRef}
          data={MESSAGES}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScrollToIndexFailed={() => {}}
          style={ws.flatList}
        />

        {/* Controles de navegación */}
        <View style={ws.controls}>
          <TouchableOpacity onPress={goPrev} style={ws.navBtn} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={18} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>

          <View style={ws.dots}>
            {MESSAGES.map((msg, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => goTo(i)}
                hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              >
                <View
                  style={[
                    ws.dot,
                    i === currentIndex && {
                      width: 24,
                      backgroundColor: MESSAGES[i].accent,
                      opacity: 1,
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={goNext} style={ws.navBtn} activeOpacity={0.7}>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>

        {/* Privacidad */}
        <View style={ws.privacyRow}>
          <Ionicons name="lock-closed" size={16} color="rgba(255,255,255,0.6)" />
          <AppText style={ws.privacyText}>Tus datos son privados y anónimos</AppText>
        </View>

        {/* Botón comenzar */}
        <View style={ws.btnWrap}>
          <Button type="primary" onPress={handlePress} size="xl" style={ws.btn}>
            <View style={ws.btnInner}>
              <AppText style={ws.btnText}>Comenzar</AppText>
              <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
            </View>
          </Button>
        </View>
      </Animated.View>
    </View>
  );
}

// ── Estilos ───────────────────────────────────────────────────────
const ws = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#3c1042",
  },

  // Logo ocupa toda la pantalla de fondo
  logoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
  },

  // Degradado de abajo para que el texto sea legible
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.65,
    // Degradado simulado con capas
    backgroundColor: "transparent",
  },

  // Nombre arriba
  topBrand: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  brandName: {
    fontFamily: "Verdana",
    fontSize: 42,
    color: "#ffffff",
    letterSpacing: 3,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  brandSub: {
    fontFamily: "Verdana",
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 1.5,
    marginTop: 4,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // Contenido inferior flotante
  bottomContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    // Fondo difuminado desde transparente a negro
    backgroundColor: "transparent",
  },

  // FlatList ocupa el ancho exacto
  flatList: {
    flexGrow: 0,
  },

  // Cada slide ocupa el ancho completo
  card: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
  },

  cardInner: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  cardIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 15,
  },

  cardText: {
    fontFamily: "Verdana",
    fontSize: 17,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 16,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  cardLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    opacity: 0.85,
  },

  // Controles
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 14,
    marginBottom: 12,
  },

  navBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.35)",
    opacity: 0.7,
  },

  // Privacidad
  privacyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: 14,
  },
  privacyText: {
    fontFamily: "Verdana",
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: 0.3,
  },

  // Botón
  btnWrap: {
    paddingHorizontal: 32,
  },
  btn: {
    borderRadius: 16,
    paddingVertical: 15,
    backgroundColor: "#F31A73",
    shadowColor: "#F31A73",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
  btnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "Verdana",
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});