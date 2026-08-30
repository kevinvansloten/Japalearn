/**
 * Interface text, in English.
 *
 * This object is the source of truth: `Strings` is derived from it, so every
 * other language is checked against it at compile time and a missing or
 * misspelled key is a type error rather than a blank on screen.
 *
 * Anything that varies with a number or a name is a function rather than a
 * template with placeholders in it. Dutch does not pluralise where English
 * does — "1 kaart" but "2 kaarten", and no "s" to bolt on — and a function is
 * the only shape that lets each language decide that for itself.
 *
 * Only the interface lives here. The meanings the decks are actually graded on
 * are content, and sit beside the data they belong to; see ./content.ts.
 */
import { ADJECTIVE_FORM_LABEL, VERB_FORM_LABEL } from '../lib/conjugate';
import type { WordKind } from '../data/words';
import type { KanaSection } from '../data/kana';
import type {
  ConjugationMode,
  CounterMode,
  DuolingoMode,
  DuolingoScript,
  KanaMode,
  KanaScript,
  KanjiMode,
  ReadingMode,
  WordMode,
} from '../lib/buildCards';
import type { Flow } from '../lib/session';
import type { Lang } from './lang';

export const en = {
  /** which language this bundle is, for the content resolvers */
  lang: 'en' as Lang,
  /** the language's own name, so the switcher reads the same in both */
  name: 'English',

  common: {
    home: 'Home',
    settings: 'Settings',
    selectAll: 'Select all',
    clear: 'Clear',
    everything: 'Everything',
    nothing: 'Nothing',
    type: 'Type',
    choose: 'Choose',
    language: 'Language',
  },

  /** deck names, as headings */
  deck: {
    kana: 'Hiragana & katakana',
    kanji: 'Kanji — JLPT N5',
    kanjiShort: 'Kanji',
    counters: 'Counters, dates & times',
    words: 'Vocabulary — N5',
    wordsShort: 'Vocabulary',
    conjugation: 'Conjugation',
    particles: 'Particles',
    duolingo: 'Duolingo — the course word list',
    duolingoShort: 'Duolingo',
    reading: 'Reading',
  },

  /** the title a running session carries */
  run: {
    review: 'Review',
    kana: 'Hiragana & katakana',
    kanji: 'Kanji — N5',
    counters: 'Counters, dates & times',
    words: 'Vocabulary — N5',
    conjugation: 'Conjugation',
    particles: 'Particles',
    duolingo: 'Duolingo vocabulary',
    reading: 'Reading',
  },

  home: {
    intro:
      'Seven decks covering N5: the kana, the kanji, the counters that never behave, the core ' +
      'vocabulary, how verbs and adjectives conjugate, which particle a sentence takes, and ' +
      'reading whole sentences. Review what is due, or pick a deck and drill exactly what you ' +
      'choose. Alongside them, the Duolingo course word list, unit by unit, for going back ' +
      'over what that taught you.',
    step: (n: number, total: number) => `Step ${n} of ${total}`,
    known: (known: number, total: number) => `${known} of ${total} known`,
    planDone: 'You have been through the whole plan',
    planDoneHint: 'Keep reviewing, or pick any deck and drill whatever you like.',
    seeProgress: 'See progress',
    studyThis: 'Study this',
    readyToReview: 'Ready to review',
    nothingDue: 'Nothing due',
    toReview: 'to review',
    fresh: 'new',
    aboutMinutes: (n: number) => `about ${n} minute${n === 1 ? '' : 's'}`,
    nextReview: (gap: string) => `Next review ${gap}.`,
    nothingScheduled: 'Pick a deck below and practise — what you get right starts the clock.',
    review: (n: number) => `Review ${n}`,
    kanaBlurb: (n: number) =>
      `All ${n} kana including dakuten and yōon. Type the sound, or pick the glyph.`,
    kanjiBlurb: (n: number) =>
      `${n} kanji in nine groups. Meanings, readings, recall and vocabulary.`,
    countersBlurb: (n: number) =>
      `${n} forms where the number changes shape — ろっぽん, ついたち, よじ.`,
    wordsBlurb: (n: number) =>
      `${n} core words, including the kana-only ones no kanji deck can reach.`,
    conjugationBlurb: (verbs: number, adjectives: number) =>
      `ます, て-form, ない and past, across ${verbs} verbs and ${adjectives} adjectives.`,
    particlesBlurb: (n: number) => `${n} sentences with a gap — は, が, を, に, で and the rest.`,
    readingBlurb: (n: number) =>
      `${n} short sentences that use the other decks together, with furigana on request.`,
    duolingoBlurb: (words: number, units: number) =>
      `${words} words across the course's ${units} units, in the order it teaches them.`,
    notPractised: 'not practised yet',
    practised: (seen: number, total: number, unit: string, accuracy: number) =>
      `${seen} of ${total} ${unit} practised · ${accuracy}% lifetime accuracy`,
    unit: {
      kana: 'kana',
      kanji: 'kanji',
      forms: 'forms',
      words: 'words',
      sentences: 'sentences',
    },
    exportProgress: 'Export progress',
    importProgress: 'Import progress',
    exported: 'Progress downloaded.',
    confirmImport: 'Importing replaces all saved progress on this device. Continue?',
    resetProgress: 'Reset saved progress',
    confirmReset: 'Clear all saved progress? This cannot be undone.',
    cleared: 'Progress cleared.',
  },

  quiz: {
    endless: 'Endless — stop whenever you like',
    toGo: (n: number) => `${n} card${n === 1 ? '' : 's'} to go`,
    finish: 'Finish',
    correctLabel: 'correct',
    accuracyLabel: 'accuracy',
    streakLabel: 'streak',
    playAgain: 'Play it again',
    check: 'Check',
    dontKnow: 'I don’t know',
    next: 'Next',
    orPress: 'or press',
    enterKey: 'Enter',
    verdictCorrect: 'Correct',
    verdictWrong: (given: string) => `Not quite — you wrote “${given}”`,
    verdictRevealed: 'Answer',
    hear: (what: string) => `Hear ${what}`,
    hearIt: 'Hear it',
    autoAdvance: 'Move on automatically when correct',
    choiceTip: 'Tip: keys 1–4 pick an answer',
  },

  results: {
    nothingAnswered: 'Nothing answered this time.',
    clean: 'Clean sweep. Nothing missed.',
    solid: 'Solid — a few to tidy up.',
    another: 'Worth another pass.',
    ofCorrect: (correct: number, answered: number) => `${correct} of ${answered} correct`,
    bestStreak: 'best streak',
    seconds: (s: number) => `${s}s`,
    minutes: (m: number, s: number) => `${m}m ${s}s`,
    missed: (n: number) => `Missed this session (${n})`,
    missedHint: 'These are the ones worth another look.',
    practiseMissed: (n: number) => `Practise the ${n} you missed`,
    goAgain: 'Go again',
    changeSettings: 'Change settings',
  },

  setup: {
    kanaSelected: (kana: number, cards: number) => `${kana} kana selected · ${cards} cards`,
    kanjiSelected: (kanji: number, cards: number) => `${kanji} kanji selected · ${cards} cards`,
    wordsSelected: (words: number, cards: number) => `${words} words selected · ${cards} cards`,
    countersSelected: (items: number, cards: number) => `${items} selected · ${cards} cards`,
    cardCount: (n: number) => `${n} cards`,
    sentenceCount: (n: number) => `${n} sentences`,
    howAsked: 'How should you be asked?',
    anyCombination: 'Pick any combination.',
    anyCombinationEach: 'Pick any combination. Each mode can be typed or multiple choice.',
    start: (n: number) => `Start — ${n} cards`,
    startSentences: (n: number) => `Start — ${n} sentences`,
    pickARow: 'Pick at least one row',
    pickAGroup: 'Pick at least one group',
    pickASet: 'Pick at least one set',
    needsVoice: 'Needs a Japanese voice installed on this device.',

    whichScript: 'Which script?',
    whichScriptHint: 'Pick one or both. Choosing both practises them together.',
    whichKana: 'Which kana?',
    whichKanaHint: 'Rows of the syllabary — turn on only what you are working on.',
    wholeSectionOn: 'whole section on',

    whichKanji: 'Which kanji?',
    whichKanjiHint:
      'Turn on the groups you are studying, then switch off individual kanji you already know.',
    kanjiImeNote:
      'Meaning → kanji with typing needs a Japanese IME installed. Multiple choice works everywhere.',

    whichWords: 'Which words?',
    whichWordsHint:
      'Turn on the sets you are working on, then switch off anything you already know.',
    kanaOnlyNote: (n: number) =>
      `${n} of the selected words are written in kana already, so they get no reading card.`,
    wordImeNote:
      'Meaning → word with typing needs a Japanese IME. Multiple choice works everywhere.',

    readingSelected: (sentences: number, cards: number) =>
      `${sentences} sentences · ${cards} cards`,
    whichSentences: 'Which sentences?',
    whichSentencesHint: 'Grouped by the pattern they use, so a set hangs together.',
    furiganaNote: 'Furigana are hidden until you ask for them, so you read the kanji first.',
    duolingoSelected: (words: number, cards: number) =>
      `${words} words selected · ${cards} cards`,
    whichUnits: 'Which units?',
    whichUnitsHint:
      'The stretch of the course you have covered. Open a unit to switch off words you already ' +
      'have.',
    unitFrom: 'From unit',
    unitTo: 'to',
    everyUnit: 'Every unit',
    lastTen: 'Last ten',
    unitWords: (n: number) => `${n} words`,
    noUnitsInRange: 'Pick a range of units',
    howWritten: 'How should the Japanese be written?',
    howWrittenHint: 'This decides what you see, and what counts as an answer.',
    duolingoImeNote:
      'Meaning → word with typing needs a Japanese IME. Write the Japanese in kana or romaji ' +
      'instead, or answer by multiple choice, and it works anywhere.',
    noReadingNote: (n: number) =>
      `${n} of the selected words are phrases no dictionary gives a single reading for. They ` +
      'still get meaning and recall cards; they get no reading or listening card.',
    readingNeedsWord:
      'Reading cards are only asked when the Japanese is written the way the course writes it — ' +
      'there is nothing to work out about みず written みず.',

    whatToDrill: 'What do you want to drill?',
    whatToDrillHint:
      'Turn on the sets you are working on, then switch off anything you already have.',
    irregularNote: 'A dash above an item marks a sound change — 六本 rather than 六ほん.',

    whichConjugation: 'Which words?',
    whichConjugationHint:
      'Verb classes decide how a word conjugates, so they make the natural groups.',
    whichForms: 'Which forms?',
    whichFormsHint: 'Drill one form until it is automatic, or mix them.',
    verbs: 'Verbs',
    adjectives: 'Adjectives',
    pickAGroupFirst: 'Pick a group above and its forms will appear here.',
    conjugationInputNote:
      'Typed answers accept romaji, kana or the written form — かいて, kaite and 書いて all count.',

    whichParticles: 'Which particles?',
    whichParticlesHint:
      'Grouped by what the particle does, since that is what decides which one a sentence takes.',
    howAnswer: 'How should you answer?',
    particleNote:
      'Some sentences take more than one particle — 学校に行きます and 学校へ行きます are both ' +
      'right. Typing accepts either; multiple choice only ever offers one of them, so there is ' +
      'always exactly one correct option on screen.',
  },

  flow: {
    title: 'How do you want to practise?',
    label: {
      once: 'One pass',
      mistakes: 'Repeat mistakes',
      endless: 'Endless',
    } as Record<Flow, string>,
    blurb: {
      once: 'Every card once, then a summary.',
      mistakes: 'Anything you miss comes back until you get it.',
      endless: 'Keeps going, weak cards come round more often.',
    } as Record<Flow, string>,
    order: 'Order',
    ordered: 'In order',
    shuffled: 'Shuffled',
  },

  progress: {
    title: 'Progress',
    itemsKnown: (known: number, total: number) => `${known} of ${total} items known`,
    step: (n: number, total: number) => `step ${n} of ${total}`,
    planFinished: 'plan finished',
    whereYouAre: 'Where you are',
    whereYouAreHint: 'An item counts as known once it has survived a week — box 3 or higher.',
    knownOf: (known: number, total: number) => `${known}/${total} known`,
    learning: (n: number) => ` · ${n} learning`,
    barTitle: (known: number, learning: number) => `${known} known, ${learning} learning`,
    weekAhead: 'The week ahead',
    weekAheadHint: 'How many items fall due each day if you keep up.',
    nothingScheduled: 'Nothing scheduled yet. Answer something and the clock starts.',
    today: 'today',
    inDays: (n: number) => `+${n}`,
    thePlan: 'The plan',
    thePlanHint: 'Stages you have finished, and the one you are on.',
    trouble: 'Giving you the most trouble',
    troubleHint: 'Lowest accuracy across all your sessions.',
    conjugationNote: 'conjugation',
  },

  /** questions, placeholders and the lines revealed with an answer */
  card: {
    typeTheSound: 'Type the sound',
    pickThe: (script: string) => `Pick the ${script}`,
    alsoAccepted: (list: string) => `also accepted: ${list}`,
    whatDoesThisMean: 'What does this mean?',
    /** the language the expected answer is in, which is not always the interface's */
    meaningPlaceholder: (answerLang: Lang): string =>
      answerLang === 'nl' ? 'meaning in Dutch' : 'meaning in English',
    whichReading: 'Which reading belongs to this kanji?',
    typeAnyReading: 'Type any reading (on or kun)',
    romajiOrKana: 'romaji or kana',
    on: (list: string) => `on: ${list}`,
    kun: (list: string) => `kun: ${list}`,
    whichKanji: 'Which kanji is this?',
    writeTheKanji: 'Write the kanji (needs a Japanese IME)',
    theKanji: 'the kanji',
    howIsWordRead: 'How is this word read?',
    typeWordReading: 'Type the reading of this word',
    whichWordHeard: 'Which word did you hear?',
    writeWhatYouHear: 'Write down what you hear',
    howIsThisRead: 'How is this read?',
    typeTheReading: 'Type the reading',
    alsoRead: (list: string) => `also read ${list}`,
    soundShifts: '⚠ the reading shifts here — worth noting',
    whichOneHeard: 'Which one did you hear?',
    whichWord: 'Which word is this?',
    writeTheWord: 'Write the word (needs a Japanese IME)',
    theWord: 'the word',
    pickTheForm: 'Pick the right form',
    writeThisForm: 'Write this form',
    whichForm: 'Which form is this?',
    whichDictionaryForm: 'Which is the dictionary form?',
    writeDictionaryForm: 'Write the dictionary form',
    whatDoesThisSay: 'What does this say?',
    whatDidYouHear: 'What did you hear?',
    whichParticle: 'Which particle belongs in the gap?',
    theParticle: 'the particle',
    alsoWorks: (list: string) => `${list} also works here.`,
  },

  script: { hira: 'hiragana', kata: 'katakana' } as Record<KanaScript, string>,

  kanaSection: {
    gojuon: 'Gojūon — the basic 46',
    dakuten: 'Dakuten & handakuten — が ざ だ ば ぱ',
    yoon: 'Yōon — combinations like きゃ',
  } as Record<KanaSection, string>,

  kanaMode: {
    label: {
      recognition: 'Recognition — kana → sound',
      recall: 'Recall — sound → kana',
    } as Record<KanaMode, string>,
    blurb: {
      recognition: 'See か, type “ka”. This is the one to start with.',
      recall: 'See “ka”, pick か out of four. Harder, and it sticks better.',
    } as Record<KanaMode, string>,
  },

  kanjiMode: {
    label: {
      meaning: 'Kanji → meaning',
      reading: 'Kanji → reading',
      recall: 'Meaning → kanji',
      vocab: 'Vocabulary word',
      listening: 'Listening',
    } as Record<KanjiMode, string>,
    blurb: {
      meaning: 'See 日, answer “day / sun”.',
      reading: 'See 日, answer any on or kun reading.',
      recall: 'See “day / sun”, produce 日.',
      vocab: 'See 日本, answer the reading にほん.',
      listening: 'Hear にほん, write down what you heard.',
    } as Record<KanjiMode, string>,
  },

  counterMode: {
    label: {
      reading: 'Written → reading',
      meaning: 'Written → meaning',
      listening: 'Listening',
    } as Record<CounterMode, string>,
    blurb: {
      reading: 'See 六本, answer ろっぽん. This is where the sound changes live.',
      meaning: 'See 二十歳, answer “twenty years old”.',
      listening: 'Hear ろっぽん, work out which one it was.',
    } as Record<CounterMode, string>,
  },

  wordMode: {
    label: {
      meaning: 'Word → meaning',
      reading: 'Word → reading',
      recall: 'Meaning → word',
      listening: 'Listening',
    } as Record<WordMode, string>,
    blurb: {
      meaning: 'See 手紙, answer “letter”.',
      reading: 'See 手紙, answer てがみ. Skipped for words already written in kana.',
      recall: 'See “letter”, pick 手紙 out of four.',
      listening: 'Hear てがみ, work out which word it was.',
    } as Record<WordMode, string>,
  },

  /**
   * The reference screen. Its own block rather than more of `setup`, because
   * nothing here configures anything — it is the only screen in the app that
   * asks no question.
   */
  browse: {
    nav: 'Browse the material',
    title: 'The material',
    hint: 'Everything the app teaches, set out to be read. Nothing here is asked or scored.',
    whichDeck: 'What do you want to read?',
    practise: 'Practise this deck',
    searchPlaceholder: 'Japanese, romaji or a meaning',
    results: 'Matches',
    found: (n: number) => `${n} found`,
    noMatches: (query: string) => `Nothing matches “${query}”.`,
    showingFirst: (shown: number, total: number) =>
      `Showing the first ${shown} of ${total}. Narrow the search to see the rest.`,
    tapToHear: 'Click any kana to hear it.',
    soundChange: 'the sound shifts here',
  },

  duolingo: {
    fromUnit: (n: number, name: string) => `Unit ${n} · ${name}`,
    /** the "meaning → Japanese" question, which changes with the script */
    writeItAs: {
      word: 'Write the word (needs a Japanese IME)',
      kana: 'Write it in kana',
      romaji: 'Write it in romaji',
    } as Record<DuolingoScript, string>,
  },

  readingMode: {
    label: {
      meaning: 'Read it',
      listening: 'Hear it',
    } as Record<ReadingMode, string>,
    blurb: {
      meaning: 'Read the sentence and pick what it means.',
      listening: 'Hear the sentence and pick what it means.',
    } as Record<ReadingMode, string>,
  },

  duolingoMode: {
    label: {
      meaning: 'Japanese → meaning',
      recall: 'Meaning → Japanese',
      reading: 'Word → reading',
      listening: 'Listening',
    } as Record<DuolingoMode, string>,
    blurb: {
      meaning: 'See 食べます, answer “eat”.',
      recall: 'See “eat”, produce 食べます.',
      reading: 'See 食べます, answer たべます. Only for words written with kanji.',
      listening: 'Hear たべます, work out which word it was.',
    } as Record<DuolingoMode, string>,
  },

  duolingoScript: {
    label: {
      word: 'As the course writes it',
      kana: 'Kana',
      romaji: 'Romaji',
    } as Record<DuolingoScript, string>,
    blurb: {
      word: '食べます — kanji and all, the way it appears in the app.',
      kana: 'たべます — the same word without the kanji, and without an IME.',
      romaji: 'tabemasu — the gentlest of the three, and typeable anywhere.',
    } as Record<DuolingoScript, string>,
  },

  conjugationMode: {
    label: {
      produce: 'Produce the form',
      identify: 'Name the form',
      dictionary: 'Back to the dictionary form',
    } as Record<ConjugationMode, string>,
    blurb: {
      produce: 'See 書く and “て-form”, answer 書いて.',
      identify: 'See 書いて, work out which form it is.',
      dictionary: 'See 書きました, answer 書く.',
    } as Record<ConjugationMode, string>,
  },

  /**
   * The names of the grammatical forms. These are graded answers in the "name
   * the form" mode, not decoration, so they have to come from the same bundle
   * the rest of the session was built with.
   */
  verbForm: VERB_FORM_LABEL,
  adjectiveForm: ADJECTIVE_FORM_LABEL,

  wordKind: {
    noun: 'noun',
    verb: 'verb',
    adjective: 'adjective',
    adverb: 'adverb',
    expression: 'expression',
    pronoun: 'pronoun',
  } as Record<WordKind, string>,

  plan: {
    title: 'Your plan',
    nav: 'See the plan',
    subtitle: (known: number, total: number) => `${known} of ${total} items known`,

    paceTitle: 'How much, how often',
    paceHint:
      'This is the pace the app works to, not a wish: it sets how many new items your reviews ' +
      'are allowed to introduce.',
    newPerDay: 'New items a day',
    daysPerWeek: 'Days a week',
    weekly: (n: number) => `${n} new items a week`,
    budgetNote:
      'Two ceilings, not one: a sitting introduces at most that many new items, and a week at ' +
      'most that many times the days you picked. A day you skip is not carried forward into a ' +
      'double session — it shows up as a later date instead.',

    headline: (when: string) => `You would be through it around ${when}`,
    headlineDays: (when: string) => `You would be through it ${when}`,
    finished: 'You have been through the whole plan',
    finishedHint: 'Nothing left to introduce — from here it is upkeep, and whatever you fancy drilling.',
    inWeeks: (n: number) => `in about ${n} week${n === 1 ? '' : 's'}`,
    inMonths: (n: number) => `in about ${n} months`,
    caveat: (n: number) =>
      `That is the ${n} items this app teaches, at 90% known per stage. The exam itself also ` +
      'has listening and reading sections it does not cover.',

    costTitle: 'What that costs',
    busiest: (cards: number, minutes: number) =>
      `At its busiest, about ${cards} cards a session — roughly ${minutes} minutes.`,
    upkeep: (cards: number, minutes: number) =>
      `Once you are through, about ${cards} cards a session — ${minutes} minutes — holds on to it.`,
    measured: (seconds: number) => `Timed at ${seconds} seconds a card across your recent sessions.`,
    assumed: (seconds: number) =>
      `Assuming ${seconds} seconds a card, until you have practised enough to be timed.`,
    restDays: (days: number) =>
      `Reviews do not take days off: at ${days} day${days === 1 ? '' : 's'} a week the same cards ` +
      'arrive in fewer, longer sittings rather than going away.',
    accuracyNote: (percent: number) =>
      `Paced on your ${percent}% accuracy — a missed item drops to the bottom of the ladder and ` +
      'has to climb again.',

    timelineTitle: 'When each stage lands',
    timelineHint: 'At this pace, and assuming you keep to it.',
    stageDone: 'done',
  },

  gap: {
    underAnHour: 'in under an hour',
    hours: (n: number) => `in ${n} hour${n === 1 ? '' : 's'}`,
    tomorrow: 'tomorrow',
    days: (n: number) => `in ${n} days`,
  },

  storage: {
    notJson: 'That file is not valid JSON.',
    notAnExport: 'That does not look like a JapanLearner export.',
    restored: (n: number) => `Restored ${n} items.`,
  },
};

/** Every other language is held to this shape. */
export type Strings = typeof en;
