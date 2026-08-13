import confetti from 'canvas-confetti';

export class ParticleFX {
  constructor() {
    this.particles = [];
    this.textPopups = [];
    this.rainbowHaloOpacity = 0;
  }

  addSparkle(x, y, color = '#FFD700') {
    if (Math.random() > 0.4) return;
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

  triggerRainbowHalo() {
    this.rainbowHaloOpacity = 1.0;
  }

  addScorePopup(x, y, text = '+100 ⭐') {
    this.textPopups.push({
      x,
      y,
      vy: -2.5,
      text,
      life: 1.0,
      decay: 0.02
    });
  }

  fireConfetti() {
    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF4081', '#00E676', '#29B6F6', '#AB47BC']
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }

  fireStarBurst(x, y) {
    this.triggerRainbowHalo();
    this.addScorePopup(x, y - 40, 'SUPER STAR! ⭐');

    for (let i = 0; i < 28; i++) {
      const angle = (Math.PI * 2 * i) / 28;
      const speed = Math.random() * 7 + 4;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 14 + 6,
        color: ['#FFD700', '#FF4081', '#00E676', '#00B0FF', '#AB47BC'][i % 5],
        alpha: 1.0,
        life: 1.0,
        decay: 0.03
      });
    }
  }

  updateAndDraw(ctx, width, height) {
    ctx.save();

    // Rainbow frame halo effect on completion
    if (this.rainbowHaloOpacity > 0 && width && height) {
      ctx.strokeStyle = `rgba(255, 215, 0, ${this.rainbowHaloOpacity})`;
      ctx.lineWidth = 16;
      ctx.strokeRect(0, 0, width, height);
      this.rainbowHaloOpacity -= 0.03;
    }

    // Update Star particles
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

    // Floating text popups
    for (let j = this.textPopups.length - 1; j >= 0; j--) {
      const popup = this.textPopups[j];
      popup.y += popup.vy;
      popup.life -= popup.decay;

      if (popup.life <= 0) {
        this.textPopups.splice(j, 1);
        continue;
      }

      ctx.globalAlpha = popup.life;
      ctx.font = '900 36px "Bubblegum Sans", Fredoka, sans-serif';
      ctx.fillStyle = '#FFD54F';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;
      ctx.textAlign = 'center';
      ctx.strokeText(popup.text, popup.x, popup.y);
      ctx.fillText(popup.text, popup.x, popup.y);
    }

    ctx.restore();
  }
}
