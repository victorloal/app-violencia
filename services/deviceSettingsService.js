import { Platform, Linking, Alert } from "react-native";
import * as Brightness from "expo-brightness";

export const deviceSettingsService = {
  // ===== ACCESIBILIDAD DE VOZ (VoiceOver/TalkBack) =====
  openVoiceAccessibility: async () => {
    try {
      if (Platform.OS === "ios") {
        // iOS: Abrir VoiceOver
        const url = "App-Prefs:root=ACCESSIBILITY&path=VOICEOVER";
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        } else {
          // Fallback a accesibilidad general
          await Linking.openURL("App-Prefs:root=ACCESSIBILITY");
        }
      } else {
        // Android: Abrir TalkBack
        await Linking.sendIntent("android.settings.ACCESSIBILITY_SETTINGS");
      }
    } catch (error) {
      console.error("Error abriendo accesibilidad de voz:", error);
      Alert.alert(
        "Error",
        "No se pudo abrir la configuración de accesibilidad de voz",
      );
    }
  },

  // ===== CONTRASTE DEL SISTEMA =====
  openContrastSettings: async () => {
    try {
      if (Platform.OS === "ios") {
        // iOS: Configuración de pantalla en accesibilidad (contraste, texto negrita, etc)
        const url = "App-Prefs:root=ACCESSIBILITY&path=DISPLAY";
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        } else {
          await Linking.openURL("App-Prefs:root=ACCESSIBILITY");
        }
      } else {
        // Android: Configuración de accesibilidad (contraste alto, etc)
        await Linking.sendIntent("android.settings.ACCESSIBILITY_SETTINGS");
      }
    } catch (error) {
      console.error("Error abriendo configuración de contraste:", error);
      Alert.alert("Error", "No se pudo abrir la configuración de contraste");
    }
  },

  // ===== BRILLO DEL SISTEMA =====
  getSystemBrightness: async () => {
    try {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso necesario",
          "Se necesita permiso para leer el brillo del dispositivo",
        );
        return null;
      }

      const brightness = await Brightness.getBrightnessAsync();
      return Math.round(brightness * 100); // 0-100
    } catch (error) {
      console.error("Error obteniendo brillo:", error);
      return null;
    }
  },

  setSystemBrightness: async (percentage) => {
    try {
      const validPercentage = Math.min(100, Math.max(0, percentage));
      const brightnessValue = validPercentage / 100;

      const { status } = await Brightness.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso necesario",
          "Se necesita permiso para ajustar el brillo del dispositivo",
        );
        return false;
      }

      if (Platform.OS === "ios") {
        // En iOS solo afecta la app actual
        await Brightness.setBrightnessAsync(brightnessValue);
      } else {
        // En Android puede afectar al sistema
        await Brightness.setSystemBrightnessAsync(brightnessValue);
      }

      return true;
    } catch (error) {
      console.error("Error ajustando brillo:", error);
      Alert.alert("Error", "No se pudo ajustar el brillo del dispositivo");
      return false;
    }
  },

  openBrightnessSettings: async () => {
    try {
      if (Platform.OS === "ios") {
        // iOS: Configuración de pantalla y brillo
        await Linking.openURL("App-Prefs:root=DISPLAY");
      } else {
        // Android: Configuración de pantalla
        await Linking.sendIntent("android.settings.DISPLAY_SETTINGS");
      }
    } catch (error) {
      console.error("Error abriendo configuración de brillo:", error);
      Alert.alert("Error", "No se pudo abrir la configuración de brillo");
    }
  },
};
