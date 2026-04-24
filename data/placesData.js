// data/placesData.js
// ── Los lugares ahora vienen de la API. ───────────────────────────────────────
//   1. Caché en memoria (misma sesión — instantáneo)
//   2. API (fuente de verdad — incluye cambios del admin)
//   3. AsyncStorage (caché persistente de la última respuesta exitosa de la API)
//   4. FALLBACK_DATA (estático compilado en la app — último recurso)
//
// Cuando el admin agrega/edita lugares o emergencias desde el dashboard,
// la próxima vez que la app tenga red los datos se actualizan y se persisten
// en AsyncStorage, siendo disponibles también sin conexión.
// ─────────────────────────────────────────────────────────────────────────────

import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../services/apiService";
import { getTypeConfig } from "../thema/placesTypes";

const CACHE_KEY_LUGARES = "perla_cache_lugares_v2";
const CACHE_KEY_EMERGENCIAS = "perla_cache_emergencias_v2";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 horas
let _cache = null;
let _isOffline = false;

// ── Helper: timeout compatible con Hermes ───────────────────────
const fetchConTimeout = (url, ms = 3000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() =>
    clearTimeout(timer),
  );
};

// ── AsyncStorage helpers ──────────────────────────────────────────────────────
const guardarEnCache = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch (err) {
    console.warn("[placesData] Error guardando caché:", err.message);
  }
};

const leerDeCache = async (key) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL_MS) return null; // expirado
    return data;
  } catch {
    return null;
  }
};

