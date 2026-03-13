import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const BASE_URL = "http://192.168.1.5:3000/api";

async function getDeviceId() {
  let id = await AsyncStorage.getItem("sorora_device_id");
  if (!id) {
    id = `${Platform.OS}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    await AsyncStorage.setItem("sorora_device_id", id);
  }
  return id;
}

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en la petición");
  return data;
}

// Enviar perfil desde FormScreen
export async function enviarPerfil(formData) {
  try {
    const dispositivo_id = await getDeviceId();
    return await apiFetch("/perfiles", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        dispositivo_id,
        plataforma: Platform.OS,
      }),
    });
  } catch (err) {
    console.warn("[API] enviarPerfil falló:", err.message);
    return null;
  }
}

// Enviar reporte desde ServicesScreen
export async function enviarReporte(formData, lugarRedirigido, tipoViolencia) {
  try {
    const dispositivo_id = await getDeviceId();
    return await apiFetch("/reportes", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        lugar_redirigido: lugarRedirigido,
        tipo_violencia:   tipoViolencia || null,
        dispositivo_id,
        plataforma: Platform.OS,
      }),
    });
  } catch (err) {
    console.warn("[API] enviarReporte falló:", err.message);
    return null;
  }
}

// Registrar evento de uso (silencioso)
export async function registrarEvento(evento, detalle = null, pantalla = null) {
  try {
    const dispositivo_id = await getDeviceId();
    await apiFetch("/estadisticas", {
      method: "POST",
      body: JSON.stringify({
        evento, detalle, pantalla,
        dispositivo_id,
        plataforma: Platform.OS,
      }),
    });
  } catch {
    // silencioso
  }
}