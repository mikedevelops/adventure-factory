import { State } from "../State";

export abstract class AbstractErrorState implements State {
  abstract getName(): string;

  update(): State | null {
    return null;
  }
}
