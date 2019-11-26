import { State } from "../State";
import { Choice } from "../../Entities/Choice";

export const S_SELECTED_OPTION = "S_SELECTED_OPTION";

export class SelectedOptionState implements State {
  constructor(private choice: Choice) {
    console.log(choice.getFocusedOption());
  }

  getName(): string {
    return S_SELECTED_OPTION;
  }

  update(): State | null {
    return null;
  }
}
