# Imágenes de Lugares

Esta carpeta contiene los logos de las entidades de salud, justicia y protección.

## Estructura de Imágenes

### Hospitales y Clínicas (Logos Específicos)
Cada institución tiene su propio logo:

```
places/
├── hospital_san_andres.jpg         # Hospital San Andrés E.S.E.
├── ips_puente_medio.jpg            # IPS Puente del Medio
├── divino_nino.jpg                 # Centro Hospital Divino Niño
└── clinica_santa_sofia.jpg         # Clínica Santa Sofía del Pacífico
```

### Entidades Nacionales (Logos Reutilizables)
Estas entidades tienen el mismo logo para todas sus sedes:

```
├── fiscalia.jpg                    # Fiscalía General de la Nación
├── policia_judicial.jpg            # Policía Judicial (CTI, SIJIN, DIJIN)
├── medicina_legal.jpg              # Medicina Legal
├── comisaria.jpg                   # Comisaría de Familia
├── policia_nacional.jpg            # Policía Nacional
├── icbf.jpg                        # ICBF (Instituto Colombiano de Bienestar Familiar)
└── procuraduria.jpg                # Procuraduría General
```

## Cómo Usar

La configuración automáticamente cargará estas imágenes en las tarjetas de lugares.

Las imágenes se mostrarán en un contenedor de **80x80 píxeles** con:
- Fondo de color según la categoría
- Borde redondeado
- Efecto contain (mantiene proporción)

## Consideraciones

- **Formato**: JPG o PNG
- **Tamaño recomendado**: 200x200 px mínimo (se escalará automáticamente)
- **Proporción**: Preferiblemente cuadrado para mejor visualización
- **Nombre de archivo**: Debe coincidir exactamente con los nombres listados arriba
