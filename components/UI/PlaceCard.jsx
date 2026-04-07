// components/Places/PlaceCard.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../UI/AppText";
import Button from "../UI/Button";
import { colors } from "../../thema/colors";
import {
  spacing,
  borderRadius,
  borderWidth,
  shadow,
} from "../../styles/tokens";

const getIconByType = (tipo) => {
  switch (tipo) {
    case "salud":
      return "medkit-outline";
    case "protección":
      return "shield-outline";
    case "justicia":
      return "scale-outline";
    default:
      return "location-outline";
  }
};

const PlaceCard = ({ place }) => {
  const handleCall = () => {
    mapService.makePhoneCall(place.telefono);
  };

  const handleNavigate = () => {
    mapService.openMaps(place.latitud, place.longitud, place.direccion);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={getIconByType(place.tipo)}
            size={24}
            color={colors.lavender[700]}
          />
        </View>
        <View style={styles.titleContainer}>
          <AppText variant="h3" color="primary" numberOfLines={2}>
            {place.nombre}
          </AppText>
          <View style={styles.typeBadge}>
            <AppText variant="caption" color="secondary">
              {place.tipo.charAt(0).toUpperCase() + place.tipo.slice(1)}
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.details}>
        <DetailRow icon="time-outline" text={place.horario} />
        <DetailRow icon="location-outline" text={place.direccion} />
        <DetailRow icon="call-outline" text={place.telefono} />

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
            <Ionicons
              name="call-outline"
              size={18}
              color={colors.lavender[700]}
            />
          }
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
        >
          Cómo llegar
        </Button>
      </View>
    </View>
  );
};

const DetailRow = ({ icon, text }) => (
  <View style={styles.detailRow}>
    <Ionicons name={icon} size={16} color={colors.lavender[500]} />
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
    borderColor: colors.lavender[100],
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lavender[100],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: borderWidth.thin,
    borderColor: colors.lavender[200],
  },
  titleContainer: {
    flex: 1,
    gap: spacing.xxs,
  },
  typeBadge: {
    backgroundColor: colors.lavender[100],
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
    borderTopColor: colors.lavender[100],
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
