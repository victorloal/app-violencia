import * as Location from "expo-location";
import { Alert } from "react-native";

export const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permiso requerido",
      "Necesitamos acceso a tu ubicación para enviarla en caso de emergencia.",
    );
    return false;
  }

  return true;
};
