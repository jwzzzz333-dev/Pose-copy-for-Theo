/**
 * Audio Engine using Web Audio API for sound effects and Web Speech API for voice prompts.
 * Designed to be zero-dependency and toddler-friendly.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.speechSynth = window.speechSynthesis || null;
    this.speechEnabled = true;
    this.sfxEnabled = true;
    this.voice = null;

    this.initVoices();
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initVoices() {
    if (!this.speechSynth) return;
    const loadVoices = () => {
      const voices = this.speechSynth.getVoices();
      // Prefer friendly English female voice if available
      this.voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Samantha'))) ||
                   voices.find(v => v.lang.startsWith('en')) || null;
    };
    loadVoices();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = loadVoices;
    }
  }

  speak(text) {
    if (!this.speechEnabled || !this.speechSynth) return;
    try {
      this.speechSynth.cancel(); // Interrupt previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.voice) utterance.voice = this.voice;
      utterance.pitch = 1.2; // Cheerful slightly higher pitch for toddlers
      utterance.rate = 0.95; // Slightly slower, clear speech for toddlers
      utterance.volume = 1.0;
      this.speechSynth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  playPop() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playHoldProgress(progress) {
    // progress from 0.0 to 1.0
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const now = this.ctx.currentTime;

    // Pitch increases as pose is held!
    const baseFreq = 440; // A4
    const targetFreq = baseFreq + (progress * 440); // Rises to A5

    osc.frequency.setValueAtTime(targetFreq, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playSuccessChime() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    // Play cheerful major arpeggio: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.3, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.35);
    });
  }

  playLevelCompleteFanfare() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    // Cheerful fanfare chord progression
    const chord1 = [523.25, 659.25, 783.99]; // C Major
    const chord2 = [587.33, 698.46, 880.00]; // D Minor
    const chord3 = [659.25, 783.99, 1046.50]; // C Major higher

    const playChord = (notes, startTime, duration) => {
      notes.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    };

    const now = this.ctx.currentTime;
    playChord(chord1, now, 0.2);
    playChord(chord2, now + 0.22, 0.2);
    playChord(chord3, now + 0.44, 0.6);
  }

  playCountdownBeep(isFinal = false) {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    const freq = isFinal ? 880 : 440;

    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isFinal ? 0.3 : 0.15));

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + (isFinal ? 0.3 : 0.15));
  }
}

export const audioEngine = new AudioEngine();
