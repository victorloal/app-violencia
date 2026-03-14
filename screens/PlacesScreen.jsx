// screens/PlaceScreen.jsx
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MainLayout from "../components/Layout/MainLayout";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import { colors } from "../thema/colors";
import { spacing, borderRadius, borderWidth, shadow } from "../styles/tokens";

// ── Números de emergencia ───────────────────────────────────────
const emergencyNumbers = [
  {
    id: "e-1",
    nombre: "Línea de Mujeres",
    numero: "155",
    horario: "24 horas",
    descripcion: "Atención especializada a víctimas de violencia de género.",
    tipo: "emergencia",
    prioridad: true,
    icon: "woman-outline",
  },
  {
    id: "e-2",
    nombre: "Línea Violencia Intrafamiliar",
    numero: "141",
    horario: "24 horas",
    descripcion:
      "Orientación y activación de rutas de atención en violencia intrafamiliar.",
    tipo: "emergencia",
    prioridad: true,
    icon: "home-outline",
  },
  {
    id: "e-4",
    nombre: "Policía Infancia y Adolescencia",
    numero: "145",
    horario: "24 horas",
    descripcion:
      "Protección policial para menores en situación de riesgo o abuso.",
    tipo: "emergencia",
    prioridad: false,
    icon: "shield-checkmark-outline",
  },
  {
    id: "e-3",
    nombre: "ICBF – Bienestar Familiar",
    numero: "018000918080",
    horario: "24 horas",
    descripcion:
      "Protección de niñas, niños y adolescentes víctimas de violencia.",
    tipo: "emergencia",
    prioridad: true,
    icon: "people-outline",
  },
  {
    id: "e-5",
    nombre: "Fiscalía General",
    numero: "122",
    horario: "24 horas",
    descripcion:
      "Denuncia de delitos, incluidos los de violencia sexual y de género.",
    tipo: "emergencia",
    prioridad: false,
    icon: "scale-outline",
  },
  {
    id: "e-6",
    nombre: "Emergencias Policía",
    numero: "123",
    horario: "24 horas",
    descripcion:
      "Atención inmediata ante crímenes, amenazas o peligro inminente.",
    tipo: "emergencia",
    prioridad: false,
    icon: "alert-circle-outline",
  },
  {
    id: "e-7",
    nombre: "Defensa Civil",
    numero: "144",
    horario: "24 horas",
    descripcion: "Gestión de desastres y emergencias civiles.",
    tipo: "emergencia",
    prioridad: false,
    icon: "construct-outline",
  },
  {
    id: "e-8",
    nombre: "Cruz Roja",
    numero: "132",
    horario: "24 horas",
    descripcion: "Atención médica y emergencias humanitarias.",
    tipo: "emergencia",
    prioridad: false,
    icon: "medkit-outline",
  },
  {
    id: "e-9",
    nombre: "Bomberos",
    numero: "119",
    horario: "24 horas",
    descripcion: "Atención de incendios y emergencias.",
    tipo: "emergencia",
    prioridad: false,
    icon: "flame-outline",
  },
  {
    id: "e-10",
    nombre: "Línea Amiga – Salud Mental",
    numero: "106",
    horario: "24 horas",
    descripcion: "Apoyo psicológico en crisis y prevención del suicidio.",
    tipo: "emergencia",
    prioridad: false,
    icon: "heart-outline",
  },
];

