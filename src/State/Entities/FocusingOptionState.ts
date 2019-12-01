import { StateWithEnter } from "../StateWithEnter";
import { State } from "../State";
import { UiService } from "../../Service/UiService";
import { Option } from "../../Entities/Option";
import { WaitingForUserSelectionState } from "../Interaction/WaitingForUserSelectionState";
import { Choice } from "../../Entities/Choice";
import { ChoiceController } from "../../Controller/ChoiceController";

export const S_FOCUSING_OPTION = "S_FOCUSING_OPTION";

export class FocusingOptionState implements State, StateWithEnter {
  private focused = false;
  constructor(private choice: Choice, private option: Option) {}

  enter(): void {
    ChoiceController.instance.focusOption(this.option).then(() => {
      this.focused = true;
    });
  }

  getName(): string {
    return S_FOCUSING_OPTION;
  }

  update(): State | null {
    if (!this.focused) {
      return null;
    }

    return new WaitingForUserSelectionState(this.choice);
  }
}
