import { Passage } from "../Entities/Passage";
import { Text } from "../Entities/Text";
import * as PIXI from "pixi.js";
import { Speed } from "../Animation/Speed";
import { MultipleInstanceException } from "../Exceptions/MultipleInstanceException";
import { Choice } from "../Entities/Choice";
import { Option } from "../Entities/Option";
import { PassageView } from "../View/PassageView";
import { ChoiceView } from "../View/ChoiceView";

export class TextService {
  public static instance: TextService;

  private skip = false;

  constructor(
    private renderer: PIXI.Application,
    private passageView: PassageView,
    private choiceView: ChoiceView
  ) {
    if (TextService.instance !== undefined) {
      throw new MultipleInstanceException(TextService.name);
    }

    TextService.instance = this;
  }

  public async printPassage(passage: Passage): Promise<void> {
    this.passageView.show();
    await this.type(passage.getText(), this.passageView.getText());
  }

  public clearPassage(): void {
    this.passageView.hide();
  }

  public clearChoice(): void {
    this.choiceView.hide();
  }

  async printChoice(choice: Choice): Promise<void> {
    this.clearPassage();
    this.choiceView.show();

    await this.type(choice.getText(), this.choiceView.getText());

    this.choiceView.createOptions(choice);

    for (let i = 0; i < choice.getOptions().length; i++) {
      await this.print(
        choice.getOption(i).getText(),
        this.choiceView.getOptionView(i)
      );
    }

    this.choiceView.showFocusIndicator();
  }

  private async type(text: Text, view: PIXI.Text, index = 0): Promise<void> {
    if (index > text.getContent().length) {
      return;
    }

    if (this.skip) {
      view.text = text.getContent();
      this.drawSync();
      this.skip = false;
      return;
    }

    view.text = text.getContent().slice(0, index);

    await this.draw(text.getSpeed());
    return this.type(text, view, index + 1);
  }

  private async print(text: Text, view: PIXI.Text): Promise<void> {
    view.text = text.getContent();
    await this.draw(text.getSpeed());
  }

  public skipTyping(): void {
    this.skip = true;
  }

  public clear(): void {
    this.clearPassage();
    this.clearChoice();
  }

  private draw(speed: Speed): Promise<void> {
    return new Promise(done => {
      setTimeout(() => {
        this.renderer.render();
        done();
      }, TextService.getSpeed(speed));
    });
  }

  private drawSync(): void {
    this.renderer.render();
  }

  private static getSpeed(speed: Speed): number {
    switch (speed) {
      case Speed.SLOW:
        return 250;
      case Speed.NORMAL:
        return 50;
      case Speed.FAST:
        return 25;
      case Speed.INSTANT:
        return 0;
    }
  }
}
