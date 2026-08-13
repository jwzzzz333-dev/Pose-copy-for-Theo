/**
 * Enhanced Audio Engine with expressive Speech Synthesis, 3-2-1 Countdown Beeps,
 * procedural continuous background music, and cheerful interjections.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.speechSynth = window.speechSynthesis || null;
    this.speechEnabled = true;
    this.sfxEnabled = true;
    this.bgMusicEnabled = true;
    this.voice = null;

    this.bgInterval = null;
    this.isBgPlaying = false;

    // Emotional toddler-friendly congratulatory interjections
    this.praisePhrases = [
      "Yippee! You are super fast!",
      "Woo-hoo! Unbelievable move!",
      "Aww yeah! You are a superstar!",
      "Oh wow! High five! You nailed it!",
      "Way to go! Fantastic job!",
      "Hooray! Perfect pose!",
      "Boom! You are totally unstoppable!",
      "Yes! You did it!"
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
      // Look for natural sounding female or expressive English voice
      this.voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Jenny'))) ||
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
      utterance.pitch = 1.35; // Bright, warm, expressive pitch
      utterance.rate = 1.0;
      utterance.volume = 1.0;
      this.speechSynth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  speakLevelPraise() {
    if (!this.speechEnabled) return;
    const phrase = this.praisePhrases[Math.floor(Math.random() * this.praisePhrases.length)];
    setTimeout(() => {
      this.speak(phrase);
    }, 350);
  }

  /* ----------------------------------------------------
   * 3-2-1 Countdown Audio Beeps
   * ---------------------------------------------------- */
  playCountdownNum(num) {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    const freqMap = { 3: 440, 2: 554.37, 1: 659.25 };
    osc.frequency.setValueAtTime(freqMap[num] || 523.25, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);

    this.speak(num.toString());
  }

  playCountdownGo() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);

    this.speak("GO!");
  }

  /* ----------------------------------------------------
   * Rich Continuous Background Music Loop
   * ---------------------------------------------------- */
  startBackgroundMusic() {
    if (this.isBgPlaying || !this.bgMusicEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    this.isBgPlaying = true;
    const melodyNotes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 293.66, 392.00];
    const bassNotes = [130.81, 174.61, 220.00, 196.00];
    let step = 0;

    this.bgInterval = setInterval(() => {
      if (!this.isBgPlaying || !this.bgMusicEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;

      // Bass note
      if (step % 4 === 0) {
        const bassFreq = bassNotes[(step / 4) % bassNotes.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(bassFreq, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }

      // Melody arp
      const noteFreq = melodyNotes[step % melodyNotes.length];
      const oscMelody = this.ctx.createOscillator();
      const gainMelody = this.ctx.createGain();
      oscMelody.type = 'sine';
      oscMelody.frequency.setValueAtTime(noteFreq, now);
      gainMelody.gain.setValueAtTime(0.035, now);
      gainMelody.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      oscMelody.connect(gainMelody);
      gainMelody.connect(this.ctx.destination);

      oscMelody.start(now);
      oscMelody.stop(now + 0.22);

      step = (step + 1) % 16;
    }, 260);
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

  playPop() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.08);

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
    const targetFreq = 440 + (progress * 480);

    osc.frequency.setValueAtTime(targetFreq, now);
    gain.gain.setValueAtTime(0.09, now);
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
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.3, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
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
