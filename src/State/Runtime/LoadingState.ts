import { State } from "../State";
import { StateWithEnter } from "../StateWithEnter";
import { EventManager } from "../../Manager/EventManager";
import { S_LOADED, LoadedState } from "./LoadedState";

export const S_LOADING = "S_LOADING";

export class LoadingState implements State, StateWithEnter {
  private loaded = false;

  update(): State | null {
    if (!this.loaded) {
      return null;
    }

    return new LoadedState();
  }

  getName(): string {
    return S_LOADING;
  }

  enter(): void {
    EventManager.instance.listen(S_LOADED, () => {
      this.loaded = true;
    });
  }
}
