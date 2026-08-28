import { ALL_COUNTERS } from '../src/data/counters';
import { ALL_ADJECTIVES, ALL_VERBS } from '../src/data/conjugation';
import { ALL_KANJI } from '../src/data/kanji';
import { ALL_WORDS } from '../src/data/words';
import {
  ALL_PARTICLE_SENTENCES,
  BLANK,
  PARTICLES,
  PARTICLE_GROUPS,
  acceptedFor,
  filled,
} from '../src/data/particles';
import { buildParticleCards, particlePool, type ParticleConfig } from '../src/lib/buildCards';
import { eq, ok } from './assert';

const base: ParticleConfig = {
  groupIds: PARTICLE_GROUPS.map((g) => g.id),
  excluded: [],
  inputMode: 'choice',
  flow: 'once',
  order: 'ordered',
};

// ---------------------------------------------------------- data health

ok('every group has sentences', PARTICLE_GROUPS.every((g) => g.sentences.length > 0));
eq('no duplicate sentences',
  new Set(ALL_PARTICLE_SENTENCES.map((s) => s.text)).size, ALL_PARTICLE_SENTENCES.length);

// Exactly one gap, or the card cannot be rendered or graded.
const badBlanks = ALL_PARTICLE_SENTENCES.filter((s) => s.text.split(BLANK).length !== 2);
ok('every sentence has exactly one gap', badBlanks.length === 0,
  badBlanks.slice(0, 5).map((s) => s.text).join('; '));

// Every accepted answer must be a particle the deck knows, or it can never be
// offered as an option and the card becomes unanswerable in choice mode.
const strayParticles = ALL_PARTICLE_SENTENCES.flatMap((s) =>
  acceptedFor(s).filter((p) => !PARTICLES.includes(p)).map((p) => `${s.text}: ${p}`),
);
ok('every accepted answer is a known particle', strayParticles.length === 0,
  strayParticles.join('; '));

const dupAccepted = ALL_PARTICLE_SENTENCES.filter(
  (s) => new Set(acceptedFor(s)).size !== acceptedFor(s).length,
);
ok('no sentence lists an answer twice', dupAccepted.length === 0,
  dupAccepted.map((s) => s.text).join('; '));

/**
 * The collocation is what justifies the answer and what the corpus check
 * scores. If it is not actually part of the filled sentence it is checking
 * something else, and the justification is worthless.
 */
const detached = ALL_PARTICLE_SENTENCES.filter((s) => !filled(s).includes(s.collocation));
ok('every collocation is a fragment of its own sentence', detached.length === 0,
  detached.slice(0, 5).map((s) => `${filled(s)} ⊅ ${s.collocation}`).join('; '));

const withoutParticle = ALL_PARTICLE_SENTENCES.filter((s) => !s.collocation.includes(s.answer));
ok('every collocation contains the answer', withoutParticle.length === 0,
  withoutParticle.slice(0, 5).map((s) => s.collocation).join('; '));

ok('every sentence explains itself', ALL_PARTICLE_SENTENCES.every((s) => s.why.trim().length > 0));
ok('every sentence is translated', ALL_PARTICLE_SENTENCES.every((s) => s.english.trim().length > 0));

// Sentences should reuse material the app teaches rather than introducing new
// vocabulary, so a kanji here must appear somewhere across the other decks —
// not only in the kanji deck, since 部屋 and 勉強 are taught as words.
const taught = new Set<string>();
for (const text of [
  ...ALL_KANJI.map((k) => k.char),
  ...ALL_KANJI.flatMap((k) => k.vocab.map((v) => v.word)),
  ...ALL_WORDS.map((w) => w.word),
  ...ALL_COUNTERS.map((c) => c.form),
  ...ALL_VERBS.map((v) => v.word),
  ...ALL_ADJECTIVES.map((a) => a.word),
]) {
  for (const ch of text) taught.add(ch);
}
const untaught = new Set<string>();
for (const s of ALL_PARTICLE_SENTENCES) {
  for (const ch of s.text) {
    if (/[一-龯]/.test(ch) && !taught.has(ch)) untaught.add(ch);
  }
}
ok('sentences only use kanji taught elsewhere in the app', untaught.size === 0,
  [...untaught].join(' '));

// Each particle group should actually drill the particle it advertises.
for (const group of PARTICLE_GROUPS) {
  const answers = new Set(group.sentences.map((s) => s.answer));
  ok(`${group.id} drills more than one example`, group.sentences.length >= 5,
    `${group.sentences.length}`);
  ok(`${group.id} answers are consistent`, answers.size <= 3, [...answers].join(' '));
}

// ---------------------------------------------------------------- cards

const cards = buildParticleCards(base);
eq('one card per sentence', cards.length, ALL_PARTICLE_SENTENCES.length);
ok('the gap is shown, not the answer', cards.every((c) => c.prompt.includes(BLANK)));
ok('the translation is the hint', cards.every((c) => Boolean(c.promptNote)));
ok('the filled sentence is revealed', cards.every((c) => c.details![0].includes(c.answer.split(' / ')[0])));

/**
 * The important one. A sentence where both に and へ work must not offer both
 * as options, or the learner picks a correct answer and is marked wrong.
 */
const ambiguous: string[] = [];
for (const sentence of ALL_PARTICLE_SENTENCES) {
  const card = cards.find((c) => c.id === `particle-${sentence.text}`)!;
  const correct = card.choices!.filter((o) => card.check(o));
  if (correct.length !== 1) {
    ambiguous.push(`${sentence.text} — ${correct.length} correct options: ${correct.join(' ')}`);
  }
}
ok('exactly one option is correct on every card', ambiguous.length === 0,
  ambiguous.slice(0, 5).join('; '));

ok('the marked answer is always offered',
  ALL_PARTICLE_SENTENCES.every((s) =>
    cards.find((c) => c.id === `particle-${s.text}`)!.choices!.includes(s.answer),
  ));
ok('four options each', cards.every((c) => c.choices!.length === 4));

// Typing accepts any defensible answer, even the ones choice mode has to hide.
const typed = buildParticleCards({ ...base, inputMode: 'type' });
const destination = typed.find((c) => c.prompt === '学校＿行きます。')!;
ok('学校に行きます is accepted', destination.check('に'));
ok('学校へ行きます is also accepted', destination.check('へ'));
ok('学校で行きます is not', !destination.check('で'));
ok('and neither is nonsense', !destination.check('x'));

const object = typed.find((c) => c.prompt === 'パン＿食べます。')!;
ok('パンを食べます is accepted', object.check('を'));
ok('パンで食べます is rejected', !object.check('で'));

eq('card ids are unique', new Set(cards.map((c) => c.id)).size, cards.length);

// ------------------------------------------------------------ selection

eq('groups filter the pool',
  particlePool({ ...base, groupIds: ['wo'] }).length,
  PARTICLE_GROUPS.find((g) => g.id === 'wo')!.sentences.length);
eq('no groups means no cards', buildParticleCards({ ...base, groupIds: [] }).length, 0);
