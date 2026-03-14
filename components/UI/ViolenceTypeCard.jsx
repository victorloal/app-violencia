// components/UI/ViolenceTypeCard.jsx
import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles";
import AppText from "../UI/AppText";
import Button from "./Button";
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
      <View style={cardStyles.card}>
        {/* Título */}
        <AppText variant="h2" style={cardStyles.title}>
          {title}
        </AppText>

        {/* Icono grande centrado */}
        <View style={cardStyles.iconContainer}>{icon}</View>

        {/* Descripción con scroll */}
        <ScrollView
          style={cardStyles.descriptionContainer}
          showsVerticalScrollIndicator={false}
        >
          <AppText variant="body" style={cardStyles.description}>
            {description}
          </AppText>
        </ScrollView>

        {/* ── Botones inferiores ── */}
        <View style={cardStyles.buttonsContainer}>
          <Button
            type="outline"
            size="small"
            onPress={handleInfoPress}
            iconLeft={
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={styles.semanticColors.primary}
              />
            }
          >
            Información
          </Button>

          <Button type="primary" size="medium" onPress={onPressServices}>
            ¿Necesitas Atención?
          </Button>
        </View>
      </View>

      {/* ── Modal tipo bottom-sheet ── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={cardStyles.modalOverlay}>
          {/* Fondo: capa absoluta, tap para cerrar */}
          <TouchableOpacity
            style={cardStyles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />

          {/* Card — hermano del backdrop */}
          <View style={cardStyles.modalCard}>
            <View style={cardStyles.dragIndicator} />

            <TouchableOpacity
              style={cardStyles.modalCloseButton}
              onPress={() => setModalVisible(false)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="close-circle"
                size={30}
                color={styles.semanticColors.text.muted}
              />
            </TouchableOpacity>

            {/* Encabezado */}
            <View style={cardStyles.modalHeader}>
              <View style={cardStyles.modalIconContainer}>{icon}</View>
              <AppText variant="h2" style={cardStyles.modalTitle}>
                {title}
              </AppText>
            </View>

            <View style={cardStyles.modalDivider} />

            {/* Contenido scrollable */}
            <ScrollView
              style={cardStyles.modalScrollView}
              contentContainerStyle={cardStyles.modalScrollContent}
              showsVerticalScrollIndicator
              nestedScrollEnabled
            >
              <AppText variant="bodyLarge" style={cardStyles.modalDescription}>
                {description}
              </AppText>

              <View style={cardStyles.modalSection}>
                <View style={cardStyles.modalSectionHeader}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={22}
                    color={styles.semanticColors.warning}
                  />
                  <AppText variant="h3" style={cardStyles.modalSectionTitle}>
                    Señales de alerta
                  </AppText>
                </View>
                <AppText variant="body" style={cardStyles.modalSectionText}>
                  Si identificas estas situaciones en tu vida o en la de alguien
                  cercano, no dudes en buscar ayuda. No estás sola/solo.
                </AppText>
              </View>

              <View style={cardStyles.modalSection}>
                <View style={cardStyles.modalSectionHeader}>
                  <Ionicons
                    name="hand-left-outline"
                    size={22}
                    color={styles.semanticColors.info}
                  />
                  <AppText variant="h3" style={cardStyles.modalSectionTitle}>
                    ¿Qué puedes hacer?
                  </AppText>
                </View>
                <AppText variant="body" style={cardStyles.modalSectionText}>
                  Habla con alguien de confianza, documenta los hechos si es
                  seguro hacerlo y comunícate con una línea de apoyo o centro
                  especializado.
                </AppText>
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={cardStyles.modalFooter}>
              <Button
                type="primary"
                size="large"
                onPress={() => {
                  setModalVisible(false);
                  onPressServices();
                }}
              >
                Buscar Ayuda
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const cardStyles = StyleSheet.create({
  // ── Card principal ──
  card: {
    backgroundColor: styles.semanticColors.primaryLight,
    borderRadius: styles.borderRadius.xl,
    padding: styles.spacing.lg,
    width: "95%",
    height: "100%",
    ...styles.shadow.md,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: styles.spacing.md,
    marginTop: styles.spacing.xs,
    color: styles.semanticColors.text.primary,
  },
  iconContainer: {
    ...styles.utilities.center,
    backgroundColor: styles.semanticColors.surface,
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: "center",
    marginBottom: styles.spacing.lg,
    borderWidth: styles.borderWidth.lg,
    borderColor: styles.semanticColors.primaryLight,
    ...styles.shadow.sm,
  },
  descriptionContainer: {
    flex: 1,
    marginBottom: styles.spacing.md,
  },
  description: {
    textAlign: "center",
    color: styles.semanticColors.text.secondary,
  },

  // ── Botones inferiores ──
  buttonsContainer: {
    gap: styles.spacing.sm,
  },

  // ── Modal overlay ──
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: styles.semanticColors.overlay,
  },

  // ── Modal card (bottom-sheet) ──
  modalCard: {
    backgroundColor: styles.semanticColors.surface,
    borderTopLeftRadius: styles.borderRadius.xxl,
    borderTopRightRadius: styles.borderRadius.xxl,
    paddingTop: styles.spacing.md,
    paddingHorizontal: styles.spacing.xl,
    paddingBottom: styles.spacing.xxl,
    maxHeight: "88%",
    ...styles.shadow.xl,
  },
  dragIndicator: {
    width: 44,
    height: 4,
    borderRadius: styles.borderRadius.sm,
    backgroundColor: styles.semanticColors.border.light,
    alignSelf: "center",
    marginBottom: styles.spacing.md,
  },
  modalCloseButton: {
    position: "absolute",
    top: styles.spacing.md,
    right: styles.spacing.lg,
    zIndex: styles.zIndex.modal,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: styles.spacing.lg,
    marginTop: styles.spacing.xs,
  },
  modalIconContainer: {
    backgroundColor: styles.semanticColors.primaryLight,
    width: 80,
    height: 80,
    borderRadius: 40,
    ...styles.utilities.center,
    marginBottom: styles.spacing.sm,
    borderWidth: styles.borderWidth.md,
    borderColor: styles.semanticColors.border.light,
  },
  modalTitle: {
    textAlign: "center",
    color: styles.semanticColors.text.primary,
  },
  modalDivider: {
    height: 1,
    backgroundColor: styles.semanticColors.border.light,
    marginBottom: styles.spacing.lg,
  },
  modalScrollView: {
    flexGrow: 0,
  },
  modalScrollContent: {
    paddingBottom: styles.spacing.sm,
  },
  modalDescription: {
    color: styles.semanticColors.text.secondary,
    marginBottom: styles.spacing.xl,
    textAlign: "justify",
  },
  modalSection: {
    backgroundColor: styles.semanticColors.backgroundAlt,
    borderRadius: styles.borderRadius.lg,
    padding: styles.spacing.md,
    marginBottom: styles.spacing.md,
    borderLeftWidth: styles.borderWidth.xl,
    borderLeftColor: styles.semanticColors.primary,
  },
  modalSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: styles.spacing.sm,
    marginBottom: styles.spacing.xs,
  },
  modalSectionTitle: {
    color: styles.semanticColors.text.primary,
    flex: 1,
  },
  modalSectionText: {
    color: styles.semanticColors.text.secondary,
  },

  // ── Modal footer ──
  modalFooter: {
    paddingTop: styles.spacing.md,
    borderTopWidth: styles.borderWidth.thin,
    borderTopColor: styles.semanticColors.border.light,
    marginTop: styles.spacing.sm,
  },
});
