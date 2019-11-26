import { startEngine } from "../../src_old/state/actions";
import { createScene } from "../../src_old/entities/scene";
import reducer from "../../src_old/state/reducer";
import { List, Map } from "immutable";
import { activateScene } from "../../src_old/entities/scene";

jest.mock("../../src/entities/scene");

describe("State", () => {
  let state;

  beforeEach(() => {
    state = Map({
      scenes: List([])
    });
  });

  describe("ENGINE_START", () => {
    test("Should activate the first scene", () => {
      const startScene = createScene("start", "start");
      const action = startEngine(startScene);
      createScene.mockReturnValue({ id: "scene" });
      activateScene.mockReturnValue(List([startScene]));

      const state = reducer(state, action);

      expect(state).toEqual(
        Map({
          scenes: List([startScene])
        })
      );
    });
  });
});
