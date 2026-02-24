// screens/PlaceScreen.jsx
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { colors } from "../thema/colors";
import MainLayout from "../components/Layout/MainLayout";
import AppText from "../components/UI/AppText";
import StyledButton from "../components/UI/StyledButton";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Datos de prueba para diferentes tipos de lugares
const placesData = {
  salud: [
    {
      id: "1",
      nombre: "Hospital General",
      horario: "24 horas",
      direccion: "Av. Principal #123, Centro",
      telefono: "+52 555 123 4567",
      latitud: 19.4326,
      longitud: -99.1332,
      tipo: "salud",
      descripcion: "Atención médica de emergencia 24/7",
    },
    {
      id: "2",
      nombre: "Clínica de Especialidades",
      horario: "Lun-Vie 8:00-20:00, Sáb 9:00-14:00",
      direccion: "Calle Reforma #456, Colonia Juárez",
      telefono: "+52 555 987 6543",
      latitud: 19.4285,
      longitud: -99.1276,
      tipo: "salud",
      descripcion: "Atención psicológica y médica",
    },
  ],
  proteccion: [
    {
      id: "3",
      nombre: "Centro de Atención a Víctimas",
      horario: "24 horas",
      direccion: "Boulevard Independencia #789, Zona Rosa",
      telefono: "+52 555 246 8135",
      latitud: 19.4354,
      longitud: -99.1412,
      tipo: "proteccion",
      descripcion: "Atención y protección a víctimas de violencia",
    },
    {
      id: "4",
      nombre: "Refugio Temporal",
      horario: "24 horas",
      direccion: "Av. Insurgentes #1010, Del Valle",
      telefono: "+52 555 369 2580",
      latitud: 19.3936,
      longitud: -99.1733,
      tipo: "proteccion",
      descripcion: "Refugio seguro para mujeres y niños",
    },
  ],
  legal: [
    {
      id: "5",
      nombre: "Bufete Jurídico Gratuito",
      horario: "Lun-Vie 9:00-18:00",
      direccion: "Calle de la Ley #234, San Rafael",
      telefono: "+52 555 147 2589",
      latitud: 19.4412,
      longitud: -99.1524,
      tipo: "legal",
      descripcion: "Asesoría legal gratuita",
    },
    {
      id: "6",
      nombre: "Ministerio Público",
      horario: "24 horas",
      direccion: "Av. Universidad #567, Narvarte",
      telefono: "+52 555 753 9512",
      latitud: 19.3857,
      longitud: -99.1648,
      tipo: "legal",
      descripcion: "Atención para denuncias",
    },
  ],
  psicologico: [
    {
      id: "7",
      nombre: "Centro de Apoyo Psicológico",
      horario: "Lun-Vie 8:00-20:00, Sáb 9:00-14:00",
      direccion: "Calle Durango #345, Roma Norte",
      telefono: "+52 555 951 7532",
      latitud: 19.4176,
      longitud: -99.1685,
      tipo: "psicologico",
      descripcion: "Atención psicológica especializada",
    },
    {
      id: "8",
      nombre: "Línea de Crisis",
      horario: "24 horas",
      direccion: "Av. Chapultepec #678, Juárez",
      telefono: "+52 555 852 9631",
      latitud: 19.4257,
      longitud: -99.1578,
      tipo: "psicologico",
      descripcion: "Atención en crisis emocional",
    },
  ],
};

