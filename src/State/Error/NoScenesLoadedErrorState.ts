import { AbstractErrorState } from "./AbstractErrorState";

export const S_NO_SCENES_LOADED = "S_NO_SCENES_LOADED";

export class NoScenesLoadedErrorState extends AbstractErrorState {
  getName(): string {
    return S_NO_SCENES_LOADED;
  }
}
