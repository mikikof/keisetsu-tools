export const MODEL = "Gemini 3.8 Flash";
export const EXAMPLES = [
  {
    "id": "math",
    "label": "数学",
    "subjectName": "数学",
    "kind": "mistake",
    "source": "記事の例1・例2",
    "title": "3つのミスから、短い問題を4題作ってもらう",
    "inputs": {
      "mode": "mistake",
      "count": 4,
      "rows": [
        {
          "subject": "数学Ⅰ",
          "unit": "2次関数",
          "miss": "定義域のある最大・最小で、軸が定義域に入るかを確かめずに、頂点の値を答えた"
        },
        {
          "subject": "数学Ⅱ",
          "unit": "対数",
          "miss": "方程式を解いたあと、真数条件を確かめずに、解を2つとも答えた"
        },
        {
          "subject": "数学A",
          "unit": "確率",
          "miss": "「少なくとも1回」を余事象で求めるとき、1から引くのを忘れた"
        }
      ]
    },
    "check": [
      {
        "head": "【第1問】（数学Ⅰ：2次関数）",
        "print": true,
        "lines": [
          {
            "text": "正解：最小値 $-3$（$x = 2$ のとき）",
            "print": true
          },
          {
            "text": "「軸が定義域の外にある」パターンです。うっかり頂点の $y$ 座標を見て「最小値 $-4$」と答えてしまうミスを誘発する問題でした。",
            "print": true
          }
        ]
      },
      {
        "head": "【第2問】（数学Ⅱ：対数）",
        "lines": [
          {
            "text": "正解：$x = 8$",
            "print": false
          },
          {
            "text": "2次方程式がきれいに解けて $x = 8, -4$ と2つの解が出ます。最初に真数条件を確認していないと、そのまま「$x = 8, -4$」と答えてしまう仕掛けでした。",
            "print": false
          }
        ]
      },
      {
        "head": "【第3問】（数学A：確率）",
        "lines": [
          {
            "text": "正解：$\\dfrac{91}{216}$",
            "print": false
          },
          {
            "text": "$(5/6)^3$ を計算した時点で「計算しきった安心感」が生まれ、最後に $1$ から引き忘れて「$\\dfrac{125}{216}$」と書いてしまうミスを誘発する仕掛けでした。",
            "print": false
          }
        ]
      },
      {
        "head": "【第4問】（数学Ⅰ：2次関数）★仕掛けのない問題",
        "print": true,
        "lines": [
          {
            "text": "正解：最大値 $5$（$x = 2$ のとき）",
            "print": true
          },
          {
            "text": "第1問と同じ2次関数ですが、こちらは素直に軸が定義域に入っているため、頂点の値がそのまま最大値になります。",
            "print": true
          }
        ]
      }
    ],
    "confirm": {
      "when": "第1問でひっかかったなら",
      "line": "最大・最小は、軸が定義域に入るかを先に見る"
    },
    "prompt": "最近の模試と過去問で、私がしたミスを3つ書きます。\n\n・数学Ⅰ　2次関数：定義域のある最大・最小で、軸が定義域に入るかを確かめずに、頂点の値を答えた\n・数学Ⅱ　対数：方程式を解いたあと、真数条件を確かめずに、解を2つとも答えた\n・数学A　確率：「少なくとも1回」を余事象で求めるとき、1から引くのを忘れた\n\nこれらのミスが起きやすい問題を4題作ってください。共通テストの形式はまねせず、参考書の例題くらいの短い問題にしてください。そのうち1題は、上のどれかと同じ単元で、仕掛けのない問題にしてください。\n\n出す前に自分で解き、答えが1つに定まるかを確かめてください。最初は問題だけを出してください。答えと、どの問題に何を仕掛けたかは、私が「答え合わせ」と送るまで見せないでください。",
    "reply": {
      "lead": "ご提示いただいた3つのミスをもとに、参考書の例題レベルの短い問題を4題作成しました。\nすべて実際に解き、答えが1つに定まることを確認しています。このうち1題は「仕掛けのない問題」です。\n\n準備ができたら解いてみてください。解き終わって「答え合わせ」と送っていただければ、解答・解説と、各問題の意図をお伝えします。",
      "body": "### 第1問（数学Ⅰ）\n関数 $f(x) = x^2 - 6x + 5$ （$0 \\leqq x \\leqq 2$）の最小値を求めよ。\n\n---\n\n### 第2問（数学Ⅱ）\n方程式 $\\log_3(x+1) + \\log_3(x-5) = 3$ を解け。\n\n---\n\n### 第3問（数学A）\n1個のさいころを3回続けて投げるとき、少なくとも1回は1の目が出る確率を求めよ。\n\n---\n\n### 第4問（数学Ⅰ）\n関数 $y = -x^2 + 4x + 1$ （$1 \\leqq x \\leqq 4$）の最大値を求めよ。",
      "tail": ""
    }
  },
  {
    "id": "english",
    "label": "英語",
    "subjectName": "英語",
    "kind": "reason",
    "source": "記事の例3・例4",
    "title": "選んだ理由を2つ伝えて、英文と設問を作ってもらう",
    "inputs": {
      "mode": "reason",
      "subject": "英語リーディング",
      "material": "英文",
      "spec": "英文は80語程度、設問は1問、選択肢は4つにしてください。",
      "reasons": [
        "本文と同じ単語が入っている選択肢を、意味が合っているか確かめずに選んだ",
        "本文の一部にだけ当てはまる内容を、全体に当てはまると思って選んだ"
      ]
    },
    "check": [
      {
        "head": "正解：4",
        "print": true,
        "lines": []
      },
      {
        "head": "1. All exhibits in the museum change on a monthly basis.",
        "short": "1",
        "print": true,
        "lines": [
          {
            "text": "【仕掛け：一部の内容を全体に当てはめた罠】",
            "print": true
          },
          {
            "text": "本文では、毎月変わるのは一部のエリア（the modern art section changes every month）だけです。それにもかかわらず、主語を「All exhibits（すべての展示）」と全体に広げてしまっています。",
            "print": false
          }
        ]
      },
      {
        "head": "2. Visitors can join guided tours led by professional historians on weekends.",
        "short": "2",
        "print": true,
        "lines": [
          {
            "text": "【仕掛け：本文と同じ単語に飛びつく罠】",
            "print": true
          },
          {
            "text": "本文にある「guided tours」「led by professional historians」「weekends」という単語がそのまま使われているため、パッと見で選んでしまいがちです。しかし、本文には「these tours are not available on weekends（週末には利用できない）」とあり、意味が正反対です。",
            "print": false
          }
        ]
      },
      {
        "head": "3. Older visitors prefer the modern art section because it displays traditional paintings.",
        "short": "3",
        "lines": [
          {
            "text": "【仕掛け：本文と同じ単語に飛びつく罠】",
            "print": false
          },
          {
            "text": "本文の「Older visitors」「prefer」「modern art section」「traditional paintings」という単語をパズルのように組み合わせていますが、本文では「現代アート（modern art）」と「伝統的な絵画（traditional paintings）」は別物であり、意味がメチャクチャになっています。",
            "print": false
          }
        ]
      },
      {
        "head": "4. Some of the artwork in the museum is kept on display throughout the year.【正解】",
        "short": "4",
        "lines": [
          {
            "text": "本文の最終文「older visitors often prefer the traditional paintings, which remain the same all year round（高齢の来館者は伝統的な絵画を好むことが多く、それらは年中変わらない）」の言い換えです。",
            "print": false
          },
          {
            "text": "本文の表現が「artwork」「kept on display」「throughout the year」と言い換えられているため、単語の一致だけを探していると見落としやすい正解の選択肢です。",
            "print": false
          }
        ]
      }
    ],
    "confirm": {
      "when": "1を選んだなら",
      "line": "only や all のある選択肢は、本文の誰・どこの話かを確かめる"
    },
    "prompt": "共通テストの英語リーディングで間違えた設問について、その選択肢を選んだ理由を2つ書きます。\n\n・本文と同じ単語が入っている選択肢を、意味が合っているか確かめずに選んだ\n・本文の一部にだけ当てはまる内容を、全体に当てはまると思って選んだ\n\nこの選び方をするとひっかかる選択肢を入れて、英文と設問を作ってください。共通テストの形式はまねせず、英文は80語程度、設問は1問、選択肢は4つにしてください。\n\n出す前に自分で解き、正解が1つに定まるかを確かめてください。最初は英文と設問だけを出してください。正解と、どの選択肢に何を仕掛けたかは、私が「答え合わせ」と送るまで見せないでください。",
    "reply": {
      "lead": "ご提示いただいた2つの間違え方を誘発する選択肢を含めた英文と設問を作成しました。\n\n解き終わりましたら、「答え合わせ」と送信してください。正解と、各選択肢の解説をお伝えします。",
      "body": "### Reading Passage\n\nThe city museum offers several special programs throughout the week. On weekdays, visitors can enjoy free guided tours, which are led by professional historians. However, these tours are not available on weekends because the museum is crowded. Also, although many people assume all exhibits are permanent, the modern art section changes every month to display works by local artists. While this rotating exhibition attracts young people, older visitors often prefer the traditional paintings, which remain the same all year round.\n\n### Question\n\nAccording to the text, which of the following is true?\n\n1. All exhibits in the museum change on a monthly basis.  \n2. Visitors can join guided tours led by professional historians on weekends.  \n3. Older visitors prefer the modern art section because it displays traditional paintings.  \n4. Some of the artwork in the museum is kept on display throughout the year.",
      "tail": ""
    }
  },
  {
    "id": "chemistry",
    "label": "化学",
    "subjectName": "化学基礎",
    "kind": "mistake",
    "source": "化学基礎の計算",
    "title": "化学基礎の3つのミスから、短い問題を4題作ってもらう",
    "inputs": {
      "mode": "mistake",
      "count": 4,
      "rows": [
        {
          "subject": "化学基礎",
          "unit": "中和",
          "miss": "中和の量的関係の式を立てるとき、酸と塩基の価数をかけ忘れた"
        },
        {
          "subject": "化学基礎",
          "unit": "物質量",
          "miss": "モル濃度と体積から物質量を求めるとき、mL を L に直さずにかけた"
        },
        {
          "subject": "化学基礎",
          "unit": "濃度",
          "miss": "水でうすめたあとのモル濃度を、うすめたあとの体積でなく、もとの体積で求めた"
        }
      ]
    },
    "check": [
      {
        "head": "第1問",
        "lines": [
          {
            "text": "【正解】 $0.030 \\text{ mol}$ （または $3.0 \\times 10^{-2} \\text{ mol}$）",
            "print": false
          },
          {
            "text": "仕掛けのねらい： 「$\\text{mL}$ を $\\text{L}$ に直さずにかけるミス」の対策",
            "print": false
          },
          {
            "text": "※もし $\\text{mL}$ のまま掛けてしまうと「$30 \\text{ mol}$」という非現実的な大きな値になってしまいます。",
            "print": false
          }
        ]
      },
      {
        "head": "第2問",
        "lines": [
          {
            "text": "【正解】 $20 \\text{ mL}$",
            "print": false
          },
          {
            "text": "仕掛けのねらい： 「酸と塩基の価数をかけ忘れるミス」の対策",
            "print": false
          },
          {
            "text": "※硫酸の「$2$ 価」を掛け忘れると、$10 \\text{ mL}$ と誤答してしまいます。",
            "print": false
          }
        ]
      },
      {
        "head": "第3問",
        "lines": [
          {
            "text": "【正解】 $0.20 \\text{ mol/L}$",
            "print": false
          },
          {
            "text": "仕掛けのねらい： 「うすめた後の体積ではなく、もとの体積を使ってしまうミス」の対策",
            "print": false
          },
          {
            "text": "分母に置く体積を誤ってもとの $40 \\text{ mL}$ や、加えた水の体積 $160 \\text{ mL}$ にしないよう注意が必要です。",
            "print": false
          }
        ]
      },
      {
        "head": "第4問",
        "lines": [
          {
            "text": "【正解】 $50 \\text{ mL}$",
            "print": false
          },
          {
            "text": "仕掛けのねらい： 【仕掛けなし（ストレートな問題）】",
            "print": false
          },
          {
            "text": "中和の単元ですが、硝酸 $\\text{HNO}_3$（1価）、水酸化カリウム $\\text{KOH}$（1価）ともに1価同士の素直な中和問題です。",
            "print": false
          }
        ]
      }
    ],
    "confirm": {
      "when": "第2問でひっかかったなら",
      "line": "中和の量的関係は、酸と塩基の価数を先に書き込む"
    },
    "prompt": "最近の模試と過去問で、私がしたミスを3つ書きます。\n\n・化学基礎　中和：中和の量的関係の式を立てるとき、酸と塩基の価数をかけ忘れた\n・化学基礎　物質量：モル濃度と体積から物質量を求めるとき、mL を L に直さずにかけた\n・化学基礎　濃度：水でうすめたあとのモル濃度を、うすめたあとの体積でなく、もとの体積で求めた\n\nこれらのミスが起きやすい問題を4題作ってください。共通テストの形式はまねせず、参考書の例題くらいの短い問題にしてください。そのうち1題は、上のどれかと同じ単元で、仕掛けのない問題にしてください。\n\n出す前に自分で解き、答えが1つに定まるかを確かめてください。最初は問題だけを出してください。答えと、どの問題に何を仕掛けたかは、私が「答え合わせ」と送るまで見せないでください。",
    "reply": {
      "lead": "ご提示いただいたミスの傾向をもとに、参考書の例題レベルの短い問題を4題作成しました。\n（4題のうち1題は、仕掛けのないストレートな問題です。）\n\n問題を解き終えたら、**「答え合わせ」**とメッセージを送ってください。その際に解答と、各問題のねらい・仕掛けの解説をお示しします。",
      "body": "### 第1問\n$0.20 \\text{ mol/L}$ のグルコース水溶液 $150 \\text{ mL}$ に含まれるグルコースの物質量は何 $\\text{mol}$ か。\n\n### 第2問\n$0.050 \\text{ mol/L}$ の硫酸 $20 \\text{ mL}$ を完全に中和するのに必要な、$0.10 \\text{ mol/L}$ の水酸化ナトリウム水溶液は何 $\\text{mL}$ か。\n\n### 第3問\n$1.0 \\text{ mol/L}$ の塩酸 $40 \\text{ mL}$ に純水を加えて、全量を $200 \\text{ mL}$ に薄めた。薄めたあとの塩酸のモル濃度は何 $\\text{mol/L}$ か。\n\n### 第4問\n$0.10 \\text{ mol/L}$ の硝酸水溶液 $25 \\text{ mL}$ を完全に中和するのに必要な、$0.050 \\text{ mol/L}$ の水酸化カリウム水溶液は何 $\\text{mL}$ か。",
      "tail": ""
    }
  },
  {
    "id": "geography",
    "label": "地理",
    "subjectName": "地理総合・地理探究",
    "kind": "reason",
    "source": "資料の読み取り",
    "title": "選んだ理由を2つ伝えて、表と設問を作ってもらう",
    "inputs": {
      "mode": "reason",
      "subject": "地理総合・地理探究",
      "material": "資料",
      "spec": "資料は架空の数値の表を1つ、設問は1問、選択肢は4つにしてください。",
      "reasons": [
        "資料の数値を、割合か実数かを確かめずに比べて選んだ",
        "表の一部の地域にだけ当てはまる内容を、全体に当てはまると思って選んだ"
      ]
    },
    "check": [
      {
        "head": "正解：③",
        "lines": [
          {
            "text": "B国：80億ドル × 15.0％ ＝ 12億ドル",
            "print": false
          },
          {
            "text": "C国：150億ドル × 6.0％ ＝ 9億ドル",
            "print": false
          },
          {
            "text": "したがって、B国（12億ドル）はC国（9億ドル）より大きいため、この文は正しいです。",
            "print": false
          }
        ]
      },
      {
        "head": "× ①：【罠①】割合と実数の混同",
        "lines": [
          {
            "text": "「有機農地の割合」を見ると確かにD国が20.0％で最も高いですが、設問が聞いているのは「有機農地面積（実数）」です。",
            "print": false
          },
          {
            "text": "A国：1,000万ha × 5.0％ ＝ 50万ha（最大）",
            "print": false
          },
          {
            "text": "D国：100万ha × 20.0％ ＝ 20万ha（最小）",
            "print": false
          }
        ]
      },
      {
        "head": "× ②：【罠②】一部に当てはまることを全体に広げてしまう",
        "lines": [
          {
            "text": "表の一番上のA国だけを見ると、「生産額の割合（10.0％）＞ 農地の割合（5.0％）」となっており、上回っています。",
            "print": false
          },
          {
            "text": "C国：6.0％ ＜ 8.0％（下回っている）",
            "print": false
          },
          {
            "text": "D国：12.0％ ＜ 20.0％（下回っている）",
            "print": false
          }
        ]
      },
      {
        "head": "× ④：相関の読み取り（ダミー）",
        "lines": [
          {
            "text": "有機農地の割合が高い順（D→B→C→A）に並べると、農業総生産額は（50→80→150→200）となっており、むしろ「低い国ほど生産額が大きい」という逆の傾向になっています。",
            "print": false
          }
        ]
      }
    ],
    "confirm": {
      "when": "①を選んだなら",
      "line": "数値を比べる選択肢は、割合か実数かを表の単位で確かめる"
    },
    "prompt": "共通テストの地理総合・地理探究で間違えた設問について、その選択肢を選んだ理由を2つ書きます。\n\n・資料の数値を、割合か実数かを確かめずに比べて選んだ\n・表の一部の地域にだけ当てはまる内容を、全体に当てはまると思って選んだ\n\nこの選び方をするとひっかかる選択肢を入れて、資料と設問を作ってください。共通テストの形式はまねせず、資料は架空の数値の表を1つ、設問は1問、選択肢は4つにしてください。\n\n出す前に自分で解き、正解が1つに定まるかを確かめてください。最初は資料と設問だけを出してください。正解と、どの選択肢に何を仕掛けたかは、私が「答え合わせ」と送るまで見せないでください。",
    "reply": {
      "lead": "ご提示いただいた2つの間違え方の傾向を踏まえて、練習問題を作成しました。\n\n解き終わりましたら、**「答え合わせ」**とメッセージをお送りください。正解と、各選択肢の解説をお出しします。",
      "body": "### 資料\n次の表は、架空の4か国（A〜D国）における農業に関する指標を示したものである。\n\n**表：4か国の農業および有機農業に関する指標**\n\n| 国名 | 総農地面積<br>（万ha） | 有機農地の割合<br>（％） | 農業総生産額<br>（億ドル） | 有機農産物の生産額の割合<br>（％） |\n| :---: | :---: | :---: | :---: | :---: |\n| **A国** | 1,000 | 5.0 | 200 | 10.0 |\n| **B国** | 200 | 15.0 | 80 | 15.0 |\n| **C国** | 500 | 8.0 | 150 | 6.0 |\n| **D国** | 100 | 20.0 | 50 | 12.0 |\n\n---\n\n### 設問\n表を見て説明した文として、**最も適当なもの**を次の①〜④のうちから1つ選べ。\n\n① 4か国の中で有機農地面積が最も広いのは、有機農地の割合が最も高いD国である。  \n② 有機農産物の生産額の割合は、いずれの国においても有機農地の割合を上回っている。  \n③ B国の有機農産物の生産額は、C国の有機農産物の生産額よりも大きい。  \n④ 有機農地の割合が高い国ほど、農業総生産額も大きくなっている。",
      "tail": ""
    }
  }
];
