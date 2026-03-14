// styles/tokens.js
import { colors } from "../thema/colors";

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 25,
  round: 30,
  pill: 100, // Para botones tipo pill
  circle: 999,
};
export const borderWidth = {
  none: 0,
  thin: 1,
  normal: 1.5,
  thick: 2,
  heavy: 3,
};

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  display: 38,
  displayLarge: 42,
};

export const fontWeight = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
};

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
};

export const opacity = {
  disabled: 0.5,
  semiTransparent: 0.7,
  transparent: 0.3,
};

export const zIndex = {
  base: 1,
  dropdown: 10,
  modal: 100,
  toast: 1000,
};
export const shadow = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.lavender[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  md: {
    shadowColor: colors.lavender[900],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.lavender[900],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};

// Colores semánticos
export const semanticColors = {
  primary: colors.lavender[600],
  primaryLight: colors.lavender[100],
  primaryDark: colors.lavender[800],
  secondary: colors.lavender[400],
  success: colors.green?.[600] || "#16a34a",
  successLight: colors.green?.[100] || "#dcfce7",
  error: colors.red?.[600] || "#dc2626",
  errorLight: colors.red?.[100] || "#fee2e2",
  warning: colors.orange?.[600] || "#ea580c",
  warningLight: colors.orange?.[100] || "#ffedd5",
  info: colors.lavender[500],
  infoLight: colors.lavender[50],
  background: colors.lavender[50],
  surface: colors.white,
  text: {
    primary: colors.lavender[900],
    secondary: colors.lavender[700],
    tertiary: colors.lavender[500],
    disabled: colors.lavender[300],
    inverse: colors.white,
  },
  border: {
    light: colors.lavender[100],
    normal: colors.lavender[200],
    dark: colors.lavender[300],
  },
};

export const layout = {
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowAround: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
};
