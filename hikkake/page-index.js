import { EXAMPLES, MODEL } from './examples.js';
import { escape } from './ui.js';
import { stageMemo, stageMemoWide, stageChat, stageChatWide, stagePaper, stageArrow, subjectArt, kitArt, notesArt } from './art.js';
import { titleOf } from './display.js';

const $ = (selector, scope = document) => scope.querySelector(selector);
const KIND = { mistake: 'ミスから作る', reason: '選んだ理由から作る' };

const STAGES = {
  memo: () => stageMemo() + stageMemoWide(),
  chat: () => stageChat() + stageChatWide(),
  paper: stagePaper
};
const ARROW = '<svg class="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 16h25M20 8l8 8-8 8"/></svg>';

document.querySelectorAll('[data-stage]').forEach(el => { el.innerHTML = STAGES[el.dataset.stage](); });
document.querySelectorAll('[data-arrow]').forEach(el => { el.innerHTML = stageArrow('right') + stageArrow('down'); });
$('[data-tool="kit"]').innerHTML = kitArt();
$('[data-tool="notes"]').innerHTML = notesArt();

$('#case-grid').innerHTML = EXAMPLES.map(ex => `
  <a class="case-card" href="./example.html?example=${encodeURIComponent(ex.id)}">
    <span class="case-art">${subjectArt(ex.id)}</span>
    <span class="case-copy">
      <span class="case-kind"><span class="seg">${escape(KIND[ex.kind] ?? '')}<span class="sep">・</span></span><span class="seg">${escape(ex.source)}</span></span>
      <span class="case-subject">${escape(ex.label)}</span>
      <span class="case-title">${escape(titleOf(ex))}</span>
    </span>
    <span class="case-bottom"><span>この作問例を見る</span>${ARROW}</span>
  </a>`).join('');

const modelNote = $('[data-model-version]');
if (modelNote) modelNote.textContent = MODEL.replace(/^Gemini\s+/, '');
