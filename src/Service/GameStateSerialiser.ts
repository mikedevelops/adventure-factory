import { GameState } from "../State/Game/GameState";

export class GameStateSerialiser {
  public static serialise(state: GameState): string {
    return JSON.stringify(state);
  }

  public static parse(state: string): object {
    return JSON.parse(state);
  }
}
