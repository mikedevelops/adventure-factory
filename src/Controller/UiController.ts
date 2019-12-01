import { Animator } from "../Animation/Animator";
import { MultipleInstanceException } from "../Exceptions/MultipleInstanceException";
import { UiView } from "../View/UiView";

export class UiController {
  public static instance: UiController;

  constructor(private animator: Animator, private view: UiView) {
    if (UiController.instance !== undefined) {
      throw new MultipleInstanceException(UiController.name);
    }

    UiController.instance = this;
  }

  public async startWaitingForInput(): Promise<void> {
    await this.animator.blink(
      await this.view.showWaitingForInput.bind(this.view),
      await this.view.hideWaitingForInput.bind(this.view)
    );
  }

  public async stopWaitingForInput(): Promise<void> {
    this.animator.stopBlink();
    await this.view.hideWaitingForInput();
  }
}
