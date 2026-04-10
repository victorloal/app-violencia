// styles/typography.js
import { StyleSheet } from "react-native";
import { fontSize, fontWeight, lineHeight, semanticColors, fonts } from "./tokens";

export const textVariants = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extraBold,
    color: semanticColors.text.primary,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
  },
  h3: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: semanticColors.text.primary,
  },
  h4: {
    fontFamily: fonts.bold,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: semanticColors.text.primary,
  },
  bodyLarge: {
    fontFamily: fonts.regular,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    color: semanticColors.text.secondary,
    lineHeight: fontSize.lg * lineHeight.normal,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    color: semanticColors.text.secondary,
    lineHeight: fontSize.md * lineHeight.normal,
  },
  bodySmall: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    color: semanticColors.text.tertiary,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    color: semanticColors.text.tertiary,
  },
  button: {
    fontFamily: fonts.bold,
    fontWeight: fontWeight.semiBold,
    color: semanticColors.text.secondary,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
  },
  subtitle: {
    fontFamily: fonts.bold,
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
