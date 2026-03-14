// styles/navigation.js
import { StyleSheet } from "react-native";
import { colors } from "../thema/colors";
import { spacing } from "./tokens";

export const navigationStyles = StyleSheet.create({
  // Tab Bar
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[100],
    height: 60,
    paddingBottom: 5,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  tabBarLabelActive: {
    color: colors.lavender[600],
  },
  tabBarLabelInactive: {
    color: colors.lavender[400],
  },

  // Header de navegación
  header: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
  },
  headerTitle: {
    color: colors.lavender[900],
    fontSize: 18,
    fontWeight: "600",
  },
  headerBackButton: {
    padding: spacing.sm,
  },

  // Drawer
  drawer: {
    backgroundColor: colors.white,
  },
  drawerItem: {
    borderRadius: 0,
    marginVertical: 0,
  },
  drawerItemLabel: {
    color: colors.lavender[800],
    fontSize: 16,
    marginLeft: -16,
  },
  drawerActiveItem: {
    backgroundColor: colors.lavender[50],
  },
  drawerActiveLabel: {
    color: colors.lavender[600],
    fontWeight: "600",
  },
});
