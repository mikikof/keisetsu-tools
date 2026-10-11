import { scenarios } from './scenarios.js?v=december-20261009-2';
import { mountInputKit } from './input-kit.js?v=december-20261009-2';
import { escape, icon } from './studio-ui.js?v=20261011-1';
import { SUBJECT_EXAMPLES } from './subject-examples.js?v=december-20261009-2';
import { heroArt, subjectArt, workArt } from './editorial-art.js?v=20261011-1';

const experience = document.getElementById('experience');
const feedback = document.getElementById('copy-feedback');
const subjects = {
  math: { label:'数学', icon:'math', university:'東北大学', year:'2026', exam:'前期・文系', range:'数学Ⅰ・Ⅱ・A・B・C' },
  science: { label:'物理', icon:'science', university:'早稲田大学', year:'2025', exam:'基幹・創造・先進理工学部', range:'電磁気・力学' },
  social: { label:'地理', icon:'social', university:'一橋大学', year:'2025', exam:'前期', range:'人口移動と経済' }
};
const mathIds = ['remainders-difference','integers-probability','integers-sequence','remainders-next-multiple'];
const state = { scene:0, visited:0, subject:'math', mathIndex:0, task:0, answer:false, notes:new Map(), view:'demo' };
let ownKit, clipboardBusy=false;
const subject=()=>subjects[state.subject];
const current=()=>state.subject==='math' ? mathExample() : SUBJECT_EXAMPLES.find(s=>s.subject===state.subject);
const hasMaterial=()=>state.subject==='math' && current().path==='adapt';
const sourceLink=(url,label='大学公式の問題PDFを開く')=>`<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label} ${icon('external')}</a>`;

