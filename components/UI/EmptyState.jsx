// components/UI/EmptyState.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";
import { colors } from "../../thema/colors";
import { spacing, borderRadius } from "../../styles/tokens";
import { getTypeConfig } from "../../thema/placesTypes";

const EmptyState = ({ type = "salud" }) => {
  const theme = getTypeConfig(type);

  return (
    <View style={styles.container}>
      <View
        style={[styles.iconContainer, { backgroundColor: theme.background }]}
      >
        <Ionicons name="sad-outline" size={48} color={theme.primary} />
      </View>
      <AppText variant="h3" style={styles.title}>
        No hay lugares disponibles
      </AppText>
      <AppText variant="body" color="tertiary" style={styles.message}>
        No encontramos {theme.title.toLowerCase()} cerca de tu ubicación
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xxl,
    gap: spacing.md,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
  },
});

export default EmptyState;
