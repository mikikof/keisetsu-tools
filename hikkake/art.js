export const C = {
  ink: '#152b37', green: '#22645b', shu: '#c4553a',
  mint: '#e3ede7', paper: '#ffffff', shadow: '#dbe3dd',
  rule: '#c3d0c8', row: '#9aaca3', row2: '#5b6f68'
};

const SAMPLE = {
  head: '第1問（数学Ⅰ）',
  line1: '関数 f(x)=x²−6x+5',
  domain: '0≦x≦2',
  line3: '求めよ。',
  next: '第2問（数学Ⅱ）',
  confirmLabel: '確認の1行',
  confirm: ['最大・最小は、軸が', '定義域に入るかを', '先に見る']
};

const FONT = "'Hiragino Sans','Hiragino Kaku Gothic ProN','Yu Gothic','Noto Sans JP',sans-serif";
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const esc = value => String(value).replace(/[&<>"]/g, c => ESC[c]);
const f1 = v => Math.round(v * 10) / 10;

function root(viewBox, cls, label, body) {
  const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true" focusable="false"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="art ${cls}" ${a11y} fill="none" stroke="${C.ink}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

function text(x, y, value, { size = 14, fill = C.ink, weight = 600, anchor = 'start', cls = '', len = 0 } = {}) {
  const fit = len ? ` textLength="${len}" lengthAdjust="spacingAndGlyphs"` : '';
  return `<text x="${x}" y="${y}" class="${cls}" fill="${fill}" stroke="none" font-family="${esc(FONT)}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${fit}>${esc(value)}</text>`;
}

function sheet(x, y, w, h, fold = 16, fill = C.paper) {
  return `<path d="M${x} ${y}H${x + w - fold}L${x + w} ${y + fold}V${y + h}H${x}Z" fill="${fill}"/><path d="M${x + w - fold} ${y}V${y + fold}H${x + w}" fill="${C.mint}"/>`;
}
function sheetShadow(x, y, w, h, fold = 16, dx = 6, dy = 7) {
  return `<path d="M${x + dx} ${y + dy}H${x + w - fold + dx}L${x + w + dx} ${y + fold + dy}V${y + h + dy}H${x + dx}Z" fill="${C.shadow}" stroke="none"/>`;
}
function boxShadow(x, y, w, h, rx = 0, dx = 6, dy = 7) {
  return `<rect x="${x + dx}" y="${y + dy}" width="${w}" height="${h}" rx="${rx}" fill="${C.shadow}" stroke="none"/>`;
}
function rows(x, y, widths, gap = 12, color = C.row, cls = 't') {
  return widths.map((w, i) => `<path d="M${x} ${y + i * gap}h${w}" stroke="${color}" class="${cls}"/>`).join('');
}

function words(x, y, widths, { gap = 5, color = C.row, hot = -1 } = {}) {
  let cx = x;
  return widths.map((w, i) => {
    const seg = `<path d="M${cx} ${y}h${w}" stroke="${i === hot ? C.shu : color}" class="${i === hot ? 'm' : 'w'}"/>${i === hot ? `<path d="M${cx - 1} ${y + 6}h${w + 2}" stroke="${C.shu}" class="m"/>` : ''}`;
    cx += w + gap;
    return seg;
  }).join('');
}

function loop(cx, cy, rx, ry, start = 196, sweep = 388) {
  const n = 48;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const s = i / n;
    const a = (start + sweep * s) * Math.PI / 180;
    const k = 1 + 0.035 * Math.sin(s * Math.PI * 3) + 0.07 * s;
    pts.push(`${f1(cx + rx * k * Math.cos(a))} ${f1(cy + ry * k * Math.sin(a))}`);
  }
  return `<path d="M${pts.join('L')}" stroke="${C.shu}" class="mk"/>`;
}
function pencil(x, y, angle) {
  return `<g transform="translate(${x} ${y}) rotate(${angle})">
    <path d="M0 0L14 -6V6Z" fill="${C.paper}"/>
    <path d="M0 0L5 -2.15V2.15Z" fill="${C.ink}" stroke="none"/>
    <rect x="14" y="-6" width="52" height="12" fill="${C.green}"/>
    <rect x="66" y="-6" width="8" height="12" fill="${C.mint}"/>
    <rect x="74" y="-6" width="9" height="12" rx="2" fill="${C.paper}"/>
  </g>`;
}

const MEMO = {
  title: 'ミスの1文',
  items: ['2次関数：軸を見ずに頂点', '対数：真数条件を見ず', '確率：1から引き忘れ']
};
const CHAT = {
  sent: ['これらのミスが', '起きやすい問題を4題…'],
  head: '第1問（数学Ⅰ）',
  lines: ['関数 f(x)=x²−6x+5', '（0≦x≦2）の最小値…'],
  input: '答え合わせ'
};

function lock(cx, cy, s = 1) {
  const r = 6 * s;
  return `<path d="M${cx - r} ${cy}v${-5 * s}a${r} ${r} 0 0 1 ${2 * r} 0v${5 * s}" stroke="${C.green}" class="m"/>
    <rect x="${cx - 9 * s}" y="${cy}" width="${18 * s}" height="${14 * s}" rx="${2.5 * s}" fill="${C.green}" stroke="none"/>`;
}

export function stageMemo() {
  const items = MEMO.items.map((line, i) => {
    const y = 100 + i * 30;
    return `<circle cx="35" cy="${y - 4.5}" r="2.6" fill="${C.ink}" stroke="none"/>${text(44, y, line, { size: 12, weight: 650 })}`;
  }).join('');
  return root('0 0 220 220', 'art-stage art-stage--memo art-stage--square', '', `
    <g transform="rotate(-4 106 114)">
      ${boxShadow(20, 28, 176, 172)}
      <rect x="20" y="28" width="176" height="172" fill="${C.paper}"/>
      <path d="M20 109H196M20 139H196M20 169H196" stroke="${C.rule}" class="t"/>
      <rect x="20" y="28" width="176" height="15" fill="${C.green}"/>
      ${text(33, 74, MEMO.title, { size: 17, fill: C.green, weight: 800 })}
      ${items}
    </g>
    ${pencil(122, 198, -17)}`);
}

export function stageMemoWide() {
  const items = MEMO.items.map((line, i) => {
    const y = 78 + i * 25;
    return `<circle cx="34" cy="${y - 5}" r="3" fill="${C.ink}" stroke="none"/>${text(44, y, line, { size: 14.5, weight: 650 })}`;
  }).join('');
  return root('0 0 320 150', 'art-stage art-stage--memo art-stage--wide', '', `
    <g transform="rotate(-2 138 74)">
      ${boxShadow(16, 12, 244, 126)}
      <rect x="16" y="12" width="244" height="126" fill="${C.paper}"/>
      <path d="M16 85H260M16 110H260" stroke="${C.rule}" class="t"/>
      <rect x="16" y="12" width="244" height="12" fill="${C.green}"/>
      ${text(30, 52, MEMO.title, { size: 16, fill: C.green, weight: 800 })}
      ${items}
    </g>
    ${pencil(266, 124, -58)}`);
}

export function stageChat() {
  return root('0 0 220 220', 'art-stage art-stage--chat art-stage--square', '', `
    ${boxShadow(12, 14, 196, 192, 8)}
    <rect x="12" y="14" width="196" height="192" rx="8" fill="${C.paper}"/>
    <path d="M12 42H208"/>
    <circle cx="26" cy="28" r="3" fill="${C.green}" stroke="none"/><circle cx="37" cy="28" r="3" fill="${C.row}" stroke="none"/>
    ${text(194, 35, 'AI', { size: 16, fill: C.green, weight: 800, anchor: 'end' })}
    <path d="M64 50H186a8 8 0 0 1 8 8V98l-12-8H64a8 8 0 0 1-8-8V58a8 8 0 0 1 8-8Z" fill="${C.paper}" stroke="${C.green}" class="m"/>
    ${CHAT.sent.map((line, i) => text(66, 67 + i * 16, line, { size: 11, weight: 650 })).join('')}
    <rect x="22" y="104" width="138" height="62" rx="3" fill="${C.paper}" class="m"/>
    ${text(30, 121, CHAT.head, { size: 11, weight: 800 })}
    ${CHAT.lines.map((line, i) => text(30, 138 + i * 17, line, { size: 11, weight: 500 })).join('')}
    <rect x="166" y="104" width="30" height="62" rx="3" fill="${C.mint}" stroke="none"/>
    ${lock(181, 133, 0.85)}
    <rect x="22" y="174" width="174" height="26" rx="13" fill="${C.paper}" class="t"/>
    ${text(36, 192, CHAT.input, { size: 14, weight: 700 })}
    <circle cx="183" cy="187" r="9" fill="${C.green}" stroke="none"/>
    <path d="M178.5 187h8m-3.5-3.5 3.5 3.5-3.5 3.5" stroke="${C.paper}" class="t"/>`);
}

export function stageChatWide() {
  return root('0 0 320 236', 'art-stage art-stage--chat art-stage--wide', '', `
    ${boxShadow(12, 10, 294, 216, 10)}
    <rect x="12" y="10" width="294" height="216" rx="10" fill="${C.paper}"/>
    <path d="M12 40H306"/>
    <circle cx="28" cy="25" r="3.5" fill="${C.green}" stroke="none"/><circle cx="41" cy="25" r="3.5" fill="${C.row}" stroke="none"/>
    ${text(290, 33, 'AI', { size: 17, fill: C.green, weight: 800, anchor: 'end' })}
    <path d="M120 50H284a10 10 0 0 1 10 10V102l-14-9H120a10 10 0 0 1-10-10V60a10 10 0 0 1 10-10Z" fill="${C.paper}" stroke="${C.green}" class="m"/>
    ${CHAT.sent.map((line, i) => text(122, 70 + i * 19, line, { size: 14.5, weight: 650 })).join('')}
    <rect x="24" y="110" width="204" height="68" rx="4" fill="${C.paper}" class="m"/>
    ${text(34, 131, CHAT.head, { size: 14.5, weight: 800 })}
    ${CHAT.lines.map((line, i) => text(34, 151 + i * 19, line, { size: 14.5, weight: 500 })).join('')}
    <rect x="236" y="110" width="58" height="68" rx="4" fill="${C.mint}" stroke="none"/>
    ${lock(265, 143, 1.1)}
    <rect x="24" y="188" width="270" height="30" rx="15" fill="${C.paper}" class="t"/>
    ${text(40, 209, CHAT.input, { size: 16, weight: 700 })}
    <circle cx="279" cy="203" r="10.5" fill="${C.green}" stroke="none"/>
    <path d="M273.5 203h10m-4.5-4.5 4.5 4.5-4.5 4.5" stroke="${C.paper}" class="t"/>`);
}

export function stagePaper() {
  const s = SAMPLE;
  return root('0 0 310 262', 'art-stage art-stage--paper', '', `
    <g transform="rotate(3 125 123)">
      ${sheetShadow(20, 16, 210, 214)}
      ${sheet(20, 16, 210, 214)}
      ${text(36, 46, '問題', { size: 17, weight: 800 })}
      <path d="M36 57H212" class="m"/>
      ${text(36, 82, s.head, { size: 14, weight: 800 })}
      ${text(36, 105, s.line1, { size: 14, weight: 500 })}
      ${text(29, 128, '（', { size: 14, weight: 500 })}
      ${text(43, 128, s.domain, { size: 14, weight: 500, len: 50 })}
      ${text(93, 128, '）の', { size: 14, weight: 500 })}
      ${text(121, 128, '最小値', { size: 14, weight: 500 })}
      ${text(163, 128, 'を', { size: 14, weight: 500 })}
      ${text(36, 151, s.line3, { size: 14, weight: 500 })}
      ${loop(68, 123, 34, 14)}
      <path d="M120 134Q142 136.5 164 132.5" stroke="${C.shu}" class="mk"/>
      <path d="M36 170H212" stroke="${C.rule}" class="t"/>
      ${text(36, 193, s.next, { size: 14, weight: 800 })}
      ${rows(36, 209, [150, 118], 13)}
    </g>
    <g transform="rotate(-3 221 204)">
      ${boxShadow(146, 160, 150, 88)}
      <rect x="146" y="160" width="150" height="88" fill="${C.paper}"/>
      <rect x="146" y="160" width="8" height="88" fill="${C.green}"/>
      ${text(166, 183, s.confirmLabel, { size: 13.5, fill: C.green, weight: 800 })}
      ${s.confirm.map((line, i) => text(166, 205 + i * 19, line, { size: 14, weight: 700 })).join('')}
    </g>`);
}

export function stageArrow(dir = 'right') {
  if (dir === 'down') return root('0 0 40 36', 'art-arrow art-arrow--down', '', `<path d="M20 4V30m-9-9 9 9 9-9" stroke="${C.green}"/>`);
  return root('0 0 56 40', 'art-arrow art-arrow--right', '', `<path d="M6 20H48m-10-9 10 9-10 9" stroke="${C.green}"/>`);
}

function mathArt() {

  return root('0 0 240 150', 'art-subject art-subject--math', '', `
    <g transform="rotate(-4 70 78)">
      ${sheetShadow(18, 15, 100, 116, 14)}
      ${sheet(18, 15, 100, 116, 14)}
      <rect x="31" y="28" width="38" height="5" rx="2.5" fill="${C.green}" stroke="none"/>
      ${rows(31, 46, [72, 58], 11)}
      <path d="M31 72h26" class="m"/>
      ${rows(31, 86, [70, 54, 64], 11)}
    </g>
    ${boxShadow(104, 23, 118, 110, 5)}
    <rect x="104" y="23" width="118" height="110" rx="5" fill="${C.paper}"/>
    <rect x="126" y="33" width="29" height="92" fill="${C.mint}" stroke="none"/>
    <path d="M155 33V125" stroke="${C.green}" class="t" stroke-dasharray="3 4"/>
    <path d="M169.5 36V122" stroke="${C.row}" class="t" stroke-dasharray="3 4"/>
    <path d="M112 82H214m-6-5 6 5-6 5" class="m"/>
    <path d="M126 128V34m-5 6 5-6 5 6" class="m"/>
    <path d="M128.9 49.4Q169.5 182.6 210.1 49.4" stroke="${C.green}"/>
    <circle cx="169.5" cy="116" r="3.6" fill="${C.paper}" class="t"/>
    <circle cx="155" cy="107.5" r="4.8" fill="${C.shu}" stroke="none"/>`);
}

function englishArt() {
  const passage = [[18, 10, 22, 14, 12], [12, 20, 9, 16, 18], [22, 12, 15, 10, 14], [14, 16, 20, 11, 12], [10, 18, 13, 22], [20, 9, 16, 12, 15], [12, 22, 10]];
  const choices = [[14, 20, 12], [20, 14, 22], [12, 26, 14], [18, 16, 20]];
  return root('0 0 240 150', 'art-subject art-subject--english', '', `
    <g transform="rotate(-3 74 76)">
      ${sheetShadow(16, 13, 116, 124, 14)}
      ${sheet(16, 13, 116, 124, 14)}
      <path d="M29 31h46" class="m"/>
      ${passage.map((row, i) => words(29, 48 + i * 12, row, { hot: i === 3 ? 2 : -1 })).join('')}
    </g>
    ${boxShadow(124, 44, 102, 92, 4)}
    <rect x="124" y="44" width="102" height="92" rx="4" fill="${C.paper}"/>
    ${choices.map((row, i) => {
      const y = 63 + i * 20;
      return `<circle cx="138" cy="${y}" r="6" class="t"/>${words(151, y, row, { hot: i === 0 ? 1 : -1 })}`;
    }).join('')}`);
}

function chemistryArt() {

  const ticks = [20, 28, 36, 44, 52, 60, 68, 76, 84].map((y, i) => `<path d="M52 ${y}h${i % 2 ? 4 : 7}" class="t"/>`).join('');
  const bulb = 'M166 84C148 92 138 108 140 124C141 134 148 140 158 140H186C196 140 203 134 204 124C206 108 196 92 178 84Z';
  return root('0 0 240 150', 'art-subject art-subject--chemistry', '', `
    <rect x="20" y="140" width="80" height="6" rx="1.5" fill="${C.paper}"/>
    <path d="M90 140V10"/>
    <path d="M64 40H90" class="m"/>
    <rect x="62" y="35" width="8" height="10" rx="1.5" fill="${C.green}" stroke="none"/>
    <rect x="52" y="30" width="12" height="62" fill="${C.mint}" stroke="none"/>
    <rect x="52" y="12" width="12" height="80" rx="2"/>
    ${ticks}
    <path d="M40 30h8" stroke="${C.shu}" class="mk"/>
    <rect x="54" y="92" width="8" height="10" fill="${C.paper}" class="m"/>
    <rect x="42" y="94.5" width="32" height="5" rx="2.5" fill="${C.green}" stroke="none"/>
    <path d="M55 102L58 111L61 102" class="m"/>
    <path d="M58 115c-2.6 3.6-2.6 6.4 0 6.4s2.6-2.8 0-6.4z" fill="${C.mint}" stroke="${C.green}" class="t"/>
    <path d="M38 134H78L88 140H28Z" fill="${C.mint}" stroke="none"/>
    <path d="M51 122V128L28 140H88L65 128V122"/>
    <path d="M48 122H68" class="m"/>
    <rect x="109" y="118" width="26" height="21" fill="${C.mint}" stroke="none"/>
    <path d="M108 104V136a4 4 0 0 0 4 4H132a4 4 0 0 0 4-4V104"/>
    <path d="M105 104H139" class="m"/>
    <path d="M136 112h-6M136 120h-4M136 128h-6" class="t"/>
    <path d="${bulb}" fill="${C.mint}" stroke="none"/>
    <rect x="166" y="40" width="12" height="46" fill="${C.mint}" stroke="none"/>
    <path d="${bulb}"/>
    <path d="M166 18V84M178 18V84"/>
    <rect x="163" y="8" width="18" height="10" rx="2" fill="${C.green}"/>
    <path d="M160 40H184" stroke="${C.shu}" class="mk"/>
    <path d="M100 140H220" stroke="${C.row}" class="t"/>`);
}

function geographyArt() {
  const xs = [26, 48, 82, 116, 150];
  const ys = [40, 56, 72.5, 89, 105.5, 122];
  const cells = [];
  for (let r = 1; r < 5; r++) {
    for (let c = 0; c < 4; c++) {
      const w = c === 0 ? 8 : [16, 20, 12, 18, 14, 22, 10][(r * 3 + c) % 7];
      cells.push(`<path d="M${xs[c] + 6} ${ys[r] + 8.5}h${w}" stroke="${c === 0 ? C.ink : C.row}" class="${c === 0 ? 'm' : 't'}"/>`);
    }
  }
  const head = [0, 1, 2, 3].map(c => `<path d="M${xs[c] + 6} ${ys[0] + 8.5}h${c === 0 ? 10 : 18}" class="m"/>`).join('');

  const totals = [1000, 200, 500, 100];
  const pct = [5, 15, 8, 20];
  const bars = totals.map((v, i) => { const h = v / 12.5; return `<rect x="${180 + i * 13}" y="${124 - h}" width="9" height="${h}" fill="${C.green}" stroke="none"/>`; }).join('');
  const pts = pct.map((p, i) => [184.5 + i * 13, 124 - p * 3.5]);
  return root('0 0 240 150', 'art-subject art-subject--geography', '', `
    ${sheetShadow(14, 13, 148, 120, 14)}
    ${sheet(14, 13, 148, 120, 14)}
    <rect x="26" y="25" width="34" height="5" rx="2.5" fill="${C.green}" stroke="none"/>
    <rect x="26" y="40" width="124" height="16" fill="${C.mint}" stroke="none"/>
    <rect x="26" y="40" width="124" height="82" class="t"/>
    <path d="M26 56H150" class="t"/>
    ${ys.slice(2, 5).map(y => `<path d="M26 ${y}H150" stroke="${C.rule}" class="t"/>`).join('')}
    ${xs.slice(1, 4).map(x => `<path d="M${x} 40V122" class="t"/>`).join('')}
    ${head}${cells.join('')}
    ${loop(99, 48, 22, 12)}
    <path d="M174 124H234" class="m"/>
    ${bars}
    <path d="M${pts.map(p => p.join(' ')).join('L')}" stroke="${C.shu}" class="m"/>
    ${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${C.paper}" stroke="${C.shu}" class="m"/>`).join('')}`);
}

export function subjectArt(id) {
  if (id === 'english') return englishArt();
  if (id === 'chemistry') return chemistryArt();
  if (id === 'geography') return geographyArt();
  return mathArt();
}

export function kitArt() {
  return root('0 0 220 130', 'art-tool art-tool--kit', '', `
    <g transform="rotate(-5 52 66)">
      ${boxShadow(18, 24, 70, 84)}
      <rect x="18" y="24" width="70" height="84" fill="${C.paper}"/>
      <rect x="18" y="24" width="70" height="10" fill="${C.green}"/>
      ${[52, 70, 88].map((y, i) => `<circle cx="28" cy="${y}" r="2.3" fill="${C.ink}" stroke="none"/><path d="M35 ${y}h${[42, 34, 38][i]}" class="m"/>`).join('')}
    </g>
    <path d="M100 66H124m-8-7 8 7-8 7" stroke="${C.green}"/>
    <path d="M142 20H198a8 8 0 0 1 8 8V112l-13-9H142a8 8 0 0 1-8-8V28a8 8 0 0 1 8-8Z" fill="${C.paper}" stroke="${C.green}" class="m"/>
    ${rows(146, 36, [48, 40, 52, 44, 30, 46], 11, C.row2)}`);
}

export function notesArt() {
  return root('0 0 220 130', 'art-tool art-tool--notes', '', `
    <g transform="rotate(6 120 62)"><rect x="56" y="22" width="132" height="72" fill="${C.paper}"/></g>
    <g transform="rotate(-3 114 70)">
      ${boxShadow(44, 32, 140, 76)}
      <rect x="44" y="32" width="140" height="76" fill="${C.paper}"/>
      <rect x="44" y="32" width="8" height="76" fill="${C.green}"/>
      <path d="M64 52h44" stroke="${C.green}" class="m"/>
      <path d="M64 72h100M64 90h70" class="m"/>
      <path d="M63 97Q99 99.5 135 96" stroke="${C.shu}" class="mk"/>
    </g>`);
}

export function modeArt(mode) {
  if (mode === 'reason') {
    return root('0 0 96 72', 'art-mode', '', `
      ${boxShadow(10, 8, 74, 56, 4, 4, 5)}
      <rect x="10" y="8" width="74" height="56" rx="4" fill="${C.paper}"/>
      ${[22, 36, 50].map((y, i) => `<circle cx="22" cy="${y}" r="4.5" fill="${i === 1 ? C.ink : C.paper}" class="t"/><path d="M32 ${y}h${[38, 30, 42][i]}" stroke="${i === 1 ? C.ink : C.row}" class="${i === 1 ? 'm' : 't'}"/>`).join('')}
      ${loop(21, 36, 9, 8)}`);
  }
  return root('0 0 96 72', 'art-mode', '', `
    <g transform="rotate(-4 46 38)">
      ${boxShadow(16, 6, 62, 60, 0, 4, 5)}
      <rect x="16" y="6" width="62" height="60" fill="${C.paper}"/>
      <rect x="16" y="6" width="62" height="9" fill="${C.green}"/>
      ${[30, 43, 56].map((y, i) => `<circle cx="25" cy="${y}" r="2" fill="${C.ink}" stroke="none"/><path d="M31 ${y}h${[38, 30, 34][i]}" class="m"/>`).join('')}
    </g>`);
}
