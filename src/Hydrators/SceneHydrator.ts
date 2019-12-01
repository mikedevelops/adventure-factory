import { Scene } from "../Entities/Scene";
import { PassageHydraytor } from "./PassageHydraytor";
import { ChoiceHydraytor } from "./ChoiceHydraytor";

export class SceneHydrator {
  public static hydrate(sceneObject: any): Scene {
    const scene = new Scene();

    scene.setName(sceneObject.name);
    scene.setId(sceneObject.id);

    sceneObject.passages.map((passage: any) => {
      scene.addPassage(PassageHydraytor.hydrate(passage));
    });

    scene.setChoice(ChoiceHydraytor.hydrate(sceneObject.choice));

    return scene;
  }
}
