export const I_NEXT = "I_NEXT";
export const I_UP = "I_UP";
export const I_DOWN = "I_DOWN";

export class Input {
  private type: string | null = null;

  public setType(type: string): void {
    this.type = type;
  }

  public getType(): string | null {
    return this.type;
  }
}
