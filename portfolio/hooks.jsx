/* Hooks + helpers for portfolio animations.
   Exposes window.PH (PortfolioHooks).
   Uses React from global. */

const { useEffect: _useEffect, useState: _useState, useRef: _useRef } = React;

// ── useReveal: returns a ref + boolean `shown` once node intersects viewport.
function useReveal(opts = {}) {
  const ref = _useRef(null);
  const [shown, setShown] = _useState(false);
  _useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      });
    }, { rootMargin: opts.rootMargin || '0px 0px -10% 0px', threshold: opts.threshold ?? 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

// ── useCountUp: animates from 0 to target when `active` flips true.
function useCountUp(target, active, opts = {}) {
  const [val, setVal] = _useState(0);
  _useEffect(() => {
    if (!active) return;
    const num = typeof target === 'number' ? target : parseFloat(String(target).replace(/[^0-9.]/g, ''));
    if (Number.isNaN(num)) { setVal(target); return; }
    const duration = opts.duration ?? 1100;
    const decimals = opts.decimals ?? (String(target).includes('.') ? 2 : 0);
    const start = performance.now();
    let raf;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = now => {
      const t = Math.min(1, (now - start) / duration);
      const v = num * ease(t);
      setVal(decimals === 0 ? Math.round(v) : Number(v.toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return val;
}

// ── useMouseParallax: returns (x,y) in [-1,1] mapped from mouse position on doc.
function useMouseParallax(strength = 1) {
  const [pos, setPos] = _useState({ x: 0, y: 0 });
  _useEffect(() => {
    let raf;
    const onMove = e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2 * strength;
        const y = (e.clientY / window.innerHeight - 0.5) * 2 * strength;
        setPos({ x, y });
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, [strength]);
  return pos;
}

// ── useScrollSpy: returns id of the currently-most-visible section among `ids`.
function useScrollSpy(ids, container) {
  const [active, setActive] = _useState(ids[0]);
  _useEffect(() => {
    const root = container?.current || null;
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(entries => {
      let bestRatio = 0;
      let best = null;
      entries.forEach(en => {
        if (en.intersectionRatio > bestRatio) {
          bestRatio = en.intersectionRatio;
          best = en.target.id;
        }
      });
      // Fallback: pick the topmost intersecting section
      if (best) setActive(best);
    }, {
      root,
      rootMargin: '-30% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [ids.join(','), container]);
  return [active, setActive];
}

// ── drawSparkline: returns path + length for animated stroke-dashoffset draw.
function buildSparkline(data, w, h, pad = 4) {
  if (!data || data.length < 2) return { d: '', length: 0, pts: [] };
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const d = pts.map(([x, y], i) => (i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : `L${x.toFixed(2)},${y.toFixed(2)}`)).join(' ');
  // approximate length
  let length = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    length += Math.sqrt(dx * dx + dy * dy);
  }
  return { d, length, pts };
}

window.PH = { useReveal, useCountUp, useMouseParallax, useScrollSpy, buildSparkline };
