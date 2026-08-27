/**
 * Japanese text-to-speech via the browser's built-in speech synthesis.
 *
 * No dependencies and no network: it uses whatever Japanese voice the OS
 * provides (Windows 11 ships Nanami and Ayumi). Everything degrades quietly
 * when no Japanese voice is installed — callers check `useJapaneseVoice`.
 */
import { useEffect, useState } from 'react';

const JAPANESE = /^ja\b/i;

/** Slightly under natural pace: easier to catch as a learner. */
const RATE = 0.85;

export const speechSupported = (): boolean =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

/**
 * The voice list loads asynchronously and starts out empty, so this is not
 * cached: an empty list means "not ready yet", not "no voice".
 */
export function japaneseVoice(): SpeechSynthesisVoice | null {
  if (!speechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => JAPANESE.test(voice.lang)) ?? null;
}

/** Speak Japanese text. A no-op when no Japanese voice is available. */
export function speak(text: string): void {
  const voice = japaneseVoice();
  if (!voice || !text) return;

  // Cancel anything still playing so replays feel immediate.
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = RATE;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel();
}

/** True once a Japanese voice is available; re-checks when voices load. */
export function useJapaneseVoice(): boolean {
  const [available, setAvailable] = useState(() => japaneseVoice() !== null);

  useEffect(() => {
    if (available || !speechSupported()) return;

    // Touching getVoices() prompts some browsers to populate the list.
    const check = () => setAvailable(japaneseVoice() !== null);
    check();

    window.speechSynthesis.addEventListener('voiceschanged', check);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', check);
  }, [available]);

  return available;
}
