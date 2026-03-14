// styles/modals.js
import { StyleSheet } from "react-native";
import { colors } from "../thema/colors";
import { spacing, borderRadius, shadow } from "./tokens";

export const modalStyles = StyleSheet.create({
  // Overlay
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Modal container
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: "90%",
    maxWidth: 400,
    ...shadow.md,
  },
  containerFullScreen: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 0,
    borderRadius: 0,
  },
  containerBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadow.md,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  headerBorder: {
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
  },
  closeButton: {
    padding: spacing.xs,
  },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.md,
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[100],
  },

  // Content
  content: {
    marginVertical: spacing.md,
  },
});
