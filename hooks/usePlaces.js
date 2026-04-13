// hooks/usePlaces.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPlacesByType, getCategoryInfo } from "../data/placesData";

/**
 * Custom hook to manage places data and filtering by city
 * @param {string} initialType Initial category type
 * @returns {object} { selectedType, places, categoryInfo, changeType, isLoading, userRegion }
 */
export const usePlaces = (initialType = "salud") => {
  const [selectedType, setSelectedType] = useState(initialType);
  const [places, setPlaces] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRegion, setUserRegion] = useState(null);

  useEffect(() => {
    const loadUserDataAndFilter = async () => {
      try {
        setIsLoading(true);
        const userDataJson = await AsyncStorage.getItem("userData");
        let region = null;

        if (userDataJson) {
          const userData = JSON.parse(userDataJson);
          region = userData.region;
        }

        // Fallback: check for a standalone region key just in case
        if (!region) {
          region = await AsyncStorage.getItem("region");
        }

        // Only accept Tumaco or Buenaventura
        const validRegions = ["tumaco", "buenaventura"];
        const normalizedRegion = region ? region.trim().toLowerCase() : null;

        const finalRegion = validRegions.includes(normalizedRegion)
          ? region.trim()
          : null;
        setUserRegion(finalRegion);

        const allTypePlaces = getPlacesByType(selectedType);
        const info = getCategoryInfo(selectedType);

        // Filter by region if available
        const filteredPlaces = finalRegion
          ? allTypePlaces.filter(
              (p) =>
                p.ciudad &&
                p.ciudad.toLowerCase() === finalRegion.toLowerCase(),
            )
          : [];

        setPlaces(filteredPlaces);
        setCategoryInfo(info);
      } catch (error) {
        console.error("Error loading usePlaces data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserDataAndFilter();
  }, [selectedType]);

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
