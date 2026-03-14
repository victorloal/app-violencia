// styles/loading.js
import { StyleSheet } from "react-native";
import { colors } from "../thema/colors";
import { spacing, borderRadius } from "./tokens";

export const loadingStyles = StyleSheet.create({
  // Full screen loader
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },

  // Inline loader
  inline: {
    padding: spacing.xl,
    alignItems: "center",
  },

  // Skeleton base
  skeleton: {
    backgroundColor: colors.lavender[200],
    borderRadius: borderRadius.sm,
    overflow: "hidden",
  },
  skeletonPulse: {
    opacity: 0.7,
  },

  // Skeleton variants
  skeletonCircle: {
    borderRadius: borderRadius.circle,
  },
  skeletonText: {
    height: 16,
    marginVertical: spacing.xxs,
  },
  skeletonTitle: {
    height: 24,
    width: "60%",
    marginBottom: spacing.sm,
  },
  skeletonCard: {
    height: 100,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  skeletonImage: {
    width: "100%",
    height: 200,
    borderRadius: borderRadius.md,
  },

  // Progress bar
  progressBar: {
    height: 4,
    backgroundColor: colors.lavender[200],
    borderRadius: borderRadius.pill,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.lavender[600],
    borderRadius: borderRadius.pill,
  },
});
