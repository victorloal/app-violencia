// styles/settings.js
import { StyleSheet } from "react-native";
import { colors } from "../thema/colors";
import { spacing, borderRadius, fontSize, fontWeight, layout } from "./tokens";

export const settingsStyles = StyleSheet.create({
  // Scroll container
  scrollContainer: {
    paddingBottom: spacing.xxxl,
    backgroundColor: colors.lavender[50],
  },

  // Header
  header: {
    ...layout.row,
    justifyContent: "center",
    marginVertical: spacing.lg,
  },
  headerText: {
    marginLeft: spacing.sm,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.lavender[900],
  },

  // Form container
  formContainer: {
    padding: spacing.xl,
    backgroundColor: colors.lavender[50],
    ...layout.center,
    borderRadius: borderRadius.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.lavender[200],
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.lg,
    color: colors.lavender[900],
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
  },

  // Action row
  actionRow: {
    ...layout.row,
    justifyContent: "center",
    marginVertical: spacing.sm,
  },
  middleText: {
    marginHorizontal: spacing.md,
    fontSize: fontSize.lg,
    color: colors.lavender[700],
  },

  // Save/Cancel container
  saveCancelContainer: {
    ...layout.rowAround,
    marginTop: spacing.xl,
    marginBottom: spacing.xxxl,
    gap: spacing.md,
  },

  // Device function container
  deviceFunctionContainer: {
    ...layout.rowBetween,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  deviceFunctionInfo: {
    ...layout.row,
    flex: 1,
  },
  deviceFunctionTexts: {
    marginLeft: spacing.md,
    flex: 1,
  },
  deviceFunctionTitle: {
    fontSize: fontSize.lg,
    color: colors.lavender[900],
    fontWeight: fontWeight.medium,
  },
  deviceFunctionDescription: {
    fontSize: fontSize.sm,
    color: colors.lavender[600],
    marginTop: spacing.xxs,
  },

  // Brightness control
  brightnessHeader: {
    ...layout.rowBetween,
    width: "100%",
    marginBottom: spacing.lg,
  },
  brightnessControl: {
    ...layout.row,
    width: "100%",
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: spacing.sm,
  },
  brightnessValue: {
    minWidth: 40,
    textAlign: "right",
    color: colors.lavender[900],
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
  },

  // Input row
  inputRow: {
    ...layout.row,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.lavender[200],
    paddingHorizontal: spacing.md,
    width: "100%",
    marginBottom: spacing.md,
  },
  inputIcon: {
    paddingRight: spacing.sm,
  },
  textInput: {
    flex: 1,
    height: 48,
    fontSize: fontSize.lg,
    color: colors.lavender[900],
    paddingHorizontal: spacing.sm,
  },
  disabledInput: {
    backgroundColor: colors.lavender[50],
    color: colors.lavender[400],
  },

  // Switch container
  switchContainer: {
    ...layout.rowBetween,
    width: "100%",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
  },
  switchLabel: {
    fontSize: fontSize.lg,
    color: colors.lavender[800],
  },
  switchDescription: {
    fontSize: fontSize.sm,
    color: colors.lavender[600],
    marginTop: spacing.xxs,
  },

  // Picker container
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.lavender[200],
    width: "100%",
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: colors.lavender[900],
  },

  // Button group
  buttonGroup: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },

  // Danger zone
  dangerZone: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.red?.[50] || "#fef2f2",
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.red?.[200] || "#fecaca",
    marginHorizontal: spacing.lg,
  },
  dangerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.red?.[700] || "#b91c1c",
    marginBottom: spacing.sm,
  },
  dangerDescription: {
    fontSize: fontSize.md,
    color: colors.red?.[600] || "#dc2626",
    marginBottom: spacing.lg,
  },

  // Profile section
  profileSection: {
    ...layout.center,
    padding: spacing.xl,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.lavender[200],
    marginBottom: spacing.md,
  },
  profileName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.lavender[900],
    marginBottom: spacing.xxs,
  },
  profileEmail: {
    fontSize: fontSize.md,
    color: colors.lavender[600],
    marginBottom: spacing.md,
  },

  // Version info
  versionInfo: {
    ...layout.center,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  versionText: {
    fontSize: fontSize.sm,
    color: colors.lavender[400],
  },
});
