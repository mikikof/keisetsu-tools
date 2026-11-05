import { EXAMPLES } from './examples.js';
import { markdown, inline } from './markdown.js';
import { escape, icon, copyText } from './ui.js';
import { subjectArt } from './art.js';
import { addLine } from './store.js';
import { titleOf, roles, markTraps, glueMath, TRAPS } from './display.js';

const $ = (selector, scope = document) => scope.querySelector(selector);
const KIND = { mistake: 'ミスから作る', reason: '選んだ理由から作る' };
const ARROW = icon('arrow');
const live = $('#live');
const announce = message => { live.textContent = ''; requestAnimationFrame(() => { live.textContent = message; }); };

const known = id => EXAMPLES.some(ex => ex.id === id);
const initial = new URLSearchParams(location.search).get('example');
const state = { id: known(initial) ? initial : EXAMPLES[0].id, open: false };
const current = () => EXAMPLES.find(ex => ex.id === state.id) ?? EXAMPLES[0];

const isChatPreface = text => /作成|ご提示|答え合わせ|お送り|送って|解説|ください。\s*$/.test(text) && !/^次の/.test(text.trim());

function tabsMarkup() {
  return EXAMPLES.map(ex => `<a href="?example=${encodeURIComponent(ex.id)}" data-example="${ex.id}"${ex.id === state.id ? ' aria-current="page"' : ''}><span class="tab-subject">${escape(ex.label)}</span><span class="tab-meta">${escape(KIND[ex.kind] ?? '')}</span></a>`).join('');
}

function checkMarkup(ex) {
  return ex.check.map((item, i) => {
    const role = roles(ex.id, item, i);
    return `<div class="check-item"><p class="check-head ${role.head}">${inline(item.head)}</p>${item.lines.length ? `<ul>${item.lines.map((line, j) => `<li class="${role.line(j)}">${inline(line.text)}</li>`).join('')}</ul>` : ''}</div>`;
  }).join('');
}

function solutionMarkup(ex) {
  const marked = TRAPS[ex.id]?.marks?.length ? '問題の紙には、仕掛けの場所に朱の印を付けました。' : '';
  return `<p class="solution-lead">答え合わせの返答から抜き出しました。${marked}</p>
    <div class="answer-sheet">${checkMarkup(ex)}</div>
    <div class="confirm-card">
      <p class="confirm-label">確認の1行の例</p>
      <p class="confirm-text">${escape(ex.confirm.when)}、確認の1行は「<strong>${escape(ex.confirm.line)}</strong>」です。</p>
      <div class="confirm-actions"><button class="button secondary" type="button" data-action="add-confirm">${icon('plus')}確認の1行に足す</button></div>
      <p class="action-status" data-status="confirm" role="status" aria-live="polite"></p>
    </div>
    <p class="after-check">答え合わせのあとは、答えが合った問題も、条件を確かめて解いたのか、たまたま合ったのかを見直します。</p>
    <p class="verification-note">載せた例の正解は、解き直して確かめています。AIの答えや説明は、教科書や参考書でも確かめます。</p>`;
}

function sendButton() {
  return state.open
    ? `${icon('close')}<span>答え合わせを閉じる</span>`
    : `${icon('send')}<span>「答え合わせ」と送る</span>`;
}

