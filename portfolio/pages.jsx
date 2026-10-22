/* Page components for the portfolio.
   Each page is a section of the SPA. window.PortPages = { Overview, Projects, ProjectDetail, About, Contact }
*/

const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP } = React;
const Dp = window.PortfolioData;
const { M, Reveal, Glass, SectionHeader, AnimSparkline, StatCard } = window.PortUI;

// ─────────────────────────── helpers ───────────────────────────
function PageHero({ kicker, title, italic, sub, accent = M.cool }) {
  const isMobile = window.PH.useIsMobile();
  return (
    <header style={{ padding: isMobile ? '24px 0 16px' : '40px 0 28px' }}>
      <Reveal>
        <div style={{
          fontFamily: M.mono, fontSize: 10.5, color: accent,
          letterSpacing: '.12em', textTransform: 'uppercase',
          marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent }} />
          {kicker}
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h1 style={{
          fontFamily: M.sans,
          fontSize: isMobile ? 38 : 68, lineHeight: 1.02, color: M.text1,
          margin: 0, fontWeight: 500, letterSpacing: '-.035em',
        }}>
          {italic && <span style={{ color: M.text2, fontWeight: 400 }}>{italic} </span>}
          {!italic ? title : <span style={{ fontWeight: 600, fontSize: isMobile ? 32 : 56, letterSpacing: '-.04em', display: 'block', marginTop: 4,
            color: M.text1,
          }}>{title}</span>}
        </h1>
      </Reveal>
      {sub && (
        <Reveal delay={180}>
          <p style={{ fontSize: isMobile ? 14.5 : 16, color: M.text2, lineHeight: 1.65, maxWidth: 540, marginTop: 18, fontWeight: 300 }}>
            {sub}
          </p>
        </Reveal>
      )}
    </header>
  );
}

