import { State } from "./State";

export const isStateWithLeave = (state: State): state is StateWithLeave =>
  (state as StateWithLeave).leave !== undefined;

export interface StateWithLeave extends State {
  leave(): void;
}
