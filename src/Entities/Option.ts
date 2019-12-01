import { Text } from "./Text";

export class Option {
  constructor(
    private text: Text = new Text(),
    private location: string = "",
    private order: number = 0,
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

  public setText(text: Text): void {
    this.text = text;
  }

  public getLocation(): string {
    return this.location;
  }

  public setLocation(location: string): void {
    this.location = location;
  }

  public getOrder(): number {
    return this.order;
  }

  public setOrder(order: number): void {
    this.order = order;
  }
}
