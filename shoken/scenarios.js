// Curated examples for a guided problem-making demo. No live AI request is made.
export const sourceCards = [
  {
    id: 'tohoku-general-integers',
    location: 'PDF 4ページ · 第２問',
    title: '東北大学の過去問',
    label: '2026年度 一般選抜・前期 数学〔文系等〕第２問',
    kind: '形式の手本',
    summary: '整数方程式を満たす組を調べ、解の存在や整数の性質を証明する問題。',
    points: ['題材は a²＋2b²＝c² を満たす正の整数', '小問は３つ', 'はじめは具体例、後半は理由や性質の証明'],
    url: 'https://admissions.tohoku.ac.jp/ja/materials/ito/'
  },
  {
    id: 'tohoku-ao-remainders',
    location: 'PDF 3ページ · 第１問',
    title: '見慣れない設定の発展問題',
    label: '東北大学 2026年度 AO入試Ⅱ期・理学部（数学系）第１問',
    kind: '設定の材料',
    summary: '前の２項を割った余りから次の項を作り、０になるまでの数列を調べる問題。',
    points: ['割り算の余りを次の項にする', '０になったら、その後も０', '最後は０になるまでの項数を評価する'],
    url: 'https://admissions.tohoku.ac.jp/ja/materials/kakomon/'
  }
];

export const formats = [
  {
    id: 'tohoku-bun-2026-q2',
    title: '東北大学・文系数学 第２問を手本に',
    scope: '数学Ⅰ・Ⅱ・A・B・C',
    structure: ['具体例を求める', '理由を証明する', '性質を証明・利用する'],
    detail: '小問３つの記述式。具体的な場合から入り、後半で性質を説明する形をそろえます。難しさの完全な一致を保証するものではありません。'
  }
];

const sourceId = 'tohoku-general-integers';
const formatId = 'tohoku-bun-2026-q2';
const generalAnalysis = [
  { label: '題材', text: '正の整数が満たす条件を調べる。' },
  { label: '小問', text: '３つ。具体例から始め、後半では理由を説明する。' },
  { label: 'そろえる点', text: '問題の分量、記述式の問い方、文系の出題範囲。' },
  { label: '替える点', text: '元の式や数値だけを替えず、解くときに使う考え方も替える。' }
];
const adaptationAnalysis = [
  { label: '形式の手本', text: '最初のPDFの第２問。小問３つ、具体例から証明へ進む形を使う。' },
  { label: '材料にする設定', text: '前の２項から次の項を決め、０になるまで調べる。' },
  { label: '替える操作', text: '割り算の余りを取る操作を、別の操作に替える。' },
  { label: '替える問い', text: '元の問題の「何項で終わるか」から、別の性質を調べる問いに替える。' }
];

const commonRequest = `設定や題材、組み合わせる知識、問い方のアイデアは、あなたが考えてください。候補を私に選ばせず、そのまま作問してください。係数や文字だけを替えた問題にはせず、問題文も写さないでください。
範囲は数学Ⅰ・Ⅱ・A・B・Cです。出す前に最後まで解き、条件の矛盾、計算、範囲内で解けるかを確かめてください。資料が読めなければ推測せず確認してください。
最初は問題文だけを出してください。解答、ヒント、作問の意図、元の問題から変えた点は、私が「答え合わせ」と送るまで見せないでください。答え合わせでは解説と変更点を示し、私の解法が別解として正しければ認めてください。`;
const combinePrompt = () => `添付したPDFは、東北大学2026年度一般選抜・前期数学〔文系等〕の過去問です。PDFの４ページ目・第２問を参考に、まだ解いたことのない問題を１題作ってください。
小問の数、形式、分量、難しさは、参考の問題を読んで合わせてください。
${commonRequest}`;
const adaptPrompt = () => `２つのPDFを添付しました。形式の参考は、東北大学2026年度一般選抜・前期数学〔文系等〕のPDF４ページ目・第２問です。参考にしてほしい発展問題は、東北大学2026年度AO入試Ⅱ期・理学部（数学系）のPDF３ページ目・第１問です。
発展問題を材料に、最初の過去問と同じ形式・分量・難しさを目安とした新しい問題を１題作ってください。何を取り入れ、どう変えるかも任せます。
${commonRequest}`;

