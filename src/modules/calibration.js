/**
 * Depth & Framing Calibration Manager.
 * Guides the user/parent to place the laptop camera correctly in front of the TV
 * and validates player body distance & framing.
 */

export class CalibrationManager {
  constructor() {
    this.isCalibrated = false;
    this.calibrationProgress = 0; // 0 to 100%
    this.calibrationFrameCount = 0;
    this.requiredFrames = 45; // ~1.5 seconds of consistent framing
    this.scaleFactor = 1.0;
    this.statusMessage = 'Step into the Golden Star Circle!';
  }

  reset() {
    this.isCalibrated = false;
    this.calibrationProgress = 0;
    this.calibrationFrameCount = 0;
    this.statusMessage = 'Step into the Golden Star Circle!';
  }

  /**
   * Process keypoints during calibration mode.
   * Returns { complete: boolean, progress: number, message: string }
   */
  processFrame(keypoints, canvasWidth, canvasHeight) {
    if (this.isCalibrated) {
      return { complete: true, progress: 100, message: 'Ready to play!' };
    }

    if (!keypoints || keypoints.length === 0) {
      this.calibrationFrameCount = Math.max(0, this.calibrationFrameCount - 1);
      this.statusMessage = 'No player detected. Stand in front of the TV camera!';
      return this.getStatus();
    }

    const nose = keypoints.find(k => k.name === 'nose');
    const ls = keypoints.find(k => k.name === 'left_shoulder');
    const rs = keypoints.find(k => k.name === 'right_shoulder');
    const lh = keypoints.find(k => k.name === 'left_hip');
    const rh = keypoints.find(k => k.name === 'right_hip');

    if (!nose || !ls || !rs) {
      this.calibrationFrameCount = Math.max(0, this.calibrationFrameCount - 1);
      this.statusMessage = 'Please step back so your upper body is fully visible!';
      return this.getStatus();
    }

    // Check central alignment in frame (between 15% and 85% width)
    const centerX = (ls.x + rs.x) / 2;
    const isCentered = centerX > canvasWidth * 0.15 && centerX < canvasWidth * 0.85;

    // Check size / distance
    const shoulderWidth = Math.hypot(rs.x - ls.x, rs.y - ls.y);
    const isGoodDistance = shoulderWidth > canvasWidth * 0.10 && shoulderWidth < canvasWidth * 0.60;

    if (!isCentered) {
      this.statusMessage = 'Move to the middle of the camera view!';
      this.calibrationFrameCount = Math.max(0, this.calibrationFrameCount - 1);
    } else if (!isGoodDistance) {
      if (shoulderWidth <= canvasWidth * 0.10) {
        this.statusMessage = 'Step a little closer to the TV camera!';
      } else {
        this.statusMessage = 'Step back a little so your full body fits!';
      }
      this.calibrationFrameCount = Math.max(0, this.calibrationFrameCount - 1);
    } else {
      // Good framing!
      this.calibrationFrameCount++;
      this.statusMessage = 'Hold still! Calibrating TV motion area...';

      if (lh && rh) {
        const torsoHeight = (Math.hypot(ls.x - lh.x, ls.y - lh.y) + Math.hypot(rs.x - rh.x, rs.y - rh.y)) / 2;
        this.scaleFactor = Math.max(0.5, Math.min(2.0, 120 / (torsoHeight || 120)));
      }

      if (this.calibrationFrameCount >= this.requiredFrames) {
        this.isCalibrated = true;
        this.statusMessage = 'Calibration Complete! Super Star!';
      }
    }

    return this.getStatus();
  }

  getStatus() {
    this.calibrationProgress = Math.min(100, Math.round((this.calibrationFrameCount / this.requiredFrames) * 100));
    return {
      complete: this.isCalibrated,
      progress: this.calibrationProgress,
      message: this.statusMessage,
      scaleFactor: this.scaleFactor
    };
  }

  /**
   * Draw visual calibration guide on the canvas overlay
   */
  drawGuide(ctx, width, height) {
    // Draw central Golden Star Circle target area
    const centerX = width / 2;
    const centerY = height * 0.45;
    const radiusX = width * 0.28;
    const radiusY = height * 0.40;

    ctx.save();

    // Darkened vignette background outside circle
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, 0, width, height);

    // Clear inner target oval
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';

    // Glowing Golden Target Ring
    ctx.strokeStyle = this.isCalibrated ? '#00E676' : '#FFD700';
    ctx.lineWidth = 6;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);

    // Target Icon / Text prompt
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.fillText('⭐ Stand Inside Golden Star Zone ⭐', centerX, height * 0.12);

    ctx.restore();
  }
}
