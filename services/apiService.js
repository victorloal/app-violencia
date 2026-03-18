import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// 🔧 Cambia por tu IP
const BASE_URL = "http://192.168.1.7:3000/api";

// ── Device ID persistente y anónimo ──────────────────────────────
export async function getDeviceId() {
  try {
    let id = await AsyncStorage.getItem("sorora_device_id");
    if (!id) {
      id = `${Platform.OS}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      await AsyncStorage.setItem("sorora_device_id", id);
    }
    return id;
  } catch {
    return `${Platform.OS}-fallback-${Date.now()}`;
  }
}

// ── Fetch helper ─────────────────────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
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
  }
}

// ── 1. Enviar perfil — FormScreen ─────────────────────────────────
// formData contiene: region, zona, etnia, edad, laboral
export async function enviarPerfil(formData) {
  const dispositivo_id = await getDeviceId();

  // Normalizar edad
  const edadMap = {
    "Menor de edad (menos de 18)": "menor",
    "Joven (18 - 28)":             "joven",
    "Adulto (29 - 59)":            "adulto",
    "Adulto mayor (60+)":          "adulto_mayor",
  };
  const edad = edadMap[formData.edad] || formData.edad;

  return apiFetch("/perfiles", {
    method: "POST",
    body: JSON.stringify({
      region:    formData.region,
      zona:      formData.zona,
      etnia:     formData.etnia,
      edad,
      laboral:   formData.laboral,
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
      atencion_medica:    formData.atencion_medica    || "No",
      apoyo_psicologico:  formData.apoyo_psicologico  || "No",
      denuncia:           formData.denuncia            || "No",
      hablar_con_policia: formData.hablar_con_policia  || "No",
      proteccion:         formData.proteccion          || "No",
      asesoria_legal:     formData.asesoria_legal      || "No",
      apoyo_ninos:        formData.apoyo_ninos         || "No",
      lugar_redirigido:   lugarRedirigido              || "otro",
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