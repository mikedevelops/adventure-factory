import { createOption } from "../../src_old/entities/option";
import { createText } from "../../src_old/entities/text";
import { activateChoice, createChoice } from "../../src_old/entities/choice";
import { List } from "immutable";
import { createScene } from "../../src_old/entities/scene";

describe("Choice", () => {
  describe("activateChoice()", () => {
    test("Should activate choice and focus first option", () => {
      const option1 = createOption(createText("foo"), "foo");
      const option2 = createOption(createText("bar"), "foo");
      const choice = createChoice(List([option1, option2]));
      const scene = createScene("s", "s", List(), choice);

      const sceneWithActiveChoice = activateChoice(scene);

      expect(sceneWithActiveChoice).toEqual(
        createScene(
          "s",
          "s",
          List(),
          createChoice(
            List([createOption(createText("foo"), "foo", true), option2]),
            false,
            true
          )
        )
      );
    });
  });
});
