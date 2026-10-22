/* Shared data module — Ultima Ibrahim portfolio.
   Exposes window.PortfolioData with ES + EN strings + structured arrays.
   Hidden/inactive projects (bonjour) kept in the array, gated by `hidden: true`. */

(function () {
  const PROFILE = {
    brand: 'Ultima Ibrahim',
    handle: 'ultimaibrahim',
    initials: 'UI',
    realName: 'Ibrahim García',
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
      es: 'Estudiante de Licenciatura en Ciencia de Datos & IA',
      en: 'Data Science & AI Undergraduate',
    },
  };

  const ABOUT = {
    es: [
      'Estudio Licenciatura en Ciencia de los Datos e Inteligencia Artificial, con formación técnica previa en electrónica.',
      'Lo que me mueve no son los modelos exóticos sino las herramientas que la gente usa de verdad. Cada pieza que envío vive en producción: un reporte que un gerente revisa el lunes, un dashboard que un dueño abre antes de junta.',
      'Trabajo desde Guadalajara en proyectos para operación real — todos partieron de una pregunta simple: ¿dónde se está perdiendo información que ya existe?',
    ],
    en: [
      'I study an undergraduate degree in Data Science and Artificial Intelligence, with a background as an electronics technician.',
      "What drives me isn't exotic models but the tools people actually use. Every piece I ship lives in production: a report a manager reviews on Monday, a dashboard an owner opens before a meeting.",
      'I work from Guadalajara on projects for real operations — all of them started from a simple question: where is information already being lost?',
    ],
  };

  const STATS = [
    { val: '4.89', label: { es: 'Rating promedio étoile', en: 'étoile avg. rating' }, tone: 'gold' },
    { val: '615+', label: { es: 'Reseñas procesadas', en: 'Processed reviews' }, tone: 'plain' },
    { val: '2',    label: { es: 'Productos insignia en vivo', en: 'Core products live' }, tone: 'green' },
    { val: '100%', label: { es: 'Operación en tiempo real', en: 'Real-time operation' }, tone: 'green' },
  ];

  // ME-centric stats for the Overview page — about who I am, not project KPIs.
  const PERSONAL = {
    facts: [
      { val: '3',      label: { es: 'Productos en vivo', en: 'Live products' }, tone: 'plain' },
      { val: 'ES · EN', label: { es: 'Idiomas',     en: 'Languages' }, tone: 'mint' },
      { val: 'GDL · MX', label: { es: 'Base',       en: 'Based in' }, tone: 'plain' },
      { val: 'Prod.',  label: { es: 'Sistemas en vivo', en: 'Live systems' }, tone: 'cool' },
    ],
    now: {
      es: [
        ['Estudiando',  'Lic. en Ciencia de Datos & IA · UdeG'],
        ['Construyendo', 'étoile, mise y SIGNO'],
        ['Leyendo',     'Designing Data-Intensive Applications'],
        ['Profundizando', 'Sistemas Distribuidos · Arquitectura Serverless · React'],
      ],
      en: [
        ['Studying',    'B.Sc. in Data Science & AI · UdeG'],
        ['Building',    'étoile & mise'],
        ['Reading',     'Designing Data-Intensive Applications'],
        ['Focusing on', 'Distributed Systems · Serverless Architecture · React'],
      ],
    },
  };

  const PROJECTS = [
    {
      id: 'etoile',
      privacy: 'demo-on-request', // public summary; live demo / data under NDA
      name: 'étoile',
      tagline: {
        es: 'Customer Intelligence & Análisis de Sentimientos · Supabase & Netlify',
        en: 'Customer Intelligence & Sentiment Analytics · Supabase & Netlify',
      },
      status: { es: 'Live', en: 'Live' },
      statusTone: 'green',
      year: '2026',
      idx: '01',
      summary: {
        es: 'Herramienta interna diseñada para auditar la percepción y experiencia de clientes en múltiples ubicaciones a partir de reseñas públicas. Centraliza la ingesta asíncrona de datos y automatiza la detección de cuellos de botella en el servicio sin exponer llaves maestras en el cliente.',
        en: 'Internal tool designed to audit customer perception and experience across multiple locations from public reviews. Centralizes asynchronous data ingestion and automates operational bottleneck detection without exposing client-side master keys.',
      },
      architecture: {
        topology: {
          es: 'Arquitectura Jamstack Serverless de 3 capas: Cliente estático modular, API de ingesta asíncrona en Netlify Functions, y persistencia relacional en Supabase (PostgreSQL).',
          en: '3-tier Jamstack Serverless architecture: Modular static client, asynchronous ingestion API via Netlify Functions, and relational persistence on Supabase (PostgreSQL).',
        },
        pipeline: {
          es: 'Ingesta programada desde la API oficial de Google Business Profile hacia funciones serverless. Deduplicación con índices compuestos antes de insertar en PostgreSQL.',
          en: 'Scheduled ingestion from the official Google Business Profile API into serverless functions. Deduplication with compound indexes before inserting into PostgreSQL.',
        },
        mechanisms: {
          es: 'Clasificador semántico de 3 ejes (Servicio, Calidad, Valor) con reconocimiento contextual de negaciones. Autenticación persistida en cookies HTTP-only/SameSite y control de acceso vía Row Level Security (RLS).',
          en: '3-axis semantic classifier (Service, Quality, Value) with contextual negation detection. Persisted session auth via HTTP-only/SameSite cookies and access control via Row Level Security (RLS).',
        },
      },
      bullets: {
        es: [
          'Centralización de opiniones dispersas en un tablero de control operativo unificado.',
          'Clasificación automática de quejas (NLP) en ejes críticos: Servicio, Calidad y Valor.',
          'Ingesta programada desde la API oficial de Google a Supabase con funciones serverless de Netlify.',
          'Dashboard reactivo en Vanilla JS con cálculo dinámico de tendencias históricas.',
          'Arquitectura Zero-Secret: frontend desacoplado que no expone tokens maestros de base de datos.',
        ],
        en: [
          'Centralization of scattered reviews into a unified operational dashboard.',
          'Automatic complaint classification (NLP) across critical axes: Service, Quality, and Value.',
          'Scheduled ingestion from the official Google API into Supabase via Netlify Serverless Functions.',
          'Reactive Vanilla JS dashboard computing dynamic historical trends.',
          'Zero-Secret architecture: decoupled frontend with no database master keys exposed.',
        ],
      },
      stack: ['Vanilla JS (ES6+)', 'Netlify Functions (Node.js)', 'Supabase (PostgreSQL)', 'Google Business Profile API', 'Row Level Security (RLS)', 'Chart.js', 'Crystal & Squircle UI'],
      now: [
        ['Estado', 'En producción · v3.5 · v2.0 en beta'],
        ['Ingesta', 'API oficial de Google Business Profile, sincroniza cada 30 min'],
        ['Cobertura', '30+ sucursales · acceso por rol: gerente, zonal, regional'],
        ['Regla', 'Reseñas sin texto solo cuentan para volumen y promedio'],
      ],
      accent: 'green',
      repoUrl: 'https://github.com/ultimaibrahim/etoile-dashboard',
    },
    {
      id: 'mise',
      privacy: 'public',
      name: 'mise',
      tagline: {
        es: 'Enterprise Inventory & Supply Chain Engine · Google Apps Script',
        en: 'Enterprise Inventory & Supply Chain Engine · Google Apps Script',
      },
      status: { es: 'Live', en: 'Live' },
      statusTone: 'green',
      year: '2026',
      idx: '02',
      summary: {
        es: 'Motor distribuido de gestión de almacenes y cadena de suministro desarrollado para desacoplar el centro de distribución central de los puntos de venta periféricos. Automatiza el control transaccional de inventarios y elimina desabastos imprevistos mediante interfaces táctiles de alta velocidad.',
        en: 'Distributed warehouse and supply chain management engine designed to decouple central distribution from peripheral retail locations. Automates transactional inventory control and prevents stockouts through high-speed touch interfaces.',
      },
      architecture: {
        topology: {
          es: 'Topología distribuida Hub-and-Spoke de 3 niveles: Bodega General (BDG) como nodo central maestro, coordinando con terminales satélite de tienda (PDA / PDM) mediante enlaces de lectura desacoplados.',
          en: '3-tier distributed Hub-and-Spoke topology: Central Warehouse (BDG) acting as the master node, coordinating with satellite store terminals (PDA / PDM) via decoupled read links.',
        },
        pipeline: {
          es: 'Lectura transaccional diaria por lotes (Batch Operations) para optimizar cuotas de Google Sheets API. Daemon nocturno SmartSync idempotente para deduplicación y ajuste de saldos mediante hashing.',
          en: 'Daily batch transactional reads to optimize Google Sheets API quotas. Idempotent nightly SmartSync daemon for deduplication and balance reconciliation using transaction hashing.',
        },
        mechanisms: {
          es: 'MiseMatchingEngine con N-Grams, distancia de Levenshtein y token-sort con caché L1 O(1) en RAM para resolver discrepancias de tecleo de los operarios. Quiosco modal táctil (PickingDialog) desacoplado de la hoja.',
          en: 'MiseMatchingEngine with N-Grams, Levenshtein distance, and token-sort with L1 O(1) in-memory cache to resolve operator typing errors. Touch modal kiosk (PickingDialog) decoupled from the sheet.',
        },
      },
      bullets: {
        es: [
          'Kardex transaccional multi-worker con cálculo dinámico de saldos en tiempo real.',
          'Reconciliación inteligente de insumos entre catálogo oficial y registros de mostrador.',
          'Terminales modales táctiles responsivas para captura rápida sin bloquear la navegación de la hoja.',
          'Sincronización asíncrona idempotente con hashing transaccional y bitácora de auditoría en tiempo real.',
          'Suite de pruebas unitarias en entorno virtual Node.js V8 para garantizar cero regresiones.',
        ],
        en: [
          'Multi-worker transactional Kardex with dynamic real-time balance calculation.',
          'Intelligent supply item reconciliation between official catalog and front-counter logs.',
          'Responsive modal touch kiosks for fast mobile entry without blocking sheet navigation.',
          'Idempotent async synchronization with transactional hashing and real-time operations audit log.',
          'Unit test suite executed on Node.js V8 virtual environment to guarantee zero regressions.',
        ],
      },
      stack: ['Google Apps Script (V8 Runtime)', 'Google Sheets API', 'JavaScript (ES6+ modular)', 'Node.js (V8 VM Test Suite)', 'Google Clasp', 'Kardex Design'],
      now: [
        ['Estado', 'En producción · 1.7 · versión web en construcción'],
        ['Qué hace', 'Inventario, picking y reconciliación de insumos para tiendas'],
        ['Cómo se prueba', 'Suite en una VM de Node.js antes de cada push con clasp'],
        ['Siguiente', 'App web móvil con Vite, TypeScript y Supabase'],
      ],
      accent: 'cool',
      repoUrl: 'https://github.com/ultimaibrahim/mise',
    },
    {
      id: 'signo',
      privacy: 'public',
      name: 'SIGNO',
      tagline: {
        es: 'Seguimiento, Incidencias, Gestión, Notas y Operación · Cloudflare',
        en: 'Tracking, Incidents, Management, Notes and Operations · Cloudflare',
      },
      status: { es: 'Lanzado', en: 'Launched' },
      statusTone: 'green',
      year: '2026',
      idx: '03',
      summary: {
        es: 'Sistema de tickets para equipos pequeños: cada empresa o cliente tiene su propio espacio, con folios, historial, tiempos de resolución y estadísticas. Nació como mi herramienta de seguimiento de bugs y hoy es un producto abierto a cualquier equipo.',
        en: 'Ticketing system for small teams: each company or client gets its own space with folios, history, resolution times and statistics. It started as my own bug-tracking tool and is now a product open to any team.',
      },
      architecture: {
        topology: {
          es: 'Cloudflare Worker en TypeScript sin frameworks, con D1 (SQLite) como base y un sitio estático servido por el mismo Worker.',
          en: 'Cloudflare Worker in framework-free TypeScript, with D1 (SQLite) as the database and a static site served by the same Worker.',
        },
        pipeline: {
          es: 'Espacios aislados por empresa, públicos o privados (código o correo con sesión firmada). Integraciones con Trello y GitHub; correo transaccional con Resend y Turnstile contra abuso.',
          en: 'Spaces isolated per company, public or private (code or email with signed session). Trello and GitHub integrations; transactional email via Resend and Turnstile against abuse.',
        },
      },
      bullets: {
        es: [
          'Un espacio por empresa o cliente, con folios propios y acceso privado opcional.',
          'Estadísticas de resolución y carga con gráficas interactivas.',
          'Retención de 90 días tras el cierre, con purga automática.',
          'Identidad propia: un sigilo por tipo de ticket, dibujado entre vector y píxel.',
          'Pruebas automatizadas y recorridos con clics reales en navegador.',
        ],
        en: [
          'One space per company or client, with its own folios and optional private access.',
          'Resolution and workload statistics with interactive charts.',
          '90-day retention after closing, with automatic purge.',
          'Its own identity: one sigil per ticket type, drawn between vector and pixel.',
          'Automated tests and real-click browser runs.',
        ],
      },
      stack: ['TypeScript', 'Cloudflare Workers', 'D1 (SQLite)', 'Resend', 'Turnstile', 'ECharts', 'Geist'],
      now: [
        ['Estado', 'Lanzado el 16-oct-2026 · alpha.24'],
        ['Dónde', 'signo.ultimaibrahim.dev'],
        ['Uso', 'Piloto en un equipo de operación real'],
        ['Idea', 'Reemplazar hojas y formularios por un sistema pequeño y rápido'],
      ],
      accent: 'violet',
      siteUrl: 'https://signo.ultimaibrahim.dev',
    },
    {
      id: 'reporte',
      hidden: true,
      privacy: 'demo-on-request',
      name: { es: 'Reporte de Venta Semanal', en: 'Weekly Sales Report' },
      tagline: {
        es: 'Template operativo · Multi-ubicación',
        en: 'Operational template · Multi-location',
      },
      status: { es: 'Live', en: 'Live' },
      statusTone: 'green',
      year: '2026',
      idx: '03',
      summary: {
        es: 'Formato estandarizado de reporte semanal. Traduce el corte de caja diario en KPIs operativos automáticos.',
        en: 'Standardized weekly report format. Translates the daily cash-close into automatic operational KPIs.',
      },
      bullets: {
        es: [
          'KPIs automáticos: ticket promedio, TRX, % delivery por plataforma.',
          'Avance vs. meta mensual visible en tiempo real cada lunes.',
        ],
        en: [
          'Automatic KPIs: avg. ticket, TRX, % delivery per platform.',
          'Progress vs. monthly target visible in real time every Monday.',
        ],
      },
      stack: ['Excel', 'KPI design', 'Power Query', 'Formula automation'],
      accent: 'gold',
    },
  ];

  const STACK = [
    { name: 'Python', role: 'pipelines · scripts · nlp' },
    { name: 'Google Apps Script', role: 'concurrencia · kardex v8' },
    { name: 'JavaScript ES6+', role: 'frontend reactivo · modales' },
    { name: 'PostgreSQL · Supabase', role: 'persistencia · rls' },
    { name: 'Netlify Serverless', role: 'ingesta asíncrona' },
    { name: 'Apify', role: 'web scraping distribuido' },
  ];

  const EDUCATION = [
    {
      period: '2024 – ' + ({ es: 'actual', en: 'present' }).es,
      periodI18n: { es: '2024 – actual', en: '2024 – present' },
      degree: {
        es: 'Licenciatura en Ciencia de los Datos e Inteligencia Artificial (En curso)',
        en: 'B.Sc. in Data Science and Artificial Intelligence (In progress)',
      },
      inst: { es: 'Universidad de Guadalajara (UdeG)', en: 'University of Guadalajara (UdeG)' },
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
      title: { es: 'étoile — customer intelligence', en: 'étoile — customer intelligence' },
      sub: { es: 'Clasificación semántica & analítica de reseñas en producción', en: 'Semantic classification & review analytics in production' },
      active: true,
    },
    {
      date: { es: 'Abr 2026', en: 'Apr 2026' },
      title: { es: 'mise — supply chain engine', en: 'mise — supply chain engine' },
      sub: { es: 'Arquitectura Hub-and-Spoke & Kardex transaccional en Apps Script', en: 'Hub-and-Spoke architecture & transactional Kardex on Apps Script' },
    },
    {
      date: { es: 'Ene 2026', en: 'Jan 2026' },
      title: { es: 'Pipelines de datos & automatización', en: 'Data pipelines & automation' },
      sub: { es: 'Apify · Python · Integraciones serverless', en: 'Apify · Python · Serverless integrations' },
    },
    {
      date: { es: '2025', en: '2025' },
      title: { es: 'Primeros proyectos web y dashboards', en: 'First web projects & dashboards' },
      sub: { es: 'Diseño Crystal & Squircle · Vanilla JS', en: 'Crystal & Squircle design · Vanilla JS' },
    },
    {
      date: { es: '2024', en: '2024' },
      title: { es: 'Ingreso · Licenciatura en Ciencia de Datos & IA', en: 'Enrolled · Data Science & AI B.Sc.' },
      sub: { es: 'Inicio de formación universitaria', en: 'Commenced university education' },
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
        es: 'Datos, automatización y el problema real',
        en: 'Data, automation, and the real problem',
      },
      excerpt: {
        es: 'Lo que parecía un dashboard era en realidad un proceso de lectura que nadie hacía.',
        en: 'What looked like a dashboard was really a reading process nobody was doing.',
      },
      content: {
        es: 'Recopilar cientos de reseñas mensuales no sirve de nada si los líderes de equipo no leen la información. Al diseñar la solución de clasificación de sentimientos para la operación, descubrí que el verdadero reto no era técnico sino de usabilidad: nadie abría el panel. Automatizar alertas instantáneas ante quejas críticas cambió radicalmente los tiempos de respuesta. La lección: la mejor métrica es la que alguien realmente usa.',
        en: 'Collecting hundreds of monthly reviews is useless if team leads do not read the information. When designing the sentiment classification solution for operations, I discovered the real challenge was not technical but usability: nobody opened the dashboard. Automating instant alerts for critical feedback radically improved response times. The takeaway: the best metric is the one people actually use.',
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