export const scenarios = [
  {
    id: 'integers-sequence', path: 'combine', sourceId, formatId, unitId: 'sequence',
    title: '整数の問題に、数列を組み合わせる',
    subtitle: '数列を組み合わせる',
    unit: '数列（数学B）',
    analysis: generalAnalysis,
    prompt: combinePrompt('数列（数学B）の漸化式と数学的帰納法'),
    problemHtml: `<p>正の整数 <span class="math">a，b</span> に関する方程式</p>
      <p class="equation">a<sup>2</sup>＋b<sup>2</sup>＋1＝3ab　……①</p>
      <p>を考える。以下の問いに答えよ。</p>
      <ol class="questions">
        <li>①を満たす正の整数の組 <span class="math">(a，b)</span> で <span class="math">a＜b</span> を満たすものを２つ求めよ。なお、解答は答えのみでよい。</li>
        <li>数列 <span class="math">{a<sub>n</sub>}</span> を
          <p class="equation">a<sub>1</sub>＝1，a<sub>2</sub>＝2，a<sub>n＋2</sub>＝3a<sub>n＋1</sub>－a<sub>n</sub><br>（n＝1，2，3，…）</p>
          で定める。すべての正の整数 <span class="math">n</span> について、<span class="math">a<sub>n</sub></span> は正の整数であり、<span class="math">a<sub>n</sub>＜a<sub>n＋1</sub></span> かつ <span class="math">(a<sub>n</sub>，a<sub>n＋1</sub>)</span> は①を満たすことを示せ。また、①を満たす正の整数の組は無限に存在することを示せ。</li>
        <li>（２）の数列について、<span class="math">a<sub>n</sub></span> が偶数となる正の整数 <span class="math">n</span> をすべて求めよ。さらに、<span class="math">a<sub>n</sub></span> が偶数ならば、<span class="math">a<sub>n</sub></span> を４で割った余りは２であることを示せ。</li>
      </ol>`,
    answerHtml: `<h4>（１）</h4><p>例えば <span class="math">(1，2)，(2，5)</span>。</p>
      <h4>（２）</h4><p><span class="math">a＝a<sub>n</sub>，b＝a<sub>n＋1</sub>，c＝3b－a</span> とおく。<span class="math">0＜a＜b</span> なら <span class="math">c－b＝2b－a＞0</span> なので、次の項も正の整数で、さらに大きい。</p>
      <p class="equation">b<sup>2</sup>＋c<sup>2</sup>＋1－3bc<br>＝b<sup>2</sup>＋(3b－a)<sup>2</sup>＋1－3b(3b－a)<br>＝a<sup>2</sup>＋b<sup>2</sup>＋1－3ab＝0</p>
      <p>初めの組 <span class="math">(1，2)</span> は正の整数で <span class="math">1＜2</span>、また <span class="math">1<sup>2</sup>＋2<sup>2</sup>＋1＝3×1×2</span> だから①を満たす。上の計算から次の組も①を満たすので、数学的帰納法で主張が成り立つ。数列は単調に増加するため、できる組はすべて異なり、解は無限にある。</p>
      <h4>（３）</h4><p>漸化式から <span class="math">a<sub>n＋3</sub>＝8a<sub>n＋1</sub>－3a<sub>n</sub></span>。よって</p>
      <p class="equation">a<sub>n＋3</sub>－a<sub>n</sub>＝4(2a<sub>n＋1</sub>－a<sub>n</sub>)</p>
      <p>となり、４で割った余りは３項ごとに繰り返す。最初の３項は <span class="math">1，2，5</span> だから、余りは <span class="math">1，2，1</span>。したがって偶数になるのは、<span class="math">n</span> を３で割った余りが２のときに限り、その項を４で割った余りは２となる。求める添字は <span class="math">n＝3m＋2（m＝0，1，2，…）</span> である。</p>`,
    intentHtml: `<p>組み合わせた単元は<strong>数列の漸化式と数学的帰納法</strong>。（２）で整数解を次々に作り、（３）でも漸化式を使って偶数の位置を調べる。</p><p>元の問題では、解の組を拡大して無限に作れた。ここでは、漸化式によって別の組へ移るため、以前の解き方をそのままたどるだけでは済まない。</p>`,
    differences: [
      { label: '形式', before: '具体例・存在の証明・整数の性質', after: '小問３つと、具体例から証明へ進む順番を保った' },
      { label: '解を作る方法', before: '解の組を拡大する', after: '漸化式で次の解の組を作る' },
      { label: '後半の考え方', before: '整数の偶奇や倍数を調べる', after: '数列の繰り返しから整数の性質を調べる' }
    ],
    articleIntent: [
      { label: '（１）整数の具体例', text: '小さな整数を代入し、条件を満たす組を見つける。' },
      { label: '（２）漸化式と帰納法', text: '次の２項でも同じ方程式が成り立つことを示し、解を無限に作る。' },
      { label: '（３）余りの繰り返し', text: '漸化式から、４で割った余りが３項ごとに繰り返すことを読み取る。' }
    ],
    articleChange: '整数を調べる３小問の形式を保ち、数列の漸化式を組み合わせた。整数解を探すだけでなく、次の解を作る仕組みを問う。',
    provenance: '12月号の記事掲載例。掲載の依頼文とは別の指示文で作成した既存のAI作問例です。解答・解説は内容を検証し、整理したものです。',
    verification: '漸化式の保存量、増加性、４で割った余りの導出を確認。'
  },
  {
    id: 'integers-probability', path: 'combine', sourceId, formatId, unitId: 'probability',
    title: '整数の問題に、確率を組み合わせる',
    subtitle: '確率を組み合わせる',
    unit: '確率（数学A）',
    analysis: generalAnalysis,
    prompt: combinePrompt('確率（数学A）'),
    problemHtml: `<p>整数を７で割った余りについて、以下の問いに答えよ。</p>
      <ol class="questions">
        <li>整数の平方を７で割った余りとして、あり得るものをすべて求めよ。なお、解答は答えのみでよい。</li>
        <li>正の整数 <span class="math">a，b</span> について、<span class="math">a<sup>2</sup>＋b<sup>2</sup></span> が７の倍数であることと、<span class="math">a，b</span> がともに７の倍数であることは同値であることを示せ。</li>
        <li>正の整数 <span class="math">m</span> に対し、１から <span class="math">7m</span> までの整数が１つずつ書かれた <span class="math">7m</span> 枚のカードがある。１枚を等確率で引いて数 <span class="math">a</span> を読み取り、カードを戻してから、もう１枚を等確率で引いて数 <span class="math">b</span> を読み取る。<span class="math">a<sup>2</sup>＋b<sup>2</sup></span> が７の倍数となる確率を求めよ。また、<span class="math">a<sup>2</sup>＋b<sup>2</sup></span> を７で割った余りが１となる確率は、<span class="math">m</span> の値によらず <span class="math">8/49</span> であることを示せ。</li>
      </ol>`,
    answerHtml: `<h4>（１）</h4><p><span class="math">0，1，2，4</span>。</p>
      <h4>（２）</h4><p>７で割った余りが <span class="math">0，1，2，3，4，5，6</span> の整数を平方すると、余りは順に <span class="math">0，1，4，2，2，4，1</span> になる。集合 <span class="math">{0，1，2，4}</span> から２つの余りを選び、その和が７の倍数になるのは <span class="math">0＋0</span> だけである。平方の余りが０になるのも、元の整数の余りが０のときだけ。したがって主張が成り立つ。</p>
      <h4>（３）</h4><p>各回の数を７で割った余りは７種類が等確率で現れる。２回の順序つきの余りの組は、49通りが等確率となる。</p>
      <p>（２）より７の倍数になるのは両方の余りが０の場合だけなので、求める確率は <strong>1/49</strong>。</p>
      <p>平方の余りが <span class="math">0，1，2，4</span> になる元の余りの個数は、それぞれ <span class="math">1，2，2，2</span> 個。平方の余りの和が７で割って１余るのは、<span class="math">(0，1)，(1，0)，(4，4)</span> の３種類である。対応する元の余りの組は</p>
      <p class="equation">1×2＋2×1＋2×2＝8 通り</p>
      <p>だから確率は <strong>8/49</strong>。どの余りの整数も各 <span class="math">m</span> 枚あるため、<span class="math">m</span> の値によらない。</p>`,
    intentHtml: `<p>組み合わせた単元は<strong>確率</strong>。（２）で証明した整数の性質を、（３）の事象の絞り込みに使う。数字の大きさではなく、７で割った余りの組を数えることが要点になる。</p><p>「数列」を選んだ例とは題材も解き方も異なる。小問３つという形式を保ちながら、別の単元を使う問題に替えた。</p>`,
    differences: [
      { label: '形式', before: '具体例から整数の性質の証明へ', after: '余りの確認・証明・その性質を使う確率の３小問' },
      { label: '新しい単元', before: '整数方程式の解を調べる', after: '整数の条件が成り立つ確率を調べる' },
      { label: '後半の考え方', before: '整数の性質を証明する', after: '平方の余りから、起こり得る事象を絞って数える' }
    ],
    provenance: 'デモ用に追加した作問例',
    verification: '平方の余りの49通りと、確率の計算を確認。'
  },
  {
    id: 'remainders-difference', path: 'adapt', sourceId: 'tohoku-ao-remainders', formatId, unitId: 'difference',
    title: '「余り」を「差」に替えて、作り直す',
    subtitle: '２項の差に替える',
    unit: '２項の差の絶対値',
    analysis: adaptationAnalysis,
    prompt: adaptPrompt('前の２項の差の絶対値を取る'),
    problemHtml: `<p>正の整数 <span class="math">a<sub>1</sub>，a<sub>2</sub></span> から出発して、数列 <span class="math">{a<sub>n</sub>}</span> を次の規則で定める。<span class="math">n＝2，3，4，…</span> に対して</p>
      <p class="equation">a<sub>n＋1</sub>＝|a<sub>n</sub>－a<sub>n－1</sub>|　（a<sub>n</sub>＞0 のとき）<br>a<sub>n＋1</sub>＝0　（a<sub>n</sub>＝0 のとき）</p>
      <p>以下の問いに答えよ。</p>
      <ol class="questions">
        <li><span class="math">a<sub>1</sub>＝15，a<sub>2</sub>＝6</span> のとき、はじめて <span class="math">a<sub>n</sub>＝0</span> となるまでの <span class="math">a<sub>3</sub>，a<sub>4</sub>，…</span> を順に求めよ。なお、解答は答えのみでよい。</li>
        <li><span class="math">a<sub>1</sub>，a<sub>2</sub></span> がどのような正の整数であっても、<span class="math">a<sub>n</sub>＝0</span> となる正の整数 <span class="math">n</span> が存在することを示せ。</li>
        <li>（２）の <span class="math">n</span> のうち最小のものを <span class="math">k</span> とし、<span class="math">a<sub>1</sub></span> と <span class="math">a<sub>2</sub></span> の最大公約数を <span class="math">g</span> とする。<span class="math">a<sub>k－1</sub>＝a<sub>k－2</sub>＝g</span> であることを示せ。さらに、<span class="math">k≧4</span> ならば <span class="math">a<sub>k－3</sub>＝2g</span> であることを示せ。</li>
      </ol>`,
    answerHtml: `<h4>（１）</h4><p><span class="math">9，3，6，3，3，0</span>。</p>
      <h4>（２）</h4><p>連続する正の２項を <span class="math">a，b</span> とする。<span class="math">a＝b</span> なら次は０になる。</p>
      <p><span class="math">a＞b</span> なら、次の組 <span class="math">(b，a－b)</span> の最大値は <span class="math">a</span> より小さい。<span class="math">a＜b</span> なら、１回進めた組は <span class="math">(b，b－a)</span>、さらに進めると <span class="math">(b－a，a)</span> になり、最大値が <span class="math">b</span> より小さくなる。</p>
      <p>０にならない限り、連続する２項の最大値は高々２回の操作ごとに減少する。正の整数がこのように減り続けることはできないので、有限回で０になる。</p>
      <h4>（３）</h4><p>正の２項 <span class="math">a，b</span> では、<span class="math">a，b</span> の公約数と <span class="math">b，|b－a|</span> の公約数は一致する。共通の約数は差も割り切り、逆に <span class="math">b</span> と差を割り切る数は <span class="math">a</span> も割り切るためである。最初の０が出るまで、連続２項の最大公約数は <span class="math">g</span> のままである。</p>
      <p>最初の０が出る直前は <span class="math">|a<sub>k－1</sub>－a<sub>k－2</sub>|＝0</span> なので、両項は等しい。その最大公約数が <span class="math">g</span> だから、両方とも <span class="math">g</span> である。</p>
      <p><span class="math">k≧4</span> なら、その１つ前の正の項を <span class="math">x</span> として <span class="math">|g－x|＝g</span>。<span class="math">x＝0</span> または <span class="math">2g</span> だが、最初の０より前の項は正なので、<span class="math">x＝2g</span> となる。</p>`,
    intentHtml: `<p>借りたのは<strong>前の２項から次の項を作り、０になったら止める</strong>という設定。操作は割り算の余りから差の絶対値に替えた。</p><p>最後の問いは、０になるまでの項数の評価から、終わる直前の項と最大公約数の関係へ替えた。（１）で設定をつかみ、（２）（３）で整数の性質を説明する。</p>`,
    differences: [
      { label: '借りた設定', before: '前の２項から次の項を作る。０の後は０', after: '同じ骨組みを保った' },
      { label: '操作', before: '割り算の余りを取る', after: '２項の差の絶対値を取る' },
      { label: '最後の問い', before: '０になるまでの項数を評価する', after: '終わる直前の項と最大公約数の関係を証明する' }
    ],
    articleIntent: [
      { label: '（１）規則を確かめる', text: '15と６から始め、０が出るまで差の絶対値を順に求める。' },
      { label: '（２）減る量を見つける', text: '隣り合う２項の大きい方が、多くても２回で小さくなることを使う。' },
      { label: '（３）変わらない量', text: '差を取っても最大公約数は変わらない。その性質から最後の項を決める。' }
    ],
    articleChange: '「前の２項から次の項を作る」設定を借り、余りを取る操作を差の絶対値に替えた。最後は項数の評価から、最大公約数との関係を問う問題に替えた。',
    provenance: '12月号の記事掲載例。掲載の依頼文とは別の指示文で作成した既存のAI作問例です。解答・解説は内容を検証し、整理したものです。',
    verification: '終了の証明、最大公約数の保存、最後の３項の条件を確認。'
  },
  {
    id: 'remainders-next-multiple', path: 'adapt', sourceId: 'tohoku-ao-remainders', formatId, unitId: 'next-multiple',
    title: '「余り」を「次の倍数までの不足」に替える',
    subtitle: '次の倍数までの不足に替える',
    unit: '次の倍数までの不足',
    analysis: adaptationAnalysis,
    prompt: adaptPrompt('前の項にあといくつ足せば、現在の項の倍数になるかを求める'),
    problemHtml: `<p>正の整数 <span class="math">b<sub>1</sub>，b<sub>2</sub></span> が <span class="math">b<sub>1</sub>＞b<sub>2</sub></span> を満たすとする。<span class="math">n＝2，3，4，…</span> について、<span class="math">b<sub>n＋1</sub></span> を次の規則で順に定める。</p>
      <ul><li><span class="math">b<sub>n</sub>＞0</span> のとき：<span class="math">b<sub>n</sub></span> の倍数のうち <span class="math">b<sub>n－1</sub></span> 以上であるものの最小値を <span class="math">M<sub>n</sub></span> とし、<span class="math">b<sub>n＋1</sub>＝M<sub>n</sub>－b<sub>n－1</sub></span> とする。</li>
      <li><span class="math">b<sub>n</sub>＝0</span> のとき：<span class="math">b<sub>n＋1</sub>＝0</span> とする。</li></ul>
      <p>以下の問いに答えよ。</p>
      <ol class="questions">
        <li><span class="math">b<sub>1</sub>＝23，b<sub>2</sub>＝9</span> のとき、<span class="math">b<sub>3</sub>，b<sub>4</sub>，b<sub>5</sub>，b<sub>6</sub>，b<sub>7</sub></span> を求めよ。なお、解答は答えのみでよい。</li>
        <li><span class="math">n≧2</span> かつ <span class="math">b<sub>n</sub>＞0</span> のとき、<span class="math">0≦b<sub>n＋1</sub>＜b<sub>n</sub></span> であることを示せ。また、<span class="math">b<sub>1</sub>，b<sub>2</sub></span> が条件を満たすどのような値であっても、<span class="math">b<sub>k</sub>＝0</span> となる正の整数 <span class="math">k</span> が存在することを示せ。</li>
        <li>はじめて <span class="math">b<sub>k</sub>＝0</span> となる項の番号を <span class="math">k</span> とする。<span class="math">b<sub>k－1</sub></span> は <span class="math">b<sub>1</sub></span> と <span class="math">b<sub>2</sub></span> の最大公約数に等しいことを示せ。さらに、<span class="math">b<sub>1</sub>＝30</span> とし、<span class="math">b<sub>2</sub></span> を <span class="math">1，2，…，29</span> と変えるとき、<span class="math">b<sub>k－1</sub>＝1</span> となる <span class="math">b<sub>2</sub></span> は全部で何個あるか。</li>
      </ol>`,
    answerHtml: `<h4>（１）</h4><p><span class="math">b<sub>3</sub>＝4，b<sub>4</sub>＝3，b<sub>5</sub>＝2，b<sub>6</sub>＝1，b<sub>7</sub>＝0</span>。</p>
      <h4>（２）</h4><p><span class="math">M<sub>n</sub>≧b<sub>n－1</sub></span> より、次の項は０以上。また、<span class="math">M<sub>n</sub>－b<sub>n</sub></span> も <span class="math">b<sub>n</sub></span> の倍数だが、<span class="math">M<sub>n</sub></span> が条件を満たす最小の倍数なので、<span class="math">M<sub>n</sub>－b<sub>n</sub>＜b<sub>n－1</sub></span>。したがって <span class="math">b<sub>n＋1</sub>＜b<sub>n</sub></span> となる。</p>
      <p>０になるまで <span class="math">b<sub>2</sub>，b<sub>3</sub>，…</span> は１以上ずつ減る非負整数列である。よって遅くとも <span class="math">b<sub>2</sub>＋2</span> 番目までに０となる。</p>
      <h4>（３）</h4><p>０になる前は、次の項が「現在の項の整数倍－前の項」でできる。前の２項の公約数は次の２項も割り切り、逆も成り立つので、最大公約数は変わらない。最初の０とその直前の項の最大公約数は <span class="math">b<sub>k－1</sub></span> であるため、これは初めの２項の最大公約数に等しい。</p>
      <p><span class="math">b<sub>1</sub>＝30</span> の場合は、<span class="math">b<sub>2</sub></span> が30と互いに素であればよい。１から29のうち、２・３・５のいずれでも割り切れない数は</p>
      <p class="equation">29－(14＋9＋5)＋(4＋2＋1)＝8</p>
      <p>個。実際には <span class="math">1，7，11，13，17，19，23，29</span> の<strong>８個</strong>である。</p>`,
    intentHtml: `<p>借りた設定は<strong>前の２項から次の項を作り、０まで進める</strong>こと。余りではなく、次の倍数までの不足を調べる操作に替えた。</p><p>この操作では、<span class="math">(N＋1，N)</span> から始めると <span class="math">N＋1，N，N－1，…，1，0</span> と進む。元の問題のような項数の評価をそのまま使うのでなく、最後の項の意味と、その性質を使った個数の問題へ替えている。</p>`,
    differences: [
      { label: '借りた設定', before: '整数２つから、０になるまで数列を作る', after: '設定の骨組みを保ち、具体例から入る３小問にした' },
      { label: '操作', before: '割り算の余りを取る', after: '次の倍数にするための不足を求める' },
      { label: '最後の問い', before: '０になるまでの項数を評価する', after: '最後の項が１となる初期値を数える' }
    ],
    provenance: '元資料の作問例を整理（別の操作）',
    verification: '項の単調減少、最大公約数の保存、互いに素な初期値８個を確認。'
  }
];

export const scenarioMap = Object.fromEntries(scenarios.map(scenario => [scenario.id, scenario]));
export const resultdata = Object.fromEntries(scenarios.map(scenario => [`${scenario.path}:${scenario.unitId}`, scenario]));
export const getScenario = (path, unitId) => resultdata[`${path}:${unitId}`];
