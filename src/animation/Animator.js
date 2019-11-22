export default class Animator {
  constructor() {
    /**
     * @type {boolean}
     */
    this.playing = false;
    /**
     * @type {Map<string, number>}
     */
    this.timeouts = new Map();
  }

  blink(draw, clear, on = true) {
    this.playing = true;
    this.timeouts.set(
      "blink",
      setTimeout(() => {
        if (on) {
          draw();
        } else {
          clear();
        }

        if (this.playing) {
          this.blink(draw, clear, !on);
        }
      }, 500)
    );
  }

  clearBlink() {
    const id = this.timeouts.get("blink");

    if (id === undefined) {
      return;
    }

    clearTimeout(id);
  }
}
