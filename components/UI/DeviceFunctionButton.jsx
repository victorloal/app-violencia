import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";
import StyledButton from "./Button";
import { colors } from "../../thema/colors";
import { styles } from "../../styles/SettingsStyles";

export const DeviceFunctionButton = ({
  title,
  icon,
  onPress,
  description,
  disabled = false,
}) => {
  return (
    <View style={styles.deviceFunctionContainer}>
      <View style={styles.deviceFunctionInfo}>
        <Ionicons name={icon} size={24} color={colors.lavender[800]} />
        <View style={styles.deviceFunctionTexts}>
          <AppText variant="subtitle" style={styles.deviceFunctionTitle}>
            {title}
          </AppText>
          {description && (
            <AppText variant="caption" style={styles.deviceFunctionDescription}>
              {description}
            </AppText>
          )}
        </View>
      </View>
      <StyledButton
        title="Abrir"
        tone="dark"
        size="small"
        shape="pill"
        onPress={onPress}
        disabled={disabled}
      />
    </View>
  );
};
