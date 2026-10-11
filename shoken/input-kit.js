/**
 * A local attachment checklist and prompt builder. No file is uploaded here.
 * buildCreationPrompt accepts the same named fields as the form below.
 */
const DEFAULTS = Object.freeze({
  mode: 'past-paper', university: '', faculty: '', subject: '数学', range: '', volume: '大問１題', difficulty: '過去問と同じくらい', wishes: '',
  targetPage: '1', targetQuestion: '1', materialPage: '1', materialQuestion: '1',
  targetName: '', materialName: '', targetType: '', materialType: '', targetText: '', materialText: ''
});
const SUBJECTS = ['数学', '理科', '物理', '化学', '生物', '地学', '社会', '地理', '日本史', '世界史', '公共・政治経済'];
const subjectName = value => ({ math: '数学', science: '理科', social: '社会' }[value] || (SUBJECTS.includes(value) ? value : '数学'));
const rangeExample = subject => ({
  '数学': '例：数学Ⅰ・Ⅱ・A・B・Cの既習範囲',
  '理科': '例：物理の力学／生物の遺伝',
  '物理': '例：力学・波動',
  '化学': '例：化学平衡・電池',
  '生物': '例：遺伝・生態系',
  '地学': '例：大気・海洋',
  '社会': '例：地理の人口・都市／日本史の近代',
  '地理': '例：人口・都市',
  '日本史': '例：明治時代から昭和初期まで',
  '世界史': '例：産業革命と19世紀の世界',
  '公共・政治経済': '例：市場と政府の役割'
}[subject] || '例：授業で学習した範囲');
const clean = (value) => String(value ?? '').trim();
const fileLabel = (value) => clean(value).replace(/[\u0000-\u001f\u007f]/g, ' ');
const integerLabel = (value) => Number.isInteger(Number(value)) && Number(value) >= 1 ? String(Number(value)) : '指定';
const modeName = (value) => value === 'research' ? 'research' : 'past-paper';
const DIFFICULTIES = {
  'past-paper': [
    ['過去問と同じくらい', '過去問と同じくらい'],
    ['過去問より少し易しく', '少し易しく'],
    ['過去問より少し難しく', '少し難しく']
  ],
  research: [
    ['高校の標準的な知識で考える', '高校の標準的な知識で考える'],
    ['高校の基本的な知識を確かめる', '基本的な知識を確かめる'],
    ['高校の標準的な知識を組み合わせて考える', '標準的な知識を組み合わせる']
  ]
};

/** No research is performed here: the instruction is for an AI with Web search. */
export function buildResearchPrompt(values = {}) {
  const v = { ...DEFAULTS, ...values };
  const difficulty = DIFFICULTIES.research.some(([value]) => value === clean(values.difficulty))
    ? clean(values.difficulty) : DIFFICULTIES.research[0][0];
  return [
    '指定した大学・学部の教育内容と、それに関係する最近の話題をWebで調べ、初見で考える練習問題を作ってください。テーマ探しから、設定や設問の作成まで任せます。実際の入試で何が出るかを予想する依頼ではありません。',
    `【学習条件】\n大学名：${clean(v.university) || '（大学名を指定）'}\n学部・学科：${clean(v.faculty) || '（学部・学科を指定）'}\n科目：${clean(v.subject) || '（科目を指定）'}\n出題範囲：${clean(v.range) || '（高校で学んだ範囲を指定）'}\n分量：${clean(v.volume) || '大問１題'}\n難しさ：${difficulty}${clean(v.wishes) ? `\nその他の希望：${clean(v.wishes)}` : ''}`,
    '【調べること】\n大学の公式サイトで、指定した学部・学科の教育内容やカリキュラムを確認してください。次に、その内容と上の科目に関係する最近の話題を調べてください。検索結果の見出しだけで判断せず、元のページを開き、記載内容を確かめてください。資料のタイトル、発行元、公表日または更新日、URLを記録してください。日付が示されていない資料は「日付不明」としてください。大学の教育内容と入試の出題範囲は別です。学部で扱う話題を、その大学が入試で出すと公表しているかのように書かないでください。',
    '【作り方】\n調べた内容から、高校で学んだ知識を使って考えられるテーマをあなたが選び、新しい設定と設問を作ってください。私にテーマやアイデアの候補を選ばせたり、作る前に候補を予告したりしないでください。未知の話題に、どの科目の知識をどう結び付けるかを考える練習にしてください。話題の珍しさだけで難しくせず、指定した範囲と難しさを守ってください。高校の範囲外の背景知識が必要なら、解くために必要な説明や資料を問題文に添えてください。解法や使う知識のヒントは、先に明かさないでください。',
    '【事実と設定の区別】\n実在する出来事、研究結果、制度、資料中の数値は、確認できた内容だけを使ってください。練習用の架空の地域・条件・数値を使う場合は、どの部分が架空かを問題文に明記してください。実在の資料を書き換えたものを、そのままの引用や実測値として示さないでください。Web検索が使えない場合や、必要な資料を開いて確認できない場合は、その旨を伝えてください。調べたふりをせず、確認できない内容に基づく作問は止めてください。',
    '【問題を出す前の確認】\n作った問題を最後まで解き、条件の不足や矛盾、計算、設問のつながりを確認してください。一意に答える問題では答えが一つに定まるか、記述問題では複数の妥当な答えを認められるかも確かめてください。理科では実験条件や単位を明記し、条件から結果を説明できるようにしてください。',
    '【最初に見せるもの】\n完成した問題文と、問題で用いた実在の資料の出典だけを見せてください。出典にはタイトル、発行元、公表日または更新日、URLを付けてください。調査の報告、解答、ヒント、作問のねらい、テーマや資料を選んだ理由はまだ見せないでください。私が「答え合わせ」と送ったら、解答と解説、高校で学んだどの知識がどう使えるか、テーマや資料を選んだ理由を、参照した資料の出典とともに示してください。私の答案も確認し、想定と違う解法や記述でも、内容と根拠が妥当なら認めてください。'
  ].join('\n\n');
}