function threadMarkup(ex) {
  const lead = ex.reply.lead && !isChatPreface(ex.reply.lead) ? `<div class="exam-lead">${markdown(ex.reply.lead)}</div>` : '';
  return `
  <section class="turn turn--prompt" aria-labelledby="prompt-h">
    <h2 class="turn-title" id="prompt-h">送った指示文</h2>
    <div class="bubble-me" tabindex="0" role="region" aria-labelledby="prompt-h">${escape(ex.prompt)}</div>
    <div class="turn-actions">
      <button class="button secondary" type="button" data-action="copy">${icon('copy')}指示文をコピー</button>
      <a class="button quiet" href="./tools.html?from=${encodeURIComponent(ex.id)}#kit">${icon('pen')}この入力で指示文を作る</a>
    </div>
    <p class="action-status" data-status="copy" role="status" aria-live="polite"></p>
  </section>
  <section class="turn turn--reply" aria-labelledby="reply-h">
    <div class="turn-head">
      <h2 class="turn-title" id="reply-h">返ってきた問題</h2>
      <a class="button quiet" href="./card.html?example=${encodeURIComponent(ex.id)}">${icon('expand')}大きく表示</a>
    </div>
    <article class="exam-paper" aria-labelledby="reply-h">${lead}<div class="problem-body">${markdown(ex.reply.body)}</div></article>
  </section>
  <section class="turn turn--check" aria-labelledby="check-h">
    <h2 class="turn-title" id="check-h">答え合わせ</h2>
    <p class="turn-lead">答えと、どの問題に何を仕掛けたかは、「答え合わせ」と送るまで出さないよう、指示文で頼んでおきます。解き終えるまで、正解と仕掛けは開かずにおきます。</p>
    <div class="send-row"><button class="button send-button${state.open ? ' is-open' : ''}" type="button" data-action="answer" aria-expanded="${state.open}" aria-controls="solution">${sendButton()}</button></div>
    <div class="solution" id="solution"${state.open ? '' : ' hidden'}>${state.open ? solutionMarkup(ex) : ''}</div>
  </section>`;
}

function nextMarkup() {
  return EXAMPLES.filter(ex => ex.id !== state.id).map(ex => `<a class="next-card" href="?example=${encodeURIComponent(ex.id)}" data-example="${ex.id}"><span class="next-art">${subjectArt(ex.id)}</span><span class="next-copy"><small>${escape(KIND[ex.kind] ?? '')}</small><strong>${escape(ex.label)}</strong><span>${escape(titleOf(ex))}</span></span>${ARROW}</a>`).join('');
}

function render({ focusTitle = false } = {}) {
  const ex = current();
  document.title = `${ex.label}の作問例｜ひっかけ問題を、AIで作る`;
  $('#page-kicker').textContent = `${ex.label}の作問例・${ex.source}`;
  $('#page-title').textContent = titleOf(ex);
  $('#intro-art').innerHTML = subjectArt(ex.id);
  $('#example-tabs').innerHTML = tabsMarkup();
  $('#thread').innerHTML = threadMarkup(ex);
  for (const scope of document.querySelectorAll('#thread .problem-body, #thread .answer-sheet')) glueMath(scope);

  if (state.open) markTraps($('#thread .exam-paper'), ex.id);
  $('#next-grid').innerHTML = nextMarkup();
  if (focusTitle) {
    const title = $('#page-title');
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
  }
}

function select(id, { scroll = false } = {}) {
  if (!known(id)) return;
  state.id = id;
  state.open = false;
  const next = new URL(location.href);
  next.searchParams.set('example', id);
  history.replaceState(null, '', next);
  render({ focusTitle: true });
  if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
  announce(`${current().label}の作問例を表示しました。`);
}

document.addEventListener('click', event => {
  const link = event.target.closest('a[data-example]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  select(link.dataset.example, { scroll: Boolean(link.closest('#next-grid')) });
});

$('#thread').addEventListener('click', async event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const ex = current();
  const action = button.dataset.action;
  if (action === 'answer') {
    state.open = !state.open;
    render();
    $('#thread [data-action="answer"]').focus({ preventScroll: true });
    announce(state.open ? '答え合わせの返答を開きました。' : '答え合わせの返答を閉じました。');
  } else if (action === 'copy') {
    const status = $('#thread [data-status="copy"]');
    status.textContent = '';
    status.textContent = await copyText(ex.prompt) ? 'コピーしました。Gemini のチャットに貼り付けて送ります。' : 'コピーできませんでした。指示文の枠を選択してコピーしてください。';
  } else if (action === 'add-confirm') {
    const result = addLine(ex.confirm.line);
    const status = $('#thread [data-status="confirm"]');
    const message = result === 'added' ? '確認の1行に足しました。' : '同じ行がすでにあります。';
    status.innerHTML = `${message}<a class="status-link" href="./tools.html#notes">確認の1行の一覧を開く${ARROW}</a>`;
  }
});

window.addEventListener('popstate', () => {
  const id = new URLSearchParams(location.search).get('example');
  state.id = known(id) ? id : EXAMPLES[0].id;
  state.open = false;
  render();
});

render();
