// services/appReloadService.js

import { Alert } from "react-native";
import * as Updates from "expo-updates";

export const reloadApp = async () => {
  try {
    if (Updates.isEnabled) {
      await Updates.reloadAsync();
    } else {
      Alert.alert(
        "Reinicio manual requerido",
        "Por favor, cierra y vuelve a abrir la aplicación para aplicar los cambios.",
      );
    }
  } catch (error) {
    console.error("Error al reiniciar la app:", error);
    Alert.alert(
      "Error al reiniciar",
      "Los cambios se guardaron pero debes reiniciar la app manualmente.",
    );
  }
};
