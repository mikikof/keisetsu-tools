const RETITLE = {
  '3つのミスから、小問を4題作ってもらう': '3つのミスから、短い問題を4題作ってもらう',
  '化学基礎の3つのミスから、小問を4題作ってもらう': '化学基礎の3つのミスから、短い問題を4題作ってもらう'
};
export const titleOf = ex => RETITLE[ex.title] ?? ex.title;

export const TRAPS = {
  math: {
    marks: [
      { math: '0≦x≦2', type: 'circle' },
      { math: 'log3(x+1)+log3(x−5)=3', type: 'line' },
      { text: '少なくとも1回', type: 'circle' }
    ],
    items: [
      { expect: '【第1問】', answer: 0, trap: 1 },
      { expect: '【第2問】', answer: 0, trap: 1 },
      { expect: '【第3問】', answer: 0, trap: 1 },
      { expect: '【第4問】', answer: 0 }
    ]
  },
  english: {
    marks: [
      { text: 'not available on weekends', type: 'line' },
      { text: 'the modern art section changes every month', type: 'line' },
      { text: 'All exhibits', type: 'circle' },
      { text: 'on weekends', type: 'circle' },
      { text: 'the modern art section', type: 'line' }
    ],
    items: [
      { expect: '正解', answer: 'head' },
      { expect: '1.', trap: 0 },
      { expect: '2.', trap: 0 },
      { expect: '3.', trap: 0 },
      { expect: '4.', answer: 'head' }
    ]
  },
  chemistry: {
    marks: [
      { math: '150mL', type: 'circle' },
      { text: '硫酸', type: 'circle' },
      { math: '200mL', type: 'circle' }
    ],
    items: [
      { expect: '第1問', answer: 0, trap: 1 },
      { expect: '第2問', answer: 0, trap: 1 },
      { expect: '第3問', answer: 0, trap: 1 },
      { expect: '第4問', answer: 0 }
    ]
  },
  geography: {
    marks: [
      { text: '有機農地面積', type: 'circle' },
      { text: 'いずれの国においても', type: 'circle' }
    ],
    items: [
      { expect: '正解', answer: 'head' },
      { expect: '× ①', trap: 'head' },
      { expect: '× ②', trap: 'head' },
      { expect: '× ④' }
    ]
  }
};

const plain = text => String(text).replace(/\$[^$]*\$/g, '式').replace(/\s+/g, '');

export function roles(exId, item, i) {
  const spec = TRAPS[exId]?.items?.[i];
  const none = { head: '', line: () => '' };
  if (!spec || !item.head.trim().startsWith(spec.expect)) return none;

  const trapClass = text => (plain(text).length > 40 ? 'is-trap-note' : 'is-trap');
  return {
    head: spec.answer === 'head' ? 'is-answer' : spec.trap === 'head' ? trapClass(item.head) : '',
    line: j => (spec.answer === j ? 'is-answer' : spec.trap === j ? trapClass(item.lines[j]?.text ?? '') : '')
  };
}

const squash = text => text.replace(/\s+/g, '');

function wrap(node, type) {
  const mark = document.createElement('mark');
  mark.className = `trap-mark is-${type}`;
  node.replaceWith(mark);
  mark.append(node);
  return mark;
}

function markText(root, needle, type) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: node => (node.parentElement.closest('.trap-mark, .math') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
  });
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const at = node.data.indexOf(needle);
    if (at < 0) continue;
    const middle = node.splitText(at);
    middle.splitText(needle.length);
    return wrap(middle, type);
  }
  return null;
}

function markMath(root, needle, type) {
  const target = [...root.querySelectorAll('.math')].find(el => !el.closest('.trap-mark') && squash(el.textContent) === needle);
  return target ? wrap(target, type) : null;
}

export function markTraps(root, exId) {
  let count = 0;
  for (const spec of TRAPS[exId]?.marks ?? []) {
    const mark = spec.math ? markMath(root, spec.math, spec.type) : markText(root, spec.text, spec.type);
    if (mark) count++;
  }
  return count;
}

const OPENERS = /[「『（(［\[]$/;
const BEFORE_SHORT = /(何|約)\s?$/;
const CLOSERS = /^\s?[ぁ-ゖ]{0,3}[。、」』）)，．]+/;
const PARTICLE = /^\s?[をにのでがとはも](?![ぁ-ゖ])/;

export function glueMath(root) {
  for (const math of root.querySelectorAll('.math')) {
    if (math.closest('.glue')) continue;
    const prev = math.previousSibling;
    const next = math.nextSibling;
    const short = squash(math.textContent).length <= 8;
    let head = '';
    let tail = '';
    if (prev?.nodeType === Node.TEXT_NODE) {
      const m = prev.data.match(OPENERS) || (short ? prev.data.match(BEFORE_SHORT) : null);
      if (m) head = m[0];
    }
    if (next?.nodeType === Node.TEXT_NODE) {
      const m = next.data.match(CLOSERS) || (squash(math.textContent).length <= 10 ? next.data.match(PARTICLE) : null);
      if (m) tail = m[0];
    }
    if (!head && !tail) continue;
    const glue = document.createElement('span');
    glue.className = 'glue';
    math.replaceWith(glue);
    if (head) { prev.data = prev.data.slice(0, -head.length); glue.append(head); }
    glue.append(math);
    if (tail) { next.data = next.data.slice(tail.length); glue.append(tail); }
  }

  for (const th of root.querySelectorAll('th')) {
    for (const node of [...th.childNodes]) {
      if (node.nodeType !== Node.TEXT_NODE) continue;
      const m = node.data.match(/（[^（）]{1,4}）/);
      if (!m) continue;
      const unit = node.splitText(m.index);
      unit.splitText(m[0].length);
      const glue = document.createElement('span');
      glue.className = 'glue';
      unit.replaceWith(glue);
      glue.append(unit);
    }
  }
}
