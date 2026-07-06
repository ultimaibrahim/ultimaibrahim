/* Shared UI atoms + tokens. Exposes window.PortUI.
   Designed for slate/glass aesthetic. */

const { useState: useStateU, useEffect: useEffectU, useMemo: useMemoU } = React;
const DU = window.PortfolioData;
const { useReveal, useCountUp, useMouseParallax, buildSparkline } = window.PH;

// ── design tokens ──
// One typeface (Geist) used everywhere; weight + size carries hierarchy.
// `serif` is intentionally an alias to `sans` so legacy refs still resolve
// to the same family — no serif/sans mixing.
const G_SANS = '"Geist", "SF Pro Text", "Inter", system-ui, sans-serif';
const M = {
  sans:  G_SANS,
  serif: G_SANS,
  mono:  '"Geist Mono", ui-monospace, monospace',

  // Off-white with a faint violet tint to match the cooler base
  text1: '#F2F0F8',
  text2: 'rgba(242,240,248,.82)',
  text3: 'rgba(242,240,248,.64)',
  text4: 'rgba(242,240,248,.42)',

  // Glass — warmer, less foggy
  glass:         'rgba(255,255,255,.045)',
  glassHi:       'rgba(255,255,255,.075)',
  glassBorder:   'rgba(255,255,255,.07)',
  glassBorderHi: 'rgba(255,255,255,.14)',

  // Apple-squircle border-radius scale
  rSm:  10,
  rMd:  16,
  rLg:  22,
  rXl:  28,
  rXxl: 34,

  // Cohesive accent palette — single family hue-shifted around violet
  cool:     '#B7B9E5',   // soft periwinkle
  coolDeep: '#8A8DD4',
  mint:     '#9DE3BD',
  mintDeep: '#5FB893',
  warm:     '#E8B5C8',   // muted rose

  // Premium cubic-bezier transition
  easeOutPremium: 'cubic-bezier(0.23, 1, 0.32, 1)',
};

// ── Ambient background ──
function AmbientBg() {
  const p = useMouseParallax(8);
  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: `
          radial-gradient(70% 80% at 12% 2%, rgba(183,185,229,.22), transparent 60%),
          radial-gradient(60% 70% at 96% 24%, rgba(232,181,200,.10), transparent 60%),
          radial-gradient(70% 70% at 86% 96%, rgba(157,227,189,.08), transparent 60%),
          radial-gradient(60% 80% at 6% 96%, rgba(138,141,212,.18), transparent 60%),
          linear-gradient(180deg, #5C5778 0%, #423E5A 50%, #2D2A3D 100%)
        `,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', top: '-12%', left: '-6%', zIndex: 0,
        width: 580, height: 580, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(183,185,229,.32), transparent 65%)',
        filter: 'blur(70px)', pointerEvents: 'none',
        transform: `translate(${p.x * 1.5}px, ${p.y * 1.5}px)`,
        transition: 'transform .6s cubic-bezier(.2,.7,.3,1)',
      }} />
      <div style={{
        position: 'fixed', bottom: '-14%', right: '-8%', zIndex: 0,
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,181,200,.14), transparent 65%)',
        filter: 'blur(90px)', pointerEvents: 'none',
        transform: `translate(${-p.x * 1.8}px, ${-p.y * 1.4}px)`,
        transition: 'transform .6s cubic-bezier(.2,.7,.3,1)',
      }} />
      <div style={{
        position: 'fixed', top: '40%', left: '50%', zIndex: 0,
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(157,227,189,.07), transparent 70%)',
        filter: 'blur(90px)', pointerEvents: 'none',
        transform: `translate(${p.x * 2}px, ${p.y * 2}px)`,
        transition: 'transform .8s cubic-bezier(.2,.7,.3,1)',
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        opacity: .35, mixBlendMode: 'overlay',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      }} />
    </>
  );
}

