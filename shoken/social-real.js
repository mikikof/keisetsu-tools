// Reference: Hitotsubashi University, 2025 front-period Geography, III question 2.
// The university question is summarized, not reproduced. The new country and data are fictional.
// This is a prepared example; it does not call a live AI service.

export const socialExample = {
  id: 'social-remote-work',
  subject: 'social',
  subjectLabel: '社会',
  university: '一橋大学',
  year: '2025',
  examLabel: '前期 地理 第III問 問2',
  formatLabel: '125字以内の記述',
  questionCount: 1,
  range: '地理：人口移動と経済',
  title: '社会の問題例',
  sourceLabel: '一橋大学 2025年度 前期 地理 第III問 問2',
  sourceUrl: 'https://juken.hit-u.ac.jp/admission/info/files/R7_06_chireki_zenki_mondai.pdf#page=13',
  sourceIntentUrl: 'https://juken.hit-u.ac.jp/admission/info/files/R7_06-1_chireki_ito.pdf#page=4',
  sourcePage: 'PDF 13ページ目／冊子12ページ',
  sourcePoints: ['題材は人材の国際移動', '出身国への利益と不利益を考える', '125字以内で説明する'],
  sourceHtml: `<p>海外へ移る人材が、出身国の経済発展にどのような利益と不利益をもたらすかを、125字以内で説明する問題です。</p><p class="source-caption">一橋大学の公開問題を要約。問題冊子の12ページに掲載されています。</p>`,
  sourceDiagramHtml: `<svg class="subject-figure source-migration" viewBox="0 0 600 180" role="img" aria-labelledby="source-migration-title source-migration-desc" xmlns="http://www.w3.org/2000/svg">
    <title id="source-migration-title">原問の題材：人材の国際移動</title>
    <desc id="source-migration-desc">出身国から海外へ人が移る。原問は出身国の経済に与える影響を問う。</desc>
    <rect x="20" y="32" width="180" height="126" rx="18" fill="#e6efea"/>
    <rect x="400" y="32" width="180" height="126" rx="18" fill="#e6efea"/>
    <g stroke="#152b37" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M77 100V67H102V100M107 100V52H134V100M141 100V76H153V100M68 104H163"/>
      <path d="M447 103V62H473V103M481 103V45H516V103M524 103V76H544V103M438 108H552"/>
      <path d="M222 106H372M360 95L372 106L360 117"/>
      <circle cx="298" cy="52" r="9"/>
      <path d="M288 84V72Q298 62 308 72V84M298 66V84"/>
    </g>
    <g fill="#152b37" font-family="sans-serif" text-anchor="middle" font-size="19" font-weight="700">
      <text x="110" y="139">出身国</text><text x="490" y="139">海外</text>
      <text x="297" y="143" font-size="17">人が移る</text>
    </g>
  </svg>`,
  inputSummary: '一橋大学の過去問を渡し、人口移動と経済の範囲で、125字以内の記述問題を１問作らせる。',
  prompt: `添付した一橋大学2025年度前期「地理」第III問の問2を参考に、初見の記述問題を１問作ってください。
学習範囲は「人口移動と経済」、解答は125字以内としてください。
新しい場面や問い方は、あなたが考えてください。私が変更案を出したり、先に候補を選んだりしなくてよいようにしてください。国名や数値を替えるだけでなく、知識を別の場面で使って考える問題にしてください。
資料を付ける場合は、問題を解くための条件を過不足なく示し、架空の資料であればそのことを明記してください。
問題を出す前に自分で解き、条件の不足、資料と解答の食い違い、字数超過がないか確かめてください。筋道の通る別解も認めてください。
最初は問題文だけを出してください。解答例、解説、原問から変えた点は、私が「答え合わせ」と書くまで見せないでください。`,
  problemHtml: `<p>Ｐ国では、技術者が国内に住んだまま外国企業の仕事をオンラインで請け負う例が増えている。こうした技術者は報酬を外貨で受け取り、その一部をＰ国内での生活費や通信費に使っている。</p>
    <p>下の図は、同じ分野の技術者１万人について、働き方の内訳を二つの年で比べたものである。三つの区分に重複はない。<strong>国名と数値は、この問題のために設定した架空のものである。</strong></p>
    <div class="table-scroll">
      <svg class="subject-figure social-allocation" style="min-width:640px" viewBox="0 0 720 300" role="img" aria-labelledby="social-allocation-title social-allocation-desc" xmlns="http://www.w3.org/2000/svg">
        <title id="social-allocation-title">Ｐ国出身の技術者１万人の働き方</title>
        <desc id="social-allocation-desc">2020年はＰ国で国内企業の業務に従事6000人、国外に住んで外国企業の業務に従事3000人、Ｐ国に住んで外国企業のオンライン業務に従事1000人。2025年は順に3000人、2000人、5000人。棒全体はいずれも１万人。</desc>
        <rect x="1" y="1" width="718" height="298" rx="16" fill="#faf9f5" stroke="#d4dedf"/>
        <g font-family="sans-serif" fill="#152b37">
          <text x="24" y="35" font-size="20" font-weight="700">技術者１万人の働き方</text>
          <text x="24" y="66" font-size="16">2020年と2025年の比較・すべて架空の数値</text>
          <text x="24" y="112" font-size="18" font-weight="700">2020</text>
          <rect x="98" y="87" width="354" height="40" rx="0" fill="#152b37"/>
          <rect x="452" y="87" width="177" height="40" fill="#22645b"/>
          <rect x="629" y="87" width="59" height="40" fill="#a54b29"/>
          <g fill="#fff" text-anchor="middle" font-size="17" font-weight="700">
            <text x="275" y="112">6,000</text><text x="540.5" y="112">3,000</text><text x="658.5" y="112" font-size="16">1,000</text>
          </g>
          <text x="24" y="174" font-size="18" font-weight="700">2025</text>
          <rect x="98" y="149" width="177" height="40" fill="#152b37"/>
          <rect x="275" y="149" width="118" height="40" fill="#22645b"/>
          <rect x="393" y="149" width="295" height="40" fill="#a54b29"/>
          <g fill="#fff" text-anchor="middle" font-size="17" font-weight="700">
            <text x="186.5" y="174">3,000</text><text x="334" y="174">2,000</text><text x="540.5" y="174">5,000</text>
          </g>
          <text x="686" y="214" font-size="16" text-anchor="end">単位：人</text>
          <rect x="24" y="232" width="14" height="14" rx="2" fill="#152b37"/><text x="48" y="245" font-size="16">Ｐ国内に住み、国内企業の業務に従事</text>
          <rect x="24" y="255" width="14" height="14" rx="2" fill="#22645b"/><text x="48" y="268" font-size="16">国外に住み、外国企業の業務に従事</text>
          <rect x="370" y="232" width="14" height="14" rx="2" fill="#a54b29"/><text x="394" y="245" font-size="16">Ｐ国内に住み、外国企業の</text>
          <text x="394" y="268" font-size="16">オンライン業務に従事</text>
        </g>
      </svg>
    </div>
    <div class="single-question"><p><strong>問</strong>　この変化がＰ国の経済にもたらす利益と課題を述べよ。その際、「国外で働く技術者が減ったので、国内企業の人材確保も容易になった」とは判断できない理由を含め、<strong>125字以内</strong>で説明せよ。</p></div>`,
  answerHtml: `<h4>解答例（118字）</h4><p>海外向け業務による外貨収入が国内消費を支える。一方、国外に住む技術者が減っても、国内で外国企業の仕事をする人は増え、国内企業で働く技術者は半減した。居住地だけで人材確保が容易になったとはいえず、国内産業を担う人材の確保が課題となりうる。</p>
    <h4>図から分かること</h4><p>国外で働く人数は3,000人から2,000人に減った。しかし、国内に住む人も含めて外国企業向けの業務に従事する人数を合計すると、4,000人から7,000人に増えている。国内企業の業務に従事する人数は6,000人から3,000人に減った。</p>
    <p>住んでいる場所と、仕事をしている相手は別である。国内に住む技術者が増えても、その人たちが国内企業の仕事を担うとは限らない。一方、外国企業から得た報酬が国内の消費を支えるという利益もある。</p>
    <h4>ほかの書き方</h4><p>外貨収入や国内消費への利益と、国内企業の人材確保に関する課題を、資料に沿って結びつけていればよい。図だけでは国内企業が必要とする人数までは分からないため、人材不足が必ず起きるとまでは断定しない。</p>`,
  intentHtml: `<p>原問と同じく、ある変化が国の経済に与える利益と不利益を、125字以内で説明します。</p><p>新しく考えたのは、<strong>人が国境を越えず、仕事だけが国境を越える</strong>場面です。国外で働く人数が減っても、国内企業の仕事をする人が増えるとは限らない資料にしました。居住地だけでなく就業先にも注目する必要があります。</p><p>この場面や資料を解く人が先に考える必要はありません。過去問と学習範囲を渡し、設定からAIに任せる使い方の一例です。</p>`,
  changes: [
    { label: '形式', before: '出身国への利益と不利益を125字以内で論述', after: '同じく利益と課題を125字以内で論述' },
    { label: '場面', before: '人が海外へ移住して働く', after: '国内に住んだまま外国企業の仕事をする' },
    { label: '考える視点', before: '人材の送り出しが出身国の発展に与える影響', after: '居住地と就業先を分けて、国内経済への影響を考える' }
  ],
  provenance: '参考にした原問：一橋大学2025年度前期「地理」第III問問2。掲載した問題・資料・解答は、原問の記述形式を参考にこのサイト用に作成した独自の例です。Ｐ国と人数は架空です。',
  verification: '大学公式PDFの問題冊子12ページと出題意図を確認。各年の人数合計、棒の縮尺、外国企業向け業務の人数、解答例118字を照合。唯一解とはせず、資料だけでは人材不足を断定できない点を解説に明記。'
};
