// styles/toasts.js
import { StyleSheet } from "react-native";
import {
  spacing,
  borderRadius,
  shadow,
  zIndex,
  semanticColors,
  fontSize,
} from "./tokens";

export const toastStyles = StyleSheet.create({
  // Container
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: zIndex.toast,
  },

  // Toast base
  toast: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    ...shadow.sm,
  },

  // Toast variants
  success: {
    backgroundColor: semanticColors.successLight,
    borderLeftWidth: 4,
    borderLeftColor: semanticColors.success,
  },
  error: {
    backgroundColor: semanticColors.errorLight,
    borderLeftWidth: 4,
    borderLeftColor: semanticColors.error,
  },
  warning: {
    backgroundColor: semanticColors.warningLight,
    borderLeftWidth: 4,
    borderLeftColor: semanticColors.warning,
  },
  info: {
    backgroundColor: semanticColors.infoLight,
    borderLeftWidth: 4,
    borderLeftColor: semanticColors.info,
  },

  // Content
  iconContainer: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    marginBottom: 2,
  },
  message: {
    fontSize: fontSize.md,
  },
  closeButton: {
    padding: spacing.xs,
  },

  // Alert banner
  alertBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: semanticColors.infoLight,
    borderWidth: 1,
    borderColor: semanticColors.border.normal,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  alertBannerWarning: {
    backgroundColor: semanticColors.warningLight,
    borderColor: semanticColors.warning, // O una variante más clara si prefieres
  },
});
