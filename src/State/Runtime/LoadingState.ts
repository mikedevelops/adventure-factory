import { State } from "../State";
import { StateWithEnter } from "../StateWithEnter";
import { LoadedState } from "./LoadedState";
import { LoadGameStateManager } from "../../Manager/LoadGameStateManager";
import { GameState } from "../Game/GameState";

export const S_LOADING = "S_LOADING";

export class LoadingState implements State, StateWithEnter {
  private gameState: GameState | null = null;

  constructor(private loader: LoadGameStateManager, private save: string) {}

  update(): State | null {
    if (this.gameState === null) {
      return null;
    }

    return new LoadedState(this.gameState);
  }

  getName(): string {
    return S_LOADING;
  }

  enter(): void {
    this.loader.load(this.save).then((gameState: GameState) => {
      this.gameState = gameState;
    });
  }
}
