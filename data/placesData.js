// data/placesData.js
import SaludIcon from "../assets/icons/Salud";
import ProteccionIcon from "../assets/icons/Protección";
import JusticiaIcon from "../assets/icons/Justicia";
import MPublicoIcon from "../assets/icons/ministerio_publico";
import { colors } from "../thema/colors";

import { getTypeConfig } from "../thema/placesTypes";

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
      descripcion:
        "Se encarga de investigar los posibles delitos, proteger a las víctimas y pedir medidas de protección para las mujeres que sufran de violencia, dentro o fuera de su familia.",
      latitud: 1.8189894663045683,
      longitud: -78.7624061865076,
    },
    {
      id: "fiscalia_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Fiscalía General de la Nación",
      horario: "Lunes a Viernes\n8:00am-12:00m\n1:00pm-5:00pm",
      direccion: "Calle 9 No 2 – 83",
      telefono: "122\n018000919748",
      tipo: "justicia",
      descripcion:
        "Se encarga de investigar los posibles delitos, proteger a las víctimas y pedir medidas de protección para las mujeres que sufran de violencia, dentro o fuera de su familia.",
      latitud: 3.8916622258165905,
      longitud: -77.07791747116414,
    },
    {
      id: "cti_tumaco",
      ciudad: "Tumaco",
      nombre: "Policía Judicial (CTI, SIJIN, DIJIN)",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "Esquina Avenida Férrea y Calle Mosquera",
      telefono: "3203024362",
      tipo: "justicia",
      descripcion:
        "Apoya a la fiscalía en la investigación de posibles delitos. Se encargan de recibir quejas y denuncias, realizan investigaciones urgentes, y si la víctima necesita un examen médico, la acompañan al centro de salud. ",
      latitud: 1.8086993080773277,
      longitud: -78.76656535582066,
    },
    {
      id: "cti_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Policía Judicial (CTI, SIJIN, DIJIN)",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "C 19 E N° 6 - 90",
      telefono: "3203046448",
      tipo: "justicia",
      descripcion:
        "Apoya a la fiscalía en la investigación de posibles delitos. Se encargan de recibir quejas y denuncias, realizan investigaciones urgentes, y si la víctima necesita un examen médico, la acompañan al centro de salud. ",
      latitud: 3.8856077515648635,
      longitud: -77.0599214,
    },
    {
      id: "medicina_legal_tumaco",
      ciudad: "Tumaco",
      nombre: "Instituto Nacional de Medicina Legal y Ciencias Forenses",
      horario:
        "Lunes a Domingo\n7:00am-7:00pm\nSabados, Domingos y Festivos\n7:00am-1:00pm",
      direccion:
        "Ciudadela Sector Nuevo Horizonte Enseguida del Centro Hospital Divino Niño",
      telefono: "602 8274174\n602 3980041",
      tipo: "justicia",
      descripcion:
        "Brindar apoyo técnico y científico a la justicia cuando las autoridades lo soliciten. Para ello, realiza exámenes forenses, evalúa lesiones y establece incapacidades, entre otros.",
      latitud: 1.7888627283933127,
      longitud: -78.78712048465654,
    },
    {
      id: "medicina_legal_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Instituto Nacional de Medicina Legal y Ciencias Forenses",
      horario:
        "Lunes a Domingo\n7:00am-7:00pm\nSabados, Domingos y Festivos\n7:00am-1:00pm",
      direccion: "Av. Simón Bolívar No.17-40",
      telefono: "602 8274174\n602 3980041",
      tipo: "justicia",
      descripcion:
        "Brindar apoyo técnico y científico a la justicia cuando las autoridades lo soliciten. Para ello, realiza exámenes forenses, evalúa lesiones y establece incapacidades, entre otros.",
      latitud: 3.881665598582891,
      longitud: -77.06437609444673,
    },
  ],

  protección: [
    {
      id: "comisaria_tumaco",
      ciudad: "Tumaco",
      nombre: "Comisaría de Familia",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-6:00pm",
      direccion: "Alcaldía Municipal de Tumaco, Cl. 11 #9-2",
      telefono: "(572)7276156",
      tipo: "protección",
      descripcion:
        "Establece medidas para cuidar, proteger y ayudar a las mujeres que son víctimas de violencia dentro de la familia, para que se respeten y se recuperen sus derechos. También busca que se vuelvan a garantizar los derechos de todas las personas de la familia cuando hay violencia en el hogar.",
      latitud: 1.807628096720489,
      longitud: -78.76544270423693,
    },
    {
      id: "comisaria_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Comisaría de Familia",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "Calle 4 sur Cra 73 esquina, Barrio Nueva Granada",
      telefono: "3170820627",
      tipo: "protección",
      descripcion:
        "Establece medidas para cuidar, proteger y ayudar a las mujeres que son víctimas de violencia dentro de la familia, para que se respeten y se recuperen sus derechos. También busca que se vuelvan a garantizar los derechos de todas las personas de la familia cuando hay violencia en el hogar.",
      latitud: 3.8636936635472394,
      longitud: -76.99349771772933,
    },
    {
      id: "policia_tumaco",
      ciudad: "Tumaco",
      nombre: "Policía Nacional - Tumaco",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "Esquina de la Avenida Férrea y la Calle Mosquera",
      telefono: "3203024362",
      tipo: "protección",
      descripcion:
        "Realiza tareas muy importantes para proteger y ayudar a las víctimas y para recibir denuncias. Por ejemplo, debe ir al lugar donde ocurrieron los hechos, acompañar a la víctima a centros de salud, a entidades de protección y de justicia, y ayudar a que se cumplan las medidas que se ordenen.",
      latitud: 1.808786449015912,
      longitud: -78.76618319074454,
    },
    {
      id: "policia_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Policía Nacional - Buenaventura",
      horario: "Lunes a Viernes\n8:00am-12:00m\n2:00pm-5:00pm",
      direccion: "C 19 E N° 6 - 90",
      telefono: "3203024362",
      tipo: "protección",
      descripcion:
        "Realiza tareas muy importantes para proteger y ayudar a las víctimas y para recibir denuncias. Por ejemplo, debe ir al lugar donde ocurrieron los hechos, acompañar a la víctima a centros de salud, a entidades de protección y de justicia, y ayudar a que se cumplan las medidas que se ordenen.",
      latitud: 3.8858646516974926,
      longitud: -77.05966390793913,
    },
    {
      id: "icbf_tumaco",
      ciudad: "Tumaco",
      nombre: "Instituto de bienestar familiar",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: "Parque Colón, San Andrés de Tumaco - Nariño",
      telefono: "601 4377630",
      tipo: "protección",
      descripcion:
        "Ayuda a garantizar la seguridad de los menores de edad. Alejándolos del peligro, los lleva a un sitio en el que estén seguros y acompaña con médicos y psicólogos para que no vulneren sus derechos. ",
      latitud: 1.8067567142886514,
      longitud: -78.76358307116412,
    },
    {
      id: "icbf_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Instituto de bienestar familiar",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: "Avenida Simón Bolívar Km 9 sobre la vía de ingreso Barrio",
      telefono: "3215744988",
      tipo: "protección",
      descripcion:
        "Ayuda a garantizar la seguridad de los menores de edad. Alejándolos del peligro, los lleva a un sitio en el que estén seguros y acompaña con médicos y psicólogos para que no vulneren sus derechos. ",
      latitud: 3.880748170538906,
      longitud: -77.01042880304402,
    },
  ],
  ministerio_publico: [
    {
      id: "procuraduria_general_de_nacion_tumaco",
      ciudad: "Tumaco",
      nombre: "Procuraduría General de Nación",
      horario: "Lunes a Viernes\n8:00am-12:00pm\n1:00pm-5:00pm",
      direccion: "Avenida Los Estudiantes, Sector La Y - TUMACO (NARINO)",
      telefono: "(572) 5878750",
      tipo: "ministerio_publico",
      descripcion:
        "Debe promover, cuidar y defender los derechos de las mujeres; vigilar que las que las entidades del estado cumplan con su trabajo para proteger sus derechos; participar en procesos judiciales para defenderlos; e investigar a los funcionarios públicos cuando no cumplen con sus deberes. ",
      latitud: 1.8162992212235298,
      longitud: -78.7636289580418,
    },
    {
      id: "procuraduria_general_de_nacion_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Procuraduría General de Nación",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: " Calle 6 # 5 - 11",
      telefono: "3215744988",
      tipo: "ministerio_publico",
      descripcion:
        "Debe promover, cuidar y defender los derechos de las mujeres; vigilar que las que las entidades del estado cumplan con su trabajo para proteger sus derechos; participar en procesos judiciales para defenderlos; e investigar a los funcionarios públicos cuando no cumplen con sus deberes. ",
      latitud: 3.889324893936952,
      longitud: -77.07458247952376,
    },
    {
      id: "defensoria_del_pueblo_tumaco",
      ciudad: "Tumaco",
      nombre: "Defensoría del Pueblo",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: "Barrio la Florida La Rada T-35-20 Casa 1 via al aeropuerto",
      telefono: "3223866321",
      tipo: "ministerio_publico",
      descripcion:
        "Debe promover, cuidar y defender los derechos de las mujeres; vigilar que las que las entidades del estado cumplan con su trabajo para proteger sus derechos; participar en procesos judiciales para defenderlos; e investigar a los funcionarios públicos cuando no cumplen con sus deberes. ",
      latitud: 1.816355213407996,
      longitud: -78.75348661534346,
    },
    {
      id: "defensoria_del_pueblo_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Defensoría del Pueblo",
      horario: "Lunes a Viernes\n8:00am-5:00pm",
      direccion: "Calle 1 No. 7 51 Barrio Pueblo Nuevo",
      telefono: "",
      tipo: "ministerio_publico",
      descripcion:
        "Debe promover, cuidar y defender los derechos de las mujeres; vigilar que las que las entidades del estado cumplan con su trabajo para proteger sus derechos; participar en procesos judiciales para defenderlos; e investigar a los funcionarios públicos cuando no cumplen con sus deberes. ",
      latitud: 3.884417202372204,
      longitud: -77.07540222883586,
    },
    {
      id: "personería_municipal_tumaco",
      ciudad: "Tumaco",
      nombre: "Personería municipal",
      horario: "Martes a Viernes\n8:00am-12:30pm\n2:00pm-6:00pm",
      direccion: "Cl. 11 #9-2, Tumaco, San Andres de Tumaco, Nariño",
      telefono: "(572)7271201",
      tipo: "ministerio_publico",
      descripcion:
        "Debe promover, cuidar y defender los derechos de las mujeres; vigilar que las que las entidades del estado cumplan con su trabajo para proteger sus derechos; participar en procesos judiciales para defenderlos; e investigar a los funcionarios públicos cuando no cumplen con sus deberes. ",
      latitud: 1.8076602672107762,
      longitud: -78.76582894232826,
    },
    {
      id: "personería_municipal_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Personería municipal",
      horario: "8:00am-12:00am\n2:00pm-6:00pm",
      direccion: "Calle segunda edificio el CAD, piso # 10",
      telefono: "3116073104\n2978928",
      tipo: "ministerio_publico",
      descripcion:
        "Debe promover, cuidar y defender los derechos de las mujeres; vigilar que las que las entidades del estado cumplan con su trabajo para proteger sus derechos; participar en procesos judiciales para defenderlos; e investigar a los funcionarios públicos cuando no cumplen con sus deberes. ",
      latitud: 3.889324893936952,
      longitud: -78.76582894232826,
    },
  ],

  salud: [
    {
      id: "hospital_san_andres",
      ciudad: "Tumaco",
      nombre: "Hospital San Andrés E.S.E.",
      horario: "24 horas",
      direccion: "Km 23 Inguapi del Carmen",
      telefono: "3203757591",
      tipo: "salud",
      descripcion:
        "Dar atención tanto física como psicológica a la persona; recoger y cuidar las pruebas necesarias sin que se pierdan o se alteren; avisar y coordinar con las diferentes entidades que deban intervenir para apoyar la recuperación y a los entes encargados de investigar los hechos; poner en marcha medidas de protección, asegurar que la persona reciba toda la ayuda que necesite y que la información sea clara.",
      latitud: 1.67234769600039,
      longitud: -78.75234138465652,
    },
    {
      id: "ips_puente_medio",
      ciudad: "Tumaco",
      nombre: "IPS Puente del Medio",
      horario: "24 horas",
      direccion:
        "sede 1: Calle Santander (diagonal a Cootranar) \n sede 2: Avenida Los Estudiantes (antigua Clínica Miramar).",
      telefono: "7271556",
      tipo: "salud",
      descripcion:
        "Entidad de segundo nivel de complejidad con sedes en la Calle Santander (diagonal a Cootranar) y Avenida Los Estudiantes (antigua Clínica Miramar). Brindar apoyo científico y técnico a la justicia cuando lo pidan fiscales, jueces, la policía judicial, la Defensoría del Pueblo u otras autoridades. Básicamente, se encarga de hacer evaluaciones médicas y peritajes, determinar incapacidades y aportar conceptos técnicos que ayuden a esclarecer los casos. ",
      latitud: 1.8077449316847172,
      longitud: -78.76428676931305,
    },
    {
      id: "divino_nino",
      ciudad: "Tumaco",
      nombre: "Centro Hospital Divino Niño E.S.E.",
      horario: "24 horas",
      direccion: "Barrio Nuevo Horizonte",
      telefono: "3027270404\n927271556",
      tipo: "salud",
      descripcion:
        "Dar atención tanto física como psicológica a la persona; recoger y cuidar las pruebas necesarias sin que se pierdan o se alteren; avisar y coordinar con las diferentes entidades que deban intervenir para apoyar la recuperación y a los entes encargados de investigar los hechos; poner en marcha medidas de protección, asegurar que la persona reciba toda la ayuda que necesite y que la información sea clara.",
      latitud: 1.788207639589229,
      longitud: -78.78844703862607,
    },
    {
      id: "ips_los_angeles",
      ciudad: "Tumaco",
      nombre: "INSTITUCIÓN PRESTADORA DE SERVICIOS DE SALUD LOS ANGELES IPS",
      horario: "7:00am-6:00pm",
      direccion: "Calle 11 #9-2, Tumaco, San Andres de Tumaco, Nariño",
      telefono: "7276712\n3175383956\n3205041354",
      tipo: "salud",
      descripcion:
        "Brindar apoyo científico y técnico a la justicia cuando lo pidan fiscales, jueces, la policía judicial, la Defensoría del Pueblo u otras autoridades. Básicamente, se encarga de hacer evaluaciones médicas y peritajes, determinar incapacidades y aportar conceptos técnicos que ayuden a esclarecer los casos.",
      latitud: 1.8135852452074122,
      longitud: -78.76634640553385,
    },
    {
      id: "hospital_luis_ablanque_independencia",
      ciudad: "Buenaventura",
      nombre: "Centro de Salud Independencia (Luis Ablanque De La Plata)",
      horario: "24 horas",
      direccion: "# 57ASN, Cl. 6 #120, Buenaventura, Valle del Cauca",
      telefono: "315 5476004",
      tipo: "salud",
      descripcion:
        "Dar atención tanto física como psicológica a la persona; recoger y cuidar las pruebas necesarias sin que se pierdan o se alteren; avisar y coordinar con las diferentes entidades que deban intervenir para apoyar la recuperación y a los entes encargados de investigar los hechos; poner en marcha medidas de protección, asegurar que la persona reciba toda la ayuda que necesite y que la información sea clara.",
      latitud: 3.8769602550930453,
      longitud: -77.00452831305293,
    },
    {
      id: "hospital_luis_ablanque_bellavista",
      ciudad: "Buenaventura",
      nombre: "Centro de Salud Bellavista (Hospital Luis Ablanque de la Plata)",
      horario: "24 horas",
      direccion: "Cra. 47 #22 a 2-84, Buenaventura, Valle del Cauca",
      telefono: "2437441",
      tipo: "salud",
      descripcion:
        "Dar atención tanto física como psicológica a la persona; recoger y cuidar las pruebas necesarias sin que se pierdan o se alteren; avisar y coordinar con las diferentes entidades que deban intervenir para apoyar la recuperación y a los entes encargados de investigar los hechos; poner en marcha medidas de protección, asegurar que la persona reciba toda la ayuda que necesite y que la información sea clara.",
      latitud: 3.8801200620969247,
      longitud: -77.02059020262098,
    },
    {
      id: "hospital_luis_ablanque_distrital",
      ciudad: "Buenaventura",
      nombre: "Hospital Distrital Luis Ablanque De La Plata",
      horario: "24 horas",
      direccion: "Cl. 5 #18-24, Buenaventura, Valle del Cauca",
      telefono: "",
      tipo: "salud",
      descripcion:
        "Dar atención tanto física como psicológica a la persona; recoger y cuidar las pruebas necesarias sin que se pierdan o se alteren; avisar y coordinar con las diferentes entidades que deban intervenir para apoyar la recuperación y a los entes encargados de investigar los hechos; poner en marcha medidas de protección, asegurar que la persona reciba toda la ayuda que necesite y que la información sea clara.",
      latitud: 3.8802699214913403,
      longitud: -77.02046145659054,
    },
    {
      id: "clinica_santa_sofia",
      ciudad: "Buenaventura",
      nombre: "Clínica Santa Sofía del Pacífico",
      horario: "24 horas",
      direccion: "Cra. 47 #42, Buenaventura, Valle del Cauca",
      telefono: "22421880",
      tipo: "salud",
      descripcion:
        "Dar atención tanto física como psicológica a la persona; recoger y cuidar las pruebas necesarias sin que se pierdan o se alteren; avisar y coordinar con las diferentes entidades que deban intervenir para apoyar la recuperación y a los entes encargados de investigar los hechos; poner en marcha medidas de protección, asegurar que la persona reciba toda la ayuda que necesite y que la información sea clara.",
      latitud: 3.8808727013535913,
      longitud: -77.02026621485183,
    },
    {
      id: "hospital_luis_ablanque_modelo",
      ciudad: "Buenaventura",
      nombre: "Puesto de salud El Modelo (hospital Luis Ablanque De La Plata)",
      horario: "24 horas",
      direccion: "Cl. 6 #1902, Buenaventura, Valle del Cauca",
      telefono: "",
      tipo: "salud",
      descripcion:
        "Dar atención tanto física como psicológica a la persona; recoger y cuidar las pruebas necesarias sin que se pierdan o se alteren; avisar y coordinar con las diferentes entidades que deban intervenir para apoyar la recuperación y a los entes encargados de investigar los hechos; poner en marcha medidas de protección, asegurar que la persona reciba toda la ayuda que necesite y que la información sea clara.",
      latitud: 3.896968244035304,
      longitud: -77.0302609494981,
    },
    {
      id: "hospital_departamental_buenaventura",
      ciudad: "Buenaventura",
      nombre: "Hospital Departamental De Buenaventura E.s.e",
      horario: "24 horas",
      direccion: "Av. Simón Bolívar #17-40, Buenaventura, Valle del Cauca",
      telefono: "",
      tipo: "salud",
      descripcion:
        "Dar atención tanto física como psicológica a la persona; recoger y cuidar las pruebas necesarias sin que se pierdan o se alteren; avisar y coordinar con las diferentes entidades que deban intervenir para apoyar la recuperación y a los entes encargados de investigar los hechos; poner en marcha medidas de protección, asegurar que la persona reciba toda la ayuda que necesite y que la información sea clara.",
      latitud: 3.87618058199835,
      longitud: -77.00463557473458,
    },
  ],
};

// Utilidades para los datos
export const getPlacesByType = (type) => placesData[type] || placesData.salud;

export const getCategoryInfo = (type) => {
  const config = getTypeConfig(type);
  return {
    title: config.title,
    description: config.description,
    icon: config.icon,
    isCustomIcon: config.isCustomIcon,
    color: config.primary, // mapping to existing usage if needed
    background: config.background,
  };
};

export const getAllPlaces = () => {
  return [
    ...placesData.salud,
    ...placesData.protección,
    ...placesData.justicia,
    ...(placesData.ministerio_publico || []),
  ];
};
