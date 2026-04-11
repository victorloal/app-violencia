/**
 * Place Images - Direct mapping for protección places
 */
const IMAGE_MAP = {
  hospital_san_andres: require("../assets/images/places/hospital_san_andres.png"),
  ips_puente_medio: require("../assets/images/places/ips_puente_medio.png"),
  divino_nino: require("../assets/images/places/divino_nino.png"),
  clinicasantasofia: require("../assets/images/places/clinicasantasofia.png"),
  fiscalia: require("../assets/images/places/fiscalia.png"),
  comisaria: require("../assets/images/places/comisaria.png"),
  policia_nacional: require("../assets/images/places/policia_nacional.png"),
  policia_judicial: require("../assets/images/places/policia_judicial.png"),
  medicina_legal: require("../assets/images/places/medicina_legal.png"),
  icbf: require("../assets/images/places/icbf.png"),
  procuraduria: require("../assets/images/places/procuraduria.png"),
};

/** Direct mapping for every place.id */
const placeToImage = {
  // Salud
  'hospital_san_andres': "hospital_san_andres",
  'ips_puente_medio': "ips_puente_medio",
  'divino_nino': "divino_nino",
  'clinica_santa_sofia': "clinicasantasofia",
  
  // Protección - DIRECT MAPPING
  'comisaria_tumaco': "comisaria",
  'comisaria_buenaventura': "comisaria",
  'policia_tumaco': "policia_nacional",
  'icbf_tumaco': "icbf",
  'procuraduria_tumaco': "procuraduria",
  
  // Justicia
  'fiscalia_tumaco': "fiscalia",
  'fiscalia_buenaventura': "fiscalia",
  'cti_tumaco': "policia_judicial",
  'cti_buenaventura': "policia_judicial",
  'medicina_legal_tumaco': "medicina_legal",
  'medicina_legal_buenaventura': "medicina_legal",
};

export const getPlaceImageName = (placeId) => placeToImage[placeId] || null;

export const getPlaceImage = (placeId) => {
  const imageName = getPlaceImageName(placeId);
  return IMAGE_MAP[imageName] || null;
};

export const getCategoryImages = () => ({ 
  proteccion: { comisaria, policia_nacional, icbf, procuraduria } 
});
