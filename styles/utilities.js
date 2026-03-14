// styles/utilities.js
import { StyleSheet } from "react-native";
import { spacing, semanticColors, borderWidth, opacity } from "./tokens";

export const utilities = StyleSheet.create({
  // Margins
  m0: { margin: 0 },
  mXs: { margin: spacing.xs },
  mSm: { margin: spacing.sm },
  mMd: { margin: spacing.md },
  mLg: { margin: spacing.lg },
  mXl: { margin: spacing.xl },

  // Margin Top
  mt0: { marginTop: 0 },
  mtXs: { marginTop: spacing.xs },
  mtSm: { marginTop: spacing.sm },
  mtMd: { marginTop: spacing.md },
  mtLg: { marginTop: spacing.lg },
  mtXl: { marginTop: spacing.xl },

  // Margin Bottom
  mb0: { marginBottom: 0 },
  mbXs: { marginBottom: spacing.xs },
  mbSm: { marginBottom: spacing.sm },
  mbMd: { marginBottom: spacing.md },
  mbLg: { marginBottom: spacing.lg },
  mbXl: { marginBottom: spacing.xl },

  // Margin Left
  ml0: { marginLeft: 0 },
  mlXs: { marginLeft: spacing.xs },
  mlSm: { marginLeft: spacing.sm },
  mlMd: { marginLeft: spacing.md },
  mlLg: { marginLeft: spacing.lg },
  mlXl: { marginLeft: spacing.xl },

  // Margin Right
  mr0: { marginRight: 0 },
  mrXs: { marginRight: spacing.xs },
  mrSm: { marginRight: spacing.sm },
  mrMd: { marginRight: spacing.md },
  mrLg: { marginRight: spacing.lg },
  mrXl: { marginRight: spacing.xl },

  // Paddings
  p0: { padding: 0 },
  pXs: { padding: spacing.xs },
  pSm: { padding: spacing.sm },
  pMd: { padding: spacing.md },
  pLg: { padding: spacing.lg },
  pXl: { padding: spacing.xl },

  // Padding Horizontal
  ph0: { paddingHorizontal: 0 },
  phXs: { paddingHorizontal: spacing.xs },
  phSm: { paddingHorizontal: spacing.sm },
  phMd: { paddingHorizontal: spacing.md },
  phLg: { paddingHorizontal: spacing.lg },
  phXl: { paddingHorizontal: spacing.xl },

  // Padding Vertical
  pv0: { paddingVertical: 0 },
  pvXs: { paddingVertical: spacing.xs },
  pvSm: { paddingVertical: spacing.sm },
  pvMd: { paddingVertical: spacing.md },
  pvLg: { paddingVertical: spacing.lg },
  pvXl: { paddingVertical: spacing.xl },

  // Flex
  flex1: { flex: 1 },
  flexRow: { flexDirection: "row" },
  flexColumn: { flexDirection: "column" },
  flexWrap: { flexWrap: "wrap" },
  flexGrow: { flexGrow: 1 },

  // Alignment
  center: { justifyContent: "center", alignItems: "center" },
  itemsCenter: { alignItems: "center" },
  itemsStart: { alignItems: "flex-start" },
  itemsEnd: { alignItems: "flex-end" },
  justifyCenter: { justifyContent: "center" },
  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyBetween: { justifyContent: "space-between" },
  justifyAround: { justifyContent: "space-around" },

  // Position
  relative: { position: "relative" },
  absolute: { position: "absolute" },

  // Border
  border: {
    borderWidth: borderWidth.thin,
    borderColor: semanticColors.border.normal,
  },
  borderTop: {
    borderTopWidth: borderWidth.thin,
    borderTopColor: semanticColors.border.normal,
  },
  borderBottom: {
    borderBottomWidth: borderWidth.thin,
    borderBottomColor: semanticColors.border.normal,
  },
  borderLeft: {
    borderLeftWidth: borderWidth.thin,
    borderLeftColor: semanticColors.border.normal,
  },
  borderRight: {
    borderRightWidth: borderWidth.thin,
    borderRightColor: semanticColors.border.normal,
  },

  // Background
  bgWhite: { backgroundColor: semanticColors.surface },
  bgPrimary: { backgroundColor: semanticColors.primary },
  bgLight: { backgroundColor: semanticColors.background },

  // Overflow
  overflowHidden: { overflow: "hidden" },
  overflowVisible: { overflow: "visible" },

  // Opacity
  opacity75: { opacity: 0.75 },
  opacity50: { opacity: opacity.disabled },
  opacity25: { opacity: 0.25 },
});
