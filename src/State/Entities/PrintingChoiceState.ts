import { State } from "../State";
import { StateWithInput } from "../StateWithInput";
import { StateWithEnter } from "../StateWithEnter";
import { I_NEXT, Input } from "../../Input/Input";
import { TextService } from "../../Service/TextService";
import { Choice } from "../../Entities/Choice";
import { Scene } from "../../Entities/Scene";
import { WaitingForUserSelectionState } from "../Interaction/WaitingForUserSelectionState";

export const S_PRINTING_CHOICE = "S_PRINTING_CHOICE";

export class PrintingChoiceState
  implements State, StateWithInput, StateWithEnter {
  private printed = false;

  constructor(private scene: Scene, private choice: Choice) {}

  enter(): void {
    TextService.instance.printChoice(this.choice).then(() => {
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

    TextService.instance.skipTyping();
  }

  update(): State | null {
    if (!this.printed) {
      return null;
    }

    return new WaitingForUserSelectionState(this.choice);
  }
}
