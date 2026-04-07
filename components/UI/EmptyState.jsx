// components/Places/EmptyState.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../UI/AppText";
import { colors } from "../../thema/colors";
import { spacing } from "../../styles/tokens";

const EmptyState = ({
  message = "No hay lugares disponibles en esta categoría",
}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="alert-circle-outline"
        size={48}
        color={colors.lavender[300]}
      />
      <AppText variant="body" color="secondary" style={styles.text}>
        {message}
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
  text: {
    textAlign: "center",
  },
});

export default EmptyState;
