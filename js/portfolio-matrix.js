/**
 * MATRIX OPERATING SYSTEM // AMBIENT DIGITAL RAIN
 * Lightweight, high-performance ambient Matrix rain tailored for high-contrast portfolio readability.
 */

class AmbientMatrixBackground {
  constructor(canvasId = 'ambient-matrix-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.streams = [];
    this.fontSize = 16;
    this.columns = 0;
    this.animationFrameId = null;
    this.lastTime = 0;
    this.fpsInterval = 1000 / 30; // Smooth 30 FPS for minimal CPU load

    // Color theme defaults
    this.colorTheme = 'classic';
    this.themes = {
      classic: { head: '#ffffff', body: '#00ff66', tail: '#005522' },
      cyan: { head: '#ffffff', body: '#00f0ff', tail: '#004455' },
      crimson: { head: '#ffffff', body: '#ff3344', tail: '#550811' },
      amber: { head: '#ffffff', body: '#ffaa00', tail: '#553300' },
      mono: { head: '#ffffff', body: '#cbd5e1', tail: '#334155' }
    };

    // Authentic characters: Katakana, numbers, symbols
    this.glyphs = [
      'ｦ', 'ｱ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ',
      'ﾀ', 'ﾂ', 'ﾃ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾊ', 'ﾋ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ',
      'ﾓ', 'ﾔ', 'ﾕ', 'ﾗ', 'ﾘ', 'ﾜ', '9', '8', '7', '5', '4', '3', '2', '1',
      '0', ':', '.', '=', '*', '+', '-', '<', '>', 'Z', 'X', 'V', 'R', 'E', 'A', 'C', 'T'
    ];

    // Ripple dynamic on mouse interaction
    this.ripple = { x: -1000, y: -1000, radius: 0, maxRadius: 280, active: false };

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse movement subtle interaction
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }, { passive: true });

    // Click triggers subtle cyber shockwave ripple
    window.addEventListener('click', (e) => {
      // Don't trigger if clicking interactive buttons
      if (e.target.closest('button, a, input, textarea, select')) return;
      this.ripple.x = e.clientX;
      this.ripple.y = e.clientY;
      this.ripple.radius = 10;
      this.ripple.active = true;
    });

    this.start();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.width / this.fontSize);

    this.streams = [];
    for (let i = 0; i < this.columns; i++) {
      // Stagger initial Y positions for natural distribution
      this.streams.push({
        x: i * this.fontSize,
        y: Math.random() * -this.height,
        speed: 1.2 + Math.random() * 2.8,
        length: Math.floor(12 + Math.random() * 22),
        chars: [],
        step: 0
      });
    }
  }

  setTheme(themeName) {
    if (this.themes[themeName]) {
      this.colorTheme = themeName;
    }
  }

  getRandomGlyph() {
    return this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
  }

  draw(timestamp) {
    this.animationFrameId = requestAnimationFrame((t) => this.draw(t));

    const elapsed = timestamp - this.lastTime;
    if (elapsed < this.fpsInterval) return;
    this.lastTime = timestamp - (elapsed % this.fpsInterval);

    // Semi-transparent fade creates classic phosphor persistence
    this.ctx.fillStyle = 'rgba(4, 8, 6, 0.22)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const colors = this.themes[this.colorTheme] || this.themes.classic;
    this.ctx.font = `${this.fontSize}px "JetBrains Mono", monospace`;

    // Process ripple
    if (this.ripple.active) {
      this.ripple.radius += 12;
      if (this.ripple.radius > this.ripple.maxRadius) {
        this.ripple.active = false;
      }
    }

    for (let i = 0; i < this.streams.length; i++) {
      const s = this.streams[i];

      // Occasional character mutation
      if (Math.random() < 0.15 || s.chars.length < s.length) {
        s.chars.unshift(this.getRandomGlyph());
        if (s.chars.length > s.length) s.chars.pop();
      }

      // Check distance to ripple for wave displacement
      let renderX = s.x;
      let renderY = s.y;
      if (this.ripple.active) {
        const dx = renderX - this.ripple.x;
        const dy = renderY - this.ripple.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const waveDiff = Math.abs(dist - this.ripple.radius);
        if (waveDiff < 30) {
          const factor = (1 - waveDiff / 30) * 8;
          renderX += (dx / dist) * factor;
        }
      }

      for (let j = 0; j < s.chars.length; j++) {
        const charY = renderY - (j * this.fontSize);
        if (charY < -this.fontSize || charY > this.height + this.fontSize) continue;

        if (j === 0) {
          // Leading glyph: bright white phosphor flash
          this.ctx.fillStyle = colors.head;
          this.ctx.shadowColor = colors.body;
          this.ctx.shadowBlur = 8;
        } else if (j < 3) {
          // Bright body
          this.ctx.fillStyle = colors.body;
          this.ctx.shadowColor = colors.body;
          this.ctx.shadowBlur = 4;
        } else {
          // Fading tail
          const alpha = 1 - (j / s.length);
          this.ctx.fillStyle = colors.tail;
          this.ctx.shadowBlur = 0;
          this.ctx.globalAlpha = Math.max(0.15, alpha * 0.7);
        }

        this.ctx.fillText(s.chars[j], renderX, charY);
        this.ctx.globalAlpha = 1.0;
        this.ctx.shadowBlur = 0;
      }

      // Advance stream
      s.y += s.speed * this.fontSize * 0.5;

      // Reset when whole stream falls off screen
      if (s.y - (s.length * this.fontSize) > this.height) {
        s.y = -this.fontSize;
        s.speed = 1.2 + Math.random() * 2.8;
        s.length = Math.floor(12 + Math.random() * 22);
      }
    }
  }

  start() {
    if (!this.animationFrameId) {
      this.draw(performance.now());
    }
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Global instance handle
window.matrixBg = null;
window.addEventListener('DOMContentLoaded', () => {
  window.matrixBg = new AmbientMatrixBackground('ambient-matrix-canvas');
});
