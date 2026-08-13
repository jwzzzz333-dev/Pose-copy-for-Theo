/**
 * Angle & Geometric Evaluator for 16 Motion Poses.
 */

export class PoseMatcher {
  constructor() {
    this.difficulty = 'toddler'; // 'toddler', 'kid', 'pro'
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
      return { score: 0, isMatch: false, feedback: 'Make sure upper body is visible!' };
    }

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
        let leftUp = lw ? Math.min(1, Math.max(0, (ls.y - lw.y) / (torsoHeight * 0.4))) : 0;
        let rightUp = rw ? Math.min(1, Math.max(0, (rs.y - rw.y) / (torsoHeight * 0.4))) : 0;
        score = (leftUp + rightUp) / 2;
        feedback = score < 0.4 ? 'Reach hands high up!' : 'Super star reach!';
        break;
      }

      case 'airplane_wings': {
        const sw = this.dist(ls, rs);
        let leftWide = lw ? Math.min(1, (Math.abs(ls.x - lw.x) / Math.max(sw, 30)) * 0.6 + (1 - Math.min(1, Math.abs(ls.y - lw.y) / (torsoHeight * 0.6))) * 0.4) : 0;
        let rightWide = rw ? Math.min(1, (Math.abs(rw.x - rs.x) / Math.max(sw, 30)) * 0.6 + (1 - Math.min(1, Math.abs(rs.y - rw.y) / (torsoHeight * 0.6))) * 0.4) : 0;
        score = (leftWide + rightWide) / 2;
        feedback = score < 0.4 ? 'Spread arms wide!' : 'Airplane wings!';
        break;
      }

      case 'dino_roar': {
        let clawScore = 0;
        if (lw && rw) {
          const lClaw = (lw.y < ls.y + torsoHeight * 0.2) && (Math.abs(lw.x - ls.x) < torsoHeight * 0.6);
          const rClaw = (rw.y < rs.y + torsoHeight * 0.2) && (Math.abs(rw.x - rs.x) < torsoHeight * 0.6);
          clawScore = (lClaw ? 0.5 : 0.2) + (rClaw ? 0.5 : 0.2);
        }
        score = clawScore;
        feedback = score < 0.4 ? 'Bend claws up & ROAR!' : 'Mighty T-Rex Roar!';
        break;
      }

      case 'superhero_fly': {
        let leftUp = lw ? Math.min(1, Math.max(0, (ls.y - lw.y) / (torsoHeight * 0.35))) : 0;
        let rightUp = rw ? Math.min(1, Math.max(0, (rs.y - rw.y) / (torsoHeight * 0.35))) : 0;
        score = Math.max(leftUp, rightUp);
        feedback = score < 0.4 ? 'Point one fist high!' : 'Superhero Flying!';
        break;
      }

      case 'bunny_squat': {
        let squatScore = 0;
        if (lh && lk && la) squatScore = Math.max(squatScore, Math.max(0, (160 - this.angle3Points(lh, lk, la)) / 50));
        if (rh && rk && ra) squatScore = Math.max(squatScore, Math.max(0, (160 - this.angle3Points(rh, rk, ra)) / 50));
        if (squatScore === 0 && lw && rw) {
          if (lw.y < ls.y + torsoHeight * 0.3 && rw.y < rs.y + torsoHeight * 0.3) squatScore = 0.7;
        }
        score = Math.min(1, squatScore);
        feedback = score < 0.4 ? 'Crouch low like a bunny!' : 'Cute bunny hop!';
        break;
      }

      case 'disco_dance': {
        let discoScore = 0;
        if (lw && rw) {
          const opt1 = (lw.y < ls.y) && (rw.y > rs.y);
          const opt2 = (rw.y < rs.y) && (lw.y > ls.y);
          discoScore = (opt1 || opt2) ? 0.85 : 0.3;
        }
        score = discoScore;
        feedback = score < 0.4 ? 'One arm UP, one arm DOWN!' : 'Disco Dance Party!';
        break;
      }

      case 'flamingo_balance': {
        let legLiftScore = 0;
        if (lk && rk && (lh || rh)) {
          const kneeDiff = Math.abs(lk.y - rk.y);
          legLiftScore = Math.min(1.0, kneeDiff / (torsoHeight * 0.35));
        } else if (lw && rw) {
          legLiftScore = (Math.abs(ls.y - lw.y) < torsoHeight * 0.4 && Math.abs(rs.y - rw.y) < torsoHeight * 0.4) ? 0.75 : 0.3;
        }
        score = legLiftScore;
        feedback = score < 0.4 ? 'Lift one knee up & balance!' : 'Flamingo Balance!';
        break;
      }

      case 'froggy_jump': {
        let frogScore = 0;
        if (lw && rw) {
          const lowHands = (lw.y > ls.y + torsoHeight * 0.8) && (rw.y > rs.y + torsoHeight * 0.8);
          frogScore = lowHands ? 0.85 : 0.3;
        }
        score = frogScore;
        feedback = score < 0.4 ? 'Squat low & touch floor!' : 'Froggy Jump!';
        break;
      }

      case 'archer_bow': {
        let archerScore = 0;
        if (lw && rw) {
          const leftExtended = Math.abs(ls.x - lw.x) > torsoHeight * 0.6;
          const rightExtended = Math.abs(rw.x - rs.x) > torsoHeight * 0.6;
          if (leftExtended || rightExtended) archerScore = 0.85;
          else archerScore = 0.3;
        }
        score = archerScore;
        feedback = score < 0.4 ? 'Point arm out like an archer!' : 'Super Archer!';
        break;
      }

      case 'tree_pose': {
        let treeScore = 0;
        if (lw && rw) {
          const highHands = (lw.y < ls.y - torsoHeight * 0.3) && (rw.y < rs.y - torsoHeight * 0.3);
          const together = Math.abs(lw.x - rw.x) < torsoHeight * 0.5;
          treeScore = (highHands && together) ? 0.9 : 0.3;
        }
        score = treeScore;
        feedback = score < 0.4 ? 'Put hands together overhead!' : 'Tall Tree Pose!';
        break;
      }

      case 'cross_arms': {
        let crossScore = 0;
        if (lw && rw) {
          const leftCrossed = lw.x > ls.x - torsoHeight * 0.2;
          const rightCrossed = rw.x < rs.x + torsoHeight * 0.2;
          crossScore = (leftCrossed && rightCrossed) ? 0.85 : 0.3;
        }
        score = crossScore;
        feedback = score < 0.4 ? 'Cross arms in an X shape!' : 'Superhero Shield!';
        break;
      }

      case 'surf_wave': {
        let surfScore = 0;
        if (lw && rw) {
          const armsSpread = Math.abs(lw.x - rw.x) > torsoHeight * 1.1;
          surfScore = armsSpread ? 0.85 : 0.3;
        }
        score = surfScore;
        feedback = score < 0.4 ? 'Spread arms wide on surfboard!' : 'Surfer Balance!';
        break;
      }

      case 'kick_goal': {
        let kickScore = 0;
        if (la && ra) {
          const footDiff = Math.abs(la.y - ra.y);
          kickScore = Math.min(1.0, footDiff / (torsoHeight * 0.4));
        } else if (lk && rk) {
          const kneeDiff = Math.abs(lk.y - rk.y);
          kickScore = Math.min(1.0, kneeDiff / (torsoHeight * 0.35));
        } else score = 0.7; // Fallback
        score = kickScore || 0.7;
        feedback = score < 0.4 ? 'Kick one leg out high!' : 'Champion Kick!';
        break;
      }

      case 'kitty_stretch': {
        let kittyScore = 0;
        if (lw && rw) {
          kittyScore = (lw.y > ls.y + torsoHeight * 0.6 && rw.y > rs.y + torsoHeight * 0.6) ? 0.85 : 0.3;
        }
        score = kittyScore;
        feedback = score < 0.4 ? 'Put hands down low & stretch!' : 'Kitty Stretch!';
        break;
      }

      case 'gorilla_tap': {
        let gorillaScore = 0;
        if (lw && rw) {
          const lNear = Math.abs(lw.y - ls.y) < torsoHeight * 0.4;
          const rNear = Math.abs(rw.y - rs.y) < torsoHeight * 0.4;
          gorillaScore = (lNear && rNear) ? 0.85 : 0.3;
        }
        score = gorillaScore;
        feedback = score < 0.4 ? 'Hold hands near your chest!' : 'Gorilla Power!';
        break;
      }

      case 'zen_master': {
        let zenScore = 0;
        if (lw && rw) {
          const atChest = (Math.abs(lw.y - ls.y) < torsoHeight * 0.5) && (Math.abs(rw.y - rs.y) < torsoHeight * 0.5);
          const together = Math.abs(lw.x - rw.x) < torsoHeight * 0.4;
          zenScore = (atChest && together) ? 0.9 : 0.3;
        }
        score = zenScore;
        feedback = score < 0.4 ? 'Press hands together at chest!' : 'Master Panda!';
        break;
      }

      default:
        score = 0.5;
        feedback = 'Copy the pose!';
    }

    let threshold = 0.55;
    if (this.difficulty === 'kid') threshold = 0.68;
    if (this.difficulty === 'pro') threshold = 0.80;

    const isMatch = score >= threshold;

    return {
      score: Math.min(1, Math.max(0, score)),
      isMatch,
      threshold,
      feedback
    };
  }
}
