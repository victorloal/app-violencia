import React from "react";
import SafeLayout from "./SafeLayout";
import styles from "../../styles";

const CenteredLayout = ({ children, style }) => {
  return (
    <SafeLayout
      scrollable={true}
      style={[styles.utilities.flex1, styles.utilities.center, style]}
    >
      {children}
    </SafeLayout>
  );
};

export default CenteredLayout;
