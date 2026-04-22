import { View, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
import { DialogService } from "../../services/dialogService";
import { getTypeConfig } from "../../thema/placesTypes";
import { getPlaceImage } from "../../constants/placeIconsConfig";
import React from "react";

const PlaceCard = ({ place }) => {
  const theme = getTypeConfig(place.tipo);
  const API_BASE = "http://192.168.1.6:3000";
  const placeImage = place.icono_url
    ? { uri: `${API_BASE}${place.icono_url}` }
    : getPlaceImage(place.id);

  const handleCall = () => {
    const options = [];

    if (place.telefono) {
      const phones = place.telefono.split("\n").map((num) => num.trim());
      phones.forEach((phone) => {
        options.push({
          text: `Llamar a ${phone}`,
          onPress: () => linkingService.makePhoneCall(phone),
        });
      });
    }

    if (place.whatsapp) {
      options.push({
        text: "Escribir por WhatsApp",
        onPress: () => linkingService.openWhatsApp(place.whatsapp),
      });
    }

    if (options.length > 1) {
      options.push({ text: "Cancelar", style: "cancel" });
      DialogService.show(
        "Opciones de contacto",
        "Selecciona cómo deseas contactar a esta entidad:",
        options,
      );
    } else if (options.length === 1) {
      options[0].onPress();
    } else {
      DialogService.show(
        "Aviso",
        "No hay información de contacto disponible para este lugar.",
      );
    }
  };

  const handleNavigate = () => {
    linkingService.openMapsNavigation(place.latitud, place.longitud);
  };

  const cardAccessibilityLabel = [
    place.nombre,
    place.horario     ? `Horario: ${place.horario}`     : null,
    place.direccion   ? `Dirección: ${place.direccion}` : null,
    place.telefono    ? `Teléfono: ${place.telefono}`   : null,
    place.descripcion ? place.descripcion               : null,
  ]
    .filter(Boolean)
    .join(". ");

  return (
    // Contenedor raíz: invisible para TalkBack, solo layout
    <View
      style={[styles.card, { borderLeftWidth: 4, borderLeftColor: theme.primary }]}
      accessible={false}
      importantForAccessibility="no"
    >

      {/* ── BLOQUE DE INFORMACIÓN ──*/}
      <View
        style={styles.infoBlock}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={cardAccessibilityLabel}
      >
        {/* Cabecera: ícono + nombre */}
        <View
          style={styles.header}
          accessibilityElementsHidden={true}
          importantForAccessibility="no-hide-descendants"
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.white, borderColor: theme.border },
            ]}
          >
            {placeImage ? (
              <Image
                source={placeImage}
                style={styles.placeImage}
                resizeMode="contain"
              />
            ) : theme.isCustomIcon ? (
              React.createElement(theme.icon, {
                width: 32,
                height: 32,
                color: theme.primary,
              })
            ) : (
              <Ionicons name={theme.icon} size={32} color={theme.primary} />
            )}
          </View>

          <View style={styles.titleContainer}>
            <AppText
              variant="h4"
              numberOfLines={4}
              style={[styles.detailText, { color: theme.text }]}
            >
              {place.nombre}
            </AppText>
          </View>
        </View>

        {/* Detalles: horario, dirección, teléfono, descripción */}
        <View
          style={styles.details}
          accessibilityElementsHidden={true}
          importantForAccessibility="no-hide-descendants"
        >
          <DetailRow icon="time-outline"     theme={theme} text={place.horario}   />
          <DetailRow icon="location-outline" theme={theme} text={place.direccion} />
          <DetailRow icon="call-outline"     theme={theme} text={place.telefono}  />

          {place.descripcion && (
            <View style={styles.descriptionContainer}>
              <AppText
                variant="body"
                style={[styles.detailText, { color: theme.text }]}
              >
                {place.descripcion}
              </AppText>
            </View>
          )}
        </View>
      </View>

      <View
        style={styles.actions}
        accessible={false}
        importantForAccessibility="no"
      >
        <Button
          type="primary"
          size="flex"
          onPress={handleCall}
          style={[styles.button, { backgroundColor: theme.badgeBg }]}
          textStyle={{ color: theme.text }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Contactar a ${place.nombre}`}
          accessibilityHint="Muestra opciones para llamar o escribir por WhatsApp"
        >
          Contactar
        </Button>

        <Button
          type="primary"
          size="flex"
          onPress={handleNavigate}
          style={[styles.button, { backgroundColor: theme.badgeBg }]}
          textStyle={{ color: theme.text }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Cómo llegar a ${place.nombre}`}
          accessibilityHint="Abre la navegación en mapas"
        >
          Cómo llegar
        </Button>
      </View>

    </View>
  );
};

// Puramente visual, el infoBlock padre ya comunica su contenido
const DetailRow = ({ icon, theme, text }) => (
  <View style={styles.detailRow}>
    <Ionicons name={icon} size={24} color={theme.primary} accessible={false} />
    <AppText variant="body" style={[styles.detailText, { color: theme.text }]}>
      {text}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadow.sm,
    borderWidth: borderWidth.thin,
    borderColor: "#f0f0f0",
  },
  infoBlock: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: borderWidth.thin,
  },
  placeImage: {
    width: "100%",
    height: "100%",
    borderRadius: borderRadius.md,
  },
  titleContainer: {
    flex: 1,
    gap: spacing.xxs,
    textAlignVertical: "center",
  },
  details: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  detailText: {
    flex: 1,
    flexWrap: "wrap",
    textAlignVertical: "center",
  },
  descriptionContainer: {
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: borderWidth.thin,
    borderTopColor: "#f0f0f0",
  },
  actions: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    elevation: 3,
    height: "100%",
    width: "100%",
  },
});

export default PlaceCard;