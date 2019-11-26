import { Runtime } from "../Runtime/Runtime";
import { State } from "./State";

export const isStateWithRuntime = (state: State): state is StateWithRuntime =>
  (state as StateWithRuntime).injectRuntime !== undefined;

export interface StateWithRuntime extends State {
  injectRuntime(runtime: Runtime): void;
}
