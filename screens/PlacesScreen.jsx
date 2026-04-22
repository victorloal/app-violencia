// screens/PlacesScreen.jsx
import React from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import MainLayout from "../components/Layout/MainLayout";
import AppText from "../components/UI/AppText";
import Button from "../components/UI/Button";
import { colors } from "../thema/colors";
import { spacing } from "../styles/tokens";
import CategoryHeader from "../components/UI/CategoryHeader";
import CategoryFilters from "../components/UI/CategoryFilters";
import PlaceCard from "../components/UI/PlaceCard";
import EmptyState from "../components/UI/EmptyState";
import HelpMessage from "../components/UI/HelpMessage";
import { usePlaces } from "../hooks/usePlaces";
import { getTypeConfig } from "../thema/placesTypes";
import { Ionicons } from "@expo/vector-icons";

export default function PlacesScreen({ route, navigation }) {
  const { tipo = "salud", placeId = null } = route.params || {};
  const {
    selectedType,
    places,
    categoryInfo,
    changeType,
    isLoading,
    userRegion,
  } = usePlaces(tipo, placeId);

  const theme = getTypeConfig(selectedType);

  if (isLoading) {
    return (
      <MainLayout>
        <View
          style={styles.loadingContainer}
          accessible={true}
          accessibilityRole="progressbar"
          accessibilityLabel="Cargando lugares disponibles"
          accessibilityLiveRegion="polite"
        >
          <ActivityIndicator
            size="large"
            color={colors.lavender[600]}
            accessible={false}
            importantForAccessibility="no"
          />
          <AppText style={{ marginTop: spacing.md }}>
            Cargando lugares...
          </AppText>
        </View>
      </MainLayout>
    );
  }

  if (!userRegion) {
    return (
      <MainLayout>
        <View style={styles.emptyRegionContainer}>
          <View
            style={styles.iconCircle}
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden={true}
          >
            <Ionicons
              name="location-outline"
              size={64}
              color={colors.lavender[600]}
            />
          </View>

          <AppText
            variant="h2"
            align="center"
            style={styles.emptyTitle}
            accessibilityRole="header"
          >
            Región No Seleccionada
          </AppText>

          <AppText
            variant="body"
            align="center"
            style={styles.emptyDescription}
          >
            Para mostrarte los lugares más cercanos, necesitamos saber si te
            encuentras en Tumaco o Buenaventura.
          </AppText>

          <Button
            type="primary"
            size="xl"
            style={styles.actionButton}
            onPress={() => navigation.navigate("Form")}
            accessibilityLabel="Realizar encuesta"
            accessibilityHint="Abre el formulario para encontrar ayuda"
          >
            Realizar Encuesta
          </Button>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Header de categoría*/}
          {categoryInfo && (
            <View style={styles.categoryHeaderWrapper}
              importantForAccessibility="no"
              accessibilityElementsHidden={false}
            >
              <CategoryHeader
                type={selectedType}
                title={categoryInfo.title}
                description={categoryInfo.description}
                icon={categoryInfo.icon}
              />
            </View>
          )}

          {/* Filtros */}
          <View style={styles.filtersWrapper}>
            <CategoryFilters
              selectedType={selectedType}
              onSelectType={changeType}
            />
          </View>

          {/* Lista de lugares */}
          <View style={styles.listContainer}
            accessibilityRole="list"
          >
            {places.length > 0 ? (
              places.map((place, index) => (
                <View
                  key={place.id}
                  style={styles.placeCardWrapper}
                  accessible={false}
                  importantForAccessibility="no"
                  accessibilityElementsHidden={false}
                >
                  <PlaceCard
                    place={place}
                    accessibilityLabel={
                      `Lugar ${index + 1} de ${places.length}: ${place.nombre}.` +
                      (place.direccion ? ` Dirección: ${place.direccion}.` : "") +
                      (place.telefono ? ` Teléfono: ${place.telefono}.` : "")
                    }
                    accessibilityRole="button"
                    accessibilityHint="Toca dos veces para ver más detalles"
                  />
                </View>
              ))
            ) : (
              
              <EmptyState type={selectedType} />
            )}
          </View>

          <View style={styles.helpMessageWrapper}>
            <HelpMessage type={selectedType} />
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender[50],
  },
  filters: {
    height: "50%",
  },
  contentContainer: {
    paddingBottom: spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  emptyRegionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.lavender[100],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    marginBottom: spacing.md,
    color: colors.lavender[900],
  },
  emptyDescription: {
    marginBottom: spacing.xxl,
    color: colors.neutral[600],
    paddingHorizontal: spacing.xl,
  },
  actionButton: {
    width: "100%",
  },
  categoryHeaderWrapper: {
    // sin cambios visuales
  },
  filtersWrapper: {
    // sin cambios visuales
  },
  placeCardWrapper: {
    // sin cambios visuales
  },
  helpMessageWrapper: {
    // sin cambios visuales
  },
});