function mathExample(){
  const s=scenarios.find(s=>s.id===mathIds[state.mathIndex]);
  const change={
    'remainders-difference':['割り算の余りから次の項を作る','２つの項の差の絶対値から次の項を作る'],
    'remainders-next-multiple':['割り算の余りから次の項を作る','倍数までの不足から次の項を作る'],
    'integers-probability':['整数の条件を調べ、証明する','証明した整数の性質を、確率の計算に使う'],
    'integers-sequence':['整数の条件を調べ、証明する','数列を作り、整数の解が続くことを調べる']
  }[s.id];
  return {...s,subject:'math',university:'東北大学',year:'2026',examLabel:'前期 数学〔文系等〕第２問',range:subjects.math.range,formatLabel:'小問３つ・記述式',questionCount:3,
    sourceUrl:'https://admissions.tohoku.ac.jp/ja/adcms/wp-content/uploads/2026/05/eq_2026mathematics_l.pdf#page=4',sourcePage:'数学〔文系等〕PDF４ページ目',
    sourceHtml:'<p>正の整数の組を調べ、整数の性質を証明する問題です。最初の小問では具体例を求め、後半では理由を説明します。</p>',
    sourcePoints:['具体例から考える','整数の性質を証明する','３つの小問で構成'],
    sourceDiagramHtml:`<svg class="subject-figure source-integers" viewBox="0 0 540 250" role="img" aria-label="正の整数a、b、cが満たす方程式の原問を要約した図"><path d="M28 23H476L509 56V222H28Z" fill="#faf9f5" stroke="#b7c7be" stroke-width="2"/><path d="M475 24v34h34" fill="none" stroke="#b7c7be" stroke-width="2"/><text x="66" y="67" font-size="19" font-family="sans-serif" fill="#22645b">正の整数 a, b, c</text><text x="268" y="137" text-anchor="middle" font-size="40" font-weight="600" font-family="serif" fill="#152b37">a² ＋ 2b² ＝ c²</text><path d="M67 172H471" stroke="#d4dcd6"/><text x="268" y="206" text-anchor="middle" font-size="18" font-family="sans-serif" fill="#52635e">組を求める・性質を証明する</text></svg>`,
    changes:[{label:'形式',before:'具体例から証明へ進む小問３つ',after:'小問の並びと記述式を引き継ぐ'},{label:'設定・問い',before:change[0],after:change[1]}]};
}
function subjectTabs(compact=false){
  return `<div class="case-grid ${compact?'compact':''}" role="group" aria-label="参考にする入試問題">${Object.entries(subjects).map(([key,s])=>`<button type="button" class="case-card ${state.subject===key?'selected':''}" data-subject="${key}"><div class="case-art">${subjectArt(key)}</div><div class="case-copy"><span class="case-subject">${s.label}</span><h3 class="case-university">${s.university}</h3><p class="case-meta">${s.year}年度 ${s.exam}</p></div><div class="case-bottom"><span>この問題から作る</span>${icon('arrow')}</div></button>`).join('')}</div>`;
}
function overview(){
  return `<section class="editorial-hero" aria-labelledby="intro-title"><div class="hero-copy"><p class="eyebrow">12月号「初見を、AIで作る」</p><h1 class="hero-title" id="intro-title">過去問をもとに、<br>初見問題を作る。</h1><p class="hero-lead">設定も問い方もAIに任せる。<br>自分では思いつかなかった問題で、<br>知っていることを使えるか試してみます。</p><div class="hero-actions"><button class="button primary" type="button" data-action="choose">作問例を見る ${icon('arrow')}</button><button class="button quiet" type="button" data-action="own">AIへの依頼文を作る</button><a class="button quiet" href="./article.html">数学の問題を詳しく見る</a></div></div><div class="hero-visual">${heroArt()}<ol class="hero-mobile-steps"><li>過去問を渡す</li><li>AIが作問する</li><li>新しい問題を解く</li></ol></div></section><section class="case-section" id="case-list" aria-labelledby="cases-heading"><div class="section-heading"><span>参考にする入試問題</span><h2 id="cases-heading">数学・理科・社会で、どんな問題ができる？</h2><p>実際の過去問を使って、作問の手順とできあがった問題を見ていきます。</p></div>${subjectTabs()}</section><p class="site-explanation">掲載しているのは事前に作成した作問例です。手元の過去問を添付する場合も、大学・学部の調査から任せる場合も、AIへ送る依頼文を作れます。</p>`;
}
function processNav(){
  const labels=[['参考にする問題','過去問と範囲を渡す'],['AIに任せる','設定・問い方・検算'],['新しい問題','解いてから答え合わせ']];
  return `<nav class="process-nav" aria-label="作問の手順">${labels.map(([title,desc],i)=>`<button type="button" class="process-step ${state.scene>i+1?'complete':''}" data-step="${i+1}" ${state.visited<i+1?'disabled':''} ${state.scene===i+1?'aria-current="step"':''}><span class="step-number">${state.scene>i+1?icon('check'):String(i+1).padStart(2,'0')}</span><span><strong>${title}</strong><small>${desc}</small></span></button>`).join('')}</nav>`;
}
function workspace(content){
  const s=subject();
  return `<div class="workspace-shell"><aside class="chapter-nav"><p class="chapter-label">選んだ過去問</p><div class="chapter-subject">${icon(s.icon)}<h2>${s.university}</h2><small>${s.year}年度・${s.label}</small></div>${processNav()}<button class="button quiet change-case" type="button" data-action="home">${icon('back')}問題を選び直す</button></aside><div class="chapter-content" data-scene="${state.scene}">${content}</div></div>`;
}
function sourceStage(){
  const s=current();
  return `<section aria-labelledby="stage-title"><div class="stage-heading"><p class="stage-kicker">01　参考にする問題</p><h1 id="stage-title">過去問と範囲をAIに渡す</h1><p>問題のどこをどう変えるかは、AIに考えてもらいます。</p></div><article class="source-spread"><div class="source-meta"><span class="official-tag">実際の入試問題</span><span>${s.year}年度</span></div><header class="source-title"><h2>${s.university}</h2><p>${escape(s.examLabel)}</p></header><div class="source-interior"><div class="reference-visual figure-scroll">${s.sourceDiagramHtml}</div><div class="source-body">${s.sourceHtml}<ul class="source-points">${s.sourcePoints.map(p=>`<li>${escape(p)}</li>`).join('')}</ul></div></div><div class="source-citation"><p>原問の要点を、図と文章でまとめています。</p>${sourceLink(s.sourceUrl)}<small>${escape(s.sourcePage)}</small></div>${hasMaterial()?`<div class="extra-source">${icon('clip')}<div><strong>発展問題も参考にする</strong><p>東北大学2026年度 AO入試Ⅱ期・理学部（数学系）第１問。割り算の余りから次の項を作る問題です。</p>${sourceLink('https://admissions.tohoku.ac.jp/ja/adcms/wp-content/uploads/2026/06/R8_05.pdf#page=3','大学公式のAO入試問題を見る')}</div></div>`:''}<div class="conditions-strip"><div><span>出題範囲</span><strong>${escape(s.range)}</strong></div><div><span>作る分量</span><strong>${state.subject==='social'?'125字以内の記述１問':state.subject==='science'?'計算・記述の小問３つ':'大問１題・小問３つ'}</strong></div><div><span>変更のアイデア</span><strong>AIに任せる</strong></div></div></article><div class="request-line">${icon('chat')}<p>「この過去問を参考に、新しい問題を作って。設定や問い方は任せます。」</p></div><div class="stage-actions"><button class="button quiet" type="button" data-action="home">${icon('back')}問題を選び直す</button><button class="button primary" type="button" data-action="next">この問題を参考にする ${icon('arrow')}</button></div></section>`;
}
const tasks=[
  {title:'形式を読む',short:'小問の構成・分量',detail:'過去問の形式を読む',body:'小問の並び、答え方、使う知識を読み取らせます。大学名だけで出題傾向を決めつけず、渡した問題を基準にします。'},
  {title:'新しい問題を考える',short:'設定も問い方も任せる',detail:'作問のアイデアから任せる',body:'どんな設定にするか、何を組み合わせるか、どの視点で問うかもAIに任せます。変更案を先に選ばず、できた問題を初めて読むところから始めます。'},
  {title:'解いて確認する',short:'条件・解答・学習範囲',detail:'出す前に解かせて確認する',body:'条件の不足や矛盾がないか、指定した範囲で解けるかを確かめさせます。記述問題では、想定と違う答えでも根拠が妥当なら認めるよう頼みます。'}
];
function requestPrompt(){return current().prompt;}
function aiStage(){
  const t=tasks[state.task];
  return `<section aria-labelledby="stage-title"><div class="stage-heading"><p class="stage-kicker">02　AIに任せる</p><h1 id="stage-title">アイデアは用意しなくていい</h1><p>資料を渡したら、作問から解答の確認まで頼みます。</p></div><div class="delegation-spread"><div class="work-illustration">${workArt(state.task)}</div><div class="delegation-copy"><span class="official-tag">AIに頼む内容</span><h2>${t.detail}</h2><p>${t.body}</p></div></div><div class="task-list" role="group" aria-label="AIに頼む内容を確認">${tasks.map((t,i)=>`<button type="button" class="task-item ${state.task===i?'active':''}" data-task="${i}" aria-pressed="${state.task===i}"><span class="task-number">${i+1}</span><span><strong>${t.title}</strong><small>${t.short}</small></span></button>`).join('')}</div><div class="sealed-notice">${icon('lock')}<p><strong>先に見せるのは、問題だけ。</strong><span>解答や変更点は「答え合わせ」と送るまで出さないようにします。</span></p></div><details class="prompt-details"><summary>AIに送る依頼文を見る</summary><label class="sr-only" for="full-prompt">AIに送る依頼文</label><textarea id="full-prompt" class="prompt-text" readonly>${escape(requestPrompt())}</textarea><button class="button secondary" type="button" data-action="copy-prompt">${icon('copy')}依頼文をコピー</button></details><div class="stage-actions"><button class="button quiet" type="button" data-action="back">${icon('back')}過去問に戻る</button><button class="button primary" type="button" data-action="next">できあがった問題例を開く ${icon('arrow')}</button></div><p class="site-explanation">このページでは事前に作成した問題例を開きます。その場でAIに生成させる機能ではありません。</p></section>`;
}
function comparisons(){
  return `<div class="comparison-grid">${current().changes.map(c=>`<div class="comparison-cell"><span>${escape(c.label)}</span><div><small>原問</small><p>${escape(c.before)}</p></div>${icon('arrow')}<div><small>作問例</small><p>${escape(c.after)}</p></div></div>`).join('')}</div>`;
}
function result(){
  const s=current(),note=state.notes.get(s.id)||'',essay=state.subject==='social';
  return `<section aria-labelledby="result-title"><div class="result-top"><div><p class="stage-kicker">03　新しい問題</p><h1 id="result-title">まずは解いてみる</h1><p>解答と変更点は、答え合わせで確認できます。</p></div><span class="format-pill">${escape(s.formatLabel)}</span></div><article class="result-paper"><div class="paper-header"><span>問題</span><span>${subject().label}の作問例</span></div><div class="problem-body">${s.problemHtml}</div><p class="question-meta">${escape(s.university)}の過去問を参考にした独自の問題です。</p></article><div class="result-actions">${['integers-sequence','remainders-difference'].includes(s.id)?`<a class="button quiet" href="./article.html?example=${s.id==='integers-sequence'?1:2}&amp;view=${state.answer?'summary':'problem'}">問題を大きく表示</a>`:''}<button class="button quiet" type="button" data-action="copy-problem">${icon('copy')}問題をコピー</button><button class="button quiet" type="button" data-action="download">${icon('download')}テキストで保存</button></div><label class="note-field" for="approach-note"><span>${essay?'解答を書く':'方針や気づいたことをメモする'} <small>任意</small></span><textarea id="approach-note" rows="${essay?4:2}" ${essay?'aria-describedby="answer-count"':''} placeholder="${essay?'125字以内で記述してください。':'紙で解いてもかまいません。'}">${escape(note)}</textarea>${essay?`<small id="answer-count" role="status" class="${[...note].length>125?'over-limit':''}">${[...note].length} / 125字</small>`:''}<small>入力した内容は、このページを開いている間だけ残ります。</small></label><button class="button solution-toggle" type="button" data-action="answer" aria-expanded="${state.answer}" aria-controls="solution-area">${icon('eye')}${state.answer?'答え合わせを閉じる':'答え合わせ'} ${icon(state.answer?'close':'arrow')}</button><div id="solution-area" class="solution-area" ${state.answer?'':'hidden'}>${state.answer?`<h2>解答・解説</h2><div class="answer-body">${s.answerHtml}</div><h2>原問から何を変えたか</h2>${comparisons()}<div class="intent-body">${s.intentHtml}</div><details class="provenance-details"><summary>参考にした問題と確認事項</summary><p>${escape(s.provenance)}</p><p>${escape(s.verification)}</p><p>${sourceLink(s.sourceUrl)}${s.sourceIntentUrl?` · ${sourceLink(s.sourceIntentUrl,'公式の出題意図')}`:''}</p></details>${state.subject==='math'?`<button class="button secondary" type="button" data-action="another">別の数学の問題例を見る ${icon('arrow')}</button>`:''}`:''}</div><div class="result-footer"><div><h2>手元の過去問でも作れます</h2><p>資料と学習範囲から、AIへ送る依頼文を用意します。</p></div><button class="button primary" type="button" data-action="own">手元の過去問を使う ${icon('arrow')}</button></div></section><section class="next-subjects"><h2>ほかの科目でも見てみる</h2>${subjectTabs(true)}</section>`;
}

