/* Page components for the portfolio.
   Each page is a section of the SPA. window.PortPages = { Overview, Projects, ProjectDetail, About, Contact }
*/

const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP } = React;
const Dp = window.PortfolioData;
const { M, Reveal, Glass, SectionHeader, AnimSparkline, StatCard } = window.PortUI;

// ─────────────────────────── helpers ───────────────────────────
function PageHero({ kicker, title, italic, sub, accent = M.cool }) {
  return (
    <header style={{ padding: '40px 0 28px' }}>
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
          fontSize: 68, lineHeight: 1.02, color: M.text1,
          margin: 0, fontWeight: 500, letterSpacing: '-.035em',
        }}>
          {italic && <span style={{ color: M.text2, fontWeight: 400 }}>{italic} </span>}
          {!italic ? title : <span style={{ fontWeight: 600, fontSize: 56, letterSpacing: '-.04em', display: 'block', marginTop: 4,
            color: M.text1,
          }}>{title}</span>}
        </h1>
      </Reveal>
      {sub && (
        <Reveal delay={180}>
          <p style={{ fontSize: 16, color: M.text2, lineHeight: 1.65, maxWidth: 540, marginTop: 18, fontWeight: 300 }}>
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

// ───────────────────────── OVERVIEW PAGE (resumen, focused on HIM) ─────────────────────────
function Overview({ lang, onJump }) {
  return (
    <div style={{ paddingBottom: 60 }}>
      {/* hero */}
      <header style={{ padding: '20px 0 28px' }}>
        <Reveal>
          <div style={{
            fontFamily: M.mono, fontSize: 10.5, color: M.text3,
            letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: M.text3 }} />
            {Dp.t(Dp.HERO.eyebrow, lang)}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{
            fontFamily: M.sans,
            fontSize: 78, lineHeight: 1.0, color: M.text2,
            margin: 0, fontWeight: 400, letterSpacing: '-.035em',
          }}>
            {Dp.t(Dp.HERO.headline, lang)}
            <span style={{
              display: 'block', fontWeight: 600, fontSize: 78, letterSpacing: '-.045em', marginTop: 4,
              color: M.text1,
            }}>{Dp.t(Dp.HERO.headlineStrong, lang)}</span>
          </h1>
        </Reveal>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50, alignItems: 'start', marginBottom: 40 }}>
        <Reveal delay={180}>
          <p style={{ fontSize: 16.5, color: M.text2, lineHeight: 1.65, maxWidth: 520, fontWeight: 300, margin: 0 }}>
            {Dp.t(Dp.HERO.sub, lang)}
          </p>
          <div style={{
            fontFamily: M.mono, fontSize: 11, color: M.text3,
            marginTop: 22, letterSpacing: '.04em',
            display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap',
          }}>
            <span>{Dp.t(Dp.PERSONAL.handles, lang)}</span>
          </div>
        </Reveal>

        {/* Personal ID card */}
        <Reveal delay={260}>
          <Glass padding={0} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex' }}>
              {Dp.PERSONAL.facts.map((s, i, arr) => (
                <StatCard key={i} s={s} lang={lang} delay={300 + i * 70} last={i === arr.length - 1} />
              ))}
            </div>
          </Glass>
        </Reveal>
      </div>

      {/* Snapshot */}
      <SectionHeader
        kicker={lang === 'es' ? 'Estado actual' : 'Currently'}
        title={lang === 'es' ? 'En qué estoy esta semana' : 'What I’m on this week'}
      />
      <Reveal delay={80}>
        <Glass padding={26}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 36px' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
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
        maxHeight: open ? 400 : 0, overflow: 'hidden',
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
                    display: 'grid', gridTemplateColumns: '90px 1fr auto auto', gap: 14,
                    padding: '10px 22px 10px 56px', alignItems: 'baseline',
                    textDecoration: 'none', color: M.text1,
                    borderTop: `1px solid ${M.glassBorder}`,
                    transition: 'background .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontFamily: M.mono, fontSize: 10.5, color: M.text3, letterSpacing: '.06em' }}>{p.idx}</span>
                  <span>
                    <span style={{ fontFamily: M.sans, fontSize: 16, fontWeight: 500, color: M.text1, lineHeight: 1.2, marginRight: 10, letterSpacing: '-.01em' }}>{name}</span>
                    <span style={{ fontSize: 12.5, color: M.text2 }}>— {Dp.t(p.tagline, lang)}</span>
                  </span>
                  <span style={{
                    fontFamily: M.mono, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase',
                    color: p.accent === 'gold' ? M.mint : M.cool,
                    padding: '2px 8px', borderRadius: 100,
                    border: `1px solid ${(p.accent === 'gold' ? M.mint : M.cool) + '55'}`,
                  }}>{Dp.t(p.status, lang)}</span>
                  <span style={{ fontFamily: M.mono, fontSize: 11, color: M.text3 }}>→</span>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
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
            fontSize: 86, color: M.text1, lineHeight: 1.0, margin: 0,
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 22, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: M.mono, fontSize: 10, color: M.warm, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 6 }}>
                {lang === 'es' ? 'Privacidad' : 'Privacy'} · {privacy.label}
              </div>
              <div style={{ fontSize: 13.5, color: M.text2, lineHeight: 1.55, maxWidth: 540 }}>
                {privacy.sub}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                padding: '9px 16px',
                background: M.glass, border: `1px solid ${M.glassBorder}`,
                color: M.text1, fontFamily: M.sans, fontSize: 12.5, fontWeight: 500, letterSpacing: '-.005em',
                borderRadius: 12, cursor: 'pointer',
                transition: 'all .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = M.glassHi}
                onMouseLeave={e => e.currentTarget.style.background = M.glass}
              >{Dp.UI.cta.shots[lang]}</button>
              <button
                onClick={() => onJump('#/contacto')}
                style={{
                  padding: '9px 18px',
                  background: 'linear-gradient(135deg, #F2F0F8, #DED9EF)',
                  color: '#2D2A3D', border: 'none', borderRadius: 12,
                  fontFamily: M.sans, fontSize: 12.5, fontWeight: 500, letterSpacing: '-.005em', cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(140,135,200,.30), 0 1px 0 rgba(255,255,255,.5) inset',
                  transition: 'transform .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >{Dp.UI.cta.ndaDemo[lang]} →</button>
            </div>
          </div>
        </Glass>
      </Reveal>

      {/* summary + metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, marginBottom: 22 }}>
        <Reveal delay={60}>
          <Glass padding={28}>
            <div style={{
              fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>{lang === 'es' ? 'Resumen del caso' : 'Case summary'}</div>
            <p style={{
              fontFamily: M.sans,
              fontSize: 19, lineHeight: 1.55, color: M.text1, fontWeight: 400,
              margin: 0, paddingLeft: 18, borderLeft: `2px solid ${accent}`, letterSpacing: '-.012em',
            }}>{Dp.t(p.summary, lang)}</p>
          </Glass>
        </Reveal>
        <Reveal delay={140}>
          <Glass padding={22} style={{ height: '100%' }}>
            <div style={{
              fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>{lang === 'es' ? 'Indicadores' : 'Indicators'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 18px' }}>
              {p.metrics.map((m, i) => (
                <div key={i} style={{ paddingTop: i > 1 ? 12 : 0, borderTop: i > 1 ? `1px solid ${M.glassBorder}` : 'none' }}>
                  <div style={{
                    fontFamily: M.mono, fontSize: 24, fontWeight: 500,
                    color: i === 0 ? accent : M.text1, lineHeight: 1,
                  }}>{m.v}</div>
                  <div style={{ fontFamily: M.mono, fontSize: 9, color: M.text3, letterSpacing: '.06em', textTransform: 'uppercase', marginTop: 6 }}>
                    {Dp.t(m.l, lang)}
                  </div>
                </div>
              ))}
            </div>
          </Glass>
        </Reveal>
      </div>

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

      {/* interactive dataset visualizer / simulator tool */}
      <Reveal delay={60}>
        <div style={{ marginBottom: 22 }}>
          <InteractiveVisualizer p={p} lang={lang} accent={accent} />
        </div>
      </Reveal>

      {/* stack + series */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, marginBottom: 32 }}>
        <Reveal delay={60}>
          <Glass padding={28}>
            <div style={{
              fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em',
              textTransform: 'uppercase', marginBottom: 14,
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
          </Glass>
        </Reveal>
        <Reveal delay={140}>
          <Glass padding={22}>
            <div style={{
              fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>{lang === 'es' ? 'Serie 2026' : 'Series 2026'}</div>
            <div style={{ height: 90 }}>
              <AnimSparkline data={p.series} color={accent} height={90} padTop={10} />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: 8,
              fontFamily: M.mono, fontSize: 9.5, color: M.text3, letterSpacing: '.06em',
            }}>
              {Dp.t(p.seriesLabels, lang).map(l => <span key={l}>{l}</span>)}
            </div>
          </Glass>
        </Reveal>
      </div>

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
function StackBar({ s, lang, delay }) {
  const [ref, shown] = window.PH.useReveal();
  const pct = window.PH.useCountUp(s.pct, shown, { duration: 1200 });
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0, transform: shown ? 'translateY(0)' : 'translateY(8px)',
      transition: `opacity .6s ${delay}ms, transform .6s ${delay}ms`,
      paddingBottom: 16, borderBottom: `1px solid ${M.glassBorder}`, marginBottom: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <span style={{ fontFamily: M.sans, fontSize: 17, fontWeight: 500, color: M.text1, letterSpacing: '-.01em' }}>{s.name}</span>
          <span style={{ fontFamily: M.mono, fontSize: 11, color: M.text3, marginLeft: 12, letterSpacing: '.04em' }}>{Dp.t(s.note, lang)}</span>
        </div>
        <span style={{ fontFamily: M.mono, fontSize: 14, color: M.cool, fontWeight: 500 }}>{pct}<span style={{ fontSize: 11, color: M.text3 }}>%</span></span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: shown ? s.pct + '%' : 0,
          background: `linear-gradient(90deg, ${M.coolDeep}, ${M.cool})`,
          borderRadius: 2, boxShadow: `0 0 8px ${M.cool}55`,
          transition: 'width 1.4s cubic-bezier(.2,.7,.3,1)',
        }} />
      </div>
    </div>
  );
}

