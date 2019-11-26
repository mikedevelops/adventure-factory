import { ENGINE_START, startEngine } from "../../src_old/state/actions";
import { createScene } from "../../src_old/entities/scene";
import { List, Map } from "immutable";
import reducer from "../../src_old/state/reducer";
import { createPassage } from "../../src_old/entities/passage";
import { createText } from "../../src_old/entities/text";
import { createChoice } from "../../src_old/entities/choice";

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
