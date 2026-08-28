/**
 * Short sentences to read.
 *
 * This is the first deck that asks you to use the others together: the kanji,
 * the vocabulary, the conjugated verbs and the particles all at once. So the
 * sentences deliberately reuse material the app already teaches rather than
 * introducing anything new, and a test holds them to it.
 *
 * A sentence is stored as furigana segments rather than as a string plus a
 * reading. That way the written form and the reading cannot drift apart — both
 * are derived from the same place — and the app can show the reading over the
 * kanji when you are stuck.
 */

/** A run of text, with its reading when the written form needs one. */
export type Segment = [written: string, reading?: string];

export interface ReadingSentence {
  segments: Segment[];
  english: string;
  groupId: string;
}

export interface ReadingGroup {
  id: string;
  label: string;
  blurb: string;
  sentences: ReadingSentence[];
}

/** The sentence as written. */
export const written = (s: ReadingSentence): string =>
  s.segments.map(([text]) => text).join('');

/** The sentence in kana, which is also what gets read aloud. */
export const reading = (s: ReadingSentence): string =>
  s.segments.map(([text, ruby]) => ruby ?? text).join('');

type Row = [Segment[], string];

const SPECS: { id: string; label: string; blurb: string; rows: Row[] }[] = [
  {
    id: 'statements',
    label: 'Everyday statements',
    blurb: 'Who does what to what. The pattern most sentences are built on.',
    rows: [
      [[['私', 'わたし'], ['は'], ['毎日', 'まいにち'], ['パン'], ['を'], ['食', 'た'], ['べます'], ['。']],
        'I eat bread every day.'],
      [[['友', 'とも'], ['だちは'], ['日本語', 'にほんご'], ['を'], ['話', 'はな'], ['します'], ['。']],
        'My friend speaks Japanese.'],
      [[['先生', 'せんせい'], ['は'], ['本', 'ほん'], ['を'], ['読', 'よ'], ['みます'], ['。']],
        'The teacher reads a book.'],
      [[['私', 'わたし'], ['は'], ['水', 'みず'], ['を'], ['飲', 'の'], ['みません'], ['。']],
        'I do not drink water.'],
      [[['母', 'はは'], ['は'], ['新聞', 'しんぶん'], ['を'], ['読', 'よ'], ['みました'], ['。']],
        'My mother read the newspaper.'],
      [[['父', 'ちち'], ['は'], ['車', 'くるま'], ['を'], ['買', 'か'], ['いました'], ['。']],
        'My father bought a car.'],
      [[['学生', 'がくせい'], ['は'], ['ノート'], ['を'], ['使', 'つか'], ['います'], ['。']],
        'Students use notebooks.'],
      [[['私', 'わたし'], ['は'], ['日本語', 'にほんご'], ['を'], ['勉強', 'べんきょう'], ['します'], ['。']],
        'I study Japanese.'],
    ],
  },
  {
    id: 'routine',
    label: 'Times and routine',
    blurb: 'When things happen, and what you do every day.',
    rows: [
      [[['私', 'わたし'], ['は'], ['七時', 'しちじ'], ['に'], ['起', 'お'], ['きます'], ['。']],
        'I get up at seven.'],
      [[['毎朝', 'まいあさ'], ['コーヒー'], ['を'], ['飲', 'の'], ['みます'], ['。']],
        'I drink coffee every morning.'],
      [[['九時', 'くじ'], ['に'], ['寝', 'ね'], ['ます'], ['。']], 'I go to bed at nine.'],
      [[['日曜日', 'にちようび'], ['は'], ['休', 'やす'], ['みます'], ['。']], 'I rest on Sundays.'],
      [[['今日', 'きょう'], ['は'], ['月曜日', 'げつようび'], ['です'], ['。']], 'Today is Monday.'],
      [[['来週', 'らいしゅう'], ['、'], ['友', 'とも'], ['だちに'], ['会', 'あ'], ['います'], ['。']],
        'I am meeting a friend next week.'],
      [[['昨日', 'きのう'], ['は'], ['忙', 'いそが'], ['しかったです'], ['。']], 'Yesterday was busy.'],
      [[['朝', 'あさ'], ['から'], ['昼', 'ひる'], ['まで'], ['働', 'はたら'], ['きます'], ['。']],
        'I work from morning until noon.'],
    ],
  },
  {
    id: 'going',
    label: 'Going places',
    blurb: 'Where you are going, how you get there, and what is where.',
    rows: [
      [[['私', 'わたし'], ['は'], ['学校', 'がっこう'], ['に'], ['行', 'い'], ['きます'], ['。']],
        'I go to school.'],
      [[['電車', 'でんしゃ'], ['で'], ['駅', 'えき'], ['に'], ['行', 'い'], ['きました'], ['。']],
        'I went to the station by train.'],
      [[['友', 'とも'], ['だちと'], ['公園', 'こうえん'], ['で'], ['遊', 'あそ'], ['びます'], ['。']],
        'I play in the park with a friend.'],
      [[['母', 'はは'], ['は'], ['店', 'みせ'], ['で'], ['パン'], ['を'], ['買', 'か'], ['います'], ['。']],
        'My mother buys bread at the shop.'],
      [[['図書館', 'としょかん'], ['で'], ['本', 'ほん'], ['を'], ['読', 'よ'], ['みます'], ['。']],
        'I read books at the library.'],
      [[['うちから'], ['駅', 'えき'], ['まで'], ['歩', 'ある'], ['きます'], ['。']],
        'I walk from home to the station.'],
      [[['会社', 'かいしゃ'], ['は'], ['東京', 'とうきょう'], ['に'], ['あります'], ['。']],
        'The company is in Tokyo.'],
      [[['部屋', 'へや'], ['に'], ['テレビ'], ['が'], ['あります'], ['。']],
        'There is a television in the room.'],
    ],
  },
  {
    id: 'describing',
    label: 'Describing things',
    blurb: 'Adjectives in place, including the negative and the past.',
    rows: [
      [[['この'], ['本', 'ほん'], ['は'], ['面白', 'おもしろ'], ['いです'], ['。']],
        'This book is interesting.'],
      [[['あの'], ['店', 'みせ'], ['は'], ['安', 'やす'], ['くないです'], ['。']],
        'That shop is not cheap.'],
      [[['今日', 'きょう'], ['の'], ['天気', 'てんき'], ['はいいです'], ['。']],
        'The weather is good today.'],
      [[['私', 'わたし'], ['の'], ['部屋', 'へや'], ['は'], ['静', 'しず'], ['かです'], ['。']],
        'My room is quiet.'],
      [[['その'], ['車', 'くるま'], ['は'], ['新', 'あたら'], ['しくないです'], ['。']],
        'That car is not new.'],
      [[['犬', 'いぬ'], ['が'], ['好', 'す'], ['きです'], ['。']], 'I like dogs.'],
      [[['この'], ['魚', 'さかな'], ['はおいしかったです'], ['。']], 'This fish was delicious.'],
      [[['日本語', 'にほんご'], ['は'], ['難', 'むずか'], ['しいです'], ['。']],
        'Japanese is difficult.'],
    ],
  },
  {
    id: 'questions',
    label: 'Questions',
    blurb: 'The question words in real sentences, all ending in か.',
    rows: [
      [[['これは'], ['何', 'なん'], ['ですか'], ['。']], 'What is this?'],
      [[['だれが'], ['来', 'き'], ['ますか'], ['。']], 'Who is coming?'],
      [[['駅', 'えき'], ['はどこですか'], ['。']], 'Where is the station?'],
      [[['今', 'いま'], ['、'], ['何時', 'なんじ'], ['ですか'], ['。']], 'What time is it now?'],
      [[['いくらですか'], ['。']], 'How much is it?'],
      [[['日本語', 'にほんご'], ['が'], ['分', 'わ'], ['かりますか'], ['。']],
        'Do you understand Japanese?'],
      [[['いつ'], ['行', 'い'], ['きますか'], ['。']], 'When are you going?'],
      [[['どの'], ['本', 'ほん'], ['を'], ['読', 'よ'], ['みますか'], ['。']],
        'Which book will you read?'],
    ],
  },
];

export const READING_GROUPS: ReadingGroup[] = SPECS.map((spec) => ({
  id: spec.id,
  label: spec.label,
  blurb: spec.blurb,
  sentences: spec.rows.map(([segments, english]) => ({
    segments,
    english,
    groupId: spec.id,
  })),
}));

export const ALL_READING_SENTENCES: ReadingSentence[] = READING_GROUPS.flatMap(
  (g) => g.sentences,
);
