import confetti from 'canvas-confetti';

export class ParticleFX {
  constructor() {
    this.particles = [];
  }

  // Add wrist star sparkle trail
  addSparkle(x, y, color = '#FFD700') {
    if (Math.random() > 0.4) return; // limit count
    this.particles.push({
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 2 - 1,
      size: Math.random() * 8 + 4,
      color,
      alpha: 1.0,
      life: 1.0,
      decay: Math.random() * 0.04 + 0.03
    });
  }

  // Firing celebratory confetti
  fireConfetti() {
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF4081', '#00E676', '#29B6F6', '#AB47BC']
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }

  // Firing star burst explosion on match complete
  fireStarBurst(x, y) {
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = Math.random() * 6 + 3;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 12 + 6,
        color: i % 2 === 0 ? '#FFD700' : '#FF4081',
        alpha: 1.0,
        life: 1.0,
        decay: 0.035
      });
    }
  }

  updateAndDraw(ctx) {
    ctx.save();
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;

      // Draw star shape
      ctx.beginPath();
      const numPoints = 5;
      const outerRadius = p.size;
      const innerRadius = p.size / 2;

      for (let pt = 0; pt < numPoints * 2; pt++) {
        const radius = pt % 2 === 0 ? outerRadius : innerRadius;
        const angle = (pt * Math.PI) / numPoints;
        const px = p.x + radius * Math.sin(angle);
        const py = p.y - radius * Math.cos(angle);
        if (pt === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
}
