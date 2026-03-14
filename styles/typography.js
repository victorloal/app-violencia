// styles/typography.js
import { StyleSheet } from "react-native";
import { fontSize, fontWeight, lineHeight, semanticColors } from "./tokens";

export const textVariants = {
  h1: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extraBold,
    color: semanticColors.text.primary,
  },
  h2: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
  },
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: semanticColors.text.primary,
  },
  h4: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: semanticColors.text.primary,
  },
  bodyLarge: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    color: semanticColors.text.secondary,
    lineHeight: fontSize.lg * lineHeight.normal,
  },
  body: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    color: semanticColors.text.secondary,
    lineHeight: fontSize.md * lineHeight.normal,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    color: semanticColors.text.tertiary,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    color: semanticColors.text.tertiary,
  },
  button: {
    fontWeight: fontWeight.semiBold,
    color: semanticColors.text.secondary,
    textTransform: "uppercase",
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
  },
  subtitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: semanticColors.text.primary,
  },
};

export const textColors = {
  primary: { color: semanticColors.text.primary },
  secondary: { color: semanticColors.text.secondary },
  tertiary: { color: semanticColors.text.tertiary },
  light: { color: semanticColors.text.inverse },
  danger: { color: semanticColors.error },
  success: { color: semanticColors.success },
  warning: { color: semanticColors.warning },
};

export const textModifiers = {
  bold: { fontWeight: fontWeight.bold },
  semiBold: { fontWeight: fontWeight.semiBold },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  uppercase: { textTransform: "uppercase" },
  capitalize: { textTransform: "capitalize" },
};

export const typography = StyleSheet.create({
  ...textVariants,
  ...textColors,
  ...textModifiers,
});
