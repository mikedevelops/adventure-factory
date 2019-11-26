import { StateManager } from "../Manager/StateManager";
import { Scene } from "../Entities/Scene";
import { GameState } from "../State/Game/GameState";
import { LoadingState } from "../State/Runtime/LoadingState";
import { LoadedState } from "../State/Runtime/LoadedState";
import { NoScenesLoadedErrorState } from "../State/Error/NoScenesLoadedErrorState";
import { DelegatingSceneActionState } from "../State/Runtime/DelegatingSceneActionState";
import { I_DOWN, I_NEXT, I_UP, Input } from "../Input/Input";
import { isStateWithInput } from "../State/StateWithInput";

export class Runtime {
  private scenes: Scene[] = [];
  constructor(private stateManager: StateManager) {}

  public init(): void {
    window.addEventListener("keydown", this.handleInput.bind(this));

    this.update();
  }

  public load(state: GameState): void {
    this.stateManager.setState(new LoadingState());
    this.scenes = state.getScenes();
    this.stateManager.setState(new LoadedState());
  }

  public start(): void {
    const scene = this.scenes.find(scene => !scene.isComplete());

    if (scene === undefined) {
      this.stateManager.setState(new NoScenesLoadedErrorState());
      return;
    }

    this.stateManager.setState(new DelegatingSceneActionState(scene));
  }

  public update(): void {
    this.stateManager.update();

    requestAnimationFrame(this.update.bind(this));
  }

  private handleInput(event: KeyboardEvent): void {
    const input = new Input();

    switch (event.code) {
      case "Enter":
        input.setType(I_NEXT);
        break;
      case "ArrowUp":
        input.setType(I_UP);
        break;
      case "ArrowDown":
        input.setType(I_DOWN);
        break;
    }

    const state = this.stateManager.getState();

    if (state !== null && isStateWithInput(state)) {
      state.handleInput(input);
    }
  }
}
