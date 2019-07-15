import * as Const from "./const.js";
import Resouces from "./resources.js";
import Game from "./game.js";
import Level from "./level.js";
import Monsters from "./monsters.js";
import Player from "./player.js";
import Sound from "./sound.js";

import {
  easeInOutQuad
} from "./helpers.js"
import Spikes from "./spikes.js";

class Climb extends Game {
  constructor() {
    super();
    this.ctx.imageSmoothingEnabled = false;
    this.level;
    this.monsters;
    this.player;
    this.gemsCount = 0;
    this.platformsCount = 0;
    this.pullDown = false;
    this.gameOver = false;
    this.spikes;
    this.mem;
    this.pullDown;
    this.start;
    this.dist;
    this.duration;
    this.time;
    this.trailTime = .15;
    this.platformsRoundCount = 0;

    this.sound = new Sound([
      "../snd/back.ogg", "../snd/dead.ogg", "../snd/diamond.ogg", "../snd/jump.ogg", "../snd/stone.ogg"
    ]);

    this.createMuteBtn();

    this.res = new Resouces(() => {
      this.load();
      this.loop(0);
    });

    this.canvas.addEventListener("click", () => {
      if (this.gameOver) {
        this.reset();
      } else {
        this.player.jump();
      }
    }, false);
  }

  createMuteBtn() {
    const mute = document.createElement("div");
    mute.id = "mute";
    mute.state = true;
    mute.innerText = "🔊";
    mute.addEventListener("click", () => {
      const state = this.sound.mute();
      if (state) {
        mute.innerText = "🔈";
      } else {
        mute.innerText = "🔊";
      }
    }, false);
    document.body.appendChild(mute);
  }

  reset() {
    this.level.reset();
    this.monsters.reset();
    this.player.reset();
    this.spikes.reset();
    this.gameOver = false;
    this.gemsCount = 0;
    this.platformsCount = 0;
    platformsRoundCount = 0;
    this.trailTime = .15;
  }

  load() {
    this.level = new Level(this.res);
    this.monsters = new Monsters(this.res);
    this.player = new Player(this.res, this.sound);
    this.spikes = new Spikes(this.res.images[Const.SPIKES]);
  }

  update(dt) {
    this.trailTime -= dt;
    this.level.update(dt);

    if (this.pullDown) {
      const y = easeInOutQuad(this.time, this.start, this.dist, this.duration);
      const m = y - this.mem;
      this.mem = y;

      this.level.pullDown(m);
      this.player.pullDown(m);
      this.spikes.pullDown(m);

      this.time += dt;
      if (this.time >= this.duration) {
        this.pullDown = false;
        this.level.correctY();
      }
    }

    if (!this.gameOver) {
      this.spikes.update(dt);
      this.monsters.update(dt);
      this.player.update(dt);
      this.checkCollision();
    }
  }

  draw() {
    this.level.draw(this.ctx);

    this.ctx.fillStyle = "#dedede";
    this.ctx.textAlign = "left";
    this.ctx.font = "8px 'Press Start 2P'";
    this.ctx.fillText(`${this.gemsCount}/${this.platformsCount}`, 6, 12);

    this.monsters.draw(this.ctx);
    this.spikes.draw(this.ctx);

    if (!this.gameOver) {
      this.player.draw(this.ctx);
    } else {
      this.ctx.fillStyle = "#dedede";
      this.ctx.textAlign = "center";
      this.ctx.font = "17px 'Press Start 2P'";
      this.ctx.fillText("GAME OVER", Const.WIDTH >> 1, Const.HEIGHT * .405);
      this.ctx.font = "6px 'Press Start 2P'";
      this.ctx.fillText("CLICK TO PLAY", Const.WIDTH >> 1, Const.HEIGHT * .485);
    }
    this.level.drawParticles(this.ctx);
  }

  checkCollision() {
    function collided(a, b) {
      return !(((a.b < b.t) || (a.t > b.b) || (a.r < b.l) || (a.l > b.r)));
    }

    if (this.player.top > Const.HEIGHT) {
      this.gameOver = true;
      this.sound.play(1);
      return;
    }

    const pBox = this.player.box;

    if (collided(pBox, this.spikes.box)) {
      this.player.stoned = false;
      this.player.alive = false;
      this.player.jump();
      return;
    }

    const pts = this.level.platforms.filter(f => (f.y > 0 && f.y < Const.HEIGHT));
    if (this.player.jumping && this.player.jumpPower > 0) {
      for (let p of pts) {
        if (collided(pBox, p.box) &&
          Math.abs(p.top - this.player.bottom) < 3) {
          p.emitter.start(Const.SMOKE, this.player.x, this.player.bottom);
          this.player.landed(p);
          this.platformsCount += p.platform ? 1 : 0;
          this.platformsRoundCount += p.platform ? 1 : 0;
          if (this.platformsRoundCount > 15) {
            this.platformsRoundCount = 0;
            this.monsters.OneMore();
          }
          p.platform = false;
          if (this.player.y < 97) {
            this.startPullDown();
          }
          break;
        }
      }
    }

    for (let m of this.monsters.monsters) {
      if (!m.alive) continue;
      const mbox = m.box;
      if (collided(pBox, mbox)) {
        if (!this.player.stoned) {
          this.player.stone();
        }
      }

      for (let p of pts) {
        if (collided(mbox, p.box)) {
          m.dy = 0;
          m.y = p.top - m.hei;
          if (this.trailTime < 0) {
            this.trailTime = .15;
            p.emitter.start(Const.TRAIL, m.x + (m.wid >> 1), m.bottom);
          }
          break;
        }
      }
    }

    for (let p of pts) {
      if (!p.gem.alive) continue;
      if (collided(pBox, p.gem.box)) {
        this.gemsCount++;
        this.sound.play(2);
        p.emitter.start(Const.SHINE, p.gem.x, p.gem.bottom);
        p.gem.alive = false;
        this.spikes.holdMe();
      }
    }
  }

  startPullDown() {
    this.pullDown = true;
    this.start = 0;
    this.dist = 40;
    this.duration = .75;
    this.time = 0;
    this.mem = 0;
  }
}

new Climb();