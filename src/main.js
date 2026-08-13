import { PoseDetector } from './modules/poseDetector.js';
import { CalibrationManager } from './modules/calibration.js';
import { PoseMatcher } from './modules/poseMatcher.js';
import { audioEngine } from './modules/audioEngine.js';
import { ParticleFX } from './modules/particleFX.js';
import { POSES } from './modules/poseDefinitions.js';

class GameEngine {
  constructor() {
    this.video = document.getElementById('webcam-video');
    this.canvas = document.getElementById('overlay-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.levelNumEl = document.getElementById('level-num');
    this.starCountEl = document.getElementById('star-count');
    this.feedbackBanner = document.getElementById('feedback-banner');
    this.holdRingProgress = document.getElementById('ring-progress');

    this.poseEmojiEl = document.getElementById('pose-emoji');
    this.poseNameEl = document.getElementById('pose-name');
    this.poseSvgContainer = document.getElementById('pose-svg-container');
    this.posePromptEl = document.getElementById('pose-prompt');

    this.calibrationModal = document.getElementById('calibration-modal');
    this.calibTitle = document.getElementById('calib-title');
    this.calibMsg = document.getElementById('calib-msg');
    this.calibProgress = document.getElementById('calib-progress');
    this.btnStartGame = document.getElementById('btn-start-game');

    this.countdownModal = document.getElementById('countdown-modal');
    this.countdownNumEl = document.getElementById('countdown-num');
    this.countdownPoseNameEl = document.getElementById('countdown-pose-name');

    this.victoryModal = document.getElementById('victory-modal');
    this.btnNextLevel = document.getElementById('btn-next-level');

    this.btnMusic = document.getElementById('btn-music');
    this.btnSound = document.getElementById('btn-sound');
    this.btnSpeech = document.getElementById('btn-speech');
    this.btnRecalibrate = document.getElementById('btn-recalibrate');
    this.btnSkip = document.getElementById('btn-skip');

    // Modules
    this.detector = new PoseDetector();
    this.calibration = new CalibrationManager();
    this.matcher = new PoseMatcher();
    this.particleFX = new ParticleFX();

    // Shuffled Pose Deck
    this.poseDeck = [];
    this.currentDeckIdx = 0;
    this.shufflePoseDeck();

    // State
    this.state = 'START_MODAL'; // START_MODAL, CALIBRATING, COUNTDOWN, PLAYING, MATCHED
    this.stars = 0;
    this.level = 1;

    this.holdFrames = 0;
    this.requiredHoldFrames = 35;
    this.isMatchComplete = false;

    this.bindEvents();
    this.updateTargetPoseUI();
  }

  // Fisher-Yates shuffle algorithm for random pose sequence
  shufflePoseDeck() {
    this.poseDeck = [...POSES];
    for (let i = this.poseDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.poseDeck[i], this.poseDeck[j]] = [this.poseDeck[j], this.poseDeck[i]];
    }
    this.currentDeckIdx = 0;
  }

