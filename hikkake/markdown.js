const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ESC[c]);

const SYMBOLS = {
  leqq: '≦', geqq: '≧', leq: '≤', geq: '≥', le: '≤', ge: '≥', neq: '≠', ne: '≠',
  times: '×', cdot: '·', div: '÷', pm: '±', infty: '∞', circ: '°',
  implies: '⟹', Longrightarrow: '⟹', longrightarrow: '⟶', rightarrow: '→', to: '→', Rightarrow: '⇒',
  dots: '…', ldots: '…', cdots: '⋯', '%': '%', '{': '{', '}': '}', '#': '#', '&': '&', '$': '$',
  ',': ' ', ';': ' ', ':': ' ', '!': '', ' ': ' ', quad: ' ', qquad: '  ',
  alpha: 'α', beta: 'β', gamma: 'γ', theta: 'θ', pi: 'π', lambda: 'λ', mu: 'μ', sigma: 'σ', Delta: 'Δ'
};
const FUNCTIONS = new Set(['log', 'ln', 'sin', 'cos', 'tan', 'exp', 'lim', 'max', 'min']);
const TEXT_COMMANDS = new Set(['text', 'mathrm', 'textrm', 'mathit', 'operatorname']);
const BINARY = new Set(['+', '−', '=', '≦', '≧', '≤', '≥', '<', '>', '×', '÷', '≠', '⟹', '⟶', '→', '⇒', '±']);

function tokenize(source) {
  const tokens = [];
  for (let i = 0; i < source.length;) {
    const c = source[i];
    if (c === '\\') {
      const word = source.slice(i + 1).match(/^[A-Za-z]+/);
      if (word) { tokens.push({ type: 'cmd', value: word[0] }); i += word[0].length + 1; }
      else { tokens.push({ type: 'cmd', value: source[i + 1] ?? '' }); i += 2; }
    } else if (/\s/.test(c)) { let j = i; while (j < source.length && /\s/.test(source[j])) j++; tokens.push({ type: 'space' }); i = j; }
    else { tokens.push({ type: 'char', value: c }); i += 1; }
  }
  return tokens;
}

function readGroup(tokens, state) {
  while (tokens[state.i]?.type === 'space') state.i++;
  const token = tokens[state.i];
  if (!token) return [];
  if (token.type === 'char' && token.value === '{') {
    state.i++;
    const start = state.i;
    let depth = 1;
    while (state.i < tokens.length) {
      const t = tokens[state.i];
      if (t.type === 'char' && t.value === '{') depth++;
      if (t.type === 'char' && t.value === '}') { depth--; if (depth === 0) break; }
      state.i++;
    }
    const inner = tokens.slice(start, state.i);
    state.i++;
    return inner;
  }
  state.i++;
  return [token];
}

const rawText = tokens => tokens.map(t => t.type === 'space' ? ' ' : t.type === 'cmd' ? (SYMBOLS[t.value] ?? t.value) : t.value).join('');

function renderTokens(tokens) {
  const out = [];
  const state = { i: 0 };
  const push = (html, kind = 'atom') => out.push({ html, kind });
  while (state.i < tokens.length) {
    const token = tokens[state.i++];
    if (token.type === 'space') continue;
    if (token.type === 'char') {
      const c = token.value;
      if (c === '^' || c === '_') {
        const body = renderTokens(readGroup(tokens, state));
        push(c === '^' ? `<sup>${body}</sup>` : `<sub>${body}</sub>`, 'script');
      } else if (c === '{' ) {
        state.i--;
        push(renderTokens(readGroup(tokens, state)));
      } else if (c === '-') push('−', 'op');
      else if (BINARY.has(c)) push(escape(c), 'op');
      else if (c === ',') push(',', 'comma');
      else push(escape(c));
      continue;
    }
    const name = token.value;
    if (name === 'frac' || name === 'dfrac' || name === 'tfrac') {
      const top = renderTokens(readGroup(tokens, state));
      const bottom = renderTokens(readGroup(tokens, state));
      push(`<span class="frac"><span class="frac-top">${top}</span><span class="frac-bottom">${bottom}</span></span>`);
    } else if (TEXT_COMMANDS.has(name)) {
      push(`<span class="math-text">${escape(rawText(readGroup(tokens, state)))}</span>`, 'text');
    } else if (name === 'sqrt') {
      push(`√<span class="sqrt">${renderTokens(readGroup(tokens, state))}</span>`);
    } else if (name === 'left' || name === 'right' || name === 'displaystyle') {
      continue;
    } else if (FUNCTIONS.has(name)) {
      push(name, 'fn');
    } else if (Object.hasOwn(SYMBOLS, name)) {
      const symbol = SYMBOLS[name];
      push(escape(symbol), BINARY.has(symbol) ? 'op' : /^[    ]+$/.test(symbol) ? 'space' : 'atom');
    } else push(escape(name));
  }
  return out.map((part, index) => {
    if (part.kind === 'comma') {
      const prev = out[index - 1];
      const next = out[index + 1];
      const grouping = prev && next && /\d$/.test(prev.html) && /^\d/.test(next.html);
      return grouping ? ',' : ', ';
    }
    if (part.kind !== 'op') return part.html;
    const prev = out.slice(0, index).filter(p => p.kind !== 'space').at(-1);
    const unary = part.html === '−' && (!prev || prev.kind === 'op' || prev.kind === 'comma' || /[(（\[]$/.test(prev.html));
    return unary ? part.html : ` ${part.html} `;
  }).join('');
}

export function tex(source, display = false) {
  const html = renderTokens(tokenize(source.trim()));
  return display ? `<div class="math math-display">${html}</div>` : `<span class="math">${html}</span>`;
}

const CHOICE = /^([①-⑳])(\s*)\$([^$\n]+)\$$/;

export function inline(source) {
  let html = '';
  const pattern = /([①-⑳]\s*\$[^$\n]+\$|\$\$[^$]+\$\$|\$[^$\n]+\$|\*\*[^*]+\*\*|`[^`]+`|<br\s*\/?>)/g;
  let last = 0;
  for (const match of source.matchAll(pattern)) {
    html += escape(source.slice(last, match.index));
    const piece = match[0];
    const choice = piece.match(CHOICE);
    if (choice) html += `<span class="choice">${escape(choice[1] + choice[2])}${tex(choice[3])}</span>`;
    else if (piece.startsWith('$$')) html += tex(piece.slice(2, -2));
    else if (piece.startsWith('$')) html += tex(piece.slice(1, -1));
    else if (piece.startsWith('**')) html += `<strong>${inline(piece.slice(2, -2))}</strong>`;
    else if (piece.startsWith('`')) html += `<code>${escape(piece.slice(1, -1))}</code>`;
    else html += '<br>';
    last = match.index + piece.length;
  }
  return html + escape(source.slice(last));
}

const isTableRow = line => /^\s*\|.*\|\s*$/.test(line);
const cells = line => line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());

