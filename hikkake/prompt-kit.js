export const MAX_ITEMS = 3;
export const COUNTS = [2, 3, 4, 5, 6];

const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();
const sentence = value => {
  const text = clean(value);
  return text && !/[。．.!！?？]$/.test(text) ? `${text}。` : text;
};

export function likeName(subject) {
  const name = clean(subject);
  const english = name.match(/^英語(.+)$/);
  return english ? english[1].trim() : name;
}

export function mistakeRows(rows = []) {
  return rows.slice(0, MAX_ITEMS)
    .map(row => ({ subject: clean(row.subject), unit: clean(row.unit), miss: clean(row.miss) }))
    .filter(row => row.miss);
}

export function buildMistakePrompt({ rows = [], count = 4 } = {}, { draft = false } = {}) {
  let items = mistakeRows(rows);
  if (!items.length) {
    if (!draft) return '';
    items = [{ subject: '（科目）', unit: '（単元）', miss: '（ミスの1文）' }];
  }
  const n = items.length;
  const total = COUNTS.includes(Number(count)) ? Number(count) : 4;
  const list = items.map(row => {
    const label = [row.subject, row.unit].filter(Boolean).join('　');
    return `・${label ? `${label}：` : ''}${row.miss}`;
  }).join('\n');
  return [
    `最近の模試と過去問で、私がしたミスを${n}つ書きます。`,
    list,
    `${n === 1 ? 'このミス' : 'これらのミス'}が起きやすい問題を${total}題作ってください。共通テストの形式はまねせず、参考書の例題くらいの短い問題にしてください。そのうち1題は、${n === 1 ? '上と同じ単元で' : '上のどれかと同じ単元で'}、仕掛けのない問題にしてください。`,
    '出す前に自分で解き、答えが1つに定まるかを確かめてください。最初は問題だけを出してください。答えと、どの問題に何を仕掛けたかは、私が「答え合わせ」と送るまで見せないでください。'
  ].join('\n\n');
}

export function mistakeStatus({ rows = [], count = 4 } = {}) {
  const items = mistakeRows(rows);
  if (!items.length) return { ready: false, message: 'ミスの1文を1つ以上書くと、指示文ができます。' };
  const unlabeled = items.some(row => !row.subject && !row.unit);
  if (Number(count) <= items.length) {
    return { ready: true, message: '指示文ができました。仕掛けのない1題を除くと題数がミスの数より少ないので、問題に入らないミスが出ることがあります。題数を増やすか、ミスを減らします。' };
  }
  if (unlabeled) return { ready: true, message: '指示文ができました。科目・単元も書いておくと、どの単元の問題を作るかがAIに伝わりやすくなります。' };
  return { ready: true, message: '指示文ができました。' };
}

export function reasonItems(reasons = []) {
  return reasons.slice(0, MAX_ITEMS).map(clean).filter(Boolean);
}

export function buildReasonPrompt({ subject = '', reasons = [], material = '', spec = '' } = {}, { draft = false } = {}) {
  let name = clean(subject);
  let stuff = clean(material);
  let items = reasonItems(reasons);
  if (!name || !stuff || !items.length) {
    if (!draft) return '';
    name ||= '（科目）';
    stuff ||= '（素材）';
    if (!items.length) items = ['（選んだ理由）'];
  }
  const detail = sentence(spec);

  const formatLine = d => (/ください。$/.test(d) ? `共通テストの形式はまねせず、${d}` : `共通テストの形式はまねしないでください。${d}`);
  return [
    `共通テストの${name}で間違えた設問について、その選択肢を選んだ理由を${items.length}つ書きます。`,
    items.map(reason => `・${reason}`).join('\n'),
    `この選び方をするとひっかかる選択肢を入れて、${stuff}と設問を作ってください。${formatLine(detail)}`,
    `出す前に自分で解き、正解が1つに定まるかを確かめてください。最初は${stuff}と設問だけを出してください。正解と、どの選択肢に何を仕掛けたかは、私が「答え合わせ」と送るまで見せないでください。`
  ].join('\n\n');
}

export function reasonStatus({ subject = '', reasons = [], material = '', spec = '' } = {}) {
  const missing = [];
  if (!clean(subject)) missing.push('科目');
  if (!reasonItems(reasons).length) missing.push('選んだ理由');
  if (!clean(material)) missing.push('素材');
  if (missing.length) return { ready: false, message: `${missing.join('・')}を書くと、指示文ができます。` };
  if (!clean(spec)) return { ready: true, message: '指示文ができました。分量も書くと、返ってくる問題の長さの目安になります。' };
  return { ready: true, message: '指示文ができました。' };
}
