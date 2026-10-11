/* Editorial drawings share planar geometry, paper construction and light direction.
 * These are conceptual illustrations, not entrance-exam problem diagrams. */
export { subjectArt } from './subject-art.js?v=20261011-1';

const C = { ink:'#152b37', green:'#22645b', orange:'#d47849', mint:'#e6eee8', paper:'#fffdf7', sand:'#eee4d4', muted:'#a2b1a7' };
const FONT = "'Hiragino Sans','Noto Sans CJK JP','Yu Gothic',sans-serif";
const line = (x,y,w,color=C.muted) => `<path d="M${x} ${y}h${w}" stroke="${color}"/>`;
const rows = (x,y,widths,gap=12) => widths.map((w,i)=>line(x,y+i*gap,w)).join('');
const text = (x,y,value,size=14,color=C.green,weight=700,anchor='start') => `<text x="${x}" y="${y}" fill="${color}" stroke="none" font-family="${FONT}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${value}</text>`;
const start = (box,cls,label='') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" class="editorial-art ${cls}" ${label?`role="img" aria-label="${label}"`:'aria-hidden="true" focusable="false"'} fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">`;

// One folded corner, with both edges meeting the page outline exactly.
function sheet(x,y,w,h,fold=16,fill=C.paper) {
  return `<path d="M${x} ${y}H${x+w-fold}L${x+w} ${y+fold}V${y+h}H${x}Z" fill="${fill}"/><path d="M${x+w-fold} ${y}V${y+fold}H${x+w}" fill="${C.mint}"/>`;
}
function shadow(x,y,w,h,fold=16) {
  return `<path d="M${x+5} ${y+6}H${x+w-fold+5}L${x+w+5} ${y+fold+6}V${y+h+6}H${x+5}Z" fill="${C.sand}" stroke="none"/>`;
}
function browser(x,y,w,h) {
  return `<rect x="${x+5}" y="${y+6}" width="${w}" height="${h}" rx="7" fill="${C.sand}" stroke="none"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${C.paper}"/><path d="M${x} ${y+32}h${w}"/><circle cx="${x+15}" cy="${y+16}" r="2.5" fill="${C.green}" stroke="none"/><circle cx="${x+25}" cy="${y+16}" r="2.5" fill="${C.muted}" stroke="none"/>${text(x+w-17,y+22,'AI',17,C.green,700,'end')}`;
}
function arrow(x1,x2,y) {
  return `<path d="M${x1} ${y}H${x2}m-9-8 9 8-9 8" stroke="${C.green}" stroke-width="2.7"/>`;
}
function tick(x,y) {
  return `<path d="m${x} ${y} 4 4 8-9" stroke="${C.green}" stroke-width="2.3"/>`;
}
function questionRows(x,y,w=110,gap=49) {
  return [0,1,2].map(i=>`<circle cx="${x+9}" cy="${y+i*gap}" r="11" fill="${C.mint}" stroke="none"/>${text(x+9,y+i*gap+5,i+1,14,C.green,700,'middle')}${rows(x+30,y+i*gap-3,[w-30,w-48],12)}`).join('');
}

