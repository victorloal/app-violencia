// config/placeTypes.js
import SaludIcon from "../assets/icons/Salud";
import ProteccionIcon from "../assets/icons/Protección";
import JusticiaIcon from "../assets/icons/Justicia";
import { colors } from "../thema/colors";

export const TYPE_CONFIG = {
  salud: {
    icon: "medkit-outline",
    primary: colors.violet[600],
    background: colors.violet[50],
    border: colors.violet[200],
    badgeBg: colors.violet[100],
    text: colors.violet[800],
    buttonBg: colors.violet[600],
    title: "Centros de Salud",
    description: "Atención médica y hospitalaria para emergencias y consultas",
  },
  protección: {
    icon: "shield-outline",
    primary: colors.magenta[600],
    background: colors.magenta[50],
    border: colors.magenta[200],
    badgeBg: colors.magenta[100],
    text: colors.magenta[800],
    buttonBg: colors.magenta[600],
    title: "Centros de Protección",
    description: "Refugios y espacios seguros para víctimas de violencia",
  },
  justicia: {
    icon: "scale-outline",
    primary: colors.lime[600],
    background: colors.lime[50],
    border: colors.lime[200],
    badgeBg: colors.lime[100],
    text: colors.lime[800],
    buttonBg: colors.lime[600],
    title: "Asesoría Legal",
    description: "Apoyo jurídico y orientación legal gratuita",
  },
};

export const getTypeConfig = (tipo) =>
  TYPE_CONFIG[tipo] || {
    icon: "location-outline",
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
  { id: "salud", label: "Salud", icon: <SaludIcon /> },
  { id: "proteccion", label: "Protección", icon: <ProteccionIcon /> },
  { id: "justicia", label: "Justicia", icon: <JusticiaIcon /> },
];
