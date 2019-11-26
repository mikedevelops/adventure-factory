import * as PIXI from "pixi.js";
import { MultipleInstanceException } from "../Exceptions/MultipleInstanceException";
import { UnitService } from "./UnitService";
import { Option } from "../Entities/Option";
import { ChoiceView } from "../View/ChoiceView";

export const BLINK_SPEED = 500;

export class UiService {
  public static instance: UiService;

  private timeouts: Map<string, number>;
  private readonly waitingForInputGraphic: PIXI.Graphics;

  constructor(
    private renderer: PIXI.Application,
    private choiceView: ChoiceView
  ) {
    if (UiService.instance !== undefined) {
      throw new MultipleInstanceException(UiService.name);
    }

    UiService.instance = this;

    this.timeouts = new Map<string, number>();
    this.waitingForInputGraphic = new PIXI.Graphics();
  }

  // TODO: should the focus indicator live as part of the UI view or the
  //  Choice view?????? Seems weird at the moment just passing this through
  public async focusOption(option: Option): Promise<void> {
    await this.choiceView.focusOption(option);
  }

  public startWaitingForInput(): void {
    const draw = (): void => {
      const size = UnitService.getUnit(1);
      this.waitingForInputGraphic.beginFill(0xff0000);
      this.waitingForInputGraphic.drawRect(
        this.renderer.view.width - size * 2,
        this.renderer.view.height - size * 2,
        size,
        size
      );
      this.waitingForInputGraphic.endFill();
      this.renderer.stage.addChild(this.waitingForInputGraphic);
    };
    const clear = (): void => {
      this.renderer.stage.removeChild(this.waitingForInputGraphic);
    };

    this.blink(draw, clear);
  }

  public clearWaitingForInput(): void {
    this.renderer.stage.removeChild(this.waitingForInputGraphic);
    this.clearTimeout("blink");
  }

  private blink(draw: () => void, clear: () => void, on = true): void {
    this.timeouts.set(
      "blink",
      setTimeout(() => {
        if (on) {
          draw();
        } else {
          clear();
        }

        this.blink(draw, clear, !on);
      }, BLINK_SPEED)
    );
  }

  private clearTimeout(id: string): void {
    const timeout = this.timeouts.get(id);

    if (timeout === undefined) {
      return;
    }

    clearTimeout(timeout);
    this.timeouts.delete(id);
  }
}
