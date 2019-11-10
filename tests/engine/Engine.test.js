import Engine from "../../src/engine/Engine";

describe("Engine", () => {
  let engine;
  let renderer;
  let store;

  beforeEach(() => {
    renderer = jest.fn();
    store = jest.fn();
    engine = new Engine(renderer, store);
  });

  describe("next()", () => {
    test.todo("Should complete the scene if all passages are complete");
    test.todo("Should get the next passage if there is no active passage");
    test.todo("Should get the next passage of the active passage is complete");
    test.todo("Should complete the active passage");
  });
});
