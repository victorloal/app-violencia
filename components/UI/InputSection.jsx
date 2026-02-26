// components/UI/InputSection.js

import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";
import { colors } from "../../thema/colors";
import { styles } from "../../styles/SettingsStyles";

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
    <View style={styles.formContainer}>
      <AppText variant="title" style={styles.sectionTitle}>
        {title}
      </AppText>
      <View style={styles.inputRow}>
        {icon && (
          <View style={styles.inputIcon}>
            {typeof icon === "string" ? (
              <Ionicons
                name={icon}
                size={24}
                color={colors.lavender[600]}
              />
            ) : (
              icon
            )}
          </View>
        )}
        <TextInput
          style={[styles.textInput, disabled && styles.disabledInput]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          keyboardType={keyboardType}
          placeholderTextColor={colors.lavender[300]}
        />
      </View>
    </View>
  );
};
