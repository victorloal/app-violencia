import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../thema/colors";
import AppText from "../components/UI/AppText";
import StyledButton from "../components/UI/Button";

export default function MessageScreen({ navigation, route }) {
  const { onMessageSeen } = route.params || {};

  const handlePress = () => {
    if (onMessageSeen) {
      onMessageSeen();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View>
      <AppText>MessageScreen</AppText>
    </View>
  );
}
