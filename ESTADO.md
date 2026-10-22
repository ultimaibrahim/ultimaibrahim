# Estado del portafolio · 17-oct-2026

## Producción
- Se sirve desde **GitHub Pages** (rama `main` de `ultimaibrahim/ultimaibrahim`) con **Cloudflare** delante. Cada push a `main` se publica solo (tarda ~1 minuto: `gh api repos/ultimaibrahim/ultimaibrahim/pages/builds/latest`).
- Cloudflare quita `.html` de las rutas con una redirección 307 (`/portfolio/gateway.html` → `/portfolio/gateway`). Todo el código usa rutas relativas y funciona así.
- Hay una rama `cloudflare/workers-autoconfig` (creada por el bot de Cloudflare, con `wrangler.jsonc`); no está fusionada y no se usa para desplegar.

## Arquitectura
```
index.html  (React 18 UMD + Babel en el navegador; carga portfolio/*.jsx y favicon.js)
 └─ portfolio/main.jsx  PortfolioApp
     ├─ GatewayFrame   → <iframe portfolio/gateway.html>     la terminal (loader, compuerta, recorrido, último comando)
     └─ PortfolioFrame → <iframe portfolio/proyectos.html>    el carrusel con identidad y proyectos
```
Mensajes `postMessage` (mismo origen):
| Mensaje | De → a | Para qué |
|---|---|---|
| `gateway:enter` | terminal → main.jsx | el último comando terminó: montar el carrusel debajo |
| `portfolio:ready` | carrusel → main.jsx | el carrusel ya está tapado por su cortina: ahora sí quitar la terminal (evita un cuadro en blanco) |
| `portfolio:back` | carrusel → main.jsx | "← terminal" |
| `fav` | iframes → `index.html` | cambiar el favicon (solo el documento superior puede) |

Código muerto: el Spatial OS / escroller de dos etapas de `main.jsx` y `pages.jsx` sigue ahí y es alcanzable solo por rutas con hash (`#/proyectos`, `#/sobre-mi`, `#/contacto`). Ya no se muestra desde el flujo normal. Candidato a borrarse.

## Archivos
| Archivo | Qué es |
|---|---|
| `portfolio/gateway.html` | La terminal. Un solo archivo con CSS + JS: lluvia de glifos y escultura de 600 partículas en canvas (5 modelos + anillo de arranque), escritura por scroll, `SCRIPT` con los 5 comandos, sonido, cortina, omitir |
| `portfolio/proyectos.html` | Carrusel: identidad arriba, cinta continua de 3 paneles tejida con glifos, fichas con visual propio, sonido, cortina de llegada |
| `portfolio/data.js` | Datos (`PROFILE`, `PROJECTS` con `now`, `ABOUT`…). El carrusel y los paneles leen de aquí. Sin edad ni nombre completo |
| `portfolio/favicon.js` | Favicon vivo (anillo → sigilo → símbolo del proyecto al centro) |
| `favicon.svg` | Favicon estático (sigilo con anillo de puntos) |
| `portfolio/fonts/` | `Giaza.otf` (étoile), `BigShouldersStencilDisplay.woff2` y `MartianMono.woff2` (mise) |
| `dev.js` | Servidor local con recarga en vivo, sin dependencias |
| `qa/` | Scripts de prueba en navegador headless (ver `qa/README.md`) |
| `demo_transitions*.html` | Prototipos viejos, sin uso (no versionados) |

## Flujo del visitante
1. **Loader**: anillos de glifos giran mientras carga de verdad (fuentes + `load`); se pliegan en el Geass mark.
2. **Compuerta** "clic para iniciar el sistema" (+ "sin sonido"): el clic desbloquea el audio. La rueda del mouse NO desbloquea audio en los navegadores; clic, tecla o toque sí.
3. **Recorrido** de 5 comandos escritos con scroll/teclas/toque: `ultimafetch`, `whoami --verbose`, `cat /etc/manifesto.md`, `systemctl status etoile.service mise.service`, `ultima open portfolio`. El último hace zoom hasta quedar solo, ejecuta, imprime un registro con progreso real y lanza la cortina de glifos.
4. **Carrusel**: cinta infinita que fluye sola; cada panel rota entre "Ahora / Qué hace / Stack / Arquitectura". Clic en un panel abre su ficha (FLIP) y al cerrar vuelve al mismo sitio.
- **Memoria**: `localStorage` → `gw-sound` (`on`/`off`, por defecto activo) y `gw-tour` (`done` cuando ya corrió el último comando). Quien ya lo vio entra directo al último comando con "saltar al portafolio" y "ver recorrido completo"; quien no, ve "omitir recorrido".
- Ajustes útiles en `gateway.html`: `NOTCH` (px de scroll por letra), `LOCK_MS` y `NEXT_PX` (cuánto cuesta pasar al siguiente comando), `ALTERNATE` (alternar lados), `MORPH_DURATION`. En `proyectos.html`: `DRIFT` (velocidad del flujo) y `layoutTop()` (altura del bloque de identidad).

