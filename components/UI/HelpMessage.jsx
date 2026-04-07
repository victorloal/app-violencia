// components/Places/HelpMessage.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../UI/AppText";
import { colors } from "../../thema/colors";
import { spacing, borderRadius, borderWidth } from "../../styles/tokens";

const HelpMessage = () => {
  const handleEmergencyCall = () => {
    mapService.makePhoneCall("123");
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleEmergencyCall}
      activeOpacity={0.8}
      accessible={true}
      accessibilityLabel="Ayuda inmediata, llamar al 155 o 123"
      accessibilityRole="button"
    >
      <Ionicons
        name="help-buoy-outline"
        size={20}
        color={colors.lavender[600]}
      />
      <AppText variant="body" color="secondary" style={styles.text}>
        Si necesitas ayuda inmediata, llama al 155 o al 123
      </AppText>
      <Ionicons name="chevron-forward" size={16} color={colors.lavender[400]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[100],
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    borderWidth: borderWidth.thin,
    borderColor: colors.lavender[200],
  },
  text: {
    flex: 1,
  },
});

export default HelpMessage;
