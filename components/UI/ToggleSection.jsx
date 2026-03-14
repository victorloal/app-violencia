// components/Settings/ToggleSection.js

import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles";
import AppText from "../UI/AppText";
import Button from "./Button";
const { forms, semanticColors } = styles;

export const ToggleSection = ({
  title,
  value,
  onToggle,
  disabled,
  iconOn,
  iconOff,
}) => {
  return (
    <View style={forms.container}>
      <AppText variant="title" style={forms.label}>
        {title}
      </AppText>
      <View style={forms.inputContainer}>
        <Button
          type={value ? "success" : "primary"}
          size="small"
          variant="pill"
          iconLeft={
            <Ionicons
              name={value ? iconOff : iconOn}
              size={24}
              color={semanticColors.text.inverse}
            />
          }
          onPress={onToggle}
          disabled={disabled}
        >
          {value ? "Apagar" : "Encender"}
        </Button>
      </View>
    </View>
  );
};
