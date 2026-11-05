import { EXAMPLES } from './examples.js';
import { markdown, inline, escape } from './markdown.js';
import { icon } from './ui.js';
import { roles, glueMath } from './display.js';

const params = new URLSearchParams(location.search);
const state = {
  id: EXAMPLES.some(ex => ex.id === params.get('example')) ? params.get('example') : EXAMPLES[0].id,
  answer: params.get('view') === 'answer',
  print: params.get('set') === 'print'
};
const ORIGIN = { math: '記事の例1', english: '記事の例3' };

function link(id, answer = state.answer) {
  const q = new URLSearchParams({ example: id });
  if (answer) q.set('view', 'answer');
  if (state.print) q.set('set', 'print');
  return `?${q.toString().replace(/&/g, '&amp;')}`;
}

function checkItems(ex) {
  const items = state.print ? ex.check.filter(item => item.print) : ex.check;

  return items.map(item => {
    const role = roles(ex.id, item, ex.check.indexOf(item));
    const lines = item.lines.map((line, j) => ({ ...line, cls: role.line(j) })).filter(line => !state.print || line.print);
    if (state.print && item.short) {
      const [first, ...rest] = lines;
      return `<div class="card-check-item"><p class="${first ? first.cls : ''}"><span class="card-check-head">${inline(item.short)}</span>${first ? inline(first.text) : ''}</p>${rest.map(line => `<p class="${line.cls}">${inline(line.text)}</p>`).join('')}</div>`;
    }
    return `<div class="card-check-item"><p class="card-check-head ${role.head}">${inline(item.head)}</p>${lines.map(line => `<p class="${line.cls}">${inline(line.text)}</p>`).join('')}</div>`;
  }).join('');
}

function render() {
  const ex = EXAMPLES.find(e => e.id === state.id);
  document.title = `${ex.label}の作問例｜ひっかけ問題を、AIで作る`;
  document.getElementById('example-tabs').innerHTML = EXAMPLES.map(e => `<a href="${link(e.id, false)}" ${e.id === ex.id ? 'aria-current="page"' : ''}><span class="tab-subject">${escape(e.label)}</span><span class="tab-meta">${escape(e.source)}</span></a>`).join('');
  document.getElementById('display-controls').innerHTML = `<div class="control-actions"><a class="button ${state.answer ? 'is-on' : 'primary'}" href="${link(ex.id, !state.answer)}">${icon(state.answer ? 'close' : 'eye')}${state.answer ? '答え合わせを閉じる' : '答え合わせを開く'}</a></div>`;
  const origin = ORIGIN[ex.id] ? `${ORIGIN[ex.id]}の指示文` : '指示文';

  document.getElementById('card').innerHTML = `<article class="capture-panel" aria-labelledby="${state.print ? 'card-title' : 'page-title'}">
    ${state.print ? `<div class="capture-header"><h2 class="capture-title" id="card-title">問題</h2><span class="capture-subtitle">${escape(ex.label)}の例</span></div>` : ''}
    <div class="capture-body problem-body">${markdown(ex.reply.body)}</div>
    ${state.answer ? `<section class="card-check" aria-labelledby="check-title"><h2 id="check-title">${icon('check')}答え合わせ（抜粋）</h2>${checkItems(ex)}</section>` : ''}
    ${state.print ? '' : `<footer class="capture-footer">${escape(origin)}を Gemini に送って返ってきた文面です${state.answer ? '（問題と、「答え合わせ」と送ったあとの返答の抜粋）' : ''}。</footer>`}
  </article>`;
  glueMath(document.getElementById('card'));
}

render();
const back = document.getElementById('back-link');
if (back) back.href = `./example.html?example=${encodeURIComponent(state.id)}`;
