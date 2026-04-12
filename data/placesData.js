// data/placesData.js
import SaludIcon from "../assets/icons/Salud";
import ProteccionIcon from "../assets/icons/Protección";
import JusticiaIcon from "../assets/icons/Justicia";
import { colors } from "../thema/colors";

export const placesData = {
  justicia: [
    {
      id: "fiscalia_tumaco",
      ciudad: "Tumaco",
      nombre: "Fiscalía General de la Nación",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-6:00pm",
      direccion: "Avenida de los Estudiantes Edificio Capid",
      telefono: "122\n018000919748",
      tipo: "justicia",
      descripcion: "Investigación de delitos y protección a víctimas",
      latitud: 1.818968691554103,
      longitud: -78.76235520834712,
    },
    {
      id: "fiscalia_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Fiscalía General de la Nación",
      horario: "Lunes a Viernes\n8:00am-12:00m\n1:00pm-5:00pm",
      direccion: "Calle 9 No 2 – 83",
      telefono: "122\n018000919748",
      tipo: "justicia",
      descripcion: "Atención de denuncias y procesos judiciales",
      latitud: 3.880623,
      longitud: -77.030792,
    },
    {
      id: "cti_tumaco",
      nombre: "Policía Judicial (CTI, SIJIN, DIJIN) - Tumaco",
      horario: "Lun-Vie 8:00am-12:00m / 2:00pm-5:00pm",
      direccion: "Esquina Avenida Férrea y Calle Mosquera",
      telefono: "3203024362",
      tipo: "justicia",
      descripcion: "Recepción de denuncias e investigación de delitos",
      latitud: 1.808169,
      longitud: -78.766972,
    },
    {
      id: "cti_buenaventura",
      nombre: "Policía Judicial (CTI, SIJIN, DIJIN) - Buenaventura",
      horario: "Lun-Vie 8:00am-12:00m / 2:00pm-5:00pm",
      direccion: "C 19 E N° 6 - 90",
      telefono: "3203046448",
      tipo: "justicia",
      descripcion: "Apoyo a fiscalía en investigaciones",
      latitud: 3.880623,
      longitud: -77.030792,
    },
    {
      id: "medicina_legal_tumaco",
      nombre: "Medicina Legal - Tumaco",
      horario: "Lun-Dom 7:00am-7:00pm",
      direccion: "Ciudadela Nuevo Horizonte",
      telefono: "(2) 7271018",
      tipo: "justicia",
      descripcion: "Evaluaciones forenses y apoyo a la justicia",
      latitud: 1.805283,
      longitud: -78.767761,
    },
    {
      id: "medicina_legal_buenaventura",
      nombre: "Medicina Legal - Buenaventura",
      horario: "Lun-Dom 7:00am-7:00pm",
      direccion: "Av. Simón Bolívar No.17-40",
      telefono: "(2) 2416623",
      tipo: "justicia",
      descripcion: "Exámenes forenses y peritajes",
      latitud: 3.880623,
      longitud: -77.030792,
    },
  ],

  protección: [
    {
      id: "comisaria_tumaco",
      nombre: "Comisaría de Familia - Tumaco",
      horario: "Lun-Vie 8:00am-12:00m / 2:00pm-6:00pm",
      direccion: "Cl. 11 #9-2, Alcaldía Municipal",
      telefono: "(572)7276156",
      tipo: "protección",
      descripcion: "Protección a víctimas de violencia intrafamiliar",
      latitud: 1.805742,
      longitud: -78.763045,
    },
    {
      id: "comisaria_buenaventura",
      nombre: "Comisaría de Familia - Buenaventura",
      horario: "Lun-Vie 8:00am-12:00m / 2:00pm-5:00pm",
      direccion: "Calle 4 sur Cra 73 esquina",
      telefono: "3170820627",
      tipo: "protección",
      descripcion: "Atención a víctimas de violencia familiar",
      latitud: 3.880623,
      longitud: -77.030792,
    },
    {
      id: "policia_tumaco",
      nombre: "Policía Nacional - Tumaco",
      horario: "Lun-Vie 8:00am-12:00m / 2:00pm-5:00pm",
      direccion: "Esquina Avenida Férrea y Calle Mosquera",
      telefono: "3203024362",
      tipo: "protección",
      descripcion: "Atención de emergencias y acompañamiento",
      latitud: 1.808169,
      longitud: -78.766972,
    },
    {
      id: "icbf_tumaco",
      nombre: "ICBF - Tumaco",
      horario: "Lun-Vie 8:00am-5:00pm",
      direccion: "Parque Colón",
      telefono: "6014377630",
      tipo: "protección",
      descripcion: "Protección de menores y apoyo psicosocial",
      latitud: 1.808299,
      longitud: -78.763082,
    },
    {
      id: "procuraduria_tumaco",
      nombre: "Procuraduría General - Tumaco",
      horario: "Lun-Vie 8:00am-5:00pm",
      direccion: "Avenida Los Estudiantes",
      telefono: "(+57 2) 5878750",
      tipo: "protección",
      descripcion: "Defensa de derechos y control institucional",
      latitud: 1.819607,
      longitud: -78.762673,
    },
  ],

  salud: [
    {
      id: "hospital_san_andres",
      nombre: "Hospital San Andrés E.S.E.",
      horario: "24 horas",
      direccion: "Km 23 Inguapi del Carmen",
      telefono: "3203757591",
      tipo: "salud",
      descripcion: "Atención médica de urgencias",
      latitud: 1.829356,
      longitud: -78.762277,
    },
    {
      id: "ips_puente_medio",
      nombre: "IPS Puente del Medio",
      horario: "24 horas",
      direccion: "Calle Santander / Av. Los Estudiantes",
      telefono: "7271556",
      tipo: "salud",
      descripcion: "Atención médica integral",
      latitud: 1.816858,
      longitud: -78.765321,
    },
    {
      id: "divino_nino",
      nombre: "Centro Hospital Divino Niño",
      horario: "24 horas",
      direccion: "Barrio Nuevo Horizonte",
      telefono: "3027270404",
      tipo: "salud",
      descripcion: "Servicios hospitalarios",
      latitud: 1.805283,
      longitud: -78.767761,
    },
    {
      id: "clinica_santa_sofia",
      nombre: "Clínica Santa Sofía del Pacífico",
      horario: "24 horas",
      direccion: "Cra. 47 #42, Buenaventura",
      telefono: "22421880",
      tipo: "salud",
      descripcion: "Atención médica especializada",
      latitud: 3.894026,
      longitud: -77.041804,
    },
  ],
};

// Utilidades para los datos
export const getPlacesByType = (type) => placesData[type] || placesData.salud;

export const getCategoryInfo = (type) => {
  const categories = {
    salud: {
      title: "Centros de Salud",
      description: "Atención médica y servicios de salud",
      icon: <SaludIcon />,
      color: "violet",
      background: colors.violet[50],
    },
    protección: {
      title: "Entidades de Protección",
      description: "Protección y apoyo integral",
      icon: <ProteccionIcon />,
      color: "magenta",
      background: colors.magenta[50],
    },
    justicia: {
      title: "Entidades de Justicia",
      description: "Asesoría legal y denuncias",
      icon: <JusticiaIcon />,
      color: "lime",
      background: colors.lime[50],
    },
  };
  return categories[type] || categories.salud;
};

export const getAllPlaces = () => {
  return [
    ...placesData.salud,
    ...placesData.protección,
    ...placesData.justicia,
  ];
};
