import { PoseDetector } from './modules/poseDetector.js';
import { CalibrationManager } from './modules/calibration.js';
import { PoseMatcher } from './modules/poseMatcher.js';
import { audioEngine } from './modules/audioEngine.js';
import { ParticleFX } from './modules/particleFX.js';
import { POSES } from './modules/poseDefinitions.js';

class GameEngine {
  constructor() {
    // DOM Elements
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

    this.victoryModal = document.getElementById('victory-modal');
    this.btnNextLevel = document.getElementById('btn-next-level');

    this.btnSound = document.getElementById('btn-sound');
    this.btnSpeech = document.getElementById('btn-speech');
    this.btnRecalibrate = document.getElementById('btn-recalibrate');
    this.btnSkip = document.getElementById('btn-skip');

    // Modules
    this.detector = new PoseDetector();
    this.calibration = new CalibrationManager();
    this.matcher = new PoseMatcher();
    this.particleFX = new ParticleFX();

    // State variables
    this.state = 'START_MODAL'; // START_MODAL, CALIBRATING, PLAYING, MATCHED
    this.currentPoseIdx = 0;
    this.stars = 0;
    this.level = 1;

    this.holdFrames = 0;
    this.requiredHoldFrames = 35; // ~1.2s at 30fps
    this.isMatchComplete = false;

    this.bindEvents();
    this.updateTargetPoseUI();
  }

  bindEvents() {
    this.btnStartGame.addEventListener('click', () => this.startCalibration());
    this.btnNextLevel.addEventListener('click', () => this.nextLevel());

    this.btnRecalibrate.addEventListener('click', () => this.startCalibration());
    this.btnSkip.addEventListener('click', () => this.nextLevel());

    this.btnSound.addEventListener('click', () => {
      audioEngine.sfxEnabled = !audioEngine.sfxEnabled;
      this.btnSound.textContent = audioEngine.sfxEnabled ? '🔊' : '🔇';
    });

    this.btnSpeech.addEventListener('click', () => {
      audioEngine.speechEnabled = !audioEngine.speechEnabled;
      this.btnSpeech.textContent = audioEngine.speechEnabled ? '🗣️' : '🤫';
    });

    // Difficulty buttons
    document.querySelectorAll('.seg-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        this.matcher.setDifficulty(mode);
        audioEngine.playPop();
      });
    });

    // Window Resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  async startCalibration() {
    audioEngine.playPop();
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

      // Voice prompt
      audioEngine.speak('Step back into the Golden Star Zone!');

      // Start Loop
      this.loop();
    } catch (err) {
      console.warn('Camera failed, using simulation mode:', err);
      this.calibTitle.textContent = 'Camera Notice';
      this.calibMsg.textContent = 'Could not access webcam. You can still test poses with mouse/touch!';
      this.calibrationModal.classList.add('hidden');
      this.state = 'PLAYING';
      this.loop();
    }
  }

  updateTargetPoseUI() {
    const currentPose = POSES[this.currentPoseIdx];
    this.poseEmojiEl.textContent = currentPose.emoji;
    this.poseNameEl.textContent = currentPose.name;
    this.posePromptEl.textContent = currentPose.prompt;

    // Render SVG
    this.poseSvgContainer.innerHTML = `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        ${currentPose.svgPath}
      </svg>
    `;

    // Speak audio prompt
    audioEngine.speak(currentPose.audioPrompt);
  }

  async loop() {
    if (this.canvas.width === 0) this.resizeCanvas();

    // Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Get Poses
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
        this.state = 'PLAYING';
      }
    } else if (this.state === 'PLAYING') {
      // Render Skeleton & Star Particles
      if (keypoints) {
        this.detector.drawSkeleton(this.ctx, keypoints, this.canvas.width, this.canvas.height, this.particleFX);
      }

      // Evaluate Pose
      const currentPose = POSES[this.currentPoseIdx];
      const evaluation = this.matcher.evaluate(keypoints, currentPose);

      this.feedbackBanner.textContent = evaluation.feedback;

      if (evaluation.isMatch) {
        this.holdFrames++;
        this.feedbackBanner.classList.add('success');

        const progress = Math.min(1.0, this.holdFrames / this.requiredHoldFrames);
        this.updateHoldRing(progress);

        // Sound effect as hold ring fills up
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
    } else if (this.state === 'MATCHED') {
      // Draw celebratory skeleton & stars
      if (keypoints) {
        this.detector.drawSkeleton(this.ctx, keypoints, this.canvas.width, this.canvas.height, this.particleFX);
      }
    }

    // Update Particle FX
    this.particleFX.updateAndDraw(this.ctx);

    requestAnimationFrame(() => this.loop());
  }

  updateHoldRing(progress) {
    const circumference = 283; // 2 * pi * r (r=45)
    const offset = circumference - progress * circumference;
    this.holdRingProgress.style.strokeDashoffset = offset;
  }

  triggerMatchSuccess(pose) {
    this.isMatchComplete = true;
    this.state = 'MATCHED';
    this.stars += 5;
    this.starCountEl.textContent = this.stars;

    // Trigger visual celebration
    this.particleFX.fireConfetti();
    this.particleFX.fireStarBurst(this.canvas.width / 2, this.canvas.height / 2);

    audioEngine.playSuccessChime();
    audioEngine.speak('Yay! Super Star! You did it!');

    this.feedbackBanner.textContent = '🌟 SUPER STAR MATCH! 🌟';
    this.feedbackBanner.classList.add('success');

    // Auto advance after 2.5 seconds
    setTimeout(() => {
      this.nextLevel();
    }, 2500);
  }

  nextLevel() {
    this.currentPoseIdx = (this.currentPoseIdx + 1) % POSES.length;
    this.level++;
    this.levelNumEl.textContent = this.level;

    this.holdFrames = 0;
    this.isMatchComplete = false;
    this.updateHoldRing(0);
    this.feedbackBanner.classList.remove('success');

    this.updateTargetPoseUI();
    this.state = 'PLAYING';
    audioEngine.playPop();
  }
}

// Launch Game Engine on page load
window.addEventListener('DOMContentLoaded', () => {
  window.gameEngine = new GameEngine();
});
