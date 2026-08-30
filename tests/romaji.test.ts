import { checkMeaning, checkReading, kanaToRomaji, romajiToKana, toHiragana } from '../src/lib/romaji';
import { eq } from './assert';

// Romaji -> kana, including sokuon, syllabic ん and the alternate spellings a
// learner is likely to type.
eq('nihon', romajiToKana('nihon'), 'にほん');
eq('kyou', romajiToKana('kyou'), 'きょう');
eq('gakkou', romajiToKana('gakkou'), 'がっこう');
eq('shinbun', romajiToKana('shinbun'), 'しんぶん');
eq('sanbyaku', romajiToKana('sanbyaku'), 'さんびゃく');
eq('nani (n before vowel)', romajiToKana('nani'), 'なに');
eq('nanji (n before consonant)', romajiToKana('nanji'), 'なんじ');
eq('hokkaidou', romajiToKana('hokkaidou'), 'ほっかいどう');
eq('ikkagetsu', romajiToKana('ikkagetsu'), 'いっかげつ');
eq('tuki (tu for tsu)', romajiToKana('tuki'), 'つき');
eq('sinbun (si for shi)', romajiToKana('sinbun'), 'しんぶん');
eq('trailing n', romajiToKana('hon'), 'ほん');
eq('nn for n', romajiToKana('honn'), 'ほん');

// Kana -> romaji, used for the answer reveal and as a second comparison path.
eq('reverse nihon', kanaToRomaji('にほん'), 'nihon');
eq('reverse gakkou', kanaToRomaji('がっこう'), 'gakkou');
eq('reverse kyou', kanaToRomaji('きょう'), 'kyou');
eq('reverse long mark', kanaToRomaji('コーヒー'), 'koohii');

// Pronunciation depends on the word, not just the kana character. These
// include a greeting, a phrase starting with は and one ending with it.
eq('hello uses the spoken wa', kanaToRomaji('こんにちは'), 'konnichiwa');
eq('good evening uses the spoken wa', kanaToRomaji('こんばんは'), 'konbanwa');
eq('name question ends in wa', kanaToRomaji('おなまえは'), 'onamaewa');
eq('phrase beginning with the topic particle', kanaToRomaji('はありますか'), 'waarimasuka');
eq('well then ends in wa', kanaToRomaji('それでは'), 'soredewa');
eq('actually ends in wa', kanaToRomaji('じつは'), 'jitsuwa');
eq('conjunction also uses wa', kanaToRomaji('または'), 'matawa');
eq('punctuation is preserved', kanaToRomaji('こんにちは！'), 'konnichiwa！');
eq('katakana greeting uses wa', kanaToRomaji('コンニチハ'), 'konnichiwa');
eq('normal ha at the start of a word', kanaToRomaji('はな'), 'hana');
eq('normal ha in the middle of a word', kanaToRomaji('ごはん'), 'gohan');
eq('normal ha at the end of a word', kanaToRomaji('はは'), 'haha');
eq('yes is not a topic particle', kanaToRomaji('はい'), 'hai');
eq('a similar verb keeps ha', kanaToRomaji('はいりますか'), 'hairimasuka');
eq('good morning keeps ha', kanaToRomaji('おはようございます'), 'ohayougozaimasu');
eq('do not change a phrase inside a longer word', kanaToRomaji('こんにちはいしゃ'), 'konnichihaisha');
eq('a standalone kana stays ha', kanaToRomaji('は'), 'ha');

eq('accept hello as pronounced', checkReading('konnichiwa', ['こんにちは']), true);
eq('accept good evening as pronounced', checkReading('konbanwa', ['こんばんは']), true);
eq('keep accepting IME spellings', checkReading('konnichiha', ['こんにちは']), true);
eq('keep accepting the written kana', checkReading('こんにちは', ['こんにちは']), true);
eq('a wrong pronunciation is still wrong', checkReading('wana', ['はな']), false);
eq('a bare reading does not become the particle', checkReading('wa', ['は']), false);

// Reading checks.
eq('reading: romaji', checkReading('nihon', ['にほん']), true);
eq('reading: on in katakana', checkReading('nichi', ['ニチ', 'ジツ']), true);
eq('reading: whole word with okurigana', checkReading('iku', ['い(く)']), true);
eq('reading: stem only', checkReading('i', ['い(く)']), true);
eq('reading: long vowel', checkReading('ookii', ['おお(きい)']), true);
eq('reading: sokuon', checkReading('hitotsu', ['ひと(つ)']), true);
eq('reading: kana typed directly', checkReading('にほん', ['にほん']), true);
eq('reading: katakana typed directly', checkReading('ニチ', ['ニチ']), true);
eq('reading: jikan', checkReading('jikan', ['じかん']), true);
eq('reading: juu', checkReading('juu', ['ジュウ']), true);
eq('reading: shou', checkReading('shou', ['ショウ']), true);
eq('reading: syou alternate', checkReading('syou', ['ショウ']), true);
eq('reading: rejects wrong', checkReading('neko', ['にほん']), false);
eq('reading: rejects blank', checkReading('  ', ['にほん']), false);

// Meaning checks.
eq('meaning: exact', checkMeaning('to go', ['to go']), true);
eq('meaning: without "to"', checkMeaning('go', ['to go']), true);
eq('meaning: any listed meaning', checkMeaning('sun', ['day', 'sun']), true);
eq('meaning: case and spacing', checkMeaning('  Day ', ['day', 'sun']), true);
eq('meaning: leading article', checkMeaning('a car', ['car', 'vehicle']), true);
eq('meaning: rejects wrong', checkMeaning('moon', ['day', 'sun']), false);
eq('meaning: rejects blank', checkMeaning('', ['day']), false);

eq('toHiragana', toHiragana('ニホン'), 'にほん');
