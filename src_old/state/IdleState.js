import AbstractState from "./AbstractState";
import { STATE_IDLE } from "./StateMachine";

export default class IdleState extends AbstractState {
  getName() {
    return STATE_IDLE;
  }

  update() {
    return null;
  }
}
