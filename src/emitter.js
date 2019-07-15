import * as Const from "./const.js"
import Particles from "./particles.js"

class Emitter {
  constructor() {
    this.parts = new Particles();
    this.alive = false;
    this.x = 0;
    this.y = 0;
  }

  update(dt) {
    this.alive = this.parts.update(dt);
  }

  draw(ctx) {
    this.parts.draw(ctx, this.x, this.y);
  }

  start(type, x, y) {
    switch (type) {
      case Const.SMOKE:
        this.parts.startSmoke();
        break;
      case Const.BIGSMOKE:
        this.parts.startBigSmoke();
        break;
      case Const.SHINE:
        this.parts.startShine();
        break;
      case Const.TRAIL:
        this.parts.startTrail();
        break;
    }
    this.x = x;
    this.y = y;
    this.alive = true;
  }
}

export default class Emitters {
  constructor() {
    this.emitters = [];
    for (let m = 0; m < 15; m++) {
      this.emitters.push(new Emitter());
    }
  }

  kill() {
    for (const i of this.emitters) {
      i.alive = false;
      i.parts.reset();
    }
  }

  update(dt) {
    for (const i of this.emitters) {
      if (i.alive) i.update(dt);
    }
  }

  pullDown(dt) {
    for (const i of this.emitters) {
      if (i.alive) i.y += dt;
    }
  }

  draw(ctx) {
    for (const i of this.emitters) {
      if (i.alive) i.draw(ctx);
    }
  }

  start(what, x, y) {
    const e = this.getEmitter();
    e && e.start(what, x, y);
  }

  getEmitter() {
    for (let m = 0, l = this.emitters.length; m < l; m++) {
      const z = this.emitters[m];
      if (!z.alive) return z;
    }
    return null;
  }
}