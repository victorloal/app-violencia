import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "../thema/colors";
import AppText from "../components/UI/AppText";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/UI/Button";

export default function TermsScreen({ navigation }) {
  const [accepted, setAccepted] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollViewRef = useRef(null);

  const handleAccept = () => {
    if (accepted && isAtBottom) {
      navigation.replace("MessageForm");
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    setIsAtBottom(isCloseToBottom);
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant="title" style={styles.title}>
          Términos y Condiciones
        </AppText>
      </View>

      {/* Contenido scrolleable */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.section}>
          <AppText variant="body" style={styles.text}>
            Al usar esta aplicación, aceptas este acuerdo. Esta es una
            herramienta informativa que muestra los servicios disponibles y
            brinda datos de los lugares y números de contacto a los que puedes
            acudir si estás viviendo una situación de violencia.
          </AppText>

          <AppText variant="body" style={styles.text}>
            La aplicación guía de manera general sobre cómo acceder a estos
            servicios, pero no presta atención directa ni reemplaza a las
            autoridades competentes.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="subtitle" style={styles.subtitle}>
            📊 Información sociodemográfica
          </AppText>
          <AppText variant="body" style={styles.text}>
            La aplicación podrá solicitar información de caracterización
            sociodemográfica con el fin de mejorar el servicio que ofrece. Estos
            datos se utilizan únicamente con fines estadísticos y de mejora
            institucional.
          </AppText>
          <AppText variant="body" style={styles.highlight}>
            No se solicitan datos que permitan la identificación personal de la
            usuaria, como nombres, números de documento, direcciones exactas u
            otra información que pueda identificarla individualmente.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="subtitle" style={styles.subtitle}>
            📍 Ubicación
          </AppText>
          <AppText variant="body" style={styles.text}>
            Si decides activar la ubicación, esta se utilizará únicamente para
            mostrarte los servicios más cercanos y para trazar rutas en el mapa
            desde tu ubicación actual.
          </AppText>
          <AppText variant="body" style={styles.text}>
            <AppText style={styles.bold}>
              La ubicación no será almacenada
            </AppText>{" "}
            en la aplicación y podrás desactivar este permiso en cualquier
            momento desde la configuración de tu dispositivo.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="subtitle" style={styles.subtitle}>
            📞 Contactos y servicios externos
          </AppText>
          <AppText variant="body" style={styles.text}>
            La aplicación puede mostrar números telefónicos, enlaces externos y
            un mensaje preelaborado que podrás usar si decides comunicarte con
            un contacto de tu confianza en caso de requerir ayuda.
          </AppText>
          <AppText variant="body" style={styles.text}>
            Estos permisos solo se activarán si tú los autorizas, y las
            llamadas, mensajes o interacciones con servicios externos dependerán
            exclusivamente de tu acción directa.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="subtitle" style={styles.subtitle}>
            ⚖️ Responsabilidad
          </AppText>
          <AppText variant="body" style={styles.text}>
            La información proporcionada es de carácter general y no genera
            responsabilidad sobre la atención o respuesta que brinden las
            entidades externas responsables de rutas de atención a violencias
            basadas en género.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="body" style={styles.highlight}>
            Al seleccionar la opción &quot;Acepto términos y condiciones&quot;,
            que has leído y comprendido este acuerdo, y que aceptas sus
            condiciones de uso y tratamiento de la información.
          </AppText>

          <AppText variant="h2" color="warning" center>
            Si no estás de acuerdo con estos términos, puedes cerrar la
            aplicación y no continuar con su uso.
          </AppText>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Checkbox y botón - solo habilitados cuando está al final */}
      <View style={[styles.footer, !isAtBottom && styles.footerDisabled]}>
        {!isAtBottom ? (
          <View style={styles.lockMessage}>
            <Ionicons
              name="arrow-down-circle"
              size={20}
              color={colors.lavender[400]}
            />
            <AppText style={styles.readMoreText}>
              Desliza hasta abajo para aceptar
            </AppText>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAccepted(!accepted)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.checkbox, accepted && styles.checkboxChecked]}
              >
                {accepted && (
                  <Ionicons name="checkmark" size={18} color={colors.white} />
                )}
              </View>
              <AppText variant="body" style={styles.checkboxLabel}>
                Acepto términos y condiciones
              </AppText>
            </TouchableOpacity>

            <Button
              onPress={handleAccept}
              size="xl"
              type="primary"
              disabled={!accepted}
            >
              Continuar
            </Button>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  subtitle: {
    marginBottom: 12,
    fontWeight: "600",
  },
  text: {
    color: colors.neutral[600],
    lineHeight: 24,
    marginBottom: 15,
  },
  bold: {
    fontWeight: "700",
  },
  highlight: {
    color: colors.neutral[600],
    lineHeight: 24,
    marginBottom: 15,
    backgroundColor: colors.lavender[50],
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.lavender[600],
  },
  acceptText: {
    lineHeight: 24,
    marginBottom: 15,
  },
  warning: {
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  footer: {
    padding: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lavender[100],
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.lavender[600],
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.lavender[600],
  },
  checkboxLabel: {
    fontSize: 16,
    flex: 1,
  },
  lockText: {
    marginLeft: 8,
    textAlign: "center",
  },
  lockMessage: {
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    padding: 12,
    gap: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
