/* Favicon vivo: la pestaña cambia con lo que pasa en la página.
   ring  → anillo de glifos girando mientras carga
   mark  → el Geass mark
   proj  → el símbolo del proyecto que está al centro del carrusel, en su color
   Desde un iframe se avisa al documento superior, que es el único que puede cambiar el icono. */
(() => {
  const GEASS = 'M50,75 C52,65 58,55 70,55 C65,48 55,42 50,20 C45,42 35,48 30,55 C42,55 48,65 50,75 Z M50,20 C53,42 63,46 80,42 C70,52 62,60 50,75 C38,60 30,52 20,42 C37,46 47,42 50,20 Z';
  const STAR = 'M50 5 L61 38 L96 38 L68 59 L79 93 L50 72 L21 93 L32 59 L4 38 L39 38 Z';
  const LOGO = 'M18 18 H82 A12 12 0 0 1 94 30 V42 A8 8 0 0 0 94 58 V70 A12 12 0 0 1 82 82 H18 A12 12 0 0 1 6 70 V58 A8 8 0 0 0 6 42 V30 A12 12 0 0 1 18 18 Z M50 27 C52.5 40 60 47.5 73 50 C60 52.5 52.5 60 50 73 C47.5 60 40 52.5 27 50 C40 47.5 47.5 40 50 27 Z M50 44 L56 50 L50 56 L44 50 Z';
  const isTop = window.parent === window;
  let link = null, timer = null, cv = null, g = null;

  function init() {
    if (cv) return;
    cv = document.createElement('canvas'); cv.width = cv.height = 64; g = cv.getContext('2d');
    document.querySelectorAll('link[rel~="icon"]').forEach(l => l.remove());
    link = document.createElement('link'); link.rel = 'icon'; link.type = 'image/png'; document.head.appendChild(link);
  }
  function tile(acc) {
    g.clearRect(0, 0, 64, 64);
    g.beginPath(); g.roundRect(1, 1, 62, 62, 16);
    const bg = g.createLinearGradient(0, 0, 64, 64); bg.addColorStop(0, '#1d1233'); bg.addColorStop(1, '#0B0914'); g.fillStyle = bg; g.fill();
    const gl = g.createRadialGradient(32, 56, 2, 32, 56, 40); gl.addColorStop(0, acc + '99'); gl.addColorStop(1, acc + '00'); g.save(); g.clip(); g.fillStyle = gl; g.fillRect(0, 0, 64, 64); g.restore();
    g.lineWidth = 1.5; g.strokeStyle = acc + '55'; g.stroke();
  }
  function fillPath(d, vb, size, cx, cy, fill, rule) {
    g.save(); const s = size / vb; g.translate(cx - vb * s / 2, cy - vb * s / 2); g.scale(s, s);
    g.shadowColor = fill; g.shadowBlur = 10; g.fillStyle = fill; g.fill(new Path2D(d), rule || 'nonzero'); g.restore();
  }
  const draw = {
    mark() { tile('#C084FC'); const gr = g.createLinearGradient(14, 14, 50, 50); gr.addColorStop(0, '#E9D5FF'); gr.addColorStop(1, '#A66CF5'); fillPath(GEASS, 100, 50, 32, 33, gr); },
    ring(o, t) { tile('#C084FC'); const n = 12, R = 21, a0 = t / 650;
      for (let i = 0; i < n; i++) { const a = a0 + i / n * Math.PI * 2, al = .25 + .75 * ((i / n + (t / 1600)) % 1);
        g.globalAlpha = al; g.fillStyle = i % 4 === 0 ? '#fff' : '#C084FC'; g.beginPath(); g.roundRect(32 + Math.cos(a) * R - 2.6, 32 + Math.sin(a) * R - 2.6, 5.2, 5.2, 1.4); g.fill(); }
      g.globalAlpha = 1; fillPath(GEASS, 100, 16, 32, 33, '#C084FC'); },
    proj(o) { const acc = o.acc || '#C084FC'; tile(acc);
      if (o.id === 'etoile') fillPath(STAR, 100, 40, 32, 33, acc);
      else if (o.id === 'signo') fillPath(LOGO, 100, 48, 32, 32, acc, 'evenodd');
      else if (o.id === 'mise') { g.save(); g.translate(14, 14); g.scale(36 / 64, 36 / 64); g.shadowColor = acc; g.shadowBlur = 12; g.strokeStyle = acc; g.fillStyle = acc; g.lineWidth = 4.5;
        g.beginPath(); g.roundRect(5, 5, 54, 54, 14); g.stroke(); g.lineWidth = 2.2; g.globalAlpha = .5; g.beginPath(); g.moveTo(23, 5); g.lineTo(23, 59); g.moveTo(41, 5); g.lineTo(41, 59); g.moveTo(5, 23); g.lineTo(59, 23); g.moveTo(5, 41); g.lineTo(59, 41); g.stroke();
        g.globalAlpha = 1; g.beginPath(); g.roundRect(43, 43, 14, 14, 3.5); g.fill(); g.restore(); }
      else fillPath(GEASS, 100, 46, 32, 33, acc); }
  };
  function apply(o) {
    init(); clearInterval(timer);
    const paint = () => { (draw[o.mode] || draw.mark)(o, performance.now()); link.href = cv.toDataURL('image/png'); };
    paint(); if (o.mode === 'ring') timer = setInterval(paint, 130);
  }
  if (isTop) addEventListener('message', e => { if (e.origin === location.origin && e.data && e.data.type === 'fav') apply(e.data.opt); });
  window.Fav = { set(opt) { if (isTop) apply(opt); else { try { parent.postMessage({ type: 'fav', opt }, location.origin); } catch (e) {} } } };
})();
