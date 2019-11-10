import {
  activateScene,
  createScene,
  getNextScene,
  isSceneComplete,
  setSceneComplete,
  updatePassages,
  updateScene
} from "../../src/entities/scene";
import { List, Map } from "immutable";
import { createPassage } from "../../src/entities/passage";
import { createText } from "../../src/entities/text";
import { createChoice } from "../../src/entities/choice";

describe("Scenes", () => {
  describe("activateScene()", () => {
    test("Should activate the scene and deactivate all others", () => {
      const scene1 = createScene(
        "scene_one",
        "one",
        List(),
        createChoice(List()),
        true
      );
      const scene2 = createScene(
        "scene_two",
        "two",
        List(),
        createChoice(List()),
        false,
        true
      );
      const scene3 = createScene(
        "scene_three",
        "three",
        List(),
        createChoice(List())
      );
      const scene4 = createScene(
        "scene_four",
        "four",
        List(),
        createChoice(List()),
        false,
        true
      );
      const scenes = List([scene1, scene2, scene3, scene4]);

      const nextScenes = activateScene(scenes, scene3);

      expect(nextScenes).toEqual(
        List([
          scene1,
          createScene("scene_two", "two", List(), createChoice(List())),
          createScene(
            "scene_three",
            "three",
            List(),
            createChoice(List()),
            false,
            true
          ),
          createScene("scene_four", "four", List(), createChoice(List()))
        ])
      );
    });
  });

  describe("updateScene()", () => {
    test("Should update the scene in the state", () => {
      const scene1 = createScene(
        "scene_one",
        "one",
        List(),
        createChoice(List())
      );
      const scene2 = createScene(
        "scene_two",
        "two",
        List(),
        createChoice(List())
      );
      const scene2Update = Object.assign({}, scene2, {
        isActive: true
      });

      const scenes = updateScene(List([scene1, scene2]), scene2Update);

      expect(scenes).toEqual(List([scene1, scene2Update]));
    });

    test("Should add a new scene if it does not exist", () => {
      const scene1 = createScene(
        "scene_one",
        "one",
        List(),
        createChoice(List())
      );
      const scene2 = createScene(
        "scene_two",
        "two",
        List(),
        createChoice(List())
      );

      const scenes = updateScene(List([scene1]), scene2);

      expect(scenes).toEqual(List([scene1, scene2]));
    });
  });

  describe("updatePassages", () => {
    test("Should update the passages in a scene", () => {
      const scene = createScene("scene", "scene", List(), createChoice(List()));
      const passage = createPassage("p", 0, createText(""));

      const newScene = updatePassages(scene, List([passage]));

      expect(newScene).toEqual(
        createScene("scene", "scene", List([passage]), createChoice(List()))
      );
    });
  });

  describe("isSceneComplete()", () => {
    test("Should return true if all passages are complete", () => {
      const scene = createScene(
        "scene",
        "scene",
        List([
          createPassage("p1", 0, createText(""), true),
          createPassage("p2", 1, createText(""), false)
        ])
      );

      expect(isSceneComplete(scene)).toBe(false);
    });

    test("Should return false if all passages are not complete", () => {
      const scene = createScene(
        "scene",
        "scene",
        List([
          createPassage("p1", 0, createText(""), true),
          createPassage("p2", 1, createText(""), true)
        ]),
        createChoice(List())
      );

      expect(isSceneComplete(scene)).toBe(true);
    });
  });

  describe("setSceneComplete()", () => {
    test("Should set the scene complete and deactivate", () => {
      const scene = createScene(
        "s",
        "s",
        List(),
        createChoice(List()),
        true,
        true,
        false
      );

      const completeScene = setSceneComplete(scene);

      expect(completeScene).toEqual(
        createScene("s", "s", List(), createChoice(List()), true, false, true)
      );
    });
  });

  describe("getNextScene()", () => {
    test("Should get the active scene", () => {
      const activeScene = createScene(
        "s1",
        "active",
        List(),
        createChoice(List()),
        false,
        true
      );
      const inactiveScene = createScene(
        "s2",
        "inactive",
        List(),
        createChoice(List())
      );

      const next = getNextScene(List([activeScene, inactiveScene]));

      expect(next).toBe(activeScene);
    });

    test("Should get the next incomplete scene", () => {
      const anotherInactiveScene = createScene(
        "s1",
        "active",
        List(),
        createChoice(List())
      );
      const inactiveScene = createScene(
        "s2",
        "inactive",
        List(),
        createChoice(List())
      );

      const next = getNextScene(List([anotherInactiveScene, inactiveScene]));

      expect(next).toBe(anotherInactiveScene);
    });

    test("Should prioritise the first scene", () => {
      const anotherInactiveScene = createScene(
        "s1",
        "active",
        List(),
        createChoice(List())
      );
      const inactiveScene = createScene(
        "s2",
        "inactive",
        List(),
        createChoice(List()),
        true
      );

      const next = getNextScene(List([anotherInactiveScene, inactiveScene]));

      expect(next).toBe(inactiveScene);
    });
  });
});
