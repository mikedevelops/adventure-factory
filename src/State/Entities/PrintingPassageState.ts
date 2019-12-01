import { State } from "../State";
import { Passage } from "../../Entities/Passage";
import { StateWithEnter } from "../StateWithEnter";
import { Scene } from "../../Entities/Scene";
import { WaitingForUserInputState } from "../Interaction/WaitingForUserInputState";
import { I_NEXT, Input } from "../../Input/Input";
import { StateWithInput } from "../StateWithInput";
import { PassageController } from "../../Controller/PassageController";

export const S_PRINTING_PASSAGE = "S_PRINTING_PASSAGE";

export class PrintingPassageState
  implements State, StateWithEnter, StateWithInput {
  private printed = false;

  constructor(private scene: Scene, private passage: Passage) {}

  getName(): string {
    return S_PRINTING_PASSAGE;
  }

  update(): State | null {
    if (!this.printed) {
      return null;
    }

    this.passage.setComplete(true);

    return new WaitingForUserInputState(this.scene, I_NEXT);
  }

  enter(): void {
    PassageController.instance.print(this.passage).then(() => {
      this.printed = true;
    });
  }

  handleInput(input: Input): void {
    if (input.getType() !== I_NEXT) {
      return;
    }

    PassageController.instance.skip();
  }
}
