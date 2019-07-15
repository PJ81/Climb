export default class Sound {
  constructor(sndList) {
    this.sounds = new Array(sndList.length);
    this.muted = false;

    sndList.forEach((src, i) => {
      const snd = new Audio(src);
      snd.setAttribute("preload", "auto");
      snd.setAttribute("controls", "none");
      snd.style.display = "none";
      document.body.appendChild(snd);
      this.sounds[i] = snd;
    });
  }

  play(snd) {
    (!this.muted) && this.sounds[snd].play();
  }

  stop(snd) {
    this.sounds[snd].pause();
  }

  mute() {
    this.muted = !this.muted;
    return this.muted;
  }
}