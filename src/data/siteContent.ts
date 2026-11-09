import type { PhotoId } from './photos';

export type RoutePath =
  | '/'
  | '/sobre-mi'
  | '/escuela'
  | '/escuela/diagnostico'
  | '/escuela/narrativa-comercial'
  | '/escuela/vender-sin-vender'
  | '/escuela/conexiones-que-conectan'
  | '/radio'
  | '/radio/auspicio-pyme'
  | '/radio/auspicio-empresa'
  | '/speaker'
  | '/blog'
  | '/libro'
  | '/privacidad'
  | '/terminos'
  | '/contacto';

export interface ServiceTestimonial {
  name: string;
  role: string;
  quote: string;
  shift: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetailData {
  slug: RoutePath;
  shortTitle: string;
  categoryKicker: string;
  painQuestion: string;
  goldenRuleLabel: string;
  goldenRuleText: string;
  achievementsTitle: string;
  achievements: string[];
  includesList?: string[];
  bonuses?: string[];
  scheduleNotice?: {
    text: string;
    placeholderLabel: string;
  };
  stepsTitle: string;
  steps: ServiceStep[];
  regularPrice: string;
  regularPriceLabel: string;
  preferentialPrice: string;
  preferentialPriceLabel: string;
  preferentialCondition: string;
  paymentNote?: string;
  guaranteeTitle: string;
  guaranteeText: string;
  testimonials: ServiceTestimonial[];
  faqs: ServiceFAQ[];
}

export const ESCUELA_CARDS: {
  slug: RoutePath;
  /** Foto de encabezado de la card y de la ficha (decorativa). */
  image: PhotoId;
  index: string;
  title: string;
  hook: string;
  outcomes: string[];
  regularPrice: string;
  preferentialPrice: string;
  preferentialTag: string;
}[] = [
  {
    slug: '/escuela/diagnostico',
    image: 'esc-diagnostica',
    index: '01',
    title: 'Sesión Diagnóstica',
    hook: '“¿Tienes mentorías pero sigues estancada? No es falta de capacidad, es falta de claridad.”',
    outcomes: ['Detecta tu bloqueo real', 'Ordena tus ideas', 'Recupera el foco'],
    regularPrice: '$50.000',
    preferentialPrice: '$27.000',
    preferentialTag: 'Tarifa preferencial ecosistemas',
  },
  {
    slug: '/escuela/narrativa-comercial',
    image: 'esc-narrativa',
    index: '02',
    title: 'Narrativa Comercial',
    hook: '“¿Te preguntan a qué te dedicas y te cuesta encontrar las palabras?”',
    outcomes: ['Capta atención', 'Conecta emocionalmente', 'Activa el “efecto imán”'],
    regularPrice: '$80.000',
    preferentialPrice: '$55.000',
    preferentialTag: 'Tarifa preferencial ecosistemas',
  },
  {
    slug: '/escuela/vender-sin-vender',
    image: 'esc-vender',
    index: '03',
    title: 'Vender sin Vender (curso grupal)',
    hook: '“El curso práctico para personas emprendedoras que quieren vender sin forzar, conectar sin manipular y cerrar con confianza.”',
    outcomes: ['Identifica el problema real', 'Comunica tu propuesta', 'Conecta y cierra'],
    regularPrice: '$457.000',
    preferentialPrice: '$330.000',
    preferentialTag: 'Tarifa preferencial ecosistemas',
  },
  {
    slug: '/escuela/conexiones-que-conectan',
    image: 'esc-conexiones',
    index: '04',
    title: 'Networking: Conexiones que Conectan',
    hook: '“10º Taller de Networking presencial en Concepción para emprendedores, terapeutas, coaches y profesionales independientes.”',
    outcomes: ['Amplía tu red', 'Atrae clientes', 'Rompe el hielo con confianza'],
    regularPrice: '$50.000',
    preferentialPrice: '$25.000',
    preferentialTag: 'Si ya participaste antes',
  },
];

export const SERVICE_DETAILS: Record<
  | '/escuela/diagnostico'
  | '/escuela/narrativa-comercial'
  | '/escuela/vender-sin-vender'
  | '/escuela/conexiones-que-conectan',
  ServiceDetailData
> = {
  '/escuela/diagnostico': {
    slug: '/escuela/diagnostico',
    shortTitle: 'Diagnóstico Comercial',
    categoryKicker: 'FICHA 01 · SESIÓN 1 A 1 DE 60 MINUTOS',
    painQuestion:
      '¿Cómo identificar el bloqueo exacto que estanca tus ventas en 60 minutos, sin seguir improvisando y perdiendo dinero?',
    goldenRuleLabel: 'REGLA DE ORO DEL DIAGNÓSTICO',
    goldenRuleText:
      '“El punto de partida de cualquier estrategia requiere tres acciones: qué seguir haciendo, qué dejar de hacer, y qué hacer que no he hecho aún.”',
    achievementsTitle: 'Lo que vas a lograr en tu Sesión Diagnóstica',
    achievements: [
      'Detectar tu bloqueo comercial real sin seguir probando tácticas al azar.',
      'Ordenar tus ideas y definir con precisión qué mantener, qué descartar y qué activar.',
      'Recuperar el foco estratégico con acciones concretas adaptadas a tu etapa actual.',
    ],
    stepsTitle: 'Cómo funciona el Diagnóstico Comercial',
    steps: [
      {
        number: '01',
        title: 'Auditoría previa',
        description:
          'Completas un formulario breve antes de la sesión para radiografiar el estado actual de tu negocio, oferta y canal de ventas.',
      },
      {
        number: '02',
        title: 'Sesión de Diagnóstico 1 a 1 (60 min por Meet)',
        description:
          'Revisamos en vivo dónde se está fugando la atención de tus clientes y qué ajuste específico necesita tu propuesta.',
      },
      {
        number: '03',
        title: 'Plan de Ruta',
        description:
          'Te llevas una hoja de ruta clara con pasos específicos sobre qué seguir haciendo, qué dejar de hacer y qué implementar desde hoy.',
      },
    ],
    regularPrice: '$50.000',
    regularPriceLabel: 'Valor regular',
    preferentialPrice: '$27.000',
    preferentialPriceLabel: 'Precio preferencial ecosistemas',
    preferentialCondition:
      'Exclusivo para integrantes de Ecosistema Biobío, Ecosistema LA, Ecosistema Arauco, Rediversas y Emprendedoras en Acción.',
    guaranteeTitle: 'Garantía de Claridad de 20 Minutos',
    guaranteeText:
      'Si en los primeros 20 minutos de la sesión sientes que el diagnóstico no aporta valor real a tu negocio, te realizamos la devolución del 100% de forma inmediata, sin preguntas.',
    testimonials: [
      {
        name: 'Javiera Flores',
        role: '@ritualestetica.cl',
        quote:
          'Antes me sentía perdida con mis ventas y desconectada de mis clientes. No lograba comunicar bien lo que ofrecía ni conectar con lo que mis clientas realmente necesitaban. Sentía que me faltaban herramientas y claridad, y todo lo que hacía lo hacía sin una estrategia clara. Con el acompañamiento de Geri y su método, aprendí a usar las palabras reales de mis clientas para vender. Eso marcó una gran diferencia: comencé a concretar más ventas y a mantenerlas en el tiempo. Pude ordenar mis ideas, darles sentido y entender cómo comunicar mi valor de forma efectiva.',
        shift: 'Testimonio real, publicado en geraldinemanriquez.com',
      },
    ],
    faqs: [
      {
        question: '¿Cómo sé si necesito la Sesión Diagnóstica o Narrativa Comercial?',
        answer:
          'Si sientes que haces muchas cosas pero no sabes dónde está el freno de tus ventas, parte por el Diagnóstico Comercial de 60 minutos. Ahí definiremos exactamente qué seguir haciendo, qué dejar de hacer y qué activar.',
      },
      {
        question: '¿Cómo acredito mi pertenencia a los ecosistemas con precio preferencial?',
        answer:
          'Al completar tu pago e inscripción en la auditoría previa, indicas a cuál de las redes perteneces (Ecosistema Biobío, Ecosistema LA, Ecosistema Arauco, Rediversas o Emprendedoras en Acción).',
      },
      {
        question: '¿Cómo se hace efectiva la garantía de los primeros 20 minutos?',
        answer:
          'Es literal: si transcurridos los primeros 20 minutos por Google Meet sientes que la sesión no te está entregando claridad real, me lo indicas en el momento y gestionamos el reembolso del 100% sin preguntas.',
      },
    ],
  },

  '/escuela/narrativa-comercial': {
    slug: '/escuela/narrativa-comercial',
    shortTitle: 'Narrativa Comercial',
    categoryKicker: 'FICHA 02 · GUION ESTRATÉGICO + ACOMPAÑAMIENTO SOS',
    painQuestion:
      '¿Te cuesta explicar a qué te dedicas? Deja de perder clientes por falta de claridad.',
    goldenRuleLabel: 'PROMESA DE LA SESIÓN',
    goldenRuleText:
      '“Cuando encuentras las palabras exactas del problema de tu cliente, captas su atención de inmediato, conectas emocionalmente y activas el efecto imán.”',
    achievementsTitle: 'Lo que vas a lograr con tu Narrativa Comercial',
    achievements: [
      'Capta la atención desde los primeros segundos cuando te pregunten a qué te dedicas.',
      'Conecta emocionalmente hablando desde el problema vivido por tu cliente y no desde el tecnicismo.',
      'Activa el “efecto imán” con un guion comercial listo para usar en reuniones, redes y networking.',
    ],
    bonuses: [
      'Bono 1: Acompañamiento por WhatsApp durante 7 días continuos (incluso soporte SOS antes de una reunión o cierre).',
      'Bono 2: Material de apoyo descargable con plantillas y guiones listos para adaptar.',
    ],
    stepsTitle: 'Plan de 3 pasos para construir tu Narrativa Comercial',
    steps: [
      {
        number: '01',
        title: 'Diagnóstico Express',
        description:
          'Respondes 3 preguntas clave al momento de agendar para enfocar tu propuesta y perfil de cliente ideal.',
      },
      {
        number: '02',
        title: 'Sesión Estratégica de 60 min por Meet',
        description:
          'Construimos mano a mano tu narrativa desde el enfoque de La Retina Emprendedora, traduciendo tu servicio al lenguaje de tu cliente.',
      },
      {
        number: '03',
        title: 'Implementación (guion listo para usar)',
        description:
          'Sales con tu estructura verbal lista para aplicar y 7 días continuos de acompañamiento por WhatsApp (incluso SOS) para ajustarla en terreno.',
      },
    ],
    regularPrice: '$80.000',
    regularPriceLabel: 'Valor regular',
    preferentialPrice: '$55.000',
    preferentialPriceLabel: 'Precio preferencial ecosistemas',
    preferentialCondition:
      'Exclusivo para integrantes de Ecosistema Biobío, Ecosistema LA, Ecosistema Arauco, Rediversas y Emprendedoras en Acción.',
    guaranteeTitle: 'Garantía de Claridad de 20 Minutos',
    guaranteeText:
      'Si en los primeros 20 minutos sientes que la sesión no aporta valor real a tu narrativa comercial, te devolvemos el 100% de tu inversión de forma inmediata, sin preguntas.',
    testimonials: [
      {
        name: 'Valeria Arancibia',
        role: 'Terapeuta, Barras Access y Tarot',
        quote:
          'Como terapeuta, antes me costaba mucho ofrecer mis servicios. Sin embargo, desde que aplico el enfoque de la Retina, todo cambió: cuando alguien me pregunta qué hago, se lo explico desde su propio problema y usando sus mismas palabras. Ahora la conversación fluye de forma natural, orgánica y sin ninguna presión.',
        shift: 'Testimonio real, publicado en geraldinemanriquez.com',
      },
    ],
    faqs: [
      {
        question: '¿En qué consiste el acompañamiento por WhatsApp de 7 días (incluso SOS)?',
        answer:
          'Durante los 7 días posteriores a nuestra sesión estratégica puedes enviarme tus audios, textos o dudas urgentes (“SOS”) antes de responderle a un prospecto para afinar juntos tu mensaje.',
      },
      {
        question: '¿Entregas plantillas escritas además de la sesión en vivo?',
        answer:
          'Sí. Recibes tu guion listo para usar junto con material de apoyo que incluye plantillas y estructuras de narrativa comercial.',
      },
      {
        question: '¿Aplica también la garantía del 100% en los primeros 20 minutos?',
        answer:
          'Por supuesto. Si en los primeros 20 minutos de la Sesión Estratégica sientes que no aporta valor a tu negocio, realizamos la devolución del 100% inmediata y sin preguntas.',
      },
    ],
  },

  '/escuela/vender-sin-vender': {
    slug: '/escuela/vender-sin-vender',
    shortTitle: 'Vender sin Vender — Curso Grupal',
    categoryKicker: 'FICHA 03 · PROGRAMA GRUPAL EN VIVO + 30 DÍAS DE MENTORÍA',
    painQuestion:
      'El curso práctico para personas emprendedoras que quieren vender sin forzar, conectar sin manipular y cerrar con confianza.',
    goldenRuleLabel: 'ENFOQUE DEL PROGRAMA GRUPAL',
    goldenRuleText:
      '“Identifica el problema real de tu cliente, comunica tu propuesta con autenticidad, conecta desde la empatía y cierra ventas sin sentir que estás presionando.”',
    achievementsTitle: 'Lo que vas a lograr en Vender sin Vender',
    achievements: [
      'Identificar el problema real por el que tus clientes están dispuestos a tomar acción hoy.',
      'Comunicar tu propuesta de valor con seguridad, sin tecnicismos ni discursos forzados.',
      'Conectar genuinamente en cada conversación comercial y cerrar ventas con confianza.',
    ],
    includesList: [
      '3 clases online en vivo (quedan grabadas si no puedes asistir en directo).',
      '30 días de acompañamiento continuo por WhatsApp.',
      'Asesoría directa en situaciones reales de venta que enfrentes durante el mes.',
      'Sesión de chequeo 1 mes después de finalizado el curso para consolidar resultados.',
      'Resumen ejecutivo de cada clase.',
      'Planilla Excel de descubrimientos para mapear el lenguaje real de tus clientes.',
    ],
    scheduleNotice: {
      text: 'Próxima cohorte: fecha por confirmar. Escríbenos por WhatsApp y te avisamos primero.',
      placeholderLabel: 'Calendario por confirmar',
    },
    stepsTitle: 'Cómo funciona el entrenamiento Vender sin Vender',
    steps: [
      {
        number: '01',
        title: '3 Clases Online en Vivo + Planilla Excel de Descubrimientos',
        description:
          'Entrenamiento práctico en grupo reducido donde trabajas con el resumen de clase y la planilla Excel de descubrimientos sobre tu propio negocio.',
      },
      {
        number: '02',
        title: '30 Días de Acompañamiento y Asesoría en Situaciones Reales',
        description:
          'Durante un mes completo tienes soporte por WhatsApp para revisar conversaciones reales con prospectos, destrabar objeciones y ajustar tu cierre.',
      },
      {
        number: '03',
        title: 'Sesión de Chequeo 1 Mes Después',
        description:
          'Nos volvemos a reunir un mes después para auditar cómo estás aplicando el método, medir avances y resolver cualquier bloqueo en terreno.',
      },
    ],
    regularPrice: '$457.000',
    regularPriceLabel: 'Valor regular',
    preferentialPrice: '$330.000',
    preferentialPriceLabel: 'Precio preferencial ecosistemas',
    preferentialCondition:
      'Exclusivo para integrantes de Rediversas, Ecosistema Biobío, Ecosistema LA y Corparauco.',
    guaranteeTitle: 'Respaldo Total de Aprendizaje y Aplicación',
    guaranteeText:
      'Ninguna pregunta queda sin respuesta: cuentas con grabación completa de las 3 clases, soporte prioritario dentro de 48 horas, 30 días de asesoría en ventas reales y sesión de chequeo un mes después.',
    testimonials: [
      {
        name: 'Ignacio Neira',
        role: 'Agencia de Marketing',
        quote:
          'Antes era una persona insegura, llena de miedos. Sentía que vender no era para mí. Hasta que aprendí a escuchar de verdad a mis clientes y a usar su propia información para mostrarles cómo podía ayudarlos. Empecé a generar ventas de forma natural, sin presionar, sin sentirme incómodo.',
        shift: 'Testimonio real, publicado en geraldinemanriquez.com',
      },
      {
        name: 'María Paz Molina',
        role: '@paz._molina',
        quote:
          'Antes me enredaba en mis propias palabras. Me costaba conectar con mis clientes porque hablaba desde lo que yo pensaba, no desde lo que ellos necesitaban. Con este proceso aprendí a ponerme en el lugar de mi cliente, a entender lo que realmente está buscando y a hablar su mismo idioma. Eso lo cambió todo. Empezaron a llegar más clientes, con perfiles distintos, más versátiles, y lo mejor: me volví a encantar con lo que hago.',
        shift: 'Testimonio real, publicado en geraldinemanriquez.com',
      },
    ],
    faqs: [
      {
        question: '¿Qué pasa si me pierdo una clase en vivo?',
        answer:
          'Tienes acceso completo a la grabación de la clase más el resumen escrito y 48 horas de soporte directo para resolver cualquier duda sobre los ejercicios.',
      },
      {
        question: '¿Cómo funciona el acompañamiento por WhatsApp durante los 30 días?',
        answer:
          'Recibes asesoría directa sobre situaciones reales de venta: puedes compartir qué te dijo un cliente, revisar tu propuesta antes de enviarla y destrabar cierres en tiempo real.',
      },
      {
        question: '¿Qué pasa si me cuesta aplicar el método después de las clases?',
        answer:
          'El programa incluye una sesión de chequeo 1 mes después de terminar las clases, diseñada específicamente para revisar tu implementación y corregir el rumbo.',
      },
      {
        question: '¿Qué pasa si no puedo ir al evento de Networking presencial?',
        answer:
          'Existe versión online disponible para que puedas vivir la experiencia práctica de conexión y entrenamiento sin importar en qué ciudad te encuentres.',
      },
    ],
  },

  '/escuela/conexiones-que-conectan': {
    slug: '/escuela/conexiones-que-conectan',
    shortTitle: 'Conexiones que Conectan — Networking',
    categoryKicker: 'FICHA 04 · 10º TALLER DE NETWORKING PRESENCIAL EN CONCEPCIÓN',
    painQuestion:
      '10º Taller de Networking: amplía tu red, atrae clientes y rompe el hielo con confianza sin repartir tarjetas que nadie lee.',
    goldenRuleLabel: 'DIRIGIDO A',
    goldenRuleText:
      '“Emprendedores, terapeutas, coaches y profesionales independientes que buscan hacer alianzas reales y presentar su negocio despertando curiosidad genuina.”',
    achievementsTitle: 'Qué vivirás en Conexiones que Conectan',
    achievements: [
      'Generar curiosidad genuina en prospectos y potenciales aliados desde el primer minuto.',
      'Incorporar herramientas prácticas de marca personal aplicadas al networking presencial.',
      'Participar en rondas de networking personalizadas y estructuradas para evitar silencios incómodos.',
      'Ganar visibilidad desde el inicio del encuentro y practicar un cierre con CTA propio.',
      'Compartir un espacio cercano de conversación y coffee break con profesionales de Concepción.',
    ],
    scheduleNotice: {
      text: 'Próxima edición: fecha por confirmar. Siempre en Concepción, de 10:00 a 12:30 hrs (incluye coffee break).',
      placeholderLabel: 'Fecha por confirmar',
    },
    stepsTitle: 'Cómo se vive la experiencia en 3 momentos',
    steps: [
      {
        number: '01',
        title: 'Visibilidad desde el inicio & Herramientas de Marca Personal',
        description:
          'Antes de iniciar las rondas, entrenas cómo presentarte desde el problema que resuelves para generar curiosidad inmediata.',
      },
      {
        number: '02',
        title: 'Rondas de Networking Personalizadas',
        description:
          'Dinámicas guiadas donde conectas con emprendedores, terapeutas, coaches y profesionales independientes en un entorno cuidado.',
      },
      {
        number: '03',
        title: 'Cierre con CTA Propio & Coffee Break',
        description:
          'Practicas tu llamado a la acción (CTA) propio y consolidas vínculos y colaboraciones durante el coffee break.',
      },
    ],
    regularPrice: '$50.000',
    regularPriceLabel: 'Ticket general',
    preferentialPrice: '$25.000',
    preferentialPriceLabel: 'Ticket ex-participantes (si ya participaste antes)',
    preferentialCondition:
      'Valor preferencial de $25.000 exclusivo si ya participaste en una edición anterior de Conexiones que Conectan.',
    paymentNote: 'Se acepta todo medio de pago.',
    guaranteeTitle: 'Networking Guiado y Con Propósito',
    guaranteeText:
      'Un formato 100% facilitado por Geraldine Manríquez para que ninguna persona quede aislada: saldrás con nuevas conexiones reales, tu pitch entrenado y un llamado a la acción claro.',
    testimonials: [
      {
        name: 'María Paz Molina',
        role: '@paz._molina',
        quote:
          'Participar en Conexiones que Conectan me permitió romper el hielo con total confianza, presentar lo que hago despertando interés real y generar vínculos genuinos con otras emprendedoras de Concepción.',
        shift: 'Testimonio real, publicado en geraldinemanriquez.com',
      },
    ],
    faqs: [
      {
        question: '¿Es necesario tener experiencia previa haciendo networking?',
        answer:
          'No. Precisamente porque a muchos profesionales independientes y terapeutas les incomoda el networking tradicional, las rondas son guiadas paso a paso para romper el hielo con naturalidad.',
      },
      {
        question: '¿Cómo accedo al ticket de $25.000?',
        answer:
          'Si ya participaste en cualquiera de las ediciones anteriores de Conexiones que Conectan, seleccionas directamente la opción “Ticket ex-participantes ($25.000)” al pagar con Flow.',
      },
      {
        question: '¿Qué medios de pago se aceptan?',
        answer:
          'Se acepta todo medio de pago a través de Flow: Transferencia Electrónica y tarjetas de crédito o débito, 100% seguro.',
      },
    ],
  },
};

export interface RadioPlanTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export const RADIO_PLANS: Record<'pyme' | 'empresa', RadioPlanTier[]> = {
  pyme: [
    {
      name: 'Plan Conecta',
      price: '$170.000',
      features: [
        '3 cortinas radiales por programa',
        '2 historias semanales en redes sociales',
        '1 mención interactuada en vivo',
        'Concurso quincenal o mensual con la audiencia',
      ],
    },
    {
      name: 'Plan Impacta',
      price: '$250.000',
      recommended: true,
      features: [
        'Todo lo incluido en el Plan Conecta',
        '+ 1 mención en vivo extra por programa',
        '+ 1 entrevista mensual de 50 minutos en estudio',
      ],
    },
    {
      name: 'Plan Lidera',
      price: '$350.000',
      features: [
        'Todo lo incluido en el Plan Impacta',
        '+ 1 entrevista extra mensual de 50 minutos (2 entrevistas al mes en total)',
        'Posición destacada como auspiciador del bloque',
      ],
    },
  ],
  empresa: [
    {
      name: 'Plan Conecta',
      price: '$500.000',
      features: [
        '3 cortinas radiales por emisión',
        '1 mención en vivo de 30 seg x 3 días a la semana (Lun-Mié-Vie)',
        'Mención interactuada por la conductora',
        'Concurso con auditores del Gran Concepción',
      ],
    },
    {
      name: 'Plan Impacta',
      price: '$770.000',
      recommended: true,
      features: [
        'Todo lo incluido en el Plan Conecta Empresa',
        '+ Mención en vivo extra en cada jornada',
        '+ 1 entrevista mensual de 50 minutos en estudio',
      ],
    },
    {
      name: 'Plan Lidera',
      price: '$1.100.000',
      features: [
        'Todo lo incluido en el Plan Impacta Empresa',
        '+ Entrevista extra mensual de 50 minutos (2 entrevistas de fondo al mes)',
        'Presencia corporativa prioritaria en Aprende a Emprender',
      ],
    },
  ],
};

/**
 * Enlaces y datos de contacto reales de Geraldine Manríquez, levantados de
 * geraldinemanriquez.com (sitio vivo) y de la ficha de la aliada en el baúl.
 * Fuente única — no hardcodear estos valores en otro lugar.
 */
export const SITE_LINKS = {
  whatsapp: 'https://wa.me/56959571507',
  whatsappDisplay: '+56 9 5957 1507',
  email: 'hola@geraldinemanriquez.com',
  social: {
    Instagram: 'https://instagram.com/geraldinemanriquezplaza',
    LinkedIn: 'https://www.linkedin.com/in/geraldinemanriquezplaza',
    YouTube: 'https://www.youtube.com/@geraldinemanriquezplaza',
    TikTok: 'https://www.tiktok.com/@geraldinemanriquezplaza',
    Facebook: 'https://web.facebook.com/geraldinemanriquezplaza/',
    Spotify: 'https://open.spotify.com/show/0CDXxDx16FFI9kfr9Gr6kg',
  },
  bookBuscalibre: 'https://www.buscalibre.cl/libros/search/?q=geraldine+manriquez+plaza',
  // Playlist entregada por Cristian el 29-oct-2026.
  radioYouTubePlaylist: 'https://www.youtube.com/watch?v=eRyexugXTqs&list=PL6Z8t3mS8vaTUDtCw2ocTuCkEFyfUqJ3P',
  radioListaEsperaForm: 'https://forms.gle/k4d7pQH9irQ3WPee6',
  diagnosticoHubspotForm: 'https://ug7oc.share.hsforms.com/2fbpk6PsRR3eNPipbB2bF8Q',
  radioHorario: 'Lunes, Miércoles y Viernes de 18:00 a 19:00 hrs',
  radioEmisora: 'Radio Femenina de Concepción (44 años al aire, asociada a ARCHI)',
  radioAlcance: '25.000–45.000 auditores por emisión en el Gran Concepción',
  radioInvitados: '+150 invitados entrevistados · 2 meses de lista de espera',
  newsletterHubspotForm: undefined as string | undefined,
  calendario: undefined as string | undefined,
};

export interface HeroSlide {
  id: string;
  kicker: string;
  title: string;
  emphasis: string;
  subtitle: string;
  primaryCta: { label: string; route: RoutePath | '#diagnostico' };
  secondaryCta?: { label: string; route: RoutePath };
  /** Foto de la slide: se anima junto con el texto. `quote` va sobre la foto; `caption` debajo. */
  image: { photo: PhotoId; fit?: 'cover' | 'contain'; quote: string; caption: string };
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'retina',
    kicker: 'Profesora de Emprendedores',
    title: 'Deja de explicar tu técnica: destraba tu negocio nombrando',
    emphasis: 'el problema real de tu cliente.',
    subtitle:
      'Ayudarte a destrabar tu negocio, estructurar tus ideas y dominar una narrativa comercial que atraiga a tu cliente ideal.',
    primaryCta: { label: 'Encuentra tu programa', route: '/escuela' },
    secondaryCta: { label: 'Conoce a Geraldine', route: '/sobre-mi' },
    image: {
      photo: 'home-hero-retina',
      quote: '“Vender no es convencer a la fuerza; es saber traducir lo que haces al dolor que tu cliente ya quiere resolver.”',
      caption: 'Geraldine Manríquez · Concepción, Biobío',
    },
  },
  {
    id: 'vender-sin-vender',
    kicker: 'Próxima edición: por confirmar',
    title: 'Vender sin Vender',
    emphasis: 'conecta sin forzar.',
    subtitle: 'Conoce el curso y revisa sus contenidos en la Escuela de Ventas.',
    primaryCta: { label: 'Conocer el curso', route: '/escuela/vender-sin-vender' },
    secondaryCta: { label: 'Ver todos los servicios', route: '/escuela' },
    image: {
      photo: 'home-hero-vender',
      quote: 'Vender sin Vender · conoce el curso',
      caption: 'Geraldine Manríquez · Vender sin Vender',
    },
  },
  {
    id: 'libro',
    kicker: 'Coautora',
    title: 'Revolución Emprendedora',
    emphasis: 'un libro para crear sin agotarte.',
    subtitle: 'Coautora del libro «Revolución Emprendedora».',
    primaryCta: { label: 'Conocer el libro', route: '/libro' },
    secondaryCta: { label: 'Sobre Geraldine', route: '/sobre-mi' },
    image: {
      photo: 'home-hero-libro',
      quote: 'Revolución Emprendedora · conoce el libro',
      caption: 'Revolución Emprendedora',
    },
  },
];

