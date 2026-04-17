// components/Places/HelpMessage.jsx
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../UI/AppText";
import { spacing, borderRadius, borderWidth } from "../../styles/tokens";
import { linkingService } from "../../services/linkingService";
import { getTypeConfig } from "../../thema/placesTypes";

const HelpMessage = ({ type = "salud" }) => {
  const theme = getTypeConfig(type);

  const handleEmergencyCall = () => {
    linkingService.makePhoneCall("123");
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.badgeBg, borderColor: theme.border },
      ]}
      onPress={handleEmergencyCall}
      activeOpacity={0.8}
      accessible={true}
      accessibilityLabel="Ayuda inmediata, llamar al 155 o 123"
      accessibilityRole="button"
    >
      <Ionicons name="help-buoy-outline" size={20} color={theme.primary} />
      <AppText variant="body" color="secondary" style={styles.text}>
        Si necesitas ayuda inmediata, llama al 155 o al 123
      </AppText>
      <Ionicons name="chevron-forward" size={16} color={theme.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    borderWidth: borderWidth.thin,
  },
  text: {
    flex: 1,
  },
});

export default HelpMessage;
