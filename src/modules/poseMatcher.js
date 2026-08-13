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

  getKeypoint(keypoints, name) {
    if (!keypoints) return null;
    const kp = keypoints.find(k => k.name === name || k.part === name);
    if (!kp || (kp.score !== undefined && kp.score < 0.2)) return null;
    return { x: kp.x, y: kp.y, score: kp.score || 1.0 };
  }

  dist(p1, p2) {
    if (!p1 || !p2) return 0;
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }

  angle3Points(A, B, C) {
    if (!A || !B || !C) return 180;
    const radians = Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let degrees = Math.abs((radians * 180.0) / Math.PI);
    if (degrees > 180.0) degrees = 360.0 - degrees;
    return degrees;
  }

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
        let leftUpScore = 0;
        let rightUpScore = 0;
        if (lw) leftUpScore = Math.min(1.0, Math.max(0, (ls.y - lw.y) / (torsoHeight * 0.4)));
        if (rw) rightUpScore = Math.min(1.0, Math.max(0, (rs.y - rw.y) / (torsoHeight * 0.4)));

        score = (leftUpScore + rightUpScore) / 2;
        if (score < 0.4) feedback = 'Reach both hands high up!';
        else feedback = 'Super high star reach!';
        break;
      }

      case 'airplane_wings': {
        let leftWideScore = 0;
        let rightWideScore = 0;
        const shoulderWidth = this.dist(ls, rs);

        if (lw) {
          const dx = Math.abs(ls.x - lw.x);
          const dy = Math.abs(ls.y - lw.y);
          leftWideScore = Math.min(1.0, (dx / Math.max(shoulderWidth, 30)) * 0.6 + (1 - Math.min(1, dy / (torsoHeight * 0.6))) * 0.4);
        }
        if (rw) {
          const dx = Math.abs(rw.x - rs.x);
          const dy = Math.abs(rs.y - rw.y);
          rightWideScore = Math.min(1.0, (dx / Math.max(shoulderWidth, 30)) * 0.6 + (1 - Math.min(1, dy / (torsoHeight * 0.6))) * 0.4);
        }

        score = (leftWideScore + rightWideScore) / 2;
        if (score < 0.4) feedback = 'Spread arms out wide!';
        else feedback = 'Awesome airplane wings!';
        break;
      }

      case 'dino_roar': {
        // Hands bent up near chest/neck like T-Rex claws
        let clawScore = 0;
        if (lw && rw) {
          const lClaw = (lw.y < ls.y + torsoHeight * 0.2) && (Math.abs(lw.x - ls.x) < torsoHeight * 0.6);
          const rClaw = (rw.y < rs.y + torsoHeight * 0.2) && (Math.abs(rw.x - rs.x) < torsoHeight * 0.6);
          clawScore = (lClaw ? 0.5 : 0.2) + (rClaw ? 0.5 : 0.2);
        }
        score = clawScore;
        if (score < 0.4) feedback = 'Bend your claws up & ROAR!';
        else feedback = 'Mighty T-Rex Roar!';
        break;
      }

      case 'superhero_fly': {
        // One hand reaching high forward/up
        let leftUp = 0;
        let rightUp = 0;
        if (lw) leftUp = Math.min(1.0, Math.max(0, (ls.y - lw.y) / (torsoHeight * 0.35)));
        if (rw) rightUp = Math.min(1.0, Math.max(0, (rs.y - rw.y) / (torsoHeight * 0.35)));

        score = Math.max(leftUp, rightUp);
        if (score < 0.4) feedback = 'Point one fist high to fly!';
        else feedback = 'Flying Superhero!';
        break;
      }

      case 'bunny_squat': {
        let squatScore = 0;
        if (lh && lk && la) squatScore = Math.max(squatScore, Math.max(0, (160 - this.angle3Points(lh, lk, la)) / 50));
        if (rh && rk && ra) squatScore = Math.max(squatScore, Math.max(0, (160 - this.angle3Points(rh, rk, ra)) / 50));
        if (squatScore === 0 && lw && rw) {
          const pawsUp = (lw.y < ls.y + torsoHeight * 0.3) && (rw.y < rs.y + torsoHeight * 0.3);
          if (pawsUp) squatScore = 0.7;
        }

        score = Math.min(1.0, squatScore);
        if (score < 0.4) feedback = 'Crouch down low like a bunny!';
        else feedback = 'Cute bunny hop!';
        break;
      }

      case 'disco_dance': {
        // One arm up diagonal, one arm down diagonal
        let discoScore = 0;
        if (lw && rw) {
          const option1 = (lw.y < ls.y) && (rw.y > rs.y); // Left up, Right down
          const option2 = (rw.y < rs.y) && (lw.y > ls.y); // Right up, Left down
          if (option1 || option2) discoScore = 0.85;
          else discoScore = 0.3;
        }
        score = discoScore;
        if (score < 0.4) feedback = 'One arm UP, one arm DOWN!';
        else feedback = 'Disco Dance Move!';
        break;
      }

      case 'super_high_five': {
        let leftUp = 0;
        let rightUp = 0;
        if (lw) leftUp = Math.min(1.0, Math.max(0, (ls.y - lw.y) / (torsoHeight * 0.35)));
        if (rw) rightUp = Math.min(1.0, Math.max(0, (rs.y - rw.y) / (torsoHeight * 0.35)));

        score = Math.max(leftUp, rightUp);
        if (score < 0.4) feedback = 'Put one hand up high!';
        else feedback = 'High Five!';
        break;
      }

      case 'gorilla_tap': {
        // Both hands near chest
        let gorillaScore = 0;
        if (lw && rw) {
          const lNearChest = Math.abs(lw.y - ls.y) < torsoHeight * 0.4 && Math.abs(lw.x - ls.x) < torsoHeight * 0.5;
          const rNearChest = Math.abs(rw.y - rs.y) < torsoHeight * 0.4 && Math.abs(rw.x - rs.x) < torsoHeight * 0.5;
          if (lNearChest && rNearChest) gorillaScore = 0.85;
          else gorillaScore = 0.3;
        }
        score = gorillaScore;
        if (score < 0.4) feedback = 'Bring hands to your chest!';
        else feedback = 'Gorilla Power!';
        break;
      }

      case 'touch_knees': {
        let leftKneeScore = 0;
        let rightKneeScore = 0;
        if (lw && (lk || lh)) {
          const targetY = lk ? lk.y : lh.y + torsoHeight * 0.8;
          leftKneeScore = Math.max(0, 1.0 - Math.abs(lw.y - targetY) / (torsoHeight * 0.6));
        }
        if (rw && (rk || rh)) {
          const targetY = rk ? rk.y : rh.y + torsoHeight * 0.8;
          rightKneeScore = Math.max(0, 1.0 - Math.abs(rw.y - targetY) / (torsoHeight * 0.6));
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

    let threshold = 0.55; // Toddler default
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
