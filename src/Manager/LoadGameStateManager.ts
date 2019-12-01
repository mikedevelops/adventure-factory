import { GameState } from "../State/Game/GameState";
import { GameStateSerialiser } from "../Service/GameStateSerialiser";
import { SceneHydrator } from "../Hydrators/SceneHydrator";
import { Scene } from "../Entities/Scene";

export class LoadGameStateManager {
  public async load(serialisedState: string): Promise<GameState> {
    const parsedState: any = GameStateSerialiser.parse(serialisedState);
    const scenes: Scene[] = parsedState.scenes.map(SceneHydrator.hydrate);
    const gameState = new GameState();

    scenes.forEach(gameState.addScene.bind(gameState));

    return gameState;
  }
}
