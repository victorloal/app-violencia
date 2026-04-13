// components/Places/CategoryFilters.jsx
import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import AppText from "../UI/AppText";
import { colors } from "../../thema/colors";
import {
  spacing,
  borderRadius,
  borderWidth,
  shadow,
} from "../../styles/tokens";
import { getTypeConfig, CATEGORIES } from "../../thema/placesTypes";
import { Ionicons } from "@expo/vector-icons";

const CategoryFilters = ({ selectedType, onSelectType }) => {
  const selectedTheme = getTypeConfig(selectedType);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, { backgroundColor: selectedTheme.background }]}
      contentContainerStyle={styles.content}
    >
      {CATEGORIES.map((category) => {
        const theme = getTypeConfig(category.id);
        const isActive = selectedType === category.id;

        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.filterChip,
              isActive && {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
              },
            ]}
            onPress={() => onSelectType(category.id)}
            accessible={true}
            accessibilityLabel={`Filtrar por ${category.label}`}
            accessibilityRole="button"
          >
            {theme.isCustomIcon ? (
              React.createElement(theme.icon, {
                width: 20,
                height: 20,
                fill: isActive ? colors.white : theme.primary,
              })
            ) : (
              <Ionicons
                name={theme.icon}
                size={20}
                color={isActive ? colors.white : theme.primary}
              />
            )}
            <AppText
              variant="caption"
              color={isActive ? "light" : "secondary"}
              bold={isActive}
              style={
                isActive ? { color: colors.white } : { color: theme.primary }
              }
            >
              {category.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    borderBottomWidth: borderWidth.thin,
    borderBottomColor: colors.neutral[100] || "#f0f0f0",
  },
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    gap: spacing.xs,
    borderWidth: borderWidth.thin,
    borderColor: "#e0e0e0",
  },
});

export default CategoryFilters;