export interface SpeakerGalleryItem {
  photo: PhotoId;
  title: string;
}

export const SPEAKER_GALLERY: SpeakerGalleryItem[] = [
  { photo: 'spk-g-escenario', title: 'En el escenario' },
  { photo: 'spk-g-retrato', title: 'Retrato en el auditorio' },
  { photo: 'spk-g-auditorio', title: 'Durante una charla' },
  { photo: 'spk-g-ecosistema', title: 'Junto al atril' },
  { photo: 'spk-g-atril', title: 'Presentando' },
  { photo: 'spk-g-perfil', title: 'De perfil en el atril' },
];

/**
 * Organizaciones aliadas. `url` solo cuando está verificado contra el sitio
 * real; las demás quedan sin url (texto plano) hasta que Geraldine confirme
 * el link o el logo (pregunta 3 del brief de WhatsApp).
 */
export const PARTNER_ORGS: { name: string; url?: string }[] = [
  { name: 'Ecosistema Biobío', url: 'https://ecosistemabiobio.cl/' },
  { name: 'Rediversas', url: 'https://www.rediversas.cl' },
  { name: 'CorpArauco' },
  { name: 'Ecosistema LA' },
  { name: 'CIDERE' },
  { name: 'Etmday' },
  { name: 'Openbeauchef' },
];
