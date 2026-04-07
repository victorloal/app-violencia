// screens/PlacesScreen.jsx
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MainLayout from "../components/Layout/MainLayout";
import { colors } from "../thema/colors";
import { spacing } from "../styles/tokens";
import CategoryHeader from "../components/UI/CategoryHeader";

export default function PlacesScreen({ route }) {
  const { tipo = "salud" } = route.params || {};
  const { selectedType, places, categoryInfo, changeType } = usePlaces(tipo);

  return (
    <MainLayout>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {categoryInfo && (
          <CategoryHeader
            type={selectedType}
            title={categoryInfo.title}
            description={categoryInfo.description}
            icon={categoryInfo.icon}
          />
        )}

        <CategoryFilters
          selectedType={selectedType}
          onSelectType={changeType}
        />

        <View style={styles.listContainer}>
          {places.length > 0 ? (
            places.map((place) => <PlaceCard key={place.id} place={place} />)
          ) : (
            <EmptyState />
          )}
        </View>

        <HelpMessage />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender[50],
  },
  contentContainer: {
    paddingBottom: spacing.xxl,
  },
  listContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
});
