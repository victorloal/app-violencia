import { Platform, Linking, Alert, AccessibilityInfo } from "react-native";
import * as Brightness from "expo-brightness";

export const linkingService = {
  // ===== WHATSAPP =====
  openWhatsApp: async (phoneNumber = "", message = "") => {
    try {
      let url;

      if (phoneNumber) {
        // Abrir chat con número específico
        url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      } else {
        // Solo abrir WhatsApp
        url = "whatsapp://";
      }

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        // Fallback: abrir WhatsApp Web
        Alert.alert(
          "WhatsApp no instalado",
          "¿Quieres abrir WhatsApp Web en el navegador?",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Abrir Web",
              onPress: () => Linking.openURL("https://web.whatsapp.com"),
            },
          ],
        );
      }
    } catch (error) {
      console.error("Error abriendo WhatsApp:", error);
      Alert.alert("Error", "No se pudo abrir WhatsApp");
    }
  },

  // ===== LLAMADAS TELEFÓNICAS =====
  makePhoneCall: async (phoneNumber) => {
    try {
      // Validar que el número tenga formato
      const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");

      if (!cleanNumber) {
        Alert.alert("Error", "Número de teléfono inválido");
        return;
      }

      const url = `tel:${cleanNumber}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Tu dispositivo no soporta llamadas telefónicas");
      }
    } catch (error) {
      console.error("Error haciendo llamada:", error);
      Alert.alert("Error", "No se pudo realizar la llamada");
    }
  },

  // ===== ACCESIBILIDAD DE VOZ (VoiceOver/TalkBack) =====
  openVoiceAccessibility: async () => {
    try {
      if (Platform.OS === "ios") {
        // iOS: Abrir configuración de VoiceOver
        const url = "App-Prefs:root=ACCESSIBILITY&path=VOICEOVER";
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        } else {
          // Fallback a accesibilidad general
          await Linking.openURL("App-Prefs:root=ACCESSIBILITY");
        }
      } else {
        // Android: Abrir configuración de accesibilidad (TalkBack está ahí)
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

  // ===== BRILLO DE PANTALLA =====
  // Nota: Necesitas instalar expo-brightness: expo install expo-brightness

  getCurrentBrightness: async () => {
    try {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso necesario",
          "Se necesita permiso para ajustar el brillo",
        );
        return null;
      }

      const brightness = await Brightness.getBrightnessAsync();
      return Math.round(brightness * 100); // Retorna porcentaje (0-100)
    } catch (error) {
      console.error("Error obteniendo brillo:", error);
      return null;
    }
  },

  setBrightness: async (percentage) => {
    try {
      // percentage debe ser entre 0 y 100
      const validPercentage = Math.min(100, Math.max(0, percentage));
      const brightnessValue = validPercentage / 100; // Expo usa valores 0-1

      const { status } = await Brightness.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso necesario",
          "Se necesita permiso para ajustar el brillo",
        );
        return false;
      }

      if (Platform.OS === "ios") {
        await Brightness.setBrightnessAsync(brightnessValue);
      } else {
        // En Android, puedes elegir si afecta solo la app o el sistema
        await Brightness.setSystemBrightnessAsync(brightnessValue);
      }

      return true;
    } catch (error) {
      console.error("Error ajustando brillo:", error);
      Alert.alert("Error", "No se pudo ajustar el brillo");
      return false;
    }
  },

  increaseBrightness: async (step = 10) => {
    try {
      const current = await linkingService.getCurrentBrightness();
      if (current !== null) {
        const newValue = Math.min(100, current + step);
        await linkingService.setBrightness(newValue);
        return newValue;
      }
      return null;
    } catch (error) {
      console.error("Error aumentando brillo:", error);
      return null;
    }
  },

  decreaseBrightness: async (step = 10) => {
    try {
      const current = await linkingService.getCurrentBrightness();
      if (current !== null) {
        const newValue = Math.max(0, current - step);
        await linkingService.setBrightness(newValue);
        return newValue;
      }
      return null;
    } catch (error) {
      console.error("Error disminuyendo brillo:", error);
      return null;
    }
  },

  // ===== CONTRASTE (solo iOS) =====
  // Nota: El contraste del sistema solo es ajustable en iOS

  openContrastSettings: async () => {
    try {
      if (Platform.OS === "ios") {
        // iOS: Configuración de contraste en accesibilidad
        const url = "App-Prefs:root=ACCESSIBILITY&path=DISPLAY";
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        } else {
          // Fallback
          await Linking.openURL("App-Prefs:root=ACCESSIBILITY");
        }
      } else {
        // Android: El contraste se maneja diferente, abrir accesibilidad
        await Linking.sendIntent("android.settings.ACCESSIBILITY_SETTINGS");
      }
    } catch (error) {
      console.error("Error abriendo configuración de contraste:", error);
      Alert.alert("Error", "No se pudo abrir la configuración de contraste");
    }
  },

  // Para Android, algunos fabricantes tienen sus propias configuraciones
  openHighContrastText: async () => {
    if (Platform.OS === "android") {
      try {
        // Intenta abrir configuración de texto de alto contraste
        await Linking.sendIntent("android.settings.ACCESSIBILITY_SETTINGS");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  },

  // ===== CONFIGURACIÓN GENERAL DEL SISTEMA =====

  openSettings: async () => {
    try {
      if (Platform.OS === "ios") {
        await Linking.openURL("App-Prefs:root=GENERAL");
      } else {
        await Linking.sendIntent("android.settings.SETTINGS");
      }
    } catch (error) {
      console.error("Error abriendo configuración:", error);
    }
  },

  // ===== UTILIDADES =====

  canOpenURL: async (url) => {
    try {
      return await Linking.canOpenURL(url);
    } catch (error) {
      return false;
    }
  },
};
