/**
 * Interface text, in Dutch.
 *
 * Typed against `Strings`, so this file cannot drift out of step with English:
 * a key that goes missing, or a count function that loses an argument, fails
 * the build rather than the learner.
 *
 * Two choices worth writing down. Japanese grammatical terms keep their
 * Japanese names — て-vorm, ます-vorm — because that is what every Dutch course
 * and dictionary calls them, and translating them would make the app harder to
 * read alongside anything else. And the words a deck is graded on are content,
 * not interface: where a Dutch meaning has not been written yet the card falls
 * back to English, and the input placeholder says so rather than quietly
 * asking for the wrong language.
 */
import type { Strings } from './en';
import type { Lang } from './lang';

export const nl: Strings = {
  lang: 'nl' as Lang,
  name: 'Nederlands',

  common: {
    home: 'Home',
    settings: 'Instellingen',
    selectAll: 'Alles selecteren',
    clear: 'Wissen',
    everything: 'Alles',
    nothing: 'Niets',
    type: 'Typen',
    choose: 'Kiezen',
    language: 'Taal',
  },

  deck: {
    kana: 'Hiragana & katakana',
    kanji: 'Kanji — JLPT N5',
    kanjiShort: 'Kanji',
    counters: 'Telwoorden, datums & tijden',
    words: 'Woordenschat — N5',
    wordsShort: 'Woordenschat',
    conjugation: 'Vervoeging',
    particles: 'Partikels',
    duolingo: 'Duolingo — de woordenlijst van de cursus',
    duolingoShort: 'Duolingo',
    reading: 'Lezen',
  },

  run: {
    review: 'Herhaling',
    kana: 'Hiragana & katakana',
    kanji: 'Kanji — N5',
    counters: 'Telwoorden, datums & tijden',
    words: 'Woordenschat — N5',
    conjugation: 'Vervoeging',
    particles: 'Partikels',
    duolingo: 'Duolingo-woorden',
    reading: 'Lezen',
  },

  home: {
    intro:
      'Zeven decks die N5 afdekken: de kana, de kanji, de telwoorden die zich nooit gedragen, ' +
      'de kernwoordenschat, hoe werkwoorden en bijvoeglijke naamwoorden vervoegen, welk ' +
      'partikel een zin nodig heeft, en hele zinnen lezen. Herhaal wat aan de beurt is, of ' +
      'kies een deck en oefen precies wat je wilt. Daarnaast staat de woordenlijst van de ' +
      'Duolingo-cursus, unit voor unit, om terug te gaan over wat die je geleerd heeft.',
    step: (n, total) => `Stap ${n} van ${total}`,
    known: (known, total) => `${known} van ${total} beheerst`,
    planDone: 'Je bent het hele plan doorgelopen',
    planDoneHint: 'Blijf herhalen, of kies een deck en oefen waar je zin in hebt.',
    seeProgress: 'Voortgang bekijken',
    studyThis: 'Dit oefenen',
    readyToReview: 'Klaar om te herhalen',
    nothingDue: 'Niets aan de beurt',
    toReview: 'te herhalen',
    fresh: 'nieuw',
    aboutMinutes: (n) => `ongeveer ${n} ${n === 1 ? 'minuut' : 'minuten'}`,
    nextReview: (gap) => `Volgende herhaling ${gap}.`,
    nothingScheduled:
      'Kies hieronder een deck en ga oefenen — wat je goed hebt, zet de klok in gang.',
    review: (n) => `Herhaal ${n}`,
    kanaBlurb: (n) =>
      `Alle ${n} kana, inclusief dakuten en yōon. Typ de klank, of kies het teken.`,
    kanjiBlurb: (n) =>
      `${n} kanji in negen groepen. Betekenissen, lezingen, terughalen en woorden.`,
    countersBlurb: (n) =>
      `${n} vormen waarin het getal van gedaante verandert — ろっぽん, ついたち, よじ.`,
    wordsBlurb: (n) =>
      `${n} kernwoorden, ook de woorden die alleen in kana bestaan en die geen kanji-deck bereikt.`,
    conjugationBlurb: (verbs, adjectives) =>
      `ます, て-vorm, ない en verleden tijd, over ${verbs} werkwoorden en ${adjectives} ` +
      'bijvoeglijke naamwoorden.',
    particlesBlurb: (n) => `${n} zinnen met een gat — は, が, を, に, で en de rest.`,
    readingBlurb: (n) =>
      `${n} korte zinnen die de andere decks samen gebruiken, met furigana als je erom vraagt.`,
    duolingoBlurb: (words, units) =>
      `${words} woorden uit de ${units} units van de cursus, in de volgorde waarin die ze aanbiedt.`,
    notPractised: 'nog niet geoefend',
    practised: (seen, total, unit, accuracy) =>
      `${seen} van ${total} ${unit} geoefend · ${accuracy}% goed sinds het begin`,
    unit: {
      kana: 'kana',
      kanji: 'kanji',
      forms: 'vormen',
      words: 'woorden',
      sentences: 'zinnen',
    },
    exportProgress: 'Voortgang exporteren',
    importProgress: 'Voortgang importeren',
    exported: 'Voortgang gedownload.',
    confirmImport:
      'Importeren vervangt alle opgeslagen voortgang op dit apparaat. Wil je doorgaan?',
    resetProgress: 'Voortgang wissen',
    confirmReset: 'Alle opgeslagen voortgang wissen? Dit kan niet ongedaan worden gemaakt.',
    cleared: 'Voortgang gewist.',
  },

  quiz: {
    endless: 'Eindeloos — stop wanneer je wilt',
    toGo: (n) => `nog ${n} ${n === 1 ? 'kaart' : 'kaarten'}`,
    finish: 'Stoppen',
    correctLabel: 'goed',
    accuracyLabel: 'goed',
    streakLabel: 'reeks',
    playAgain: 'Speel nog eens af',
    check: 'Nakijken',
    dontKnow: 'Ik weet het niet',
    next: 'Volgende',
    orPress: 'of druk op',
    enterKey: 'Enter',
    verdictCorrect: 'Goed',
    verdictWrong: (given) => `Net niet — je schreef “${given}”`,
    verdictRevealed: 'Antwoord',
    hear: (what) => `Beluister ${what}`,
    hearIt: 'Beluisteren',
    autoAdvance: 'Automatisch door bij een goed antwoord',
    choiceTip: 'Tip: met de toetsen 1–4 kies je een antwoord',
  },

  results: {
    nothingAnswered: 'Deze keer niets beantwoord.',
    clean: 'Alles goed. Niets gemist.',
    solid: 'Degelijk — een paar om bij te schaven.',
    another: 'Nog een ronde is de moeite waard.',
    ofCorrect: (correct, answered) => `${correct} van ${answered} goed`,
    bestStreak: 'langste reeks',
    seconds: (s) => `${s}s`,
    minutes: (m, s) => `${m}m ${s}s`,
    missed: (n) => `Deze sessie gemist (${n})`,
    missedHint: 'Deze zijn een tweede blik waard.',
    practiseMissed: (n) => `Oefen de ${n} die je miste`,
    goAgain: 'Nog een keer',
    changeSettings: 'Instellingen wijzigen',
  },

  setup: {
    kanaSelected: (kana, cards) => `${kana} kana geselecteerd · ${cards} kaarten`,
    kanjiSelected: (kanji, cards) => `${kanji} kanji geselecteerd · ${cards} kaarten`,
    wordsSelected: (words, cards) => `${words} woorden geselecteerd · ${cards} kaarten`,
    countersSelected: (items, cards) => `${items} geselecteerd · ${cards} kaarten`,
    cardCount: (n) => `${n} kaarten`,
    sentenceCount: (n) => `${n} zinnen`,
    howAsked: 'Hoe wil je bevraagd worden?',
    anyCombination: 'Kies elke combinatie die je wilt.',
    anyCombinationEach:
      'Kies elke combinatie die je wilt. Elke vorm kan getypt of meerkeuze zijn.',
    start: (n) => `Start — ${n} kaarten`,
    startSentences: (n) => `Start — ${n} zinnen`,
    pickARow: 'Kies minstens één rij',
    pickAGroup: 'Kies minstens één groep',
    pickASet: 'Kies minstens één set',
    needsVoice: 'Vereist een Japanse stem op dit apparaat.',

    whichScript: 'Welk schrift?',
    whichScriptHint: 'Kies er één of allebei. Allebei oefen je ze door elkaar.',
    whichKana: 'Welke kana?',
    whichKanaHint: 'De rijen van het syllabenschrift — zet alleen aan waar je mee bezig bent.',
    wholeSectionOn: 'hele sectie aan',

    whichKanji: 'Welke kanji?',
    whichKanjiHint:
      'Zet de groepen aan die je bestudeert, en schakel daarna de kanji uit die je al kent.',
    kanjiImeNote:
      'Betekenis → kanji met typen vereist een Japanse IME. Meerkeuze werkt overal.',

    whichWords: 'Welke woorden?',
    whichWordsHint:
      'Zet de sets aan waar je mee bezig bent, en schakel daarna uit wat je al kent.',
    kanaOnlyNote: (n) =>
      `${n} van de gekozen woorden staan al in kana, dus die krijgen geen leeskaart.`,
    wordImeNote: 'Betekenis → woord met typen vereist een Japanse IME. Meerkeuze werkt overal.',

    readingSelected: (sentences, cards) => `${sentences} zinnen · ${cards} kaarten`,
    whichSentences: 'Welke zinnen?',
    whichSentencesHint: 'Gegroepeerd op het patroon dat ze gebruiken, zodat een set samenhangt.',
    furiganaNote: 'Furigana blijven verborgen tot je erom vraagt, zodat je eerst de kanji leest.',
    duolingoSelected: (words, cards) => `${words} woorden geselecteerd · ${cards} kaarten`,
    whichUnits: 'Welke units?',
    whichUnitsHint:
      'Het stuk van de cursus dat je gehad hebt. Klap een unit open om woorden uit te zetten ' +
      'die je al kent.',
    unitFrom: 'Van unit',
    unitTo: 'tot',
    everyUnit: 'Alle units',
    lastTen: 'Laatste tien',
    unitWords: (n) => `${n} woorden`,
    noUnitsInRange: 'Kies een reeks units',
    howWritten: 'Hoe moet het Japans geschreven worden?',
    howWrittenHint: 'Dit bepaalt wat je ziet, en wat als antwoord telt.',
    showRomaji: 'Toon romaji naast het Japans',
    showRomajiHint:
      'Toon de uitspraak in Latijnse letters, zoals 食べます · tabemasu, zonder te veranderen ' +
      'hoe je antwoordt. Lees- en luistervragen verklappen het antwoord niet.',
    duolingoImeNote:
      'Betekenis → woord met typen vereist een Japanse IME. Schrijf het Japans in kana of ' +
      'romaji, of antwoord met meerkeuze, en het werkt overal.',
    noReadingNote: (n) =>
      `${n} van de geselecteerde woorden zijn uitdrukkingen waar geen woordenboek één lezing ` +
      'voor geeft. Die krijgen wel betekenis- en terughaalkaarten, maar geen lees- of ' +
      'luisterkaart.',
    readingNeedsWord:
      'Leeskaarten komen alleen langs als het Japans geschreven staat zoals de cursus het ' +
      'schrijft — aan みず geschreven als みず valt niets uit te zoeken.',

    whatToDrill: 'Wat wil je oefenen?',
    whatToDrillHint:
      'Zet de sets aan waar je mee bezig bent, en schakel daarna uit wat je al beheerst.',
    irregularNote:
      'Een streepje boven een item betekent een klankverandering — 六本 in plaats van 六ほん.',

    whichConjugation: 'Welke woorden?',
    whichConjugationHint:
      'De werkwoordklasse bepaalt hoe een woord vervoegt, dus dat zijn de natuurlijke groepen.',
    whichForms: 'Welke vormen?',
    whichFormsHint: 'Oefen één vorm tot hij automatisch gaat, of meng ze.',
    verbs: 'Werkwoorden',
    adjectives: 'Bijvoeglijke naamwoorden',
    pickAGroupFirst: 'Kies hierboven een groep en de bijbehorende vormen verschijnen hier.',
    conjugationInputNote:
      'Getypte antwoorden accepteren romaji, kana of de geschreven vorm — かいて, kaite en 書いて ' +
      'tellen alle drie.',

    whichParticles: 'Welke partikels?',
    whichParticlesHint:
      'Gegroepeerd naar wat het partikel doet, want dat bepaalt welke een zin nodig heeft.',
    howAnswer: 'Hoe wil je antwoorden?',
    particleNote:
      'Sommige zinnen kunnen meer dan één partikel hebben — 学校に行きます en 学校へ行きます zijn ' +
      'allebei goed. Bij typen wordt elk van beide geaccepteerd; bij meerkeuze staat er altijd ' +
      'maar één van op het scherm, zodat er precies één juist antwoord is.',
  },

  flow: {
    title: 'Hoe wil je oefenen?',
    label: {
      once: 'Eén ronde',
      mistakes: 'Fouten herhalen',
      endless: 'Eindeloos',
    },
    blurb: {
      once: 'Elke kaart één keer, daarna een overzicht.',
      mistakes: 'Alles wat je mist, komt terug tot je het goed hebt.',
      endless: 'Blijft doorgaan; zwakke kaarten komen vaker langs.',
    },
    order: 'Volgorde',
    ordered: 'Op volgorde',
    shuffled: 'Door elkaar',
  },

  progress: {
    title: 'Voortgang',
    itemsKnown: (known, total) => `${known} van ${total} items beheerst`,
    step: (n, total) => `stap ${n} van ${total}`,
    planFinished: 'plan afgerond',
    whereYouAre: 'Waar je staat',
    whereYouAreHint:
      'Een item geldt als beheerst zodra het een week heeft overleefd — doos 3 of hoger.',
    knownOf: (known, total) => `${known}/${total} beheerst`,
    learning: (n) => ` · ${n} in ontwikkeling`,
    barTitle: (known, learning) => `${known} beheerst, ${learning} in ontwikkeling`,
    weekAhead: 'De week vooruit',
    weekAheadHint: 'Hoeveel items er elke dag aan de beurt zijn als je bijblijft.',
    nothingScheduled: 'Nog niets ingepland. Beantwoord iets en de klok gaat lopen.',
    today: 'vandaag',
    inDays: (n) => `+${n}`,
    thePlan: 'Het plan',
    thePlanHint: 'De stappen die je hebt afgerond, en die waar je nu bent.',
    trouble: 'Waar je de meeste moeite mee hebt',
    troubleHint: 'Het laagste percentage goed over al je sessies.',
    conjugationNote: 'vervoeging',
  },

  card: {
    typeTheSound: 'Typ de klank',
    pickThe: (script) => `Kies de ${script}`,
    alsoAccepted: (list) => `ook goed: ${list}`,
    whatDoesThisMean: 'Wat betekent dit?',
    meaningPlaceholder: (answerLang) =>
      answerLang === 'nl' ? 'betekenis in het Nederlands' : 'betekenis in het Engels',
    whichReading: 'Welke lezing hoort bij deze kanji?',
    typeAnyReading: 'Typ een willekeurige lezing (on of kun)',
    romajiOrKana: 'romaji of kana',
    on: (list) => `on: ${list}`,
    kun: (list) => `kun: ${list}`,
    whichKanji: 'Welke kanji is dit?',
    writeTheKanji: 'Schrijf de kanji (vereist een Japanse IME)',
    theKanji: 'de kanji',
    howIsWordRead: 'Hoe wordt dit woord gelezen?',
    typeWordReading: 'Typ de lezing van dit woord',
    whichWordHeard: 'Welk woord hoorde je?',
    writeWhatYouHear: 'Schrijf op wat je hoort',
    howIsThisRead: 'Hoe wordt dit gelezen?',
    typeTheReading: 'Typ de lezing',
    alsoRead: (list) => `ook gelezen als ${list}`,
    soundShifts: '⚠ hier verschuift de lezing — het onthouden waard',
    whichOneHeard: 'Welke hoorde je?',
    whichWord: 'Welk woord is dit?',
    writeTheWord: 'Schrijf het woord (vereist een Japanse IME)',
    theWord: 'het woord',
    pickTheForm: 'Kies de juiste vorm',
    writeThisForm: 'Schrijf deze vorm',
    whichForm: 'Welke vorm is dit?',
    whichDictionaryForm: 'Welke is de woordenboekvorm?',
    writeDictionaryForm: 'Schrijf de woordenboekvorm',
    whatDoesThisSay: 'Wat staat hier?',
    whatDidYouHear: 'Wat hoorde je?',
    whichParticle: 'Welk partikel hoort in het gat?',
    theParticle: 'het partikel',
    alsoWorks: (list) => `${list} kan hier ook.`,
  },

  script: { hira: 'hiragana', kata: 'katakana' },

  kanaSection: {
    gojuon: 'Gojūon — de basis 46',
    dakuten: 'Dakuten & handakuten — が ざ だ ば ぱ',
    yoon: 'Yōon — combinaties zoals きゃ',
  },

  kanaMode: {
    label: {
      recognition: 'Herkennen — kana → klank',
      recall: 'Terughalen — klank → kana',
    },
    blurb: {
      recognition: 'Je ziet か, je typt “ka”. Hiermee begin je.',
      recall: 'Je ziet “ka”, je kiest か uit vier. Lastiger, en het blijft beter hangen.',
    },
  },

  kanjiMode: {
    label: {
      meaning: 'Kanji → betekenis',
      reading: 'Kanji → lezing',
      recall: 'Betekenis → kanji',
      vocab: 'Woord uit de woordenschat',
      listening: 'Luisteren',
    },
    blurb: {
      meaning: 'Je ziet 日, je antwoordt “dag / zon”.',
      reading: 'Je ziet 日, je antwoordt een on- of kun-lezing.',
      recall: 'Je ziet “dag / zon”, je schrijft 日.',
      vocab: 'Je ziet 日本, je antwoordt de lezing にほん.',
      listening: 'Je hoort にほん, je schrijft op wat je hoorde.',
    },
  },

  counterMode: {
    label: {
      reading: 'Geschreven → lezing',
      meaning: 'Geschreven → betekenis',
      listening: 'Luisteren',
    },
    blurb: {
      reading: 'Je ziet 六本, je antwoordt ろっぽん. Hier zitten de klankveranderingen.',
      meaning: 'Je ziet 二十歳, je antwoordt “twintig jaar oud”.',
      listening: 'Je hoort ろっぽん, je zoekt uit welke het was.',
    },
  },

  wordMode: {
    label: {
      meaning: 'Woord → betekenis',
      reading: 'Woord → lezing',
      recall: 'Betekenis → woord',
      listening: 'Luisteren',
    },
    blurb: {
      meaning: 'Je ziet 手紙, je antwoordt “brief”.',
      reading: 'Je ziet 手紙, je antwoordt てがみ. Woorden die al in kana staan, slaan we over.',
      recall: 'Je ziet “brief”, je kiest 手紙 uit vier.',
      listening: 'Je hoort てがみ, je zoekt uit welk woord het was.',
    },
  },

  browse: {
    nav: 'Blader door de stof',
    title: 'De stof',
    hint: 'Alles wat de app leert, om te lezen. Hier wordt niets gevraagd en niets geteld.',
    whichDeck: 'Wat wil je lezen?',
    practise: 'Dit deck oefenen',
    searchPlaceholder: 'Japans, romaji of een betekenis',
    results: 'Gevonden',
    found: (n) => `${n} gevonden`,
    noMatches: (query) => `Niets komt overeen met “${query}”.`,
    showingFirst: (shown, total) =>
      `De eerste ${shown} van ${total} staan hier. Zoek preciezer om de rest te zien.`,
    tapToHear: 'Klik op een kana om hem te horen.',
    soundChange: 'hier verschuift de klank',
  },

  duolingo: {
    fromUnit: (n, name) => `Unit ${n} · ${name}`,
    writeItAs: {
      word: 'Schrijf het woord (vereist een Japanse IME)',
      kana: 'Schrijf het in kana',
      romaji: 'Schrijf het in romaji',
    },
  },

  readingMode: {
    label: {
      meaning: 'Lees het',
      listening: 'Hoor het',
    },
    blurb: {
      meaning: 'Lees de zin en kies wat hij betekent.',
      listening: 'Hoor de zin en kies wat hij betekent.',
    },
  },

  duolingoMode: {
    label: {
      meaning: 'Japans → betekenis',
      recall: 'Betekenis → Japans',
      reading: 'Woord → lezing',
      listening: 'Luisteren',
    },
    blurb: {
      meaning: 'Je ziet 食べます, je antwoordt “eten”.',
      recall: 'Je ziet “eten”, je maakt er 食べます van.',
      reading: 'Je ziet 食べます, je antwoordt たべます. Alleen voor woorden met kanji.',
      listening: 'Je hoort たべます, je zoekt uit welk woord het was.',
    },
  },

  duolingoScript: {
    label: {
      word: 'Zoals de cursus het schrijft',
      kana: 'Kana',
      romaji: 'Romaji',
    },
    blurb: {
      word: '食べます — mét de kanji, zoals het in de app staat.',
      kana: 'たべます — hetzelfde woord zonder kanji, en zonder IME.',
      romaji: 'tabemasu — de zachtste van de drie, en overal te typen.',
    },
  },

  conjugationMode: {
    label: {
      produce: 'De vorm maken',
      identify: 'De vorm benoemen',
      dictionary: 'Terug naar de woordenboekvorm',
    },
    blurb: {
      produce: 'Je ziet 書く en “て-vorm”, je antwoordt 書いて.',
      identify: 'Je ziet 書いて, je zoekt uit welke vorm dat is.',
      dictionary: 'Je ziet 書きました, je antwoordt 書く.',
    },
  },

  verbForm: {
    masu: 'beleefd (ます)',
    masen: 'beleefd ontkennend (ません)',
    mashita: 'beleefd verleden (ました)',
    te: 'て-vorm',
    nai: 'gewoon ontkennend (ない)',
    ta: 'gewoon verleden (た)',
  },

  adjectiveForm: {
    negative: 'ontkennend',
    past: 'verleden',
    pastNegative: 'ontkennend verleden',
  },

  wordKind: {
    noun: 'zelfstandig naamwoord',
    verb: 'werkwoord',
    adjective: 'bijvoeglijk naamwoord',
    adverb: 'bijwoord',
    expression: 'uitdrukking',
    pronoun: 'voornaamwoord',
  },

  plan: {
    title: 'Jouw plan',
    nav: 'Bekijk het plan',
    subtitle: (known, total) => `${known} van ${total} items beheerst`,

    paceTitle: 'Hoeveel, hoe vaak',
    paceHint:
      'Dit is het tempo waar de app zich aan houdt, geen wens: het bepaalt hoeveel nieuwe items ' +
      'je herhalingen mogen introduceren.',
    newPerDay: 'Nieuwe items per dag',
    daysPerWeek: 'Dagen per week',
    weekly: (n) => `${n} nieuwe items per week`,
    budgetNote:
      'Twee plafonds, niet één: één zitting introduceert hooguit zoveel nieuwe items, en een ' +
      'week hooguit dat maal het aantal dagen dat je koos. Een overgeslagen dag wordt niet ' +
      'ingehaald in een dubbele sessie — die zie je terug als een latere datum.',

    headline: (when) => `Hier ben je rond ${when} doorheen`,
    headlineDays: (when) => `Hier ben je ${when} doorheen`,
    finished: 'Je bent het hele plan doorgekomen',
    finishedHint: 'Niets meer te introduceren — vanaf hier is het onderhoud, en waar je zin in hebt.',
    inWeeks: (n) => `over ongeveer ${n} ${n === 1 ? 'week' : 'weken'}`,
    inMonths: (n) => `over ongeveer ${n} maanden`,
    caveat: (n) =>
      `Dat zijn de ${n} items die deze app behandelt, met 90% beheerst per etappe. Het examen ` +
      'zelf heeft daarnaast onderdelen luisteren en lezen die hier niet in zitten.',

    costTitle: 'Wat dat kost',
    busiest: (cards, minutes) =>
      `Op het drukst zo'n ${cards} kaarten per sessie — ongeveer ${minutes} minuten.`,
    upkeep: (cards, minutes) =>
      `Als je er doorheen bent houdt zo'n ${cards} kaarten per sessie — ${minutes} minuten — het vast.`,
    measured: (seconds) => `Gemeten op ${seconds} seconden per kaart over je recente sessies.`,
    assumed: (seconds) =>
      `Uitgaand van ${seconds} seconden per kaart, tot je genoeg geoefend hebt om gemeten te worden.`,
    restDays: (days) =>
      `Herhalingen nemen geen vrij: bij ${days} ${days === 1 ? 'dag' : 'dagen'} per week komen ` +
      'dezelfde kaarten in minder, langere zittingen terug in plaats van te verdwijnen.',
    accuracyNote: (percent) =>
      `Gebaseerd op je ${percent}% nauwkeurigheid — een gemist item valt terug naar de onderste ` +
      'doos en moet opnieuw omhoog.',

    timelineTitle: 'Wanneer elke etappe valt',
    timelineHint: 'Bij dit tempo, en als je het volhoudt.',
    stageDone: 'klaar',
  },

  gap: {
    underAnHour: 'binnen een uur',
    hours: (n) => `over ${n} uur`,
    tomorrow: 'morgen',
    days: (n) => `over ${n} dagen`,
  },

  storage: {
    notJson: 'Dat bestand is geen geldige JSON.',
    notAnExport: 'Dit lijkt geen export van JapanLearner te zijn.',
    restored: (n) => `${n} items hersteld.`,
  },
};
