/**
 * Particle drills.
 *
 * Particles are where most N5 marks go, and unlike a reading or a conjugation
 * there is no dictionary entry that settles whether a given sentence takes に
 * or で. Two things keep this honest.
 *
 * First, every sentence carries the `collocation` that justifies its answer —
 * the fragment of the filled sentence that makes the particle the right one.
 * A test asserts the collocation really is a substring of the filled sentence,
 * so it cannot drift away from what is being asked, and
 * `npm run check:data particles` looks it up in a sentence corpus. That check
 * corroborates about half of them and is silent on the rest, which is the most
 * it can honestly claim.
 *
 * Second, particles are often genuinely ambiguous: 天気がいいです and
 * 天気はいいです are both fine. Rather than pretend otherwise, sentences carry
 * `alsoAccepted`, so a learner is never marked wrong for a defensible answer,
 * and the distractors exclude every accepted particle.
 *
 * Sentences deliberately reuse vocabulary and kanji the other decks teach.
 */

export interface ParticleSentence {
  /** the sentence, with a single ＿ where the particle belongs */
  text: string;
  answer: string;
  /** other particles that are also correct in this sentence */
  alsoAccepted?: string[];
  /** the fragment of the filled sentence that justifies the answer */
  collocation: string;
  /** shown on reveal: why this particle and not another */
  why: string;
  /** the same in Dutch, where it has been written; see NL */
  whyNl?: string;
  english: string;
  /** the sentence in Dutch, where it has been written; see NL */
  dutch?: string;
  groupId: string;
}

export interface ParticleGroup {
  id: string;
  label: string;
  labelNl?: string;
  blurb: string;
  blurbNl?: string;
  sentences: ParticleSentence[];
}

/** Every particle the deck can offer as an option. */
export const PARTICLES = ['は', 'が', 'を', 'に', 'で', 'と', 'も', 'の', 'へ', 'から', 'まで'];

/** [text, answer, collocation, why, english, alsoAccepted?] */
type Row = [string, string, string, string, string, string[]?];

interface Spec {
  id: string;
  label: string;
  labelNl: string;
  blurb: string;
  blurbNl: string;
  rows: Row[];
}

