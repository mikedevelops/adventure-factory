import { State } from "../State";
import { GameState } from "../Game/GameState";
import { StateWithRuntime } from "../StateWithRuntime";
import { Runtime } from "../../Runtime/Runtime";
import { StateWithEnter } from "../StateWithEnter";
import { CannotGetFirstSceneException } from "../../Exceptions/CannotGetFirstSceneException";
import { DelegatingSceneActionState } from "./DelegatingSceneActionState";

export const S_LOADED = "S_LOADED";

export class LoadedState implements State, StateWithRuntime, StateWithEnter {
  private runtime: Runtime | null = null;

  constructor(private gameState: GameState) {}

  getName(): string {
    return S_LOADED;
  }

  update(): State | null {
    const scene = this.gameState.getScenes().find(scene => !scene.isComplete());

    if (scene === undefined) {
      throw new CannotGetFirstSceneException();
    }

    return new DelegatingSceneActionState(scene);
  }

  injectRuntime(runtime: Runtime): void {
    this.runtime = runtime;
  }

  getRuntime(): Runtime {
    if (this.runtime === null) {
      throw new Error("Attempted to get runtime before it was injected");
    }

    return this.runtime;
  }

  enter(): void {
    this.getRuntime().setState(this.gameState);
  }
}
