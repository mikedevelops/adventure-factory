import { State } from "../State";
import { Choice } from "../../Entities/Choice";
import { StateWithRuntime } from "../StateWithRuntime";
import runtime from "../../index";
import { Runtime } from "../../Runtime/Runtime";
import { DelegatingSceneActionState } from "../Runtime/DelegatingSceneActionState";
import { StateWithEnter } from "../StateWithEnter";
import { TextService } from "../../Service/TextService";

export const S_LOCATION_CHANGE = "S_LOCATION_CHANGE";

export class LocationChangeState
  implements State, StateWithRuntime, StateWithEnter {
  private runtime: Runtime | null = runtime;
  private transition = true;

  constructor(private choice: Choice) {}

  getName(): string {
    return S_LOCATION_CHANGE;
  }

  update(): State | null {
    if (this.transition) {
      return new DelegatingSceneActionState(
        this.getRuntime().getSceneById(this.choice.getFocusedLocation())
      );
    }

    return null;
  }

  injectRuntime(runtime: Runtime): void {
    this.runtime = runtime;

    console.log(this.runtime.getSceneById(this.choice.getFocusedLocation()));
  }

  private getRuntime(): Runtime {
    if (this.runtime === null) {
      throw new Error("Attempted to get runtime before it was injected");
    }

    return this.runtime;
  }

  enter(): void {
    TextService.instance.clear();
  }
}
