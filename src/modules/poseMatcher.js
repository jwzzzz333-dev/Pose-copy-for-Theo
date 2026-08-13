/**
 * Evaluates real-time pose keypoints against active target pose definitions.
 * Includes toddler-friendly scale invariance and forgiving tolerance math.
 */

export class PoseMatcher {
  constructor() {
    this.difficulty = 'toddler'; // 'toddler' (forgiving), 'kid', 'pro'
  }

  setDifficulty(mode) {
    this.difficulty = mode;
  }

  // Keypoint helper
  getKeypoint(keypoints, name) {
    if (!keypoints) return null;
    const kp = keypoints.find(k => k.name === name || k.part === name);
    if (!kp || (kp.score !== undefined && kp.score < 0.2)) return null;
    return { x: kp.x, y: kp.y, score: kp.score || 1.0 };
  }

  // Distance formula
  dist(p1, p2) {
    if (!p1 || !p2) return 0;
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }

  // Angle in degrees at point B between segment BA and BC
  angle3Points(A, B, C) {
    if (!A || !B || !C) return 180;
    const radians = Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let degrees = Math.abs((radians * 180.0) / Math.PI);
    if (degrees > 180.0) degrees = 360.0 - degrees;
    return degrees;
  }

  /**
   * Evaluates keypoints against a target pose.
   * Returns { score: number (0..1), isMatch: boolean, feedback: string }
   */
  evaluate(keypoints, targetPose) {
    if (!keypoints || keypoints.length === 0) {
      return { score: 0, isMatch: false, feedback: 'Step into the camera view!' };
    }

    const ls = this.getKeypoint(keypoints, 'left_shoulder');
    const rs = this.getKeypoint(keypoints, 'right_shoulder');
    const lh = this.getKeypoint(keypoints, 'left_hip');
    const rh = this.getKeypoint(keypoints, 'right_hip');

    if (!ls || !rs) {
      return { score: 0, isMatch: false, feedback: 'Make sure your upper body is visible!' };
    }

    // Estimate Torso Length for scale invariance
    const leftTorso = lh ? this.dist(ls, lh) : 0;
    const rightTorso = rh ? this.dist(rs, rh) : 0;
    let torsoHeight = Math.max(leftTorso, rightTorso);
    if (torsoHeight < 20) {
      // Fallback estimate based on shoulder width if hips aren't fully visible
      const shoulderWidth = this.dist(ls, rs);
      torsoHeight = Math.max(shoulderWidth * 1.3, 50);
    }

    const lw = this.getKeypoint(keypoints, 'left_wrist');
    const rw = this.getKeypoint(keypoints, 'right_wrist');
    const le = this.getKeypoint(keypoints, 'left_elbow');
    const re = this.getKeypoint(keypoints, 'right_elbow');
    const lk = this.getKeypoint(keypoints, 'left_knee');
    const rk = this.getKeypoint(keypoints, 'right_knee');
    const la = this.getKeypoint(keypoints, 'left_ankle');
    const ra = this.getKeypoint(keypoints, 'right_ankle');

    let score = 0;
    let feedback = '';

    switch (targetPose.id) {
      case 'reach_stars': {
        // Both hands elevated above shoulders
        let leftUpScore = 0;
        let rightUpScore = 0;

        if (lw) {
          const dy = ls.y - lw.y; // Positive if wrist is above shoulder
          leftUpScore = Math.min(1.0, Math.max(0, dy / (torsoHeight * 0.4)));
        }
        if (rw) {
          const dy = rs.y - rw.y;
          rightUpScore = Math.min(1.0, Math.max(0, dy / (torsoHeight * 0.4)));
        }

        score = (leftUpScore + rightUpScore) / 2;
        if (score < 0.4) feedback = 'Reach higher up!';
        else if (score < 0.7) feedback = 'Almost there! Stretch high!';
        else feedback = 'Super high star reach!';
        break;
      }

      case 'airplane_wings': {
        // Hands spread out wide horizontally
        let leftWideScore = 0;
        let rightWideScore = 0;

        const shoulderWidth = this.dist(ls, rs);
        if (lw) {
          const dx = Math.abs(ls.x - lw.x);
          const dy = Math.abs(ls.y - lw.y);
          const wideRatio = dx / Math.max(shoulderWidth, 30);
          const heightRatio = 1.0 - Math.min(1.0, dy / (torsoHeight * 0.6));
          leftWideScore = Math.min(1.0, wideRatio * 0.6 + heightRatio * 0.4);
        }
        if (rw) {
          const dx = Math.abs(rw.x - rs.x);
          const dy = Math.abs(rs.y - rw.y);
          const wideRatio = dx / Math.max(shoulderWidth, 30);
          const heightRatio = 1.0 - Math.min(1.0, dy / (torsoHeight * 0.6));
          rightWideScore = Math.min(1.0, wideRatio * 0.6 + heightRatio * 0.4);
        }

        score = (leftWideScore + rightWideScore) / 2;
        if (score < 0.4) feedback = 'Spread arms out wide!';
        else if (score < 0.7) feedback = 'Straighten wings to the side!';
        else feedback = 'Awesome airplane wings!';
        break;
      }

      case 'super_high_five': {
        // One hand raised high up
        let leftUp = 0;
        let rightUp = 0;
        if (lw) leftUp = Math.min(1.0, Math.max(0, (ls.y - lw.y) / (torsoHeight * 0.35)));
        if (rw) rightUp = Math.min(1.0, Math.max(0, (rs.y - rw.y) / (torsoHeight * 0.35)));

        score = Math.max(leftUp, rightUp);
        if (score < 0.4) feedback = 'Put one hand up high!';
        else feedback = 'High Five! Hold it!';
        break;
      }

      case 'bunny_squat': {
        // Bend knees or crouch down
        let squatScore = 0;
        if (lh && lk && la) {
          const lAngle = this.angle3Points(lh, lk, la);
          const lBent = Math.max(0, (160 - lAngle) / 50); // 160° down to 110°
          squatScore = Math.max(squatScore, lBent);
        }
        if (rh && rk && ra) {
          const rAngle = this.angle3Points(rh, rk, ra);
          const rBent = Math.max(0, (160 - rAngle) / 50);
          squatScore = Math.max(squatScore, rBent);
        }
        // Fallback: If lower body keypoints unavailable, check wrists up near face like bunny paws
        if (squatScore === 0 && lw && rw) {
          const pawsUp = (lw.y < ls.y + torsoHeight * 0.2) && (rw.y < rs.y + torsoHeight * 0.2);
          if (pawsUp) squatScore = 0.7;
        }

        score = Math.min(1.0, squatScore);
        if (score < 0.4) feedback = 'Crouch down low like a bunny!';
        else feedback = 'Cute bunny squat!';
        break;
      }

      case 'star_jump': {
        // Arms wide diagonal and legs wide
        let armScore = 0;
        if (lw && rw) {
          const leftDiag = (ls.y - lw.y > torsoHeight * 0.1) && (ls.x - lw.x > torsoHeight * 0.2);
          const rightDiag = (rs.y - rw.y > torsoHeight * 0.1) && (rw.x - rs.x > torsoHeight * 0.2);
          armScore = (leftDiag ? 0.5 : 0.2) + (rightDiag ? 0.5 : 0.2);
        }
        let legScore = 0.5;
        if (la && ra) {
          const ankleDist = this.dist(la, ra);
          const shoulderDist = this.dist(ls, rs);
          legScore = Math.min(1.0, ankleDist / Math.max(shoulderDist * 1.4, 40));
        }

        score = Math.min(1.0, armScore * 0.6 + legScore * 0.4);
        if (score < 0.4) feedback = 'Arms wide, legs wide!';
        else feedback = 'Shining Star!';
        break;
      }

      case 'touch_knees': {
        // Wrists lowered near knee level
        let leftKneeScore = 0;
        let rightKneeScore = 0;

        if (lw && (lk || lh)) {
          const targetY = lk ? lk.y : lh.y + torsoHeight * 0.8;
          const distToKnee = Math.abs(lw.y - targetY);
          leftKneeScore = Math.max(0, 1.0 - distToKnee / (torsoHeight * 0.6));
        }
        if (rw && (rk || rh)) {
          const targetY = rk ? rk.y : rh.y + torsoHeight * 0.8;
          const distToKnee = Math.abs(rw.y - targetY);
          rightKneeScore = Math.max(0, 1.0 - distToKnee / (torsoHeight * 0.6));
        }

        score = (leftKneeScore + rightKneeScore) / 2;
        if (score < 0.4) feedback = 'Reach down to touch your knees!';
        else feedback = 'Touching knees!';
        break;
      }

      default:
        score = 0.5;
        feedback = 'Copy the pose!';
    }

    // Determine threshold based on toddler difficulty
    let threshold = 0.55; // Toddler (3yo) default: very forgiving!
    if (this.difficulty === 'kid') threshold = 0.70;
    if (this.difficulty === 'pro') threshold = 0.82;

    const isMatch = score >= threshold;

    return {
      score: Math.min(1.0, Math.max(0, score)),
      isMatch,
      threshold,
      feedback
    };
  }
}
