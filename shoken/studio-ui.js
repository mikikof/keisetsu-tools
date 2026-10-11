export const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function icon(name,extra='') {
  const shapes={
    math:'<path d="M4 9h10M9 4v10M21 9h8M5 21l8 8M13 21l-8 8M21 25h8"/><circle cx="25" cy="20" r="1" fill="currentColor" stroke="none"/><circle cx="25" cy="30" r="1" fill="currentColor" stroke="none"/>',
    science:'<path d="M11 3h10M13 3v10L5 26a2 2 0 0 0 2 3h18a2 2 0 0 0 2-3l-8-13V3M10 19h12"/><circle cx="13" cy="24" r="1"/><circle cx="20" cy="23" r="1"/>',
    social:'<circle cx="16" cy="16" r="13"/><ellipse cx="16" cy="16" rx="6" ry="13"/><path d="M3 16h26M5.753 8h20.494M5.753 24h20.494"/>',
    ai:'<rect x="6" y="6" width="20" height="20" rx="5"/><path d="M12 1v5M20 1v5M12 26v5M20 26v5M1 12h5M1 20h5M26 12h5M26 20h5M10 21l4-10 4 10M11 18h6M22 11v10"/>',
    lock:'<rect x="6" y="14" width="20" height="15" rx="3"/><path d="M10 14V9a6 6 0 0 1 12 0v5M16 20v4"/>',
    external:'<path d="M17 4h11v11M28 4L14 18M13 5H4v23h23v-9"/>',
    paper:'<path d="M6 3h12l6 6v20H6zM18 3v6h6"/><path d="M10 15h10M10 20h10M10 25h6"/>',
    school:'<path d="M3 13L16 5l13 8M6 12v15h20V12M2 27h28M13 27v-8h6v8M10 15h1M21 15h1"/><path d="M16 5V2h6"/>',
    highlight:'<path d="M7 24l12-17 7 5-12 17H7zM19 7l3-4 7 5-3 4M3 29h14"/>',
    idea:'<path d="M11 23c0-5-5-5-5-12a10 10 0 0 1 20 0c0 7-5 7-5 12zM11 27h10M14 30h4M13 14l3 3 4-6"/>',
    difference:'<path d="M4 9h24M4 23h24M7 5v8M25 19v8M7 16h18M11 13l-4 3 4 3M21 13l4 3-4 3"/>',
    multiple:'<path d="M3 26h27M5 23v6M16 23v6M27 23v6M7 15c2-9 16-9 19 0M22 12l4 4 3-5"/><circle cx="8" cy="19" r="2"/>',
    sequence:'<rect x="2" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/><path d="M9 16h4M20 16h7M24 13l3 3-3 3M5 24h18"/>',
    probability:'<rect x="5" y="5" width="22" height="22" rx="4"/><circle cx="11" cy="11" r="1"/><circle cx="21" cy="11" r="1"/><circle cx="16" cy="16" r="1"/><circle cx="11" cy="21" r="1"/><circle cx="21" cy="21" r="1"/>',
    clip:'<path d="M11 20l10-10a4 4 0 0 0-6-6L5 14a7 7 0 0 0 10 10L27 12M10 17l9-9"/>',
    chat:'<path d="M4 5h24v18H12l-8 6zM9 11h14M9 16h10"/>',
    send:'<path d="M3 4l27 12L3 28l5-12zM8 16h22"/>',
    arrow:'<path d="M3 16h25M20 8l8 8-8 8"/>',
    back:'<path d="M29 16H4M12 8l-8 8 8 8"/>',
    play:'<path d="M10 5l18 11-18 11z"/>',
    check:'<path d="M5 16l7 7L27 8"/>',
    eye:'<path d="M2 16s5-9 14-9 14 9 14 9-5 9-14 9S2 16 2 16z"/><circle cx="16" cy="16" r="4"/>',
    copy:'<path d="M11 9h16v20H11zM7 23H3V3h16v3"/>',
    download:'<path d="M16 3v19M9 15l7 7 7-7M5 23v6h22v-6"/>',
    restart:'<path d="M5 11a12 12 0 1 1-1 12M5 3v9h9"/>',
    close:'<path d="M8 8l16 16M24 8L8 24"/>'
  };
  return `<svg class="icon ${extra}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name] ?? shapes.paper}</svg>`;
}
