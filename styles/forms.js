// styles/forms.js
import { StyleSheet } from "react-native";
import {
  spacing,
  borderRadius,
  borderWidth,
  fontSize,
  fontWeight,
  semanticColors,
} from "./tokens";

export const formStyles = StyleSheet.create({
  // Form container
  form: {
    padding: spacing.xl,
  },

  // Form group
  group: {
    marginBottom: spacing.xl,
  },

  // Label
  label: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: semanticColors.text.secondary,
    marginBottom: spacing.xs,
  },
  labelRequired: {
    color: semanticColors.error,
    marginLeft: spacing.xxs,
  },

  // Input variants
  input: {
    backgroundColor: semanticColors.surface,
    borderWidth: borderWidth.thin,
    borderColor: semanticColors.border.normal,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.lg,
    color: semanticColors.text.primary,
  },
  inputFocused: {
    borderColor: semanticColors.primary,
    borderWidth: borderWidth.thick,
  },
  inputError: {
    borderColor: semanticColors.error,
    borderWidth: borderWidth.thick,
  },
  inputDisabled: {
    backgroundColor: semanticColors.background,
    color: semanticColors.text.disabled,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  // Input with icon
  inputIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: semanticColors.surface,
    borderWidth: borderWidth.thin,
    borderColor: semanticColors.border.normal,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSize.lg,
    color: semanticColors.text.primary,
  },

  // Error message
  errorText: {
    fontSize: fontSize.sm,
    color: semanticColors.error,
    marginTop: spacing.xxs,
    marginLeft: spacing.xs,
  },

  // Helper text
  helperText: {
    fontSize: fontSize.sm,
    color: semanticColors.text.tertiary,
    marginTop: spacing.xxs,
    marginLeft: spacing.xs,
  },

  // Select / Picker
  select: {
    backgroundColor: semanticColors.surface,
    borderWidth: borderWidth.thin,
    borderColor: semanticColors.border.normal,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  selectPlaceholder: {
    color: semanticColors.text.disabled,
  },

  // Radio and Checkbox group
  radioGroup: {
    gap: spacing.md,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: borderWidth.thick,
    borderColor: semanticColors.text.disabled,
    marginRight: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: semanticColors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: semanticColors.primary,
  },

  // Switch
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontSize: fontSize.lg,
    color: semanticColors.text.secondary,
  },

  // Search bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: semanticColors.surface,
    borderWidth: borderWidth.thin,
    borderColor: semanticColors.border.normal,
    borderRadius: borderRadius.pill,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSize.lg,
    color: semanticColors.text.primary,
    marginLeft: spacing.sm,
  },
  searchClear: {
    padding: spacing.xs,
  },
});
