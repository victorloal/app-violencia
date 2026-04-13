/**
 * Complete Place to Image Mapping - FIXED MISSING ENTRIES
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
  cti: require("../assets/images/places/cti.png"),
  defensoriadelpueblo: require("../assets/images/places/defensoriadelpueblo.png"),
  hospitalluisablanque: require("../assets/images/places/hospitalluisablanque.png"),
  ipslosangeles: require("../assets/images/places/ipslosangeles.png"),
  personeriabuenaventura: require("../assets/images/places/personeriabuenaventura.png"),
  personeriatumaco: require("../assets/images/places/personeriatumaco.png"),
};

/** Direct ID → Image - ALL places covered */
const placeToImage = {
  // Salud
  'hospital_san_andres': "hospital_san_andres",
  'ips_puente_medio': "ips_puente_medio",
  'divino_nino': "divino_nino",
  'clinica_santa_sofia': "clinicasantasofia",
  'ips_los_angeles': "ipslosangeles",
  'hospital_luis_ablanque_independencia': "hospitalluisablanque",
  'hospital_luis_ablanque_bellavista': "hospitalluisablanque",
  'hospital_luis_ablanque_distrital': "hospitalluisablanque",
  'hospital_luis_ablanque_modelo': "hospitalluisablanque",
  'hospital_departamental_buenaventura': "hospitalluisablanque",
  
  // Protección - FIXED Buenaventura variants
  'comisaria_tumaco': "comisaria",
  'comisaria_buenaventura': "comisaria",
  'policia_tumaco': "policia_nacional",
  'policia_buenaventura': "policia_nacional",     
  'icbf_tumaco': "icbf",
  'icbf_buenaventura': "icbf",                    
  
  // Justicia  
  'fiscalia_tumaco': "fiscalia",
  'fiscalia_buenaventura': "fiscalia",
  'cti_tumaco': "cti",
  'cti_buenaventura': "cti",
  'medicina_legal_tumaco': "medicina_legal",
  'medicina_legal_buenaventura': "medicina_legal",
  
  // Ministerio Público - FIXED
  'procuraduria_general_de_nacion_tumaco': "procuraduria",
  'procuraduria_general_de_nacion_buenaventura': "procuraduria",  
  'defensoria_del_pueblo_tumaco': "defensoriadelpueblo",
  'defensoria_del_pueblo_buenaventura': "defensoriadelpueblo",
  'personería_municipal_tumaco': "personeriatumaco",
  'personería_municipal_buenaventura': "personeriabuenaventura", 
};

export const getPlaceImageName = (placeId) => placeToImage[placeId] || null;

export const getPlaceImage = (placeId) => IMAGE_MAP[getPlaceImageName(placeId)] || null;

export const getCategoryImages = () => ({});

