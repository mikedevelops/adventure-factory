import { Scene } from "../../Entities/Scene";

export class GameState {
  constructor(private scenes: Scene[] = []) {}

  public getScenes(): Scene[] {
    return this.scenes;
  }

  public addScene(scene: Scene): void {
    this.scenes.push(scene);
  }
}
