# 日本 JapanLearner

A practice app for learning Japanese, covering N5 across five decks: the kana,
the kanji, the counters and dates that never behave, the core vocabulary, and
how verbs and adjectives conjugate. It schedules your reviews, so
the daily question is "what's due?" rather than "what should I study?" — but
you can still pick exactly what to drill and how to be asked.

Built with React, TypeScript and Vite. Everything runs in the browser — no
account, no backend, no network calls. Progress is kept in `localStorage`.

![A kanji reading card answered correctly, with the on and kun readings and two example words revealed below](docs/screenshots/quiz.png)

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm test` | Romaji, session-engine, scheduling and dataset tests |
| `npm run check:data` | Cross-check the datasets against JMdict (needs network) |
| `npm run typecheck` | `tsc --noEmit` |

## Hiragana & katakana

All 104 kana — the basic 46, dakuten and handakuten (が ざ だ ば ぱ), and yōon
(きゃ しゃ ちゃ …). Practise hiragana, katakana, or both together, and switch
individual rows on and off so you only drill what you are actually working on.

- **Recognition** — see か, type `ka`.
- **Recall** — see `ka`, pick か out of four. Harder, and it sticks better.

## Kanji — JLPT N5

110 kanji arranged in nine themed groups, so you can study a coherent set rather
than an alphabetical slice:

| Group | Contents |
| --- | --- |
| Numbers & money | 一 二 三 … 百 千 万 円 |
| Time & days of the week | 日 月 火 水 木 金 土 曜 年 時 分 半 今 間 毎 週 |
| People & family | 人 男 女 子 母 父 友 先 生 名 |
| Nature & animals | 山 川 天 気 雨 花 空 田 石 犬 魚 |
| Position & direction | 上 下 中 外 前 後 左 右 東 西 南 北 |
| Everyday verbs | 行 来 見 聞 食 飲 言 話 読 書 入 出 立 休 買 |
| Adjectives & size | 大 小 高 安 新 古 長 白 多 少 |
| Places & things | 国 学 校 本 語 車 駅 店 会 社 電 何 |
| Body & other basics | 目 耳 口 手 足 力 体 文 字 正 |

Turn whole groups on or off, then exclude individual kanji you already know. Each
kanji carries its meanings, on'yomi, kun'yomi and two vocabulary words.

![The kanji picker with the time group expanded, each character showing a coloured mastery dot](docs/screenshots/setup.png)

The dot under each character is your lifetime accuracy on it — green, amber or
red — so you can see at a glance what to keep in and what to drop.

Four ways to be drilled, each independently set to **typing** or **multiple
choice**:

| Mode | You see | You answer |
| --- | --- | --- |
| Kanji → meaning | 日 | day / sun |
| Kanji → reading | 日 | ニチ, ジツ, ひ or か |
| Meaning → kanji | "day / sun" | 日 |
| Vocabulary | 日本 | にほん |
| Listening | 🔊 にほん | 日本 — にほん |

## Reviews

The home screen opens on what is due today. Answer it right and the item moves
up a box and comes back later; miss it and it drops back to daily.

| Box | Next review |
| --- | --- |
| 1 | tomorrow |
| 2 | in 3 days |
| 3 | in a week |
| 4 | in 2 weeks |
| 5 | in a month |

An item counts as known only if you answered it without a slip, so one miss
keeps it in the daily box.

Two rules keep this from becoming a chore. **Due items always come back**, even
if you have since unticked the group they live in — once you have started
learning 日 it should not quietly disappear. **New items only come from your
current selection**, at most 15 a day, so a fresh install is a manageable
handful rather than 300 cards.

Scheduling is per item, not per item-and-mode. Knowing 日 → "day" is admittedly
not the same as knowing 日 → ニチ, but scheduling those separately triples the
daily load, which is the surest way to stop reviewing at all. The review deck
picks a random enabled mode each time an item comes round, so both get
exercised over the weeks.

Practising a deck yourself never touches the schedule — drilling something ten
times in an afternoon should not push its next review out a month.

## Counters, dates & times

160 forms where the number changes shape in front of the counter. Nothing about
knowing 本 tells you that 一本 is いっぽん, 三本 is さんぼん and 六本 is ろっぽん,
so this is the part of N5 that has to be drilled rather than reasoned out.

| Set | What is in it |
| --- | --- |
| Things & people | つ and 人 — ひとつ…ここのつ, ひとり, ふたり, よにん |
| Long, flat & small | 本, 匹 and the mercifully regular 枚 |
| Cups, books & machines | 杯, 冊, 台 |
| Age | 歳, including 二十歳 = はたち |
| Days of the month | ついたち, ふつか, みっか … はつか |
| Telling the time | 時 and 分 — よじ, しちじ, くじ, いっぷん, ろっぷん |
| Months | しがつ, しちがつ, くがつ |
| Hundreds & thousands | さんびゃく, ろっぴゃく, はっぴゃく, さんぜん, はっせん |

Anything whose reading shifts is marked in the picker and called out when the
answer is revealed, so you learn the pattern rather than 160 separate facts.
Ask for the reading, the meaning, or hear it and write it down.

## Vocabulary — N5

230 core words in ten sets, including the ones a kanji deck can never reach
because they are simply written in kana: これ, それ, どこ, とても, たくさん,
ちょっと, ありがとう.

| Set | What is in it |
| --- | --- |
| This, that & which | The こそあど words and the question words |
| People & family | わたし, ともだち, お母さん, 先生 |
| Things around you | かばん, かさ, 時計, 手紙, 自転車 |
| Places | 学校, 銀行, 郵便局, 部屋 |
| Time words | 今日, 明日, 毎日, 先週 |
| Food & drink | ご飯, 野菜, お茶, 飲み物 |
| Verbs | 行く, 食べる, 分かる, 働く |
| Adjectives | 大きい, 新しい, 忙しい, 静か |
| Adverbs & useful words | とても, 少し, いつも, あまり |
| Greetings & set phrases | こんにちは, すみません, いただきます |

Ask for the meaning, the reading, the word from its meaning, or hear it and
write it down. Words already written in kana get no reading card, because the
answer would be the question.

Words that also appear as examples in the kanji deck — 食べる, 学校, 今日 —
share one schedule rather than being asked as two separate items.

## Checking the data

The datasets are hand-authored rather than imported. The obvious sources are
CC-BY-SA, and share-alike data inside an MIT repository is a licensing tangle
that is painful to unpick later. That keeps the licence clean but puts the
burden of correctness on the author, so correctness is checked two ways.

**Internally**, by `npm test`. Every reading must be kana and must survive the
app's own romaji conversion, every meaning must satisfy the matcher that grades
it, no two words may share a canonical meaning — otherwise "meaning → word"
has two defensible answers — and every multiple-choice question must have
exactly one correct option. The decks also overlap: 51 words and 24 counter
forms also appear as examples in the kanji deck, and where they overlap they
must agree.

**Externally**, by `npm run check:data`, which cross-references every entry
against JMdict through the Jisho API and reports readings that disagree,
meanings that are not corroborated, and forms with no dictionary entry at all.

```bash
npm run check:data            # the vocabulary deck
npm run check:data counters   # counters, dates and times
npm run check:data kanjivocab # the kanji deck's example words
npm run check:data verbs      # conjugation classes, against the POS tags
```

This only ever reads. Nothing fetched is written into the repository, so the
licensing question that kept JMdict out of the data files does not arise — it
is a reference being consulted, not a source being redistributed.

Not every finding is a bug. A form the dictionary does not list is usually
compositional (七台, 六千) and simply unverifiable this way; an uncorroborated
meaning is often just a simpler learner gloss. A **reading that disagrees** is
the one to take seriously. At the last run there were none, across 553
dictionary-backed entries.

## Conjugation

The one deck whose answers are not written down anywhere. Given a verb and its
class, every form is derived: 書く becomes 書きます, 書いて, 書かない and 書いた
by rule, so the forms are exactly as correct as the rules and the class are.

| | Forms |
| --- | --- |
| Verbs | ます, ません, ました, て-form, ない, plain past |
| い-adjectives | くない, かった, くなかった |
| な-adjectives | じゃない, だった, じゃなかった |

Grouped by class, because the class is what decides how a word behaves — with
帰る, 入る, 走る and 知る in their own group, since they end in る and conjugate
as godan anyway. Ask for the form, name a form you are shown, or work back to
the dictionary form. Typed answers accept romaji, kana or the written form:
かいて, `kaite` and 書いて all count.

That leaves the class as the only fallible input, and misfiling one verb would
make every one of its forms wrong. So `npm run check:data verbs` checks each
one against the dictionary's own part-of-speech tag, and the rules themselves
are pinned by a table of about sixty known conjugations.

## How a session runs

Pick the shape of the session independently of what is in it:

- **One pass** — every card once, then a summary.
- **Repeat mistakes** — anything you miss comes back a few cards later, and the
  session only ends once you have answered everything correctly.
- **Endless** — keeps going until you stop, with weak cards coming round more
  often.

Cards run in list order or shuffled. Correct answers advance automatically (you
can turn that off); misses wait so you can read the answer, the readings and the
example words. Typing `Enter` checks and continues; in multiple choice, keys
`1`–`4` pick an option.

The results screen shows accuracy, best streak and everything you missed, with a
one-click **practise the ones you missed** to drill just those.

## Look-alike options

Multiple choice is only as good as its wrong answers. Picking か out of か, ぬ,
ほ, り proves nothing; picking シ out of シ, ツ, ソ, ン is the distinction that
actually costs you marks. So when the options are characters, the app fills the
distractor slots with genuine look-alikes first and only falls back to random
ones when none are in your current selection.

It knows the usual traps in both scripts — シ/ツ/ソ/ン, ク/タ/ワ/ケ, ノ/メ/ヌ/ス,
ね/れ/わ, は/ほ/ま, さ/き/ち — and the kanji ones too: 木/本/休/体, 日/白/目/百,
人/入/八, 語/話/読/言, 聞/間, 母/毎.

## Audio

If your device has a Japanese voice installed, readings and vocabulary can be
played aloud: a speaker button appears next to the answer whenever a card is
revealed, and there is a **Listening** mode where the audio *is* the question —
you hear にほん and write down what you heard.

This uses the browser's built-in speech synthesis, so there is no network call
and nothing to install in the project. It does need a Japanese voice from the
operating system. On Windows that is **Settings → Time & language → Language &
region → Add a language → 日本語**, making sure *Speech* is included in the
optional features; then restart the browser. Without one, the Listening mode is
shown disabled and the speaker buttons stay hidden — everything else works
exactly as before.

## Answer checking

Typed readings are converted from romaji to kana, so the app accepts what a
learner would actually type:

| You type | Accepted as |
| --- | --- |
| `shi` / `si` | し |
| `tsu` / `tu` | つ |
| `fu` / `hu` | ふ |
| `ja` / `jya` / `zya` | じゃ |
| `gakkou` | がっこう (sokuon) |
| `shinbun`, `nanji` | しんぶん, なんじ (syllabic ん) |
| `hon` / `honn` | ほん |

You can also type kana directly. Readings stored as `い(く)` accept either the
stem (`i`) or the whole word (`iku`). Meanings ignore case, punctuation, leading
articles and a leading "to", so `go` and `to go` both count.

## Progress

Everything is stored in `localStorage`: lifetime accuracy per item, which drives
the *giving you the most trouble* list and the mastery dots in the kanji picker,
plus each item's box and due date.

Because that is one cleared cache away from gone, and a schedule represents
weeks of work that cannot be reconstructed, the home screen can export it all
as JSON and import it back. Importing replaces what is there and drops any
entry that is not shaped like real stats, so a malformed file cannot put a NaN
due date into the scheduler.

![The home screen showing both decks with lifetime accuracy and a list of the weakest kanji](docs/screenshots/home.png)

## Project layout

```
src/data/         kana, kanji, counter and vocabulary datasets, plus look-alikes
src/lib/romaji    romaji ⇄ kana conversion and answer matching
src/lib/session   the session engine (queue, flows, scoring)
src/lib/buildCards  turns a dataset + settings into practice cards
src/lib/conjugate the conjugation rules
src/lib/schedule  Leitner boxes: when an item comes back
src/lib/review    composes the deck for a review session
src/lib/storage   localStorage persistence
src/lib/speech    Japanese text-to-speech, and whether a voice exists
src/components/   home, the five setup screens, quiz, results
tests/            romaji, session-engine, scheduling and storage tests
scripts/          screenshot capture, and the JMdict cross-check
```

The session engine is deck-agnostic: every deck compiles down to a list of
`Card`s, each carrying its own prompt, accepted answers and grading function. So
adding a deck — N4 kanji, a vocabulary list — means writing a card builder, not
another quiz screen. The counters deck was exactly that: a dataset and a
builder, with the scheduler, the review flow and the audio all working on it
unchanged.

`npm test` covers the romaji conversion in both directions, the answer matching,
and the session flows. It also asserts two properties across the whole dataset:
every card accepts at least one answer derivable from what it displays, and every
multiple-choice question has exactly one correct option.

## Ideas for later

- Particle drills, and sentences built from them
- Stroke-order diagrams and handwriting practice
- N4 and beyond

## License

MIT — see [LICENSE](LICENSE).
