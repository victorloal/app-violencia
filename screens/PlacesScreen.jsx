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
import { colors } from "../thema/colors";
import MainLayout from "../components/Layout/MainLayout";
import AppText from "../components/UI/AppText";
import StyledButton from "../components/UI/Button";
import { Ionicons } from "@expo/vector-icons";

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
    icon: "woman",
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
    icon: "home",
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
    icon: "shield-checkmark",
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
    icon: "people",
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
    icon: "scale",
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
    icon: "alert-circle",
  },
  {
    id: "e-7",
    nombre: "Defensa Civil",
    numero: "144",
    horario: "24 horas",
    descripcion: "Gestión de desastres y emergencias civiles.",
    tipo: "emergencia",
    prioridad: false,
    icon: "construct",
  },
  {
    id: "e-8",
    nombre: "Cruz Roja",
    numero: "132",
    horario: "24 horas",
    descripcion: "Atención médica y emergencias humanitarias.",
    tipo: "emergencia",
    prioridad: false,
    icon: "medkit",
  },
  {
    id: "e-9",
    nombre: "Bomberos",
    numero: "119",
    horario: "24 horas",
    descripcion: "Atención de incendios y emergencias.",
    tipo: "emergencia",
    prioridad: false,
    icon: "flame",
  },
  {
    id: "e-10",
    nombre: "Línea Amiga – Salud Mental",
    numero: "106",
    horario: "24 horas",
    descripcion: "Apoyo psicológico en crisis y prevención del suicidio.",
    tipo: "emergencia",
    prioridad: false,
    icon: "heart",
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
      return "medical";
    case "proteccion":
      return "shield";
    case "legal":
      return "scale";
    case "psicologico":
      return "heart";
    case "emergencia":
      return "alert-circle";
    default:
      return "location";
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
            name={place.icon || "call"}
            size={22}
            color={
              place.prioridad ? colors.lavender[700] : colors.lavender[600]
            }
          />
        </View>
        <View style={styles.emergencyTopText}>
          <AppText
            style={[
              styles.emergencyName,
              place.prioridad && styles.emergencyNamePriority,
            ]}
          >
            {place.nombre}
          </AppText>
          <AppText
            style={[
              styles.emergencyDesc,
              place.prioridad && styles.emergencyDescPriority,
            ]}
          >
            {place.descripcion}
          </AppText>
        </View>
      </View>

      {/* Divisor */}
      <View
        style={[
          styles.emergencyDivider,
          place.prioridad && styles.emergencyDividerPriority,
        ]}
      />

      {/* Fila inferior: número grande + botón llamar */}
      <View style={styles.emergencyBottom}>
        <AppText
          style={[
            styles.emergencyNumber,
            place.prioridad && styles.emergencyNumberPriority,
          ]}
        >
          {place.numero}
        </AppText>
        <View
          style={[styles.callPill, place.prioridad && styles.callPillPriority]}
        >
          <Ionicons
            name="call"
            size={16}
            color={place.prioridad ? colors.white : colors.lavender[700]}
          />
          <AppText
            style={[
              styles.callPillText,
              place.prioridad && styles.callPillTextPriority,
            ]}
          >
            Llamar ahora
          </AppText>
        </View>
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
          <AppText style={styles.placeName}>{place.nombre}</AppText>
          <View style={styles.placeTypePill}>
            <AppText style={styles.placeTypeText}>
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
          <AppText style={styles.detailText}>{place.horario}</AppText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color={colors.lavender[500]}
          />
          <AppText style={styles.detailText}>{place.direccion}</AppText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="call-outline"
            size={16}
            color={colors.lavender[500]}
          />
          <AppText style={styles.detailText}>{place.telefono}</AppText>
        </View>
        <View style={styles.descriptionBox}>
          <AppText style={styles.descriptionText}>{place.descripcion}</AppText>
        </View>
      </View>

      <View style={styles.placeActions}>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => Linking.openURL(`tel:${place.telefono}`)}
        >
          <Ionicons name="call" size={18} color={colors.lavender[700]} />
          <AppText style={styles.callButtonText}>Llamar</AppText>
        </TouchableOpacity>
        <StyledButton
          title="Cómo llegar"
          size="small"
          tone="dark"
          onPress={() => onMaps(place.latitud, place.longitud, place.direccion)}
          icon={<Ionicons name="map" size={16} color={colors.white} />}
          iconPosition="left"
        />
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
          <AppText style={styles.headerTitle}>{getTitleByType(tipo)}</AppText>
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
                  style={[
                    styles.filterText,
                    tipo === tf && styles.filterTextActive,
                  ]}
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
              <AppText style={styles.backToServicesText}>
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
                <AppText style={styles.sectionHeaderText}>
                  Violencia de género
                </AppText>
              </View>
              <View style={styles.sectionHeaderLine} />
            </View>

            {priorityList.map((p) => (
              <EmergencyCard key={p.id} place={p} />
            ))}

            {/* Sección general */}
            <View style={[styles.sectionHeader, { marginTop: 8 }]}>
              <View style={styles.sectionHeaderLine} />
              <View style={styles.sectionHeaderLabel}>
                <Ionicons name="call" size={16} color={colors.lavender[500]} />
                <AppText
                  style={[
                    styles.sectionHeaderText,
                    { color: colors.lavender[500] },
                  ]}
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
          <Ionicons name="help-buoy" size={20} color={colors.lavender[600]} />
          <AppText style={styles.helpText}>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.lavender[800],
  },
  placeholder: { width: 40 },

  // Filtros
  filtersBar: {
    backgroundColor: colors.white,
    paddingVertical: 10,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[50],
    paddingHorizontal: 14,
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
    fontSize: 14,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: "600",
  },

  // Lista
  listContainer: {
    padding: 16,
    gap: 12,
  },
  backToServicesButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[100],
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    marginBottom: 4,
  },
  backToServicesText: {
    color: colors.lavender[800],
    fontSize: 15,
  },

  // Separador de sección
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 6,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lavender[200],
  },
  sectionHeaderLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.lavender[100],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.lavender[700],
  },

  // ── Tarjeta de emergencia ─────────────────────────────────────
  emergencyCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    gap: 14,
    shadowColor: colors.lavender[900],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: colors.lavender[100],
  },
  emergencyCardPriority: {
    backgroundColor: colors.lavender[50],
    borderColor: colors.lavender[300],
    borderWidth: 1.5,
  },

  // Fila superior
  emergencyTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  emergencyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
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
    gap: 4,
  },
  emergencyName: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.lavender[900],
    lineHeight: 22,
  },
  emergencyNamePriority: {
    color: colors.lavender[900],
    fontSize: 18,
  },
  emergencyDesc: {
    fontSize: 13,
    color: colors.lavender[500],
    lineHeight: 18,
  },
  emergencyDescPriority: {
    color: colors.lavender[700],
  },

  // Divisor
  emergencyDivider: {
    height: 1,
    backgroundColor: colors.lavender[100],
  },
  emergencyDividerPriority: {
    backgroundColor: colors.lavender[200],
  },

  // Fila inferior: número + botón
  emergencyBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emergencyNumber: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.lavender[700],
    letterSpacing: -1,
  },
  emergencyNumberPriority: {
    fontSize: 42,
    color: colors.lavender[800],
  },
  callPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.lavender[100],
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.lavender[300],
  },
  callPillPriority: {
    backgroundColor: colors.lavender[700],
    borderColor: colors.lavender[700],
  },
  callPillText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.lavender[700],
  },
  callPillTextPriority: {
    color: colors.white,
  },

  // ── Tarjeta lugar normal ──────────────────────────────────────
  placeCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.lavender[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  placeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  placeIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.lavender[100],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.lavender[200],
  },
  placeTitleContainer: { flex: 1, gap: 4 },
  placeName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.lavender[900],
  },
  placeTypePill: {
    backgroundColor: colors.lavender[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  placeTypeText: { fontSize: 11, color: colors.lavender[600] },

  placeDetails: { gap: 8, marginBottom: 14 },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  detailText: { flex: 1, fontSize: 14, color: colors.lavender[800] },
  descriptionBox: {
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[100],
  },
  descriptionText: {
    color: colors.lavender[500],
    fontStyle: "italic",
    fontSize: 13,
    lineHeight: 18,
  },

  placeActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  callButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lavender[100],
    paddingVertical: 11,
    borderRadius: 25,
    gap: 6,
    borderWidth: 1.5,
    borderColor: colors.lavender[300],
  },
  callButtonText: {
    color: colors.lavender[700],
    fontWeight: "700",
    fontSize: 15,
  },

  // Pie
  helpMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lavender[100],
    marginHorizontal: 16,
    marginBottom: 24,
    marginTop: 4,
    padding: 14,
    borderRadius: 12,
    gap: 10,
  },
  helpText: {
    color: colors.lavender[800],
    fontSize: 14,
    flex: 1,
  },
});
