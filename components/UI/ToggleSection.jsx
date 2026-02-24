// components/Settings/ToggleSection.js

import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../UI/AppText";
import StyledButton from "../UI/StyledButton";
import { colors } from "../../thema/colors";
import { styles } from "../../styles/SettingsStyles";

export const ToggleSection = ({
  title,
  value,
  onToggle,
  disabled,
  iconOn,
  iconOff,
}) => {
  return (
    <View style={styles.formContainer}>
      <AppText variant="title" style={styles.sectionTitle}>
        {title}
      </AppText>
      <View style={styles.actionRow}>
        <StyledButton
          iconPosition="top"
          title={value ? "Apagar" : "Encender"}
          tone="dark"
          size="small"
          shape="pill"
          icon={
            <Ionicons
              name={value ? iconOff : iconOn}
              size={24}
              color={colors.white}
            />
          }
          onPress={onToggle}
          disabled={disabled}
        />
      </View>
    </View>
  );
};