// ── Fallback estático completo ────────────────────────────────────────────────
// Se usa SOLO cuando la API no responde.
const FALLBACK_DATA = {
  justicia: [
    {
      id: "fiscalia_tumaco",
      ciudad: "Tumaco",
      nombre: "Fiscalía General de la Nación",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-6:00pm",
      direccion: "Avenida de los Estudiantes Edificio Capid",
      telefono: "122\n018000919748",
      tipo: "justicia",
      descripcion:
        "Se encarga de investigar los posibles delitos, proteger a las víctimas y pedir medidas de protección.",
      latitud: 1.8189894663045683,
      longitud: -78.7624061865076,
    },
    {
      id: "fiscalia_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Fiscalía General de la Nación",
      horario: "Lunes a Viernes\n8:00am-12:00m\n1:00pm-5:00pm",
      direccion: "Calle 9 No 2 – 83",
      telefono: "122\n018000919748",
      tipo: "justicia",
      descripcion:
        "Se encarga de investigar los posibles delitos, proteger a las víctimas y pedir medidas de protección.",
      latitud: 3.8916622258165905,
      longitud: -77.07791747116414,
    },
    {
      id: "cti_tumaco",
      ciudad: "Tumaco",
      nombre: "Policía Judicial (CTI, SIJIN, DIJIN)",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "Esquina Avenida Férrea y Calle Mosquera",
      telefono: "3203024362",
      tipo: "justicia",
      descripcion:
        "Apoya a la fiscalía en la investigación de posibles delitos.",
      latitud: 1.8086993080773277,
      longitud: -78.76656535582066,
    },
    {
      id: "cti_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Policía Judicial (CTI, SIJIN, DIJIN)",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "C 19 E N° 6 - 90",
      telefono: "3203046448",
      tipo: "justicia",
      descripcion:
        "Apoya a la fiscalía en la investigación de posibles delitos.",
      latitud: 3.8856077515648635,
      longitud: -77.0599214,
    },
    {
      id: "medicina_legal_tumaco",
      ciudad: "Tumaco",
      nombre: "Instituto Nacional de Medicina Legal y Ciencias Forenses",
      horario: "Lunes a Domingo\n7:00am-7:00pm",
      direccion: "Ciudadela Sector Nuevo Horizonte",
      telefono: "602 8274174\n602 3980041",
      tipo: "justicia",
      descripcion: "Brindar apoyo técnico y científico a la justicia.",
      latitud: 1.7888627283933127,
      longitud: -78.78712048465654,
    },
    {
      id: "medicina_legal_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Policía Judicial - Instituto de Medicina Legal",
      horario: "Lunes a Domingo\n7:00am-7:00pm",
      direccion: "Av. Simón Bolívar No.17-40",
      telefono: "602 8274174\n602 3980041",
      tipo: "justicia",
      descripcion: "Brindar apoyo técnico y científico a la justicia.",
      latitud: 3.881665598582891,
      longitud: -77.06437609444673,
    },
  ],
  protección: [
    {
      id: "comisaria_tumaco",
      ciudad: "Tumaco",
      nombre: "Comisaría de Familia",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-6:00pm",
      direccion: "Alcaldía Municipal de Tumaco, Cl. 11 #9-2",
      telefono: "(572)7276156",
      tipo: "protección",
      descripcion:
        "Establece medidas para proteger a las mujeres víctimas de violencia familiar.",
      latitud: 1.807628096720489,
      longitud: -78.76544270423693,
    },
    {
      id: "comisaria_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Comisaría de Familia",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "Calle 4 sur Cra 73 esquina, Barrio Nueva Granada",
      telefono: "3170820627",
      tipo: "protección",
      descripcion:
        "Establece medidas para proteger a las mujeres víctimas de violencia familiar.",
      latitud: 3.8636936635472394,
      longitud: -76.99349771772933,
    },
    {
      id: "policia_tumaco",
      ciudad: "Tumaco",
      nombre: "Policía Nacional - Tumaco",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "Esquina de la Avenida Férrea y la Calle Mosquera",
      telefono: "3203024362",
      tipo: "protección",
      descripcion: "Protege y ayuda a las víctimas y recibe denuncias.",
      latitud: 1.808786449015912,
      longitud: -78.76618319074454,
    },
    {
      id: "policia_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Policía Nacional - Buenaventura",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "C 19 E N° 6 - 90",
      telefono: "3203024362",
      tipo: "protección",
      descripcion: "Protege y ayuda a las víctimas y recibe denuncias.",
      latitud: 3.8858646516974926,
      longitud: -77.05966390793913,
    },
    {
      id: "icbf_tumaco",
      ciudad: "Tumaco",
      nombre: "Instituto de Bienestar Familiar",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: "Parque Colón, San Andrés de Tumaco",
      telefono: "601 4377630",
      tipo: "protección",
      descripcion: "Ayuda a garantizar la seguridad de los menores de edad.",
      latitud: 1.8067567142886514,
      longitud: -78.76358307116412,
    },
    {
      id: "icbf_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Instituto de Bienestar Familiar",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: "Avenida Simón Bolívar Km 9",
      telefono: "3215744988",
      tipo: "protección",
      descripcion: "Ayuda a garantizar la seguridad de los menores de edad.",
      latitud: 3.880748170538906,
      longitud: -77.01042880304402,
    },
  ],
  ministerio_publico: [
    {
      id: "procuraduria_general_de_nacion_tumaco",
      ciudad: "Tumaco",
      nombre: "Procuraduría General de Nación",
      horario: "Lunes a Viernes\n8:00am-12:00pm\n1:00pm-5:00pm",
      direccion: "Avenida Los Estudiantes, Sector La Y",
      telefono: "(572) 5878750",
      tipo: "ministerio_publico",
      descripcion: "Promueve y defiende los derechos de las mujeres.",
      latitud: 1.8162992212235298,
      longitud: -78.7636289580418,
    },
    {
      id: "procuraduria_general_de_nacion_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Procuraduría General de Nación",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: "Calle 6 # 5 - 11",
      telefono: "3215744988",
      tipo: "ministerio_publico",
      descripcion: "Promueve y defiende los derechos de las mujeres.",
      latitud: 3.889324893936952,
      longitud: -77.07458247952376,
    },
    {
      id: "defensoria_del_pueblo_tumaco",
      ciudad: "Tumaco",
      nombre: "Defensoría del Pueblo",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: "Barrio la Florida La Rada T-35-20 Casa 1",
      telefono: "3223866321",
      tipo: "ministerio_publico",
      descripcion: "Promueve y defiende los derechos de las mujeres.",
      latitud: 1.816355213407996,
      longitud: -78.75348661534346,
    },
    {
      id: "defensoria_del_pueblo_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Defensoría del Pueblo",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: "Calle 1 No. 7 51 Barrio Pueblo Nuevo",
      telefono: "",
      tipo: "ministerio_publico",
      descripcion: "Promueve y defiende los derechos de las mujeres.",
      latitud: 3.884417202372204,
      longitud: -77.07540222883586,
    },
    {
      id: "personería_municipal_tumaco",
      ciudad: "Tumaco",
      nombre: "Personería Municipal",
      horario: "Martes a Viernes\n8:00am-12:30pm\n2:00pm-6:00pm",
      direccion: "Cl. 11 #9-2, Tumaco",
      telefono: "(572)7271201",
      tipo: "ministerio_publico",
      descripcion: "Promueve y defiende los derechos de las mujeres.",
      latitud: 1.8076602672107762,
      longitud: -78.76582894232826,
    },
    {
      id: "personería_municipal_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Personería Municipal",
      horario: "8:00am-12:00am\n2:00pm-6:00pm",
      direccion: "Calle segunda edificio el CAD, piso # 10",
      telefono: "3116073104\n2978928",
      tipo: "ministerio_publico",
      descripcion: "Promueve y defiende los derechos de las mujeres.",
      latitud: 3.889324893936952,
      longitud: -78.76582894232826,
    },
  ],
  salud: [
    {
      id: "hospital_san_andres",
      ciudad: "Tumaco",
      nombre: "Hospital San Andrés E.S.E.",
      horario: "24 horas",
      direccion: "Km 23 Inguapi del Carmen",
      telefono: "3203757591",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 1.67234769600039,
      longitud: -78.75234138465652,
    },
    {
      id: "ips_puente_medio",
      ciudad: "Tumaco",
      nombre: "IPS Puente del Medio",
      horario: "24 horas",
      direccion: "Calle Santander / Avenida Los Estudiantes",
      telefono: "7271556",
      tipo: "salud",
      descripcion: "Entidad de segundo nivel de complejidad.",
      latitud: 1.8077449316847172,
      longitud: -78.76428676931305,
    },
    {
      id: "divino_nino",
      ciudad: "Tumaco",
      nombre: "Centro Hospital Divino Niño E.S.E.",
      horario: "24 horas",
      direccion: "Barrio Nuevo Horizonte",
      telefono: "3027270404\n927271556",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 1.788207639589229,
      longitud: -78.78844703862607,
    },
    {
      id: "ips_los_angeles",
      ciudad: "Tumaco",
      nombre: "IPS Los Ángeles",
      horario: "7:00am-6:00pm",
      direccion: "Calle 11 #9-2, Tumaco",
      telefono: "7276712\n3175383956",
      tipo: "salud",
      descripcion: "Evaluaciones médicas y peritajes.",
      latitud: 1.8135852452074122,
      longitud: -78.76634640553385,
    },
    {
      id: "hospital_luis_ablanque_independencia",
      ciudad: "Buenaventura",
      nombre: "Centro de Salud Independencia (Luis Ablanque De La Plata)",
      horario: "24 horas",
      direccion: "Cl. 6 #120, Buenaventura",
      telefono: "315 5476004",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 3.8769602550930453,
      longitud: -77.00452831305293,
    },
    {
      id: "hospital_luis_ablanque_bellavista",
      ciudad: "Buenaventura",
      nombre: "Centro de Salud Bellavista (Hospital Luis Ablanque de la Plata)",
      horario: "24 horas",
      direccion: "Cra. 47 #22 a 2-84, Buenaventura",
      telefono: "2437441",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 3.8801200620969247,
      longitud: -77.02059020262098,
    },
    {
      id: "hospital_luis_ablanque_distrital",
      ciudad: "Buenaventura",
      nombre: "Hospital Distrital Luis Ablanque De La Plata",
      horario: "24 horas",
      direccion: "Cl. 5 #18-24, Buenaventura",
      telefono: "",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 3.8802699214913403,
      longitud: -77.02046145659054,
    },
    {
      id: "clinica_santa_sofia",
      ciudad: "Buenaventura",
      nombre: "Clínica Santa Sofía del Pacífico",
      horario: "24 horas",
      direccion: "Cra. 47 #42, Buenaventura",
      telefono: "22421880",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 3.8808727013535913,
      longitud: -77.02026621485183,
    },
    {
      id: "hospital_luis_ablanque_modelo",
      ciudad: "Buenaventura",
      nombre: "Puesto de Salud El Modelo (Hospital Luis Ablanque De La Plata)",
      horario: "24 horas",
      direccion: "Cl. 6 #1902, Buenaventura",
      telefono: "",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 3.896968244035304,
      longitud: -77.0302609494981,
    },
    {
      id: "hospital_departamental_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Hospital Departamental De Buenaventura E.s.e",
      horario: "24 horas",
      direccion: "Av. Simón Bolívar #17-40, Buenaventura",
      telefono: "",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 3.87618058199835,
      longitud: -77.00463557473458,
    },
  ],
  // ── Duplas de atención a víctimas ─────────────────────────────────────────
  duplas: [
    {
      id: "dupla_tumaco",
      ciudad: "Tumaco",
      nombre: "Dupla de Atención a Víctimas",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-6:00pm",
      direccion: "Alcaldía Municipal de Tumaco, Cl. 11 #9-2",
      telefono: "(572)7276156",
      whatsapp: "3170820627",
      tipo: "duplas",
      descripcion:
        "Establece medidas para cuidar, proteger y ayudar a las mujeres víctimas de violencia.",
      latitud: 1.807628096720489,
      longitud: -78.76544270423693,
    },
    {
      id: "dupla_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Dupla de Atención a Víctimas",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "Calle 4 sur Cra 73 esquina, Barrio Nueva Granada",
      telefono: "3170820627",
      whatsapp: "3170820627",
      tipo: "duplas",
      descripcion:
        "Establece medidas para cuidar, proteger y ayudar a las mujeres víctimas de violencia.",
      latitud: 3.8636936635472394,
      longitud: -76.99349771772933,
    },
  ],
  // ── Fallback genérico para tipo "otro" ────────────────────────────────────
  otro: [
    {
      id: "fiscalia_tumaco",
      ciudad: "Tumaco",
      nombre: "Fiscalía General de la Nación",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-6:00pm",
      direccion: "Avenida de los Estudiantes Edificio Capid",
      telefono: "122\n018000919748",
      tipo: "justicia",
      descripcion: "Se encarga de investigar los posibles delitos.",
      latitud: 1.8189894663045683,
      longitud: -78.7624061865076,
    },
    {
      id: "fiscalia_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Fiscalía General de la Nación",
      horario: "Lunes a Viernes\n8:00am-12:00m\n1:00pm-5:00pm",
      direccion: "Calle 9 No 2 – 83",
      telefono: "122\n018000919748",
      tipo: "justicia",
      descripcion: "Se encarga de investigar los posibles delitos.",
      latitud: 3.8916622258165905,
      longitud: -77.07791747116414,
    },
    {
      id: "comisaria_tumaco",
      ciudad: "Tumaco",
      nombre: "Comisaría de Familia",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-6:00pm",
      direccion: "Alcaldía Municipal de Tumaco, Cl. 11 #9-2",
      telefono: "(572)7276156",
      tipo: "protección",
      descripcion:
        "Establece medidas para proteger a las mujeres víctimas de violencia familiar.",
      latitud: 1.807628096720489,
      longitud: -78.76544270423693,
    },
    {
      id: "comisaria_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Comisaría de Familia",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "Calle 4 sur Cra 73 esquina, Barrio Nueva Granada",
      telefono: "3170820627",
      tipo: "protección",
      descripcion:
        "Establece medidas para proteger a las mujeres víctimas de violencia familiar.",
      latitud: 3.8636936635472394,
      longitud: -76.99349771772933,
    },
    {
      id: "hospital_san_andres",
      ciudad: "Tumaco",
      nombre: "Hospital San Andrés E.S.E.",
      horario: "24 horas",
      direccion: "Km 23 Inguapi del Carmen",
      telefono: "3203757591",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 1.67234769600039,
      longitud: -78.75234138465652,
    },
    {
      id: "hospital_luis_ablanque_distrital",
      ciudad: "Buenaventura",
      nombre: "Hospital Distrital Luis Ablanque De La Plata",
      horario: "24 horas",
      direccion: "Cl. 5 #18-24, Buenaventura",
      telefono: "",
      tipo: "salud",
      descripcion: "Atención física y psicológica a la persona.",
      latitud: 3.8802699214913403,
      longitud: -77.02046145659054,
    },
  ],
};

