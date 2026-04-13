import SaludIcon from "../assets/icons/Salud";
import ProteccionIcon from "../assets/icons/Protección";
import JusticiaIcon from "../assets/icons/Justicia";
import { colors } from "../thema/colors";

export const TYPE_CONFIG = {
  salud: {
    icon: SaludIcon, // Custom SVG component
    isCustomIcon: true,
    primary: colors.violet[600],
    background: colors.violet[50],
    border: colors.violet[200],
    badgeBg: colors.violet[100],
    text: colors.violet[800],
    buttonBg: colors.violet[600],
    title: "Sector Salud",
    description: "Atención médica y hospitalaria para emergencias y consultas",
  },
  protección: {
    icon: ProteccionIcon,
    isCustomIcon: true,
    primary: colors.magenta[600],
    background: colors.magenta[50],
    border: colors.magenta[200],
    badgeBg: colors.magenta[100],
    text: colors.magenta[800],
    buttonBg: colors.magenta[600],
    title: "Sector Protección",
    description: "Refugios y espacios seguros para víctimas de violencia",
  },
  justicia: {
    icon: JusticiaIcon,
    isCustomIcon: true,
    primary: colors.lime[600],
    background: colors.lime[50],
    border: colors.lime[200],
    badgeBg: colors.lime[100],
    text: colors.lime[800],
    buttonBg: colors.lime[600],
    title: "Sector Justicia",
  },
  ministerio_publico: {
    icon: "business-outline", // Ionicon name
    isCustomIcon: false,
    primary: colors.lavender[600],
    background: colors.lavender[50],
    border: colors.lavender[200],
    badgeBg: colors.lavender[100],
    text: colors.lavender[800],
    buttonBg: colors.lavender[600],
    title: "Ministerio Público",
    description: "Procuraduría, Defensoría y Personería municipal",
  },
};

export const getTypeConfig = (tipo) =>
  TYPE_CONFIG[tipo] || {
    icon: "location-outline",
    isCustomIcon: false,
    primary: colors.violet[600],
    background: colors.violet[50],
    border: colors.violet[200],
    badgeBg: colors.violet[100],
    text: colors.violet[800],
    buttonBg: colors.violet[600],
    title: "Lugares de Ayuda",
    description: "Opciones de apoyo cercanas a tu ubicación",
  };

export const CATEGORIES = [
  { id: "salud", label: "Salud" },
  { id: "protección", label: "Protección" },
  { id: "justicia", label: "Justicia" },
  { id: "ministerio_publico", label: "Ministerio Público" },
];
