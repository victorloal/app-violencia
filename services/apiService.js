import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// ── URL del backend ────────────────────────────────────────────────────────────
// Cambia por tu IP
const BASE_URL = "http://192.168.1.6:3000/api";
export const API_URL = BASE_URL;

// ── Device ID persistente y anónimo ──────────────────────────────
export async function getDeviceId() {
  try {
    let id = await AsyncStorage.getItem("perla_device_id");
    if (!id) {
      id = `${Platform.OS}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      await AsyncStorage.setItem("perla_device_id", id);
    }
    return id;
  } catch {
    return `${Platform.OS}-fallback-${Date.now()}`;
  }
}

// ── Fetch helper ─────────────────────────────────────────────────
async function apiFetch(endpoint, options = {}, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
    const data = await res.json();
    if (!res.ok) {
      console.warn(`[API ${endpoint}] ${res.status}:`, data);
      return null;
    }
    return data;
  } catch (err) {
    console.warn(`[API ${endpoint}] Error de red:`, err.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ── 1. Enviar perfil — FormScreen ─────────────────────────────────
// Normaliza los valores que vienen del formulario a los que espera el backend
export async function enviarPerfil(formData) {
  const dispositivo_id = await getDeviceId();

  const edadMap = {
    "Menor de edad (menos de 18)": "menor",
    "Joven (18 - 28)": "joven",
     "joven":          "joven",
    "Adulto (29 - 59)": "adulto",
    "adulto":           "adulto",
    "Adulto mayor (60+)": "adulto_mayor",
    "adulto_mayor":       "adulto_mayor",
  };

  const laboralMap = {
    "Empleada":      "Empleado",
    "empleado":      "Empleado",
    "Sin empleo":    "Desempleado",
    "sin_empleo":    "Desempleado",
    "Estudiante":    "Estudiante",
    "estudiante":    "Estudiante",
    "Independiente": "Independiente",
    "independiente": "Independiente",
  };
 
  const regionMap = {
    "tumaco":       "Tumaco",
    "buenaventura": "Buenaventura",
  };
 
  const zonaMap = {
    "rural":  "Rural",
    "urbana": "Urbana",
  };

  return apiFetch("/perfiles", {
    method: "POST",
    body: JSON.stringify({
      region:        regionMap[formData.region]  || formData.region,
      zona:          zonaMap[formData.zona]       || formData.zona,
      etnia:         formData.etnia,
      edad:          edadMap[formData.edad]       || formData.edad,
      laboral:       laboralMap[formData.laboral] || formData.laboral,
      dispositivo_id,
      plataforma: Platform.OS,
    }),
  });
}

// ── 2. Registrar tipo de violencia visto — HomeScreen/carrusel ────
export async function registrarViolenciaVista(tipoViolencia) {
  const dispositivo_id = await getDeviceId();
  return apiFetch("/violencias", {
    method: "POST",
    body: JSON.stringify({
      tipo_violencia: tipoViolencia,
      dispositivo_id,
      plataforma: Platform.OS,
    }),
  });
}

// ── 3. Enviar solicitud de ayuda — ServicesScreen ─────────────────
export async function enviarSolicitud(formData, lugarRedirigido) {
  const dispositivo_id = await getDeviceId();
  return apiFetch("/solicitudes", {
    method: "POST",
    body: JSON.stringify({
      atencion_medica:     formData.atencion_medica     || "No",
      denuncia:            formData.denuncia            || "No",
      agresor:             formData.agresor             || "No",
      amenaza_hijos:       formData.amenaza_hijos       || "No",
      derechos_vulnerados: formData.derechos_vulnerados || "No",
      lugar_redirigido:    lugarRedirigido              || "otro",
      dispositivo_id,
      plataforma: Platform.OS,
    }),
  });
}

// ── 4. Registrar evento de uso (silencioso) ───────────────────────
export async function registrarEvento(evento, detalle = null, pantalla = null) {
  const dispositivo_id = await getDeviceId();
  return apiFetch("/estadisticas", {
    method: "POST",
    body: JSON.stringify({
      evento,
      detalle,
      pantalla,
      dispositivo_id,
      plataforma: Platform.OS,
    }),
  });
}
