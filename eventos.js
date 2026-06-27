// =====================================================================
//  AKYRA — EVENTOS  (este es el ÚNICO archivo que tenés que editar)
// =====================================================================
//
//  CÓMO PUBLICAR UN EVENTO:
//    1. Copiá un bloque { ... } completo, incluida la coma del final.
//    2. Cambiá los datos.
//    3. Guardá el archivo. Listo: aparece en la web.
//
//  CÓMO SACAR UN EVENTO:
//    - Borrá su bloque  Ó  poné   visible: false
//
//  NOTAS:
//    - "fecha" va en formato  AAAA-MM-DD  (año-mes-día). Sirve para ordenar
//      y para que los eventos PASADOS se oculten solos.
//    - "fechaTexto" es lo que se MUESTRA (escribilo como quieras).
//    - "destacado: true"  -> resalta la tarjeta del evento (badge "Destacado").
//    - No hace falta tocar ningún otro archivo del sitio.
// =====================================================================

const AKYRA_EVENTOS = [

  // ===== CURSO DE IA — PREPARADO, TODAVÍA NO PUBLICADO =====
  // Para publicarlo LA SEMANA QUE VIENE (cuando esté la inscripción):
  //   1. Poné  visible: true
  //   2. Cargá la fecha real en "fecha" y "fechaTexto".
  // Con eso aparecen solos: la tarjeta del evento en la sección "Eventos"
  // y el FORMULARIO DE INSCRIPCIÓN en la web. No toques nada más.
  {
    titulo: "Curso de IA para Emprendedores y PyMES",
    fecha: "2026-07-25",                 // AAAA-MM-DD (PONÉ LA FECHA REAL)
    fechaTexto: "Julio 2026 · 2 encuentros",
    lugar: "Online en vivo",
    descripcion: "Empezá a usar la inteligencia artificial en tu negocio desde cero: herramientas concretas, ejemplos reales y cómo ahorrar horas todas las semanas. Sin tecnicismos.",
    cta_texto: "Quiero inscribirme",
    cta_link: "#inscripcion-curso",      // lleva al formulario de inscripción en la web
    inscripcion: true,                    // muestra el formulario de inscripción
    destacado: true,
    visible: false                        // <-- PONÉ true LA SEMANA QUE VIENE PARA PUBLICAR
  },

  // --- Plantilla para copiar y pegar un evento nuevo ---
  // {
  //   titulo: "Nombre del evento",
  //   fecha: "2026-08-15",
  //   fechaTexto: "15 de agosto · 18 h",
  //   lugar: "Online / San Rafael",
  //   descripcion: "Una o dos líneas que expliquen de qué se trata.",
  //   cta_texto: "Inscribirme",
  //   cta_link: "https://wa.me/5492604592193?text=Hola%20AKYRA%2C%20quiero%20info%20del%20evento",
  //   destacado: false,
  //   visible: true
  // },

];
