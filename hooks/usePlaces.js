// hooks/usePlaces.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPlacesByType, getCategoryInfo } from "../data/placesData";

/**
 * Custom hook to manage places data and filtering by city
 * @param {string} initialType Initial category type
 * @param {string} placeId Optional specific place ID to prioritize (appears first, doesn't hide others)
 * @returns {object} { selectedType, places, categoryInfo, changeType, isLoading, userRegion }
 */
export const usePlaces = (initialType = "salud", placeId = null) => {
  const [selectedType, setSelectedType] = useState(initialType);
  const [places, setPlaces] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRegion, setUserRegion] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadUserData = async () => {
      try {
        setIsLoading(true);

        // ── 1. Leer región del usuario ──────────────────────────────────────
        let region = null;
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson) {
          const userData = JSON.parse(userDataJson);
          region = userData.region;
        }

        // Fallback: check for a standalone region key just in case
        if (!region) {
          region = await AsyncStorage.getItem("region");
        }

        // ── 2. Normalizar región ────────────────────────────────────────────
        const capitalize = (s) =>
          s ? s.trim().charAt(0).toUpperCase() + s.trim().slice(1).toLowerCase() : null;

        const VALID_REGIONS = ["Tumaco", "Buenaventura"];
        const normalizedRegion = capitalize(region);

        const finalRegion = VALID_REGIONS.includes(normalizedRegion)
          ? normalizedRegion
          : null;

        if (cancelled) return;  
        setUserRegion(finalRegion);

        // ── 3. Cargar lugares (ASYNC — puede venir de API o fallback) ───────
        const allTypePlaces = await getPlacesByType(selectedType, finalRegion);

        const info = getCategoryInfo(selectedType);

        if (cancelled) return;

        // ── 4. Filtrar por región ────────────────────────────────────────────
        let filteredPlaces = finalRegion
          ? allTypePlaces.filter(
              (p) =>
                p.ciudad &&
                p.ciudad.toLowerCase() === finalRegion.toLowerCase(),
            )
          : allTypePlaces;

        // ── 5. Priorizar placeId específico ──────────────────────────────────
        if (placeId && filteredPlaces.length > 0) {
          const idx = filteredPlaces.findIndex((p) => p.id === placeId);
          if (idx !== -1) {
            const [specific] = filteredPlaces.splice(idx, 1);
            filteredPlaces.unshift(specific);
          }
        }

        setPlaces(filteredPlaces);
        setCategoryInfo(info);
      } catch (error) {
        console.error("Error loading usePlaces data:", error);
        setPlaces([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadUserData();
    return () => { cancelled = true; };
  }, [selectedType, placeId]);

  const changeType = (type) => {
    setSelectedType(type);
  };

  return {
    selectedType,
    places,
    categoryInfo,
    changeType,
    isLoading,
    userRegion,
  };
};
