import { Text } from "./Text";

export class Passage {
  private complete = false;

  constructor(private text: Text = new Text()) {}

  public isComplete(): boolean {
    return this.complete;
  }

  public setComplete(complete: boolean): void {
    this.complete = complete;
  }

  public getText(): Text {
    return this.text;
  }

  public setText(text: Text): void {
    this.text = text;
  }
}
