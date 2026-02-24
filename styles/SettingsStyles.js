// components/Settings/SettingsStyles.js

import { StyleSheet } from "react-native";
import { colors } from "./../thema/colors";

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
    backgroundColor: colors.lavender[50],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  headerText: {
    marginLeft: 10,
  },
  formContainer: {
    padding: 20,
    backgroundColor: colors.lavender[50],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderBottomColor: colors.lavender[200],
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 15,
    color: colors.lavender[900],
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  middleText: {
    marginHorizontal: 12,
  },
  saveCancelContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 40,
  },
  deviceFunctionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  deviceFunctionInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  deviceFunctionTexts: {
    marginLeft: 12,
    flex: 1,
  },
  deviceFunctionTitle: {
    fontSize: 16,
    color: colors.lavender[900],
  },
  deviceFunctionDescription: {
    fontSize: 12,
    color: colors.lavender[600],
    marginTop: 2,
  },
  brightnessHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  brightnessControl: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  brightnessValue: {
    minWidth: 40,
    textAlign: "right",
    color: colors.lavender[900],
  },
});
