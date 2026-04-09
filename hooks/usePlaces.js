import { useState, useEffect } from "react";
import { getPlacesByType, getCategoryInfo } from "../data/placesData";

/**
 * Custom hook to manage places data and filtering
 * @param {string} initialType Initial category type
 * @returns {object} { selectedType, places, categoryInfo, changeType }
 */
export const usePlaces = (initialType = "salud") => {
  const [selectedType, setSelectedType] = useState(initialType);
  const [places, setPlaces] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);

  useEffect(() => {
    // Update places and category info when the selected type changes
    const filteredPlaces = getPlacesByType(selectedType);
    const info = getCategoryInfo(selectedType);

    setPlaces(filteredPlaces);
    setCategoryInfo(info);
  }, [selectedType]);

  const changeType = (type) => {
    setSelectedType(type);
  };

  return {
    selectedType,
    places,
    categoryInfo,
    changeType,
  };
};
