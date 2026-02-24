import { Text } from "react-native";
import { colors } from "../../thema/colors";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";

export default function AppText({
  children,
  variant = "body",
  tone = "normal",
  align = "left",
  weight,
  style,
  ...props
}) {
  const { fontSize: globalFontSize } = useContext(SettingsContext);

  const baseFontSize = {
    title: 26,
    subtitle: 20,
    body: 16,
    caption: 13,
    button: 16,
  };

  const textStyle = [
    { fontSize: baseFontSize[variant] * (globalFontSize / 18) }, // Escalamos según ajuste global
    styles[variant],
    styles[tone],
    { textAlign: align },
    weight && { fontWeight: weight },
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
}

const styles = {
  title: { fontWeight: "700" },
  subtitle: { fontWeight: "600" },
  body: { fontWeight: "400" },
  caption: { fontWeight: "400" },
  button: { fontWeight: "600", textTransform: "uppercase" },

  normal: { color: colors.neutral[900] },
  muted: { color: colors.neutral[500] },
  light: { color: colors.white },
  danger: { color: colors.red[600] },
};
