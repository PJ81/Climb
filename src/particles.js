import * as Const from "./const.js"

class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.g = 0;
    this.alpha = 0;
    this.color = "rgba(0,0,0,0)";
    this.size = 0;
    this.alive = false;
    this.type = 0;
  }

  update(dt) {
    switch (this.type) {
      case Const.SHINE:
        if ((this.alpha -= dt * .5) < 0) {
          this.alive = false;
          return;
        }
        break;
      case Const.SMOKE:
      case Const.TRAIL:
        this.size += dt * 3;
        if ((this.alpha -= dt) < 0) {
          this.alive = false;
          return;
        }
        break;
      case Const.BIGSMOKE:
        this.size += dt * 5;
        if ((this.alpha -= dt) < 0) {
          this.alive = false;
          return;
        }
        break;
    }
    this.x += this.vx * dt;
    this.vy += this.g * dt;
    this.y += this.vy * dt;
  }
}

export default class Particles {
  constructor() {
    this.particles = [];
    this.colors = [
      "rgba(255,255,255,",
      "rgba(251,251,0,",
      "rgba(255,255,255,"
    ]

    for (let p = 0; p < 100; p++) {
      this.particles.push(new Particle());
    }
  }

  reset() {
    for (let p of this.particles) {
      p.alive = false;
    }
  }

  update(dt) {
    let f = false;
    for (let p of this.particles) {
      if (p.alive) {
        p.update(dt);
        f = true;
      }
    }
    return f;
  }

  draw(ctx, x = 0, y = 0) {
    for (let p of this.particles) {
      if (p.alive) {
        ctx.fillStyle = p.color + p.alpha + ")";
        const t = p.size >> 1;
        ctx.fillRect(x + p.x - t, y + p.y - t, p.size, p.size);
      }
    }
  }

  getPart() {
    for (let p of this.particles) {
      if (!p.alive) return p;
    }
    return null;
  }

  startBigSmoke(x, y) {
    for (let t = 0; t < 64; t++) {
      const r = this.getPart();
      if (r) {
        r.x = ((Math.random() * 3) * (Math.random() > .5 ? 1 : -1));
        r.y = 0;
        r.vx = (Math.random() * 6 + 6) * (Math.random() > .5 ? 1 : -1);
        r.vy = (Math.random() * 6 + 6) * (Math.random() > .5 ? 1 : -1);
        r.g = -2.5;
        r.alpha = .5;
        r.color = "rgba(154,134,157,";
        r.size = Math.random() * 6 + 2;
        r.alive = true;
        r.type = Const.BIGSMOKE;
      }
    }
  }

  startTrail(x, y) {
    for (let t = 0; t < 2; t++) {
      const r = this.getPart();
      if (r) {
        r.x = ((Math.random() * 3) * (Math.random() > .5 ? 1 : -1));
        r.y = 0;
        r.vx = Math.random() * (Math.random() > .5 ? 1 : -1);
        r.vy = -(Math.random() * 6 + 6);
        r.g = -.5;
        r.alpha = .5;
        r.color = "rgba(154,134,157,";
        r.size = Math.random() * 2 + 1;
        r.alive = true;
        r.type = Const.SMOKE;
      }
    }
  }

  startSmoke(x, y) {
    for (let t = 0; t < 16; t++) {
      const r = this.getPart();
      if (r) {
        r.x = ((Math.random() * 3) * (Math.random() > .5 ? 1 : -1));
        r.y = 0;
        r.vx = Math.random() * (Math.random() > .5 ? 1 : -1);
        r.vy = -(Math.random() * 6 + 6);
        r.g = -.5;
        r.alpha = .5;
        r.color = "rgba(154,134,157,";
        r.size = Math.random() * 2 + 1;
        r.alive = true;
        r.type = Const.SMOKE;
      }
    }
  }

  startShine() {
    for (let t = 0; t < 20; t++) {
      const r = this.getPart();
      if (r) {
        r.x = ((Math.random() * 3) * (Math.random() > .5 ? 1 : -1));
        r.y = -Math.random() * 5;
        r.vx = 0;
        r.vy = -(Math.random() * 40 + 10);
        r.g = 2;
        r.alpha = .75;
        r.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        r.size = 1;
        r.alive = true;
        r.type = Const.SHINE;
      }
    }
  }
}