/** Readiness is shared by preview, copy, download, and tests. */
export function validateCreationInputs(values = {}) {
  if (modeName(values.mode) === 'research') {
    const missingFields = [['university', '大学名'], ['faculty', '学部・学科'], ['subject', '科目'], ['range', '出題範囲']]
      .filter(([key]) => !clean(values[key]));
    return { ready: !missingFields.length, missingFields: missingFields.map(([key]) => key),
      message: missingFields.length ? `${missingFields.map(([, label]) => label).join('・')}を入力するとコピーできます。` : '依頼文をコピーできます。資料の添付は不要です。' };
  }
  const hasTarget = !!clean(values.targetName) || !!clean(values.targetText);
  const pagesValid = ['target', 'material'].every(kind => !clean(values[`${kind}Name`]) ||
    ((!clean(values[`${kind}Type`]).startsWith('image/') ? validNumber(values[`${kind}Page`], 10000) : true) && validNumber(values[`${kind}Question`], 1000)));
  return { ready: hasTarget && pagesValid, missingFields: !hasTarget ? ['target'] : [],
    message: !pagesValid ? 'ページ・問番号は、1以上の整数で指定してください。'
      : !hasTarget ? '過去問を選ぶか、問題文を貼り付けるとコピーできます。' : '依頼文をコピーできます。' };
}

function validNumber(value, maximum) {
  const number = Number(value ?? 1);
  return Number.isInteger(number) && number >= 1 && number <= maximum;
}

