import { EXAMPLES } from './examples.js';
import { escape, icon, copyText, saveText } from './ui.js';
import { modeArt, notesArt } from './art.js';
import { MAX_ITEMS, COUNTS, buildMistakePrompt, buildReasonPrompt, mistakeStatus, reasonStatus } from './prompt-kit.js';
import { loadLines, saveLines } from './store.js';

const $ = (selector, scope = document) => scope.querySelector(selector);
const live = $('#live');
const announce = message => { live.textContent = ''; requestAnimationFrame(() => { live.textContent = message; }); };

const blankMistake = () => ({ rows: [{ subject: '', unit: '', miss: '' }], count: 4 });
const blankReason = () => ({ subject: '', material: '', spec: '', reasons: [''] });
const ARTICLE_MISTAKE = EXAMPLES.find(ex => ex.id === 'math')?.inputs ?? EXAMPLES.find(ex => ex.kind === 'mistake').inputs;
const ARTICLE_REASON = EXAMPLES.find(ex => ex.id === 'english')?.inputs ?? EXAMPLES.find(ex => ex.kind === 'reason').inputs;

const kit = (() => {
  const rootEl = $('#kit-root');
  const k = { mode: 'mistake', mistake: blankMistake(), reason: blankReason() };

  rootEl.innerHTML = `<div class="kit-root">
    <div class="kit-mode-switch" role="group" aria-label="指示文の型">
      <button type="button" class="kit-mode" data-mode="mistake" aria-pressed="true"><span class="kit-mode-art">${modeArt('mistake')}</span><span class="kit-mode-copy"><strong>ミスから問題を作る</strong><small>計算や知識のミスを1文で書く</small></span></button>
      <button type="button" class="kit-mode" data-mode="reason" aria-pressed="false"><span class="kit-mode-art">${modeArt('reason')}</span><span class="kit-mode-copy"><strong>選んだ理由から選択肢を作る</strong><small>選択肢を選んだ理由を1文で書く</small></span></button>
    </div>
    <div class="kit-layout">
      <div class="kit-settings">
        <form class="kit-form" data-form="mistake" novalidate>
          <section class="kit-step" aria-labelledby="mistake-heading">
            <h2 class="kit-step-title" id="mistake-heading"><span class="kit-no" aria-hidden="true">1</span>ミスを1文で書く</h2>
            <p class="kit-hint">「計算ミス」とまとめずに、科目・単元、どの場面で、何を確かめなかったかまで書きます。ミスは1つからでもかまいません。</p>
            <div class="kit-rows" data-rows="mistake"></div>
            <button class="button quiet kit-add" type="button" data-add="mistake">${icon('plus')}ミスを足す</button>
          </section>
          <section class="kit-step" aria-labelledby="count-heading">
            <h2 class="kit-step-title" id="count-heading"><span class="kit-no" aria-hidden="true">2</span>題数を選ぶ</h2>
            <label class="field kit-count" for="mistake-count">作ってもらう題数<select id="mistake-count" name="count">${COUNTS.map(n => `<option value="${n}"${n === 4 ? ' selected' : ''}>${n}題（うち1題は仕掛けなし）</option>`).join('')}</select></label>
          </section>
          <div class="kit-fill"><button class="button quiet" type="button" data-fill="mistake">${icon('note')}記事の例1を入れる</button><button class="button quiet" type="button" data-clear="mistake">${icon('close')}空にする</button></div>
        </form>
        <form class="kit-form" data-form="reason" novalidate hidden>
          <section class="kit-step" aria-labelledby="reason-subject-heading">
            <h2 class="kit-step-title" id="reason-subject-heading"><span class="kit-no" aria-hidden="true">1</span>科目と素材を決める</h2>
            <div class="kit-fields-grid">
              <label class="field" for="reason-subject">科目<input id="reason-subject" name="subject" maxlength="40" placeholder="例：英語リーディング" autocomplete="off"></label>
              <label class="field" for="reason-material">素材<input id="reason-material" name="material" maxlength="20" placeholder="例：英文、資料、文章など" list="material-list" autocomplete="off"></label>
              <datalist id="material-list"><option value="英文"></option><option value="資料"></option><option value="文章"></option><option value="会話文"></option></datalist>
              <label class="field kit-span-two" for="reason-spec"><span>素材と分量の指定<span class="kit-optional">任意</span></span><textarea id="reason-spec" name="spec" rows="2" maxlength="120" placeholder="例：英文は80語程度、設問は1問、選択肢は4つにしてください。" autocomplete="off"></textarea></label>
            </div>
          </section>
          <section class="kit-step" aria-labelledby="reason-heading">
            <h2 class="kit-step-title" id="reason-heading"><span class="kit-no" aria-hidden="true">2</span>選んだ理由を1文で書く</h2>
            <p class="kit-hint">間違えた設問で、なぜその選択肢を選んだのかを書きます。覚えていなければ、推測でもかまいません。</p>
            <div class="kit-rows" data-rows="reason"></div>
            <button class="button quiet kit-add" type="button" data-add="reason">${icon('plus')}理由を足す</button>
          </section>
          <div class="kit-fill"><button class="button quiet" type="button" data-fill="reason">${icon('note')}記事の例3を入れる</button><button class="button quiet" type="button" data-clear="reason">${icon('close')}空にする</button></div>
        </form>
      </div>
      <aside class="kit-output" aria-labelledby="output-heading">
        <h2 class="kit-step-title" id="output-heading"><span class="kit-no" aria-hidden="true">3</span>Gemini に貼り付ける</h2>
        <p class="kit-handoff">指示文をコピーして、Gemini のチャットに貼り付けて送ります。</p>
        <label class="sr-only" for="kit-prompt">入れた内容を反映した文章</label>
        <textarea id="kit-prompt" class="kit-prompt" rows="12" readonly spellcheck="false"></textarea>
        <p class="kit-ready" data-ready role="status"></p>
        <div class="kit-output-actions"><button class="button primary" type="button" data-action="copy">${icon('copy')}指示文をコピー</button><button class="button secondary" type="button" data-action="save">${icon('download')}テキストで保存</button></div>
        <p class="action-status" data-status role="status" aria-live="polite"></p>
        <div class="kit-after"><strong>解き終えたら「答え合わせ」と送る</strong><p>指示文では、最初は問題だけを出すよう頼んでいます。答えと、どこに何を仕掛けたかは、答え合わせのときに出してもらいます。やさしすぎると感じたら、「もう少し難しくしてください」と送ります。</p><p data-after="reason" hidden>答え合わせでは、自分が選んだ選択肢のどこが本文と違うか、正解が本文のどこを言い換えているかを確かめます。</p></div>
      </aside>
    </div>
  </div>`;

  const output = $('#kit-prompt', rootEl);
  const ready = $('[data-ready]', rootEl);
  const status = $('[data-status]', rootEl);

  function rowMarkup(mode, i, row, total) {
    const remove = total > 1 ? `<button class="button quiet kit-remove" type="button" data-remove="${mode}" data-index="${i}" aria-label="${mode === 'mistake' ? 'ミス' : '理由'}${i + 1}を消す">${icon('minus')}消す</button>` : '';
    if (mode === 'mistake') {
      return `<fieldset class="kit-row"><legend>ミス${i + 1}</legend>${remove}
        <div class="kit-row-grid">
          <label class="field" for="m-subject-${i}">科目<input id="m-subject-${i}" data-field="subject" data-index="${i}" maxlength="30" placeholder="例：数学Ⅰ" autocomplete="off" value="${escape(row.subject)}"></label>
          <label class="field" for="m-unit-${i}">単元<input id="m-unit-${i}" data-field="unit" data-index="${i}" maxlength="30" placeholder="例：2次関数" autocomplete="off" value="${escape(row.unit)}"></label>
          <label class="field kit-span-two" for="m-miss-${i}">ミスの1文<textarea id="m-miss-${i}" data-field="miss" data-index="${i}" rows="2" maxlength="200" placeholder="例：定義域のある最大・最小で、軸が定義域に入るかを確かめずに、頂点の値を答えた">${escape(row.miss)}</textarea></label>
        </div></fieldset>`;
    }
    return `<fieldset class="kit-row"><legend>理由${i + 1}</legend>${remove}
      <label class="field" for="r-reason-${i}"><span class="sr-only">選んだ理由${i + 1}</span><textarea id="r-reason-${i}" data-field="reason" data-index="${i}" rows="2" maxlength="200" placeholder="例：本文と同じ単語が入っている選択肢を、意味が合っているか確かめずに選んだ">${escape(row)}</textarea></label></fieldset>`;
  }

  function renderRows() {
    const m = k.mistake.rows;
    const r = k.reason.reasons;
    $('[data-rows="mistake"]', rootEl).innerHTML = m.map((row, i) => rowMarkup('mistake', i, row, m.length)).join('');
    $('[data-rows="reason"]', rootEl).innerHTML = r.map((row, i) => rowMarkup('reason', i, row, r.length)).join('');
    $('[data-add="mistake"]', rootEl).hidden = m.length >= MAX_ITEMS;
    $('[data-add="reason"]', rootEl).hidden = r.length >= MAX_ITEMS;
    $('#mistake-count', rootEl).value = String(k.mistake.count);
    for (const name of ['subject', 'material', 'spec']) $(`#reason-${name}`, rootEl).value = k.reason[name];
  }

  function fit(el) {
    if (!el || el.tagName !== 'TEXTAREA' || !el.offsetParent) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight + 2}px`;
  }
  const fitAll = () => rootEl.querySelectorAll('textarea').forEach(fit);
  window.addEventListener('resize', () => requestAnimationFrame(fitAll));

  function update() {
    const isMistake = k.mode === 'mistake';
    const values = isMistake ? k.mistake : k.reason;
    const result = isMistake ? mistakeStatus(values) : reasonStatus(values);
    output.value = isMistake ? buildMistakePrompt(values, { draft: !result.ready }) : buildReasonPrompt(values, { draft: !result.ready });
    output.classList.toggle('is-draft', !result.ready);
    ready.textContent = result.message;
    ready.classList.toggle('is-ready', result.ready);
    rootEl.querySelectorAll('[data-action="copy"], [data-action="save"]').forEach(button => { button.disabled = !result.ready; });
    status.textContent = '';
    fit(output);
  }

  function setMode(mode) {
    k.mode = mode;
    rootEl.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
    $('[data-form="mistake"]', rootEl).hidden = mode !== 'mistake';
    $('[data-form="reason"]', rootEl).hidden = mode !== 'reason';
    $('[data-after="reason"]', rootEl).hidden = mode !== 'reason';
    update();
    fitAll();
  }

  rootEl.addEventListener('click', async event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.dataset.mode) { setMode(target.dataset.mode); return; }
    if (target.dataset.add) {
      const list = target.dataset.add === 'mistake' ? k.mistake.rows : k.reason.reasons;
      if (list.length >= MAX_ITEMS) return;
      list.push(target.dataset.add === 'mistake' ? { subject: '', unit: '', miss: '' } : '');
      renderRows(); update(); fitAll();
      $(target.dataset.add === 'mistake' ? `#m-subject-${list.length - 1}` : `#r-reason-${list.length - 1}`, rootEl)?.focus();
      return;
    }
    if (target.dataset.remove) {
      const list = target.dataset.remove === 'mistake' ? k.mistake.rows : k.reason.reasons;
      list.splice(Number(target.dataset.index), 1);
      renderRows(); update(); fitAll();
      const add = $(`[data-add="${target.dataset.remove}"]`, rootEl);
      (add.hidden ? $(`[data-rows="${target.dataset.remove}"] textarea`, rootEl) : add)?.focus();
      announce('1つ消しました。');
      return;
    }
    if (target.dataset.fill) { fill(target.dataset.fill === 'mistake' ? ARTICLE_MISTAKE : ARTICLE_REASON); announce('記事の例を入れました。'); return; }
    if (target.dataset.clear) {
      if (target.dataset.clear === 'mistake') k.mistake = blankMistake(); else k.reason = blankReason();
      renderRows(); update(); fitAll(); announce('入力を空にしました。');
      return;
    }
    if (target.dataset.action === 'copy') {
      const ok = await copyText(output.value);
      if (!ok) { output.focus(); output.select(); }
      status.textContent = ok ? 'コピーしました。Gemini のチャットに貼り付けて送ります。' : '文章を選択しました。Ctrl+C（Macでは⌘C）でコピーしてください。';
      return;
    }
    if (target.dataset.action === 'save') {
      saveText(output.value, k.mode === 'mistake' ? 'ひっかけ問題_ミスから作る_指示文.txt' : 'ひっかけ問題_選んだ理由から作る_指示文.txt');
      status.textContent = '指示文をテキストで保存しました。';
    }
  });

  rootEl.addEventListener('input', event => {
    const el = event.target;
    if (el.dataset.field && el.dataset.index !== undefined) {
      const i = Number(el.dataset.index);
      if (el.dataset.field === 'reason') k.reason.reasons[i] = el.value;
      else k.mistake.rows[i][el.dataset.field] = el.value;
    } else if (el.id === 'mistake-count') k.mistake.count = Number(el.value);
    else if (el.id?.startsWith('reason-')) k.reason[el.name] = el.value;
    update();
    fit(el);
  });
  rootEl.addEventListener('change', event => { if (event.target.id === 'mistake-count') { k.mistake.count = Number(event.target.value); update(); } });
  rootEl.addEventListener('submit', event => event.preventDefault());

  function fill(inputs) {
    if (inputs.mode === 'mistake') k.mistake = { rows: inputs.rows.map(row => ({ ...row })), count: inputs.count };
    else k.reason = { subject: inputs.subject, material: inputs.material, spec: inputs.spec, reasons: [...inputs.reasons] };
    renderRows();
    setMode(inputs.mode);
  }

  renderRows();
  setMode('mistake');
  return { fill, prompt: () => output.value };
})();

