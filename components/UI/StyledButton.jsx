import { Pressable, Text, StyleSheet, View } from "react-native";
import { colors } from "../../thema/colors";
import AppText from "./AppText";

export default function StyledButton({
  title,
  onPress,
  size = "medium",
  variant = "solid", // solid | outline | text
  tone = "normal", // normal | light | dark | danger
  shape = "default", // default | pill
  icon = null,
  iconPosition = "left", // left | right | top | bottom
  disabled = false,
}) {
  const palette = getPalette(tone);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[shape],
        getVariantStyle(variant, palette, pressed || disabled),
        disabled && styles.disabled,
      ]}
    >
      <View
        style={[
          styles.content,
          (iconPosition === "top" || iconPosition === "bottom") && {
            flexDirection: "column",
          },
        ]}
      >
        {icon && iconPosition === "top" && (
          <View style={styles.iconVertical}>{icon}</View>
        )}

        {icon && iconPosition === "left" && (
          <View style={styles.iconLeft}>{icon}</View>
        )}

        <AppText
          variant="button"
          style={[styles.text, getTextStyle(variant, palette)]}
        >
          {title}
        </AppText>

        {icon && iconPosition === "right" && (
          <View style={styles.iconRight}>{icon}</View>
        )}

        {icon && iconPosition === "bottom" && (
          <View style={styles.iconVertical}>{icon}</View>
        )}
      </View>
    </Pressable>
  );
}

/* ---------- COLOR SYSTEM ---------- */
function getPalette(tone) {
  switch (tone) {
    case "light":
      return {
        bg: colors.lavender[200],
        bgPressed: colors.lavender[300],
        text: colors.lavender[800],
        border: colors.lavender[400],
      };
    case "dark":
      return {
        bg: colors.lavender[800],
        bgPressed: colors.lavender[900],
        text: colors.white,
        border: colors.lavender[800],
      };
    case "danger":
      return {
        bg: colors.red[600],
        bgPressed: colors.red[700],
        text: colors.white,
        border: colors.red[600],
      };
    default:
      return {
        bg: colors.lavender[500],
        bgPressed: colors.lavender[700],
        text: colors.white,
        border: colors.lavender[500],
      };
  }
}

/* ---------- VARIANT SYSTEM ---------- */
function getVariantStyle(variant, palette, pressed) {
  switch (variant) {
    case "outline":
      return {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: palette.border,
        opacity: pressed ? 0.7 : 1,
      };
    case "text":
      return {
        backgroundColor: "transparent",
        opacity: pressed ? 0.6 : 1,
      };
    default: // solid
      return {
        backgroundColor: pressed ? palette.bgPressed : palette.bg,
      };
  }
}

function getTextStyle(variant, palette, disabled) {
  if (disabled) {
    return { color: colors.neutral[400] };
  }
  if (variant === "solid") {
    return { color: palette.text };
  }
  return { color: palette.border };
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  disabled: {
    backgroundColor: colors.neutral[200],
    borderColor: colors.neutral[300],
    opacity: 0.8,
  },
  default: {
    borderRadius: 12,
  },
  pill: {
    borderRadius: 100,
  },
  small: {
    width: 120,
    paddingVertical: 10,
  },
  medium: {
    width: 180,
  },
  large: {
    width: "100%",
  },
  flex: {
    flex: 1,
  },
});
