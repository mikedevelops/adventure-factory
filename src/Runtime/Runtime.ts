import { StateManager } from "../Manager/StateManager";
import { Scene } from "../Entities/Scene";
import { GameState } from "../State/Game/GameState";
import { LoadingState } from "../State/Runtime/LoadingState";
import { NoScenesLoadedErrorState } from "../State/Error/NoScenesLoadedErrorState";
import { DelegatingSceneActionState } from "../State/Runtime/DelegatingSceneActionState";
import { I_DOWN, I_NEXT, I_UP, Input } from "../Input/Input";
import { isStateWithInput } from "../State/StateWithInput";
import { LoadGameStateManager } from "../Manager/LoadGameStateManager";

export class Runtime {
  private state: GameState = new GameState();

  constructor(
    private stateManager: StateManager,
    private loadGameStateManager: LoadGameStateManager
  ) {}

  public init(): void {
    window.addEventListener("keydown", this.handleInput.bind(this));

    this.stateManager.setRuntime(this);
    this.update();
  }

  public load(state: string): void {
    this.stateManager.setState(
      new LoadingState(this.loadGameStateManager, state)
    );
  }

  public setState(state: GameState): void {
    this.state = state;
  }

  public start(): void {
    const scene = this.state.getScenes().find(scene => !scene.isComplete());

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

  public getSceneById(id: string): Scene {
    const scene = this.state.getScenes().find(s => s.getId() === id);

    if (scene === undefined) {
      throw new Error(`No Scene found with ID ${id}`);
    }

    return scene;
  }
}