const SPECS: Spec[] = [
  {
    id: 'wo',
    label: 'を — the direct object',
    labelNl: 'を — het lijdend voorwerp',
    blurb: 'What the verb acts on. The most clear-cut particle in the language.',
    blurbNl: 'Waar het werkwoord op inwerkt. Het meest eenduidige partikel van de taal.',
    rows: [
      ['パン＿食べます。', 'を', 'パンを食べます', 'What is eaten takes を.', 'I eat bread.'],
      ['水＿飲みます。', 'を', '水を飲みます', 'What is drunk takes を.', 'I drink water.'],
      ['本＿読みます。', 'を', '本を読みます', 'What is read takes を.', 'I read a book.'],
      ['手紙＿書きます。', 'を', '手紙を書きます', 'What is written takes を.', 'I write a letter.'],
      ['テレビ＿見ます。', 'を', 'テレビを見ます', 'What is watched takes を.', 'I watch television.'],
      ['日本語＿話します。', 'を', '日本語を話します', 'The language spoken is the object.', 'I speak Japanese.'],
      ['車＿買いました。', 'を', '車を買いました', 'What was bought takes を.', 'I bought a car.'],
      ['ドア＿開けます。', 'を', 'ドアを開けます', 'What is opened takes を.', 'I open the door.'],
      ['電気＿消します。', 'を', '電気を消します', 'What is switched off takes を.', 'I turn off the light.'],
      ['新聞＿読みません。', 'を', '新聞を読みません', 'Still を in the negative.', 'I do not read the newspaper.'],
      ['やさい＿食べません。', 'を', 'やさいを食べません', 'Still を in the negative.', 'I do not eat vegetables.'],
      ['ラジオ＿聞きます。', 'を', 'ラジオを聞きます', 'What is listened to takes を.', 'I listen to the radio.'],
    ],
  },
  {
    id: 'ni',
    label: 'に — where to, when, and where things are',
    labelNl: 'に — waarheen, wanneer, en waar iets is',
    blurb: 'Destination, a point in time, and the place something exists.',
    blurbNl: 'Bestemming, een tijdstip, en de plaats waar iets zich bevindt.',
    rows: [
      ['学校＿行きます。', 'に', '学校に行きます', 'Destination with 行く.', 'I go to school.', ['へ']],
      ['日本＿来ました。', 'に', '日本に来ました', 'Destination with 来る.', 'I came to Japan.', ['へ']],
      ['うち＿帰ります。', 'に', 'うちに帰ります', 'Destination with 帰る.', 'I go home.', ['へ']],
      ['七時＿起きます。', 'に', '七時に起きます', 'A specific clock time takes に.', 'I get up at seven.'],
      ['九時＿寝ます。', 'に', '九時に寝ます', 'A specific clock time takes に.', 'I go to bed at nine.'],
      ['日曜日＿休みます。', 'に', '日曜日に休みます', 'A named day takes に.', 'I rest on Sunday.'],
      ['いす＿座ります。', 'に', 'いすに座ります', 'Where you end up sitting takes に.', 'I sit on the chair.'],
      ['ここ＿犬がいます。', 'に', 'ここに犬がいます', 'Where something exists takes に.', 'There is a dog here.'],
      ['部屋＿テレビがあります。', 'に', '部屋にテレビがあります', 'Where something exists takes に.', 'There is a television in the room.'],
      ['友だち＿会います。', 'に', '友だちに会います', '会う marks the person met with に.', 'I meet a friend.'],
      ['先生＿聞きます。', 'に', '先生に聞きます', 'The person asked takes に.', 'I ask the teacher.'],
      ['駅＿行きました。', 'に', '駅に行きました', 'Destination with 行く.', 'I went to the station.', ['へ']],
    ],
  },
  {
    id: 'de',
    label: 'で — where it happens, and what with',
    labelNl: 'で — waar het gebeurt, en waarmee',
    blurb: 'The place an action occurs, and the means it is done by. The usual rival to に.',
    blurbNl: 'De plaats waar een handeling plaatsvindt, en het middel waarmee. De gebruikelijke concurrent van に.',
    rows: [
      ['学校＿勉強します。', 'で', '学校で勉強します', 'Where the action happens takes で.', 'I study at school.'],
      ['部屋＿本を読みます。', 'で', '部屋で本を読みます', 'Where the action happens takes で.', 'I read a book in my room.'],
      ['公園＿遊びます。', 'で', '公園で遊びます', 'Where the action happens takes で.', 'I play in the park.'],
      ['会社＿働きます。', 'で', '会社で働きます', 'Where the action happens takes で.', 'I work at a company.'],
      ['駅＿待ちます。', 'で', '駅で待ちます', 'Where the action happens takes で.', 'I wait at the station.'],
      ['店＿買いました。', 'で', '店で買いました', 'Where the action happens takes で.', 'I bought it at the shop.'],
      ['電車＿行きます。', 'で', '電車で行きます', 'The means of transport takes で.', 'I go by train.'],
      ['車＿来ました。', 'で', '車で来ました', 'The means of transport takes で.', 'I came by car.'],
      ['ペン＿書きます。', 'で', 'ペンで書きます', 'The tool used takes で.', 'I write with a pen.'],
      ['日本語＿手紙を書きます。', 'で', '日本語で手紙を書きます', 'The language used takes で.', 'I write letters in Japanese.'],
      ['図書館＿読みます。', 'で', '図書館で読みます', 'Where the action happens takes で.', 'I read at the library.'],
      ['うち＿休みます。', 'で', 'うちで休みます', 'Where the action happens takes で.', 'I rest at home.'],
    ],
  },
  {
    id: 'ga',
    label: 'が — existence, liking and question words',
    labelNl: 'が — bestaan, houden van en vraagwoorden',
    blurb: 'What exists, what you like or understand, and anything following a question word.',
    blurbNl: 'Wat er is, wat je leuk vindt of begrijpt, en alles wat op een vraagwoord volgt.',
    rows: [
      ['ねこ＿います。', 'が', 'ねこがいます', 'What exists takes が with いる.', 'There is a cat.'],
      ['本＿あります。', 'が', '本があります', 'What exists takes が with ある.', 'There is a book.'],
      ['時間＿ありません。', 'が', '時間がありません', 'Still が in the negative.', 'There is no time.'],
      ['お金＿あります。', 'が', 'お金があります', 'What exists takes が with ある.', 'I have money.'],
      ['だれ＿来ますか。', 'が', 'だれが来ます', 'A question word as subject must take が.', 'Who is coming?'],
      ['何＿ありますか。', 'が', '何がありますか', 'A question word as subject must take が.', 'What is there?'],
      ['どれ＿いいですか。', 'が', 'どれがいいですか', 'A question word as subject must take が.', 'Which one is good?'],
      ['日本語＿分かります。', 'が', '日本語が分かります', '分かる marks what is understood with が.', 'I understand Japanese.'],
      ['犬＿好きです。', 'が', '犬が好きです', '好き marks what is liked with が.', 'I like dogs.'],
      ['やさい＿きらいです。', 'が', 'やさいがきらいです', 'きらい marks what is disliked with が.', 'I dislike vegetables.'],
      ['日本語＿上手です。', 'が', '日本語が上手です', '上手 marks what you are good at with が.', 'You are good at Japanese.'],
      ['天気＿いいです。', 'が', '天気がいいです', 'Reporting what is so; は would make it the topic instead.', 'The weather is good.', ['は']],
    ],
  },
  {
    id: 'joining',
    label: 'と, の, も — with, of, and also',
    labelNl: 'と, の, も — met, van, en ook',
    blurb: 'Joining two nouns, saying whose something is, and saying "too".',
    blurbNl: 'Twee zelfstandige naamwoorden verbinden, zeggen van wie iets is, en "ook" zeggen.',
    rows: [
      ['友だち＿行きます。', 'と', '友だちと行きます', 'Who you do it with takes と.', 'I go with a friend.'],
      ['先生＿話します。', 'と', '先生と話します', 'Who you do it with takes と.', 'I talk with the teacher.'],
      ['パン＿たまごを買いました。', 'と', 'パンとたまご', 'と joins two nouns into a list.', 'I bought bread and eggs.'],
      ['お茶＿コーヒーを飲みます。', 'と', 'お茶とコーヒー', 'と joins two nouns into a list.', 'I drink tea and coffee.'],
      ['わたし＿かばんです。', 'の', 'わたしのかばん', 'の marks whose it is.', 'It is my bag.'],
      ['日本語＿先生です。', 'の', '日本語の先生', 'の says what kind of teacher.', 'She is a Japanese teacher.'],
      ['つくえ＿上に本があります。', 'の', 'つくえの上', 'の links a noun to a position word.', 'There is a book on the desk.'],
      ['友だち＿車で行きます。', 'の', '友だちの車', 'の marks whose car it is.', "I go in my friend's car."],
      ['わたし＿学生です。', 'も', 'わたしも学生です', 'も replaces は to mean "also".', 'I am a student too.'],
      ['これ＿安いです。', 'も', 'これも安いです', 'も replaces は to mean "also".', 'This one is cheap too.'],
      ['本＿買いました。', 'も', '本も買いました', 'も replaces を to mean "also".', 'I bought a book too.'],
      ['あの店に＿行きました。', 'も', 'あの店にも行きました', 'も follows another particle to mean "also".', 'I went to that shop too.'],
    ],
  },
  {
    id: 'range',
    label: 'から, まで — from and until',
    labelNl: 'から, まで — van en tot',
    blurb: 'Where something starts and where it stops, in time or in space.',
    blurbNl: 'Waar iets begint en waar het ophoudt, in tijd of in ruimte.',
    rows: [
      ['九時＿働きます。', 'から', '九時から', 'から marks where something starts.', 'I work from nine.'],
      ['一時＿待ちます。', 'まで', '一時まで待ちます', 'まで marks where something stops.', 'I will wait until one.'],
      ['学校＿駅まで歩きます。', 'から', '学校から駅まで', 'から marks the starting point.', 'I walk from school to the station.'],
      ['駅＿うちまで歩きます。', 'から', '駅からうちまで', 'から marks the starting point.', 'I walk from the station to home.'],
      ['朝＿昼まで勉強します。', 'から', '朝から昼まで', 'から marks the starting point in time.', 'I study from morning until noon.'],
      ['九時から五時＿働きます。', 'まで', '五時まで働きます', 'まで marks the end point in time.', 'I work from nine until five.'],
      ['八時＿十時まで本を読みます。', 'から', '八時から十時まで', 'から marks the starting point in time.', 'I read from eight until ten.'],
      ['うち＿会社まで電車で行きます。', 'から', 'うちから会社まで', 'から marks the starting point in space.', 'I go from home to the office by train.'],
    ],
  },
];