## Fichas: visual propio por proyecto
- **étoile**: constelación de 33 sucursales (agrupadas en "regiones A–E" genéricas) con pulso; fuente Giaza; estrella de fondo.
- **mise**: Kardex con el aspecto exacto de Google Sheets que se llena solo + flujo BDG → PDA/PDM; fuentes stencil y Martian Mono; la bandeja como símbolo. Los insumos del kardex son ejemplo ilustrativo.
- **SIGNO**: nombre cortado en bandas horizontales con letras que se pintan al pasar; tablero de tickets con los sigilos reales (trazos tomados de `~/bizops-hub/worker/public/sigilos.js`) que se pixelan al llegar; títulos de ejemplo.

## Decisiones y de dónde salieron
- Banco de movimiento y sonido con votos de Ibrahim: https://claude.ai/artifact/AsnsZ7m3Tw1ba968CNAXhn (colección `votos`, se lee con `ArtifactData`). Aplicado: "Clear y comando en foco" + "Cortina de glifos", los 10 sonidos, resplandor desde abajo, ola del carrusel, sigilo que se arma (ahora el loader). Descartado por voto: velo violeta, iris, barrido, contador mono, brillo que sigue al cursor, pulso y puntos.
- Referencias de diseño (Awwwards): sobre todo AENGEL (carrusel con ola, sonido propio, loader ligado a la carga real).
- Privacidad: sin edad, fecha de nacimiento ni nombre completo (se quitaron de `data.js` y de `pages.jsx`).
- Sonido: sintetizado con Web Audio (sin archivos), activo por defecto tras el clic de la compuerta; `♪` discreta arriba a la derecha para apagarlo.
- Móvil: auditado en 8 tamaños; la terminal se escala para caber, el sigilo sube arriba en teléfonos, la cinta empieza bajo la identidad.

## Identidades de proyecto
- **mise** tiene identidad propia en `~/mise_work/identidad/` (símbolo, favicon, tipografías, README, muestra). **Sin commit** al cierre de esta nota; `mise-web` no se tocó.
- **étoile** usa Giaza solo para el nombre (ver `~/reviews-lcp-gdl/documentacion/lineamientos_etoile.md`).
- SIGNO: marca en `~/bizops-hub/documentacion/marca.md`.

## Pendientes y riesgos abiertos
- **Licencia de Giaza** (comercial estándar, 3 estaciones): confirmar con ajtypography.com que permite servirla en web; está publicada en `portfolio/fonts/`.
- El sonido nunca se escuchó "de oído" en pruebas (solo se verificó que los nodos de audio se crean); probar en dispositivos reales (iOS/Android) y el chime de llegada por el flujo del iframe.
- Rendimiento medido solo en un navegador sin GPU (39–61 fps); falta probar en GPU real y teléfonos físicos.
- `README.md` del repo está desactualizado (menciona Apify y no el carrusel).
- Contenido ilustrativo a revisar: insumos del kardex de mise, títulos de tickets de SIGNO, "regiones A–E" de étoile.
- Comando `systemctl status` aún no incluye a SIGNO.
- Limpiar el código muerto de Spatial OS.
- Ideas no hechas: hover con ondas de agua (WebGL), CRT/parallax/háptica, anillo de glifos como indicador al abrir una ficha, llevar la identidad de mise a `mise-web`.

## Cómo probar
`node dev.js 5173` y abrir http://localhost:5173/ · pruebas: `qa/README.md`.
