// components/Places/CategoryHeader.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../UI/AppText";
import { colors } from "../../thema/colors";
import { spacing, borderRadius, borderWidth } from "../../styles/tokens";

const CategoryHeader = ({ type, title, description, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color={colors.lavender[600]} />
      </View>
      <View style={styles.textContainer}>
        <AppText variant="h2" color="primary">
          {title}
        </AppText>
        <AppText variant="body" color="secondary">
          {description}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth.thin,
    borderBottomColor: colors.lavender[100],
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.lavender[100],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: borderWidth.thin,
    borderColor: colors.lavender[200],
  },
  textContainer: {
    flex: 1,
    gap: spacing.xxs,
  },
});

export default CategoryHeader;
