import * as Const from "./const.js"
import Emitters from "./emitter.js";
import {
  rand
} from "./helpers.js"

class Gem {
  constructor() {
    this.x;
    this.y;
    this.g;
    this.t = .2;
    this.f = Math.floor(Math.random() * 8);
    this.alive = false;
  }

  get left() {
    return this.x - (Const.GEM_SIZE >> 1);
  }

  get right() {
    return this.x + (Const.GEM_SIZE >> 1);
  }

  get top() {
    return this.y - (Const.GEM_SIZE >> 1);
  }

  get bottom() {
    return this.y + (Const.GEM_SIZE >> 1);
  }

  get box() {
    return {
      t: this.top,
      l: this.left,
      r: this.right,
      b: this.bottom
    }
  }
}

class Platform {
  constructor() {
    this.x;
    this.y;
    this.len;
    this.gfkWid;
    this.gfk;
    this.platform;
    this.emitter = new Emitters();
    this.gem = new Gem();
    this.alive = false;
  }

  kill() {
    this.alive = this.gem.alive = false;
    this.emitter.kill();
  }

  set(x, y, l, g, w) {
    this.x = x;
    this.y = y;
    this.len = l;
    this.gfkWid = w;
    this.gfk = g;
    this.platform = true;
    this.alive = true;
    this.gem.alive = true;
    this.gem.x = rand(this.left + Const.GEM_SIZE, this.right - Const.GEM_SIZE);

    if (this.gem.x < Const.LEFT) {
      this.gem.x = Const.LEFT + (Const.GEM_SIZE << 1);
    } else if (this.gem.x > Const.RIGHT) {
      this.gem.x = Const.RIGHT - (Const.GEM_SIZE << 1);
    }


    this.gem.y = this.top - (Const.GEM_SIZE >> 1);
    this.gem.g = rand(0, 7);
  }

  get box() {
    return {
      t: this.top,
      l: this.left + 1,
      r: this.right - 1,
      b: this.bottom - 10
    }
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.len * (this.gfkWid - 1);
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + 11;
  }
}

export default class Level {
  constructor(res) {
    this.res = res;
    this.platforms;
    this.deadPlatforms;
    this.back;
    this.side;
    this.tileWid;
    this.reset();
  }

  reset() {
    this.platforms = [];
    this.deadPlatforms = 0;
    this.back = {
      b1: 0,
      b2: -this.res.images[Const.BACK].height,
      img: this.res.images[Const.BACK]
    };
    this.side = {
      x: Const.WIDTH - this.res.images[Const.SIDE].width,
      b1: 0,
      b2: -this.res.images[Const.SIDE].height,
      img: this.res.images[Const.SIDE]
    };

    this.tileWid = this.res.images[Const.BR0].width;
    for (let z = 0; z < 10; z++) {
      this.platforms.push(new Platform());
    }

    const p = this.platforms[0];
    p.set(22, Const.HEIGHT - 21, 3, [5, 5, 5], 60);
    p.platform = false;
    this.createPlatforms(Const.HEIGHT - 60);
  }

  createPlatforms(startY) {
    let len, startX, z = 0;
    const m = (Const.WIDTH >> 1);
    this.platforms.filter(p => !p.alive).forEach(p => {
      len = Math.floor(Math.random() * 3) + 4;
      if (!(z & 1)) {
        startX = (m + this.tileWid) - len * this.tileWid;
        if (Math.random() > .3) {
          len += Math.floor(Math.random() * 2);
        }
      } else {
        startX = m - this.tileWid;
        if (Math.random() > .3) {
          len += Math.floor(Math.random() * 2);
        }
      }
      const g = [];
      for (let z = 0; z < len; z++) {
        g.push(Math.floor(Math.random() * 5));
      }
      p.set(startX, startY, len, g, this.tileWid);
      startY -= 40;
      z++;
    });
  }

  correctY() {
    this.platforms.sort((a, b) => {
      return b.y - a.y;
    });
    let z = 0;
    for (let p of this.platforms) {
      if (p.y > 100 && p.y < 110) {
        p.y = 102;
        for (let a = z + 1; a < 10; a++) {
          const p = this.platforms[a];
          p.y = this.platforms[a - 1].y - 40;
          if (p.gem.alive) {
            p.gem.y = p.y - (Const.GEM_SIZE >> 1);
          }
        }
        for (let a = z - 1; a > -1; a--) {
          const p = this.platforms[a];
          p.y = this.platforms[a + 1].y + 40;
          if (p.gem.alive) {
            p.gem.y = p.y - (Const.GEM_SIZE >> 1);
          }
        }
        return;
      }
      z++;
    }
  }

  update(dt) {
    for (let p of this.platforms) {
      if (p.gem.alive && (p.gem.t -= dt) < 0) {
        p.gem.f = (p.gem.f + 1) % 8;
        p.gem.t = .25;
      }
      p.emitter.update(dt);
    }
  }

  pullDown(dy) {
    let m = dy * .5;
    this.back.b1 += m;
    this.back.b2 += m;

    if (this.back.b1 > Const.HEIGHT) {
      this.back.b1 = this.back.b2 - this.back.img.height;
    } else if (this.back.b2 > Const.HEIGHT) {
      this.back.b2 = this.back.b1 - this.back.img.height;
    }

    m = dy * 1.5;
    this.side.b1 += m;
    this.side.b2 += m;

    if (this.side.b1 > Const.HEIGHT) {
      this.side.b1 = this.side.b2 - this.side.img.height;
    } else if (this.side.b2 > Const.HEIGHT) {
      this.side.b2 = this.side.b1 - this.side.img.height;
    }

    m = dy;
    for (let p of this.platforms) {
      if (p.alive) {
        p.y += m;
        if (p.gem.alive) {
          p.gem.y += m;
        }

        p.emitter.pullDown(m);

        if (p.top > Const.HEIGHT) {
          p.kill();
          if (++this.deadPlatforms > 3) {
            this.createPlatforms(
              this.platforms.sort((a, b) => {
                return a.y - b.y;
              })[0].y - 40);
            this.deadPlatforms = 0;
          }
        }
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(this.back.img, 0, this.back.b1);
    ctx.drawImage(this.back.img, 0, this.back.b2);

    for (let p of this.platforms) {
      if (p.y >= -20 && p.y < Const.HEIGHT) {
        let x = p.x;
        for (let l = 0; l < p.len; l++) {
          const img = this.res.images[Const.BR0 + p.gfk[l]];
          ctx.drawImage(img, x, p.y);
          x += img.width - 1;
        }

        if (p.gem.alive) {
          ctx.drawImage(this.res.images[Const.GEM0 + p.gem.g], p.gem.left, p.gem.top);
          if (p.gem.f < 6) {
            ctx.drawImage(this.res.images[Const.SHN0 + p.gem.f], p.gem.left, p.gem.top);
          }
        }
      }
    }

    ctx.drawImage(this.side.img, 0, this.side.b1);
    ctx.drawImage(this.side.img, 0, this.side.b2);

    ctx.drawImage(this.side.img, this.side.x, this.side.b1);
    ctx.drawImage(this.side.img, this.side.x, this.side.b2);
  }

  drawParticles(ctx) {
    for (let p of this.platforms) {
      if (p.alive) p.emitter.draw(ctx);
    }
  }
}