/** Three aligned stages. Documents, a chat window and unambiguous arrows. */
export function heroArt() {
  return `${start('0 0 1000 354','editorial-art--hero','過去問を渡し、アイデアからAIに任せて、新しい問題を作る流れ。')}
    <path d="M51 290H272M385 290H615M731 290H951" stroke="${C.muted}" stroke-width="1.2"/>
    ${arrow(289,351,160)}${arrow(650,712,160)}
    <g transform="rotate(-4 161 157)">
      ${sheet(66,40,169,225,16,C.sand)}
      ${sheet(82,50,169,225)}
      <rect x="99" y="69" width="42" height="22" rx="3" fill="${C.green}" stroke="none"/>
      ${text(120,85,'PDF',13,C.paper,700,'middle')}
      ${line(100,108,95,C.green)}${rows(100,126,[129,103])}
      <rect x="100" y="155" width="129" height="64" rx="2" fill="${C.mint}" stroke="none"/>
      <path d="M114 204V168M114 204H216" stroke="${C.green}" stroke-width="1.7"/>
      <path d="m121 193 22-11 23 5 23-18 19 5" stroke="${C.green}" stroke-width="2.3"/>
      <g fill="${C.green}" stroke="none"><circle cx="143" cy="182" r="3"/><circle cx="189" cy="169" r="3"/></g>
      ${rows(100,237,[122,92])}
    </g>
    ${browser(382,61,236,211)}
    <rect x="399" y="108" width="127" height="45" rx="5" fill="${C.mint}" stroke="none"/>
    ${sheet(410,117,18,25,5)}${rows(439,124,[71,52],10)}
    <path d="M463 169h129a7 7 0 0 1 7 7v67l-12-8H463a7 7 0 0 1-7-7v-52a7 7 0 0 1 7-7Z" fill="${C.paper}" stroke="${C.green}"/>
    ${text(472,191,'設定も、問い方も',14)}
    ${line(473,206,104,C.orange)}${line(473,219,80)}
    <g transform="rotate(4 841 160)">
      ${shadow(754,43,174,231)}${sheet(754,43,174,231)}
      <path d="M773 66h57" stroke="${C.green}" stroke-width="4"/>
      ${line(773,83,116)}${questionRows(775,116,120,50)}
      ${line(773,250,120)}
    </g>
    <g class="hero-art-labels" fill="${C.ink}" stroke="none" font-family="${FONT}" font-size="23" font-weight="700" text-anchor="middle">
      <text x="165" y="329">過去問を渡す</text><text x="500" y="329">AIが作問する</text><text x="840" y="329">新しい問題を解く</text>
    </g>
  </svg>`;
}

/** Work views use actual page margins and aligned controls. */
export function workArt(task=0) {
  const t=Math.max(0,Math.min(2,Math.trunc(Number(task)||0)));
  let drawing='';
  if(t===0) {
    drawing=`${shadow(63,25,172,191)}${sheet(63,25,172,191)}
      <path d="M81 48h72" stroke="${C.green}" stroke-width="4"/>${rows(81,66,[112,81],11)}
      <rect x="77" y="92" width="145" height="30" rx="3" fill="${C.mint}" stroke="none"/>
      ${text(87,113,'1',15)}${rows(108,102,[100,80],10)}
      ${text(87,152,'2',15)}${rows(108,141,[100,68],10)}
      ${text(87,190,'3',15)}${rows(108,179,[100,90],10)}
      <path d="M250 92h8v102h-8M258 142h15" stroke="${C.green}"/>
      <circle cx="279" cy="142" r="4" fill="${C.green}" stroke="none"/>`;
  } else if(t===1) {
    drawing=`${browser(49,29,220,189)}
      ${[ ['設定',80,C.mint],['問い方',122,C.paper],['組み合わせ',164,C.sand] ].map(([label,y,fill])=>`
        <rect x="65" y="${y}" width="188" height="31" rx="4" fill="${fill}" stroke="${C.muted}" stroke-width="1.2"/>
        ${text(77,y+21,label,14)}${line(label==='組み合わせ'?168:140,y+16,label==='組み合わせ'?66:94,C.green)}
      `).join('')}`;
  } else {
    drawing=`${shadow(68,25,180,191)}${sheet(68,25,180,191)}
      <path d="M86 49h94" stroke="${C.green}" stroke-width="4"/>${line(86,68,120)}
      ${[['条件',102],['解答',143],['学習範囲',184]].map(([label,y])=>`
        <rect x="85" y="${y-12}" width="23" height="23" rx="3" fill="${C.mint}" stroke="${C.green}" stroke-width="1.6"/>
        ${tick(90,y)}${text(121,y+5,label,15)}
      `).join('')}`;
  }
  return `${start('0 0 320 250',`editorial-art--work editorial-art--work-${t}`)}${drawing}<path d="M42 231H279" stroke="${C.muted}" stroke-width="1.2"/></svg>`;
}
