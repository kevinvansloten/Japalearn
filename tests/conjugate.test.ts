import { ALL_ADJECTIVES, ALL_VERBS, CONJUGATION_GROUPS } from '../src/data/conjugation';
import { buildConjugationCards, type ConjugationConfig } from '../src/lib/buildCards';
import {
  ADJECTIVE_FORMS,
  VERB_FORMS,
  ADJECTIVE_FORM_LABEL,
  VERB_FORM_LABEL,
  conjugateAdjective,
  conjugateVerb,
  type AdjectiveForm,
  type VerbForm,
} from '../src/lib/conjugate';
import { eq, ok } from './assert';

const verbByWord = new Map(ALL_VERBS.map((v) => [v.word, v]));
const adjByWord = new Map(ALL_ADJECTIVES.map((a) => [a.word, a]));

const verb = (word: string, form: VerbForm) => {
  const entry = verbByWord.get(word)!;
  return conjugateVerb(
    { word: entry.word, reading: entry.reading },
    entry.verbClass,
    form,
    entry.overrides,
  );
};

const adjective = (word: string, form: AdjectiveForm) => {
  const entry = adjByWord.get(word)!;
  return conjugateAdjective(
    { word: entry.word, reading: entry.reading },
    entry.adjectiveClass,
    form,
    entry.overrides,
  );
};

// ------------------------------------------------- the rules themselves

/** [dictionary form, form, expected written, expected reading] */
const VERB_TABLE: [string, VerbForm, string, string][] = [
  // Godan: the ます stem moves the ending to the い row.
  ['書く', 'masu', '書きます', 'かきます'],
  ['話す', 'masu', '話します', 'はなします'],
  ['待つ', 'masu', '待ちます', 'まちます'],
  ['飲む', 'masu', '飲みます', 'のみます'],
  ['買う', 'masu', '買います', 'かいます'],
  ['泳ぐ', 'masu', '泳ぎます', 'およぎます'],
  ['遊ぶ', 'masu', '遊びます', 'あそびます'],
  ['作る', 'masu', '作ります', 'つくります'],

  // Godan て-form, which depends entirely on the final kana.
  ['書く', 'te', '書いて', 'かいて'],
  ['泳ぐ', 'te', '泳いで', 'およいで'],
  ['話す', 'te', '話して', 'はなして'],
  ['待つ', 'te', '待って', 'まって'],
  ['買う', 'te', '買って', 'かって'],
  ['作る', 'te', '作って', 'つくって'],
  ['飲む', 'te', '飲んで', 'のんで'],
  ['遊ぶ', 'te', '遊んで', 'あそんで'],

  // And the past form, which mirrors it.
  ['書く', 'ta', '書いた', 'かいた'],
  ['泳ぐ', 'ta', '泳いだ', 'およいだ'],
  ['話す', 'ta', '話した', 'はなした'],
  ['飲む', 'ta', '飲んだ', 'のんだ'],

  // ない moves the ending to the あ row, except う, which becomes わ.
  ['書く', 'nai', '書かない', 'かかない'],
  ['話す', 'nai', '話さない', 'はなさない'],
  ['待つ', 'nai', '待たない', 'またない'],
  ['飲む', 'nai', '飲まない', 'のまない'],
  ['作る', 'nai', '作らない', 'つくらない'],
  ['買う', 'nai', '買わない', 'かわない'],
  ['会う', 'nai', '会わない', 'あわない'],

  // Ichidan: drop る, add the ending.
  ['食べる', 'masu', '食べます', 'たべます'],
  ['食べる', 'te', '食べて', 'たべて'],
  ['食べる', 'nai', '食べない', 'たべない'],
  ['食べる', 'ta', '食べた', 'たべた'],
  ['見る', 'masu', '見ます', 'みます'],
  ['起きる', 'te', '起きて', 'おきて'],

  // Godan verbs that end in る and look ichidan.
  ['帰る', 'masu', '帰ります', 'かえります'],
  ['帰る', 'te', '帰って', 'かえって'],
  ['帰る', 'nai', '帰らない', 'かえらない'],
  ['入る', 'te', '入って', 'はいって'],
  ['走る', 'te', '走って', 'はしって'],
  ['知る', 'nai', '知らない', 'しらない'],

  // Exceptions.
  ['行く', 'te', '行って', 'いって'],
  ['行く', 'ta', '行った', 'いった'],
  ['行く', 'masu', '行きます', 'いきます'],
  ['ある', 'nai', 'ない', 'ない'],
  ['ある', 'te', 'あって', 'あって'],
  ['する', 'masu', 'します', 'します'],
  ['する', 'te', 'して', 'して'],
  ['する', 'nai', 'しない', 'しない'],
  ['来る', 'masu', '来ます', 'きます'],
  ['来る', 'te', '来て', 'きて'],
  ['来る', 'nai', '来ない', 'こない'],
  ['来る', 'ta', '来た', 'きた'],
  ['勉強する', 'te', '勉強して', 'べんきょうして'],

  // Polite negative and past, on both classes.
  ['書く', 'masen', '書きません', 'かきません'],
  ['書く', 'mashita', '書きました', 'かきました'],
  ['食べる', 'masen', '食べません', 'たべません'],
  ['食べる', 'mashita', '食べました', 'たべました'],
];

