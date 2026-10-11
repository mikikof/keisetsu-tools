// Original problem checked in the official PDF.
// Preserve source attribution; do not imply that the new problem is an actual Waseda question.
export const scienceExample = {
  id: 'science-particle-filter',
  subject: 'science',
  subjectLabel: '理科',
  range: '物理：電場・磁場、運動とエネルギー',
  title: '電圧を変えて、粒子を選び分ける',
  sourceLabel: '早稲田大学 2025年 物理 第Ⅱ問',
  university: '早稲田大学',
  year: '2025',
  sourceExam: '一般選抜 基幹・創造・先進理工学部',
  examLabel: '理工３学部 物理 第Ⅱ問',
  formatLabel: '計算・記述 ３問',
  questionCount: 3,
  sourceQuestion: '物理 第Ⅱ問（記述解答問題）',
  sourcePage: 'PDF 9–10ページ（冊子8–9ページ）',
  sourceUrl: 'https://www.waseda.jp/inst/admission/assets/uploads/2025/06/262728_2025_ippan_butsuri-kagaku.pdf#page=9',
  sourceIndexUrl: 'https://www.waseda.jp/inst/admission/other/2024/12/17/17446/',
  sourceHtml: `<p>電圧で加速した粒子を、電場と磁場で選び分ける問題です。前半では、２つの力が打ち消し合う速さを求め、続く磁場中の軌道から粒子の性質を調べます。</p><p>ここでは第Ⅱ問の前半を参考にしています。</p>`,
  sourcePoints: ['電圧をかけ、粒子を加速する', '電場と磁場で速さをそろえる', '曲がる軌道から粒子の性質を調べる'],
  sourceDiagramHtml: `<svg class="subject-figure source-apparatus" viewBox="0 0 660 250" role="img" aria-labelledby="source-particle-title source-particle-desc" xmlns="http://www.w3.org/2000/svg">
    <title id="source-particle-title">元の問題に登場する装置の流れ</title><desc id="source-particle-desc">電圧で粒子を加速し、電場と磁場の力が打ち消し合う粒子を直進させる。その先の磁場で粒子は半円の軌道を描き、検出器に達する。原図の転載ではなく、装置の役割をまとめた模式図。</desc>
    <defs><marker id="source-particle-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#22645b"/></marker></defs>
    <g font-family="sans-serif" fill="#152b37">
      <rect x="1" y="1" width="658" height="248" rx="16" fill="#faf9f5" stroke="#dbe3da"/>
      <text x="34" y="36" font-size="19" font-weight="700">加速</text><text x="230" y="36" font-size="19" font-weight="700">速度の選別</text><text x="451" y="36" font-size="19" font-weight="700">軌道を調べる</text>
      <rect x="31" y="59" width="150" height="139" rx="10" fill="#ede5d4"/><path d="M66 79V175M146 79V175" stroke="#a58b5b" stroke-width="6"/>
      <circle cx="44" cy="129" r="8" fill="#22645b"/><path d="M57 129H210" stroke="#22645b" stroke-width="2.5" marker-end="url(#source-particle-arrow)"/>
      <text x="76" y="97" font-size="17">電圧 V</text>
      <rect x="227" y="59" width="159" height="139" rx="10" fill="#e6efea"/><path d="M244 81H369M244 177H369" stroke="#788f83" stroke-width="6"/>
      <circle cx="284" cy="129" r="8" fill="#22645b"/><g fill="none" stroke="#22645b" stroke-width="2.5" marker-end="url(#source-particle-arrow)"><path d="M284 115V94"/><path d="M284 142V165"/><path d="M298 129H423"/></g>
      <text x="308" y="108" font-size="17">電気力</text><text x="308" y="160" font-size="17">磁気力</text>
      <path d="M432 63H633V218H432Z" fill="#e6efea"/>
      <path d="M433 129H496C553 129 553 205 496 205H451" fill="none" stroke="#22645b" stroke-width="3" marker-end="url(#source-particle-arrow)"/>
      <rect x="434" y="191" width="13" height="28" rx="3" fill="#22645b"/>
      <text x="552" y="92" font-size="17">磁場 B</text><text x="451" y="239" font-size="17">検出器</text>
      <text x="34" y="232" font-size="16" fill="#52615e">原問の装置の役割をまとめた模式図</text>
    </g>
  </svg>`,
  changes: [
    { label: '使う原理', before: '電場と磁場で、直進する粒子の速さをそろえる', after: 'この考え方を引き継ぐ' },
    { label: '装置', before: 'その先の磁場で、粒子を曲げる', after: 'その先の電場で、粒子を減速させる' },
    { label: '考えること', before: '曲がる軌道から、粒子の性質を調べる', after: '通過するか、折り返すかをエネルギーから判断する' }
  ],
  inputSummary: '早稲田大学の物理の過去問を渡す。電場・磁場、運動とエネルギーの範囲で、小問３つの練習問題にする。',
  prompt: `添付した早稲田大学2025年度の物理第Ⅱ問を参考に、初見の練習問題を１題作ってください。
学習範囲は高校物理の電場・磁場、運動とエネルギーです。第Ⅱ問の前半を参考に、小問３つで、計算した結果を次の問いに使う構成にしてください。
新しい装置の設定や問い方は、私に案を求めず、あなたが考えてください。数値や記号を替えただけの問題にはしないでください。
問題を出す前に最後まで解き、力の向き、運動が切り替わる条件、単位、境界の場合に矛盾がないか確認してください。
最初は問題だけを出してください。解答と解説、元の問題から変えた点は、私が「答え合わせ」と書くまで見せないでください。`,
  problemHtml: `<p>正の電荷 <span class="math">q</span> をもつ２種類の粒子Ｐ、Ｑを選び分けたい。質量は、Ｐが <span class="math">m</span>、Ｑが <span class="math">2m</span> である。図の装置は真空中に置かれており、重力と粒子同士の相互作用は無視する。</p>
  <div class="figure-scroll"><svg class="subject-figure particle-apparatus" viewBox="0 0 720 286" role="img" aria-labelledby="particle-filter-title particle-filter-desc" xmlns="http://www.w3.org/2000/svg">
    <title id="particle-filter-title">速度選別器と減速領域</title>
    <desc id="particle-filter-desc">粒子が右向きに進む。左の速度選別器は電場による上向きの力と磁場による下向きの力が打ち消し合う粒子だけを通す。右の減速領域は幅d。入口x=0の電位は0、出口x=dの電位はUで、内部の電場は左向きに一定。</desc>
    <defs><marker id="particle-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#152b37"/></marker></defs>
    <rect x="1" y="1" width="718" height="284" rx="16" fill="#faf9f5" stroke="#d8dfd9"/>
    <g font-family="sans-serif" fill="#152b37">
      <text x="38" y="35" font-size="18" font-weight="700">速度をそろえる</text>
      <rect x="37" y="57" width="247" height="143" rx="10" fill="#e6efea"/>
      <path d="M57 79H266M57 178H266" stroke="#718780" stroke-width="6"/>
      <circle cx="113" cy="130" r="10" fill="#22645b"/>
      <g fill="none" stroke="#152b37" stroke-width="2" marker-end="url(#particle-arrow)"><path d="M113 116V91"/><path d="M113 144V169"/><path d="M131 130H239"/></g>
      <text x="145" y="105" font-size="16">電気力 qE</text>
      <text x="145" y="164" font-size="16">磁気力 qvB</text>
      <path d="M294 130H336" fill="none" stroke="#152b37" stroke-width="2.5" marker-end="url(#particle-arrow)"/>
      <text x="359" y="35" font-size="18" font-weight="700">電圧で減速させる</text>
      <rect x="360" y="57" width="241" height="143" rx="10" fill="#f3e9d9"/>
      <path d="M380 70V188M581 70V188" stroke="#9b7444" stroke-width="5" stroke-dasharray="12 8"/>
      <path d="M546 126H427" fill="none" stroke="#152b37" stroke-width="2" marker-end="url(#particle-arrow)"/>
      <text x="451" y="108" font-size="16">電場</text>
      <path d="M607 130H679" fill="none" stroke="#152b37" stroke-width="2.5" marker-end="url(#particle-arrow)"/>
      <text x="621" y="113" font-size="16">出口</text>
      <text x="362" y="238" font-size="16">x = 0</text>
      <text x="559" y="238" font-size="16">x = d</text>
      <text x="359" y="262" font-size="16">電位 0</text>
      <text x="557" y="262" font-size="16">電位 U</text>
      <path d="M380 213H581M380 207V219M581 207V219" stroke="#788b89" stroke-width="1.5"/>
      <text x="480" y="237" text-anchor="middle" font-size="17">d</text>
      <text x="38" y="237" font-size="16">Ｐ：質量 m、電荷 q</text>
      <text x="38" y="262" font-size="16">Ｑ：質量 2m、電荷 q</text>
    </g>
  </svg></div>
  <p>左の速度選別器には、互いに垂直な電場と磁場がかかっている。その大きさをそれぞれ <span class="math">E</span>、<span class="math">B</span> とする。粒子は両方に垂直に入射し、電場から受ける力と磁場から受ける力が反対向きになる。<strong>力が打ち消し合って直進する粒子だけ</strong>が、その先の減速領域に入る。</p>
  <p>減速領域の入口を <span class="math">x＝0</span>、出口を <span class="math">x＝d</span> とする。電位は入口で０、出口で <span class="math">U（&gt;0）</span> であり、その間で一様に増加する。この領域に磁場はない。各領域の電場・磁場はほかの領域に影響せず、境界付近の電場の乱れも無視する。速度選別器から入口までに、粒子の速さは変わらないものとする。</p>
  <ol class="questions">
    <li>速度選別器を通過する粒子の速さ <span class="math">v</span> を求めよ。</li>
    <li>粒子Ｐは減速領域の内部で折り返し、粒子Ｑは正の速さで出口を通過するようにしたい。電圧 <span class="math">U</span> の範囲を <span class="math">m、q、E、B</span> を用いて表せ。</li>
    <li><span class="math">U＝3mE²／(4qB²)</span> とした。Ｐが折り返す位置とＱの出口での速さを求めよ。また、入口から入ったＰが入口に戻るまでの時間は、Ｑが入口から出口まで進む時間の何倍か。</li>
  </ol>`,
  answerHtml: `<h4>（１）速度選別器を通る速さ</h4><p>電場による力の大きさは <span class="math">qE</span>、磁場による力の大きさは <span class="math">qvB</span> である。これらが反対向きで等しいので、</p><p class="equation">qE＝qvB　より　v＝E／B</p><p>質量にかかわらず、ＰもＱも同じ速さで減速領域に入る。</p>
  <h4>（２）一方だけを通す電圧</h4><p>入口での運動エネルギーは、Ｐが <span class="math">mv²／2</span>、Ｑが <span class="math">mv²</span>。入口から出口まで進むために必要なエネルギーは、どちらも <span class="math">qU</span> である。</p><p>Ｐが出口より手前で折り返す条件は <span class="math">qU＞mv²／2</span>、Ｑが正の速さで出口を通る条件は <span class="math">qU＜mv²</span>。したがって、</p><p class="equation">mE²／(2qB²) ＜ U ＜ mE²／(qB²)</p><p>等号の場合は、どちらかの粒子が出口に達した瞬間に速さ０となるため、求める範囲に含めない。</p>
  <h4>（３）折り返す位置と通過時間</h4><p>このとき <span class="math">qU＝3mv²／4</span>。電位は距離に比例するので、Ｐが入口から距離 <span class="math">x</span> だけ進む間に失う運動エネルギーは <span class="math">qUx／d</span> である。折り返す位置では、</p><p class="equation">qUx／d＝mv²／2　より　x＝2d／3</p><p>Ｑの出口での運動エネルギーは <span class="math">mv²−qU＝mv²／4</span>。質量が <span class="math">2m</span> であることから、出口での速さは <strong><span class="math">v／2＝E／(2B)</span></strong> となる。</p><p>Ｐが受ける加速度の大きさは <span class="math">qU／(md)＝3v²／(4d)</span>。速さ０になるまでの時間は <span class="math">4d／(3v)</span> であり、そこから入口へ戻るまでにも同じ時間がかかる。よって <span class="math">t<sub>P</sub>＝8d／(3v)</span>。</p><p>Ｑも等加速度運動なので、入口から出口までの平均の速さは <span class="math">(v＋v／2)／2＝3v／4</span>。よって <span class="math">t<sub>Q</sub>＝4d／(3v)</span> となり、求める時間は <strong>２倍</strong> である。</p>`,
  intentHtml: `<p>元の問題では、速度をそろえた粒子を磁場で曲げ、軌道から性質を調べます。この作問例では、<strong>磁場で曲げる部分を、電圧で減速させる部分に替えました</strong>。</p><p>速さが同じでも、質量が異なれば運動エネルギーは違います。その違いを使い、通過するか、途中で戻るかを判断する問題にしています。最後は、電場中の運動を等加速度運動として考えます。</p><p>この装置の変更や問い方を、解く人が先に考える必要はありません。過去問と学習範囲を渡し、こうした案を出すところからAIに任せます。</p>`,
  provenance: '参考：早稲田大学2025年度 一般選抜 基幹・創造・先進理工学部 物理第Ⅱ問前半。上の問題は、その考え方をもとに作成したオリジナルの練習問題で、実際の入試問題ではありません。',
  verification: '公式PDFの冊子8–9ページを確認。新問の力の向き、エネルギー収支、通過と反射の境界、折り返す位置と時間比を独立計算で確認。'
};
