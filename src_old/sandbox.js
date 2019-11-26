import { List, Map } from "immutable";
import { createScene } from "./entities/scene";
import { createPassage } from "./entities/passage";
import { createText } from "./entities/text";
import { createChoice } from "./entities/choice";
import { createOption } from "./entities/option";
import { engine } from "./index";
import StateMachine from "./state/StateMachine";

const state = Map({
  scenes: List([
    createScene(
      "home",
      "start",
      List([
        createPassage("home_1", 0, createText("home scene")),
        createPassage("home_2", 1, createText("Get ready..."))
      ]),
      createChoice(
        List([
          createOption("option_1", 0, createText("Go to scene A"), "scene_a"),
          createOption("option_2", 1, createText("Go to scene B"), "scene_b")
        ])
      ),
      true
    ),
    createScene(
      "scene_a",
      "A",
      List([createPassage("p", 0, createText("Welcome to scene A"))]),
      createChoice(
        List([
          createOption("option_1", 0, createText("Go to home"), "home"),
          createOption("option_2", 1, createText("Go to B"), "scene_b")
        ])
      )
    ),
    createScene(
      "scene_b",
      "B",
      List([createPassage("p", 0, createText("Welcome to scene B"))]),
      createChoice(
        List([
          createOption("option_1", 0, createText("Go to home"), "home"),
          createOption("option_2", 1, createText("Go to A"), "scene_a")
        ])
      )
    )
  ])
});

const root = document.getElementById("stage");
const game = engine(root);

window.engine = game;

game.init();
game.load(state.get("scenes"));
