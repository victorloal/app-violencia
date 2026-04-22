// data/emergencyData.js
// ── Los números ahora vienen de la API. ───────────────────────────────────────
// El fallback estático se usa solo si la API no responde.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../services/apiService";

// ── Helper: timeout compatible con React Native / Hermes ──────────────────────
// AbortSignal.timeout() NO existe en Hermes — usamos AbortController manual.
const fetchConTimeout = (url, ms = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal })
    .finally(() => clearTimeout(timer));
};

// ── Fallback estático ─────────────────────────────────────────────────────────
// Se usa SOLO cuando la API no responde.
const FALLBACK = [
  { id:"e-1",  nombre:"Línea de Mujeres",               numero:"155",          horario:"24 horas", prioridad:true,  icono_nombre:"woman-outline"           },
  { id:"e-2",  nombre:"Línea Violencia Intrafamiliar",   numero:"141",          horario:"24 horas", prioridad:true,  icono_nombre:"home-outline"            },
  { id:"e-3",  nombre:"ICBF – Bienestar Familiar",       numero:"018000918080", horario:"24 horas", prioridad:true,  icono_nombre:"people-outline"          },
  { id:"e-4",  nombre:"Policía Infancia y Adolescencia", numero:"145",          horario:"24 horas", prioridad:false, icono_nombre:"shield-checkmark-outline"},
  { id:"e-5",  nombre:"Fiscalía General",                numero:"122",          horario:"24 horas", prioridad:false, icono_nombre:"scale-outline"           },
  { id:"e-6",  nombre:"Emergencias Policía",             numero:"123",          horario:"24 horas", prioridad:false, icono_nombre:"alert-circle-outline"    },
  { id:"e-10", nombre:"Línea Amiga – Salud Mental",      numero:"106",          horario:"24 horas", prioridad:false, icono_nombre:"heart-outline"           },
];

// ── Helpers internos ──────────────────────────────────────────────────────────

// Convierte icono_nombre (string) → función que devuelve un componente Ionicons
const buildIcon = (iconName) =>
  (color) => <Ionicons name={iconName || "alert-circle-outline"} size={22} color={color} />;

// Enriquece cada fila con la función icon compatible con EmergencyCard
const enriquecer = (row) => ({ ...row, icon: buildIcon(row.icono_nombre) });

// ── fetchEmergencyNumbers ─────────────────────────────────────────────────────
// Carga los números desde la API. Si falla, devuelve el fallback estático.
export const fetchEmergencyNumbers = async () => {
  try {
    const res = await fetchConTimeout(`${API_URL}/emergencias`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    if (Array.isArray(rows) && rows.length > 0) {
      return rows.map(enriquecer);
    }
    throw new Error("Respuesta vacía o inválida");
  } catch (err) {
    console.warn("[emergencyData] Usando fallback estático:", err.message);
    return FALLBACK.map(enriquecer);
  }
};

// ── Exportación de compatibilidad síncróna ────────────────────────────────────
// EmergencyScreen usa { emergencyNumbers } como array síncrono mientras
// se migra al hook useEmergencyNumbers para carga dinámica.
// Este array siempre está disponible de inmediato (no depende de la red).
export const emergencyNumbers = FALLBACK.map(enriquecer);