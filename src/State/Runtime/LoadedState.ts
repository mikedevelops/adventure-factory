import { State } from "../State";

export const S_LOADED = "S_LOADED";

export class LoadedState implements State {
  getName(): string {
    return S_LOADED;
  }

  update(): State | null {
    return null;
  }
}
