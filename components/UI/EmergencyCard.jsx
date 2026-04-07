// components/EmergencyCard.jsx
import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import AppText from "./AppText";
import Button from "./Button";
import { colors } from "../../thema/colors";
import {
  spacing,
  borderRadius,
  borderWidth,
  shadow,
} from "../../styles/tokens";
import { linkingService } from "../../services/linkingService";

export default function EmergencyCard({ place }) {
  return (
    <View style={styles.emergencyCard}>
      {/* Nombre y descripción */}
      <View style={styles.emergencyTop}>
        <View style={styles.emergencyTopText}>
          <AppText variant="h3" color="primary" style={styles.emergencyName}>
            {place.nombre}
          </AppText>
          <AppText variant="body" color="tertiary">
            {place.descripcion}
          </AppText>
        </View>
      </View>

      {/* Número y botón llamar */}
      <View style={styles.emergencyBottom}>
        <AppText variant="h1" color="primary" style={styles.emergencyNumber}>
          {place.numero}
        </AppText>
        <Button
          type="primary"
          size="flex"
          onPress={() => linkingService.makePhoneCall(place.numero)}
        >
          Llamar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Tarjeta de emergencia ─────────────────────────────────────
  emergencyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadow.md,
    borderWidth: borderWidth.normal,
    borderColor: colors.lavender[100],
  },

  // Fila superior
  emergencyTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  emergencyTopText: {
    gap: spacing.xxs,
  },

  // Fila inferior
  emergencyBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  emergencyNumber: {
    flex: 1,
    fontSize: 32, // Un poco más pequeño que h1 pero más grande que h2
  },
});
