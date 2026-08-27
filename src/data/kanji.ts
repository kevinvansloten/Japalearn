export interface Vocab {
  word: string;
  reading: string;
  meaning: string;
}

export interface KanjiEntry {
  char: string;
  /** accepted English meanings; the first is the canonical one we display */
  meanings: string[];
  /** on'yomi, in katakana */
  on: string[];
  /** kun'yomi, in hiragana; okurigana in parentheses, e.g. い(く) */
  kun: string[];
  vocab: Vocab[];
  groupId: string;
}

export interface KanjiGroup {
  id: string;
  label: string;
  blurb: string;
  kanji: KanjiEntry[];
}

/** [char, meanings, on, kun, vocab] */
type Row = [string, string[], string[], string[], Vocab[]];

const v = (word: string, reading: string, meaning: string): Vocab => ({ word, reading, meaning });

const SPECS: { id: string; label: string; blurb: string; rows: Row[] }[] = [
  {
    id: 'numbers',
    label: 'Numbers & money',
    blurb: 'Counting, prices, dates — the first thing you can actually use.',
    rows: [
      ['一', ['one'], ['イチ', 'イツ'], ['ひと(つ)'], [v('一つ', 'ひとつ', 'one thing'), v('一月', 'いちがつ', 'January')]],
      ['二', ['two'], ['ニ'], ['ふた(つ)'], [v('二つ', 'ふたつ', 'two things'), v('二人', 'ふたり', 'two people')]],
      ['三', ['three'], ['サン'], ['み(っつ)'], [v('三つ', 'みっつ', 'three things'), v('三月', 'さんがつ', 'March')]],
      ['四', ['four'], ['シ'], ['よ(っつ)', 'よん'], [v('四つ', 'よっつ', 'four things'), v('四月', 'しがつ', 'April')]],
      ['五', ['five'], ['ゴ'], ['いつ(つ)'], [v('五つ', 'いつつ', 'five things'), v('五分', 'ごふん', 'five minutes')]],
      ['六', ['six'], ['ロク'], ['むっ(つ)'], [v('六つ', 'むっつ', 'six things'), v('六月', 'ろくがつ', 'June')]],
      ['七', ['seven'], ['シチ'], ['なな(つ)'], [v('七つ', 'ななつ', 'seven things'), v('七月', 'しちがつ', 'July')]],
      ['八', ['eight'], ['ハチ'], ['やっ(つ)'], [v('八つ', 'やっつ', 'eight things'), v('八月', 'はちがつ', 'August')]],
      ['九', ['nine'], ['キュウ', 'ク'], ['ここの(つ)'], [v('九つ', 'ここのつ', 'nine things'), v('九月', 'くがつ', 'September')]],
      ['十', ['ten'], ['ジュウ'], ['とお'], [v('十', 'じゅう', 'ten'), v('十月', 'じゅうがつ', 'October')]],
      ['百', ['hundred'], ['ヒャク'], [], [v('百', 'ひゃく', 'hundred'), v('三百', 'さんびゃく', 'three hundred')]],
      ['千', ['thousand'], ['セン'], ['ち'], [v('千', 'せん', 'thousand'), v('三千', 'さんぜん', 'three thousand')]],
      ['万', ['ten thousand'], ['マン', 'バン'], [], [v('一万', 'いちまん', 'ten thousand'), v('万年筆', 'まんねんひつ', 'fountain pen')]],
      ['円', ['yen', 'circle', 'round'], ['エン'], ['まる(い)'], [v('百円', 'ひゃくえん', '100 yen'), v('円い', 'まるい', 'round')]],
    ],
  },
  {
    id: 'time',
    label: 'Time & days of the week',
    blurb: 'The 曜日 set, plus the words for telling time.',
    rows: [
      ['日', ['day', 'sun'], ['ニチ', 'ジツ'], ['ひ', 'か'], [v('日曜日', 'にちようび', 'Sunday'), v('今日', 'きょう', 'today')]],
      ['月', ['month', 'moon'], ['ゲツ', 'ガツ'], ['つき'], [v('月曜日', 'げつようび', 'Monday'), v('一か月', 'いっかげつ', 'one month')]],
      ['火', ['fire'], ['カ'], ['ひ'], [v('火曜日', 'かようび', 'Tuesday'), v('花火', 'はなび', 'fireworks')]],
      ['水', ['water'], ['スイ'], ['みず'], [v('水曜日', 'すいようび', 'Wednesday'), v('水', 'みず', 'water')]],
      ['木', ['tree', 'wood'], ['モク', 'ボク'], ['き'], [v('木曜日', 'もくようび', 'Thursday'), v('木', 'き', 'tree')]],
      ['金', ['gold', 'money'], ['キン', 'コン'], ['かね'], [v('金曜日', 'きんようび', 'Friday'), v('お金', 'おかね', 'money')]],
      ['土', ['earth', 'soil', 'ground'], ['ド', 'ト'], ['つち'], [v('土曜日', 'どようび', 'Saturday'), v('土', 'つち', 'soil')]],
      ['曜', ['weekday'], ['ヨウ'], [], [v('曜日', 'ようび', 'day of the week'), v('何曜日', 'なんようび', 'what day?')]],
      ['年', ['year'], ['ネン'], ['とし'], [v('今年', 'ことし', 'this year'), v('去年', 'きょねん', 'last year')]],
      ['時', ['time', 'hour'], ['ジ'], ['とき'], [v('時間', 'じかん', 'time, hour'), v('何時', 'なんじ', 'what time?')]],
      ['分', ['minute', 'part', 'to divide'], ['フン', 'ブン'], ['わ(ける)', 'わ(かる)'], [v('五分', 'ごふん', 'five minutes'), v('分かる', 'わかる', 'to understand')]],
      ['半', ['half'], ['ハン'], ['なか(ば)'], [v('半分', 'はんぶん', 'half'), v('三時半', 'さんじはん', 'half past three')]],
      ['今', ['now'], ['コン'], ['いま'], [v('今', 'いま', 'now'), v('今週', 'こんしゅう', 'this week')]],
      ['間', ['interval', 'between', 'space'], ['カン', 'ケン'], ['あいだ'], [v('時間', 'じかん', 'time'), v('間', 'あいだ', 'between')]],
      ['毎', ['every'], ['マイ'], [], [v('毎日', 'まいにち', 'every day'), v('毎年', 'まいとし', 'every year')]],
      ['週', ['week'], ['シュウ'], [], [v('今週', 'こんしゅう', 'this week'), v('毎週', 'まいしゅう', 'every week')]],
    ],
  },
  {
    id: 'people',
    label: 'People & family',
    blurb: 'Who you are talking about, and who you are talking to.',
    rows: [
      ['人', ['person'], ['ジン', 'ニン'], ['ひと'], [v('日本人', 'にほんじん', 'Japanese person'), v('人', 'ひと', 'person')]],
      ['男', ['man', 'male'], ['ダン', 'ナン'], ['おとこ'], [v('男の人', 'おとこのひと', 'man'), v('男の子', 'おとこのこ', 'boy')]],
      ['女', ['woman', 'female'], ['ジョ'], ['おんな'], [v('女の人', 'おんなのひと', 'woman'), v('女の子', 'おんなのこ', 'girl')]],
      ['子', ['child'], ['シ', 'ス'], ['こ'], [v('子ども', 'こども', 'child'), v('女子', 'じょし', 'girl, women')]],
      ['母', ['mother'], ['ボ'], ['はは'], [v('お母さん', 'おかあさん', "(someone's) mother"), v('母', 'はは', 'my mother')]],
      ['父', ['father'], ['フ'], ['ちち'], [v('お父さん', 'おとうさん', "(someone's) father"), v('父', 'ちち', 'my father')]],
      ['友', ['friend'], ['ユウ'], ['とも'], [v('友だち', 'ともだち', 'friend'), v('友人', 'ゆうじん', 'friend (formal)')]],
      ['先', ['previous', 'ahead', 'before'], ['セン'], ['さき'], [v('先生', 'せんせい', 'teacher'), v('先月', 'せんげつ', 'last month')]],
      ['生', ['life', 'birth', 'to be born'], ['セイ', 'ショウ'], ['い(きる)', 'う(まれる)', 'なま'], [v('学生', 'がくせい', 'student'), v('生まれる', 'うまれる', 'to be born')]],
      ['名', ['name'], ['メイ', 'ミョウ'], ['な'], [v('名前', 'なまえ', 'name'), v('有名', 'ゆうめい', 'famous')]],
    ],
  },
  {
    id: 'nature',
    label: 'Nature & animals',
    blurb: 'Weather, landscape, and the animals that show up in every textbook.',
    rows: [
      ['山', ['mountain'], ['サン'], ['やま'], [v('山', 'やま', 'mountain'), v('富士山', 'ふじさん', 'Mt. Fuji')]],
      ['川', ['river'], ['セン'], ['かわ'], [v('川', 'かわ', 'river'), v('川口', 'かわぐち', 'river mouth')]],
      ['天', ['heaven', 'sky'], ['テン'], ['あめ'], [v('天気', 'てんき', 'weather'), v('天国', 'てんごく', 'heaven')]],
      ['気', ['spirit', 'energy', 'mood'], ['キ', 'ケ'], [], [v('元気', 'げんき', 'healthy, lively'), v('天気', 'てんき', 'weather')]],
      ['雨', ['rain'], ['ウ'], ['あめ'], [v('雨', 'あめ', 'rain'), v('大雨', 'おおあめ', 'heavy rain')]],
      ['花', ['flower'], ['カ'], ['はな'], [v('花', 'はな', 'flower'), v('花見', 'はなみ', 'flower viewing')]],
      ['空', ['sky', 'empty'], ['クウ'], ['そら', 'あ(く)', 'から'], [v('空', 'そら', 'sky'), v('空気', 'くうき', 'air')]],
      ['田', ['rice field'], ['デン'], ['た'], [v('田んぼ', 'たんぼ', 'rice paddy'), v('田中', 'たなか', 'Tanaka (surname)')]],
      ['石', ['stone'], ['セキ'], ['いし'], [v('石', 'いし', 'stone'), v('石川', 'いしかわ', 'Ishikawa')]],
      ['犬', ['dog'], ['ケン'], ['いぬ'], [v('犬', 'いぬ', 'dog'), v('子犬', 'こいぬ', 'puppy')]],
      ['魚', ['fish'], ['ギョ'], ['さかな'], [v('魚', 'さかな', 'fish'), v('金魚', 'きんぎょ', 'goldfish')]],
    ],
  },
  {
    id: 'position',
    label: 'Position & direction',
    blurb: 'Above, below, inside, and the four compass points.',
    rows: [
      ['上', ['above', 'up', 'on top'], ['ジョウ'], ['うえ', 'あ(がる)', 'のぼ(る)'], [v('上', 'うえ', 'above, on'), v('上手', 'じょうず', 'skilful')]],
      ['下', ['below', 'down', 'under'], ['カ', 'ゲ'], ['した', 'さ(がる)'], [v('下', 'した', 'below, under'), v('下手', 'へた', 'unskilful')]],
      ['中', ['middle', 'inside'], ['チュウ'], ['なか'], [v('中', 'なか', 'inside'), v('中国', 'ちゅうごく', 'China')]],
      ['外', ['outside'], ['ガイ'], ['そと'], [v('外', 'そと', 'outside'), v('外国', 'がいこく', 'foreign country')]],
      ['前', ['before', 'front'], ['ゼン'], ['まえ'], [v('前', 'まえ', 'front, before'), v('午前', 'ごぜん', 'a.m.')]],
      ['後', ['after', 'behind', 'later'], ['ゴ', 'コウ'], ['あと', 'うし(ろ)'], [v('午後', 'ごご', 'p.m.'), v('後ろ', 'うしろ', 'behind')]],
      ['左', ['left'], ['サ'], ['ひだり'], [v('左', 'ひだり', 'left'), v('左手', 'ひだりて', 'left hand')]],
      ['右', ['right'], ['ウ', 'ユウ'], ['みぎ'], [v('右', 'みぎ', 'right'), v('右手', 'みぎて', 'right hand')]],
      ['東', ['east'], ['トウ'], ['ひがし'], [v('東京', 'とうきょう', 'Tokyo'), v('東', 'ひがし', 'east')]],
      ['西', ['west'], ['セイ', 'サイ'], ['にし'], [v('西', 'にし', 'west'), v('関西', 'かんさい', 'Kansai')]],
      ['南', ['south'], ['ナン'], ['みなみ'], [v('南', 'みなみ', 'south'), v('南米', 'なんべい', 'South America')]],
      ['北', ['north'], ['ホク'], ['きた'], [v('北', 'きた', 'north'), v('北海道', 'ほっかいどう', 'Hokkaido')]],
    ],
  },
  {
    id: 'verbs',
    label: 'Everyday verbs',
    blurb: 'The verbs you meet in chapter one and never stop using.',
    rows: [
      ['行', ['to go'], ['コウ'], ['い(く)', 'おこな(う)'], [v('行く', 'いく', 'to go'), v('旅行', 'りょこう', 'travel')]],
      ['来', ['to come'], ['ライ'], ['く(る)'], [v('来る', 'くる', 'to come'), v('来年', 'らいねん', 'next year')]],
      ['見', ['to see', 'to look'], ['ケン'], ['み(る)'], [v('見る', 'みる', 'to see'), v('花見', 'はなみ', 'flower viewing')]],
      ['聞', ['to hear', 'to ask', 'to listen'], ['ブン'], ['き(く)'], [v('聞く', 'きく', 'to listen, to ask'), v('新聞', 'しんぶん', 'newspaper')]],
      ['食', ['to eat', 'food'], ['ショク'], ['た(べる)'], [v('食べる', 'たべる', 'to eat'), v('食事', 'しょくじ', 'a meal')]],
      ['飲', ['to drink'], ['イン'], ['の(む)'], [v('飲む', 'のむ', 'to drink'), v('飲み物', 'のみもの', 'a drink')]],
      ['言', ['to say', 'word'], ['ゲン', 'ゴン'], ['い(う)'], [v('言う', 'いう', 'to say'), v('言葉', 'ことば', 'word, language')]],
      ['話', ['to speak', 'story', 'talk'], ['ワ'], ['はな(す)', 'はなし'], [v('話す', 'はなす', 'to speak'), v('電話', 'でんわ', 'telephone')]],
      ['読', ['to read'], ['ドク'], ['よ(む)'], [v('読む', 'よむ', 'to read'), v('読書', 'どくしょ', 'reading')]],
      ['書', ['to write'], ['ショ'], ['か(く)'], [v('書く', 'かく', 'to write'), v('辞書', 'じしょ', 'dictionary')]],
      ['入', ['to enter', 'to put in'], ['ニュウ'], ['はい(る)', 'い(れる)'], [v('入る', 'はいる', 'to enter'), v('入口', 'いりぐち', 'entrance')]],
      ['出', ['to exit', 'to go out', 'to take out'], ['シュツ'], ['で(る)', 'だ(す)'], [v('出る', 'でる', 'to go out'), v('出口', 'でぐち', 'exit')]],
      ['立', ['to stand'], ['リツ'], ['た(つ)'], [v('立つ', 'たつ', 'to stand'), v('立山', 'たてやま', 'Tateyama')]],
      ['休', ['to rest', 'holiday'], ['キュウ'], ['やす(む)'], [v('休む', 'やすむ', 'to rest'), v('休み', 'やすみ', 'a break, holiday')]],
      ['買', ['to buy'], ['バイ'], ['か(う)'], [v('買う', 'かう', 'to buy'), v('買い物', 'かいもの', 'shopping')]],
    ],
  },
  {
    id: 'adjectives',
    label: 'Adjectives & size',
    blurb: 'Big, small, new, old — describing things.',
    rows: [
      ['大', ['big', 'large'], ['ダイ', 'タイ'], ['おお(きい)'], [v('大きい', 'おおきい', 'big'), v('大学', 'だいがく', 'university')]],
      ['小', ['small', 'little'], ['ショウ'], ['ちい(さい)', 'こ'], [v('小さい', 'ちいさい', 'small'), v('小学校', 'しょうがっこう', 'primary school')]],
      ['高', ['tall', 'expensive', 'high'], ['コウ'], ['たか(い)'], [v('高い', 'たかい', 'tall, expensive'), v('高校', 'こうこう', 'high school')]],
      ['安', ['cheap', 'safe', 'peaceful'], ['アン'], ['やす(い)'], [v('安い', 'やすい', 'cheap'), v('安心', 'あんしん', 'relief')]],
      ['新', ['new'], ['シン'], ['あたら(しい)'], [v('新しい', 'あたらしい', 'new'), v('新聞', 'しんぶん', 'newspaper')]],
      ['古', ['old'], ['コ'], ['ふる(い)'], [v('古い', 'ふるい', 'old (things)'), v('中古', 'ちゅうこ', 'second-hand')]],
      ['長', ['long', 'chief'], ['チョウ'], ['なが(い)'], [v('長い', 'ながい', 'long'), v('社長', 'しゃちょう', 'company president')]],
      ['白', ['white'], ['ハク'], ['しろ(い)'], [v('白い', 'しろい', 'white'), v('白', 'しろ', 'the colour white')]],
      ['多', ['many', 'much'], ['タ'], ['おお(い)'], [v('多い', 'おおい', 'many'), v('多分', 'たぶん', 'probably')]],
      ['少', ['few', 'little'], ['ショウ'], ['すく(ない)', 'すこ(し)'], [v('少し', 'すこし', 'a little'), v('少ない', 'すくない', 'few')]],
    ],
  },
  {
    id: 'places',
    label: 'Places & things',
    blurb: 'School, work, the station, and getting around.',
    rows: [
      ['国', ['country'], ['コク'], ['くに'], [v('外国', 'がいこく', 'foreign country'), v('国', 'くに', 'country')]],
      ['学', ['study', 'learning'], ['ガク'], ['まな(ぶ)'], [v('学生', 'がくせい', 'student'), v('大学', 'だいがく', 'university')]],
      ['校', ['school'], ['コウ'], [], [v('学校', 'がっこう', 'school'), v('高校', 'こうこう', 'high school')]],
      ['本', ['book', 'origin', 'main'], ['ホン'], ['もと'], [v('本', 'ほん', 'book'), v('日本', 'にほん', 'Japan')]],
      ['語', ['language', 'word'], ['ゴ'], ['かた(る)'], [v('日本語', 'にほんご', 'Japanese language'), v('英語', 'えいご', 'English')]],
      ['車', ['car', 'vehicle'], ['シャ'], ['くるま'], [v('車', 'くるま', 'car'), v('電車', 'でんしゃ', 'train')]],
      ['駅', ['station'], ['エキ'], [], [v('駅', 'えき', 'station'), v('駅前', 'えきまえ', 'in front of the station')]],
      ['店', ['shop', 'store'], ['テン'], ['みせ'], [v('店', 'みせ', 'shop'), v('本屋', 'ほんや', 'bookshop')]],
      ['会', ['meeting', 'to meet', 'society'], ['カイ'], ['あ(う)'], [v('会社', 'かいしゃ', 'company'), v('会う', 'あう', 'to meet')]],
      ['社', ['company', 'shrine'], ['シャ'], ['やしろ'], [v('会社', 'かいしゃ', 'company'), v('神社', 'じんじゃ', 'Shinto shrine')]],
      ['電', ['electricity'], ['デン'], [], [v('電車', 'でんしゃ', 'train'), v('電話', 'でんわ', 'telephone')]],
      ['何', ['what'], ['カ'], ['なに', 'なん'], [v('何', 'なに', 'what'), v('何時', 'なんじ', 'what time?')]],
    ],
  },
  {
    id: 'body',
    label: 'Body & other basics',
    blurb: 'Parts of the body, plus a few high-frequency leftovers.',
    rows: [
      ['目', ['eye'], ['モク'], ['め'], [v('目', 'め', 'eye'), v('目上', 'めうえ', 'one’s senior')]],
      ['耳', ['ear'], ['ジ'], ['みみ'], [v('耳', 'みみ', 'ear'), v('耳鼻科', 'じびか', 'ENT clinic')]],
      ['口', ['mouth'], ['コウ'], ['くち'], [v('口', 'くち', 'mouth'), v('入口', 'いりぐち', 'entrance')]],
      ['手', ['hand'], ['シュ'], ['て'], [v('手', 'て', 'hand'), v('上手', 'じょうず', 'skilful')]],
      ['足', ['foot', 'leg', 'to add'], ['ソク'], ['あし', 'た(りる)'], [v('足', 'あし', 'foot, leg'), v('足りる', 'たりる', 'to be enough')]],
      ['力', ['power', 'strength'], ['リョク', 'リキ'], ['ちから'], [v('力', 'ちから', 'strength'), v('電力', 'でんりょく', 'electric power')]],
      ['体', ['body'], ['タイ'], ['からだ'], [v('体', 'からだ', 'body'), v('体力', 'たいりょく', 'physical strength')]],
      ['文', ['sentence', 'writing', 'text'], ['ブン'], [], [v('文', 'ぶん', 'sentence'), v('文字', 'もじ', 'character, letter')]],
      ['字', ['character', 'letter'], ['ジ'], [], [v('漢字', 'かんじ', 'kanji'), v('数字', 'すうじ', 'numeral')]],
      ['正', ['correct', 'justice'], ['セイ', 'ショウ'], ['ただ(しい)'], [v('正しい', 'ただしい', 'correct'), v('正月', 'しょうがつ', 'New Year')]],
    ],
  },
];

export const KANJI_GROUPS: KanjiGroup[] = SPECS.map((spec) => ({
  id: spec.id,
  label: spec.label,
  blurb: spec.blurb,
  kanji: spec.rows.map(([char, meanings, on, kun, vocab]) => ({
    char,
    meanings,
    on,
    kun,
    vocab,
    groupId: spec.id,
  })),
}));

export const ALL_KANJI: KanjiEntry[] = KANJI_GROUPS.flatMap((g) => g.kanji);

export const KANJI_BY_CHAR: Record<string, KanjiEntry> = Object.fromEntries(
  ALL_KANJI.map((k) => [k.char, k]),
);
