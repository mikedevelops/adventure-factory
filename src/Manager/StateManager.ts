import { State } from "../State/State";
import { isStateWithEnter } from "../State/StateWithEnter";
import { isStateWithLeave } from "../State/StateWithLeave";
import { Runtime } from "../Runtime/Runtime";
import { isStateWithRuntime } from "../State/StateWithRuntime";

export class StateManager {
  private state: State | null = null;
  private runtime: Runtime | null = null;

  public update(): void {
    if (this.state === null) {
      return;
    }

    const next = this.state.update();

    if (next === null) {
      return;
    }

    this.setState(next);
  }

  public setState(state: State): void {
    console.log("Setting state: ", state.getName());

    if (isStateWithEnter(state)) {
      state.enter();
    }

    if (isStateWithRuntime(state)) {
      if (this.runtime === null) {
        throw new Error("No runtime set in StateManager");
      }

      state.injectRuntime(this.runtime);
    }

    if (this.state !== null && isStateWithLeave(this.state)) {
      this.state.leave();
    }

    this.state = state;
  }

  public getState(): State | null {
    return this.state;
  }

  public setRuntime(runtime: Runtime): void {
    this.runtime = runtime;
  }
}
