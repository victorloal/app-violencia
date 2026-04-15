// components/Places/CategoryHeader.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../UI/AppText";
import { spacing, borderRadius, borderWidth } from "../../styles/tokens";
import { getTypeConfig } from "../../thema/placesTypes";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../thema/colors";

const CategoryHeader = ({ type, title, description }) => {
  const theme = getTypeConfig(type);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.white, borderColor: theme.border },
        ]}
      >
        {theme.isCustomIcon ? (
          React.createElement(theme.icon, {
            width: 50,
            height: 50,
            fill: theme.primary,
          })
        ) : (
          <Ionicons name={theme.icon} size={32} color={theme.primary} />
        )}
      </View>
      <View style={styles.textContainer}>
        <AppText variant="h2" style={{ color: theme.text }}>
          {title}
        </AppText>
        <AppText variant="body" style={{ color: theme.text }}>
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
    borderBottomWidth: borderWidth.thin,
    borderBottomColor: "transparent",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: borderWidth.thin,
  },
  textContainer: {
    flex: 1,
    gap: spacing.xxs,
  },
});

export default CategoryHeader;