export default function PlaceScreen({ route, navigation }) {
  const { tipo = "salud" } = route.params || {}; // Tipo de lugar a mostrar

  const openMaps = (latitud, longitud, direccion) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${direccion}`,
      android: `geo:0,0?q=${latitud},${longitud}(${direccion})`,
    });

    Linking.openURL(url).catch(() => {
      // Fallback a Google Maps web
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`,
      );
    });
  };

  const getIconByType = (tipo) => {
    switch (tipo) {
      case "salud":
        return "medical";
      case "proteccion":
        return "shield";
      case "legal":
        return "scale";
      case "psicologico":
        return "heart";
      default:
        return "location";
    }
  };

  const getTitleByType = (tipo) => {
    switch (tipo) {
      case "salud":
        return "Centros de Salud";
      case "proteccion":
        return "Centros de Protección";
      case "legal":
        return "Asesoría Legal";
      case "psicologico":
        return "Apoyo Psicológico";
      default:
        return "Lugares de Ayuda";
    }
  };

  const places = placesData[tipo] || placesData.salud;

  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.lavender[700]}
            />
          </TouchableOpacity>
          <AppText variant="title" style={styles.title}>
            {getTitleByType(tipo)}
          </AppText>
          <View style={styles.placeholder} />
        </View>

        {/* Filtros rápidos */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {["salud", "proteccion", "legal", "psicologico"].map((tipoFiltro) => (
            <TouchableOpacity
              key={tipoFiltro}
              style={[
                styles.filterChip,
                tipo === tipoFiltro && styles.filterChipActive,
              ]}
              onPress={() => navigation.setParams({ tipo: tipoFiltro })}
            >
              <Ionicons
                name={getIconByType(tipoFiltro)}
                size={18}
                color={
                  tipo === tipoFiltro ? colors.white : colors.lavender[700]
                }
              />
              <AppText
                variant="small"
                style={[
                  styles.filterText,
                  tipo === tipoFiltro && styles.filterTextActive,
                ]}
              >
                {tipoFiltro.charAt(0).toUpperCase() + tipoFiltro.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de lugares */}
        <View style={styles.placesList}>
          {places.map((place) => (
            <View key={place.id} style={styles.placeCard}>
              <View style={styles.placeHeader}>
                <View style={styles.placeIcon}>
                  <Ionicons
                    name={getIconByType(place.tipo)}
                    size={24}
                    color={colors.lavender[700]}
                  />
                </View>
                <View style={styles.placeTitleContainer}>
                  <AppText variant="subtitle" style={styles.placeName}>
                    {place.nombre}
                  </AppText>
                  <View style={styles.placeType}>
                    <AppText variant="small" style={styles.placeTypeText}>
                      {place.tipo.charAt(0).toUpperCase() + place.tipo.slice(1)}
                    </AppText>
                  </View>
                </View>
              </View>

              <View style={styles.placeDetails}>
                <View style={styles.detailRow}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={colors.lavender[600]}
                  />
                  <AppText variant="body" style={styles.detailText}>
                    {place.horario}
                  </AppText>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={colors.lavender[600]}
                  />
                  <AppText variant="body" style={styles.detailText}>
                    {place.direccion}
                  </AppText>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color={colors.lavender[600]}
                  />
                  <AppText variant="body" style={styles.detailText}>
                    {place.telefono}
                  </AppText>
                </View>

                <View style={styles.descriptionContainer}>
                  <AppText variant="small" style={styles.description}>
                    {place.descripcion}
                  </AppText>
                </View>
              </View>

              <View style={styles.placeActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => Linking.openURL(`tel:${place.telefono}`)}
                >
                  <Ionicons
                    name="call"
                    size={20}
                    color={colors.lavender[700]}
                  />
                  <AppText variant="small" style={styles.actionText}>
                    Llamar
                  </AppText>
                </TouchableOpacity>

                <StyledButton
                  title="Cómo llegar"
                  size="small"
                  tone="dark"
                  onPress={() =>
                    openMaps(place.latitud, place.longitud, place.direccion)
                  }
                  icon={<Ionicons name="map" size={18} color={colors.white} />}
                  iconPosition="left"
                />
              </View>
            </View>
          ))}
        </View>

        {/* Mensaje de ayuda */}
        <View style={styles.helpMessage}>
          <Ionicons name="help-buoy" size={24} color={colors.lavender[600]} />
          <AppText variant="body" style={styles.helpText}>
            Si necesitas ayuda inmediata, llama al 911
          </AppText>
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender[50],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.lavender[50],
  },
  title: {
    fontSize: 20,
    color: colors.lavender[800],
  },
  placeholder: {
    width: 40,
  },
  filtersContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[50],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  filterChipActive: {
    backgroundColor: colors.lavender[600],
    borderColor: colors.lavender[600],
  },
  filterText: {
    color: colors.lavender[700],
  },
  filterTextActive: {
    color: colors.white,
  },
  placesList: {
    padding: 20,
    gap: 16,
  },
  placeCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.lavender[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  placeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lavender[50],
    justifyContent: "center",
    alignItems: "center",
  },
  placeTitleContainer: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    marginBottom: 4,
    color: colors.lavender[900],
  },
  placeType: {
    backgroundColor: colors.lavender[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  placeTypeText: {
    fontSize: 10,
    color: colors.lavender[700],
  },
  placeDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: colors.lavender[800],
  },
  descriptionContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[100],
  },
  description: {
    color: colors.lavender[600],
    fontStyle: "italic",
  },
  placeActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[50],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  actionText: {
    color: colors.lavender[700],
  },
  helpMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lavender[100],
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  helpText: {
    color: colors.lavender[800],
    fontSize: 14,
  },
});
