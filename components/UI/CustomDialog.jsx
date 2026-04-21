import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import Button from "./Button";
import { colors } from "../../thema/colors";
import { spacing, borderRadius } from "../../styles/tokens";

export default function CustomDialog({
  visible,
  title,
  message,
  buttons = [],
  onClose,
}) {
  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {title ? (
            <AppText variant="h3" style={styles.title}>
              {title}
            </AppText>
          ) : null}
          {message ? (
            <AppText variant="body" style={styles.message}>
              {message}
            </AppText>
          ) : null}
          <View style={styles.buttonContainer}>
            {buttons && buttons.length > 0 ? (
              buttons.map((btn, idx) => (
                <Button
                  key={idx}
                  type={btn.style === "cancel" ? "primaryOutline" : "primary"}
                  onPress={() => {
                    onClose();
                    if (btn.onPress) btn.onPress();
                  }}
                  style={styles.button}
                >
                  {btn.text}
                </Button>
              ))
            ) : (
              <Button type="primary" onPress={onClose} style={styles.button}>
                Aceptar
              </Button>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  dialog: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: "100%",
    maxWidth: 400,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    color: colors.lavender[900],
    marginBottom: spacing.md,
    textAlign: "center",
  },
  message: {
    color: colors.neutral[600],
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  buttonContainer: {
    gap: spacing.md,
  },
  button: {
    width: "100%",
  },
});