// ── Normaliza el tipo para buscar en FALLBACK_DATA ────────────────────────────
const normalizarTipo = (tipo) => {
  const mapa = {
    proteccion: "protección",
    protección: "protección",
    ministerio_publico: "ministerio_publico",
    justicia: "justicia",
    salud: "salud",
    duplas: "duplas",
    otro: "otro",
  };
  return mapa[tipo] ?? "otro";
};

// ── fetchPlacesData ───────────────────────────────────────────────────────────
export const fetchPlacesData = async () => {
  if (_cache) return _cache;
  try {
    const res = await fetchConTimeout(`${API_URL}/lugares`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && Object.keys(data).length > 0) {
      _cache = data;
      return data;
    }
    throw new Error("Respuesta vacía");
  } catch (err) {
    _isOffline = true;
    console.warn(
      "[placesData] API no disponible, activando modo offline:",
      err.message,
    );
  }

  const cached = await leerDeCache(CACHE_KEY_LUGARES);
  if (cached) {
    console.warn("[placesData] Usando caché de AsyncStorage");
    _cache = cached;
    return cached;
  }

  console.warn("[placesData] Usando fallback estático");
  _cache = FALLBACK_DATA;
  return FALLBACK_DATA;
};

// ── fetchPlacesByType ─────────────────────────────────────────────────────────
export const fetchPlacesByType = async (tipo, ciudad = null) => {
  const tipoNorm = normalizarTipo(tipo);
  try {
    if (_isOffline) throw new Error("Modo offline activo");
    const url = ciudad
      ? `${API_URL}/lugares/${encodeURIComponent(tipoNorm)}?ciudad=${encodeURIComponent(ciudad)}`
      : `${API_URL}/lugares/${encodeURIComponent(tipoNorm)}`;
    const res = await fetchConTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && data.length > 0) return data;
    throw new Error("Sin resultados en API");
  } catch (err) {
    console.warn(
      "[placesData] Usando fallback para tipo:",
      tipoNorm,
      err.message,
    );
    const allData = await fetchPlacesData();
    const porTipo =
      allData[tipoNorm] ?? FALLBACK_DATA[tipoNorm] ?? FALLBACK_DATA["otro"];
    return ciudad
      ? porTipo.filter((l) => l.ciudad.toLowerCase() === ciudad.toLowerCase())
      : porTipo;
  }
};

