import {
  activatePassage,
  setPassageComplete,
  createPassage,
  deactivatePassages,
  getActivePassage,
  getNextPassage,
  sortByPassageOrder
} from "../../src/entities/passage";
import { List } from "immutable";
import { createText } from "../../src/entities/text";
import { createScene } from "../../src/entities/scene";

describe("Passages", () => {
  describe("sortByPassageOrder()", () => {
    test("Should sort passages by order", () => {
      const passages = List([
        createPassage("foo", 2, createText("foo")),
        createPassage("bar", 15, createText("foo")),
        createPassage("baz", 7, createText("foo"))
      ]);

      const sorted = sortByPassageOrder(passages);

      expect(sorted).toEqual(
        List([
          createPassage("foo", 2, createText("foo")),
          createPassage("baz", 7, createText("foo")),
          createPassage("bar", 15, createText("foo"))
        ])
      );
    });
  });

  describe("getNextPassage()", () => {
    test("Should get the next passage in order", () => {
      const passages = List([
        createPassage("foo", 10, createText("foo")),
        createPassage("bar", 5, createText("foo")),
        createPassage("baz", 7, createText("foo"))
      ]);

      const passage = getNextPassage(passages);

      expect(passage).toEqual(createPassage("bar", 5, createText("foo")));
    });

    test("Should get the next incomplete passage", () => {
      const incomplete = createPassage("baz", 12, createText("foo"), false);
      const passages = List([
        incomplete,
        createPassage("foo", 10, createText("foo"), true),
        createPassage("bar", 11, createText("foo"), true)
      ]);

      const passage = getNextPassage(passages);

      expect(passage).toEqual(incomplete);
    });
  });

  describe("activatePassage()", () => {
    test("Should activate the passage and deactivate others", () => {
      const passage1 = createPassage("one", 0, createText("foo"), false, true);
      const passage2 = createPassage("two", 1, createText("foo"), true, false);
      const passage3 = createPassage("three", 2, createText("foo"));
      const passages = List([passage1, passage2, passage3]);

      const newPassages = activatePassage(passages, passage3);

      expect(newPassages).toEqual(
        List([
          createPassage("one", 0, createText("foo")),
          createPassage("two", 1, createText("foo"), true),
          createPassage("three", 2, createText("foo"), false, true)
        ])
      );
    });
  });

  describe("deactivatePassages()", () => {
    test("Should deactivate all passages", () => {
      const passages = List([
        createPassage("one", 0, createText("foo"), true, false),
        createPassage("two", 1, createText("foo"), true, true),
        createPassage("three", 2, createText("foo"))
      ]);

      const newPassages = deactivatePassages(passages);

      expect(newPassages).toEqual(
        List([
          createPassage("one", 0, createText("foo"), true),
          createPassage("two", 1, createText("foo"), true),
          createPassage("three", 2, createText("foo"))
        ])
      );
    });
  });

  describe("getActivePassage()", () => {
    test("Should get the active passage", () => {
      const passage1 = createPassage("active", 0, createText(""), false, true);
      const passage2 = createPassage("foo", 1, createText(""));
      const scene = createScene(
        "scene",
        "scene",
        List([passage1, passage2]),
        true,
        true
      );

      const activePassage = getActivePassage(List([scene]));

      expect(activePassage).toBe(passage1);
    });

    test("Should return null if no active scene", () => {
      const passage1 = createPassage("active", 0, createText(""), false, true);
      const passage2 = createPassage("foo", 1, createText(""));
      const scene = createScene(
        "scene",
        "scene",
        List([passage1, passage2]),
        true,
        false
      );

      const activePassage = getActivePassage(List([scene]));

      expect(activePassage).toBeNull();
    });

    test("Should return null if no active passage", () => {
      const passage1 = createPassage("active", 0, createText(""));
      const scene = createScene("scene", "scene", List([passage1]), true, true);

      const activePassage = getActivePassage(List([scene]));

      expect(activePassage).toBeNull();
    });
  });

  describe("setPassageComplete()", () => {
    test("Should deactivate and complete a passage", () => {
      const passage1 = createPassage("p1", 0, createText(""), false, true);
      const passage2 = createPassage("p2", 1, createText(""));

      const passages = setPassageComplete(List([passage1, passage2]), passage1);

      expect(passages).toEqual(
        List([createPassage("p1", 0, createText(""), true, false), passage2])
      );
    });
  });
});