/** Build an instruction; choosing an idea is explicitly the AI's task. */
export function buildCreationPrompt(values = {}) {
  if (modeName(values.mode) === 'research') return buildResearchPrompt(values);
  const v = { ...DEFAULTS, ...values };
  const targetName = fileLabel(v.targetName);
  const materialName = fileLabel(v.materialName);
  const university = clean(v.university);
  const subject = clean(v.subject) || '参考にする過去問と同じ科目';
  const range = clean(v.range) || '参考にする過去問と同じ範囲';
  const targetText = clean(v.targetText);
  const materialText = clean(v.materialText);
  const targetDescription = targetName
    ? (targetText ? '添付した過去問と以下の補足' : '添付した過去問')
    : '以下の過去問';
  const reference = (name, type, text, page, question, placeholder) => {
    const parts = [];
    if (name) {
      parts.push(clean(type).startsWith('image/')
        ? `添付画像「${name}」の問 ${integerLabel(question)}。`
        : `添付ファイル「${name}」の、ファイル内で数えた ${integerLabel(page)} ページ目・問 ${integerLabel(question)}。`);
    } else if (!text) parts.push(placeholder);
    if (text) parts.push(`問題文・補足：\n${text}`);
    return parts.join('\n');
  };
  const blocks = [
    `${targetDescription}を参考に、初見で解くための新しい${subject}の問題を作ってください。作問のアイデアは、あなたに任せます。`,
    `【学習条件】\n${university ? `大学名：${university}\n` : ''}科目：${subject}\n出題範囲：${range}\n分量：${clean(v.volume) || '大問１題'}\n難しさ：${clean(v.difficulty) || '過去問と同じくらい'}${clean(v.wishes) ? `\nその他の希望：${clean(v.wishes)}` : ''}`,
    `【参考にする過去問】\n${reference(targetName, v.targetType, targetText, v.targetPage, v.targetQuestion, '（この依頼文と一緒に過去問を添付します。）')}`
  ];
  if (materialName || materialText) blocks.push(`【参考にしてよい発展問題】\n${reference(materialName, v.materialType, materialText, v.materialPage, v.materialQuestion, '')}\nこの問題の考え方も使えます。無理に取り入れる必要はありません。`);
  blocks.push('【作り方】\nまず、過去問から設問の形式、分量、難しさ、使う知識、小問のつながりを読み取ってください。大学名だけで出題傾向を決めつけず、実際の過去問を基準にしてください。\nそのうえで、新しい題材や設定、知識の組み合わせ、問う内容をあなたが考えてください。私に変更案を考えさせたり、アイデアの候補を選ばせたりする必要はありません。範囲と学習条件を守り、数値や語句だけを置き換えた問題にはしないでください。新しい設定を理解するために必要な情報は、問題文に示してください。');
  blocks.push('【問題を出す前の確認】\n作った問題を最後まで解き、条件の不足や矛盾、計算、設問のつながりを確認してください。一意に答える問題では答えが一つに定まるか、記述問題では複数の妥当な答えを認められるかも確かめてください。理科では実験条件や単位を明記し、条件から結果を説明できるようにしてください。社会では実在する出来事や資料の内容を捏造せず、架空の地域や数値を使う場合は問題文にその旨を明記してください。実在の資料を使う場合は出典を確認してください。資料が読めない場合や必要な条件が足りない場合だけ、その箇所を私に確認してください。');
  blocks.push('【最初に見せるもの】\n完成した問題文だけを見せてください。解答、ヒント、作問の狙い、何をどう変えたかは、予告も含めてまだ見せないでください。私が「答え合わせ」と送ったら、解答と解説、参考にしたところと変更した理由を示してください。私の答案も確認し、想定と違う解法や記述でも、内容と根拠が妥当なら認めてください。');
  return blocks.join('\n\n');
}

let mountNumber = 0;

