import { Text } from "./Text";

export class Option {
  constructor(
    private text: Text,
    private location: string,
    private focused = false
  ) {}

  public setFocused(focused: boolean): void {
    this.focused = focused;
  }

  public isFocused(): boolean {
    return this.focused;
  }

  public getText(): Text {
    return this.text;
  }

  public getLocation(): string {
    return this.location;
  }
}
