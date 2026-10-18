// ============================================================
// Audio Utility — German Speech Synthesis
// ============================================================

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakGerman(text: string, speed: number = 1.0, muted: boolean = false): void {
  if (muted || typeof window === 'undefined' || !window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = speed;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to find a German voice
  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find(
    (v) => v.lang === 'de-DE' || v.lang.startsWith('de')
  );
  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

export function isSpeaking(): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  return window.speechSynthesis.speaking;
}

// Preload voices (needed for some browsers)
export function preloadVoices(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    // Some browsers need this event
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}
