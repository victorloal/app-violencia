// components/UI/ViolenceTypeCard.jsx
import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import AppText from "../UI/AppText";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { components } from "../../styles/components";
import {
  spacing,
  borderRadius,
  borderWidth,
  semanticColors,
  zIndex,
  shadow,
} from "../../styles/tokens";

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
      <View style={[components.card, cardStyles.card]}>
        {/* Título */}
        <AppText variant="h2" style={cardStyles.title}>
          {title}
        </AppText>

        {/* Icono grande centrado */}
        <View style={[components.iconContainerLarge, cardStyles.iconContainer]}>
          {icon}
        </View>

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
            type="primaryGhost"
            variant="circle"
            size="xs"
            onPress={handleInfoPress}
            iconLeft={
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={semanticColors.primary}
              />
            }
          ></Button>

          <Button type="primary" size="xl" onPress={onPressServices}>
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
          <View style={[components.card, cardStyles.modalCard]}>
            <View style={cardStyles.dragIndicator} />

            <TouchableOpacity
              style={cardStyles.modalCloseButton}
              onPress={() => setModalVisible(false)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="close-circle"
                size={30}
                color={semanticColors.text.tertiary}
              />
            </TouchableOpacity>

            {/* Encabezado */}
            <View style={cardStyles.modalHeader}>
              <View
                style={[
                  components.iconContainerLarge,
                  cardStyles.modalIconContainer,
                ]}
              >
                {icon}
              </View>
              <AppText variant="h2" style={cardStyles.modalTitle}>
                {title}
              </AppText>
            </View>

            <View style={components.divider} />

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
                    color={semanticColors.warning}
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
                    color={semanticColors.info}
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
                size="lg"
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
    padding: spacing.lg,
    ...shadow.md,
    width: "100%",
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginBottom: spacing.md,
    color: semanticColors.text.primary,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: spacing.lg,
    borderWidth: borderWidth.thick,
    borderColor: semanticColors.primaryLight,
    ...shadow.sm,
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    textAlign: "center",
    color: semanticColors.text.secondary,
    paddingHorizontal: spacing.xs,
  },

  // ── Botones inferiores ──
  buttonsContainer: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },

  // ── Modal overlay ──
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  // ── Modal card (bottom-sheet) ──
  modalCard: {
    paddingHorizontal: spacing.xl,
    ...shadow.lg,
  },
  dragIndicator: {
    width: 44,
    height: 4,
    borderRadius: borderRadius.xs,
    backgroundColor: semanticColors.border.light,
    alignSelf: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: spacing.md,
    right: spacing.lg,
    zIndex: zIndex.modal,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.sm,
    borderWidth: borderWidth.md,
    borderColor: semanticColors.border.light,
  },
  modalTitle: {
    textAlign: "center",
    color: semanticColors.text.primary,
  },
  modalScrollView: {
    flexGrow: 1,
  },
  modalScrollContent: {
    paddingBottom: spacing.sm,
  },
  modalDescription: {
    color: semanticColors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: "justify",
  },
  modalSection: {
    backgroundColor: semanticColors.primaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: borderWidth.thick,
    borderLeftColor: semanticColors.primary,
  },
  modalSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  modalSectionTitle: {
    color: semanticColors.text.primary,
    flex: 1,
  },
  modalSectionText: {
    color: semanticColors.text.secondary,
  },

  // ── Modal footer ──
  modalFooter: {
    borderTopWidth: borderWidth.thin,
    borderTopColor: semanticColors.border.light,
  },
});
