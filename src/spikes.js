import * as Const from "./const.js";

export default class Spikes {
  constructor(img) {
    this.y = Const.HEIGHT + 100;
    this.img = img;
    this.hold = 0;
    this.accel = 0;
  }

  update(dt) {
    if (--this.hold > 0) return;
    this.hold = 0;
    this.y -= dt * 12 * this.accel;
    this.accel += dt * .015;
  }

  holdMe() {
    this.hold += 10;
  }

  draw(ctx) {
    ctx.drawImage(this.img, 22, this.y);
  }

  reset() {
    this.hold = this.accel = 0;
    this.y = Const.HEIGHT + 10;
  }

  pullDown(dy) {
    this.y += dy;
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
    return this.x + this.img.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.img.height;
  }
}