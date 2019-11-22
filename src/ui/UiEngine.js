export default class UiEngine {
  /**
   * @param {Animator} animator
   * @param {PIXI.Application} renderer
   */
  constructor(animator, renderer) {
    /**
     * @type {Animator}
     */
    this.animator = animator;
    /**
     * @type {PIXI.Application}
     */
    this.renderer = renderer;
  }

  waitForInput() {
    // this.animator.blink(
    //   this.renderer.drawWaitingForInput.bind(this.renderer),
    //   this.renderer.clearWaitingForInput.bind(this.renderer)
    // );
  }

  clearWaitForInput() {
    // this.animator.clearBlink();
  }
}
