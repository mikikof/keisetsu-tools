/*
 * Small editorial drawings, built from a shared, exact SVG vocabulary.
 * These identify the three subjects; they are not entrance-exam diagrams.
 * No filters, masks, markers, or IDs: several cards can coexist safely.
 */

const C = {
  ink: '#152b37', green: '#22645b', orange: '#d47849',
  mint: '#e6eee8', paper: '#fffdf7', sand: '#eee4d4', muted: '#acb8ac',
};

function frame(subject, title, description, drawing) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 170"
    class="editorial-art editorial-art--subject editorial-art--${subject}"
    aria-hidden="true" focusable="false" fill="none" stroke="${C.ink}"
    stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <title>${title}</title><desc>${description}</desc>${drawing}
  </svg>`;
}

function paper(x, y, width, height, fold = 14) {
  const right = x + width;
  const bottom = y + height;
  // The outer diagonal and the two inner creases use the same fold corners.
  return `<path d="M${x} ${y}H${right - fold}L${right} ${y + fold}V${bottom}H${x}Z" fill="${C.paper}"/>
    <path d="M${right - fold} ${y}V${y + fold}H${right}" fill="${C.sand}"/>`;
}

function dot(x, y, fill = C.ink, radius = 2.8) {
  return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="none"/>`;
}

function mathArt() {
  return frame('math', '三角形と座標の図',
    '三角形の頂点から底辺へ垂線を引いた問題用紙と、頂点が原点に一致する放物線。', `
    ${paper(25, 18, 160, 134)}
    <rect x="42" y="33" width="53" height="5" rx="2.5" fill="${C.green}" stroke="none"/>
    <path d="M42 49H150" stroke="${C.muted}"/>

    <path d="M45 128L99 69L165 128Z" fill="${C.mint}"/>
    <path d="M99 69V128" stroke="${C.green}"/>
    <path d="M99 119H108V128" stroke="${C.green}"/>
    ${dot(45, 128)}${dot(99, 69)}${dot(165, 128)}

    <rect x="204" y="40" width="94" height="112" rx="5" fill="${C.paper}"/>
    <path d="M219 62V138M235 62V138M251 62V138M267 62V138M283 62V138
      M217 76H285M217 92H285M217 108H285M217 124H285" stroke="${C.mint}"/>
    <path d="M217 124H286M251 138V59"/>
    <path d="m281 120 5 4-5 4m-34-64 4-5 4 5"/>
    <!-- Exact quadratic: its vertex (251,124) is also the axes' origin. -->
    <path d="M222 72Q251 176 280 72" stroke="${C.green}"/>
    ${dot(251, 124, C.orange, 3.2)}
  `);
}

function scienceArt() {
  return frame('science', '電池と抵抗の閉回路',
    '電池の正極から抵抗へ電流が流れる閉回路。左の問題用紙には、抵抗に加わる電圧と流れる電流の比例関係。', `
    ${paper(24, 18, 106, 134)}
    <rect x="40" y="33" width="45" height="5" rx="2.5" fill="${C.green}" stroke="none"/>
    <path d="M40 49H104" stroke="${C.muted}"/>
    <path d="M43 78V129H113"/>
    <path d="m39 83 4-5 4 5m61 42 5 4-5 4"/>
    <path d="M43 129L106 80" stroke="${C.green}"/>
    <g fill="${C.ink}" stroke="none" font-family="Arial,sans-serif" font-size="13" font-style="italic">
      <text x="32" y="73">V</text><text x="112" y="145">I</text>
    </g>

    <!-- One closed circuit: a battery at left and an IEC resistor at right. -->
    <path d="M158 77V42H278V71M278 110V138H158V90"/>
    <!-- The longer upper plate is the positive battery terminal. -->
    <path d="M142 77H174M149 90H167"/>
    <path d="M141 59H149M145 55V63" stroke="${C.green}"/>
    <rect x="268" y="71" width="20" height="39" rx="1" fill="${C.sand}"/>
    <path d="M203 58H239m-6-5 6 5-6 5" stroke="${C.green}"/>
    <g fill="${C.ink}" stroke="none" font-family="Arial,sans-serif" font-size="16" font-style="italic">
      <text x="215" y="81">I</text><text x="293" y="96">R</text>
    </g>
  `);
}

function windows(x, y, columns, rows, spacingX = 11, spacingY = 13) {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: columns }, (_, column) =>
      `<rect x="${x + column * spacingX}" y="${y + row * spacingY}" width="4" height="5"
        fill="${C.green}" stroke="none"/>`).join('')).join('');
}

function socialArt() {
  return frame('social', '地域から都市への人口移動',
    '左の住宅地域から、右の都市へ向かう矢印。中央の人物も同じ向きに歩いている。住宅、人物、都市の建物は同じ地面に立つ。', `
    <path d="M25 132V122C25 101 48 89 75 96C100 101 113 117 113 132Z"
      fill="${C.mint}" stroke="none"/>
    <path d="M201 132V119C201 100 228 88 255 93C280 97 298 110 298 132Z"
      fill="${C.sand}" stroke="none"/>

    <!-- House: the roof, walls, door, and ground share exact contact points. -->
    <path d="M44 91H84V132H44Z" fill="${C.paper}"/>
    <path d="M36 94L64 69L92 94" stroke="${C.green}"/>
    <path d="M44 91L64 73L84 91" fill="${C.paper}"/>
    <rect x="58" y="111" width="13" height="21" fill="${C.sand}"/>
    <rect x="53" y="94" width="8" height="8" fill="${C.mint}"/>
    <path d="M99 116V132M90 116L99 100L108 116Z" fill="${C.mint}" stroke="${C.green}"/>

    <!-- Aligned city blocks, with a regular window grid and a shared baseline. -->
    <rect x="214" y="87" width="25" height="45" fill="${C.paper}"/>
    <rect x="239" y="61" width="31" height="71" fill="${C.paper}"/>
    <rect x="270" y="94" width="24" height="38" fill="${C.paper}"/>
    ${windows(220, 99, 2, 2, 10, 13)}
    ${windows(247, 74, 2, 4, 11, 13)}
    ${windows(276, 105, 2, 2, 9, 13)}

    <!-- All movement points right; no unrelated return or money arrow. -->
    <path d="M100 65C128 30 174 28 205 58" stroke="${C.green}"/>
    <path d="M193 56L205 58L203 46" stroke="${C.green}"/>

    <circle cx="155" cy="84" r="7" fill="${C.paper}"/>
    <path d="M151 95H157C163 95 166 100 164 106L160 118H147L148 101Q148 95 151 95Z"
      fill="${C.green}"/>
    <path d="M161 99L171 107H180M149 100L139 113"/>
    <path d="M151 118L142 132H135M158 118L172 132H180"/>
    <path d="M24 132H298" stroke="${C.muted}"/>
  `);
}

/** Subject illustrations are decorative; nearby text supplies the meaning. */
export function subjectArt(subject) {
  if (subject === 'science' || subject === 'physics') return scienceArt();
  if (subject === 'social' || subject === 'geography') return socialArt();
  return mathArt();
}
