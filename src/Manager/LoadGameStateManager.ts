import { GameState } from "../State/Game/GameState";
import { SerialisedGameState } from "../State/Game/SerialisedGameState";

export class LoadGameStateManager {
  public load(serialisedState: SerialisedGameState): GameState {}
}
