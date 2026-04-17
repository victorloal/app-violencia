// screens/EmergencyScreen.jsx
import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MainLayout from "../components/Layout/MainLayout";
import AppText from "../components/UI/AppText";
import EmergencyCard from "../components/UI/EmergencyCard";
import { emergencyNumbers } from "../data/emergencyData";
import { SettingsContext } from "../context/SettingsContext";
import { colors } from "../thema/colors";
import { spacing, borderRadius, borderWidth } from "../styles/tokens";

export default function EmergencyScreen({ navigation }) {
  const { phoneNumber } = useContext(SettingsContext);

  // Número de emergencia personalizado (el del usuario)
  const userEmergencyNumber = phoneNumber
    ? {
        id: "user-emergency",
        nombre: "Mi contacto de emergencia",
        numero: phoneNumber,
      }
    : null;

  // Resto de números de emergencia (generales)
  const otherNumbers = emergencyNumbers;

  return (
    <MainLayout>
      <ScrollView 
        style={styles.scrollContent}
        accessible={false}
      >
        <View style={styles.listContainer}>
          {/* Mensaje inicial */}
          <View 
            style={styles.initialMessage}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel="Estos números pueden ayudarte en caso de emergencia a cualquier hora"
            >
            <Ionicons
              name="information-circle"
              size={30}
              color={colors.lavender[600]}
              accessible={false}
              importantForAccessibility="no"
            />
            <AppText
              variant="body"
              color="secondary"
              style={styles.initialMessageText}
              accessible={false}
              importantForAccessibility="no"
            >
              Estos números pueden ayudarte en caso de emergencia a cualquier
              hora
            </AppText>
          </View>

          {/* Número personalizado del usuario (si existe) */}
          {userEmergencyNumber && (
            <>
              <View 
                style={styles.sectionHeader}
                accessible={false}
                importantForAccessibility="no-hide-descendants"
              >
                <View style={styles.sectionHeaderLine} />
                <View style={styles.sectionHeaderLabel}>
                  <AppText variant="body" color="primary" bold>
                    Tu contacto de emergencia
                  </AppText>
                </View>
                <View style={styles.sectionHeaderLine} />
              </View>
              {/* Tarjeta de emergencia personalizada del usuario */}
              <View
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel="Sección: Tu contacto de emergencia"
                style={{ height: 0 }}
              />

              <EmergencyCard place={userEmergencyNumber} />
            </>
          )}
          
          {/* Resto de números de emergencia */}
          {userEmergencyNumber && (
            <View
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Sección: Números de emergencia generales"
              style={{ height: 0 }}
            />
          )}

          {otherNumbers.map((p) => (
            <EmergencyCard key={p.id} place={p} />
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xxl,
    backgroundColor: colors.white,
  },
  // Lista
  listContainer: {
    flex: 1,
    gap: spacing.md,
    marginBottom: spacing.xxxl,
  },

  // Mensaje inicial
  initialMessage: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.magenta[50],
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    borderWidth: borderWidth.thin,
    borderColor: colors.magenta[100],
  },

  initialMessageText: {
    flex: 1,
    flexWrap: "wrap",
  },

  // Separador de sección
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  sectionHeaderLine: {
    flex: 1,
    height: borderWidth.sm,
    backgroundColor: colors.lavender[300],
  },
  sectionHeaderLabel: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});