for (const [word, form, expectedWord, expectedReading] of VERB_TABLE) {
  const got = verb(word, form);
  eq(`${word} ${form} (written)`, got.word, expectedWord);
  eq(`${word} ${form} (reading)`, got.reading, expectedReading);
}

const ADJECTIVE_TABLE: [string, AdjectiveForm, string, string][] = [
  ['大きい', 'negative', '大きくない', 'おおきくない'],
  ['大きい', 'past', '大きかった', 'おおきかった'],
  ['大きい', 'pastNegative', '大きくなかった', 'おおきくなかった'],
  ['安い', 'negative', '安くない', 'やすくない'],
  ['忙しい', 'past', '忙しかった', 'いそがしかった'],
  ['おいしい', 'negative', 'おいしくない', 'おいしくない'],
  // いい conjugates from よい, not from いい.
  ['いい', 'negative', 'よくない', 'よくない'],
  ['いい', 'past', 'よかった', 'よかった'],
  ['いい', 'pastNegative', 'よくなかった', 'よくなかった'],
  // な-adjectives keep the whole word and take the ending on the end.
  ['静か', 'negative', '静かじゃない', 'しずかじゃない'],
  ['静か', 'past', '静かだった', 'しずかだった'],
  ['静か', 'pastNegative', '静かじゃなかった', 'しずかじゃなかった'],
  ['好き', 'negative', '好きじゃない', 'すきじゃない'],
  ['きれい', 'past', 'きれいだった', 'きれいだった'],
];

for (const [word, form, expectedWord, expectedReading] of ADJECTIVE_TABLE) {
  const got = adjective(word, form);
  eq(`${word} ${form} (written)`, got.word, expectedWord);
  eq(`${word} ${form} (reading)`, got.reading, expectedReading);
}

// ---------------------------------------------------- whole-set health

// Every verb must produce every form without throwing, and produce kana
// readings — a rule that silently returned undefined would surface here.
const brokenVerbs: string[] = [];
for (const entry of ALL_VERBS) {
  for (const form of VERB_FORMS) {
    try {
      const got = verb(entry.word, form);
      if (!got.word || !/^[ぁ-ゖァ-ヺー]+$/.test(got.reading)) {
        brokenVerbs.push(`${entry.word} ${form} -> ${got.word}/${got.reading}`);
      }
    } catch (error) {
      brokenVerbs.push(`${entry.word} ${form} threw: ${String(error)}`);
    }
  }
}
ok('every verb conjugates in every form', brokenVerbs.length === 0,
  brokenVerbs.slice(0, 5).join('; '));

const brokenAdjectives: string[] = [];
for (const entry of ALL_ADJECTIVES) {
  for (const form of ADJECTIVE_FORMS) {
    const got = adjective(entry.word, form);
    if (!got.word || !/^[ぁ-ゖァ-ヺー]+$/.test(got.reading)) {
      brokenAdjectives.push(`${entry.word} ${form} -> ${got.word}/${got.reading}`);
    }
  }
}
ok('every adjective conjugates in every form', brokenAdjectives.length === 0,
  brokenAdjectives.slice(0, 5).join('; '));

// Every irregular must carry a full set of overrides, or conjugateVerb throws.
const irregulars = ALL_VERBS.filter((v) => v.verbClass === 'irregular');
ok('irregulars exist', irregulars.length > 0);
const incomplete = irregulars.filter((v) => VERB_FORMS.some((f) => !v.overrides?.[f]));
ok('every irregular overrides every form', incomplete.length === 0,
  incomplete.map((v) => v.word).join('; '));

