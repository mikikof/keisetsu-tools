export { escape } from './markdown.js';

const SHAPES = {
  arrow: '<path d="M3 16h25M20 8l8 8-8 8"/>',
  down: '<path d="M16 3v25M8 20l8 8 8-8"/>',
  back: '<path d="M29 16H4M12 8l-8 8 8 8"/>',
  check: '<path d="M5 16l7 7L27 8"/>',
  eye: '<path d="M2 16s5-9 14-9 14 9 14 9-5 9-14 9S2 16 2 16z"/><circle cx="16" cy="16" r="4"/>',
  close: '<path d="M8 8l16 16M24 8L8 24"/>',
  copy: '<path d="M11 9h16v20H11zM7 23H3V3h16v3"/>',
  download: '<path d="M16 3v19M9 15l7 7 7-7M5 23v6h22v-6"/>',
  lock: '<rect x="6" y="14" width="20" height="15" rx="3"/><path d="M10 14V9a6 6 0 0 1 12 0v5M16 20v4"/>',
  chat: '<path d="M4 5h24v18H12l-8 6zM9 11h14M9 16h10"/>',
  send: '<path d="M3 4l27 12L3 28l5-12zM8 16h22"/>',
  plus: '<path d="M16 5v22M5 16h22"/>',
  minus: '<path d="M5 16h22"/>',
  pen: '<path d="M6 26l3-9L22 4l6 6-13 13zM18 8l6 6M6 26l9-3"/>',
  list: '<path d="M11 8h17M11 16h17M11 24h17"/><circle cx="5" cy="8" r="1.5"/><circle cx="5" cy="16" r="1.5"/><circle cx="5" cy="24" r="1.5"/>',
  expand: '<path d="M19 4h9v9M28 4L17 15M13 28H4v-9M4 28l11-11"/>',
  note: '<path d="M6 3h14l6 6v20H6zM20 3v6h6M11 15h10M11 20h10M11 25h6"/>'
};

export function icon(name, extra = '') {
  return `<svg class="icon ${extra}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${SHAPES[name] ?? SHAPES.note}</svg>`;
}

export async function copyText(text) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('clipboard');
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.className = 'copy-fallback';
    document.body.append(area);
    area.select();
    let ok = false;
    try { ok = Boolean(document.execCommand?.('copy')); } catch { ok = false; }
    area.remove();
    return ok;
  }
}

export function saveText(text, filename) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
