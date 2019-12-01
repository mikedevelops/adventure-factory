import { State } from "../State";
import { StateWithInput } from "../StateWithInput";
import { StateWithEnter } from "../StateWithEnter";
import { I_NEXT, Input } from "../../Input/Input";
import { TextService } from "../../Service/TextService";
import { Choice } from "../../Entities/Choice";
import { Scene } from "../../Entities/Scene";
import { WaitingForUserSelectionState } from "../Interaction/WaitingForUserSelectionState";
import { ChoiceController } from "../../Controller/ChoiceController";
import { PassageController } from "../../Controller/PassageController";

export const S_PRINTING_CHOICE = "S_PRINTING_CHOICE";

export class PrintingChoiceState
  implements State, StateWithInput, StateWithEnter {
  private printed = false;

  constructor(private scene: Scene, private choice: Choice) {}

  enter(): void {
    PassageController.instance.clear();
    ChoiceController.instance.print(this.choice).then(() => {
      this.printed = true;
    });
  }

  getName(): string {
    return S_PRINTING_CHOICE;
  }

  handleInput(input: Input): void {
    if (input.getType() !== I_NEXT) {
      return;
    }

    ChoiceController.instance.skip();
  }

  update(): State | null {
    if (!this.printed) {
      return null;
    }

    return new WaitingForUserSelectionState(this.choice);
  }
}
