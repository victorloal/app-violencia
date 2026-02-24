// components/Settings/AdjustableSection.js

import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../UI/AppText";
import StyledButton from "../UI/StyledButton";
import { colors } from "../../thema/colors";
import { styles } from "../../styles/SettingsStyles";

export const AdjustableSection = ({
  section,
  value,
  onIncrease,
  onDecrease,
  disabled,
}) => {
  return (
    <View style={styles.formContainer}>
      <AppText variant="title" style={styles.sectionTitle}>
        {section.name}
      </AppText>
      <View style={styles.actionRow}>
        <StyledButton
          tone="dark"
          size="small"
          shape="pill"
          icon={<Ionicons name="remove-sharp" size={24} color={colors.white} />}
          onPress={onDecrease}
          disabled={value <= section.min || disabled}
        />
        <AppText variant="title" style={styles.middleText}>
          {value}
          {section.unit}
        </AppText>
        <StyledButton
          tone="dark"
          size="small"
          shape="pill"
          icon={<Ionicons name="add-sharp" size={24} color={colors.white} />}
          onPress={onIncrease}
          disabled={value >= section.max || disabled}
        />
      </View>
    </View>
  );
};