function NavCard({ to, title, sub, accent, onJump }) {
  const [hover, setHover] = useStateP(false);
  return (
    <a
      href={to}
      onClick={(e) => { e.preventDefault(); onJump(to); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="interactive-btn"
      style={{
        display: 'block', textDecoration: 'none',
        background: hover ? M.glassHi : M.glass,
        border: `1px solid ${hover ? M.glassBorderHi : M.glassBorder}`,
        borderRadius: M.rXl, padding: 24,
        backdropFilter: 'blur(22px) saturate(1.15)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.15)',
        transition: `background 180ms ${M.easeOutPremium}, border-color 180ms ${M.easeOutPremium}, transform 140ms ${M.easeOutPremium}`,
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      <div style={{
        fontFamily: M.mono, fontSize: 10, color: accent,
        letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 14,
      }}>{to}</div>
      <div style={{ fontFamily: M.sans, fontSize: 22, fontWeight: 500, color: M.text1, lineHeight: 1.2, marginBottom: 8, letterSpacing: '-.02em' }}>{title}</div>
      <div style={{ fontSize: 12.5, color: M.text2, lineHeight: 1.55, marginBottom: 14 }}>{sub}</div>
      <div style={{
        fontFamily: M.mono, fontSize: 10.5, color: accent,
        letterSpacing: '.1em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span>{(({ '#/proyectos': 'Ver lista', '#/sobre-mi': 'Leer perfil', '#/contacto': 'Enviar mensaje', '#/': 'Inicio' })[to]) || '→'}</span>
        <span style={{ transform: hover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform .25s' }}>→</span>
      </div>
    </a>
  );
}

/// ── 3D Geass ASCII & Matrix Canvas Component ──
function AsciiGeassCanvas({ active = true }) {
  const canvasRef = React.useRef(null);

  useEffectP(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const matrixChars = "01$#{}<>/*=+-~;:!^λπμΩΨ0123456789ABCDEFUI";
    const columns = 28;
    const drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -30));

    const geassPoints = [];
    const NUM_PTS = 260;
    for (let i = 0; i < NUM_PTS; i++) {
      const t = (i / NUM_PTS) * Math.PI * 2;
      const x = Math.sin(t) * (Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5)) * 0.42;
      const y = -Math.cos(t) * (Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5)) * 0.36;
      const z = (Math.sin(t * 3) * 0.18);
      geassPoints.push({ x, y, z });
    }

    let angleY = 0;
    let mouseX = 0, mouseY = 0;

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX = (e.clientX - cx) / cx;
      mouseY = (e.clientY - cy) / cy;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const asciiLuminance = " .·:;+=xX#█";

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.fillStyle = 'rgba(28, 24, 42, 0.28)';
      ctx.fillRect(0, 0, w, h);

      // Matrix Rain
      ctx.font = '10.5px "Geist Mono", monospace';
      ctx.textAlign = 'center';
      const colWidth = w / columns;
      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * colWidth + colWidth / 2;
        const y = drops[i] * 15;

        ctx.fillStyle = 'rgba(192, 132, 252, 0.85)';
        ctx.fillText(char, x, y);

        if (drops[i] > 1) {
          ctx.fillStyle = 'rgba(138, 141, 212, 0.35)';
          ctx.fillText(matrixChars[(char.charCodeAt(0) + 3) % matrixChars.length], x, y - 15);
        }

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // 3D Geass ASCII Model
      angleY += 0.022;
      const targetAngleX = 0.18 + mouseY * 0.25;
      const targetAngleY = angleY + mouseX * 0.5;

      const cosY = Math.cos(targetAngleY);
      const sinY = Math.sin(targetAngleY);
      const cosX = Math.cos(targetAngleX);
      const sinX = Math.sin(targetAngleX);

      const scale = Math.min(w, h) * 0.95;
      const cx = w / 2;
      const cy = h / 2 - 8;

      ctx.font = 'bold 11px "Geist Mono", monospace';

      for (let i = 0; i < geassPoints.length; i++) {
        const pt = geassPoints[i];
        let x1 = pt.x * cosY - pt.z * sinY;
        let z1 = pt.x * sinY + pt.z * cosY;

        let y2 = pt.y * cosX - z1 * sinX;
        let z2 = pt.y * sinX + z1 * cosX;

        const fov = 2.2;
        const pz = z2 + fov;
        const px = cx + (x1 / pz) * scale;
        const py = cy + (y2 / pz) * scale;

        const depthNorm = Math.max(0, Math.min(1, (z2 + 0.35) / 0.7));
        const alpha = 0.45 + depthNorm * 0.55;
        const charIdx = Math.floor(depthNorm * (asciiLuminance.length - 1));
        const glyph = asciiLuminance[charIdx];

        if (depthNorm > 0.65) {
          ctx.fillStyle = `rgba(242, 240, 248, ${alpha})`;
          ctx.shadowColor = '#C084FC';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(183, 185, 229, ${alpha * 0.75})`;
          ctx.shadowBlur = 0;
        }
        ctx.fillText(glyph, px, py);
      }
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [active]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1.25 / 1',
      background: 'radial-gradient(circle at center, rgba(192, 132, 252, 0.05), transparent 70%)',
      borderRadius: 14,
      border: '1px solid rgba(255, 255, 255, 0.04)',
      overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}

// ── GatewayScreen: 100vw × 100vh Fullscreen Cinematic Lock / Boot Screen ──
function GatewayScreen({ lang, setLang, onUnlock, progress = 0 }) {
  const isMobile = window.PH.useIsMobile();
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '16px 16px 24px' : '24px 32px 30px',
      position: 'relative',
      zIndex: 10,
      boxSizing: 'border-box',
    }}>
      {/* Top Session Bar */}
      <header style={{
        width: '100%',
        maxWidth: 1040,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        background: 'rgba(45, 42, 60, 0.45)',
        backdropFilter: 'blur(20px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 18,
        boxShadow: '0 12px 36px rgba(10, 8, 20, 0.35)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <PI.logo size={36} style={{ color: '#C084FC', filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))' }} />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: M.text1, letterSpacing: '-.01em' }}>{Dp.PROFILE.brand}</div>
            <div style={{ fontFamily: M.mono, fontSize: 10, color: M.text3 }}>{Dp.PROFILE.handle}</div>
          </div>
        </div>

        {!isMobile && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: M.mono, fontSize: 10.5, color: M.text3,
            letterSpacing: '.14em', textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.03)', padding: '5px 14px', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#9DE3BD', boxShadow: '0 0 8px #9DE3BD' }} />
            <span>SESSION: GDL-GATEWAY // [LIVE]</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,.06)', padding: 2, borderRadius: 8 }}>
            {['es', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)} className="interactive-btn" style={{
                background: lang === l ? 'rgba(255,255,255,.12)' : 'transparent',
                border: 'none', color: lang === l ? M.text1 : M.text3,
                fontFamily: M.mono, fontSize: 10, fontWeight: 600, padding: '4px 8px', borderRadius: 6, cursor: 'pointer',
              }}>{l.toUpperCase()}</button>
            ))}
          </div>

          <button
            onClick={onUnlock}
            className="interactive-btn"
            style={{
              padding: '6px 14px',
              background: 'linear-gradient(135deg, #F2F0F8, #DED9EF)',
              color: '#2D2A3D', border: 'none', borderRadius: 10,
              fontFamily: M.sans, fontSize: 12, fontWeight: 600, letterSpacing: '-.01em', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(140,135,200,.35)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <span>{lang === 'es' ? 'Entrar al OS' : 'Enter OS'}</span>
            <span style={{ fontSize: 13 }}>→</span>
          </button>
        </div>
      </header>

      {/* Main Terminal Stage */}
      <div style={{
        width: '100%',
        maxWidth: 1040,
        margin: 'auto 0',
        transform: `scale(${1 - progress * 0.06}) translateY(${progress * 24}px)`,
        opacity: 1 - progress * 0.4,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }}>
        <Glass padding={0} style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Terminal Window Top Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            fontFamily: M.mono, fontSize: 11, color: 'rgba(242, 240, 248, 0.6)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56', boxShadow: '0 0 6px rgba(255,95,86,0.4)' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', boxShadow: '0 0 6px rgba(255,189,46,0.4)' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27C93F', boxShadow: '0 0 6px rgba(39,201,63,0.4)' }} />
            </div>
            <div>bash · {Dp.PROFILE.handle}@guadalajara ~ (fastfetch)</div>
            <div style={{ color: '#C084FC', letterSpacing: '.06em' }}>[v2026.09]</div>
          </div>

          {/* Terminal Body */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.15fr 1fr',
            padding: isMobile ? '20px 16px' : '32px',
            gap: isMobile ? 22 : 32,
            alignItems: 'center',
          }}>
            <AsciiGeassCanvas active={true} />

            {/* Fastfetch Table */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 9.5,
              fontFamily: M.mono, fontSize: isMobile ? 12 : 13, lineHeight: 1.5,
            }}>
              <div style={{
                marginBottom: 6, paddingBottom: 10,
                borderBottom: '1px dashed rgba(255, 255, 255, 0.12)',
              }}>
                <span style={{ color: '#C084FC', fontWeight: 600 }}>{Dp.PROFILE.handle}</span>
                <span style={{ color: 'rgba(255,255,255,.4)' }}>@</span>
                <span style={{ color: '#B7B9E5' }}>guadalajara</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ width: 100, color: '#C084FC', fontWeight: 500, flexShrink: 0 }}>Architect</span>
                <span style={{ color: 'rgba(242,240,248,0.3)', marginRight: 10 }}>:</span>
                <span style={{ color: M.text1 }}>{Dp.PROFILE.realName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ width: 100, color: '#C084FC', fontWeight: 500, flexShrink: 0 }}>Status</span>
                <span style={{ color: 'rgba(242,240,248,0.3)', marginRight: 10 }}>:</span>
                <span style={{ color: M.mint, fontWeight: 500 }}>{lang === 'es' ? 'Lic. Ciencia de Datos & IA @ UdeG' : 'B.Sc. Data Science & AI @ UdeG'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ width: 100, color: '#C084FC', fontWeight: 500, flexShrink: 0 }}>Engines</span>
                <span style={{ color: 'rgba(242,240,248,0.3)', marginRight: 10 }}>:</span>
                <span style={{ color: '#F2F0F8', fontWeight: 500 }}>étoile & mise (AGPLv3)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ width: 100, color: '#C084FC', fontWeight: 500, flexShrink: 0 }}>Domain</span>
                <span style={{ color: 'rgba(242,240,248,0.3)', marginRight: 10 }}>:</span>
                <span style={{ color: M.text1 }}>{lang === 'es' ? 'Motores Internos & Pipelines' : 'Internal Engines & Pipelines'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ width: 100, color: '#C084FC', fontWeight: 500, flexShrink: 0 }}>Stack</span>
                <span style={{ color: 'rgba(242,240,248,0.3)', marginRight: 10 }}>:</span>
                <span style={{ color: M.text1 }}>Python · GAS V8 · Node · Supabase</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ width: 100, color: '#C084FC', fontWeight: 500, flexShrink: 0 }}>Location</span>
                <span style={{ color: 'rgba(242,240,248,0.3)', marginRight: 10 }}>:</span>
                <span style={{ color: M.text1 }}>{Dp.PROFILE.city}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ width: 100, color: '#C084FC', fontWeight: 500, flexShrink: 0 }}>System</span>
                <span style={{ color: 'rgba(242,240,248,0.3)', marginRight: 10 }}>:</span>
                <span style={{ color: M.text1 }}>Crystal & Squircle Architecture</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ width: 100, color: '#C084FC', fontWeight: 500, flexShrink: 0 }}>License</span>
                <span style={{ color: 'rgba(242,240,248,0.3)', marginRight: 10 }}>:</span>
                <span style={{ color: '#B7B9E5' }}>GNU AGPLv3 (Protected Engines)</span>
              </div>

              {/* Terminal Palette Chips */}
              <div style={{
                display: 'flex', gap: 6, marginTop: 10, paddingTop: 12,
                borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
              }}>
                <div style={{ width: 24, height: 12, borderRadius: 3, background: '#1C182A', border: '1px solid rgba(255,255,255,0.1)' }} />
                <div style={{ width: 24, height: 12, borderRadius: 3, background: '#5C5778' }} />
                <div style={{ width: 24, height: 12, borderRadius: 3, background: '#8A8DD4' }} />
                <div style={{ width: 24, height: 12, borderRadius: 3, background: '#B7B9E5' }} />
                <div style={{ width: 24, height: 12, borderRadius: 3, background: '#C084FC' }} />
                <div style={{ width: 24, height: 12, borderRadius: 3, background: '#9DE3BD' }} />
                <div style={{ width: 24, height: 12, borderRadius: 3, background: '#E8B5C8' }} />
                <div style={{ width: 24, height: 12, borderRadius: 3, background: '#F2F0F8' }} />
              </div>
            </div>
          </div>
        </Glass>
      </div>

      {/* Bottom Scroll / Unlock Pill */}
      <div
        onClick={onUnlock}
        className="interactive-btn"
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 22px',
          background: 'rgba(45, 42, 60, 0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(192, 132, 252, 0.3)',
          borderRadius: 30,
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(168, 85, 247, 0.15)',
          transition: 'border-color .2s, transform .2s, box-shadow .2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#C084FC';
          e.currentTarget.style.transform = 'translateY(2px)';
          e.currentTarget.style.boxShadow = '0 12px 36px rgba(168, 85, 247, 0.3)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.3)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(168, 85, 247, 0.15)';
        }}
      >
        <span style={{
          fontFamily: M.mono, fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
          color: M.text1,
        }}>
          {lang === 'es' ? 'Desliza hacia abajo o haz clic para entrar' : 'Scroll down or click to enter Spatial OS'}
        </span>
        <span style={{
          color: '#C084FC',
          animation: 'bounce 1.6s infinite ease-in-out',
          fontSize: 14,
        }}>↓</span>
      </div>
    </div>
  );
}

// ───────────────────────── OVERVIEW PAGE (Executive Cockpit) ─────────────────────────
function Overview({ lang, onJump }) {
  const isMobile = window.PH.useIsMobile();
  const etoileProject = Dp.PROJECTS.find(p => p.id === 'etoile');
  const miseProject = Dp.PROJECTS.find(p => p.id === 'mise');

  return (
    <div style={{ paddingBottom: 60, paddingTop: 10 }}>
      <PageHero
        kicker={lang === 'es' ? 'Cockpit Ejecutivo' : 'Executive Cockpit'}
        italic={lang === 'es' ? 'Arquitectura de' : 'Architecture of'}
        title={Dp.PROFILE.realName}
        sub={lang === 'es'
          ? 'Diseño y despliegue de sistemas internos, pipelines de ingesta asíncrona y plataformas operativas en tiempo real bajo estándar de grado industrial.'
          : 'Design and deployment of internal systems, asynchronous ingestion pipelines, and real-time operational platforms built to industrial standards.'}
        accent={M.cool}
      />

      {/* Featured Core Systems Bento Grid */}
      <div style={{ marginTop: 10, marginBottom: 40 }}>
        <SectionHeader
          kicker={lang === 'es' ? 'Sistemas Insignia' : 'Core Engines'}
          title={lang === 'es' ? 'Motores Operativos en Producción' : 'Production Operating Engines'}
          sub={lang === 'es' ? 'Sistemas activos con licencia GNU AGPLv3. Código protegido y arquitectura de alta disponibilidad.' : 'Active systems under GNU AGPLv3. Protected code and high-availability architecture.'}
        />
        
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
          {/* étoile Card */}
          {etoileProject && (
            <Reveal delay={60}>
              <Glass padding={24} style={{ display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{
                    fontFamily: M.mono, fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: 6,
                    background: 'rgba(157, 227, 189, 0.12)', color: M.mint, border: '1px solid rgba(157, 227, 189, 0.25)',
                  }}>
                    {etoileProject.year} · {etoileProject.status[lang]} · AGPLv3
                  </span>
                  <span style={{ fontFamily: M.mono, fontSize: 11, color: M.text3 }}>#01</span>
                </div>
                <h3 style={{ fontFamily: M.sans, fontSize: 24, fontWeight: 600, color: M.text1, margin: '0 0 8px', letterSpacing: '-.02em' }}>
                  {etoileProject.name}
                </h3>
                <p style={{ fontSize: 13.5, color: M.text2, lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                  {etoileProject.tagline[lang]}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                  {['Supabase (PostgreSQL)', 'Netlify Functions', 'Apify Webhooks', 'RLS Auth'].map((tag, i) => (
                    <span key={i} style={{
                      fontFamily: M.mono, fontSize: 9.5, color: '#B7B9E5',
                      background: 'rgba(183, 185, 229, 0.08)', padding: '2px 7px', borderRadius: 4,
                    }}>{tag}</span>
                  ))}
                </div>
                <a
                  href="#/proyectos/etoile"
                  onClick={(e) => { e.preventDefault(); onJump('#/proyectos/etoile'); }}
                  className="interactive-btn"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: M.text1, textDecoration: 'none', fontFamily: M.mono, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase',
                  }}
                >
                  <span>{lang === 'es' ? 'Ver arquitectura y pipeline' : 'View architecture & pipeline'}</span>
                  <span>→</span>
                </a>
              </Glass>
            </Reveal>
          )}

          {/* mise Card */}
          {miseProject && (
            <Reveal delay={120}>
              <Glass padding={24} style={{ display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{
                    fontFamily: M.mono, fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: 6,
                    background: 'rgba(157, 227, 189, 0.12)', color: M.mint, border: '1px solid rgba(157, 227, 189, 0.25)',
                  }}>
                    {miseProject.year} · {miseProject.status[lang]} · AGPLv3
                  </span>
                  <span style={{ fontFamily: M.mono, fontSize: 11, color: M.text3 }}>#02</span>
                </div>
                <h3 style={{ fontFamily: M.sans, fontSize: 24, fontWeight: 600, color: M.text1, margin: '0 0 8px', letterSpacing: '-.02em' }}>
                  {miseProject.name}
                </h3>
                <p style={{ fontSize: 13.5, color: M.text2, lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                  {miseProject.tagline[lang]}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                  {['Google Apps Script V8', 'Picking Kiosk 1050x700', 'A4:L _SYNC', 'Zero External Deps'].map((tag, i) => (
                    <span key={i} style={{
                      fontFamily: M.mono, fontSize: 9.5, color: '#B7B9E5',
                      background: 'rgba(183, 185, 229, 0.08)', padding: '2px 7px', borderRadius: 4,
                    }}>{tag}</span>
                  ))}
                </div>
                <a
                  href="#/proyectos/mise"
                  onClick={(e) => { e.preventDefault(); onJump('#/proyectos/mise'); }}
                  className="interactive-btn"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: M.text1, textDecoration: 'none', fontFamily: M.mono, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase',
                  }}
                >
                  <span>{lang === 'es' ? 'Ver arquitectura y pipeline' : 'View architecture & pipeline'}</span>
                  <span>→</span>
                </a>
              </Glass>
            </Reveal>
          )}
        </div>
      </div>

      {/* Snapshot */}
      <SectionHeader
        kicker={lang === 'es' ? 'Estado actual' : 'Currently'}
        title={lang === 'es' ? 'En qué estoy esta semana' : 'What I’m on this week'}
      />
      <Reveal delay={80}>
        <Glass padding={26}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 18 : '18px 36px' }}>
            {Dp.PERSONAL.now[lang].map(([label, val], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12, alignItems: 'baseline',
                paddingBottom: i < Dp.PERSONAL.now[lang].length - 2 ? 12 : 0,
                borderBottom: i < Dp.PERSONAL.now[lang].length - 2 ? `1px solid ${M.glassBorder}` : 'none',
              }}>
                <span style={{ fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.14em', textTransform: 'uppercase' }}>{label}</span>
                <span style={{ fontFamily: M.sans, fontSize: 16, fontWeight: 500, color: M.text1, lineHeight: 1.3, letterSpacing: '-.01em' }}>{val}</span>
              </div>
            ))}
          </div>
        </Glass>
      </Reveal>

      {/* Short bio */}
      <div style={{ marginTop: 40 }}>
        <SectionHeader
          kicker={lang === 'es' ? 'En corto' : 'In short'}
          title={lang === 'es' ? 'Quién soy detrás del handle' : 'Who I am behind the handle'}
          sub={lang === 'es' ? 'Resumen breve. La versión larga vive en Sobre mí.' : 'Quick read. The long version lives in About me.'}
        />
        <Reveal delay={80}>
          <Glass padding={28}>
            <p style={{
              fontFamily: M.sans, fontSize: 19,
              lineHeight: 1.55, color: M.text1, fontWeight: 400, marginBottom: 14, margin: 0, letterSpacing: '-.012em',
            }}>{Dp.t(Dp.ABOUT, lang)[0]}</p>
            <p style={{
              fontSize: 14.5, color: M.text2, lineHeight: 1.7, marginTop: 16, marginBottom: 0,
            }}>{Dp.t(Dp.ABOUT, lang)[1]}</p>
            <div style={{
              marginTop: 22, paddingTop: 18, borderTop: `1px solid ${M.glassBorder}`,
              display: 'flex', gap: 18, fontFamily: M.mono, fontSize: 11, color: M.text3, letterSpacing: '.04em', flexWrap: 'wrap',
            }}>
              <span>{Dp.t(Dp.EDUCATION[0].degree, lang)}</span>
              <span>·</span>
              <span>{Dp.t(Dp.EDUCATION[0].inst, lang)}</span>
              <span>·</span>
              <span style={{ color: M.cool }}>{Dp.t(Dp.EDUCATION[0].periodI18n, lang)}</span>
            </div>
            <button
              onClick={() => onJump('#/sobre-mi')}
              style={{
                marginTop: 18,
                background: 'transparent', border: 'none',
                color: M.cool, cursor: 'pointer',
                fontFamily: M.mono, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
                padding: 0,
              }}
            >{Dp.UI.cta.seeAbout[lang]} →</button>
          </Glass>
        </Reveal>
      </div>

      {/* Explore — nav cards */}
      <div style={{ marginTop: 50 }}>
        <SectionHeader
          kicker={lang === 'es' ? 'Explorar' : 'Explore'}
          title={lang === 'es' ? 'Dónde seguir' : 'Where to go next'}
        />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 18 }}>
          <Reveal delay={60}><NavCard to="#/proyectos" title={Dp.UI.routes.projects[lang]} sub={lang === 'es' ? 'Cosas que se entregan los lunes a las 9. Casos completos, datos reales.' : 'Things that ship Monday at 9. Full cases, real data.'} accent={M.cool} onJump={onJump} /></Reveal>
          <Reveal delay={130}><NavCard to="#/sobre-mi" title={Dp.UI.routes.about[lang]} sub={lang === 'es' ? 'Trayectoria, educación, idiomas, reconocimientos y notas escritas.' : 'Background, education, languages, awards and written notes.'} accent={M.mint} onJump={onJump} /></Reveal>
          <Reveal delay={200}><NavCard to="#/contacto" title={Dp.UI.routes.contact[lang]} sub={lang === 'es' ? 'Para colaboraciones, demos privadas o simplemente saludar.' : 'For collabs, private demos or just to say hi.'} accent={M.warm} onJump={onJump} /></Reveal>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── PROJECTS PAGE (lista) ─────────────────────────
function ProjectsTOC({ projects, lang, onJump }) {
  const [open, setOpen] = useStateP(true);
  const isMobile = window.PH.useIsMobile();
  return (
    <Glass padding={0} style={{ overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 22px', background: 'transparent', border: 'none', cursor: 'pointer',
          color: M.text1, textAlign: 'left',
          fontFamily: M.mono, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform .25s', color: M.cool }}>
          <path d="M6 4l4 4-4 4" />
        </svg>
        <span style={{ color: M.text2 }}>{lang === 'es' ? 'Índice' : 'Index'}</span>
        <span style={{ color: M.text3 }}>·</span>
        <span style={{ color: M.text3 }}>{projects.length} {lang === 'es' ? 'proyectos' : 'projects'}</span>
        <span style={{ marginLeft: 'auto', color: M.text3, fontSize: 10 }}>{open ? (lang === 'es' ? 'ocultar' : 'hide') : (lang === 'es' ? 'mostrar' : 'show')}</span>
      </button>
      <div style={{
        maxHeight: open ? 800 : 0, overflow: 'hidden',
        transition: 'max-height .35s cubic-bezier(.2,.7,.3,1)',
      }}>
        <ol style={{ listStyle: 'none', margin: 0, padding: '4px 0 14px' }}>
          {projects.map((p, i) => {
            const name = typeof p.name === 'string' ? p.name : Dp.t(p.name, lang);
            return (
              <li key={p.id}>
                <a
                  href={`#/proyectos/${p.id}`}
                  onClick={(e) => { e.preventDefault(); onJump(`#/proyectos/${p.id}`); }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '24px 1fr auto' : '90px 1fr auto auto',
                    gap: 14,
                    padding: isMobile ? '12px 16px' : '10px 22px 10px 56px',
                    alignItems: 'center',
                    textDecoration: 'none', color: M.text1,
                    borderTop: `1px solid ${M.glassBorder}`,
                    transition: 'background .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontFamily: M.mono, fontSize: 10.5, color: M.text3, letterSpacing: '.06em' }}>{p.idx}</span>
                  <span style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'baseline', gap: isMobile ? 2 : 10 }}>
                    <span style={{ fontFamily: M.sans, fontSize: 16, fontWeight: 500, color: M.text1, lineHeight: 1.2, letterSpacing: '-.01em' }}>{name}</span>
                    <span style={{ fontSize: 12.5, color: M.text2 }}>{isMobile ? '' : '— '}{Dp.t(p.tagline, lang)}</span>
                  </span>
                  <span style={{
                    fontFamily: M.mono, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase',
                    color: p.accent === 'gold' ? M.mint : M.cool,
                    padding: '2px 8px', borderRadius: 100,
                    border: `1px solid ${(p.accent === 'gold' ? M.mint : M.cool) + '55'}`,
                  }}>{Dp.t(p.status, lang)}</span>
                  {!isMobile && <span style={{ fontFamily: M.mono, fontSize: 11, color: M.text3 }}>→</span>}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </Glass>
  );
}

function ProjectCardBig({ p, lang, onJump, idx }) {
  const [ref, shown] = window.PH.useReveal();
  const [hover, setHover] = useStateP(false);
  const name = typeof p.name === 'string' ? p.name : Dp.t(p.name, lang);
  const isFirst = idx === 0;
  const accent = isFirst ? M.cool : M.mint;
  const accentDeep = isFirst ? M.coolDeep : M.mintDeep;
  const grad = isFirst
    ? 'linear-gradient(135deg, rgba(124,165,204,.30) 0%, rgba(168,196,226,.18) 70%)'
    : 'linear-gradient(135deg, rgba(92,184,147,.25) 0%, rgba(141,227,189,.15) 70%)';
  return (
    <div
      ref={ref}
      onClick={() => onJump(`#/proyectos/${p.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? M.glassHi : M.glass,
        border: `1px solid ${hover ? M.glassBorderHi : M.glassBorder}`,
        borderRadius: M.rXl, overflow: 'hidden', cursor: 'pointer',
        backdropFilter: 'blur(18px) saturate(1.1)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.1)',
        boxShadow: hover ? '0 24px 60px -18px rgba(15,12,30,.55)' : '0 10px 30px -12px rgba(15,12,30,.30)',
        opacity: shown ? 1 : 0,
        transform: shown ? (hover ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(20px)',
        transition: 'opacity .8s, transform .35s cubic-bezier(.2,.7,.3,1), box-shadow .25s, border-color .25s, background .25s',
      }}
    >
      <div style={{ height: 160, position: 'relative', overflow: 'hidden', background: grad, display: 'flex', alignItems: 'flex-end', padding: 18 }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .55 }}>
          <AnimSparkline data={p.series} color={accent} height={150} />
        </div>
        <span style={{
          fontFamily: M.mono, fontSize: 9.5, fontWeight: 500,
          letterSpacing: '.12em', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: 7, zIndex: 2,
          background: 'rgba(255,255,255,.14)', color: M.text1,
          backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,.16)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, boxShadow: `0 0 6px ${accent}` }} />
          {Dp.t(p.status, lang)}
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: M.mono, fontSize: 10, color: 'rgba(255,255,255,.5)', zIndex: 2, alignSelf: 'flex-start' }}>{p.idx} · {p.year}</span>
      </div>
      <div style={{ padding: '18px 20px 20px' }}>
        <h3 style={{ fontFamily: M.sans, fontSize: 24, color: M.text1, lineHeight: 1.15, margin: 0, fontWeight: 500, marginBottom: 8, letterSpacing: '-.025em' }}>{name}</h3>
        <p style={{ fontSize: 13, color: M.text2, lineHeight: 1.6, margin: 0, marginBottom: 14 }}>{Dp.t(p.tagline, lang)}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          {p.stack.slice(0, 5).map(s => (
            <span key={s} style={{ fontFamily: M.mono, fontSize: 10, color: M.text2, background: 'rgba(255,255,255,.04)', padding: '4px 9px', borderRadius: 7, border: '1px solid rgba(255,255,255,.05)' }}>{s}</span>
          ))}
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 14, borderTop: `1px solid ${M.glassBorder}`,
          fontFamily: M.mono, fontSize: 10.5, color: accent, letterSpacing: '.1em',
        }}>
          <span>{lang === 'es' ? 'VER CASO' : 'VIEW CASE'}</span>
          <span style={{ transform: hover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform .25s' }}>→</span>
        </div>
      </div>
    </div>
  );
}

function Projects({ lang, onJump }) {
  const isMobile = window.PH.useIsMobile();
  const projects = Dp.visibleProjects();
  return (
    <div style={{ paddingBottom: 60 }}>
      <PageHero
        kicker={lang === 'es' ? 'Catálogo' : 'Catalog'}
        italic={Dp.UI.routes.projects[lang]}
        sub={lang === 'es'
          ? 'Productos digitales que están entregando valor hoy. Cada uno se puede explorar en detalle.'
          : 'Digital products delivering value today. Each can be explored in detail.'}
      />

      <Reveal delay={60}>
        <ProjectsTOC projects={projects} lang={lang} onJump={onJump} />
      </Reveal>

      <div style={{ marginTop: 30 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
          {projects.map((p, i) => <ProjectCardBig key={p.id} p={p} lang={lang} onJump={onJump} idx={i} />)}
        </div>
      </div>

      <div style={{ marginTop: 30, textAlign: 'center', fontFamily: M.mono, fontSize: 11, color: M.text3, letterSpacing: '.06em' }}>
        {lang === 'es'
          ? 'Más proyectos pronto. Sígueme en GitHub para los próximos drops.'
          : 'More projects soon. Follow me on GitHub for upcoming drops.'}
      </div>
    </div>
  );
}

// ─────────────────────── PROJECT DETAIL PAGE (full page) ───────────────────────
function ProjectDetail({ p, lang, onJump }) {
  const isMobile = window.PH.useIsMobile();
  const name = typeof p.name === 'string' ? p.name : Dp.t(p.name, lang);
  const isFirst = p.id === 'etoile';
  const accent = isFirst ? M.cool : M.mint;
  const accentDeep = isFirst ? M.coolDeep : M.mintDeep;
  const privacyKey = p.privacy || 'public';
  const privacy = Dp.UI.privacy[privacyKey][lang];

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* breadcrumb / back */}
      <Reveal>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          paddingTop: 20, paddingBottom: 4,
          fontFamily: M.mono, fontSize: 11, color: M.text3, letterSpacing: '.04em',
        }}>
          <button
            onClick={() => onJump('#/proyectos')}
            style={{
              background: 'transparent', border: `1px solid ${M.glassBorder}`,
              color: M.text2, padding: '7px 13px', borderRadius: 10, cursor: 'pointer',
              fontFamily: M.mono, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
              transition: 'all .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = M.text1; e.currentTarget.style.borderColor = M.glassBorderHi; }}
            onMouseLeave={e => { e.currentTarget.style.color = M.text2; e.currentTarget.style.borderColor = M.glassBorder; }}
          >← {Dp.UI.cta.backToList[lang]}</button>
          <span style={{ margin: '0 2px', color: M.text4 }}>/</span>
          <a href="#/proyectos" onClick={e => { e.preventDefault(); onJump('#/proyectos'); }} style={{ color: M.text2, textDecoration: 'none' }}>{Dp.UI.routes.projects[lang].toLowerCase()}</a>
          <span style={{ color: M.text4 }}>/</span>
          <span style={{ color: M.text1 }}>{p.id}</span>
        </div>
      </Reveal>

      {/* hero */}
      <header style={{ padding: '20px 0 24px' }}>
        <Reveal delay={60}>
          <div style={{
            fontFamily: M.mono, fontSize: 10, color: accent,
            letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          }}>
            <span style={{ width: 22, height: 1, background: accent }} />
            {p.idx} · {p.year} · {Dp.t(p.status, lang)}
            <span style={{ color: M.text4 }}>·</span>
            <span style={{ color: M.text3 }}>{privacy.label}</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 style={{
            fontFamily: M.sans,
            fontSize: isMobile ? 42 : 86, color: M.text1, lineHeight: 1.0, margin: 0,
            fontWeight: 600, letterSpacing: '-.045em',
            backgroundImage: `linear-gradient(135deg, #F2F0F8 0%, ${accent} 95%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{name}</h1>
        </Reveal>
        <Reveal delay={180}>
          <p style={{ fontSize: 18, color: M.text2, maxWidth: 600, marginTop: 14, fontWeight: 300, lineHeight: 1.5 }}>
            {Dp.t(p.tagline, lang)}
          </p>
        </Reveal>
      </header>

      {/* privacy + actions */}
      <Reveal delay={240}>
        <Glass padding={20} style={{ marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', gap: 22, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: M.mono, fontSize: 10, color: M.warm, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 6 }}>
                {lang === 'es' ? 'Privacidad' : 'Privacy'} · {privacy.label}
              </div>
              <div style={{ fontSize: 13.5, color: M.text2, lineHeight: 1.55, maxWidth: 540 }}>
                {privacy.sub}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 8, width: isMobile ? '100%' : 'auto' }}>
              {p.repoUrl ? (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '9px 16px', textDecoration: 'none',
                    background: M.glass, border: `1px solid ${M.glassBorder}`,
                    color: M.text1, fontFamily: M.sans, fontSize: 12.5, fontWeight: 500, letterSpacing: '-.005em',
                    borderRadius: 12, cursor: 'pointer',
                    transition: 'all .15s',
                    width: isMobile ? '100%' : 'auto',
                    textAlign: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = M.glassHi; e.currentTarget.style.borderColor = M.glassBorderHi; }}
                  onMouseLeave={e => { e.currentTarget.style.background = M.glass; e.currentTarget.style.borderColor = M.glassBorder; }}
                >
                  <span>{lang === 'es' ? 'Ver en GitHub' : 'View on GitHub'}</span>
                  <span>↗</span>
                </a>
              ) : (
                <button
                  onClick={() => onJump('#/contacto')}
                  style={{
                    padding: '9px 16px',
                    background: M.glass, border: `1px solid ${M.glassBorder}`,
                    color: M.text1, fontFamily: M.sans, fontSize: 12.5, fontWeight: 500, letterSpacing: '-.005em',
                    borderRadius: 12, cursor: 'pointer',
                    transition: 'all .15s',
                    width: isMobile ? '100%' : 'auto',
                    textAlign: 'center',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = M.glassHi}
                  onMouseLeave={e => e.currentTarget.style.background = M.glass}
                >{Dp.UI.cta.shots[lang]}</button>
              )}
              <button
                onClick={() => onJump('#/contacto')}
                style={{
                  padding: '9px 18px',
                  background: 'linear-gradient(135deg, #F2F0F8, #DED9EF)',
                  color: '#2D2A3D', border: 'none', borderRadius: 12,
                  fontFamily: M.sans, fontSize: 12.5, fontWeight: 500, letterSpacing: '-.005em', cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(140,135,200,.30), 0 1px 0 rgba(255,255,255,.5) inset',
                  transition: 'transform .15s',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >{Dp.UI.cta.ndaDemo[lang]} →</button>
            </div>
          </div>
        </Glass>
      </Reveal>

      {/* summary */}
      <Reveal delay={60}>
        <Glass padding={28} style={{ marginBottom: 22 }}>
          <div style={{
            fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em',
            textTransform: 'uppercase', marginBottom: 14,
          }}>{lang === 'es' ? 'Resumen del caso' : 'Case summary'}</div>
          <p style={{
            fontFamily: M.sans,
            fontSize: 18, lineHeight: 1.6, color: M.text1, fontWeight: 400,
            margin: 0, paddingLeft: 18, borderLeft: `2px solid ${accent}`, letterSpacing: '-.012em',
          }}>{Dp.t(p.summary, lang)}</p>
        </Glass>
      </Reveal>

      {/* architecture overview */}
      {p.architecture && (
        <Reveal delay={70}>
          <div style={{ marginBottom: 22 }}>
            <div style={{
              fontFamily: M.mono, fontSize: 10, color: accent, letterSpacing: '.18em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>{lang === 'es' ? 'Arquitectura & Sistema' : 'System Architecture'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              <Glass padding={22}>
                <div style={{
                  fontFamily: M.mono, fontSize: 10, color: M.cool, letterSpacing: '.14em',
                  textTransform: 'uppercase', marginBottom: 10,
                }}>01 · {lang === 'es' ? 'Topología' : 'Topology'}</div>
                <p style={{ fontSize: 13.5, color: M.text2, lineHeight: 1.6, margin: 0 }}>
                  {Dp.t(p.architecture.topology, lang)}
                </p>
              </Glass>
              <Glass padding={22}>
                <div style={{
                  fontFamily: M.mono, fontSize: 10, color: M.mint, letterSpacing: '.14em',
                  textTransform: 'uppercase', marginBottom: 10,
                }}>02 · {lang === 'es' ? 'Pipeline de Datos' : 'Data Pipeline'}</div>
                <p style={{ fontSize: 13.5, color: M.text2, lineHeight: 1.6, margin: 0 }}>
                  {Dp.t(p.architecture.pipeline, lang)}
                </p>
              </Glass>
              <Glass padding={22}>
                <div style={{
                  fontFamily: M.mono, fontSize: 10, color: M.warm, letterSpacing: '.14em',
                  textTransform: 'uppercase', marginBottom: 10,
                }}>03 · {lang === 'es' ? 'Mecanismos Clave' : 'Key Mechanisms'}</div>
                <p style={{ fontSize: 13.5, color: M.text2, lineHeight: 1.6, margin: 0 }}>
                  {Dp.t(p.architecture.mechanisms, lang)}
                </p>
              </Glass>
            </div>
          </div>
        </Reveal>
      )}

      {/* bullets */}
      <Reveal delay={80}>
        <Glass padding={28} style={{ marginBottom: 22 }}>
          <div style={{
            fontFamily: M.mono, fontSize: 10, color: accent, letterSpacing: '.18em',
            textTransform: 'uppercase', marginBottom: 18,
          }}>{lang === 'es' ? 'Qué hace' : 'What it does'}</div>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {Dp.t(p.bullets, lang).map((b, i, arr) => (
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '38px 1fr',
                gap: 14, alignItems: 'baseline', padding: '14px 0',
                borderBottom: i < arr.length - 1 ? `1px solid ${M.glassBorder}` : 'none',
              }}>
                <span style={{ fontFamily: M.mono, fontSize: 14, fontWeight: 500, color: accent, letterSpacing: '.04em' }}>0{i + 1}</span>
                <span style={{ fontSize: 15, color: M.text1, lineHeight: 1.6 }}>{b}</span>
              </li>
            ))}
          </ol>
        </Glass>
      </Reveal>

      {/* stack + repo */}
      <Reveal delay={90}>
        <Glass padding={26} style={{ marginBottom: isMobile ? 18 : 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 20, alignItems: 'center' }}>
            <div>
              <div style={{
                fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em',
                textTransform: 'uppercase', marginBottom: 12,
              }}>Stack</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: M.mono, fontSize: 11, color: M.text1,
                    padding: '6px 12px', borderRadius: 100,
                    background: 'rgba(255,255,255,.06)', border: `1px solid ${M.glassBorder}`,
                  }}>{s}</span>
                ))}
              </div>
            </div>
            {p.repoUrl && (
              <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px',
                    background: 'rgba(255,255,255,.06)',
                    border: `1px solid ${M.glassBorder}`,
                    borderRadius: 12,
                    color: M.text1, textDecoration: 'none',
                    fontFamily: M.mono, fontSize: 11, letterSpacing: '.06em',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = M.glassHi; e.currentTarget.style.borderColor = M.glassBorderHi; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.borderColor = M.glassBorder; }}
                >
                  <span>{lang === 'es' ? 'Ver código en GitHub' : 'View code on GitHub'}</span>
                  <span>→</span>
                </a>
              </div>
            )}
          </div>
        </Glass>
      </Reveal>

      {/* next */}
      <Reveal>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 4px', borderTop: `1px solid ${M.glassBorder}`,
        }}>
          <button
            onClick={() => onJump('#/proyectos')}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: M.text2, fontFamily: M.mono, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', padding: 0,
            }}
          >← {Dp.UI.cta.seeAllProjects[lang]}</button>
          <button
            onClick={() => onJump('#/contacto')}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: accent, fontFamily: M.mono, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', padding: 0,
            }}
          >{Dp.UI.cta.contact[lang]} →</button>
        </div>
      </Reveal>
    </div>
  );
}