// ── Lugares por categoría ───────────────────────────────────────
const placesData = {
  salud: [
    {
      id: "1",
      nombre: "Hospital General",
      horario: "24 horas",
      direccion: "Av. Principal #123, Centro",
      telefono: "+57 1 555 1234",
      latitud: 19.4326,
      longitud: -99.1332,
      tipo: "salud",
      descripcion: "Atención médica de emergencia 24/7",
    },
    {
      id: "2",
      nombre: "Clínica de Especialidades",
      horario: "Lun-Vie 8:00-20:00",
      direccion: "Calle Reforma #456",
      telefono: "+57 1 555 9876",
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
      direccion: "Boulevard Independencia #789",
      telefono: "+57 1 555 2468",
      latitud: 19.4354,
      longitud: -99.1412,
      tipo: "proteccion",
      descripcion: "Atención y protección a víctimas de violencia",
    },
    {
      id: "4",
      nombre: "Refugio Temporal",
      horario: "24 horas",
      direccion: "Av. Insurgentes #1010",
      telefono: "+57 1 555 3692",
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
      direccion: "Calle de la Ley #234",
      telefono: "+57 1 555 1472",
      latitud: 19.4412,
      longitud: -99.1524,
      tipo: "legal",
      descripcion: "Asesoría legal gratuita",
    },
    {
      id: "6",
      nombre: "Ministerio Público",
      horario: "24 horas",
      direccion: "Av. Universidad #567",
      telefono: "+57 1 555 7539",
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
      horario: "Lun-Vie 8:00-20:00",
      direccion: "Calle Durango #345",
      telefono: "+57 1 555 9517",
      latitud: 19.4176,
      longitud: -99.1685,
      tipo: "psicologico",
      descripcion: "Atención psicológica especializada",
    },
    {
      id: "8",
      nombre: "Línea de Crisis",
      horario: "24 horas",
      direccion: "Av. Chapultepec #678",
      telefono: "+57 1 555 8529",
      latitud: 19.4257,
      longitud: -99.1578,
      tipo: "psicologico",
      descripcion: "Atención en crisis emocional",
    },
  ],
};

const getIconByType = (t) => {
  switch (t) {
    case "salud":
      return "medkit-outline";
    case "proteccion":
      return "shield-outline";
    case "legal":
      return "scale-outline";
    case "psicologico":
      return "heart-outline";
    case "emergencia":
      return "alert-circle-outline";
    default:
      return "location-outline";
  }
};

const getTitleByType = (t) => {
  switch (t) {
    case "salud":
      return "Centros de Salud";
    case "proteccion":
      return "Centros de Protección";
    case "legal":
      return "Asesoría Legal";
    case "psicologico":
      return "Apoyo Psicológico";
    case "emergencia":
      return "Números de Emergencia";
    default:
      return "Lugares de Ayuda";
  }
};

// ── Tarjeta de emergencia rediseñada ───────────────────────────
function EmergencyCard({ place }) {
  return (
    <TouchableOpacity
      style={[
        styles.emergencyCard,
        place.prioridad && styles.emergencyCardPriority,
      ]}
      onPress={() => Linking.openURL(`tel:${place.numero}`)}
      activeOpacity={0.8}
    >
      {/* Fila superior: icono + nombre + horario */}
      <View style={styles.emergencyTop}>
        <View
          style={[
            styles.emergencyIconBox,
            place.prioridad && styles.emergencyIconBoxPriority,
          ]}
        >
          <Ionicons
            name={place.icon || "call-outline"}
            size={22}
            color={
              place.prioridad ? colors.lavender[700] : colors.lavender[600]
            }
          />
        </View>
        <View style={styles.emergencyTopText}>
          <AppText
            variant="h4"
            color={place.prioridad ? "primary" : "secondary"}
            style={place.prioridad && styles.emergencyNamePriority}
          >
            {place.nombre}
          </AppText>
          <AppText variant="caption" color="tertiary">
            {place.descripcion}
          </AppText>
        </View>
      </View>

      {/* Divisor */}
      <View style={styles.emergencyDivider} />

      {/* Fila inferior: número grande + botón llamar */}
      <View style={styles.emergencyBottom}>
        <AppText
          variant="h1"
          color={place.prioridad ? "primary" : "secondary"}
          style={styles.emergencyNumber}
        >
          {place.numero}
        </AppText>
        <Button
          type={place.prioridad ? "primary" : "primaryGhost"}
          variant="pill"
          size="small"
          onPress={() => Linking.openURL(`tel:${place.numero}`)}
          iconLeft={<Ionicons name="call" size={16} color={colors.white} />}
        >
          Llamar ahora
        </Button>
      </View>
    </TouchableOpacity>
  );
}

