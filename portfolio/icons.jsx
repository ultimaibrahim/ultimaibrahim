/* Shared icon set. Stroke icons sized 1em — color: currentColor.
   Exposed via window.PI (PortfolioIcons). */

const PI = (() => {
  const make = (size, paths, fill) => (props = {}) => {
    const s = props.size || size;
    return (
      <svg
        width={s}
        height={s}
        viewBox={`0 0 ${size} ${size}`}
        fill={fill ? 'currentColor' : 'none'}
        stroke={fill ? 'none' : 'currentColor'}
        strokeWidth={props.strokeWidth || 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={props.style}
        aria-hidden="true"
      >
        {paths}
      </svg>
    );
  };

  return {
    grid: make(16, <>
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1"/>
      <rect x="9"   y="1.5" width="5.5" height="5.5" rx="1"/>
      <rect x="1.5" y="9"   width="5.5" height="5.5" rx="1"/>
      <rect x="9"   y="9"   width="5.5" height="5.5" rx="1"/>
    </>),
    chart: make(16, <>
      <path d="M2 12 L5.5 8 L8 10 L11 5 L14 7"/>
      <rect x="1.5" y="1.5" width="13" height="13" rx="1.5"/>
    </>),
    star: make(16, <polygon points="8,2 9.8,6 14,6.6 11,9.4 11.7,13.6 8,11.5 4.3,13.6 5,9.4 2,6.6 6.2,6"/>),
    flame: make(16, <path d="M8 2C8 2 3 5 3 9a5 5 0 0 0 10 0c0-4-5-7-5-7z"/>),
    sparkles: make(16, <>
      <path d="M3 8 L4 5 L5 8 L8 9 L5 10 L4 13 L3 10 L0 9 Z" transform="translate(1 1)"/>
      <path d="M11 3 L12 1 L13 3 L15 4 L13 5 L12 7 L11 5 L9 4 Z"/>
    </>),
    user: make(16, <>
      <circle cx="8" cy="6" r="3"/>
      <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
    </>),
    book: make(16, <>
      <path d="M2 3.5C2 2.7 2.7 2 3.5 2H8v11H3.5C2.7 13 2 12.3 2 11.5z"/>
      <path d="M14 3.5C14 2.7 13.3 2 12.5 2H8v11h4.5c.8 0 1.5-.7 1.5-1.5z"/>
    </>),
    mail: make(16, <>
      <rect x="1.5" y="3" width="13" height="10" rx="1.5"/>
      <path d="M2 4l6 4 6-4"/>
    </>),
    github: make(24, <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>),
    globe: make(24, <>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </>),
    pin: make(24, <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </>),
    arrow: make(16, <path d="M3 8h10M9 4l4 4-4 4"/>),
    arrowUp: make(16, <path d="M8 13V3M4 7l4-4 4 4"/>),
    arrowDown: make(16, <path d="M8 3v10M4 9l4 4 4-4"/>),
    cross: make(16, <path d="M3 3l10 10M13 3L3 13"/>),
    medal: make(16, <>
      <circle cx="8" cy="10" r="4"/>
      <path d="M5 3l3 5 3-5"/>
    </>),
    quote: make(16, <>
      <path d="M3 8h3v5H2V9c0-2 1-3 3-3"/>
      <path d="M10 8h3v5H9V9c0-2 1-3 3-3"/>
    </>),
    code: make(16, <path d="M5 4L1 8l4 4M11 4l4 4-4 4M9 3l-2 10"/>),
    play: make(16, <polygon points="4,3 13,8 4,13"/>),
    book2: make(16, <>
      <path d="M2 3v10l6-2 6 2V3l-6 2-6-2z"/>
      <line x1="8" y1="5" x2="8" y2="13"/>
    </>),
    pencil: make(16, <>
      <path d="M11 2l3 3-9 9H2v-3z"/>
      <path d="M9 4l3 3"/>
    </>),
    folder: make(16, <path d="M2 4c0-.6.4-1 1-1h3l2 2h5c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1z"/>),
    chevron: make(16, <path d="M6 4l4 4-4 4"/>),
    dot: make(8, <circle cx="4" cy="4" r="2.5"/>, true),
    languages: make(16, <>
      <circle cx="5.5" cy="8" r="4"/>
      <path d="M9.5 6h5M14.5 4c0 4-2.5 7-5.5 8"/>
    </>),
    award: make(16, <>
      <circle cx="8" cy="6" r="4"/>
      <path d="M5 9l-1.5 5L8 12l4.5 2L11 9"/>
    </>),
    linkedin: make(24, <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4"/>),
    logo: make(100, <path d="M50,75 C52,65 58,55 70,55 C65,48 55,42 50,20 C45,42 35,48 30,55 C42,55 48,65 50,75 Z M50,20 C53,42 63,46 80,42 C70,52 62,60 50,75 C38,60 30,52 20,42 C37,46 47,42 50,20 Z" />, true),
  };
})();

window.PI = PI;