  bindEvents() {
    this.btnStartGame.addEventListener('click', () => this.startCalibration());
    this.btnNextLevel.addEventListener('click', () => this.nextLevel());

    this.btnRecalibrate.addEventListener('click', () => this.startCalibration());
    this.btnSkip.addEventListener('click', () => this.nextLevel());

    this.btnMusic.addEventListener('click', () => {
      const enabled = audioEngine.toggleBackgroundMusic();
      this.btnMusic.textContent = enabled ? '🎵' : '🔇';
      audioEngine.playPop();
    });

    this.btnSound.addEventListener('click', () => {
      audioEngine.sfxEnabled = !audioEngine.sfxEnabled;
      this.btnSound.textContent = audioEngine.sfxEnabled ? '🔊' : '🔇';
    });

    this.btnSpeech.addEventListener('click', () => {
      audioEngine.speechEnabled = !audioEngine.speechEnabled;
      this.btnSpeech.textContent = audioEngine.speechEnabled ? '🗣️' : '🤫';
    });

    document.querySelectorAll('.seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        this.matcher.setDifficulty(mode);
        audioEngine.playPop();
      });
    });

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  async startCalibration() {
    audioEngine.playPop();
    audioEngine.startBackgroundMusic();

    this.calibrationModal.classList.remove('hidden');
    this.calibTitle.textContent = 'Setting up Camera...';
    this.calibMsg.textContent = 'Allow camera access in your browser!';

    try {
      if (!this.detector.isReady) {
        await this.detector.init(this.video);
      }
      this.resizeCanvas();
      this.calibration.reset();
      this.state = 'CALIBRATING';
      this.calibTitle.textContent = 'Golden Star Calibration';
      this.calibMsg.textContent = 'Step back so your body is inside the Golden Star Zone!';

      audioEngine.speak('Step back into the Golden Star Zone!');
      this.loop();
    } catch (err) {
      console.warn('Camera failed, using simulation mode:', err);
      this.calibrationModal.classList.add('hidden');
      this.runCountdown(() => {
        this.state = 'PLAYING';
      });
      this.loop();
    }
  }

  updateTargetPoseUI() {
    const currentPose = this.poseDeck[this.currentDeckIdx];
    this.poseEmojiEl.textContent = currentPose.emoji;
    this.poseNameEl.textContent = currentPose.name;
    this.posePromptEl.textContent = currentPose.prompt;

    this.poseSvgContainer.innerHTML = `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        ${currentPose.svgPath}
      </svg>
    `;
  }

  // 3-2-1 Countdown Overlay Sequence
  runCountdown(onComplete) {
    this.state = 'COUNTDOWN';
    const currentPose = this.poseDeck[this.currentDeckIdx];

    this.countdownModal.classList.remove('hidden');
    this.countdownPoseNameEl.textContent = `${currentPose.emoji} ${currentPose.name}`;

    audioEngine.speak(`Get ready for ${currentPose.name}!`);

    let count = 3;
    this.countdownNumEl.textContent = count;
    audioEngine.playCountdownNum(count);

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        this.countdownNumEl.textContent = count;
        audioEngine.playCountdownNum(count);
      } else if (count === 0) {
        this.countdownNumEl.textContent = 'GO!';
        audioEngine.playCountdownGo();
      } else {
        clearInterval(timer);
        this.countdownModal.classList.add('hidden');
        if (onComplete) onComplete();
      }
    }, 900);
  }

  async loop() {
    if (this.canvas.width === 0) this.resizeCanvas();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const poses = await this.detector.estimatePoses();
    const keypoints = poses.length > 0 ? poses[0].keypoints : null;

    if (this.state === 'CALIBRATING') {
      const calibStatus = this.calibration.processFrame(keypoints, this.canvas.width, this.canvas.height);
      this.calibration.drawGuide(this.ctx, this.canvas.width, this.canvas.height);

      this.calibProgress.style.width = `${calibStatus.progress}%`;
      this.calibMsg.textContent = calibStatus.message;

      if (calibStatus.complete) {
        audioEngine.playLevelCompleteFanfare();
        audioEngine.speak('Super Star! Calibration Complete!');
        this.calibrationModal.classList.add('hidden');
        this.runCountdown(() => {
          this.state = 'PLAYING';
        });
      }
    } else if (this.state === 'PLAYING') {
      if (keypoints) {
        this.detector.drawSkeleton(this.ctx, keypoints, this.canvas.width, this.canvas.height, this.particleFX);
      }

      const currentPose = this.poseDeck[this.currentDeckIdx];
      const evaluation = this.matcher.evaluate(keypoints, currentPose);

      this.feedbackBanner.textContent = evaluation.feedback;

      if (evaluation.isMatch) {
        this.holdFrames++;
        this.feedbackBanner.classList.add('success');

        const progress = Math.min(1.0, this.holdFrames / this.requiredHoldFrames);
        this.updateHoldRing(progress);

        if (this.holdFrames % 4 === 0) {
          audioEngine.playHoldProgress(progress);
        }

        if (this.holdFrames >= this.requiredHoldFrames && !this.isMatchComplete) {
          this.triggerMatchSuccess(currentPose);
        }
      } else {
        this.holdFrames = Math.max(0, this.holdFrames - 1);
        this.feedbackBanner.classList.remove('success');
        this.updateHoldRing(this.holdFrames / this.requiredHoldFrames);
      }
    } else if (this.state === 'MATCHED' || this.state === 'COUNTDOWN') {
      if (keypoints) {
        this.detector.drawSkeleton(this.ctx, keypoints, this.canvas.width, this.canvas.height, this.particleFX);
      }
    }

    this.particleFX.updateAndDraw(this.ctx, this.canvas.width, this.canvas.height);

    requestAnimationFrame(() => this.loop());
  }

  updateHoldRing(progress) {
    const circumference = 283;
    const offset = circumference - progress * circumference;
    this.holdRingProgress.style.strokeDashoffset = offset;
  }

  triggerMatchSuccess(pose) {
    this.isMatchComplete = true;
    this.state = 'MATCHED';
    this.stars += 10;
    this.starCountEl.textContent = this.stars;

    // Visual celebration FX
    this.particleFX.fireConfetti();
    this.particleFX.fireStarBurst(this.canvas.width / 2, this.canvas.height / 2);

    audioEngine.playSuccessChime();
    audioEngine.speakLevelPraise();

    this.feedbackBanner.textContent = '🌟 SUPER STAR MATCH! 🌟';
    this.feedbackBanner.classList.add('success');

    setTimeout(() => {
      this.nextLevel();
    }, 2800);
  }

  nextLevel() {
    this.currentDeckIdx++;
    if (this.currentDeckIdx >= this.poseDeck.length) {
      this.shufflePoseDeck();
    }

    this.level++;
    this.levelNumEl.textContent = this.level;

    this.holdFrames = 0;
    this.isMatchComplete = false;
    this.updateHoldRing(0);
    this.feedbackBanner.classList.remove('success');

    this.updateTargetPoseUI();
    this.runCountdown(() => {
      this.state = 'PLAYING';
    });
    audioEngine.playPop();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.gameEngine = new GameEngine();
});
