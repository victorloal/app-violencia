// styles/lists.js
import { StyleSheet } from "react-native";
import { colors } from "../thema/colors";
import { spacing, borderRadius } from "./tokens";
import { shadow } from "react-native-paper";

export const listStyles = StyleSheet.create({
  // FlatList container
  container: {
    flex: 1,
    backgroundColor: colors.lavender[50],
  },

  // List item
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
  },
  itemPressable: {
    activeOpacity: 0.7,
  },

  // Item variants
  itemCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    ...shadow.sm,
    borderBottomWidth: 0,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: colors.lavender[100],
    marginLeft: spacing.xl,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxxl,
  },
  emptyIcon: {
    marginBottom: spacing.lg,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.lavender[700],
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 14,
    color: colors.lavender[500],
    textAlign: "center",
  },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: spacing.xs,
  },
  gridItem: {
    width: "50%",
    padding: spacing.xs,
  },
  gridCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: "center",
    ...shadow.sm,
  },

  // Swipeable
  swipeableRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  swipeableAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
  },
  swipeableDelete: {
    backgroundColor: colors.red?.[600] || "#dc2626",
  },
  swipeableEdit: {
    backgroundColor: colors.lavender[600],
  },
});