// A form must never come back unchanged: that would mean a rule did nothing
// and the card would show its own answer.
const unchanged: string[] = [];
for (const entry of ALL_VERBS) {
  for (const form of VERB_FORMS) {
    if (verb(entry.word, form).word === entry.word) unchanged.push(`${entry.word} ${form}`);
  }
}
ok('conjugating always changes the word', unchanged.length === 0, unchanged.join('; '));

eq('no duplicate verbs', new Set(ALL_VERBS.map((v) => v.word)).size, ALL_VERBS.length);
eq('no duplicate adjectives', new Set(ALL_ADJECTIVES.map((a) => a.word)).size, ALL_ADJECTIVES.length);

// ---------------------------------------------------------------- cards

const deck: ConjugationConfig = {
  groupIds: CONJUGATION_GROUPS.map((g) => g.id),
  excluded: [],
  verbForms: [...VERB_FORMS],
  adjectiveForms: [...ADJECTIVE_FORMS],
  modes: ['produce'],
  inputModes: { produce: 'type', identify: 'choice', dictionary: 'type' },
  flow: 'once',
  order: 'ordered',
};

const produce = buildConjugationCards(deck);
eq(
  'one produce card per word per form',
  produce.length,
  ALL_VERBS.length * VERB_FORMS.length + ALL_ADJECTIVES.length * ADJECTIVE_FORMS.length,
);

const kaite = produce.find((c) => c.id === 'conj-produce-書く-te')!;
ok('書く て-form card exists', Boolean(kaite));
ok('prompt is the dictionary form', kaite.prompt === '書く', kaite.prompt);
ok('the form asked for is shown', kaite.promptNote === 'て-form', kaite.promptNote);
ok('accepts the written form', kaite.check('書いて'));
ok('accepts kana', kaite.check('かいて'));
ok('accepts romaji', kaite.check('kaite'));
ok('rejects the wrong form', !kaite.check('書きます'));
ok('rejects the naive te-form', !kaite.check('かきて'));

// The trap verbs must not be gradeable as if they were ichidan.
const kaette = produce.find((c) => c.id === 'conj-produce-帰る-te')!;
ok('帰る accepts かえって', kaette.check('kaette'));
ok('帰る rejects かえて', !kaette.check('かえて'));

// Naming a form is recognition, so it is always multiple choice.
const identify = buildConjugationCards({ ...deck, modes: ['identify'] });
ok('identify cards are always choice', identify.every((c) => c.inputMode === 'choice'));
ok('identify options are form names',
  identify[0].choices!.every((o) => Object.values(VERB_FORM_LABEL).includes(o as never) ||
    Object.values(ADJECTIVE_FORM_LABEL).includes(o as never)));

// Adjective cards must be offered adjective form names, not verb ones.
const adjIdentify = identify.find((c) => c.id.startsWith('conj-identify-静か'))!;
ok('adjective options stay adjective forms',
  adjIdentify.choices!.every((o) => Object.values(ADJECTIVE_FORM_LABEL).includes(o as never)),
  adjIdentify.choices!.join(' / '));

const dictionary = buildConjugationCards({ ...deck, modes: ['dictionary'] });
const backToTaberu = dictionary.find((c) => c.id === 'conj-dictionary-食べる-masu')!;
ok('shows the conjugated form', backToTaberu.prompt === '食べます', backToTaberu.prompt);
ok('accepts the dictionary form', backToTaberu.check('たべる') && backToTaberu.check('食べる'));

// One schedule per word, so a verb is not asked six times a day.
ok('all forms of a word share an item id',
  produce.filter((c) => c.id.includes('書く')).every((c) => c.itemId === 'conj:書く'));

const allModes = buildConjugationCards({ ...deck, modes: ['produce', 'identify', 'dictionary'] });
eq('card ids are unique', new Set(allModes.map((c) => c.id)).size, allModes.length);

const choiceCards = buildConjugationCards({
  ...deck,
  modes: ['produce', 'identify', 'dictionary'],
  inputModes: { produce: 'choice', identify: 'choice', dictionary: 'choice' },
}).filter((c) => c.choices);
const ambiguous = choiceCards.filter((c) => c.choices!.filter((o) => c.check(o)).length !== 1);
ok('exactly one correct option per choice card', ambiguous.length === 0,
  ambiguous.slice(0, 5).map((c) => c.id).join('; '));

eq('form selection narrows the deck',
  buildConjugationCards({ ...deck, verbForms: ['te'], adjectiveForms: ['negative'] }).length,
  ALL_VERBS.length + ALL_ADJECTIVES.length);
eq('no groups means no cards', buildConjugationCards({ ...deck, groupIds: [] }).length, 0);
