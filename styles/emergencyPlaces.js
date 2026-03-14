// styles/emergencyPlaces.js
import { StyleSheet } from "react-native";
import { colors } from "../thema/colors";
import {
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  shadow,
  layout,
} from "./tokens";

export const emergencyStyles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: colors.lavender[50],
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.lavender[50],
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.lavender[800],
  },
  placeholder: {
    width: 40,
  },

  // Filtros
  filtersBar: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  filterChip: {
    ...layout.row,
    backgroundColor: colors.lavender[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xxl,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  filterChipActive: {
    backgroundColor: colors.lavender[600],
    borderColor: colors.lavender[600],
  },
  filterText: {
    color: colors.lavender[700],
    fontSize: fontSize.sm,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: fontWeight.semiBold,
  },

  // Lista
  listContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },

  // Back to services
  backToServicesButton: {
    ...layout.row,
    backgroundColor: colors.lavender[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    marginBottom: spacing.xxs,
  },
  backToServicesText: {
    color: colors.lavender[800],
    fontSize: fontSize.md,
  },

  // Separador de sección
  sectionHeader: {
    ...layout.row,
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lavender[200],
  },
  sectionHeaderLabel: {
    ...layout.row,
    gap: spacing.xs,
    backgroundColor: colors.lavender[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.xl,
  },
  sectionHeaderText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.lavender[700],
  },

  // Emergency Card
  emergencyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadow.md,
    borderWidth: 1.5,
    borderColor: colors.lavender[100],
  },
  emergencyCardPriority: {
    backgroundColor: colors.white,
    borderColor: colors.lavender[300],
    borderWidth: 1.5,
  },

  // Fila superior
  emergencyTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  emergencyIconBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lavender[100],
    ...layout.center,
    flexShrink: 0,
  },
  emergencyIconBoxPriority: {
    backgroundColor: colors.lavender[200],
  },
  emergencyTopText: {
    flex: 1,
    gap: spacing.xxs,
  },
  emergencyName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.lavender[900],
    lineHeight: 22,
  },
  emergencyNamePriority: {
    color: colors.lavender[900],
    fontSize: fontSize.xl,
  },
  emergencyDesc: {
    fontSize: fontSize.sm,
    color: colors.lavender[500],
    lineHeight: 18,
  },
  emergencyDescPriority: {
    color: colors.lavender[700],
  },

  // Divisor
  emergencyDivider: {
    height: 1,
    backgroundColor: colors.lavender[100],
  },
  emergencyDividerPriority: {
    backgroundColor: colors.lavender[200],
  },

  // Fila inferior
  emergencyBottom: {
    ...layout.rowBetween,
  },
  emergencyNumber: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.extraBold,
    color: colors.lavender[700],
    letterSpacing: -1,
  },
  emergencyNumberPriority: {
    fontSize: fontSize.displayLarge,
    color: colors.lavender[800],
  },

  // Call pill
  callPill: {
    ...layout.row,
    gap: spacing.xs,
    backgroundColor: colors.lavender[100],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: colors.lavender[300],
  },
  callPillPriority: {
    backgroundColor: colors.lavender[700],
    borderColor: colors.lavender[700],
  },
  callPillText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.lavender[700],
  },
  callPillTextPriority: {
    color: colors.white,
  },

  // Place Card (normal)
  placeCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadow.sm,
    borderWidth: 1,
    borderColor: colors.lavender[100],
  },
  placeHeader: {
    ...layout.row,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  placeIconBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lavender[100],
    ...layout.center,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  placeTitleContainer: {
    flex: 1,
    gap: spacing.xxs,
  },
  placeName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.lavender[900],
  },
  placeTypePill: {
    backgroundColor: colors.lavender[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.md,
    alignSelf: "flex-start",
  },
  placeTypeText: {
    fontSize: fontSize.xs,
    color: colors.lavender[600],
  },

  // Detalles del lugar
  placeDetails: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  detailRow: {
    ...layout.row,
    gap: spacing.sm,
  },
  detailText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.lavender[800],
  },
  descriptionBox: {
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[100],
  },
  descriptionText: {
    color: colors.lavender[500],
    fontStyle: "italic",
    fontSize: fontSize.sm,
    lineHeight: 18,
  },

  // Acciones
  placeActions: {
    ...layout.row,
    gap: spacing.sm,
  },
  callButton: {
    flex: 1,
    ...layout.row,
    justifyContent: "center",
    backgroundColor: colors.lavender[100],
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xxl,
    gap: spacing.xs,
    borderWidth: 1.5,
    borderColor: colors.lavender[300],
  },
  callButtonText: {
    color: colors.lavender[700],
    fontWeight: fontWeight.bold,
    fontSize: fontSize.md,
  },

  // Pie de página
  helpMessage: {
    ...layout.row,
    backgroundColor: colors.lavender[100],
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    marginTop: spacing.xxs,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  helpText: {
    color: colors.lavender[800],
    fontSize: fontSize.md,
    flex: 1,
  },
});