// ── Tarjeta de lugar normal ─────────────────────────────────────
function PlaceCard({ place, onMaps }) {
  return (
    <View style={styles.placeCard}>
      <View style={styles.placeHeader}>
        <View style={styles.placeIconBox}>
          <Ionicons
            name={getIconByType(place.tipo)}
            size={24}
            color={colors.lavender[700]}
          />
        </View>
        <View style={styles.placeTitleContainer}>
          <AppText variant="h4" color="primary">
            {place.nombre}
          </AppText>
          <View style={styles.placeTypePill}>
            <AppText variant="caption" color="secondary">
              {place.tipo.charAt(0).toUpperCase() + place.tipo.slice(1)}
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.placeDetails}>
        <View style={styles.detailRow}>
          <Ionicons
            name="time-outline"
            size={16}
            color={colors.lavender[500]}
          />
          <AppText variant="body" color="secondary">
            {place.horario}
          </AppText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color={colors.lavender[500]}
          />
          <AppText variant="body" color="secondary">
            {place.direccion}
          </AppText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="call-outline"
            size={16}
            color={colors.lavender[500]}
          />
          <AppText variant="body" color="secondary">
            {place.telefono}
          </AppText>
        </View>
        <View style={styles.descriptionBox}>
          <AppText
            variant="body"
            color="tertiary"
            style={styles.descriptionText}
          >
            {place.descripcion}
          </AppText>
        </View>
      </View>

      <View style={styles.placeActions}>
        <Button
          type="primaryGhost"
          variant="pill"
          size="flex"
          onPress={() => Linking.openURL(`tel:${place.telefono}`)}
          iconLeft={
            <Ionicons name="call" size={18} color={colors.lavender[700]} />
          }
        >
          Llamar
        </Button>
        <Button
          type="primary"
          variant="pill"
          size="flex"
          onPress={() => onMaps(place.latitud, place.longitud, place.direccion)}
          iconLeft={<Ionicons name="map" size={18} color={colors.white} />}
        >
          Cómo llegar
        </Button>
      </View>
    </View>
  );
}

