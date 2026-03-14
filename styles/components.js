// styles/components.js
import { StyleSheet } from "react-native";
import { colors } from "../thema/colors";
import { spacing, borderRadius, shadow, layout } from "./tokens";

export const components = StyleSheet.create({
  // Contenedores principales
  container: {
    ...layout.flex,
    backgroundColor: colors.lavender[50],
  },
  containerWhite: {
    ...layout.flex,
    backgroundColor: colors.white,
  },
  content: {
    ...layout.flex,
    padding: spacing.lg,
  },
  contentCentered: {
    ...layout.flex,
    ...layout.center,
    padding: spacing.lg,
  },

  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadow.sm,
    borderWidth: 1,
    borderColor: colors.lavender[100],
  },
  cardElevated: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadow.md,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  cardInteractive: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadow.sm,
    borderWidth: 1,
    borderColor: colors.lavender[100],
    activeOpacity: 0.7,
  },

  // Headers
  header: {
    ...layout.rowBetween,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
  },
  headerCenter: {
    ...layout.center,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.lavender[800],
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.lavender[600],
    marginTop: spacing.xxs,
  },

  // Back button
  backButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.lavender[50],
    width: 40,
    height: 40,
    ...layout.center,
  },

  // Secciones
  section: {
    marginBottom: spacing.xl,
  },
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
    fontSize: 13,
    fontWeight: "700",
    color: colors.lavender[700],
  },

  // Botones (reutilizando los estilos de buttons pero con nombres más genéricos)
  button: {
    ...layout.center,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.lavender[300],
    backgroundColor: colors.lavender[100],
  },
  buttonPrimary: {
    backgroundColor: colors.lavender[600],
    borderColor: colors.lavender[600],
  },
  buttonDisabled: {
    backgroundColor: colors.lavender[200],
    borderColor: colors.lavender[300],
    opacity: 0.8,
  },
  buttonIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },

  // Chips/Filtros
  chip: {
    ...layout.row,
    backgroundColor: colors.lavender[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xxl,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  chipActive: {
    backgroundColor: colors.lavender[600],
    borderColor: colors.lavender[600],
  },
  chipText: {
    color: colors.lavender[700],
    fontSize: 14,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: "600",
  },

  // Icon containers
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lavender[100],
    ...layout.center,
  },
  iconContainerLarge: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lavender[100],
    ...layout.center,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  iconContainerSmall: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.lavender[100],
    ...layout.center,
  },

  // Divisores
  divider: {
    height: 1,
    backgroundColor: colors.lavender[100],
  },
  dividerVertical: {
    width: 1,
    height: "100%",
    backgroundColor: colors.lavender[200],
  },

  // Mensajes de ayuda
  helpMessage: {
    ...layout.row,
    backgroundColor: colors.lavender[100],
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  helpText: {
    color: colors.lavender[800],
    fontSize: 14,
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
    fontSize: 16,
    color: colors.lavender[900],
    flex: 1,
  },

  // Badges
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.lavender[100],
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 11,
    color: colors.lavender[600],
  },
  badgePrimary: {
    backgroundColor: colors.lavender[600],
  },
  badgePrimaryText: {
    color: colors.white,
  },

  // Avatar
  avatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.lavender[200],
    ...layout.center,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.circle,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.circle,
  },

  // Tooltip
  tooltip: {
    position: "absolute",
    backgroundColor: colors.lavender[800],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xs,
    ...shadow.sm,
  },
  tooltipText: {
    color: colors.white,
    fontSize: 12,
  },
  tooltipArrow: {
    position: "absolute",
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.lavender[800],
  },
});
