// data/emergencyData.js
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../thema/colors";

export const emergencyNumbers = [
  {
    id: "e-1",
    nombre: "Línea de Mujeres",
    numero: "155",
    horario: "24 horas",
    descripcion: "Atención especializada a víctimas de violencia de género.",
    tipo: "emergencia",
    prioridad: true,
    icon: (color) => <Ionicons name="woman-outline" size={22} color={color} />,
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
    icon: (color) => <Ionicons name="home-outline" size={22} color={color} />,
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
    icon: (color) => (
      <Ionicons name="shield-checkmark-outline" size={22} color={color} />
    ),
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
    icon: (color) => <Ionicons name="people-outline" size={22} color={color} />,
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
    icon: (color) => <Ionicons name="scale-outline" size={22} color={color} />,
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
    icon: (color) => (
      <Ionicons name="alert-circle-outline" size={22} color={color} />
    ),
  },
  {
    id: "e-7",
    nombre: "Defensa Civil",
    numero: "144",
    horario: "24 horas",
    descripcion: "Gestión de desastres y emergencias civiles.",
    tipo: "emergencia",
    prioridad: false,
    icon: (color) => (
      <Ionicons name="construct-outline" size={22} color={color} />
    ),
  },
  {
    id: "e-8",
    nombre: "Cruz Roja",
    numero: "132",
    horario: "24 horas",
    descripcion: "Atención médica y emergencias humanitarias.",
    tipo: "emergencia",
    prioridad: false,
    icon: (color) => <Ionicons name="medkit-outline" size={22} color={color} />,
  },
  {
    id: "e-9",
    nombre: "Bomberos",
    numero: "119",
    horario: "24 horas",
    descripcion: "Atención de incendios y emergencias.",
    tipo: "emergencia",
    prioridad: false,
    icon: (color) => <Ionicons name="flame-outline" size={22} color={color} />,
  },
  {
    id: "e-10",
    nombre: "Línea Amiga – Salud Mental",
    numero: "106",
    horario: "24 horas",
    descripcion: "Apoyo psicológico en crisis y prevención del suicidio.",
    tipo: "emergencia",
    prioridad: false,
    icon: (color) => <Ionicons name="heart-outline" size={22} color={color} />,
  },
];
