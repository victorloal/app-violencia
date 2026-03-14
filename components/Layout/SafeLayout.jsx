import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../../styles";

const SafeLayout = ({
  children,
  style,
  backgroundColor,
  scrollable = true,
}) => {
  const insets = useSafeAreaInsets();

  const content = (
    <View style={[layoutStyles.container, style]}>{children}</View>
  );

  return (
    <View
      style={[
        layoutStyles.safeArea,
        {
          backgroundColor: backgroundColor || styles.semanticColors.surface,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {scrollable ? (
        <ScrollView
          contentContainerStyle={layoutStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
};

const layoutStyles = StyleSheet.create({
  safeArea: {
    // eslint-disable-next-line import/no-named-as-default-member
    ...styles.utilities.flex1,
  },
  container: {
    // eslint-disable-next-line import/no-named-as-default-member
    ...styles.utilities.flex1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default SafeLayout;
