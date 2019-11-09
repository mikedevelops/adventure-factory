import Engine from "../../src/engine/Engine";
import { List } from "immutable";
import { gameOver, nextPassage, nextScene } from "../../src/state/actions";
import { createScene } from "../../src/entities/scene";
import { createPassage } from "../../src/entities/passage";

describe("Engine", () => {
  let engine;
  let renderer;
  let store;
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    renderer = jest.fn();
    store = {
      getState: jest.fn(),
      dispatch
    };
    engine = new Engine(renderer, store);
  });

  describe("next()", () => {
    test("Should go to game over if there is nothing left to do", () => {
      const scenes = List([
        createScene(
          "foo",
          "foo",
          List([createPassage("foo", 1, true, false)]),
          false,
          false
        )
      ]);
      store.getState.mockReturnValue({
        get: () => scenes
      });

      engine.next();

      expect(dispatch).toHaveBeenCalledWith(gameOver());
    });

    test(
      "Should go to the next passage if there are passages in the current" +
        " scene",
      () => {
        const passage = createPassage("p3", 3, false, false);
        const scene = createScene(
          "foo",
          "foo",
          List([
            createPassage("p1", 1, true, false),
            createPassage("p2", 2, true, true),
            passage
          ]),
          false,
          true
        );
        const scenes = List([scene]);
        store.getState.mockReturnValue({
          get: () => scenes
        });

        engine.next();

        expect(store.dispatch).toHaveBeenCalledWith(
          nextPassage(scene, passage)
        );
      }
    );
    test("Should go to the next scene if the current scene is complete", () => {
      const completeScene = createScene(
        "foo",
        "foo",
        List([
          createPassage("foo", 0, true),
          createPassage("foo", 1, true),
          createPassage("foo", 2, true)
        ]),
        false,
        true
      );
      const scenes = List([completeScene]);
      store.getState.mockReturnValue({
        get: () => scenes
      });

      engine.next();

      expect(store.dispatch).toHaveBeenCalledWith(nextScene());
    });
  });
});