// ── Reveal wrapper ──
function Reveal({ children, delay = 0, y = 12, style }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 500ms ${M.easeOutPremium} ${delay}ms, transform 500ms ${M.easeOutPremium} ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

// ── Glass surface (Apple squircle) ──
function Glass({ as: Tag = 'div', style, hi, padding, hover, radius, children, ...rest }) {
  const [hovered, setHovered] = useStateU(false);
  return (
    <Tag
      {...rest}
      onMouseEnter={hover ? (e) => { setHovered(true); rest.onMouseEnter?.(e); } : rest.onMouseEnter}
      onMouseLeave={hover ? (e) => { setHovered(false); rest.onMouseLeave?.(e); } : rest.onMouseLeave}
      className={hover ? "interactive-btn" : undefined}
      style={{
        background: hi || hovered ? M.glassHi : M.glass,
        border: '1px solid ' + (hovered ? M.glassBorderHi : M.glassBorder),
        borderRadius: radius ?? M.rXl,
        backdropFilter: 'blur(22px) saturate(1.15)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.15)',
        boxShadow: hovered 
          ? '0 1px 0 rgba(255,255,255,.08) inset, 0 24px 60px -12px rgba(15,12,30,.55)'
          : '0 1px 0 rgba(255,255,255,.05) inset, 0 18px 50px -16px rgba(15,12,30,.45)',
        transition: `background 180ms ${M.easeOutPremium}, border-color 180ms ${M.easeOutPremium}, transform 140ms ${M.easeOutPremium}, box-shadow 180ms ${M.easeOutPremium}`,
        padding,
        ...style,
      }}
    >{children}</Tag>
  );
}

// ── Section heading ──
function SectionHeader({ kicker, title, sub, meta, accent = M.cool }) {
  return (
    <Reveal>
      <div style={{ marginBottom: 26 }}>
        <div style={{
          fontFamily: M.mono, fontSize: 10, color: accent,
          letterSpacing: '.12em', textTransform: 'uppercase',
          marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent }} />
          {kicker}
          {meta && <span style={{ marginLeft: 'auto', color: M.text3, fontSize: 10, letterSpacing: 'normal' }}>{meta}</span>}
        </div>
        <h2 style={{
          fontFamily: M.sans,
          fontSize: 32, lineHeight: 1.1, color: M.text1,
          margin: 0, fontWeight: 500, letterSpacing: '-.025em',
        }}>{title}</h2>
        {sub && <p style={{ fontSize: 14.5, color: M.text2, marginTop: 10, maxWidth: 560, lineHeight: 1.6 }}>{sub}</p>}
      </div>
    </Reveal>
  );
}

// ── Animated sparkline (stroke draw on intersect) ──
function AnimSparkline({ data, color, height = 80, fill = true, padTop = 6 }) {
  const [ref, shown] = useReveal();
  const W = 240, H = height;
  const sp = useMemoU(() => buildSparkline(data, W, H, padTop), [data, W, H, padTop]);
  const polyStr = useMemoU(() => {
    if (!sp.pts.length) return '';
    return sp.pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ') + ` ${W},${H} 0,${H}`;
  }, [sp, W, H]);
  const gradId = `spg-${color.replace('#', '')}`;
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".30" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && polyStr && (
        <polygon points={polyStr} fill={`url(#${gradId})`}
          style={{ opacity: shown ? 1 : 0, transition: 'opacity .8s .2s' }} />
      )}
      <path
        d={sp.d} fill="none" stroke={color}
        strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"
        style={{
          strokeDasharray: sp.length, strokeDashoffset: shown ? 0 : sp.length,
          transition: `stroke-dashoffset 1.2s ${M.easeOutPremium}`,
        }}
      />
    </svg>
  );
}

// ── Animated stat card (used in hero) ──
function StatCard({ s, lang, delay = 0, last }) {
  const isMobile = window.PH.useIsMobile();
  const [ref, shown] = useReveal();
  const isNumeric = typeof s.val === 'number' || /^-?\d+(\.\d+)?$/.test(String(s.val).trim());
  const counted = useCountUp(s.val, shown && isNumeric);
  const display = isNumeric
    ? (String(s.val).includes('.') ? Number(counted).toFixed(2) : counted)
    : s.val;
  const tone = ({ mint: M.mint, cool: M.cool, plain: M.text1, peach: M.warm })[s.tone] || M.text1;
  return (
    <div ref={ref} style={{
      flex: 1, padding: '18px 18px',
      borderRight: !isMobile && !last ? `1px solid ${M.glassBorder}` : 'none',
      borderBottom: isMobile && !last ? `1px solid ${M.glassBorder}` : 'none',
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : 'translateY(8px)',
      transition: `opacity 500ms ${M.easeOutPremium} ${delay}ms, transform 500ms ${M.easeOutPremium} ${delay}ms`,
    }}>
      <div style={{
        fontFamily: M.mono, fontSize: 22, fontWeight: 500,
        color: tone, lineHeight: 1, letterSpacing: '-.01em',
        whiteSpace: 'nowrap',
      }}>{display}</div>
      <div style={{
        fontFamily: M.mono, fontSize: 9.5, color: M.text3,
        marginTop: 6, letterSpacing: '.08em', textTransform: 'uppercase',
      }}>{DU.t(s.label, lang)}</div>
    </div>
  );
}

window.PortUI = { M, AmbientBg, Reveal, Glass, SectionHeader, AnimSparkline, StatCard };
