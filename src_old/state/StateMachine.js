export const STATE_IDLE = "STATE_IDLE";

export default class StateMachine {
  constructor() {
    this.state = null;
  }

  update() {
    if (this.state === null) {
      return;
    }

    const next = this.state.update();

    if (next === null) {
      return;
    }

    this.setState(next);
  }

  /**
   * @param {AbstractState} state
   */
  setState(state) {
    console.log(state.getName());

    if (this.state !== null && this.state.hasOwnProperty("leave")) {
      this.state.leave();
    }

    if (state.hasOwnProperty("enter")) {
      state.enter();
    }

    this.state = state;
  }
}
