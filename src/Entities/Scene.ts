import { Passage } from "./Passage";
import { Choice } from "./Choice";
import uuid from "uuid/v4";

export class Scene {
  private active = false;
  private complete = false;
  private id: string = uuid();

  constructor(
    private name: string = "",
    private passages: Passage[] = [],
    private choice: Choice = new Choice()
  ) {}

  public setName(name: string): void {
    this.name = name;
  }

  public setId(id: string): void {
    this.id = id;
  }

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

  public setChoice(choice: Choice): void {
    this.choice = choice;
  }

  public isComplete(): boolean {
    return this.complete;
  }

  public getId(): string {
    return this.id;
  }

  public addPassage(passage: Passage): void {
    this.passages.push(passage);
  }
}
