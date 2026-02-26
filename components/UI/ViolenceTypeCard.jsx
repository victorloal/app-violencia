// components/UI/ViolenceTypeCard.jsx
import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { colors } from "../../thema/colors";
import AppText from "../UI/AppText";
import AnimatedStyledButton from "../UI/StyledButton";
import { Ionicons } from "@expo/vector-icons";

export default function ViolenceTypeCard({
  title,
  description,
  icon,
  onPressServices,
  onPressInfo,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleInfoPress = () => {
    setModalVisible(true);
    if (onPressInfo) onPressInfo();
  };

  return (
    <>
      <View style={styles.card}>
        {/* Título */}
        <AppText style={styles.title}>{title}</AppText>

        {/* Icono grande centrado */}
        <View style={styles.iconContainer}>{icon}</View>

        {/* Descripción con scroll */}
        <ScrollView
          style={styles.descriptionContainer}
          showsVerticalScrollIndicator={false}
        >
          <AppText style={styles.description}>{description}</AppText>
        </ScrollView>

        {/* ── Botones inferiores — SIN flex, tamaño explícito ── */}
        <View style={styles.buttonsContainer}>

          {/* Botón Información */}
          <TouchableOpacity style={styles.infoButton} onPress={handleInfoPress}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.lavender[700]}
            />
            <AppText style={styles.infoButtonText}>Información</AppText>
          </TouchableOpacity>

          {/* Botón ¿Necesitas Atención? */}
          <TouchableOpacity style={styles.mainButton} onPress={onPressServices}>
            <AppText style={styles.mainButtonText}>¿Necesitas Atención?</AppText>
          </TouchableOpacity>

        </View>
      </View>

      {/* ── Modal tipo bottom-sheet ── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {/* Fondo: capa absoluta, tap para cerrar */}
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />

          {/* Card — hermano del backdrop */}
          <View style={styles.modalCard}>
            <View style={styles.dragIndicator} />

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-circle" size={30} color={colors.lavender[400]} />
            </TouchableOpacity>

            {/* Encabezado */}
            <View style={styles.modalHeader}>
              <View style={styles.modalIconContainer}>{icon}</View>
              <AppText style={styles.modalTitle}>{title}</AppText>
            </View>

            <View style={styles.modalDivider} />

            {/* Contenido scrollable */}
            <ScrollView
              style={styles.modalScrollView}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator
              nestedScrollEnabled
            >
              <AppText style={styles.modalDescription}>{description}</AppText>

              <View style={styles.modalSection}>
                <View style={styles.modalSectionHeader}>
                  <Ionicons name="alert-circle-outline" size={22} color={colors.lavender[600]} />
                  <AppText style={styles.modalSectionTitle}>Señales de alerta</AppText>
                </View>
                <AppText style={styles.modalSectionText}>
                  Si identificas estas situaciones en tu vida o en la de alguien
                  cercano, no dudes en buscar ayuda. No estás sola/solo.
                </AppText>
              </View>

              <View style={styles.modalSection}>
                <View style={styles.modalSectionHeader}>
                  <Ionicons name="hand-left-outline" size={22} color={colors.lavender[600]} />
                  <AppText style={styles.modalSectionTitle}>¿Qué puedes hacer?</AppText>
                </View>
                <AppText style={styles.modalSectionText}>
                  Habla con alguien de confianza, documenta los hechos si es
                  seguro hacerlo y comunícate con una línea de apoyo o centro
                  especializado.
                </AppText>
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalMainButton}
                onPress={() => {
                  setModalVisible(false);
                  onPressServices();
                }}
              >
                <AppText style={styles.modalMainButtonText}>Buscar Ayuda</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // ── Card principal ────────────────────────────────────────
  card: {
    backgroundColor: colors.lavender[100],
    borderRadius: 20,
    padding: 20,
    width: "95%",
    height: "100%",
    shadowColor: colors.lavender[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    marginTop: 6,
    color: colors.lavender[900],
    fontSize: 22,
    fontWeight: "bold",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lavender[200],
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: colors.lavender[300],
    shadowColor: colors.lavender[700],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  descriptionContainer: {
    flex: 1,
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    color: colors.lavender[800],
    lineHeight: 22,
    fontSize: 15,
  },

  // ── Botones inferiores ────────────────────────────────────
  buttonsContainer: {
    gap: 10,
    // Sin flex ni posición absoluta — ocupa lo que necesita
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: colors.lavender[300],
    width: "100%",
  },
  infoButtonText: {
    color: colors.lavender[700],
    fontWeight: "600",
    fontSize: 15,
  },
  mainButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lavender[800],
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: "100%",
  },
  mainButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },

  // ── Modal overlay ─────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(99, 38, 125, 0.45)",
  },

  // ── Modal card (bottom-sheet) ─────────────────────────────
  modalCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 32,
    maxHeight: "88%",
    shadowColor: colors.lavender[950],
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
  dragIndicator: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.lavender[200],
    alignSelf: "center",
    marginBottom: 14,
  },
  modalCloseButton: {
    position: "absolute",
    top: 14,
    right: 20,
    zIndex: 10,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  modalIconContainer: {
    backgroundColor: colors.lavender[100],
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.lavender[200],
  },
  modalTitle: {
    textAlign: "center",
    color: colors.lavender[900],
    fontSize: 22,
    fontWeight: "bold",
  },
  modalDivider: {
    height: 1,
    backgroundColor: colors.lavender[100],
    marginBottom: 16,
  },
  modalScrollView: {
    flexGrow: 0,
  },
  modalScrollContent: {
    paddingBottom: 8,
  },
  modalDescription: {
    color: colors.lavender[800],
    lineHeight: 26,
    marginBottom: 20,
    textAlign: "justify",
    fontSize: 16,
  },
  modalSection: {
    backgroundColor: colors.lavender[50],
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: colors.lavender[500],
  },
  modalSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  modalSectionTitle: {
    color: colors.lavender[900],
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
  },
  modalSectionText: {
    color: colors.lavender[700],
    lineHeight: 22,
    fontSize: 15,
  },

  // ── Modal footer ──────────────────────────────────────────
  modalFooter: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[100],
    marginTop: 8,
  },
  modalMainButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lavender[800],
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
  },
  modalMainButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});