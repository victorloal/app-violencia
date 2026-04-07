// components/Places/CategoryFilters.jsx
import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../UI/AppText";
import { colors } from "../../thema/colors";
import {
  spacing,
  borderRadius,
  borderWidth,
  shadow,
} from "../../styles/tokens";

const categories = [
  { id: "salud", label: "Salud", icon: "medkit-outline" },
  { id: "protección", label: "Protección", icon: "shield-outline" },
  { id: "justicia", label: "Justicia", icon: "scale-outline" },
];

const CategoryFilters = ({ selectedType, onSelectType }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.filterChip,
            selectedType === category.id && styles.filterChipActive,
          ]}
          onPress={() => onSelectType(category.id)}
          accessible={true}
          accessibilityLabel={`Filtrar por ${category.label}`}
          accessibilityRole="button"
        >
          <Ionicons
            name={category.icon}
            size={18}
            color={
              selectedType === category.id ? colors.white : colors.lavender[700]
            }
          />
          <AppText
            variant="caption"
            color={selectedType === category.id ? "light" : "secondary"}
            bold={selectedType === category.id}
          >
            {category.label}
          </AppText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    borderBottomWidth: borderWidth.thin,
    borderBottomColor: colors.lavender[100],
  },
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    gap: spacing.xs,
    borderWidth: borderWidth.thin,
    borderColor: colors.lavender[200],
  },
  filterChipActive: {
    backgroundColor: colors.lavender[600],
    borderColor: colors.lavender[600],
    ...shadow.sm,
  },
});

export default CategoryFilters;