// ── Screen principal ────────────────────────────────────────────
export default function PlaceScreen({ route, navigation }) {
  const { tipo = "salud" } = route.params || {};

  const openMaps = (lat, lng, dir) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${dir}`,
      android: `geo:0,0?q=${lat},${lng}(${dir})`,
    });
    Linking.openURL(url).catch(() =>
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      ),
    );
  };

  const isEmergency = tipo === "emergencia";
  const priorityList = emergencyNumbers.filter((p) => p.prioridad);
  const generalList = emergencyNumbers.filter((p) => !p.prioridad);
  const placesList = placesData[tipo] || placesData.salud;

  return (
    <MainLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
          <AppText variant="h2" style={styles.headerTitle}>
            {getTitleByType(tipo)}
          </AppText>
          <View style={styles.placeholder} />
        </View>

        {/* Filtros — solo si NO es emergencia */}
        {!isEmergency && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersBar}
            contentContainerStyle={styles.filtersContent}
          >
            {["salud", "proteccion", "legal", "psicologico"].map((tf) => (
              <TouchableOpacity
                key={tf}
                style={[
                  styles.filterChip,
                  tipo === tf && styles.filterChipActive,
                ]}
                onPress={() => navigation.setParams({ tipo: tf })}
              >
                <Ionicons
                  name={getIconByType(tf)}
                  size={16}
                  color={tipo === tf ? colors.white : colors.lavender[700]}
                />
                <AppText
                  variant="caption"
                  color={tipo === tf ? "light" : "secondary"}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* ── Vista EMERGENCIA ── */}
        {isEmergency && (
          <View style={styles.listContainer}>
            {/* Volver */}
            <TouchableOpacity
              style={styles.backToServicesButton}
              onPress={() => navigation.setParams({ tipo: "salud" })}
            >
              <Ionicons
                name="arrow-back"
                size={18}
                color={colors.lavender[700]}
              />
              <AppText variant="body" color="primary">
                Volver a servicios
              </AppText>
            </TouchableOpacity>

            {/* Sección prioritaria VBG */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLine} />
              <View style={styles.sectionHeaderLabel}>
                <Ionicons
                  name="ribbon"
                  size={16}
                  color={colors.lavender[700]}
                />
                <AppText
                  variant="caption"
                  color="primary"
                  style={styles.sectionHeaderText}
                >
                  Violencia de género
                </AppText>
              </View>
              <View style={styles.sectionHeaderLine} />
            </View>

            {priorityList.map((p) => (
              <EmergencyCard key={p.id} place={p} />
            ))}

            {/* Sección general */}
            <View style={[styles.sectionHeader, { marginTop: spacing.sm }]}>
              <View style={styles.sectionHeaderLine} />
              <View style={styles.sectionHeaderLabel}>
                <Ionicons
                  name="call-outline"
                  size={16}
                  color={colors.lavender[500]}
                />
                <AppText
                  variant="caption"
                  color="secondary"
                  style={styles.sectionHeaderText}
                >
                  Otras emergencias
                </AppText>
              </View>
              <View style={styles.sectionHeaderLine} />
            </View>

            {generalList.map((p) => (
              <EmergencyCard key={p.id} place={p} />
            ))}
          </View>
        )}

        {/* ── Vista LUGARES ── */}
        {!isEmergency && (
          <View style={styles.listContainer}>
            {placesList.map((p) => (
              <PlaceCard key={p.id} place={p} onMaps={openMaps} />
            ))}
          </View>
        )}

        {/* Pie */}
        <View style={styles.helpMessage}>
          <Ionicons
            name="help-buoy-outline"
            size={20}
            color={colors.lavender[600]}
          />
          <AppText variant="body" color="secondary" style={styles.helpText}>
            Si necesitas ayuda inmediata, llama al 155 o al 123
          </AppText>
        </View>
      </ScrollView>
    </MainLayout>
  );
}

// ── Estilos ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender[50],
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth.thin,
    borderBottomColor: colors.lavender[100],
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.lavender[50],
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: colors.lavender[800],
  },
  placeholder: { width: 40 },

  // Filtros
  filtersBar: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    gap: spacing.xs,
    borderWidth: borderWidth.thin,
    borderColor: colors.lavender[200],
  },
  filterChipActive: {
    backgroundColor: colors.lavender[600],
    borderColor: colors.lavender[600],
  },

  // Lista
  listContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  backToServicesButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    marginBottom: spacing.xxs,
  },

  // Separador de sección
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lavender[200],
  },
  sectionHeaderLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.lavender[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.pill,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: "600",
  },

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
  emergencyCardPriority: {
    backgroundColor: colors.lavender[50],
    borderColor: colors.lavender[300],
    borderWidth: borderWidth.normal,
  },

  // Fila superior
  emergencyTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  emergencyIconBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lavender[100],
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  emergencyIconBoxPriority: {
    backgroundColor: colors.lavender[200],
  },
  emergencyTopText: {
    flex: 1,
    gap: spacing.xxs,
  },
  emergencyNamePriority: {
    fontSize: 18,
  },

  // Divisor
  emergencyDivider: {
    height: 1,
    backgroundColor: colors.lavender[100],
  },

  // Fila inferior
  emergencyBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emergencyNumber: {
    fontSize: 38,
    letterSpacing: -1,
  },

  // ── Tarjeta lugar normal ──────────────────────────────────────
  placeCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadow.sm,
    borderWidth: borderWidth.thin,
    borderColor: colors.lavender[100],
  },
  placeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  placeIconBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lavender[100],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: borderWidth.thin,
    borderColor: colors.lavender[200],
  },
  placeTitleContainer: {
    flex: 1,
    gap: spacing.xxs,
  },
  placeTypePill: {
    backgroundColor: colors.lavender[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.pill,
    alignSelf: "flex-start",
  },

  placeDetails: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  descriptionBox: {
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: borderWidth.thin,
    borderTopColor: colors.lavender[100],
  },
  descriptionText: {
    fontStyle: "italic",
  },

  placeActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  // Pie
  helpMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[100],
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    marginTop: spacing.xxs,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  helpText: {
    flex: 1,
  },
});
