import { State } from "./State";

export const isStateWithEnter = (state: State): state is StateWithEnter =>
  (state as StateWithEnter).enter !== undefined;

export interface StateWithEnter extends State {
  enter(): void;
}
