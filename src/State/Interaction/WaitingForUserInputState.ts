import { State } from "../State";
import { StateWithInput } from "../StateWithInput";
import { Input } from "../../Input/Input";
import { DelegatingSceneActionState } from "../Runtime/DelegatingSceneActionState";
import { Scene } from "../../Entities/Scene";
import { StateWithEnter } from "../StateWithEnter";
import { UiService } from "../../Service/UiService";
import { StateWithLeave } from "../StateWithLeave";

export const S_WAITING_FOR_USER_INPUT = "S_WAITING_FOR_USER_INPUT";

export class WaitingForUserInputState
  implements State, StateWithInput, StateWithEnter, StateWithLeave {
  private next = false;

  constructor(private scene: Scene, private inputType: string) {}

  getName(): string {
    return S_WAITING_FOR_USER_INPUT;
  }

  update(): State | null {
    if (!this.next) {
      return null;
    }

    return new DelegatingSceneActionState(this.scene);
  }

  handleInput(input: Input): void {
    if (input.getType() !== this.inputType) {
      return;
    }

    this.next = true;
  }

  enter(): void {
    UiService.instance.startWaitingForInput();
  }

  leave(): void {
    UiService.instance.clearWaitingForInput();
  }
}
