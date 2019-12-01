import { Speed } from "../Animation/Speed";

export class Text {
  constructor(
    private content: string = "",
    private speed: Speed = Speed.NORMAL
  ) {}

  public getContent(): string {
    return this.content;
  }

  public getSpeed(): Speed {
    return this.speed;
  }

  public setSpeed(speed: Speed): void {
    this.speed = speed;
  }

  public setContent(content: string): void {
    this.content = content;
  }
}