const STACK_GROUPS = {
  core: [
    { name: 'Python',     pct: 80, note: { es: 'pipelines · scripts · análisis', en: 'pipelines · scripts · analysis' } },
    { name: 'JavaScript', pct: 72, note: { es: 'dashboards · frontend ligero', en: 'dashboards · lightweight frontends' } },
    { name: 'HTML / CSS', pct: 85, note: { es: 'diseño en código', en: 'design in code' } },
  ],
  tools: ['Apify', 'n8n', 'Chart.js', 'openpyxl', 'Excel avanzado', 'Google Apps Script', 'Power Query', 'GitHub Actions', 'GH Pages'],
  exploring: [
    { name: 'PyTorch', note: { es: 'modelos', en: 'models' } },
    { name: 'SQL · DuckDB', note: { es: 'analítica local', en: 'local analytics' } },
    { name: 'React', note: { es: 'app real', en: 'real app' } },
  ],
};

function About({ lang, onJump }) {
  return (
    <div style={{ paddingBottom: 60 }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginBottom: 38 }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginBottom: 38 }}>
        <Reveal delay={60}>
          <Glass padding={26}>
            <div style={{ fontFamily: M.mono, fontSize: 10, color: M.cool, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 18 }}>
              {lang === 'es' ? 'Núcleo' : 'Core'} · 03
            </div>
            {STACK_GROUPS.core.map((s, i) => (
              <StackBar key={s.name} s={s} lang={lang} delay={100 + i * 100} />
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 18, marginBottom: 38 }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 28 }}>
        {Dp.NOTES.map((n, i) => (
          <Reveal key={n.idx} delay={i * 90}>
            <Glass padding={24} style={{ cursor: 'pointer', height: '100%' }} hover>
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
    </div>
  );
}

// ─────────────────────── CONTACT PAGE ───────────────────────
function Contact({ lang, onJump }) {
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
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 36, alignItems: 'start' }}>
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
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 16px', textDecoration: 'none',
                      background: 'rgba(255,255,255,.03)', color: M.text1,
                      borderBottom: i < list.length - 1 ? `1px solid ${M.glassBorder}` : 'none',
                      transition: 'background .15s',
                      cursor: isLink ? 'pointer' : 'default',
                    }}
                    onMouseEnter={e => { if (isLink) e.currentTarget.style.background = 'rgba(255,255,255,.07)'; }}
                    onMouseLeave={e => { if (isLink) e.currentTarget.style.background = 'rgba(255,255,255,.03)'; }}
                  >
                    <span style={{ color: M.text3, display: 'inline-flex' }}>
                      {c.icon === 'mail' ? <PI.mail size={14} /> :
                       c.icon === 'github' ? <PI.github size={14} /> :
                       c.icon === 'linkedin' ? <PI.linkedin size={14} /> :
                       c.icon === 'globe' ? <PI.globe size={14} /> :
                       <PI.pin size={14} />}
                    </span>
                    <span style={{ fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.1em', textTransform: 'uppercase', width: 64 }}>{c.label}</span>
                    <span style={{ flex: 1, fontSize: 13.5 }}>{c.value}</span>
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

function InteractiveVisualizer({ p, lang, accent }) {
  const [selectedBranch, setSelectedBranch] = useStateP('todos');
  const [inputText, setInputText] = useStateP('');
  const [predictedSentiment, setPredictedSentiment] = useStateP(null);
  const [confidence, setConfidence] = useStateP(0);
  const [customReviews, setCustomReviews] = useStateP([
    { branch: 'Andares', text: 'Excelente servicio y las crepas de Nutella son deliciosas. Volvería siempre.', rating: 5, sentiment: 'positivo', confidence: 0.98 },
    { branch: 'Patria', text: 'Tardaron demasiado en entregar el pedido y las bebidas estaban tibias.', rating: 2, sentiment: 'negativo', confidence: 0.94 },
    { branch: 'Midtown', text: 'El lugar es agradable pero el servicio es regular, nada del otro mundo.', rating: 3, sentiment: 'neutro', confidence: 0.82 },
  ]);

  const branches = ['todos', 'Andares', 'Patria', 'Midtown', 'Galerías GDL', 'Vía Viva', 'Santa Anita', 'La Perla', 'Forum Tlaquepaque'];

  // NLP sentiment prediction logic (simple heuristic classifier mimicking client-side NLP/ML demo)
  const predictSentimentModel = (text) => {
    const lower = text.toLowerCase();
    const positiveWords = ['excelente', 'bueno', 'rico', 'delicioso', 'mejor', 'me encanto', 'volveria', 'rapido', 'limpio', 'amable', 'gusto', 'perfecto', 'great', 'good', 'nice', 'delicious'];
    const negativeWords = ['malo', 'tarde', 'pesimo', 'sucio', 'tardaron', 'frio', 'tibio', 'caro', 'desagradable', 'enojado', 'pesimo', 'no volveria', 'slow', 'cold', 'bad', 'dirty'];
    
    let posCount = 0;
    let negCount = 0;
    
    positiveWords.forEach(w => { if (lower.includes(w)) posCount++; });
    negativeWords.forEach(w => { if (lower.includes(w)) negCount++; });

    if (posCount > negCount) {
      return { sentiment: 'positivo', confidence: Math.min(0.7 + (posCount * 0.08), 0.99) };
    } else if (negCount > posCount) {
      return { sentiment: 'negativo', confidence: Math.min(0.7 + (negCount * 0.08), 0.99) };
    } else {
      return { sentiment: 'neutro', confidence: 0.6 + (Math.random() * 0.15) };
    }
  };

  const handleTestReview = () => {
    if (!inputText.trim()) return;
    const res = predictSentimentModel(inputText);
    setPredictedSentiment(res.sentiment);
    setConfidence(res.confidence);
    
    // Add to interactive simulation list
    const branchRandom = branches[Math.floor(Math.random() * (branches.length - 1)) + 1];
    const newRev = {
      branch: branchRandom,
      text: inputText,
      rating: res.sentiment === 'positivo' ? 5 : res.sentiment === 'negativo' ? 2 : 3,
      sentiment: res.sentiment,
      confidence: res.confidence
    };
    setCustomReviews([newRev, ...customReviews]);
    setInputText('');
  };

  const filteredReviews = selectedBranch === 'todos' 
    ? customReviews 
    : customReviews.filter(r => r.branch.toLowerCase() === selectedBranch.toLowerCase());

  const stats = useMemoP(() => {
    const total = filteredReviews.length;
    const pos = filteredReviews.filter(r => r.sentiment === 'positivo').length;
    const neu = filteredReviews.filter(r => r.sentiment === 'neutro').length;
    const neg = filteredReviews.filter(r => r.sentiment === 'negativo').length;
    return {
      total,
      posPct: total ? Math.round((pos / total) * 100) : 0,
      neuPct: total ? Math.round((neu / total) * 100) : 0,
      negPct: total ? Math.round((neg / total) * 100) : 0,
    };
  }, [filteredReviews]);

  return (
    <Glass padding={28}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: M.mono, fontSize: 10, color: accent, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 6 }}>
            {lang === 'es' ? 'Visor de Datos e Inteligencia Artificial' : 'Data & AI Interactive Viewer'}
          </div>
          <h3 style={{ fontFamily: M.sans, fontSize: 22, fontWeight: 500, color: M.text1, margin: 0, letterSpacing: '-.02em' }}>
            {lang === 'es' ? 'Clasificación de Sentimiento en Tiempo Real (NLP)' : 'Real-time Sentiment Classification (NLP)'}
          </h3>
        </div>
        <span style={{ fontFamily: M.mono, fontSize: 10, color: M.text3 }}>DEMO INTERACTIVA NATIVA</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28, marginTop: 20 }}>
        {/* Left column: input review & simulate classification */}
        <div>
          <p style={{ fontSize: 13.5, color: M.text2, lineHeight: 1.55, marginTop: 0, marginBottom: 14 }}>
            {lang === 'es'
              ? 'Prueba el modelo de clasificación de reseñas. Escribe una opinión sobre el servicio o la comida para analizar su sentimiento mediante nuestro pipeline de IA.'
              : 'Test the review classification model. Write an opinion about the service or food to analyze its sentiment through our AI pipeline.'}
          </p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={lang === 'es' ? 'Escribe una reseña sintética (ej: "Pésimo servicio, la comida llegó helada")...' : 'Write a synthetic review (e.g. "Excellent food and outstanding service!")...'}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,.03)',
                border: `1px solid ${M.glassBorder}`,
                borderRadius: 12,
                padding: '10px 14px',
                color: M.text1,
                fontFamily: M.sans,
                fontSize: 13.5,
                outline: 'none',
                transition: 'border-color .15s',
              }}
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e => e.target.style.borderColor = M.glassBorder}
              onKeyDown={e => { if (e.key === 'Enter') handleTestReview(); }}
            />
            <button
              onClick={handleTestReview}
              style={{
                background: `linear-gradient(135deg, ${accent}, ${M.text1})`,
                color: '#2D2A3D',
                border: 'none',
                borderRadius: 12,
                padding: '0 20px',
                fontFamily: M.sans,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {lang === 'es' ? 'Clasificar' : 'Classify'}
            </button>
          </div>

          {predictedSentiment && (
            <div style={{
              background: 'rgba(255,255,255,.02)',
              border: `1px solid ${M.glassBorder}`,
              borderRadius: 12,
              padding: 14,
              marginBottom: 18,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontFamily: M.mono, fontSize: 9.5, color: M.text3, textTransform: 'uppercase' }}>
                  {lang === 'es' ? 'Resultado de Predicción' : 'Prediction Result'}
                </div>
                <div style={{
                  fontFamily: M.sans, fontSize: 16, fontWeight: 600, marginTop: 4,
                  color: predictedSentiment === 'positivo' ? M.mint : predictedSentiment === 'negativo' ? M.warm : M.cool,
                  textTransform: 'capitalize'
                }}>
                  {predictedSentiment}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: M.mono, fontSize: 9.5, color: M.text3, textTransform: 'uppercase' }}>
                  {lang === 'es' ? 'Confianza' : 'Confidence'}
                </div>
                <div style={{ fontFamily: M.mono, fontSize: 16, fontWeight: 500, color: M.text1, marginTop: 4 }}>
                  {(confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          )}

          {/* Simulated stream */}
          <div style={{
            fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.12em',
            textTransform: 'uppercase', marginBottom: 10, display: 'flex', justifyContent: 'space-between'
          }}>
            <span>{lang === 'es' ? 'Flujo de reseñas clasificadas' : 'Classified review stream'}</span>
            <span>{filteredReviews.length} {lang === 'es' ? 'ítems' : 'items'}</span>
          </div>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: 8,
            maxHeight: 180, overflowY: 'auto', paddingRight: 4
          }}>
            {filteredReviews.map((r, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,.01)',
                border: `1px solid ${M.glassBorder}`,
                borderRadius: 10,
                padding: '10px 12px',
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: 12,
                alignItems: 'center'
              }}>
                <span style={{ fontFamily: M.mono, fontSize: 10, color: M.text3 }}>{r.branch}</span>
                <span style={{ fontSize: 12, color: M.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.text}</span>
                <span style={{
                  fontFamily: M.mono, fontSize: 9,
                  color: r.sentiment === 'positivo' ? M.mint : r.sentiment === 'negativo' ? M.warm : M.cool,
                  border: `1px solid ${(r.sentiment === 'positivo' ? M.mint : r.sentiment === 'negativo' ? M.warm : M.cool) + '44'}`,
                  padding: '2px 6px',
                  borderRadius: 6,
                  textTransform: 'uppercase'
                }}>{r.sentiment}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: active stats & distribution */}
        <div style={{ borderLeft: `1px solid ${M.glassBorder}`, paddingLeft: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {lang === 'es' ? 'Filtrar Sucursal' : 'Filter Location'}
              </span>
              <select
                value={selectedBranch}
                onChange={e => setSelectedBranch(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,.05)',
                  border: `1px solid ${M.glassBorder}`,
                  borderRadius: 8,
                  padding: '4px 8px',
                  color: M.text1,
                  fontFamily: M.sans,
                  fontSize: 12,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {branches.map(b => (
                  <option key={b} value={b} style={{ background: '#2D2A3D', color: M.text1 }}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Distribution metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
              {/* Positive */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: M.mono, fontSize: 11, marginBottom: 5 }}>
                  <span style={{ color: M.mint }}>{lang === 'es' ? 'Positivo' : 'Positive'}</span>
                  <span style={{ color: M.text2 }}>{stats.posPct}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,.04)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: stats.posPct + '%', background: M.mint, borderRadius: 2 }} />
                </div>
              </div>
              {/* Neutral */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: M.mono, fontSize: 11, marginBottom: 5 }}>
                  <span style={{ color: M.cool }}>{lang === 'es' ? 'Neutro' : 'Neutral'}</span>
                  <span style={{ color: M.text2 }}>{stats.neuPct}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,.04)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: stats.neuPct + '%', background: M.cool, borderRadius: 2 }} />
                </div>
              </div>
              {/* Negative */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: M.mono, fontSize: 11, marginBottom: 5 }}>
                  <span style={{ color: M.warm }}>{lang === 'es' ? 'Negativo' : 'Negative'}</span>
                  <span style={{ color: M.text2 }}>{stats.negPct}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,.04)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: stats.negPct + '%', background: M.warm, borderRadius: 2 }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,.02)',
            borderRadius: 12,
            padding: 14,
            border: `1px solid ${M.glassBorder}`,
            marginTop: 18
          }}>
            <div style={{ fontFamily: M.mono, fontSize: 9, color: M.text3, textTransform: 'uppercase', marginBottom: 4 }}>
              {lang === 'es' ? 'Metodología Técnica' : 'Technical Methodology'}
            </div>
            <p style={{ fontSize: 11.5, color: M.text2, lineHeight: 1.5, margin: 0 }}>
              {lang === 'es'
                ? 'Las reseñas se ingestan asíncronamente desde Apify a Supabase. Un webhook procesa el contenido, normaliza caracteres y ejecuta clasificaciones semánticas. La simulación superior corre localmente reproduciendo las predicciones del modelo.'
                : 'Reviews are ingested asynchronously from Apify to Supabase. A webhook processes content, normalizes characters, and runs semantic classifications. The simulation above runs locally reproducing the model predictions.'}
            </p>
          </div>
        </div>
      </div>
    </Glass>
  );
}

window.PortPages = { Overview, Projects, ProjectDetail, About, Contact };