const notes = (() => {
  const rootEl = $('#notes-root');
  let lines = loadLines();
  const SAMPLES = ['数列の和は、項数を数え直してから使う', '古文の敬語は、誰から誰への敬意かを先に書き込む'];
  rootEl.innerHTML = `<div class="notes-panel">
    <form class="notes-form" novalidate>
      <label class="field" for="note-input">確認の1行<input id="note-input" maxlength="120" autocomplete="off" placeholder="例：${escape(SAMPLES[0])}"></label>
      <button class="button primary" type="submit">${icon('plus')}足す</button>
    </form>
    <p class="notes-status" data-note-status role="status" aria-live="polite"></p>
    <ol class="notes-list" data-note-list aria-label="書きためた確認の1行"></ol>
    <ul class="notes-list notes-samples" data-note-samples aria-label="確認の1行の例">${SAMPLES.map(line => `<li class="note-card is-sample"><span class="note-tag">例</span><span class="note-text">${escape(line)}</span></li>`).join('')}</ul>
    <div class="notes-actions" data-note-actions hidden><button class="button secondary" type="button" data-note="copy">${icon('copy')}一覧をコピー</button><button class="button secondary" type="button" data-note="save">${icon('download')}テキストで保存</button></div>
  </div>`;
  const art = document.querySelector('[data-notes-art]');
  if (art) art.innerHTML = notesArt();
  const input = $('#note-input', rootEl);
  const list = $('[data-note-list]', rootEl);
  const status = $('[data-note-status]', rootEl);
  const asText = () => lines.map(line => `・${line}`).join('\n');

  function render() {
    list.innerHTML = lines.map((line, i) => `<li class="note-card"><span class="note-no" aria-hidden="true">${i + 1}</span><span class="note-text">${escape(line)}</span><button class="note-remove" type="button" data-remove-note="${i}" aria-label="「${escape(line)}」を消す">${icon('close')}</button></li>`).join('');
    list.hidden = !lines.length;
    $('[data-note-samples]', rootEl).hidden = lines.length > 0;

    $('[data-note-actions]', rootEl).hidden = !lines.length;
  }

  function add(value) {
    const line = String(value).replace(/\s+/g, ' ').trim();
    if (!line) { status.textContent = '確認の1行を書いてから足します。'; return 'empty'; }
    lines = loadLines();
    if (lines.includes(line)) { status.textContent = '同じ行がすでにあります。'; render(); return 'duplicate'; }
    lines.push(line);
    saveLines(lines);
    render();
    status.textContent = `${lines.length}行目に足しました。`;
    return 'added';
  }

  $('.notes-form', rootEl).addEventListener('submit', event => {
    event.preventDefault();
    if (add(input.value) === 'added') input.value = '';
    input.focus();
  });
  rootEl.addEventListener('click', async event => {
    const remove = event.target.closest('[data-remove-note]');
    if (remove) {
      lines.splice(Number(remove.dataset.removeNote), 1);
      saveLines(lines);
      render();
      status.textContent = '1行消しました。';
      input.focus();
      return;
    }
    const action = event.target.closest('[data-note]')?.dataset.note;
    if (action === 'copy') status.textContent = await copyText(asText()) ? '一覧をコピーしました。' : 'コピーできませんでした。';
    if (action === 'save') { saveText(asText(), '確認の1行.txt'); status.textContent = '一覧をテキストで保存しました。'; }
  });
  window.addEventListener('storage', () => { lines = loadLines(); render(); });
  render();
  return { add };
})();

const from = new URLSearchParams(location.search).get('from');
const source = EXAMPLES.find(ex => ex.id === from);
if (source) {
  kit.fill(source.inputs);
  announce(`${source.label}の作問例の入力を、指示文を作る欄に入れました。`);
}
