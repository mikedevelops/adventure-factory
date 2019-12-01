import { View } from "./View";
import * as PIXI from "pixi.js";
import { UnitService } from "../Service/UnitService";

export class UiView implements View {
  private waitingForInput: PIXI.Graphics = new PIXI.Graphics();

  constructor(private renderer: PIXI.Application) {}

  init(): void {
    const size = UnitService.getUnit(1);

    this.waitingForInput.beginFill(0xff0000);
    this.waitingForInput.drawRect(
      this.renderer.view.width - size * 2,
      this.renderer.view.height - size * 2,
      size,
      size
    );
    this.waitingForInput.endFill();
    this.waitingForInput.alpha = 0;

    this.renderer.stage.addChild(this.waitingForInput);
  }

  public async showWaitingForInput(): Promise<void> {
    this.waitingForInput.alpha = 1;
  }

  public async hideWaitingForInput(): Promise<void> {
    this.waitingForInput.alpha = 0;
  }
}
