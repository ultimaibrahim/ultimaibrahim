/* Shared data module — Ultima Ibrahim portfolio.
   Exposes window.PortfolioData with ES + EN strings + structured arrays.
   Hidden/inactive projects (bonjour) kept in the array, gated by `hidden: true`. */

(function () {
  const PROFILE = {
    brand: 'Ultima Ibrahim',
    handle: 'ultimaibrahim',
    initials: 'UI',
    realName: 'Ibrahim García',
    realNameFull: 'Saul Ibrahim García Ochoa',
    age: 19,
    city: 'Guadalajara · MX',
    domain: 'ultimaibrahim.dev',
    email: 'helloultima@ultimaibrahim.dev',
    github: 'github.com/ultimaibrahim',
    githubHandle: '@ultimaibrahim',
    linkedin: 'linkedin.com/in/ultimaibrahim',
    twitter: '@ultimaibrahim',
  };

  const HERO = {
    eyebrow: {
      es: 'Data Product Developer · GDL, MX',
      en: 'Data Product Developer · GDL, MX',
    },
    headline: { es: 'Ultima', en: 'Ultima' },
    headlineStrong: { es: 'Ibrahim', en: 'Ibrahim' },
    sub: {
      es: 'Construyo herramientas internas que convierten datos crudos en decisiones operativas. Del scraper al dashboard, del JSON al insight.',
      en: 'I build internal tools that turn raw data into operational decisions. From scraper to dashboard, from JSON to insight.',
    },
    role: {
      es: 'Estudiante de IA & Ciencia de Datos · CUGDL',
      en: 'AI & Data Science undergraduate · CUGDL',
    },
  };

  const ABOUT = {
    es: [
      'Estudio Licenciatura en Inteligencia Artificial y Ciencia de los Datos en el CUCEI, después de tres años en CECyTE Jalisco para Altas Capacidades como técnico en electrónica.',
      'Lo que me mueve no son los modelos exóticos sino las herramientas que la gente usa de verdad. Cada pieza que envío vive en producción: un reporte que un gerente revisa el lunes, un dashboard que un dueño abre antes de junta.',
      'Trabajo desde Guadalajara en proyectos para operación real — todos partieron de una pregunta simple: ¿dónde se está perdiendo información que ya existe?',
    ],
    en: [
      'I study an undergraduate degree in Artificial Intelligence and Data Science at CUCEI, after three years at CECyTE Jalisco for High Capacities as an electronics technician.',
      "What drives me isn't exotic models but the tools people actually use. Every piece I ship lives in production: a report a manager reviews on Monday, a dashboard an owner opens before a meeting.",
      'I work from Guadalajara on projects for real operations — all of them started from a simple question: where is information already being lost?',
    ],
  };

  const STATS = [
    { val: '4.89', label: { es: 'Rating promedio étoile', en: 'étoile avg. rating' }, tone: 'gold' },
    { val: '615',  label: { es: 'Reseñas consolidadas', en: 'Reviews consolidated' }, tone: 'plain' },
    { val: '9',    label: { es: 'Sucursales en uso', en: 'Locations in use' }, tone: 'green' },
    { val: '2',    label: { es: 'Productos en producción', en: 'Products in production' }, tone: 'green' },
  ];

  // ME-centric stats for the Overview page — about who I am, not project KPIs.
  const PERSONAL = {
    facts: [
      { val: '19',     label: { es: 'Años',           en: 'Years old' }, tone: 'plain' },
      { val: '2021',   label: { es: 'En tech desde', en: 'In tech since' }, tone: 'cool' },
      { val: 'ES · EN', label: { es: 'Idiomas',     en: 'Languages' }, tone: 'mint' },
      { val: 'GDL · MX', label: { es: 'Base',         en: 'Based in' }, tone: 'plain' },
    ],
    now: {
      es: [
        ['Estudiando',  'Lic. IA & Ciencia de Datos · CUGDL'],
        ['Construyendo', 'étoile · LCP GDL'],
        ['Leyendo',     'Designing Data-Intensive Applications'],
        ['Aprendiendo', 'PyTorch · SQL avanzado · React'],
      ],
      en: [
        ['Studying',    'B.Sc. AI & Data Science · CUGDL'],
        ['Building',    'étoile · LCP GDL'],
        ['Reading',     'Designing Data-Intensive Applications'],
        ['Learning',    'PyTorch · advanced SQL · React'],
      ],
    },
    handles: {
      es: 'También conocido como Saul Ibrahim García Ochoa.',
      en: 'Also known as Saul Ibrahim García Ochoa.',
    },
  };

  const PROJECTS = [
    {
      id: 'etoile',
      privacy: 'demo-on-request', // public summary; live demo / data under NDA
      name: 'étoile',
      tagline: {
        es: 'Pipeline de datos & Modelo NLP · Supabase & Netlify Functions',
        en: 'Data pipeline & NLP Model · Supabase & Netlify Functions',
      },
      status: { es: 'Live', en: 'Live' },
      statusTone: 'green',
      year: '2026',
      idx: '01',
      summary: {
        es: 'Pipeline de datos y modelo de Machine Learning (NLP) que extrae reseñas de Google Maps (Apify), clasifica el sentimiento del texto (positivo, neutro, negativo) y sincroniza registros en Supabase con Netlify Serverless Functions y autenticación por cookies.',
        en: 'Data pipeline and Machine Learning (NLP) model that scrapes Google Maps reviews (Apify), classifies text sentiment (positive, neutral, negative), and syncs records to Supabase with Netlify Serverless Functions and cookie-based session auth.',
      },
      bullets: {
        es: [
          'Clasificación automática de sentimiento (NLP) para categorizar la experiencia del cliente a partir de reseñas de texto libre.',
          'Ingesta automatizada a Supabase vía fetch asíncrono y funciones serverless de Netlify.',
          'Autenticación segura persistida con tokens almacenados en Cookies (SameSite/Secure).',
          'Dashboard dinámico en Vanilla JS que computa promedios históricos y tendencias por sucursal.',
          'Monitoreo activo para alertar a los gerentes regionales sobre calificaciones negativas al instante.',
        ],
        en: [
          'Automatic sentiment classification (NLP) to categorize customer experience from free-form text reviews.',
          'Automated Supabase ingestion via async fetch and Netlify Serverless Functions.',
          'Secure persisted session authentication using Cookie-stored tokens (SameSite/Secure).',
          'Dynamic Vanilla JS dashboard that computes historical averages and trends per location.',
          'Active monitoring to alert regional managers of negative ratings instantly.',
        ],
      },
      stack: ['NLP Sentiment Analysis', 'Supabase', 'Netlify Functions', 'Apify', 'Vanilla JS ES6', 'Chart.js', 'CSS Grid'],
      metrics: [
        { v: '245+', l: { es: 'Reseñas/mes', en: 'Reviews/mo' } },
        { v: '8',    l: { es: 'Sucursales', en: 'Locations' } },
        { v: '4.89', l: { es: 'Rating prom.', en: 'Avg. rating' } },
        { v: 'Supabase', l: { es: 'Database', en: 'Database' } },
      ],
      // monthly counts ene–may 2026 used in sparklines / chart
      series: [184, 94, 112, 104, 121],
      seriesLabels: {
        es: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY'],
        en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
      },
      accent: 'green',
    },
    {
      id: 'reporte',
      privacy: 'demo-on-request',
      name: { es: 'Reporte de Venta Semanal', en: 'Weekly Sales Report' },
      tagline: {
        es: 'Template operativo · 9 sucursales LCP GDL',
        en: 'Operational template · 9 LCP GDL locations',
      },
      status: { es: 'Live', en: 'Live' },
      statusTone: 'green',
      year: '2026',
      idx: '02',
      summary: {
        es: 'Formato estandarizado de reporte semanal. Traduce el corte de caja diario en KPIs operativos automáticos, comparables entre sucursales.',
        en: 'Standardized weekly report format. Translates the daily cash-close into automatic operational KPIs, comparable across locations.',
      },
      bullets: {
        es: [
          'KPIs automáticos: ticket promedio, TRX, % delivery por plataforma.',
          'Avance vs. meta mensual visible en tiempo real cada lunes.',
          'Hallazgo cruzado: la crepa de Nutella representa 30–50% de la venta de crepas según el día.',
          'Entrega obligatoria los lunes — adoptado por toda la región GDL.',
        ],
        en: [
          'Automatic KPIs: avg. ticket, TRX, % delivery per platform.',
          'Progress vs. monthly target visible in real time every Monday.',
          'Cross-finding: Nutella crêpes represent 30–50% of crêpe sales depending on the day.',
          'Mandatory weekly delivery — adopted by the entire GDL region.',
        ],
      },
      stack: ['Excel', 'KPI design', 'Power Query', 'Formula automation'],
      metrics: [
        { v: '9',  l: { es: 'Sucursales', en: 'Locations' } },
        { v: '0',  l: { es: 'Procesos nuevos', en: 'New processes' } },
        { v: 'Lun.', l: { es: 'Deadline', en: 'Deadline' } },
        { v: 'Live', l: { es: 'Status', en: 'Status' } },
      ],
      series: [4, 6, 7, 8, 9],
      seriesLabels: {
        es: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY'],
        en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
      },
      accent: 'gold',
    },
    {
      id: 'mise',
      privacy: 'internal',
      name: 'mise',
      tagline: {
        es: 'Inventario y Pedidos Diarios · Google Apps Script Suite',
        en: 'Inventory and Daily Orders · Google Apps Script Suite',
      },
      status: { es: 'Live', en: 'Live' },
      statusTone: 'green',
      year: '2026',
      idx: '03',
      summary: {
        es: 'Suite de automatización transaccional basada en Google Apps Script que unifica el control de inventario (KARDEX) en bodegas centrales con los pedidos móviles en tiempo real de las sucursales.',
        en: 'Transactional automation suite powered by Google Apps Script that unifies central warehouse inventory (KARDEX) control with real-time branch mobile orders.',
      },
      bullets: {
        es: [
          'Control transaccional diario de entradas/salidas (ENT/SAL) en KARDEX.',
          'Sincronización robusta con detección automática de adiciones de última hora (naranja brillante).',
          'Vistas móviles optimizadas para lectura rápida y surtido eficiente en almacén.',
          'Registro de log de auditoría (`LOG`) de operaciones y bypass de UI para compatibilidad total.',
        ],
        en: [
          'Daily transactional input/output (ENT/SAL) control in KARDEX sheets.',
          'Robust synchronization with auto-detection of last-minute additions (bright orange highlight).',
          'Optimized mobile views for fast reading and efficient warehouse sorting.',
          'Operations audit log (`LOG`) and UI bypass for full mobile device compatibility.',
        ],
      },
      stack: ['Google Apps Script', 'Google Sheets API', 'JavaScript', 'Kardex Design', 'Automation Triggers'],
      metrics: [
        { v: '131', l: { es: 'Productos', en: 'Products' } },
        { v: '9', l: { es: 'Sucursales', en: 'Locations' } },
        { v: 'Log', l: { es: 'Auditoría', en: 'Audit Log' } },
        { v: '24/7', l: { es: 'Sincronía', en: 'Sync Time' } },
      ],
      series: [110, 115, 120, 128, 131],
      seriesLabels: {
        es: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY'],
        en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
      },
      accent: 'cool',
    },
  ];

  const STACK = [
    { name: 'Python', pct: 80, tone: 'green' },
    { name: 'JavaScript', pct: 72, tone: 'green' },
    { name: 'HTML / CSS', pct: 85, tone: 'gold' },
    { name: 'n8n · Apify', pct: 70, tone: 'gold' },
    { name: 'Ingeniería de Características', pct: 80, tone: 'green' },
    { name: 'Automatización de Pipelines', pct: 82, tone: 'green' },
    { name: 'Google Apps Script', pct: 55, tone: 'dim' },
    { name: 'Product design', pct: 75, tone: 'green' },
  ];

  const EDUCATION = [
    {
      period: '2024 – ' + ({ es: 'actual', en: 'present' }).es,
      periodI18n: { es: '2024 – actual', en: '2024 – present' },
      degree: {
        es: 'Lic. en Inteligencia Artificial y Ciencia de los Datos',
        en: 'B.Sc. in Artificial Intelligence and Data Science',
      },
      inst: { es: 'Centro Universitario de Ciencias Exactas e Ingenierías · UdeG', en: 'CUCEI · University of Guadalajara' },
    },
    {
      period: '2021 – 2024',
      periodI18n: { es: '2021 – 2024', en: '2021 – 2024' },
      degree: {
        es: 'Técnico en Electrónica',
        en: 'Electronics Technician',
      },
      inst: { es: 'CECyTE Jalisco para Altas Capacidades', en: 'CECyTE Jalisco for High Capacities' },
    },
  ];

  const ACHIEVEMENTS = [
    {
      date: { es: 'May 2024', en: 'May 2024' },
      title: { es: 'Medalla de plata', en: 'Silver medal' },
      sub: { es: 'XVII Infomatrix Iberoamérica · SOLACYT', en: 'XVII Infomatrix Iberoamerica · SOLACYT' },
      tag: 'tech',
    },
    {
      date: { es: 'May 2024', en: 'May 2024' },
      title: { es: 'Medalla de plata', en: 'Silver medal' },
      sub: { es: 'Concurso Estatal de Proyectos · CECyTE', en: 'State Student Projects Contest · CECyTE' },
      tag: 'tech',
    },
    {
      date: { es: 'May 2024', en: 'May 2024' },
      title: { es: 'Reconocimiento académico', en: 'Academic recognition' },
      sub: { es: 'LXIII Legislatura del Congreso de Jalisco', en: 'LXIII Legislature of the Jalisco Congress' },
      tag: 'civic',
    },
    {
      date: { es: 'Ago 2023', en: 'Aug 2023' },
      title: { es: 'Subcampeón', en: 'Runner-up' },
      sub: { es: '13° Torneo Estatal de Debate Mar Adentro', en: '13th State Debate Tournament · Mar Adentro' },
      tag: 'debate',
    },
    {
      date: { es: 'Nov 2022', en: 'Nov 2022' },
      title: { es: '1er lugar (equipo)', en: '1st place (team)' },
      sub: { es: '4ta Olimpiada Estatal de Ciencias Experimentales', en: '4th State Olympiad of Experimental Sciences' },
      tag: 'tech',
    },
    {
      date: { es: 'Nov 2021', en: 'Nov 2021' },
      title: { es: 'Expositor reconocido', en: 'Recognized exhibitor' },
      sub: { es: 'XI Código Ciencia Occidente · SOLACYT', en: 'XI Código Ciencia Occidente · SOLACYT' },
      tag: 'tech',
    },
  ];

  const TIMELINE = [
    {
      date: { es: 'May 2026', en: 'May 2026' },
      title: { es: 'étoile — beta launch', en: 'étoile — beta launch' },
      sub: { es: 'LCP GDL · 8 sucursales en cobertura', en: 'LCP GDL · 8 locations covered' },
      active: true,
    },
    {
      date: { es: 'Mar 2026', en: 'Mar 2026' },
      title: { es: 'Reporte semanal adoptado', en: 'Weekly report adopted' },
      sub: { es: 'Estándar región GDL · 9 sucursales', en: 'GDL region standard · 9 locations' },
    },
    {
      date: { es: 'Ene 2026', en: 'Jan 2026' },
      title: { es: 'Pipeline de datos LCP', en: 'LCP data pipeline' },
      sub: { es: 'Apify · Python · n8n', en: 'Apify · Python · n8n' },
    },
    {
      date: { es: '2025', en: '2025' },
      title: { es: 'Primeros proyectos web', en: 'First web projects' },
      sub: { es: 'Exploración frontend', en: 'Frontend exploration' },
    },
    {
      date: { es: '2024', en: '2024' },
      title: { es: 'Ingreso · Lic. IA, CUGDL', en: 'Enrolled · AI B.Sc., CUGDL' },
      sub: { es: 'Centro Universitario de Guadalajara', en: 'University Center of Guadalajara' },
    },
  ];

  const LANGUAGES = [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' }, pct: 100 },
    { name: { es: 'Inglés', en: 'English' }, level: { es: 'B2 · ELASH II 139', en: 'B2 · ELASH II 139' }, pct: 70 },
  ];

  const NOTES = [
    {
      idx: '#03',
      date: { es: '15 May 2026', en: 'May 15, 2026' },
      title: {
        es: 'Por qué prefiero construir herramientas internas',
        en: 'Why I prefer building internal tools',
      },
      excerpt: {
        es: 'La gente usa lo que les resuelve el lunes a las 9. No el SaaS premiado en Twitter.',
        en: "People use what solves Monday at 9 a.m. Not the SaaS that wins Twitter awards.",
      },
      content: {
        es: 'Las herramientas internas son el verdadero motor de la productividad en las organizaciones. A menudo nos obsesionamos con el último framework de moda o bases de datos hipercomplejas, pero lo que el usuario final valora es que la aplicación cargue al instante y que los datos ingresados no se pierdan. Prefiero enfocarme en resolver el problema del lunes a las 9:00 AM, construyendo software robusto y pragmático.',
        en: 'Internal tools are the real engine of productivity in organizations. We often obsess over the latest trendy framework or hyper-complex databases, but what the end-user values is that the application loads instantly and input data is never lost. I prefer to focus on solving the Monday 9:00 AM problem, building robust and pragmatic software.',
      },
    },
    {
      idx: '#02',
      date: { es: '02 May 2026', en: 'May 2, 2026' },
      title: {
        es: '245 reseñas, 8 sucursales, un problema de raíz',
        en: '245 reviews, 8 locations, one root problem',
      },
      excerpt: {
        es: 'Lo que parecía un dashboard era en realidad un proceso de lectura que nadie hacía.',
        en: 'What looked like a dashboard was really a reading process nobody was doing.',
      },
      content: {
        es: 'Recopilar 245 reseñas mensuales de 8 sucursales no sirve de nada si los gerentes no leen la información. Al diseñar la solución de NLP para las sucursales, me di cuenta de que el problema no era técnico sino de usabilidad: nadie abría el panel. Automatizar alertas por correo electrónico cuando llega una crítica negativa cambió radicalmente la velocidad de respuesta, atacando el problema de raíz.',
        en: 'Collecting 245 monthly reviews from 8 locations is useless if managers do not read the information. When designing the NLP solution for the branches, I realized the problem was not technical but usability: nobody opened the dashboard. Automating email alerts for negative reviews radically changed response times, addressing the root problem.',
      },
    },
    {
      idx: '#01',
      date: { es: '18 Abr 2026', en: 'Apr 18, 2026' },
      title: {
        es: 'Del scraping al insight',
        en: 'From scraping to insight',
      },
      excerpt: {
        es: 'Cuatro etapas y por qué la más importante no es el modelo.',
        en: "Four stages — and why the most important one isn't the model.",
      },
      content: {
        es: 'El camino desde la extracción de datos con Apify hasta la toma de decisiones estratégicas consta de cuatro etapas: extracción, normalización, modelado y visualización. El verdadero reto radica en limpiar el ruido para extraer insights de valor operativo en lugar de métricas de vanidad. La etapa más importante es la normalización y contextualización de los datos, no el modelo de clasificación en sí.',
        en: 'The path from data scraping with Apify to strategic decision-making consists of four stages: extraction, normalization, modeling, and visualization. The real challenge lies in cleaning the noise to extract insights of operational value instead of vanity metrics. The most critical stage is data normalization and contextualization, not the classification model itself.',
      },
    },
  ];

  const CONTACT = {
    es: [
      { label: 'Email',    value: 'helloultima@ultimaibrahim.dev',      icon: 'mail',     placeholder: false },
      { label: 'GitHub',   value: 'github.com/ultimaibrahim',           icon: 'github',   placeholder: false },
      { label: 'LinkedIn', value: 'linkedin.com/in/ultimaibrahim',      icon: 'linkedin', placeholder: false },
      { label: 'Lugar',    value: 'Guadalajara, MX',                    icon: 'pin',      placeholder: false },
    ],
    en: [
      { label: 'Email',    value: 'helloultima@ultimaibrahim.dev',      icon: 'mail',     placeholder: false },
      { label: 'GitHub',   value: 'github.com/ultimaibrahim',           icon: 'github',   placeholder: false },
      { label: 'LinkedIn', value: 'linkedin.com/in/ultimaibrahim',      icon: 'linkedin', placeholder: false },
      { label: 'Location', value: 'Guadalajara, MX',                    icon: 'pin',      placeholder: false },
    ],
  };

  // Pequeño diccionario para chrome compartido
  const UI = {
    nav: {
      overview: { es: 'Resumen', en: 'Overview' },
      projects: { es: 'Proyectos', en: 'Projects' },
      stack:    { es: 'Stack', en: 'Stack' },
      timeline: { es: 'Trayectoria', en: 'Timeline' },
      writing:  { es: 'Notas', en: 'Notes' },
      contact:  { es: 'Contacto', en: 'Contact' },
      about:    { es: 'Sobre mí', en: 'About' },
    },
    sections: {
      projects:     { es: 'Proyectos', en: 'Projects' },
      stack:        { es: 'Stack & habilidades', en: 'Stack & skills' },
      activity:     { es: 'Actividad', en: 'Activity' },
      timeline:     { es: 'Trayectoria', en: 'Timeline' },
      achievements: { es: 'Reconocimientos', en: 'Recognition' },
      education:    { es: 'Educación', en: 'Education' },
      about:        { es: 'Sobre mí', en: 'About me' },
      writing:      { es: 'Notas', en: 'Notes' },
      contact:      { es: 'Contacto', en: 'Contact' },
      languages:    { es: 'Idiomas', en: 'Languages' },
    },
    cta: {
      contact:    { es: 'Contactar', en: 'Get in touch' },
      github:     { es: 'GitHub', en: 'GitHub' },
      readMore:   { es: 'Leer caso completo', en: 'Read full case' },
      back:       { es: 'Volver', en: 'Back' },
      backToList: { es: 'Volver a proyectos', en: 'Back to projects' },
      viewLive:   { es: 'Ver en vivo', en: 'View live' },
      viewAll:    { es: 'Ver todo', en: 'View all' },
      shots:      { es: 'Capturas anonimizadas', en: 'Anonymized screenshots' },
      ndaDemo:    { es: 'Solicitar demo \u00b7 NDA', en: 'Request demo \u00b7 NDA' },
      seeAllProjects: { es: 'Ver todos los proyectos', en: 'See all projects' },
      seeAbout:   { es: 'M\u00e1s sobre m\u00ed', en: 'More about me' },
    },
    routes: {
      overview: { es: 'Resumen', en: 'Overview' },
      projects: { es: 'Proyectos', en: 'Projects' },
      about:    { es: 'Sobre m\u00ed', en: 'About me' },
      contact:  { es: 'Contacto', en: 'Contact' },
    },
    privacy: {
      'demo-on-request': {
        es: { label: 'Demo bajo NDA', sub: 'Producto interno con datos reales \u2014 demo bajo acuerdo.' },
        en: { label: 'Demo under NDA', sub: 'Internal product with real data \u2014 demo under agreement.' },
      },
      public: {
        es: { label: 'P\u00fablico', sub: 'Cualquiera puede acceder al producto.' },
        en: { label: 'Public', sub: 'Anyone can access the product.' },
      },
      internal: {
        es: { label: 'Solo interno', sub: 'Uso interno \u2014 puedo compartir capturas anonimizadas.' },
        en: { label: 'Internal only', sub: 'Internal use \u2014 I can share anonymized screenshots.' },
      },
    },
    misc: {
      placeholder: { es: 'placeholder', en: 'placeholder' },
      processed:   { es: 'Reseñas procesadas / mes', en: 'Reviews processed / month' },
      adopted:     { es: 'Sucursales que adoptaron el reporte', en: 'Locations that adopted the report' },
      reading:     { es: 'lectura', en: 'read' },
    },
  };

  window.PortfolioData = {
    PROFILE, HERO, ABOUT, STATS, PERSONAL, PROJECTS, STACK, EDUCATION, ACHIEVEMENTS,
    TIMELINE, LANGUAGES, NOTES, CONTACT, UI,
    // helpers
    visibleProjects: () => PROJECTS.filter(p => !p.hidden),
    t(node, lang) { return (node && typeof node === 'object' && (lang in node)) ? node[lang] : node; },
  };
})();
