import { State } from "../State";
import { Scene } from "../../Entities/Scene";
import { PrintingPassageState } from "../Entities/PrintingPassageState";
import { PrintingChoiceState } from "../Entities/PrintingChoiceState";

export const S_DELEGATING_SCENE_ACTION = "S_DELEGATING_SCENE_ACTION";

export class DelegatingSceneActionState implements State {
  constructor(private scene: Scene) {}

  getName(): string {
    return S_DELEGATING_SCENE_ACTION;
  }

  update(): State | null {
    const passage = this.scene.getNextPassage();

    if (passage !== null) {
      return new PrintingPassageState(this.scene, passage);
    }

    const choice = this.scene.getChoice();

    if (choice !== null) {
      return new PrintingChoiceState(this.scene, choice);
    }

    throw new Error("Nowhere to delegate!");
  }
}