function render({ focus = false } = {}) {
  experience.innerHTML = state.scene === 0 ? overview() : workspace(state.scene === 1 ? sourceStage() : state.scene === 2 ? aiStage() : result());
  feedback.textContent = '';
  if (focus) {
    const heading = experience.querySelector('h1');
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    document.getElementById('demo-panel').scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}
function move(n) { state.scene = n; state.visited = Math.max(state.visited, n); render({ focus: true }); }
function setView(view) {
  if (!['demo', 'own'].includes(view)) return;
  state.view = view;
  document.getElementById('demo-panel').hidden = view !== 'demo';
  document.getElementById('own-panel').hidden = view !== 'own';
  document.querySelectorAll('[data-view]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.view === view)));
  if (view === 'own' && !ownKit) ownKit = mountInputKit(document.getElementById('input-kit'), { subject: state.subject });
  history.replaceState(null, '', view === 'own' ? '#own' : '#demo');
  feedback.textContent = '';
}

function plainText(markup) {
  const div = document.createElement('div');
  div.innerHTML = markup;
  div.querySelectorAll('svg').forEach(el => {
    const description = el.querySelector('desc')?.textContent?.trim();
    if (description) el.replaceWith(document.createTextNode(`\n【図の説明】${description}\n`));
    else el.remove();
  });
  div.querySelectorAll('.questions > li').forEach((el, i) => el.prepend(document.createTextNode(`(${i + 1}) `)));
  div.querySelectorAll('sup').forEach(el => el.replaceWith(document.createTextNode(`^${el.textContent}`)));
  div.querySelectorAll('sub').forEach(el => el.replaceWith(document.createTextNode(`_{${el.textContent}}`)));
  div.querySelectorAll('th, td').forEach(el => el.append(document.createTextNode('\t')));
  div.querySelectorAll('p, li, div, tr, h2, h3, h4, figcaption, caption, br').forEach(el => el.append(document.createTextNode('\n')));
  return div.textContent.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
async function copy(text) {
  if (clipboardBusy) return;
  clipboardBusy = true; let ok = false;
  try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); ok = true; } } catch {}
  if (!ok) {
    const area = document.createElement('textarea'); area.value = text; area.className = 'copy-fallback';
    document.body.append(area); area.focus(); area.select();
    try { ok = Boolean(document.execCommand?.('copy')); } catch {}
    if (ok) area.remove(); else { area.className = 'manual-copy'; feedback.replaceChildren(document.createTextNode('文章を選択してコピーしてください。'), area); }
  }
  if (ok) feedback.textContent = 'コピーしました。';
  clipboardBusy = false;
}
function download() {
  const url = URL.createObjectURL(new Blob([plainText(current().problemHtml)], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = `${subject().label}の問題例.txt`;
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}

experience.addEventListener('click', event => {
  const chosen = event.target.closest('[data-subject]');
  if (chosen && Object.hasOwn(subjects, chosen.dataset.subject)) {
    const changed = state.subject !== chosen.dataset.subject;
    state.subject = chosen.dataset.subject; state.scene = 1; state.visited = 1;
    state.answer = false; state.task = 0;
    if (changed) ownKit?.setSubject?.(state.subject);
    render({ focus: state.scene !== 0 });
    if (state.scene === 0) experience.querySelector(`[data-subject="${state.subject}"]`)?.focus({ preventScroll: true });
    return;
  }
  const step = event.target.closest('[data-step]');
  if (step && !step.disabled && Number(step.dataset.step) <= state.visited) { move(Number(step.dataset.step)); return; }
  const task = event.target.closest('button[data-task]');
  if (task && state.scene === 2 && /^[0-2]$/.test(task.dataset.task)) {
    state.task = Number(task.dataset.task); render();
    experience.querySelector(`button[data-task="${state.task}"]`)?.focus({ preventScroll: true }); return;
  }
  const button = event.target.closest('[data-action]'); if (!button || button.disabled) return;
  switch (button.dataset.action) {
    case 'choose': document.getElementById('case-list')?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); break;
    case 'start': state.answer = false; state.visited = 1; state.task = 0; move(1); break;
    case 'home': state.scene = 0; render({ focus: true }); break;
    case 'next': move(Math.min(3, state.scene + 1)); break;
    case 'back': move(Math.max(0, state.scene - 1)); break;
    case 'copy-prompt': copy(requestPrompt()); break;
    case 'copy-problem': copy(plainText(current().problemHtml)); break;
    case 'download': download(); break;
    case 'answer': state.answer = !state.answer; render(); experience.querySelector('[data-action="answer"]')?.focus({ preventScroll: true }); break;
    case 'another': if (state.subject === 'math' && state.answer) { state.mathIndex = (state.mathIndex + 1) % mathIds.length; state.answer = false; state.visited = 3; render({ focus: true }); } break;
    case 'own': setView('own'); document.getElementById('own-panel').scrollIntoView({ block: 'start' }); break;
  }
});
experience.addEventListener('input', event => { if (event.target.id === 'approach-note') { state.notes.set(current().id, event.target.value); const counter=document.getElementById('answer-count'); if(counter){const n=[...event.target.value].length;counter.textContent=`${n} / 125字`;counter.classList.toggle('over-limit',n>125);} } });
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => { setView(button.dataset.view); if (button.dataset.view === 'demo') render(); }));
document.getElementById('home-button').addEventListener('click', () => { setView('demo'); state.scene = 0; render({ focus: true }); });
window.addEventListener('hashchange', () => setView(location.hash === '#own' ? 'own' : 'demo'));
window.addEventListener('pagehide', () => ownKit?.pause?.());
render(); setView(location.hash === '#own' ? 'own' : 'demo');
