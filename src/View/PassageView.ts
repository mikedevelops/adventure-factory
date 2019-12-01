import { View } from "./View";
import * as PIXI from "pixi.js";
import { TextStyle } from "./TextStyle";

export class PassageView implements View {
  private container = new PIXI.Container();
  private text = new PIXI.Text("", TextStyle(this.renderer.view.width));

  constructor(private renderer: PIXI.Application) {}

  public init(): void {
    this.container.addChild(this.text);
    this.renderer.stage.addChild(this.container);
  }

  public updateText(text: string): void {
    this.text.text = text;
  }

  public show(): void {
    this.container.alpha = 1;
  }

  public hide(): void {
    this.container.alpha = 0;
    this.text.text = "";
  }
}
