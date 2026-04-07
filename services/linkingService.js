import * as Location from "expo-location";
import { Linking, Alert, Platform } from "react-native";

export const linkingService = {
  // ===== WHATSAPP =====
  sendLocationWhatsApp: async (phoneNumber) => {
    try {
      // 1. VERIFICAR PERMISOS - Esperar resultado
      const permissionResult = await requestLocationPermission();

      if (!permissionResult) {
        Alert.alert(
          "Permiso denegado",
          "Necesitamos acceso a tu ubicación para enviar tu posición",
        );
        return null;
      }

      // 2. VERIFICAR NÚMERO DE TELÉFONO
      if (!phoneNumber || phoneNumber.trim() === "") {
        Alert.alert(
          "Número no configurado",
          "Por favor, configura tu número de contacto en la pantalla de Configuración.",
          [
            {
              text: "Ir a Configuración",
              onPress: () => navigation.replace("Config"),
            },
            { text: "Cancelar", style: "cancel" },
          ],
        );
        return;
      }

      // 3. OBTENER UBICACIÓN - Esperar a que llegue
      let location;
      try {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
      } catch (locationError) {
        console.error("Error obteniendo ubicación:", locationError);
        Alert.alert(
          "Error de ubicación",
          "No se pudo obtener tu ubicación actual. Verifica que el GPS esté activado.",
        );
        return null;
      }

      // 4. VERIFICAR QUE TENEMOS COORDENADAS VÁLIDAS
      if (!location?.coords?.latitude || !location?.coords?.longitude) {
        Alert.alert(
          "Ubicación no disponible",
          "No se pudieron obtener coordenadas válidas",
        );
        return null;
      }

      const { latitude, longitude } = location.coords;

      // 5. LIMPIAR Y FORMATEAR NÚMERO DE TELÉFONO
      let cleanNumber = phoneNumber.replace(/[^0-9]/g, "");

      // Asegurar prefijo de Colombia (+57)
      if (!cleanNumber.startsWith("57")) {
        cleanNumber = "57" + cleanNumber;
      }

      // 6. CONSTRUIR MENSAJE
      const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
      const message =
        `🚨 ¡SITUACIÓN DE PELIGRO! 🚨\n\n` +
        `Necesito ayuda inmediatamente.\n\n` +
        `📍 Mi ubicación actual:\n${mapsLink}\n\n` +
        `📱 Por favor, contactame o avisa a las autoridades.`;

      // 7. CREAR URL DE WHATSAPP
      const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

      // 8. VERIFICAR SI WHATSAPP ESTÁ DISPONIBLE
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // TODO LISTO - Abrir WhatsApp
        await Linking.openURL(url);
        return true;
      } else {
        // WhatsApp no instalado - Ofrecer alternativas
        Alert.alert(
          "WhatsApp no instalado",
          "¿Quieres abrir WhatsApp Web o enviar un SMS?",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "WhatsApp Web",
              onPress: () => Linking.openURL("https://web.whatsapp.com"),
            },
            {
              text: "Enviar SMS",
              onPress: () => {
                const smsUrl = `sms:${cleanNumber}?body=${encodeURIComponent(message)}`;
                Linking.openURL(smsUrl);
              },
            },
          ],
        );
        return false;
      }
    } catch (error) {
      console.error("Error en sendLocationWhatsApp:", error);
      Alert.alert(
        "Error",
        "No se pudo completar la operación. Intenta de nuevo.",
      );
      return null;
    }
  },

  // ===== LLAMADA TELEFÓNICA =====
  makePhoneCall: async (phoneNumber) => {
    try {
      if (!phoneNumber || phoneNumber.trim() === "") {
        Alert.alert(
          "Número no configurado",
          "Por favor, configura tu número de contacto en la pantalla de Configuración.",
          [
            {
              text: "Ir a Configuración",
              onPress: () => navigation.replace("Config"),
            },
            { text: "Cancelar", style: "cancel" },
          ],
        );
        return;
      }

      let cleanNumber = phoneNumber.replace(/[^0-9]/g, "");

      const url = `tel:${cleanNumber}`;
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error en makePhoneCall:", error);
      Alert.alert("Error", "No se pudo realizar la llamada");
      return false;
    }
  },

  // ===== SMS =====
  sendSMS: async (phoneNumber, message = "🚨 ¡Necesito ayuda!") => {
    try {
      if (!phoneNumber) {
        Alert.alert("Error", "No hay número de teléfono configurado");
        return false;
      }

      let cleanNumber = phoneNumber.replace(/[^0-9]/g, "");

      const url = `sms:${cleanNumber}?body=${encodeURIComponent(message)}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
        return true;
      } else {
        Alert.alert("Error", "No se pueden enviar SMS desde este dispositivo");
        return false;
      }
    } catch (error) {
      console.error("Error en sendSMS:", error);
      Alert.alert("Error", "No se pudo enviar el SMS");
      return false;
    }
  },
};

// Función helper para permisos de ubicación
async function requestLocationPermission() {
  try {
    // Verificar si ya tenemos permisos
    const { status: existingStatus } =
      await Location.getForegroundPermissionsAsync();

    if (existingStatus === "granted") {
      return true;
    }

    // Solicitar permisos
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error solicitando permisos:", error);
    return false;
  }
}
