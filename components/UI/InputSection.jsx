// components/UI/InputSection.js

import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";
import styles from "../../styles";
const formStyles = styles.forms;
const { semanticColors } = styles;

export const InputSection = ({
  title,
  placeholder,
  value,
  onChangeText,
  disabled,
  icon,
  keyboardType = "default",
}) => {
  return (
    <View style={formStyles.container}>
      <AppText variant="title" style={formStyles.label}>
        {title}
      </AppText>
      <View style={formStyles.inputContainer}>
        {icon && (
          <View style={formStyles.iconContainer}>
            {typeof icon === "string" ? (
              <Ionicons name={icon} size={24} color={semanticColors.primary} />
            ) : (
              icon
            )}
          </View>
        )}
        <TextInput
          style={[formStyles.input, disabled && formStyles.inputDisabled]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          keyboardType={keyboardType}
          placeholderTextColor={semanticColors.text.muted}
        />
      </View>
    </View>
  );
};
