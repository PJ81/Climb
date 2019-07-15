import * as Const from "./const.js"

export default class Resources {
    constructor(cb) {
        this.images = new Array(50);

        Promise.all([
            (this.loadImage("./img/m0l.png")).then((i) => {
                this.images[Const.M0L] = i;
            }),
            (this.loadImage("./img/m1l.png")).then((i) => {
                this.images[Const.M1L] = i;
            }),
            (this.loadImage("./img/m2l.png")).then((i) => {
                this.images[Const.M2L] = i;
            }),
            (this.loadImage("./img/m0r.png")).then((i) => {
                this.images[Const.M0R] = i;
            }),
            (this.loadImage("./img/m1r.png")).then((i) => {
                this.images[Const.M1R] = i;
            }),
            (this.loadImage("./img/m2r.png")).then((i) => {
                this.images[Const.M2R] = i;
            }),
            (this.loadImage("./img/mgr.gif")).then((i) => {
                this.images[Const.MGR] = i;
            }),
            (this.loadImage("./img/mgl.gif")).then((i) => {
                this.images[Const.MGL] = i;
            }),
            (this.loadImage("./img/brk0.gif")).then((i) => {
                this.images[Const.BR0] = i;
            }),
            (this.loadImage("./img/brk1.gif")).then((i) => {
                this.images[Const.BR1] = i;
            }),
            (this.loadImage("./img/brk2.gif")).then((i) => {
                this.images[Const.BR2] = i;
            }),
            (this.loadImage("./img/brk3.gif")).then((i) => {
                this.images[Const.BR3] = i;
            }),
            (this.loadImage("./img/brk4.gif")).then((i) => {
                this.images[Const.BR4] = i;
            }),
            (this.loadImage("./img/side.png")).then((i) => {
                this.images[Const.SIDE] = i;
            }),
            (this.loadImage("./img/back.png")).then((i) => {
                this.images[Const.BACK] = i;
            }),
            (this.loadImage("./img/floorTile.gif")).then((i) => {
                this.images[Const.FLOOR] = i;
            }),
            (this.loadImage("./img/gem0.gif")).then((i) => {
                this.images[Const.GEM0] = i;
            }),
            (this.loadImage("./img/gem1.gif")).then((i) => {
                this.images[Const.GEM1] = i;
            }),
            (this.loadImage("./img/gem2.gif")).then((i) => {
                this.images[Const.GEM2] = i;
            }),
            (this.loadImage("./img/gem3.gif")).then((i) => {
                this.images[Const.GEM3] = i;
            }),
            (this.loadImage("./img/gem4.gif")).then((i) => {
                this.images[Const.GEM4] = i;
            }),
            (this.loadImage("./img/gem5.gif")).then((i) => {
                this.images[Const.GEM5] = i;
            }),
            (this.loadImage("./img/gem6.gif")).then((i) => {
                this.images[Const.GEM6] = i;
            }),
            (this.loadImage("./img/shn0.gif")).then((i) => {
                this.images[Const.SHN0] = i;
            }),
            (this.loadImage("./img/shn1.gif")).then((i) => {
                this.images[Const.SHN1] = i;
            }),
            (this.loadImage("./img/shn2.gif")).then((i) => {
                this.images[Const.SHN2] = i;
            }),
            (this.loadImage("./img/shn3.gif")).then((i) => {
                this.images[Const.SHN3] = i;
            }),
            (this.loadImage("./img/shn4.gif")).then((i) => {
                this.images[Const.SHN4] = i;
            }),
            (this.loadImage("./img/shn5.gif")).then((i) => {
                this.images[Const.SHN5] = i;
            }),
            (this.loadImage("./img/spikes.png")).then((i) => {
                this.images[Const.SPIKES] = i;
            }),
            (this.loadImage("./img/e00.gif")).then((i) => {
                this.images[Const.E00] = i;
            }),
            (this.loadImage("./img/e01.gif")).then((i) => {
                this.images[Const.E01] = i;
            }),
            (this.loadImage("./img/e02.gif")).then((i) => {
                this.images[Const.E02] = i;
            }),
            (this.loadImage("./img/e03.gif")).then((i) => {
                this.images[Const.E03] = i;
            }),
            (this.loadImage("./img/e04.gif")).then((i) => {
                this.images[Const.E04] = i;
            }),
            (this.loadImage("./img/e10.gif")).then((i) => {
                this.images[Const.E10] = i;
            }),
            (this.loadImage("./img/e11.gif")).then((i) => {
                this.images[Const.E11] = i;
            }),
            (this.loadImage("./img/e12.gif")).then((i) => {
                this.images[Const.E12] = i;
            }),
            (this.loadImage("./img/e13.gif")).then((i) => {
                this.images[Const.E13] = i;
            }),
            (this.loadImage("./img/e14.gif")).then((i) => {
                this.images[Const.E14] = i;
            }),
            (this.loadImage("./img/e20.gif")).then((i) => {
                this.images[Const.E20] = i;
            }),
            (this.loadImage("./img/e21.gif")).then((i) => {
                this.images[Const.E21] = i;
            }),
            (this.loadImage("./img/e22.gif")).then((i) => {
                this.images[Const.E22] = i;
            }),
            (this.loadImage("./img/e23.gif")).then((i) => {
                this.images[Const.E23] = i;
            }),
            (this.loadImage("./img/e24.gif")).then((i) => {
                this.images[Const.E24] = i;
            }),
            (this.loadImage("./img/e30.gif")).then((i) => {
                this.images[Const.E30] = i;
            }),
            (this.loadImage("./img/e31.gif")).then((i) => {
                this.images[Const.E31] = i;
            }),
            (this.loadImage("./img/e32.gif")).then((i) => {
                this.images[Const.E32] = i;
            }),
            (this.loadImage("./img/e33.gif")).then((i) => {
                this.images[Const.E33] = i;
            }),
            (this.loadImage("./img/e34.gif")).then((i) => {
                this.images[Const.E34] = i;
            })
        ]).then(() => {
            cb();
        });
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
        });
    }
}