/**
 * The Dutch side of a sentence: its translation, and the reason the particle
 * is what it is. Keyed by the sentence itself, and kept apart from the rows
 * above so a translation cannot disturb a collocation the tests check against
 * the filled sentence. Either field may be absent, and falls back to English
 * on its own.
 */
const NL: Record<string, { dutch?: string; why?: string }> = {};

/** The keys the Dutch table above is allowed to use, for the data tests. */
export const NL_KEYS: string[] = Object.keys(NL);

export const PARTICLE_GROUPS: ParticleGroup[] = SPECS.map((spec) => ({
  id: spec.id,
  label: spec.label,
  labelNl: spec.labelNl,
  blurb: spec.blurb,
  blurbNl: spec.blurbNl,
  sentences: spec.rows.map(([text, answer, collocation, why, english, alsoAccepted]) => ({
    text,
    answer,
    collocation,
    why,
    ...(NL[text]?.why ? { whyNl: NL[text].why } : {}),
    english,
    ...(NL[text]?.dutch ? { dutch: NL[text].dutch } : {}),
    groupId: spec.id,
    ...(alsoAccepted ? { alsoAccepted } : {}),
  })),
}));

export const ALL_PARTICLE_SENTENCES: ParticleSentence[] = PARTICLE_GROUPS.flatMap(
  (g) => g.sentences,
);

/** The blank a sentence is drilled on. */
export const BLANK = '＿';

/** Every particle that is acceptable for a sentence, marked answer first. */
export const acceptedFor = (s: ParticleSentence): string[] => [
  s.answer,
  ...(s.alsoAccepted ?? []),
];

export const filled = (s: ParticleSentence, particle = s.answer): string =>
  s.text.replace(BLANK, particle);
