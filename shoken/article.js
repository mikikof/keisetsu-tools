import { scenarioMap } from './scenarios.js?v=december-20261009-2';

const examples = [
  { id: 'integers-sequence', label: '過去問から作った問題', subtitle: '過去問の形式を手本に', sources: [
    { role: '形式の手本', text: '東北大学 2026年度 一般選抜・前期 数学〔文系等〕第２問', url: 'https://admissions.tohoku.ac.jp/ja/adcms/wp-content/uploads/2026/05/eq_2026mathematics_l.pdf#page=4' }
  ] },
  { id: 'remainders-difference', label: '発展問題を参考にした問題', subtitle: '発展問題の設定も参考に', sources: [
    { role: '形式の手本', text: '東北大学 2026年度 一般選抜・前期 数学〔文系等〕第２問', url: 'https://admissions.tohoku.ac.jp/ja/adcms/wp-content/uploads/2026/05/eq_2026mathematics_l.pdf#page=4' },
    { role: '設定の材料', text: '東北大学 2026年度 AO入試Ⅱ期・理学部（数学系）筆記試験 第１問', url: 'https://admissions.tohoku.ac.jp/ja/adcms/wp-content/uploads/2026/06/R8_05.pdf#page=3' }
  ] }
];
const content = document.getElementById('article-content');
const controls = document.getElementById('display-controls');
const parameters = new URLSearchParams(location.search);
const initialExample = Number(parameters.get('example')) === 2 ? 2 : 1;
const state = { example: initialExample, revealed: parameters.get('view') === 'summary', view: parameters.get('view') === 'summary' ? 'summary' : 'problem' };
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const eyeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const intentIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 4h16v16H4zM8 8h8M8 12h5M8 16h8"/></svg>';

function sourcesHtml(example) {
  const sources = scenarioMap[example.id].articleSources || example.sources;
  return `<footer class="source-footer">${sources.map(source => `<p><span class="source-role">${escape(source.role)}</span><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.text)}</a></p>`).join('')}<p class="source-provenance">問題はAIによる作問例です。作成時の指示文は、このサイトで用意する依頼文とは異なります。</p></footer>`;
}

function intentHtml(scenario) {
  const hasItems = Array.isArray(scenario.articleIntent) && scenario.articleIntent.length;
  return `<section class="intent-section" id="capture-intent" aria-labelledby="intent-heading"><h2 class="intent-heading" id="intent-heading">${intentIcon}作問のねらい</h2>${hasItems ? `<div class="intent-grid">${scenario.articleIntent.map(item => `<section class="intent-item"><h3>${escape(item.label)}</h3><p>${escape(item.text)}</p></section>`).join('')}</div>${scenario.articleChange ? `<p class="intent-change">${escape(scenario.articleChange)}</p>` : ''}` : `<div class="intent-fallback">${scenario.intentHtml}</div>`}</section>`;
}

// Reformat only the existing two-case rule. All mathematical text remains sourced
// from problemHtml, so corrections made to the shared scenario reach both views.
function typesetCases() {
  if (examples[state.example - 1].id !== 'remainders-difference') return;
  const equation = content.querySelector('.problem-body > .equation');
  if (!equation || !equation.querySelector('br')) return;
  const lines = equation.innerHTML.split(/<br\s*\/?\s*>/i);
  const parsed = lines.map(line => {
    const match = line.match(/^(.*?)＝(.*?)　（(.*?)）$/);
    return match ? { left: match[1], value: match[2], condition: match[3] } : null;
  });
  if (parsed.length !== 2 || parsed.some(row => !row) || parsed[0].left !== parsed[1].left) return;
  equation.className = 'equation cases-equation';
  equation.innerHTML = `<span class="cases-lhs">${parsed[0].left}＝</span><span class="cases-brace" aria-hidden="true"><svg viewBox="0 0 15 100" preserveAspectRatio="none"><path d="M14 1C5 1 6 12 6 22V36C6 45 3 49 1 50C3 51 6 55 6 64V78C6 88 5 99 14 99" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg></span><span class="cases-rows">${parsed.map(row => `<span class="case-value">${row.value}</span><span class="case-condition">（${row.condition}）</span>`).join('')}</span>`;
}

function updateAddress() {
  const next = new URL(location.href);
  next.searchParams.set('example', String(state.example));
  next.searchParams.set('view', state.view);
  history.replaceState(null, '', next);
}

function render({ focus = false } = {}) {
  const example = examples[state.example - 1];
  const scenario = scenarioMap[example.id];
  const summary = state.revealed && state.view === 'summary';
  document.title = `作問例${state.example}｜初見を、AIで作る`;
  document.querySelectorAll('[data-example]').forEach(link => {
    if (Number(link.dataset.example) === state.example) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  controls.innerHTML = state.revealed
    ? `<p class="control-note">問題とねらいをまとめて確認できます。</p><div class="control-actions" role="group" aria-label="表示内容"><button type="button" class="button" data-action="problem" aria-pressed="${!summary}">問題だけ</button><button type="button" class="button" data-action="summary" aria-pressed="${summary}">問題とねらい</button><button type="button" class="button quiet" data-action="reset">最初から見る</button></div>`
    : `<p class="control-note">解答とねらいは、まだ表示していません。</p><button type="button" class="button primary" data-action="answer" aria-expanded="false" aria-controls="answer-details">${eyeIcon}答え合わせ</button>`;
  content.innerHTML = `<article class="capture-panel" id="capture-panel" data-example="${state.example}" data-view="${summary ? 'summary' : 'problem'}" aria-labelledby="capture-title"><div id="capture-problem"><header class="capture-header"><h2 class="capture-title" id="capture-title"><span class="example-badge">${String(state.example).padStart(2, '0')}</span>AIが作った問題</h2><p class="capture-subtitle">${escape(example.subtitle)}</p></header><div class="problem-body">${scenario.problemHtml}</div></div>${summary ? intentHtml(scenario) : ''}${sourcesHtml(example)}</article>${state.revealed ? `<details class="solution-details" id="answer-details"><summary>解答・解説を開く</summary><div class="answer-body">${scenario.answerHtml}</div><p class="answer-note">ここで示すのは解き方の一例です。別の方針でも、条件を満たして筋道が通っていれば解答として成り立ちます。</p></details>` : '<div id="answer-details" hidden></div>'}`;
  typesetCases();
  if (focus) {
    const title = document.getElementById('capture-title');
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
  }
}

controls.addEventListener('click', event => {
  const action = event.target.closest('button[data-action]')?.dataset.action;
  if (!action) return;
  if (action === 'answer') { state.revealed = true; state.view = 'summary'; }
  if (action === 'summary' && state.revealed) state.view = 'summary';
  if (action === 'problem') state.view = 'problem';
  if (action === 'reset') { state.revealed = false; state.view = 'problem'; }
  updateAddress();
  render();
  const targetAction = action === 'answer' ? 'summary' : action === 'reset' ? 'answer' : action;
  controls.querySelector(`[data-action="${targetAction}"]`)?.focus({ preventScroll: true });
});

document.querySelector('.example-tabs').addEventListener('click', event => {
  const link = event.target.closest('[data-example]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  state.example = Number(link.dataset.example);
  state.revealed = false;
  state.view = 'problem';
  updateAddress();
  render({ focus: true });
});

window.addEventListener('popstate', () => {
  const query = new URLSearchParams(location.search);
  state.example = Number(query.get('example')) === 2 ? 2 : 1;
  state.view = query.get('view') === 'summary' ? 'summary' : 'problem';
  state.revealed = state.view === 'summary';
  render();
});
render();