// ── invalidarCache ────────────────────────────────────────────────────────────
export const invalidarCache = async () => {
  _cache = null;
  try {
    await AsyncStorage.multiRemove([CACHE_KEY_LUGARES, CACHE_KEY_EMERGENCIAS]);
  } catch (err) {
    console.warn("[placesData] Error limpiando caché:", err.message);
  }
};

// ── getCategoryInfo ───────────────────────────────────────────────────────────
// Síncrona — requerida por usePlaces hook y PlacesScreen.
export const getCategoryInfo = (type) => {
  const config = getTypeConfig(type);
  return {
    title: config.title,
    description: config.description,
    icon: config.icon,
    isCustomIcon: config.isCustomIcon,
    color: config.primary,
    background: config.background,
  };
};

// ── getPlacesByType ───────────────────────────────────────────────────────────
// Alias async — compatibilidad con usePlaces hook.
export const getPlacesByType = async (tipo, ciudad = null) =>
  fetchPlacesByType(tipo, ciudad);

// ── getAllPlaces ──────────────────────────────────────────────────────────────
export const getAllPlaces = async () => {
  const data = await fetchPlacesData();
  return [
    ...(data.salud || []),
    ...(data["protección"] || []),
    ...(data.justicia || []),
    ...(data.ministerio_publico || []),
    ...(data.duplas || []),
  ];
};