// ─────────────────────── ABOUT PAGE ───────────────────────
function CompetencyCard({ group, lang, delay }) {
  const [ref, shown] = window.PH.useReveal();
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0, transform: shown ? 'translateY(0)' : 'translateY(8px)',
      transition: `opacity .6s ${delay}ms, transform .6s ${delay}ms`,
      paddingBottom: 16, borderBottom: `1px solid ${M.glassBorder}`, marginBottom: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: M.sans, fontSize: 16, fontWeight: 500, color: M.text1, letterSpacing: '-.01em' }}>{group.domain[lang]}</span>
        <span style={{ fontFamily: M.mono, fontSize: 10, color: M.cool, letterSpacing: '.06em', textTransform: 'uppercase' }}>{group.level[lang]}</span>
      </div>
      <div style={{ fontFamily: M.mono, fontSize: 11, color: M.text3, marginBottom: 8, lineHeight: 1.5 }}>
        {group.desc[lang]}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {group.skills.map(s => (
          <span key={s} style={{
            fontFamily: M.mono, fontSize: 10.5, color: M.text2,
            padding: '3px 9px', borderRadius: 6,
            background: 'rgba(255,255,255,.05)', border: `1px solid ${M.glassBorder}`,
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

const STACK_GROUPS = {
  competencies: [
    {
      domain: { es: 'Backend & Sistemas', en: 'Backend & Systems' },
      level: { es: 'Producción activa', en: 'Active Production' },
      desc: { es: 'Diseño transaccional, orquestación por lotes y APIs serverless desacopladas.', en: 'Transactional design, batch orchestration, and decoupled serverless APIs.' },
      skills: ['Python', 'Node.js', 'Google Apps Script (V8)', 'REST APIs'],
    },
    {
      domain: { es: 'Datos & Persistencia', en: 'Data & Persistence' },
      level: { es: 'Producción activa', en: 'Active Production' },
      desc: { es: 'Modelado relacional, seguridad a nivel de fila y pipelines de ingesta.', en: 'Relational modeling, row-level security, and ingestion pipelines.' },
      skills: ['PostgreSQL / Supabase', 'RLS', 'DuckDB', 'ETL / Scraping'],
    },
    {
      domain: { es: 'Frontend & Dashboards', en: 'Frontend & Dashboards' },
      level: { es: 'Producción activa', en: 'Active Production' },
      desc: { es: 'Interfaces reactivas de alta velocidad, estéticas Crystal & Squircle y modales sin framework.', en: 'High-speed reactive UIs, Crystal & Squircle aesthetics, and frameworkless modals.' },
      skills: ['JavaScript ES6+', 'HTML5 / Modern CSS', 'Chart.js', 'Responsive Touch UI'],
    },
  ],
  tools: ['Apify Actors', 'Supabase CLI', 'clasp', 'GitHub Actions', 'n8n', 'openpyxl', 'Postman'],
  exploring: [
    { name: 'PyTorch', note: { es: 'modelos predictivos', en: 'predictive models' } },
    { name: 'DuckDB + Parquet', note: { es: 'analítica columnar local', en: 'local columnar analytics' } },
    { name: 'Rust', note: { es: 'sistemas y tooling', en: 'systems & tooling' } },
  ],
};

function About({ lang, onJump }) {
  const isMobile = window.PH.useIsMobile();
  const [activeNote, setActiveNote] = useStateP(null);
  return (
    <div style={{ paddingBottom: 65 }}>
      <PageHero
        kicker={lang === 'es' ? 'Editorial' : 'Editorial'}
        italic={Dp.UI.routes.about[lang]}
        sub={lang === 'es'
          ? 'Cómo llegué aquí, qué estoy estudiando, qué he ganado, y qué he escrito.'
          : 'How I got here, what I’m studying, what I’ve won, and what I’ve written.'}
      />

      {/* Long bio */}
      <Reveal delay={60}>
        <Glass padding={32} style={{ marginBottom: 28 }}>
          <p style={{
            fontFamily: M.sans, fontSize: 22,
            lineHeight: 1.5, color: M.text1, fontWeight: 400, marginTop: 0, marginBottom: 22, letterSpacing: '-.018em',
          }}>{Dp.t(Dp.ABOUT, lang)[0]}</p>
          {Dp.t(Dp.ABOUT, lang).slice(1).map((p, i) => (
            <p key={i} style={{
              fontSize: 15, color: M.text2, lineHeight: 1.75,
              marginBottom: i === Dp.t(Dp.ABOUT, lang).length - 2 ? 0 : 14,
            }}>{p}</p>
          ))}
        </Glass>
      </Reveal>

      {/* Education + Languages */}
      <SectionHeader
        kicker={lang === 'es' ? 'Formación' : 'Formation'}
        title={Dp.UI.sections.education[lang]}
      />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 18, marginBottom: 38 }}>
        <Reveal delay={60}>
          <Glass padding={26}>
            {Dp.EDUCATION.map((e, i) => (
              <div key={i} style={{
                paddingTop: i > 0 ? 14 : 0, paddingBottom: 14,
                borderTop: i > 0 ? `1px solid ${M.glassBorder}` : 'none',
              }}>
                <div style={{ fontFamily: M.mono, fontSize: 10, color: M.cool, letterSpacing: '.1em' }}>
                  {Dp.t(e.periodI18n, lang)}
                </div>
                <div style={{ fontFamily: M.sans, fontSize: 17, fontWeight: 500, color: M.text1, marginTop: 4, lineHeight: 1.3, letterSpacing: '-.01em' }}>
                  {Dp.t(e.degree, lang)}
                </div>
                <div style={{ fontSize: 13, color: M.text2, marginTop: 4 }}>{Dp.t(e.inst, lang)}</div>
              </div>
            ))}
          </Glass>
        </Reveal>
        <Reveal delay={140}>
          <Glass padding={22}>
            <div style={{
              fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>{lang === 'es' ? 'Idiomas' : 'Languages'}</div>
            {Dp.LANGUAGES.map((l, i) => (
              <div key={i} style={{ marginBottom: i < Dp.LANGUAGES.length - 1 ? 14 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: M.sans, fontSize: 15, fontWeight: 500, color: M.text1, letterSpacing: '-.01em' }}>{Dp.t(l.name, lang)}</span>
                  <span style={{ fontFamily: M.mono, fontSize: 10, color: M.text3 }}>{Dp.t(l.level, lang)}</span>
                </div>
                <div style={{ height: 2, background: 'rgba(255,255,255,.06)', borderRadius: 1, marginTop: 6 }}>
                  <div style={{ height: '100%', width: l.pct + '%', background: M.cool, borderRadius: 1 }} />
                </div>
              </div>
            ))}
          </Glass>
        </Reveal>
      </div>

      {/* Stack */}
      <SectionHeader
        kicker={lang === 'es' ? 'Habilidades' : 'Skills'}
        title={lang === 'es' ? 'Lo que sé hacer, con honestidad' : 'What I can do, honestly'}
        sub={lang === 'es'
          ? 'Tres núcleos en los que opero sin asistencia, herramientas que ya uso, y lo que estoy explorando ahora.'
          : 'Three cores I operate without assistance, tools I already use, and what I’m exploring now.'}
      />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 18, marginBottom: 38 }}>
        <Reveal delay={60}>
          <Glass padding={26}>
            <div style={{ fontFamily: M.mono, fontSize: 10, color: M.cool, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 18 }}>
              {lang === 'es' ? 'Dominios de Arquitectura' : 'Architecture Domains'} · 03
            </div>
            {STACK_GROUPS.competencies.map((group, i) => (
              <CompetencyCard key={group.domain.en} group={group} lang={lang} delay={100 + i * 100} />
            ))}
            <div style={{ marginBottom: -16 }} />
          </Glass>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Reveal delay={160}>
            <Glass padding={22}>
              <div style={{ fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 14 }}>
                {lang === 'es' ? 'Herramientas en uso' : 'Tools in use'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {STACK_GROUPS.tools.map((t, i) => (
                  <span key={t} style={{
                    fontFamily: M.mono, fontSize: 11, color: M.text2,
                    padding: '5px 10px', borderRadius: 100,
                    background: 'rgba(255,255,255,.05)', border: `1px solid ${M.glassBorder}`,
                    opacity: 0, animation: `mfadeup .4s ${i * 50 + 200}ms forwards`,
                  }}>{t}</span>
                ))}
              </div>
            </Glass>
          </Reveal>
          <Reveal delay={240}>
            <Glass padding={22}>
              <div style={{ fontFamily: M.mono, fontSize: 10, color: M.mint, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 14 }}>
                {lang === 'es' ? 'Explorando' : 'Exploring'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {STACK_GROUPS.exploring.map(s => (
                  <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: M.sans, fontSize: 15, fontWeight: 500, color: M.text1, letterSpacing: '-.01em' }}>{s.name}</span>
                    <span style={{ fontFamily: M.mono, fontSize: 10.5, color: M.text3, letterSpacing: '.04em' }}>{Dp.t(s.note, lang)}</span>
                  </div>
                ))}
              </div>
            </Glass>
          </Reveal>
        </div>
      </div>

      {/* Timeline + Achievements */}
      <SectionHeader
        kicker={lang === 'es' ? 'Cronología' : 'Chronology'}
        title={lang === 'es' ? 'De dónde vengo y a qué juego' : 'Where I’m from, what I’m playing at'}
      />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: 18, marginBottom: 38 }}>
        <Reveal delay={60}>
          <Glass padding={26}>
            <div style={{ fontFamily: M.mono, fontSize: 10, color: M.cool, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 18 }}>
              {Dp.UI.sections.timeline[lang]}
            </div>
            {Dp.TIMELINE.map((t, i, arr) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '78px 14px 1fr', gap: 0, alignItems: 'baseline' }}>
                <div style={{ fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.06em', textTransform: 'uppercase', paddingTop: 3 }}>
                  {Dp.t(t.date, lang)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: t.active ? M.mint : 'transparent',
                    border: `1.5px solid ${t.active ? M.mint : M.text4}`,
                    marginTop: 4, flexShrink: 0,
                    boxShadow: t.active ? `0 0 0 4px ${M.mint}22, 0 0 12px ${M.mint}66` : 'none',
                  }} />
                  {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: M.glassBorder, marginTop: 4, minHeight: 22 }} />}
                </div>
                <div style={{ paddingLeft: 8, paddingBottom: 18 }}>
                  <div style={{ fontFamily: M.sans, fontSize: 15, fontWeight: t.active ? 600 : 500, color: t.active ? M.text1 : M.text2, lineHeight: 1.3, letterSpacing: '-.01em' }}>
                    {Dp.t(t.title, lang)}
                  </div>
                  <div style={{ fontSize: 12, color: M.text2, marginTop: 3 }}>{Dp.t(t.sub, lang)}</div>
                </div>
              </div>
            ))}
          </Glass>
        </Reveal>
        <Reveal delay={140}>
          <Glass padding={26}>
            <div style={{
              fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em',
              textTransform: 'uppercase', marginBottom: 18,
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span>{Dp.UI.sections.achievements[lang]}</span>
              <span>2021 — 2024</span>
            </div>
            {Dp.ACHIEVEMENTS.map((a, i, arr) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '74px 1fr auto', gap: 12, alignItems: 'baseline',
                paddingBottom: 11, marginBottom: i < arr.length - 1 ? 11 : 0,
                borderBottom: i < arr.length - 1 ? `1px dashed ${M.glassBorder}` : 'none',
              }}>
                <span style={{ fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.04em' }}>{Dp.t(a.date, lang)}</span>
                <div>
                  <div style={{ fontSize: 13, color: M.text1, fontFamily: M.sans, fontWeight: 500, letterSpacing: '-.005em' }}>{Dp.t(a.title, lang)}</div>
                  <div style={{ fontSize: 11.5, color: M.text2, marginTop: 2 }}>{Dp.t(a.sub, lang)}</div>
                </div>
                <span style={{
                  fontFamily: M.mono, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase',
                  padding: '3px 8px', borderRadius: 6,
                  color: a.tag === 'debate' ? M.warm : a.tag === 'civic' ? M.cool : M.mint,
                  background: 'rgba(255,255,255,.04)', border: `1px solid ${M.glassBorder}`,
                }}>§{a.tag}</span>
              </div>
            ))}
          </Glass>
        </Reveal>
      </div>

      {/* Notes */}
      <SectionHeader
        kicker={lang === 'es' ? 'Notas' : 'Notes'}
        title={lang === 'es' ? 'Pensar en voz alta' : 'Thinking out loud'}
      />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 18, marginBottom: 28 }}>
        {Dp.NOTES.map((n, i) => (
          <Reveal key={n.idx} delay={i * 90}>
            <Glass
              padding={24}
              style={{ cursor: 'pointer', height: '100%' }}
              hover
              onClick={() => setActiveNote(n)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.08em', marginBottom: 16 }}>
                <span>{n.idx}</span>
                <span>{Dp.t(n.date, lang)}</span>
              </div>
              <h4 style={{ fontFamily: M.sans, fontSize: 19, fontWeight: 500, color: M.text1, lineHeight: 1.3, margin: 0, marginBottom: 10, letterSpacing: '-.02em' }}>
                {Dp.t(n.title, lang)}
              </h4>
              <p style={{ fontSize: 13, color: M.text2, lineHeight: 1.6, margin: '10px 0 18px' }}>{Dp.t(n.excerpt, lang)}</p>
              <span style={{ fontFamily: M.mono, fontSize: 10, color: M.cool, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                {lang === 'es' ? 'Leer →' : 'Read →'}
              </span>
            </Glass>
          </Reveal>
        ))}
      </div>

      {/* Modal for full Note */}
      {activeNote && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(15,12,30,.7)', backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'grid', placeItems: 'center', padding: 20,
        }} onClick={() => setActiveNote(null)}>
          <Glass padding={28} style={{
            maxWidth: 540, width: '100%',
            background: 'rgba(30,27,44,.95)', border: '1px solid rgba(255,255,255,.1)',
            boxShadow: '0 24px 60px rgba(10,8,20,.6)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.08em', marginBottom: 16 }}>
              <span>{activeNote.idx}</span>
              <span>{Dp.t(activeNote.date, lang)}</span>
            </div>
            <h3 style={{ fontFamily: M.sans, fontSize: 24, fontWeight: 600, color: M.text1, lineHeight: 1.3, margin: 0, marginBottom: 14, letterSpacing: '-.025em' }}>
              {Dp.t(activeNote.title, lang)}
            </h3>
            <p style={{ fontSize: 15, color: M.text2, lineHeight: 1.7, margin: '14px 0 24px', fontWeight: 300 }}>
              {Dp.t(activeNote.content, lang)}
            </p>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setActiveNote(null)}
                className="interactive-btn"
                style={{
                  background: 'rgba(255,255,255,.05)', border: `1px solid ${M.glassBorder}`,
                  color: M.text1, fontFamily: M.mono, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
                  padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
                  transition: 'background .15s',
                }}
              >
                {lang === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </Glass>
        </div>
      )}
    </div>
  );
}