export function mountInputKit(container, options = {}) {
  const doc = container.ownerDocument;
  const win = doc.defaultView || globalThis;
  const prefix = `kit-${++mountNumber}`;
  const files = { target: null, material: null };
  const cleanup = [];
  let destroyed = false;
  let mode = 'past-paper';
  const modeValues = {
    'past-paper': { ...DEFAULTS, subject: subjectName(options.subject) },
    research: { ...DEFAULTS, mode: 'research', subject: subjectName(options.subject), difficulty: DIFFICULTIES.research[0][0] }
  };

  container.innerHTML = `
    <div class="kit-root">
      <div class="kit-heading">
        <div>
          <h2 class="lab-title">自分の条件で問題を作る</h2>
          <p class="kit-lead">科目と学習範囲を指定したら、問題のアイデアはAIに任せます。</p>
        </div>
      </div>
      <div class="kit-mode-switch" role="group" aria-label="問題の作り方">
        <button type="button" class="kit-mode" data-mode="past-paper" aria-pressed="true">${kitIcon('target')}<span><strong>過去問から作る</strong><small>形式や難しさを手本にする</small></span></button>
        <button type="button" class="kit-mode" data-mode="research" aria-pressed="false">${kitIcon('research')}<span><strong>大学・学部を調べて作る</strong><small>過去問が公開されていないときにも</small></span></button>
      </div>
      <ol class="kit-overview" aria-label="問題を作る３つの手順">
        <li><span>1</span><b data-first-step>過去問を選ぶ</b></li>
        <li><span>2</span><b>範囲を指定する</b></li>
        <li><span>3</span><b>AIに貼り付ける</b></li>
      </ol>

      <div class="kit-layout">
        <div class="kit-settings">
          <section class="kit-section" aria-labelledby="${prefix}-source-heading">
            <div class="kit-section-heading"><span class="kit-step-number">1</span><h3 id="${prefix}-source-heading" data-source-heading>過去問を選ぶ</h3></div>
            <div data-past-paper-fields>
            <div class="kit-attachments">
              ${attachmentMarkup('target', '志望校の過去問', '形式や難しさは、AIが読み取ります。', prefix)}
              ${attachmentMarkup('material', '発展問題（任意）', '手元にあれば、参考として添えられます。', prefix)}
            </div>
            <p class="kit-local-note" data-local-note>PDF・画像を使う場合は、依頼文と一緒にAIへ添付します。このサイトからは送信されません。</p>
            <details class="kit-text-details">
              <summary>問題文を貼り付けて使う</summary>
              <div class="kit-text-grid">
                <label class="field" for="${prefix}-target-text">志望校の過去問<textarea id="${prefix}-target-text" name="targetText" rows="5" maxlength="30000" placeholder="過去問の問題文を貼り付けてください。"></textarea></label>
                <label class="field" for="${prefix}-material-text">発展問題（任意）<textarea id="${prefix}-material-text" name="materialText" rows="5" maxlength="30000" placeholder="参考にしたい発展問題があれば貼り付けてください。"></textarea></label>
              </div>
            </details>
            </div>
            <div class="kit-research-intro" data-research-intro hidden>
              <p>大学名と学部・学科を指定します。教育内容や最近の話題は、AIに調べてもらいます。</p>
              <div class="kit-research-flow" aria-label="AIが行うこと">
                <div>${kitIcon('research')}<strong>教育内容を調べる</strong><small>大学の公式サイトで確認</small></div>
                <div>${kitIcon('topic')}<strong>話題を探す</strong><small>科目に関わるテーマを選ぶ</small></div>
                <div>${kitIcon('prompt')}<strong>問題を作る</strong><small>学んだ知識で考えられる形に</small></div>
              </div>
              <p class="kit-research-purpose">実際の出題を予想するものではありません。知らない話題に、高校で学んだ知識を結び付ける練習です。</p>
            </div>
            <div class="kit-fields-grid kit-school-fields">
              <label class="field" for="${prefix}-university"><span data-university-label>大学名（任意）</span><input id="${prefix}-university" name="university" maxlength="100" placeholder="例：東北大学"></label>
              <label class="field" for="${prefix}-faculty" data-faculty-field hidden>学部・学科<input id="${prefix}-faculty" name="faculty" maxlength="150" placeholder="例：理学部 生物学科"></label>
            </div>
          </section>

          <section class="kit-section" aria-labelledby="${prefix}-conditions-heading">
            <div class="kit-section-heading"><span class="kit-step-number">2</span><h3 id="${prefix}-conditions-heading">学習条件を指定する</h3></div>
            <div class="kit-fields-grid">
              <label class="field" for="${prefix}-subject">科目<select id="${prefix}-subject" name="subject">${SUBJECTS.map(subject => `<option value="${subject}"${subject === subjectName(options.subject) ? ' selected' : ''}>${subject}</option>`).join('')}</select></label>
              <label class="field" for="${prefix}-volume">分量<input id="${prefix}-volume" name="volume" value="大問１題" maxlength="100" placeholder="例：大問１題"></label>
              <label class="field kit-span-two" for="${prefix}-range">出題範囲<input id="${prefix}-range" name="range" maxlength="200" placeholder="${rangeExample(subjectName(options.subject))}"><small data-range-note>空欄なら、過去問と同じ範囲で作ります。</small></label>
              <label class="field kit-span-two" for="${prefix}-difficulty">難しさ<select id="${prefix}-difficulty" name="difficulty">${DIFFICULTIES['past-paper'].map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}</select></label>
              <label class="field kit-span-two" for="${prefix}-wishes">その他の希望（任意）<input id="${prefix}-wishes" name="wishes" maxlength="1000" placeholder="例：20分で解ける分量にしたい"></label>
            </div>
            <p class="kit-ai-role">題材や設定、小問の組み立てはAIが考えます。変更案を用意する必要はありません。</p>
          </section>
        </div>

        <aside class="kit-output" aria-labelledby="${prefix}-output-heading">
          <div class="kit-section-heading"><span class="kit-step-number">3</span><h3 id="${prefix}-output-heading">AIに貼り付ける</h3></div>
          <p class="kit-handoff">依頼文をコピーして、使っているAIに貼り付けてください。</p>
          <div class="kit-ready-state" data-ready-state role="status" aria-live="polite"></div>
          <div class="kit-output-actions"><button class="button primary" type="button" data-action="copy">依頼文をコピー ${kitIcon('copy')}</button><button class="button" type="button" data-action="download">テキストで保存</button></div>
          <p class="kit-action-status" data-action-status role="status" aria-live="polite"></p>
          <details class="kit-prompt-details" data-prompt-details>
            <summary>依頼文を確認する</summary>
            <label class="field kit-prompt-label" for="${prefix}-prompt"><span class="kit-prompt-caption">資料名と条件を反映した文章</span><textarea id="${prefix}-prompt" class="kit-prompt" data-prompt rows="12" readonly spellcheck="false"></textarea></label>
          </details>
          <div class="kit-attach-reminder">${kitIcon('attach')}<p><strong data-attach-reminder-title>作問は、貼り付け先のAIが行います。</strong><span data-attach-reminder-body>このサイトでは、資料と条件をまとめた依頼文を作ります。</span></p></div>
          <div class="kit-after-send"><strong>解き終えたら「答え合わせ」と送る</strong><p>最初に出すのは問題だけ。解答や変更した理由は、答え合わせのときに出してもらいます。</p></div>
        </aside>
      </div>
    </div>`;

  const root = container.querySelector('.kit-root');
  const promptBox = root.querySelector('[data-prompt]');
  const actionStatus = root.querySelector('[data-action-status]');
  const readyState = root.querySelector('[data-ready-state]');
  const valueOf = (name) => root.querySelector(`[name="${name}"]`)?.value || '';
  const readValues = () => ({
    mode, university: valueOf('university'), faculty: valueOf('faculty'), subject: valueOf('subject'), range: valueOf('range'),
    targetPage: valueOf('targetPage'), targetQuestion: valueOf('targetQuestion'),
    materialPage: valueOf('materialPage'), materialQuestion: valueOf('materialQuestion'),
    volume: valueOf('volume'), difficulty: valueOf('difficulty'), wishes: valueOf('wishes'),
    targetText: valueOf('targetText'), materialText: valueOf('materialText'),
    targetName: files.target?.file.name || '', materialName: files.material?.file.name || '',
    targetType: files.target?.type || '', materialType: files.material?.type || ''
  });

  const update = () => {
    if (destroyed) return;
    const values = readValues();
    const research = mode === 'research';
    promptBox.value = buildCreationPrompt(values);
    const hasTarget = !!files.target || !!clean(values.targetText);
    const hasFiles = !research && (!!files.target || !!files.material);
    root.querySelector('[data-local-note]').textContent = hasFiles
      ? 'ここで選んだファイルは送信されません。依頼文と一緒に、使っているAIに添付してください。'
      : 'PDF・画像を使う場合は、依頼文と一緒にAIへ添付します。このサイトからは送信されません。';
    root.querySelector('[data-attach-reminder-title]').textContent = research
      ? '調査と作問は、貼り付け先のAIが行います。' : hasFiles
      ? '選んだPDF・画像も一緒に添付してください。'
      : hasTarget ? '問題文は依頼文に含まれています。' : '作問は、貼り付け先のAIが行います。';
    root.querySelector('[data-attach-reminder-body]').textContent = research
      ? 'このサイトでは依頼文を作ります。Web検索ができるAIを使い、資料の出典も確認してください。' : hasFiles
      ? '貼り付けた問題文があれば、依頼文に含まれます。実際の作問は、送信先のAIが行います。'
      : 'このサイトでは依頼文を作ります。実際の作問は、送信先のAIが行います。';
    const { ready, message } = validateCreationInputs(values);
    root.querySelectorAll('[data-action="copy"], [data-action="download"]').forEach(button => { button.disabled = !ready; });
    readyState.classList.toggle('kit-is-ready', ready);
    readyState.textContent = message;
    actionStatus.textContent = '';
  };

  const changeMode = (requested) => {
    if (destroyed) return;
    const next = modeName(requested);
    if (next === mode) return;
    modeValues[mode] = readValues();
    mode = next;
    const research = mode === 'research';
    root.dataset.mode = mode;
    root.querySelectorAll('[data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
    root.querySelector('[data-past-paper-fields]').hidden = research;
    root.querySelector('[data-research-intro]').hidden = !research;
    root.querySelector('[data-faculty-field]').hidden = !research;
    root.querySelector('[data-university-label]').textContent = research ? '大学名' : '大学名（任意）';
    root.querySelector('[data-source-heading]').textContent = research ? '大学・学部を指定する' : '過去問を選ぶ';
    root.querySelector('[data-first-step]').textContent = research ? '大学・学部を指定' : '過去問を選ぶ';
    root.querySelector('[data-range-note]').textContent = research ? '授業で学んだ範囲を入力してください。' : '空欄なら、過去問と同じ範囲で作ります。';
    root.querySelector('.kit-handoff').textContent = research ? 'Web検索ができるAIに貼り付けます。' : '依頼文をコピーして、使っているAIに貼り付けてください。';
    root.querySelector('.kit-prompt-caption').textContent = research ? '大学・学部と学習条件を反映した文章' : '資料名と条件を反映した文章';
    root.querySelector('.kit-after-send p').textContent = research
      ? '最初に出すのは問題と出典だけ。解答やテーマを選んだ理由は、答え合わせのときに出してもらいます。'
      : '最初に出すのは問題だけ。解答や変更した理由は、答え合わせのときに出してもらいます。';
    root.querySelector('[name="difficulty"]').innerHTML = DIFFICULTIES[mode].map(([value, label]) => `<option value="${value}">${label}</option>`).join('');
    for (const name of ['university', 'faculty', 'subject', 'range', 'volume', 'difficulty', 'wishes']) {
      root.querySelector(`[name="${name}"]`).value = modeValues[mode][name];
    }
    for (const name of ['university', 'faculty', 'range']) root.querySelector(`[name="${name}"]`).required = research;
    root.querySelector('[name="range"]').placeholder = rangeExample(valueOf('subject'));
    update();
  };

  const listen = (node, event, handler) => {
    node.addEventListener(event, handler);
    cleanup.push(() => node.removeEventListener(event, handler));
  };
  root.querySelectorAll('[data-mode]').forEach(button => listen(button, 'click', () => changeMode(button.dataset.mode)));

  const removeFile = (kind) => {
    const state = files[kind];
    if (state?.url) win.URL.revokeObjectURL(state.url);
    files[kind] = null;
    const card = root.querySelector(`[data-attachment="${kind}"]`);
    card.querySelector('[data-file-input]').value = '';
    card.querySelector('[data-file-name]').textContent = 'PDF・PNG・JPEG・WebP';
    card.querySelector('[data-file-size]').textContent = 'ここへドラッグ、またはファイルを選択';
    card.querySelector('[data-file-preview]').replaceChildren();
    card.querySelector('[data-file-preview]').hidden = true;
    card.querySelector('[data-preview-button]').textContent = '内容を確認';
    card.querySelector('[data-preview-button]').setAttribute('aria-expanded', 'false');
    card.querySelectorAll('[data-preview-button], [data-remove-button]').forEach(button => { button.hidden = true; });
    card.querySelector(`[name="${kind}Page"]`).disabled = false;
    card.querySelector('[data-page-note]').textContent = '表紙から数えたページを指定します。';
    card.classList.remove('kit-has-file');
  };

  const chooseFile = (kind, selected) => {
    const card = root.querySelector(`[data-attachment="${kind}"]`);
    const error = card.querySelector('[data-file-error]');
    if (!selected?.length) return;
    if (selected.length !== 1) {
      error.textContent = '１つの欄につき、ファイルを１つ選んでください。';
      error.hidden = false;
      card.querySelector('[data-file-input]').value = '';
      return;
    }
    const file = selected[0];
    const extension = file.name.split('.').pop().toLowerCase();
    const allowed = { pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' };
    if (!Object.hasOwn(allowed, extension) || (file.type && file.type !== allowed[extension])) {
      error.textContent = 'PDF・PNG・JPEG・WebPのいずれかを選んでください。';
      error.hidden = false;
      card.querySelector('[data-file-input]').value = '';
      return;
    }
    removeFile(kind);
    const url = win.URL.createObjectURL(file);
    files[kind] = { file, url, type: allowed[extension] };
    if (allowed[extension].startsWith('image/')) {
      const pageInput = card.querySelector(`[name="${kind}Page"]`);
      pageInput.value = '1';
      pageInput.disabled = true;
      card.querySelector('[data-page-note]').textContent = '画像は全体を参照します。問番号を指定してください。';
    }
    card.querySelector('[data-file-name]').textContent = file.name;
    card.querySelector('[data-file-size]').textContent = file.size < 1024 * 1024 ? `${Math.max(1, Math.round(file.size / 1024))} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    card.querySelectorAll('[data-preview-button], [data-remove-button]').forEach(button => { button.hidden = false; });
    card.classList.add('kit-has-file');
    error.textContent = '';
    error.hidden = true;
    update();
  };

  const togglePreview = (kind) => {
    const state = files[kind];
    if (!state) return;
    const card = root.querySelector(`[data-attachment="${kind}"]`);
    const preview = card.querySelector('[data-file-preview]');
    const button = card.querySelector('[data-preview-button]');
    if (!preview.hidden) {
      preview.hidden = true;
      button.textContent = '内容を確認';
      button.setAttribute('aria-expanded', 'false');
      return;
    }
    if (!preview.childElementCount) {
      if (state.type === 'application/pdf') {
        const object = doc.createElement('object');
        object.type = 'application/pdf';
        object.data = state.url;
        object.setAttribute('aria-label', `選んだPDF：${state.file.name}`);
        preview.append(object);
      } else {
        const image = doc.createElement('img');
        image.src = state.url;
        image.alt = `選んだ画像：${state.file.name}`;
        preview.append(image);
      }
      const link = doc.createElement('a');
      link.href = state.url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = '別のタブで開く';
      link.className = 'kit-preview-link';
      preview.append(link);
    }
    preview.hidden = false;
    button.textContent = '確認を閉じる';
    button.setAttribute('aria-expanded', 'true');
  };

  for (const kind of ['target', 'material']) {
    const card = root.querySelector(`[data-attachment="${kind}"]`);
    const zone = card.querySelector('[data-dropzone]');
    const input = card.querySelector('[data-file-input]');
    listen(input, 'change', () => chooseFile(kind, input.files));
    listen(zone, 'dragover', (event) => { event.preventDefault(); zone.classList.add('kit-drag-over'); });
    listen(zone, 'dragleave', (event) => { if (!zone.contains(event.relatedTarget)) zone.classList.remove('kit-drag-over'); });
    listen(zone, 'drop', (event) => {
      event.preventDefault();
      zone.classList.remove('kit-drag-over');
      chooseFile(kind, event.dataTransfer?.files);
    });
    listen(card.querySelector('[data-preview-button]'), 'click', () => togglePreview(kind));
    listen(card.querySelector('[data-remove-button]'), 'click', () => {
      removeFile(kind);
      card.querySelector('[data-file-error]').hidden = true;
      update();
    });
  }

  const resetRange = () => {
    const rangeInput = root.querySelector('[name="range"]');
    rangeInput.value = '';
    rangeInput.placeholder = rangeExample(valueOf('subject'));
  };
  listen(root, 'input', (event) => { if (event.target.name && event.target.type !== 'file') update(); });
  listen(root, 'change', (event) => {
    if (event.target.name === 'subject') resetRange();
    if (event.target.name && event.target.type !== 'file') update();
  });
  listen(root.querySelector('[data-action="copy"]'), 'click', async () => {
    try {
      if (!win.navigator?.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await win.navigator.clipboard.writeText(promptBox.value);
      if (!destroyed) actionStatus.textContent = mode === 'research'
        ? 'コピーしました。Web検索ができるAIに貼り付けて送ってください。' : files.target || files.material
        ? 'コピーしました。AIに貼り付け、選んだ資料を添付してください。'
        : 'コピーしました。AIに貼り付けて送ってください。';
    } catch {
      if (destroyed) return;
      root.querySelector('[data-prompt-details]').open = true;
      promptBox.focus();
      promptBox.select();
      promptBox.setSelectionRange(0, promptBox.value.length);
      actionStatus.textContent = '文章を選択しました。Ctrl+C（Macでは⌘C）でコピーしてください。';
    }
  });
  listen(root.querySelector('[data-action="download"]'), 'click', () => {
    const blob = new win.Blob([promptBox.value], { type: 'text/plain;charset=utf-8' });
    const url = win.URL.createObjectURL(blob);
    const link = doc.createElement('a');
    link.href = url;
    link.download = mode === 'research' ? '大学と学部を調べて問題を作る_依頼文.txt' : '初見問題を作る_依頼文.txt';
    doc.body.append(link);
    link.click();
    link.remove();
    win.setTimeout(() => win.URL.revokeObjectURL(url), 1000);
    actionStatus.textContent = mode === 'research'
      ? '依頼文を保存しました。Web検索ができるAIに貼り付けて送ってください。' : files.target || files.material
      ? '依頼文を保存しました。AIに貼り付け、選んだ資料を添付してください。'
      : '依頼文を保存しました。AIに貼り付けて送ってください。';
  });

  update();
  if (modeName(options.mode) === 'research') changeMode('research');
  return {
    pause() {},
    setMode: changeMode,
    setSubject(subject) {
      if (destroyed) return;
      const next = subjectName(subject);
      const input = root.querySelector('[name="subject"]');
      if (input.value === next) return;
      input.value = next;
      resetRange();
      update();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cleanup.forEach(fn => fn());
      for (const kind of ['target', 'material']) if (files[kind]?.url) win.URL.revokeObjectURL(files[kind].url);
      container.replaceChildren();
    }
  };
}

function attachmentMarkup(kind, title, description, prefix) {
  const material = kind === 'material';
  return `<div class="kit-attachment" data-attachment="${kind}">
    <div class="kit-attachment-role">${kitIcon(material ? 'material' : 'target')}<h4>${title}</h4></div>
    <p class="kit-attachment-description">${description}</p>
    <div class="kit-dropzone" data-dropzone>
      <strong class="kit-file-name" data-file-name>PDF・PNG・JPEG・WebP</strong>
      <span class="kit-file-size" data-file-size>ここへドラッグ、またはファイルを選択</span>
      <label class="button kit-pick-file" for="${prefix}-${kind}-file">ファイルを選ぶ<input class="kit-file-input" id="${prefix}-${kind}-file" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp" data-file-input></label>
    </div>
    <div class="kit-file-actions"><button class="button quiet" type="button" data-preview-button aria-expanded="false" hidden>内容を確認</button><button class="button quiet" type="button" data-remove-button hidden>取り消す</button></div>
    <p class="kit-file-error" data-file-error role="alert" hidden></p>
    <div class="kit-file-preview" data-file-preview hidden></div>
    <div class="kit-page-fields"><label class="field" for="${prefix}-${kind}-page">ファイル内のページ<input id="${prefix}-${kind}-page" name="${kind}Page" type="number" inputmode="numeric" min="1" max="10000" step="1" value="1" required></label><label class="field" for="${prefix}-${kind}-question">問番号<input id="${prefix}-${kind}-question" name="${kind}Question" type="number" inputmode="numeric" min="1" max="1000" step="1" value="1" required></label></div>
    <p class="kit-page-note" data-page-note>表紙から数えたページを指定します。</p>
    ${material ? '<p class="kit-material-note" data-material-note>発展問題はなくても使えます。</p>' : ''}
  </div>`;
}


function kitIcon(kind) {
  const shapes = {
    target: '<path d="M9 4h14l8 8v24H9z"></path><path d="M23 4v8h8M14 18h12M14 24h12M14 30h8"></path>',
    material: '<path d="M9 4h14l8 8v24H9z"></path><path d="M23 4v8h8M15 28l5-10 6 10z"></path><circle cx="20" cy="18" r="1.5"></circle>',
    conditions: '<path d="M7 11h26M7 20h26M7 29h26"></path><circle cx="16" cy="11" r="4"></circle><circle cx="26" cy="20" r="4"></circle><circle cx="13" cy="29" r="4"></circle>',
    prompt: '<path d="M7 7h26v25H7zM12 13h16M12 19h16M12 25h10"></path>',
    copy: '<rect x="13" y="11" width="20" height="23" rx="3"></rect><path d="M8 28H7V6h20v1"></path>',
    attach: '<path d="M14 21l11-11a6 6 0 018 8L18 33a9 9 0 01-13-13L21 4"></path><path d="M10 24l13-13"></path>',
    send: '<path d="M5 7l31 13-31 13 6-13zM11 20h25"></path>',
    research: '<path d="M5 15l15-9 15 9M8 16v16M16 16v16M24 16v8M5 33h16"></path><circle cx="28" cy="28" r="6"></circle><path d="M32.5 32.5L37 37"></path>',
    topic: '<path d="M6 7h28v27H6zM12 13h16M12 19h8M12 25h16"></path><path d="M27 17v6M24 20h6"></path>'
  };
  return `<svg class="kit-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[kind]}</svg>`;
}