function table(lines) {
  const [head, align, ...body] = lines;
  const aligns = cells(align).map(a => a.startsWith(':') && a.endsWith(':') ? 'center' : a.endsWith(':') ? 'right' : 'left');
  const cell = (tag, text, i) => `<${tag} class="align-${aligns[i] ?? 'left'}">${inline(text)}</${tag}>`;
  return `<div class="table-scroll"><table class="md-table"><thead><tr>${cells(head).map((c, i) => cell('th', c, i)).join('')}</tr></thead><tbody>${body.map(row => `<tr>${cells(row).map((c, i) => cell('td', c, i)).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function list(lines) {
  const items = [];
  for (const line of lines) {
    const match = line.match(/^(\s*)(?:[*-]|\d+\.)\s+(.*)$/);
    if (match) items.push({ depth: Math.floor(match[1].length / 2), ordered: /^\s*\d+\./.test(line), text: match[2] });
    else if (items.length) items.at(-1).text += `\n${line.trim()}`;
  }
  const build = (start, depth) => {
    let html = '';
    let i = start;
    const ordered = items[start]?.ordered;
    while (i < items.length && items[i].depth >= depth) {
      if (items[i].depth > depth) { const [inner, next] = build(i, items[i].depth); html = html.replace(/<\/li>$/, `${inner}</li>`); i = next; continue; }
      html += `<li>${items[i].text.split('\n').map(inline).join('<br>')}</li>`;
      i++;
    }
    return [`<${ordered ? 'ol' : 'ul'} class="md-list">${html}</${ordered ? 'ol' : 'ul'}>`, i];
  };
  return build(0, items[0]?.depth ?? 0)[0];
}

export function markdown(source) {
  const lines = String(source).replace(/\r/g, '').split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (/^\s*---+\s*$/.test(line)) { blocks.push('<hr class="md-rule">'); i++; continue; }
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) { const level = Math.min(6, heading[1].length + 1); blocks.push(`<h${level} class="md-heading">${inline(heading[2])}</h${level}>`); i++; continue; }
    if (/^\s*\$\$/.test(line)) {
      let body = line.trim().slice(2);
      while (!/\$\$\s*$/.test(body) && i + 1 < lines.length) body += ` ${lines[++i].trim()}`;
      blocks.push(tex(body.replace(/\$\$\s*$/, ''), true)); i++; continue;
    }
    if (isTableRow(line)) { const rows = []; while (i < lines.length && isTableRow(lines[i])) rows.push(lines[i++]); blocks.push(table(rows)); continue; }
    if (/^\s*(?:[*-]|\d+\.)\s+/.test(line)) {
      const rows = [];
      while (i < lines.length && lines[i].trim() && (/^\s*(?:[*-]|\d+\.)\s+/.test(lines[i]) || /^\s{2,}\S/.test(lines[i]))) rows.push(lines[i++]);
      blocks.push(list(rows)); continue;
    }
    if (/^>\s?/.test(line)) {
      const rows = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) rows.push(lines[i++].replace(/^>\s?/, ''));
      blocks.push(`<blockquote class="md-quote">${markdown(rows.join('\n'))}</blockquote>`); continue;
    }
    const rows = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|\s*---+\s*$|\s*\$\$|>\s?)/.test(lines[i]) && !isTableRow(lines[i]) && !/^\s*(?:[*-]|\d+\.)\s+/.test(lines[i])) rows.push(lines[i++]);
    blocks.push(`<p>${rows.map(r => inline(r.replace(/\s+$/, ''))).join('<br>')}</p>`);
  }
  return blocks.join('');
}
