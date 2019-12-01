import { MultipleInstanceException } from "../Exceptions/MultipleInstanceException";
import { Choice } from "../Entities/Choice";
import { ChoiceView } from "../View/ChoiceView";
import { Animator } from "../Animation/Animator";
import { Option } from "../Entities/Option";

export class ChoiceController {
  public static instance: ChoiceController;

  constructor(private animator: Animator, private view: ChoiceView) {
    if (ChoiceController.instance !== undefined) {
      throw new MultipleInstanceException(ChoiceController.name);
    }

    ChoiceController.instance = this;
  }

  public async print(choice: Choice): Promise<void> {
    this.view.show();

    await this.animator.type(
      choice.getText(),
      this.view.updateLabel.bind(this.view)
    );

    for (const option of choice.getOptions()) {
      await this.view.drawOption(option);
    }

    await this.view.focusOption(choice.getFocusedOption());
  }

  public async focusOption(option: Option): Promise<void> {
    await this.view.focusOption(option);
  }

  public skip(): void {
    this.animator.skipTyping();
  }

  public async clear(): Promise<void> {
    this.view.hide();
  }
}
