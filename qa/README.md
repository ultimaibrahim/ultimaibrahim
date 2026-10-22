# QA del portafolio (navegador headless por CDP)

Scripts sueltos, sin dependencias: Node 22 (WebSocket global) + `chromium` instalado. Hablan con el servidor de desarrollo (`node dev.js 5173` desde la raíz del repo) o con la URL real.

| Script | Qué comprueba |
|---|---|
| `audit.js [base] [dispositivos]` | Auditoría visual en 8 tamaños (320×568 … tableta 768×1024, horizontal 844×390): terminal, carrusel y las 3 fichas; guarda capturas en `qa/audit/` (ignorada por git) y avisa de desbordes |
| `boot.js W H tag` | Loader de anillos → sigilo → UI |
| `gate.js` | La compuerta "clic para iniciar el sistema" |
| `tour.js` | Memoria del recorrido (`gw-tour`): usuario nuevo vs. el que regresa, y los botones de omitir |
| `launch.js W H tag` | Recorrido completo hasta el último comando y la llegada al carrusel |
| `sheets.js W H tag` | Abre y cierra cada ficha; mide fps y comprueba que el panel vuelve a su sitio |
| `blink.js` | Traspaso terminal → portafolio en `index.html`; mide cuadros en blanco (la desviación estándar de cada cuadro no debe caer a 0) |
| `ghost.js` | Mueve el sigilo izquierda ↔ derecha y captura cuadros seguidos para ver si deja estela |
| `car.js`, `fav.js`, `live.js` | Carrusel completo, estados del favicon vivo, flujo contra la URL real |

Notas: cada script lanza su propio Chromium en un puerto distinto y con perfil en `qa/prof*` (borrar el perfil antes de repetir). Las rutas de salida son relativas a la carpeta del script. Si una prueba se queda colgada, mata solo ese Chromium (no uses `pkill -f` con un patrón que coincida con tu propia shell).
