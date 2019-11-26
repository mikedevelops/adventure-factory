import { View } from "./View";
import * as PIXI from "pixi.js";
import { TextStyle } from "./TextStyle";
import { Choice } from "../Entities/Choice";
import { UnitService } from "../Service/UnitService";
import { Option } from "../Entities/Option";

export class ChoiceView implements View {
  private container = new PIXI.Container();
  private label = new PIXI.Text("", TextStyle(this.renderer.view.width));
  private optionContainer = new PIXI.Container();
  private options: PIXI.Text[] = [];
  private focusIndicator = new PIXI.Graphics();

  constructor(private renderer: PIXI.Application) {}

  public init(): void {
    this.container.addChild(this.label);
    this.container.addChild(this.optionContainer);
    this.container.addChild(this.focusIndicator);

    this.optionContainer.y += UnitService.getUnit(1);

    this.focusIndicator.beginFill(0xff0000);
    this.focusIndicator.drawRect(
      0,
      0,
      UnitService.getUnit(1),
      UnitService.getUnit(1)
    );
    this.focusIndicator.endFill();
    this.focusIndicator.alpha = 0;

    this.renderer.stage.addChild(this.container);
  }

  public getText(): PIXI.Text {
    return this.label;
  }

  public createOptions(choice: Choice): void {
    this.options = [];

    for (let i = 0; i < choice.getOptions().length; i++) {
      const option = choice.getOptions()[i];
      const opt = new PIXI.Text("", TextStyle(this.renderer.view.width));

      // margin
      opt.y += this.label.height + UnitService.getUnit(1) * i;
      opt.y += i === 0 ? 0 : UnitService.getUnit(1);
      opt.x += UnitService.getUnit(2);

      this.options.push(opt);
      this.optionContainer.addChild(opt);

      if (option.isFocused()) {
        this.positionFocusIndicator(opt);
      }
    }
  }

  public async focusOption(option: Option): Promise<void> {
    const opt = this.options.find(
      o => o.text === option.getText().getContent()
    );

    if (opt === undefined) {
      throw new Error(`Cannot find option in view ${option}`);
    }

    this.positionFocusIndicator(opt);
  }

  public getOptionView(index: number): PIXI.Text {
    if (this.options[index] === undefined) {
      throw new Error("Cannot find option: " + index);
    }

    return this.options[index];
  }

  public hide(): void {
    this.container.alpha = 0;
  }

  public show(): void {
    this.container.alpha = 1;
  }

  public showFocusIndicator(): void {
    this.focusIndicator.alpha = 1;
  }

  private positionFocusIndicator(opt: PIXI.Text): void {
    this.focusIndicator.x = opt.x - UnitService.getUnit(1.5);
    this.focusIndicator.y = opt.y + this.focusIndicator.height * 1.5;
  }
}
