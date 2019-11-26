export interface State {
  update(): null | State;
  getName(): string;
}
