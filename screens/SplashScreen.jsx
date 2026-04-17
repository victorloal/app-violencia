import React, { useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { colors } from "../thema/colors";

export default function SplashScreenComponent({ onFinish }) {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    // Animación de rotación infinita
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Redirigir después de 3 segundos
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.lavender[900] }]}>
      <Animated.Image
        source={require("../assets/splash-icon.png")}
        style={[
          styles.logo,
          { transform: [{ rotate: spin }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#481e4d",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});