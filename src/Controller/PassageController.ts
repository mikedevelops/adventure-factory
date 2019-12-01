import { MultipleInstanceException } from "../Exceptions/MultipleInstanceException";
import { Passage } from "../Entities/Passage";
import { PassageView } from "../View/PassageView";
import { Animator } from "../Animation/Animator";

export class PassageController {
  public static instance: PassageController;

  constructor(private animator: Animator, private view: PassageView) {
    if (PassageController.instance !== undefined) {
      throw new MultipleInstanceException(PassageController.name);
    }

    PassageController.instance = this;
  }

  public async print(passage: Passage): Promise<void> {
    this.view.show();

    await this.animator.type(
      passage.getText(),
      this.view.updateText.bind(this.view)
    );
  }

  public skip(): void {
    this.animator.skipTyping();
  }

  public clear(): void {
    this.view.hide();
  }
}
