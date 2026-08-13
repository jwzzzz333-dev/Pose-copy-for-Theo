import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';

export class PoseDetector {
  constructor() {
    this.detector = null;
    this.video = null;
    this.isReady = false;
    this.isLoading = false;
    this.errorMessage = null;
  }

  async init(videoElement) {
    this.video = videoElement;
    this.isLoading = true;
    this.errorMessage = null;

    try {
      // 1. Ready TensorFlow backend
      await tf.ready();

      // 2. Initialize MoveNet detector
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true
      };

      this.detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        detectorConfig
      );

      // 3. Start Camera Stream
      await this.startCamera();

      this.isReady = true;
      this.isLoading = false;
      return true;
    } catch (err) {
      console.error('PoseDetector initialization error:', err);
      this.isLoading = false;
      this.errorMessage = err.message || 'Camera or model initialization failed.';
      throw err;
    }
  }

  async startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Webcam access not supported in this browser.');
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
      },
      audio: false
    });

    this.video.srcObject = stream;

    return new Promise((resolve) => {
      this.video.onloadedmetadata = () => {
        this.video.play();
        resolve(true);
      };
    });
  }

  async estimatePoses() {
    if (!this.detector || !this.video || !this.isReady || this.video.readyState < 2) {
      return [];
    }

    try {
      const poses = await this.detector.estimatePoses(this.video, {
        maxPoses: 1,
        flipHorizontal: true
      });
      return poses;
    } catch (e) {
      console.warn('Pose estimation frame error:', e);
      return [];
    }
  }

  /**
   * Draw glowing Wii-style skeleton on canvas
   */
  drawSkeleton(ctx, keypoints, canvasWidth, canvasHeight, particleFX) {
    if (!keypoints || keypoints.length === 0) return;

    ctx.save();

    // Keypoint connections for body limbs
    const connections = [
      ['left_shoulder', 'right_shoulder'],
      ['left_shoulder', 'left_elbow'],
      ['left_elbow', 'left_wrist'],
      ['right_shoulder', 'right_elbow'],
      ['right_elbow', 'right_wrist'],
      ['left_shoulder', 'left_hip'],
      ['right_shoulder', 'right_hip'],
      ['left_hip', 'right_hip'],
      ['left_hip', 'left_knee'],
      ['left_knee', 'left_ankle'],
      ['right_hip', 'right_knee'],
      ['right_knee', 'right_ankle']
    ];

    const kpMap = {};
    keypoints.forEach(kp => {
      // Flip coordinates horizontally if video is mirrored
      kpMap[kp.name || kp.part] = kp;
    });

    // Draw glowing limb lines
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#00E676'; // Neon Green
    ctx.shadowColor = '#00E676';
    ctx.shadowBlur = 12;

    connections.forEach(([p1Name, p2Name]) => {
      const p1 = kpMap[p1Name];
      const p2 = kpMap[p2Name];
      if (p1 && p2 && (p1.score === undefined || p1.score > 0.25) && (p2.score === undefined || p2.score > 0.25)) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });

    // Draw Joint Star Bubbles
    keypoints.forEach(kp => {
      if (kp.score !== undefined && kp.score < 0.25) return;

      const isHand = kp.name === 'left_wrist' || kp.name === 'right_wrist';

      if (isHand && particleFX) {
        particleFX.addSparkle(kp.x, kp.y, '#FFD700');
      }

      ctx.fillStyle = isHand ? '#FFD700' : '#FF4081';
      ctx.shadowColor = isHand ? '#FFD700' : '#FF4081';
      ctx.shadowBlur = isHand ? 18 : 10;

      ctx.beginPath();
      ctx.arc(kp.x, kp.y, isHand ? 14 : 9, 0, 2 * Math.PI);
      ctx.fill();

      // Outer ring for hands
      if (isHand) {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });

    ctx.restore();
  }
}
