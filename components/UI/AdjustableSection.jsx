// components/Settings/AdjustableSection.js

import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles";
import AppText from "../UI/AppText";
import Button from "./Button";
const { forms, semanticColors } = styles;

export const AdjustableSection = ({
  section,
  value,
  onIncrease,
  onDecrease,
  disabled,
}) => {
  return (
    <View style={forms.container}>
      <AppText variant="title" style={forms.label}>
        {section.name}
      </AppText>
      <View style={forms.inputContainer}>
        <Button
          type="primary"
          size="small"
          variant="pill"
          iconLeft={
            <Ionicons
              name="remove-sharp"
              size={24}
              color={semanticColors.text.inverse}
            />
          }
          onPress={onDecrease}
          disabled={value <= section.min || disabled}
        />
        <AppText variant="h3" style={{ marginHorizontal: styles.spacing.md }}>
          {value}
          {section.unit}
        </AppText>
        <Button
          type="primary"
          size="small"
          variant="pill"
          iconLeft={
            <Ionicons
              name="add-sharp"
              size={24}
              color={semanticColors.text.inverse}
            />
          }
          onPress={onIncrease}
          disabled={value >= section.max || disabled}
        />
      </View>
    </View>
  );
};
