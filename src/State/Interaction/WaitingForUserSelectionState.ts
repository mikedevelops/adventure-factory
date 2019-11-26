import { StateWithInput } from "../StateWithInput";
import { State } from "../State";
import { I_DOWN, I_NEXT, I_UP, Input } from "../../Input/Input";
import { Choice } from "../../Entities/Choice";
import { Option } from "../../Entities/Option";
import { FocusingOptionState } from "../Entities/FocusingOptionState";
import { LocationChangeState } from "../Entities/LocationChangeState";

export const S_WAITING_FOR_SELECTION = "S_WAITING_FOR_SELECTION";

export class WaitingForUserSelectionState implements State, StateWithInput {
  private focused: Option | null = null;
  private selected = false;

  constructor(private choice: Choice) {}

  getName(): string {
    return S_WAITING_FOR_SELECTION;
  }

  handleInput(input: Input): void {
    const type = input.getType();

    switch (type) {
      case I_NEXT:
        this.selected = true;
        return;
      case I_UP:
        this.focused = this.choice.focusOption(-1);
        return;
      case I_DOWN:
        this.focused = this.choice.focusOption(1);
        return;
    }
  }

  update(): State | null {
    if (this.selected) {
      return new LocationChangeState(this.choice);
    }

    if (this.focused !== null) {
      return new FocusingOptionState(this.choice, this.focused);
    }

    return null;
  }
}
