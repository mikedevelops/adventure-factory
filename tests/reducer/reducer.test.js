import { ENGINE_START, startEngine } from "../../src/state/actions";
import { createScene } from "../../src/entities/scene";
import { List, Map } from "immutable";
import reducer from "../../src/state/reducer";
import { createPassage } from "../../src/entities/passage";
import { createText } from "../../src/entities/text";
import { createChoice } from "../../src/entities/choice";

describe("Reducer", () => {
  describe(ENGINE_START, () => {
    test("Should activate the first scene and passage", () => {
      const scene = createScene(
        "first",
        "first",
        List([createPassage("passage_one", 0, createText("hi"))]),
        createChoice(List()),
        true
      );
      const state = Map({
        scenes: List([scene])
      });

      const newState = reducer(state, startEngine(scene));

      expect(newState).toEqual(
        Map({
          scenes: List([
            createScene(
              "first",
              "first",
              List([
                createPassage("passage_one", 0, createText("hi"), false, true)
              ]),
              createChoice(List()),
              true,
              true
            )
          ])
        })
      );
    });
  });
});
