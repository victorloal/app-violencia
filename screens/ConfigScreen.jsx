import React, { useContext, useState } from "react";
import { View, StyleSheet, Linking, Platform, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import { colors } from "../thema/colors";
import { SettingsContext } from "../context/SettingsContext";
import SafeLayout from "../components/Layout/SafeLayout";
import { linkingService } from "../services/linkingService";
import { DialogService } from "../services/dialogService";
import AppTextInput from "../components/UI/AppTextInput";
import Cintilla from "../assets/icons/cintilla";

export default function ConfigScreen({ navigation }) {
  const {
    fontScale,
    setFontScale,
    phoneNumber,
    setPhoneNumber,
    hasAccessibilityNeeds,
    setHasAccessibilityNeeds,
    region,
    setRegion,
  } = useContext(SettingsContext);

  const [tempPhoneNumber, setTempPhoneNumber] = useState(phoneNumber);
  const [tempRegion, setTempRegion] = useState(region);

  const openVoiceAccessibility = () => {
    if (Platform.OS === "android") {
      Linking.sendIntent("android.settings.ACCESSIBILITY_SETTINGS").catch(
        () => {
          DialogService.show(
            "Error",
            "No se pudo abrir configuración de accesibilidad",
          );
        },
      );
    } else {
      Linking.openURL("App-Prefs:root=ACCESSIBILITY&path=VOICEOVER").catch(
        () => {
          Linking.openURL("App-Prefs:root=ACCESSIBILITY");
        },
      );
    }
  };

  const openDisplayAccessibility = () => {
    if (Platform.OS === "android") {
      Linking.sendIntent("android.settings.DISPLAY_SETTINGS");
    } else {
      Linking.openURL("App-Prefs:root=ACCESSIBILITY&path=DISPLAY");
    }
  };

  const testWhatsApp = async () => {
    if (!tempPhoneNumber) {
      DialogService.show(
        "Número requerido",
        "Por favor ingresa un número de teléfono",
      );
      return;
    }

    // Limpiar número y agregar 57 solo para la prueba
    let cleanNumber = tempPhoneNumber.replace(/[^0-9]/g, "");
    if (!cleanNumber.startsWith("57")) {
      cleanNumber = "57" + cleanNumber;
    }

    const result = await linkingService.sendLocationWhatsApp(cleanNumber);
    if (result === true) {
      DialogService.show(
        "WhatsApp abierto",
        "Se abrió WhatsApp con tu ubicación. Por favor envía el mensaje.",
        [{ text: "OK" }],
      );
    }
  };

  const handlePhoneChange = (text) => {
    // Guardar solo números, sin prefijo
    const numbers = text.replace(/[^0-9]/g, "");
    setTempPhoneNumber(numbers);
  };

  const adjustFontSize = (delta) => {
    const next = Math.max(
      0.8,
      Math.min(1.6, Number((fontScale + delta).toFixed(2))),
    );
    setFontScale(next);
  };

  const handleSave = () => {
    if (!tempPhoneNumber || tempPhoneNumber.length < 10) {
      DialogService.show(
        "Número requerido",
        "Por favor ingresa un número de contacto válido de 10 dígitos para continuar. Esto es esencial para tu seguridad.",
      );
      return;
    }
    // Guardar el número exactamente como está, sin modificar
    setPhoneNumber(tempPhoneNumber);
    setRegion(tempRegion);

    DialogService.show(
      "Configuración guardada",
      "La configuración inicial se ha completado correctamente",
      [{ text: "Continuar", onPress: () => navigation.replace("Terms") }],
    );
  };

  const hasChanges = tempPhoneNumber !== phoneNumber || tempRegion !== region;

  const handleCancel = () => {
    setTempPhoneNumber(phoneNumber);
    setTempRegion(region);
    navigation.replace("MessageConfig");
  };

  return (
    <SafeLayout>
      {/* Header */}
      <View
        style={styles.header}
        accessible={true}
        accessibilityLabel="Configuración"
        accessibilityRole="header"
      >
        <View style={styles.headerIconContainer}>
          <Ionicons name="settings-sharp" size={32} color={colors.white} />
        </View>
        <AppText variant="h1" accessible={false}>
          Configuración
        </AppText>
      </View>

      {/* Sección de Tamaño de Letra */}
      <View style={styles.section}>
        <View
          style={styles.sectionHeader}
          accessible={true}
          accessibilityLabel="Tamaño de letra"
          accessibilityRole="header"
        >
          <View style={styles.iconWrapper} accessible={false}>
            <Ionicons name="text" size={22} color={colors.lavender[600]} />
          </View>
          <AppText variant="h2" style={styles.sectionTitle} accessible={false}>
            Tamaño de Letra
          </AppText>
        </View>
        <AppText
          variant="body"
          tone="muted"
          style={styles.description}
          accessible={true}
          accessibilityLabel="Ajusta el tamaño del texto para una mejor lectura."
          accessibilityRole="text"
        >
          Ajusta el tamaño del texto para una mejor lectura.
        </AppText>

        <View style={styles.row}>
          <Button
            onPress={() => adjustFontSize(-0.1)}
            type="primaryOutline"
            size="xs"
            variant="circle"
            textVariant="bold"
            disabled={fontScale <= 0.8}
            accessible={true}
            accessibilityLabel="Disminuir tamaño de letra"
            accessibilityRole="button"
          >
            <Ionicons
              name="remove"
              size={20}
              color={
                fontScale <= 0.8 ? colors.neutral[900] : colors.lavender[600]
              }
              accessible={false}
            />
          </Button>

          <View style={styles.fontSizeDisplay} accessible={false}>
            <AppText
              variant="h2"
              accessible={true}
              accessibilityLabel={`Tamaño de letra actual, ${Math.round(fontScale * 100)} por ciento`}
              accessibilityRole="text"
            >
              {Math.round(fontScale * 100)}%
            </AppText>
          </View>

          <Button
            onPress={() => adjustFontSize(0.1)}
            type="primaryOutline"
            size="xs"
            variant="circle"
            textVariant="bold"
            disabled={fontScale >= 1.6}
            accessible={true}
            accessibilityLabel="Aumentar tamaño de letra"
            accessibilityRole="button"
          >
            <Ionicons
              name="add"
              size={20}
              color={
                fontScale >= 1.6 ? colors.neutral[300] : colors.lavender[600]
              }
              accessible={false}
            />
          </Button>
        </View>

        <View
          style={styles.previewBox}
          accessible={true}
          accessibilityLabel="Texto de ejemplo con el tamaño seleccionado"
          accessibilityRole="text"
        >
          <AppText
            variant="body"
            accessible={false}
            style={{
              color: colors.neutral[600],
            }}
          >
            Texto de ejemplo con el tamaño seleccionado
          </AppText>
        </View>
      </View>

      {/* Sección de Accesibilidad */}
      <View style={styles.section} accessible={false}>
        <View
          style={styles.sectionHeader}
          accessible={true}
          accessibilityLabel="¿Tienes alguna discapacidad o dificultad?"
          accessibilityRole="header"
        >
          <View style={styles.iconWrapper} accessible={false}>
            <Ionicons
              name="accessibility"
              size={22}
              color={colors.lavender[600]}
              accessible={false}
            />
          </View>
          <AppText variant="h2" style={styles.sectionTitle} accessible={false}>
            ¿Tienes alguna discapacidad o dificultad visual?
          </AppText>
        </View>

        <AppText
          variant="body"
          tone="muted"
          style={styles.description}
          accessible={true}
          accessibilityLabel="Configura las ayudas de tu teléfono para leer texto o ver mejor la pantalla."
          accessibilityRole="text"
        >
          Configura las ayudas de tu teléfono para leer texto o ver mejor la
          pantalla.
        </AppText>

        <View style={styles.decisionButtons}>
          <Button
            type={hasAccessibilityNeeds ? "primary" : "primaryOutline"}
            size="flex"
            onPress={() => setHasAccessibilityNeeds(true)}
          >
            Sí
          </Button>
          <Button
            type={!hasAccessibilityNeeds ? "primary" : "primaryOutline"}
            size="flex"
            onPress={() => setHasAccessibilityNeeds(false)}
          >
            No
          </Button>
        </View>

        {hasAccessibilityNeeds && (
          <View style={styles.accessibilityOptions}>
            <Button
              style={styles.accessibilityCard}
              type="primaryOutline"
              variant="default"
              size="xl"
              textVariant="bold"
              onPress={openVoiceAccessibility}
              activeOpacity={0.7}
              accessible={true}
              accessibilityLabel="TalkBack"
              accessibilityHint="Lector de pantalla de Android"
            >
              <View style={styles.accessibilityInfo} accessible={false}>
                <Ionicons
                  name={
                    Platform.OS === "android" ? "logo-android" : "logo-apple"
                  }
                  size={28}
                  color={colors.lavender[600]}
                  accessible={false}
                />
                <View style={styles.accessibilityTexts} accessible={false}>
                  <AppText variant="h4" accessible={false}>
                    {Platform.OS === "android" ? "TalkBack" : "VoiceOver"}
                  </AppText>
                  <AppText variant="body" tone="muted" accessible={false}>
                    {Platform.OS === "android"
                      ? "Lector de pantalla de Android"
                      : "Lector de pantalla de iOS"}
                  </AppText>
                </View>
              </View>
            </Button>
            <Button
              style={styles.accessibilityCard}
              type="primaryOutline"
              variant="default"
              size="xl"
              textVariant="small"
              onPress={openDisplayAccessibility}
              activeOpacity={0.7}
              accessible={true}
              accessibilityLabel="Pantalla"
              accessibilityHint="Configuración de pantalla"
            >
              <View style={styles.accessibilityInfo} accessible={false}>
                <Ionicons
                  name="contrast"
                  size={28}
                  color={colors.lavender[600]}
                  accessible={false}
                />
                <View style={styles.accessibilityTexts} accessible={false}>
                  <AppText variant="h4" accessible={false}>
                    {Platform.OS === "android"
                      ? "Pantalla"
                      : "Texto y contraste"}
                  </AppText>
                  <AppText variant="body" tone="muted" accessible={false}>
                    {Platform.OS === "android"
                      ? "Configuración de pantalla"
                      : "Texto negrita, contraste, etc."}
                  </AppText>
                </View>
              </View>
            </Button>
          </View>
        )}
      </View>

      {/* Sección de Contacto de Confianza */}
      <View style={styles.section} accessible={false}>
        <View
          style={styles.sectionHeader}
          accessible={true}
          accessibilityLabel="Contacto de Confianza"
          accessibilityRole="header"
        >
          <View style={styles.iconWrapper} accessible={false}>
            <Ionicons
              name="shield"
              size={22}
              color={colors.lavender[600]}
              accessible={false}
            />
          </View>
          <AppText variant="h2" style={styles.sectionTitle} accessible={false}>
            Contacto de Confianza
          </AppText>
        </View>
        <AppText
          variant="body"
          tone="muted"
          style={styles.description}
          accessible={true}
          accessibilityLabel="Guarda un número de contacto para enviar un mensaje por WhatsApp en caso de emergencias. Se agregará automáticamente el prefijo +57."
          accessibilityRole="text"
        >
          {
            "Guarda un número de contacto para enviar un mensaje por WhatsApp en caso de emergencias. \n"
          }
          <AppText
            style={{
              color: colors.neutral[600],
            }}
          >
            Se agregará automáticamente el prefijo +57.
          </AppText>
        </AppText>

        <View style={styles.inputCard} accessible={false}>
          <View style={styles.phonePrefixContainer} accessible={false}>
            <View style={styles.prefixBox}>
              <AppText variant="h4" style={styles.prefixText}>
                +57
              </AppText>
            </View>
            <AppTextInput
              placeholder="Número de teléfono"
              keyboardType="phone-pad"
              value={tempPhoneNumber}
              onChangeText={handlePhoneChange}
              accessible={true}
              accessibilityLabel="Ingrese el número de teléfono de una persona de confianza"
              accessibilityHint="Solo ingresa los números, el prefijo 57 se agregará automáticamente"
              leftIcon={
                <Ionicons
                  name="call"
                  size={20}
                  color={colors.lavender[500]}
                  accessible={false}
                />
              }
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={styles.messagePreviewContainer}
            accessible={true}
            accessibilityLabel="Vista previa del mensaje que se enviará: 🚨 Me siento en peligro. Por favor, actúa ahora. 📍 Te envío mi ubicación en tiempo real."
            accessibilityRole="text"
          >
            <AppText variant="h4" accessible={false}>
              Vista previa del mensaje:
            </AppText>
            <View style={styles.messageBubble} accessible={false}>
              <AppText
                variant="body"
                accessible={false}
                style={{
                  color: colors.neutral[600],
                }}
              >
                <AppText
                  variant="body"
                  bold
                  accessible={false}
                  style={{
                    color: colors.neutral[600],
                  }}
                >
                  🚨 Me siento en peligro.
                </AppText>{" "}
                {
                  "\nPor favor, actúa ahora. 📍 Te envío mi ubicación en tiempo real."
                }
              </AppText>
            </View>
          </View>
        </View>
        <Button
          type="primaryOutline"
          variant="default"
          size="xl"
          onPress={testWhatsApp}
          accessible={true}
          accessibilityLabel="Probar WhatsApp"
          accessibilityRole="button"
        >
          Probar WhatsApp
        </Button>
      </View>

      <Cintilla
        width="100%"
        height="250px"
        preserveAspectRatio="xMidYMidMeet"
      />
      {/* Botones de Guardar/Cancelar */}
      <View style={styles.fixedButtonContainer}>
        <Button
          type="primaryOutline"
          variant="default"
          size="medium"
          onPress={handleCancel}
          style={styles.cancelButton}
          accessible={true}
          accessibilityLabel="Cancelar"
          accessibilityHint="Cancelar cambios"
        >
          Cancelar
        </Button>
        <Button
          type="primary"
          variant="default"
          size="medium"
          onPress={handleSave}
          style={styles.saveButton}
          accessible={true}
          accessibilityLabel={hasChanges ? "Guardar cambios" : "Guardar"}
          accessibilityHint="Guardar cambios"
        >
          {hasChanges ? "Guardar cambios" : "Guardar"}
        </Button>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  headerIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.lavender[600],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: colors.lavender[800],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender[100],
    gap: 10,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    marginBottom: 12,
  },
  fontSizeDisplay: {
    alignItems: "center",
    flexDirection: "row",
  },
  previewBox: {
    backgroundColor: colors.lavender[50],
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.lavender[100],
  },
  phonePrefixContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 4,
    gap: 8,
  },
  prefixBox: {
    backgroundColor: colors.lavender[100],
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lavender[200],
    justifyContent: "center",
    alignItems: "center",
  },
  prefixText: {
    color: colors.neutral[600],
  },
  inputCard: {
    backgroundColor: colors.lavender[50],
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  accessibilityCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  accessibilityInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  accessibilityTexts: {
    marginLeft: 12,
    flex: 1,
  },
  accessibilityOptions: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[100],
    paddingTop: 20,
  },
  decisionButtons: {
    gap: 12,
    marginTop: 12,
    width: "100%",
  },
  activeButton: {
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  description: {
    marginBottom: 12,
    textAlign: "flex-start",
    color: colors.neutral[600],
  },
  fixedButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[200],
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    gap: 10,
  },
  cancelButton: {
    flex: 2,
  },
  saveButton: {
    flex: 2,
  },
  messagePreviewContainer: {
    marginTop: 12,
    paddingHorizontal: 4,
  },
  previewLabel: {
    marginBottom: 8,
    color: colors.neutral[600],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  messageBubble: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lavender[500],
    alignSelf: "flex-start",
  },
  footerCintilla: {
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
});
