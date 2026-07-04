/* App shell + hash router.
   Routes:
     #/                        → Overview
     #/proyectos               → Projects list
     #/proyectos/:id           → Project detail
     #/sobre-mi                → About
     #/contacto                → Contact
*/

const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;
const Dr = window.PortfolioData;
const { M, AmbientBg } = window.PortUI;
const { Overview, Projects, ProjectDetail, About, Contact } = window.PortPages;

// ── route parsing ──
function parseRoute(hash) {
  const clean = String(hash || '').replace(/^#\/?/, '');
  const parts = clean.split('/').filter(Boolean);
  if (parts.length === 0) return { page: 'overview', key: '/' };
  if (parts[0] === 'proyectos' && parts[1]) return { page: 'project', projectId: parts[1], key: '/proyectos/' + parts[1] };
  if (parts[0] === 'proyectos')              return { page: 'projects', key: '/proyectos' };
  if (parts[0] === 'sobre-mi')               return { page: 'about', key: '/sobre-mi' };
  if (parts[0] === 'contacto')               return { page: 'contact', key: '/contacto' };
  return { page: 'overview', key: '/' };
}

function useHashRoute() {
  const [route, setRoute] = useStateA(() => parseRoute(location.hash));
  useEffectA(() => {
    const onHash = () => setRoute(parseRoute(location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = (hash) => {
    if (typeof hash !== 'string') return;
    if (location.hash === hash) return;
    location.hash = hash.startsWith('#') ? hash : `#${hash}`;
  };
  return [route, navigate];
}

// ── Sidebar (4-route) ──
function Sidebar({ collapsed, setCollapsed, lang, setLang, route, onJump }) {
  const items = [
    ['#/',          PI.grid,    Dr.UI.routes.overview[lang], 'overview', null],
    ['#/proyectos', PI.chart,   Dr.UI.routes.projects[lang], 'projects', String(Dr.visibleProjects().length)],
    ['#/sobre-mi',  PI.user,    Dr.UI.routes.about[lang],    'about',    null],
    ['#/contacto',  PI.mail,    Dr.UI.routes.contact[lang],  'contact',  null],
  ];
  const isProject = route.page === 'project';
  const projects = Dr.visibleProjects();

  return (
    <aside style={{
      position: 'fixed', top: 16, left: 16, bottom: 16,
      width: collapsed ? 64 : 232,
      zIndex: 5,
      background: 'rgba(45,42,60,.45)',
      backdropFilter: 'blur(24px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
      border: '1px solid rgba(255,255,255,.06)',
      borderRadius: 24,
      display: 'flex', flexDirection: 'column',
      padding: '18px 0 16px',
      transition: 'width .35s cubic-bezier(.2,.7,.3,1)',
      overflow: 'hidden',
      boxShadow: '0 24px 60px -16px rgba(10, 8, 20, 0.45)',
    }}>
      {/* brand */}
      <a href="#/" onClick={(e) => { e.preventDefault(); onJump('#/'); }} style={{
        textDecoration: 'none', color: 'inherit',
        padding: collapsed ? '0 8px 16px' : '0 18px 18px',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        display: 'flex', alignItems: 'center', gap: 14,
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <PI.logo size={collapsed ? 48 : 54} style={{ color: '#C084FC', filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.75))', flexShrink: 0 }} />
        {!collapsed && (
          <div style={{ opacity: collapsed ? 0 : 1, transition: 'opacity .25s', whiteSpace: 'nowrap' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: M.text1, letterSpacing: '-.01em' }}>{Dr.PROFILE.brand}</div>
            <div style={{ fontFamily: M.mono, fontSize: 10, color: M.text3, marginTop: 1 }}>{Dr.PROFILE.handle}</div>
          </div>
        )}
      </a>

      {/* nav */}
      <nav style={{ padding: '14px 8px 0', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {!collapsed && (
          <div style={{
            fontFamily: M.mono, fontSize: 9, fontWeight: 500,
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: M.text3,
            padding: '0 8px 8px',
            opacity: 1, transition: 'opacity .2s',
            height: 'auto', overflow: 'hidden',
          }}>{lang === 'es' ? 'Navegar' : 'Navigate'}</div>
        )}

        {items.map(([href, Icon, label, page, badge]) => {
          const isActive = route.page === page || (page === 'projects' && isProject);
          return (
            <a
              key={page}
              href={href}
              onClick={(e) => { e.preventDefault(); onJump(href); }}
              title={collapsed ? label : undefined}
              className="nav-link"
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: collapsed ? '9px 14px' : '8px 10px',
                margin: '1px 0',
                border: 'none', borderRadius: 8,
                background: isActive ? 'rgba(183,185,229,.12)' : 'transparent',
                color: isActive ? M.text1 : M.text2,
                fontFamily: M.sans, fontSize: 12.5, fontWeight: isActive ? 500 : 400, letterSpacing: '-.005em',
                cursor: 'pointer', textDecoration: 'none',
                position: 'relative',
                transition: `background 180ms ${M.easeOutPremium}, color 180ms ${M.easeOutPremium}, transform 140ms ${M.easeOutPremium}`,
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,.04)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              {isActive && (
                <span style={{
                  position: 'absolute', left: -8, top: 8, bottom: 8, width: 2,
                  background: M.cool, borderRadius: 4,
                  boxShadow: `0 0 8px ${M.cool}`,
                }} />
              )}
              <Icon size={15} style={{ opacity: isActive ? 1 : .7, flexShrink: 0 }} />
              {!collapsed && (
                <span style={{
                  opacity: 1, transition: 'opacity .25s',
                  whiteSpace: 'nowrap', flex: 1,
                }}>{label}</span>
              )}
              {badge && !collapsed && (
                <span style={{
                  fontFamily: M.mono, fontSize: 9, padding: '1px 6px',
                  background: 'rgba(141,227,189,.13)', color: M.mint,
                  borderRadius: 4,
                }}>{badge}</span>
              )}
            </a>
          );
        })}

        {/* project sub-nav when on /proyectos/:id */}
        {!collapsed && (isProject || route.page === 'projects') && (
          <div style={{
            margin: '14px 0 0',
            borderTop: '1px dashed rgba(255,255,255,.06)',
            paddingTop: 12,
          }}>
            <div style={{
              fontFamily: M.mono, fontSize: 9, color: M.text4,
              letterSpacing: '.18em', textTransform: 'uppercase',
              padding: '0 8px', marginBottom: 6,
            }}>{lang === 'es' ? 'Proyectos' : 'Projects'}</div>
            {projects.map(p => {
              const isOpen = isProject && route.projectId === p.id;
              const name = typeof p.name === 'string' ? p.name : Dr.t(p.name, lang);
              return (
                <a
                  key={p.id}
                  href={`#/proyectos/${p.id}`}
                  onClick={(e) => { e.preventDefault(); onJump(`#/proyectos/${p.id}`); }}
                  className="nav-link"
                  style={{
                    display: 'block', textDecoration: 'none',
                    padding: '5px 8px 5px 22px',
                    fontFamily: M.sans, fontSize: 12.5, fontWeight: isOpen ? 500 : 400, letterSpacing: '-.005em',
                    color: isOpen ? M.text1 : M.text2,
                    background: isOpen ? 'rgba(183,185,229,.10)' : 'transparent',
                    borderRadius: 8, position: 'relative',
                    transition: `background 180ms ${M.easeOutPremium}, color 180ms ${M.easeOutPremium}, transform 140ms ${M.easeOutPremium}`,
                  }}
                >
                  <span style={{
                    position: 'absolute', left: 10, top: '50%',
                    width: 6, height: 1, background: isOpen ? M.cool : M.text4,
                  }} />
                  {name}
                </a>
              );
            })}
          </div>
        )}
      </nav>

      {/* footer: status + lang + collapse */}
      <div style={{ padding: '12px 14px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          flexDirection: collapsed ? 'column' : 'row',
        }}>
          {!collapsed && (
            <div style={{ display: 'flex', gap: 4, flex: 1 }}>
              {['es', 'en'].map(l => (
                <button key={l} onClick={() => setLang(l)} className="interactive-btn" style={{
                  flex: 1, padding: '5px 0',
                  background: lang === l ? 'rgba(255,255,255,.1)' : 'transparent',
                  border: '1px solid ' + (lang === l ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.06)'),
                  color: lang === l ? M.text1 : M.text3,
                  fontFamily: M.mono, fontSize: 10, letterSpacing: '.1em',
                  textTransform: 'uppercase', borderRadius: 6, cursor: 'pointer',
                  transition: `background 180ms ${M.easeOutPremium}, color 180ms ${M.easeOutPremium}, transform 140ms ${M.easeOutPremium}, border-color 180ms ${M.easeOutPremium}`,
                }}>{l}</button>
              ))}
            </div>
          )}

          <button
            onClick={() => setCollapsed(c => !c)}
            title={collapsed ? (lang === 'es' ? 'Expandir' : 'Expand') : (lang === 'es' ? 'Contraer' : 'Collapse')}
            className="interactive-btn"
            style={{
              width: 32, height: 30, padding: 0,
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.08)',
              color: M.text2, cursor: 'pointer', borderRadius: 6,
              display: 'grid', placeItems: 'center',
              transition: `background 180ms ${M.easeOutPremium}, color 180ms ${M.easeOutPremium}, transform 140ms ${M.easeOutPremium}`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: collapsed ? 'rotate(0)' : 'rotate(180deg)', transition: 'transform .3s' }}>
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

// ── Top bar (no scroll progress) ──
function TopBar({ route, lang, onJump }) {
  const crumbs = [];
  crumbs.push({ label: Dr.PROFILE.handle, href: '#/' });
  if (route.page === 'overview') crumbs.push({ label: Dr.UI.routes.overview[lang].toLowerCase() });
  if (route.page === 'projects') crumbs.push({ label: 'proyectos' });
  if (route.page === 'project') {
    crumbs.push({ label: 'proyectos', href: '#/proyectos' });
    crumbs.push({ label: route.projectId });
  }
  if (route.page === 'about')    crumbs.push({ label: 'sobre-mi' });
  if (route.page === 'contact')  crumbs.push({ label: 'contacto' });

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 4,
      padding: '14px 32px',
      background: 'rgba(50,46,68,.45)',
      backdropFilter: 'blur(22px) saturate(1.15)',
      WebkitBackdropFilter: 'blur(22px) saturate(1.15)',
      borderBottom: '1px solid rgba(255,255,255,.05)',
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{ fontFamily: M.mono, fontSize: 11, color: M.text3, letterSpacing: '.02em' }}>
        {crumbs.map((c, i) => (
          <span key={i}>
            {i > 0 && <span style={{ margin: '0 7px', color: M.text4 }}>/</span>}
            {c.href ? (
              <a href={c.href} onClick={(e) => { e.preventDefault(); onJump(c.href); }} style={{ color: i === crumbs.length - 1 ? M.text2 : M.text3, textDecoration: 'none' }}>{c.label}</a>
            ) : (
              <span style={{ color: i === crumbs.length - 1 ? M.text1 : M.text3 }}>{c.label}</span>
            )}
          </span>
        ))}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="interactive-btn" style={{
          padding: '7px 14px',
          background: M.glass, border: `1px solid ${M.glassBorder}`,
          color: M.text2, fontFamily: M.sans, fontSize: 12.5, fontWeight: 500, letterSpacing: '-.005em',
          borderRadius: 12, cursor: 'pointer',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          transition: `background 180ms ${M.easeOutPremium}, color 180ms ${M.easeOutPremium}, border-color 180ms ${M.easeOutPremium}, transform 140ms ${M.easeOutPremium}`,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = M.glassHi; e.currentTarget.style.color = M.text1; }}
          onMouseLeave={e => { e.currentTarget.style.background = M.glass; e.currentTarget.style.color = M.text2; }}
        >GitHub ↗</button>
        <button
          onClick={() => onJump('#/contacto')}
          className="interactive-btn"
          style={{
            padding: '7px 16px',
            background: 'linear-gradient(135deg, #F2F0F8, #DED9EF)',
            color: '#2D2A3D', border: 'none', borderRadius: 12,
            fontFamily: M.sans, fontSize: 12.5, fontWeight: 500, letterSpacing: '-.005em', cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(140,135,200,.30), 0 1px 0 rgba(255,255,255,.5) inset',
            transition: `transform 140ms ${M.easeOutPremium}, background 180ms ${M.easeOutPremium}, box-shadow 180ms ${M.easeOutPremium}`,
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >{Dr.UI.cta.contact[lang]} →</button>
      </div>
    </div>
  );
}

// ── Page switcher with fade transition ──
function PageSwitcher({ route, lang, onJump }) {
  const [shownKey, setShownKey] = useStateA(route.key);
  const [fading, setFading] = useStateA(false);
  const mainRef = useRefA(null);

  useEffectA(() => {
    if (route.key === shownKey) return;
    setFading(true);
    const t1 = setTimeout(() => {
      setShownKey(route.key);
      setFading(false);
      // scroll to top on route change
      if (mainRef.current) mainRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }, 180);
    return () => clearTimeout(t1);
  }, [route.key]);

  // Render based on the *shown* key (so fade-out shows the previous page)
  const shownRoute = parseRoute('#' + shownKey);

  let content;
  if (shownRoute.page === 'overview')       content = <Overview lang={lang} onJump={onJump} />;
  else if (shownRoute.page === 'projects')  content = <Projects lang={lang} onJump={onJump} />;
  else if (shownRoute.page === 'project') {
    const p = Dr.PROJECTS.find(x => x.id === shownRoute.projectId);
    if (p) content = <ProjectDetail p={p} lang={lang} onJump={onJump} />;
    else content = <NotFound lang={lang} onJump={onJump} />;
  }
  else if (shownRoute.page === 'about')     content = <About lang={lang} onJump={onJump} />;
  else if (shownRoute.page === 'contact')   content = <Contact lang={lang} onJump={onJump} />;
  else                                      content = <NotFound lang={lang} onJump={onJump} />;

  return (
    <main
      ref={mainRef}
      style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        overflowY: 'auto', zIndex: 2,
      }}
    >
      <TopBar route={route} lang={lang} onJump={onJump} />
      <div
        key={shownKey}
        style={{
          padding: '0 36px 50px',
          maxWidth: 1080, margin: '0 auto',
          opacity: fading ? 0 : 1,
          transform: fading ? 'scale(0.98) translateY(4px)' : 'scale(1) translateY(0)',
          transition: `opacity 180ms ${M.easeOutPremium}, transform 180ms ${M.easeOutPremium}`,
        }}
      >
        {content}
      </div>
    </main>
  );
}

function NotFound({ lang, onJump }) {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <div style={{ fontFamily: M.mono, fontSize: 10, color: M.text3, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 14 }}>404</div>
      <div style={{ fontFamily: M.sans, fontSize: 44, fontWeight: 500, color: M.text1, lineHeight: 1.1, marginBottom: 14, letterSpacing: '-.035em' }}>
        {lang === 'es' ? 'Esa ruta no existe.' : 'That route doesn’t exist.'}
      </div>
      <button onClick={() => onJump('#/')} className="interactive-btn" style={{
        background: 'transparent', border: `1px solid ${M.glassBorder}`,
        color: M.text1, fontFamily: M.mono, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
        padding: '10px 18px', borderRadius: 12, cursor: 'pointer',
        transition: `background 180ms ${M.easeOutPremium}, transform 140ms ${M.easeOutPremium}`,
      }}>{lang === 'es' ? 'Ir al inicio' : 'Go home'}</button>
    </div>
  );
}

// ── Root ──
function PortfolioApp({ initialLang = 'es' }) {
  const [lang, setLang] = useStateA(initialLang);
  const [collapsed, setCollapsed] = useStateA(false);
  const [route, navigate] = useHashRoute();

  return (
    <div style={{
      position: 'fixed', inset: 0,
      color: M.text1, fontFamily: M.sans, fontSize: 14, lineHeight: 1.5,
      WebkitFontSmoothing: 'antialiased',
      overflow: 'hidden',
    }}>
      <AmbientBg />

      <Sidebar
        collapsed={collapsed} setCollapsed={setCollapsed}
        lang={lang} setLang={setLang}
        route={route} onJump={navigate}
      />

      <div style={{
        position: 'absolute', top: 16, right: 16, bottom: 16,
        left: collapsed ? 96 : 264,
        background: 'rgba(30, 27, 44, 0.4)',
        backdropFilter: 'blur(30px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(30px) saturate(1.2)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 24,
        boxShadow: '0 24px 80px -16px rgba(10, 8, 20, 0.5)',
        overflow: 'hidden',
        transition: 'left .35s cubic-bezier(.2,.7,.3,1)',
        zIndex: 2,
      }}>
        <PageSwitcher route={route} lang={lang} onJump={navigate} />
      </div>

      <style>{`
        @keyframes mpulse { 0%,100% { box-shadow: 0 0 0 0 ${M.mint}55; } 50% { box-shadow: 0 0 0 6px ${M.mint}00; } }
        @keyframes mfadeup { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        ::selection { background: ${M.cool}33; color: ${M.text1}; }
        main::-webkit-scrollbar { width: 10px; }
        main::-webkit-scrollbar-track { background: transparent; }
        main::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 8px; border: 2px solid transparent; background-clip: padding-box; }
        main::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.14); background-clip: padding-box; }
        
        .interactive-btn {
          transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1), background 180ms cubic-bezier(0.23, 1, 0.32, 1), border-color 180ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 180ms cubic-bezier(0.23, 1, 0.32, 1) !important;
        }
        .interactive-btn:active {
          transform: scale(0.97) !important;
        }
        .nav-link {
          transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1), background 180ms cubic-bezier(0.23, 1, 0.32, 1), color 180ms cubic-bezier(0.23, 1, 0.32, 1) !important;
        }
        .nav-link:active {
          transform: scale(0.975) !important;
        }
      `}</style>
    </div>
  );
}

window.PortfolioApp = PortfolioApp;
