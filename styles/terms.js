// styles/terms.js
import { StyleSheet } from "react-native";
import { colors } from "../thema/colors";
import { spacing, borderRadius, fontSize, fontWeight, layout } from "./tokens";

export const termsStyles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Header
  header: {
    ...layout.center,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
  },
  title: {
    fontSize: fontSize.xxxl,
    color: colors.lavender[900],
    marginTop: spacing.sm,
    fontWeight: fontWeight.bold,
  },

  // ScrollView
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },

  // Secciones
  section: {
    marginBottom: spacing.xl,
  },
  subtitle: {
    fontSize: fontSize.xl,
    color: colors.lavender[800],
    marginBottom: spacing.md,
    fontWeight: fontWeight.semiBold,
  },
  text: {
    fontSize: fontSize.lg,
    color: colors.lavender[700],
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  bold: {
    fontWeight: fontWeight.bold,
    color: colors.lavender[900],
  },

  // Highlight
  highlight: {
    fontSize: fontSize.lg,
    color: colors.lavender[900],
    lineHeight: 24,
    marginBottom: spacing.lg,
    backgroundColor: colors.lavender[50],
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.lavender[600],
  },

  // Texto de aceptación
  acceptText: {
    fontSize: fontSize.lg,
    color: colors.lavender[800],
    lineHeight: 24,
    marginBottom: spacing.lg,
    fontStyle: "italic",
  },

  // Warning
  warning: {
    fontSize: fontSize.lg,
    color: colors.orange?.[600] || "#ea580c",
    lineHeight: 24,
    textAlign: "center",
    fontWeight: fontWeight.medium,
  },

  // Footer
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[100],
  },

  // Checkbox
  checkboxContainer: {
    ...layout.row,
    marginBottom: spacing.xl,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.xs,
    borderWidth: 2,
    borderColor: colors.lavender[600],
    marginRight: spacing.md,
    ...layout.center,
  },
  checkboxChecked: {
    backgroundColor: colors.lavender[600],
  },
  checkboxLabel: {
    fontSize: fontSize.lg,
    color: colors.lavender[900],
    flex: 1,
  },

  // Lock message
  lockMessage: {
    ...layout.row,
    padding: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.lavender[50],
    borderRadius: borderRadius.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.lavender[600],
  },
  lockText: {
    marginLeft: spacing.sm,
    textAlign: "center",
    flex: 1,
    color: colors.lavender[800],
  },

  // Lista de términos
  termList: {
    marginLeft: spacing.xl,
    marginBottom: spacing.lg,
  },
  termItem: {
    ...layout.row,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  termBullet: {
    width: 6,
    height: 6,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.lavender[600],
    marginTop: 8,
  },
  termText: {
    flex: 1,
    fontSize: fontSize.lg,
    color: colors.lavender[700],
    lineHeight: 24,
  },

  // Enlaces
  link: {
    color: colors.lavender[600],
    textDecorationLine: "underline",
    fontWeight: fontWeight.medium,
  },

  // Fecha
  dateText: {
    fontSize: fontSize.sm,
    color: colors.lavender[500],
    textAlign: "right",
    marginTop: spacing.xl,
    fontStyle: "italic",
  },
});
