import * as Const from "./const.js"

export default class Player {
  constructor(res, snd) {
    this.frames = [Const.M0L, Const.M1L, Const.M0L, Const.M2L, Const.M0R, Const.M1R, Const.M0R, Const.M2R, Const.MGL, Const.MGR];
    this.width = res.images[Const.M0L].width;
    this.height = res.images[Const.M0L].height;
    this.res = res;
    this.x;
    this.y;
    this.speed;
    this.dir;
    this.minX;
    this.maxX;
    this.plt;
    this.jumping;
    this.jumpPower;
    this.alive;
    this.stoned;
    this.stoneTime;
    this.sound = snd;
    this.trailTime;
    this.animTime;
    this.animFrame;
    this.reset();
  }

  reset() {
    this.x = Const.RIGHT - 30;
    this.y = Const.HEIGHT - 100;
    this.speed = 40;
    this.dir = 1;
    this.plt = null;
    this.minX = -1;
    this.maxX = 9999;
    this.jumping = true;
    this.jumpPower = 0;
    this.alive = true;
    this.stoned = false;
    this.trailTime = .15;
    this.animTime = .15;
    this.animFrame = 0;
  }

  update(dt) {
    if ((this.animTime -= dt) < 0) {
      this.animTime = .15;
      this.animFrame = (this.animFrame + 1) % 4;
    }

    if (this.jumping) {
      this.y += this.jumpPower * dt;
      this.jumpPower += Const.GRAVITY * dt * 1.2;
    }

    if (this.stoned) {
      if ((this.stoneTime -= dt) < 0) {
        this.stoned = false;
        this.sound.play(0);
      } else return;
    }

    this.x += this.speed * this.dir * dt;
    if (this.plt && (this.trailTime -= dt) < 0) {
      this.trailTime = .15;
      this.plt.emitter.start(Const.TRAIL, this.x, this.bottom);
    }


    if (this.dir < 0 && this.left < Math.max(this.minX, Const.LEFT)) {
      this.dir = -this.dir;
    } else if (this.dir > 0 && this.right > Math.min(this.maxX, Const.RIGHT)) {
      this.dir = -this.dir;
    }
  }

  draw(ctx) {
    const img = this.dir < 0 ? (!this.stoned ? this.res.images[this.frames[this.animFrame]] : this.res.images[this.frames[8]]) :
      (!this.stoned ? this.res.images[this.frames[this.animFrame + 4]] : this.res.images[this.frames[9]]);
    ctx.drawImage(img, this.left, this.top);
  }

  get left() {
    return this.x - (this.width >> 1);
  }

  get right() {
    return this.x + (this.width >> 1);
  }

  get top() {
    return this.y - (this.height >> 1);
  }

  get bottom() {
    return this.y + (this.height >> 1);
  }

  get box() {
    if (!this.alive) return {
      t: 0,
      l: 0,
      r: 0,
      b: 0
    };
    return {
      t: this.top,
      l: this.left + 2,
      r: this.right - 2,
      b: this.bottom
    }
  }

  landed(plt) {
    this.jumpPower = 0;
    this.jumping = false;
    if (plt) {
      this.y = plt.y - (this.height >> 1);
      this.minX = plt.x
      this.maxX = plt.x + plt.len * (plt.gfkWid - 1);
      this.plt = plt;
    } else {
      this.minX = -1;
      this.maxX = 9999;
    }
  }

  jump() {
    if (this.jumping || this.stoned) return;
    this.sound.play(3);
    this.minX = -1;
    this.maxX = 9999;
    this.jumpPower = -150;
    this.jumping = true;
    this.canJump = false;
  }

  pullDown(dt) {
    this.y += dt;
  }

  stone() {
    this.stoned = true;
    this.stoneTime = 3;
    this.sound.play(4);


    if (this.plt) {
      this.plt.emitter.start(Const.BIGSMOKE, this.x, this.y);
    }
  }
}