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
