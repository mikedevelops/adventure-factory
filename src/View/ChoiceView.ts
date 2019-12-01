import { View } from "./View";
import * as PIXI from "pixi.js";
import { TextStyle } from "./TextStyle";
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

  public updateLabel(text: string): void {
    this.label.text = text;
  }

  public async drawOption(option: Option): Promise<void> {
    const optionText = new PIXI.Text(option.getText().getContent());
    const order = option.getOrder();

    optionText.y += this.label.height + UnitService.getUnit(1) * order;
    optionText.y += order === 0 ? 0 : UnitService.getUnit(1);
    optionText.x += UnitService.getUnit(2);

    this.options.push(optionText);
    this.optionContainer.addChild(optionText);
  }

  public async focusOption(option: Option): Promise<void> {
    const optionText = this.options[option.getOrder()];

    this.showFocusIndicator();
    this.focusIndicator.y = optionText.y + this.focusIndicator.height * 1.5;
    this.focusIndicator.x = optionText.x - UnitService.getUnit(1.5);
  }

  public hide(): void {
    this.container.alpha = 0;
    this.optionContainer.removeChildren();
    this.options = [];
  }

  public show(): void {
    this.container.alpha = 1;
  }

  public showFocusIndicator(): void {
    this.focusIndicator.alpha = 1;
  }
}
