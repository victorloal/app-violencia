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
import { getTypeConfig } from "../../thema/placesTypes";
import SaludIcon from "../../assets/icons/Salud";
import ProteccionIcon from "../../assets/icons/Protección";
import JusticiaIcon from "../../assets/icons/Justicia";

const categories = [
  { id: "salud", label: "Salud", icon: SaludIcon },
  { id: "protección", label: "Protección", icon: ProteccionIcon },
  { id: "justicia", label: "Justicia", icon: JusticiaIcon },
];

const CategoryFilters = ({ selectedType, onSelectType }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => {
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
            {React.createElement(category.icon, {
              width: 24,
              height: 24,
              color: isActive ? colors.white : theme.primary,
            })}
            <AppText
              variant="caption"
              color={isActive ? "light" : "secondary"}
              bold={isActive}
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
});

export default CategoryFilters;
