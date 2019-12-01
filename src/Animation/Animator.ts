import { Text } from "../Entities/Text";
import { Speed } from "./Speed";

export const BLINK_SPEED = 500;

export class Animator {
  private shouldSkipTyping = false;
  private stopBlinking = false;
  private isBlinkShow = true;

  public stopBlink(): void {
    this.stopBlinking = true;
  }

  public async blink(
    hide: () => Promise<void>,
    show: () => Promise<void>
  ): Promise<void> {
    if (this.stopBlinking) {
      this.stopBlinking = false;
      return;
    }

    if (this.isBlinkShow) {
      await hide();
    } else {
      await show();
    }

    return new Promise(resolve => {
      this.isBlinkShow = !this.isBlinkShow;
      setTimeout(() => {
        return this.blink(hide, show);
      }, BLINK_SPEED);
    });
  }

  public async type(text: Text, draw: (text: string) => void): Promise<void> {
    const typedStates = this.typeGen(text.getContent());

    // FIXME: type def
    for (const typedText of typedStates) {
      if (this.shouldSkipTyping) {
        this.shouldSkipTyping = false;
        draw(text.getContent());
        break;
      }

      await this.sleep(Animator.getValueFromSpeed(text.getSpeed()));
      draw(typedText);
    }
  }

  public skipTyping(): void {
    this.shouldSkipTyping = true;
  }

  private sleep(timeout: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  private *typeGen(text: string): Iterator<string> {
    let index = 0;

    while (index < text.length) {
      yield text.slice(0, ++index);
    }

    return text;
  }

  public static getValueFromSpeed(speed: Speed): number {
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
