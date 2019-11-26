import { Input } from "../Input/Input";
import { State } from "./State";

export const isStateWithInput = (state: State): state is StateWithInput =>
  (state as StateWithInput).handleInput !== undefined;

export interface StateWithInput extends State {
  handleInput(input: Input): void;
}
