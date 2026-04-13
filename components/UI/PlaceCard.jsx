import { Alert, View, StyleSheet, Image } from "react-native";
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
import { getTypeConfig } from "../../thema/placesTypes";
import { getPlaceImage } from "../../constants/placeIconsConfig";
import React from "react";

const PlaceCard = ({ place }) => {
  const theme = getTypeConfig(place.tipo);
  // Use only place.id - ignore category for matching
  const placeImage = getPlaceImage(place.id);

  const handleCall = () => {
    if (!place.telefono) return;

    const phones = place.telefono.split("\n").map((num) => num.trim());

    if (phones.length > 1) {
      Alert.alert(
        "Seleccionar número",
        "Esta entidad tiene múltiples números de contacto:",
        [
          ...phones.map((phone) => ({
            text: `Llamar a ${phone}`,
            onPress: () => linkingService.makePhoneCall(phone),
          })),
          { text: "Cancelar", style: "cancel" },
        ],
        { cancelable: true },
      );
    } else {
      linkingService.makePhoneCall(phones[0]);
    }
  };

  const handleNavigate = () => {
    linkingService.openMapsNavigation(place.latitud, place.longitud);
  };

  return (
    <View
      style={[
        styles.card,
        { borderLeftWidth: 4, borderLeftColor: theme.primary },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.background, borderColor: theme.border },
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
          <AppText variant="h3" color="primary" numberOfLines={2}>
            {place.nombre}
          </AppText>
          <View style={[styles.typeBadge, { backgroundColor: theme.badgeBg }]}>
            <AppText variant="caption" style={{ color: theme.text }}>
              {place.tipo.split("_").join(" ").toUpperCase()}
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.details}>
        <DetailRow icon="time-outline" theme={theme} text={place.horario} />
        <DetailRow
          icon="location-outline"
          theme={theme}
          text={place.direccion}
        />
        <DetailRow icon="call-outline" theme={theme} text={place.telefono} />

        {place.descripcion && (
          <View style={styles.descriptionContainer}>
            <AppText variant="body" color="tertiary" style={styles.description}>
              {place.descripcion}
            </AppText>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <Button
          type="primaryOutline"
          variant="pill"
          size="flex"
          onPress={handleCall}
          iconLeft={
            <Ionicons name="call-outline" size={18} color={theme.primary} />
          }
          style={{ borderColor: theme.primary }}
          textStyle={{ color: theme.primary }}
        >
          Llamar
        </Button>
        <Button
          type="primary"
          variant="pill"
          size="flex"
          onPress={handleNavigate}
          iconLeft={
            <Ionicons name="navigate-outline" size={18} color={colors.white} />
          }
          style={{ backgroundColor: theme.buttonBg }}
        >
          Cómo llegar
        </Button>
      </View>
    </View>
  );
};

const DetailRow = ({ icon, theme, text }) => (
  <View style={styles.detailRow}>
    <Ionicons name={icon} size={16} color={theme.primary} />
    <AppText variant="body" color="secondary" style={styles.detailText}>
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
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.pill,
    alignSelf: "flex-start",
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
  },
  descriptionContainer: {
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: borderWidth.thin,
    borderTopColor: "#f0f0f0",
  },
  description: {
    fontStyle: "italic",
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});

export default PlaceCard;
