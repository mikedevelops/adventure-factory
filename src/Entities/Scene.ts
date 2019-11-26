import { Passage } from "./Passage";
import { Choice } from "./Choice";

export class Scene {
  private active = false;
  private complete = false;

  constructor(
    private name: string,
    private passages: Passage[] = [],
    private choice: Choice
  ) {}

  public isActive(): boolean {
    return this.active;
  }

  public getNextPassage(): Passage | null {
    const passage = this.passages.find(passage => !passage.isComplete());

    if (passage === undefined) {
      return null;
    }

    return passage;
  }

  public getChoice(): Choice {
    return this.choice;
  }

  public isComplete(): boolean {
    return this.complete;
  }
}