// ─────────────────────── CONTACT PAGE ───────────────────────
function Contact({ lang, onJump }) {
  const isMobile = window.PH.useIsMobile();
  const list = Dp.CONTACT[lang];
  return (
    <div style={{ paddingBottom: 60 }}>
      <PageHero
        kicker={lang === 'es' ? 'Próximo paso' : 'Next step'}
        italic={lang === 'es' ? 'Hablemos.' : 'Let’s talk.'}
        sub={lang === 'es'
          ? 'Para proyectos cortos, demos privadas o simplemente decir hola. Respuesta en menos de 24 h.'
          : 'For short engagements, private demos or just to say hi. Reply within 24 h.'}
        accent={M.warm}
      />
      <Reveal delay={60}>
        <Glass padding={32}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: 36, alignItems: 'start' }}>
            <div>
              <p style={{
                fontFamily: M.sans, fontSize: 26,
                lineHeight: 1.35, color: M.text1, fontWeight: 400, margin: 0, letterSpacing: '-.022em',
              }}>{lang === 'es'
                ? <>¿Tienes datos que se están <span style={{ color: M.mint }}>perdiendo</span> o un proceso que merece su propia herramienta?</>
                : <>Have data that's <span style={{ color: M.mint }}>slipping through</span>, or a process that deserves its own tool?</>
              }</p>
              <p style={{ fontSize: 14, color: M.text2, lineHeight: 1.7, maxWidth: 480, marginTop: 18 }}>
                {lang === 'es'
                  ? 'Disponible para proyectos cortos de dashboards internos, automatización de reportes y herramientas web.'
                  : 'Available for short engagements on internal dashboards, report automation, and web tools.'}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 18, overflow: 'hidden' }}>
              {list.map((c, i) => {
                const isLink = c.value.includes('.dev') || c.value.includes('.com') || c.value.includes('@');
                const href = c.icon === 'mail' ? `mailto:${c.value}` : `https://${c.value}`;
                return (
                  <a
                    key={i}
                    href={isLink ? href : undefined}
                    target={isLink ? "_blank" : undefined}
                    rel={isLink ? "noopener noreferrer" : undefined}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '16px 20px', textDecoration: 'none',
                      background: 'rgba(255,255,255,.03)', color: M.text1,
                      borderBottom: i < list.length - 1 ? `1px solid ${M.glassBorder}` : 'none',
                      transition: 'background .15s',
                      cursor: isLink ? 'pointer' : 'default',
                    }}
                    onMouseEnter={e => { if (isLink) e.currentTarget.style.background = 'rgba(255,255,255,.07)'; }}
                    onMouseLeave={e => { if (isLink) e.currentTarget.style.background = 'rgba(255,255,255,.03)'; }}
                  >
                    <span style={{ color: M.text3, display: 'inline-flex', flexShrink: 0 }}>
                      {c.icon === 'mail' ? <PI.mail size={16} /> :
                       c.icon === 'github' ? <PI.github size={16} /> :
                       c.icon === 'linkedin' ? <PI.linkedin size={16} /> :
                       c.icon === 'globe' ? <PI.globe size={16} /> :
                       <PI.pin size={16} />}
                    </span>
                    <span style={{ flex: 1, fontSize: 14, color: M.text1, wordBreak: 'break-all' }}>{c.value}</span>
                    {c.placeholder && <span style={{ fontFamily: M.mono, fontSize: 8.5, color: M.warm, padding: '3px 7px', borderRadius: 6, background: 'rgba(232,181,200,.12)', letterSpacing: '.08em', textTransform: 'uppercase' }}>placeholder</span>}
                  </a>
                );
              })}
            </div>
          </div>
        </Glass>
      </Reveal>

      <div style={{
        marginTop: 30, paddingTop: 16, borderTop: `1px solid ${M.glassBorder}`,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.06em',
      }}>
        <span>© 2026 {Dp.PROFILE.realName} · {Dp.PROFILE.brand}</span>
        <span>v.2026.05 · {lang.toUpperCase()}</span>
      </div>
    </div>
  );
}

window.PortPages = { GatewayScreen, AsciiGeassCanvas, Overview, Projects, ProjectDetail, About, Contact };
