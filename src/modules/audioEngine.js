/**
 * Audio Engine using Web Audio API for sound effects, procedural background music,
 * and Web Speech API for voice prompts & enthusiastic level congratulations.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.speechSynth = window.speechSynthesis || null;
    this.speechEnabled = true;
    this.sfxEnabled = true;
    this.bgMusicEnabled = true;
    this.voice = null;

    // Background Music Loop state
    this.bgInterval = null;
    this.isBgPlaying = false;

    // Encouraging praise list for toddlers after completing each level
    this.praisePhrases = [
      "Hooray! You are super fast!",
      "Unbelievable! Amazing move!",
      "Woohoo! You're a superstar!",
      "High five! You nailed it!",
      "Fantastic job! Keep going!",
      "Yay! Perfect pose!",
      "Awesome! You are unstoppable!",
      "Bravo! Great job!"
    ];

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
      this.speechSynth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.voice) utterance.voice = this.voice;
      utterance.pitch = 1.25; // Cheerful toddler-friendly pitch
      utterance.rate = 0.95;
      utterance.volume = 1.0;
      this.speechSynth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  // Speak randomized congratulatory praise after level achievement
  speakLevelPraise() {
    if (!this.speechEnabled) return;
    const phrase = this.praisePhrases[Math.floor(Math.random() * this.praisePhrases.length)];
    // Slight delay so fanfare plays first
    setTimeout(() => {
      this.speak(phrase);
    }, 400);
  }

  /* ----------------------------------------------------
   * Procedural Background Music Loop (Web Audio API)
   * ---------------------------------------------------- */
  startBackgroundMusic() {
    if (this.isBgPlaying || !this.bgMusicEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    this.isBgPlaying = true;

    // Cheerful pentatonic melody notes (C4, D4, E4, G4, A4, C5, D5, E5)
    const melodyNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    const bassNotes = [130.81, 146.83, 164.81, 196.00]; // C3, D3, E3, G3
    let step = 0;

    this.bgInterval = setInterval(() => {
      if (!this.isBgPlaying || !this.bgMusicEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;

      // Play soft bass note on beats 0, 4, 8, 12
      if (step % 4 === 0) {
        const bassFreq = bassNotes[(step / 4) % bassNotes.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(bassFreq, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }

      // Play soft cheerful melody arpeggio
      const noteFreq = melodyNotes[step % melodyNotes.length];
      const oscMelody = this.ctx.createOscillator();
      const gainMelody = this.ctx.createGain();

      oscMelody.type = 'sine';
      oscMelody.frequency.setValueAtTime(noteFreq, now);
      gainMelody.gain.setValueAtTime(0.03, now);
      gainMelody.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      oscMelody.connect(gainMelody);
      gainMelody.connect(this.ctx.destination);

      oscMelody.start(now);
      oscMelody.stop(now + 0.22);

      step = (step + 1) % 16;
    }, 280); // ~107 BPM gentle playful rhythm
  }

  stopBackgroundMusic() {
    this.isBgPlaying = false;
    if (this.bgInterval) {
      clearInterval(this.bgInterval);
      this.bgInterval = null;
    }
  }

  toggleBackgroundMusic() {
    this.bgMusicEnabled = !this.bgMusicEnabled;
    if (this.bgMusicEnabled) {
      this.startBackgroundMusic();
    } else {
      this.stopBackgroundMusic();
    }
    return this.bgMusicEnabled;
  }

  /* ----------------------------------------------------
   * Sound Effects
   * ---------------------------------------------------- */
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
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const now = this.ctx.currentTime;
    const targetFreq = 440 + (progress * 440);

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

    const chord1 = [523.25, 659.25, 783.99];
    const chord2 = [587.33, 698.46, 880.00];
    const chord3 = [659.25, 783.99, 1046.50];

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
}

export const audioEngine = new AudioEngine();
