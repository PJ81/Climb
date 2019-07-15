import * as Const from "./const.js";
import {
  rand
} from "./helpers.js";

class Monster {
  constructor() {
    this.x;
    this.y;
    this.alive = false;
    this.minX = -1;
    this.maxX = 9999;
    this.dx;
    this.dy;
    this.dir;
    this.img;
    this.wid;
    this.hei;
    this.animFrm;
    this.animTime = .2;
  }

  get box() {
    return {
      t: this.top,
      l: this.left,
      r: this.right,
      b: this.bottom
    };
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.wid;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.hei;
  }
}

export default class Mosters {
  constructor(res) {
    this.res = res;
    this.monsters;
    this.monAlive;
    this.roundCount;
    this.reset();
  }

  OneMore() {
    this.roundCount++;
  }

  createMonster() {
    const m = this.getMonster();
    if (!m) return;
    this.monAlive++;
    m.alive = true;
    let i = Math.floor(Math.random() * 4) * 5 + Const.E00;
    m.img = [i, i + 1, i + 2, i + 3, i + 4, i + 3, i + 2, i + 1];
    m.animFrm = Math.floor(Math.random() * m.img.length);
    m.y = -20;
    m.x = rand(40, 100);
    m.minX = -1;
    m.maxX = 9999;
    m.dx = Math.random() * 12 + 30;
    m.dy = 2;
    m.dir = Math.random() < .5 ? -1 : 1;
    m.wid = this.res.images[m.img[0]].width;
    m.hei = this.res.images[m.img[0]].height;
  }

  getMonster() {
    for (let m = 0, l = this.monsters.length; m < l; m++) {
      const z = this.monsters[m];
      if (!z.alive) {
        return z;
      }
    }
    return null;
  }

  update(dt) {
    for (let m of this.monsters) {
      if (!m.alive) continue;

      if ((m.animTime -= dt) < 0) {
        m.animTime = .08;
        m.animFrm = (m.animFrm + 1) % m.img.length;
      }

      m.x += m.dir * m.dx * dt;

      if (m.dir < 0 && m.left < Math.max(m.minX, Const.LEFT)) {
        m.dir = -m.dir;
      } else if (m.dir > 0 && m.right > Math.min(m.maxX, Const.RIGHT)) {
        m.dir = -m.dir;
      }

      m.dy += Const.GRAVITY * dt;
      m.y += m.dy * dt;

      if (m.top > Const.HEIGHT) {
        m.alive = false;
        if (--this.monAlive <= 0) {
          for (let t = 0; t < this.roundCount; t++) {
            this.createMonster();
          }
        }
      }
    }
  }

  draw(ctx) {
    for (let m of this.monsters) {
      if (m.alive) {
        ctx.drawImage(this.res.images[m.img[m.animFrm]], m.x, m.y);
      }
    }
  }

  reset() {
    this.monsters = [];
    for (let e = 0; e < 20; e++) {
      this.monsters.push(new Monster());
    }
    this.monAlive = 0;
    this.roundCount = 1;

    this.createMonster();
  }
}