import Engine from "./engine/Engine";
import Renderer from "./renderer/Renderer";
import { createStore } from "redux";
import reducer from "./state/reducer";
import { createScene } from "./entities/scene";
import { Map, List } from "immutable";
import { createPassage } from "./entities/passage";
import { createText } from "./entities/text";
import { createChoice } from "./entities/choice";
import { createOption } from "./entities/option";

const state = Map({
  scenes: List([
    createScene(
      "home",
      "start",
      List([createPassage("home_1", 0, createText("home scene"))]),
      createChoice(
        List([
          createOption(createText("Go to scene A"), "scene_a"),
          createOption(createText("Go to scene B"), "scene_b")
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
          createOption(createText("Go to home"), "home"),
          createOption(createText("Go to B"), "scene_b")
        ])
      )
    ),
    createScene(
      "scene_b",
      "B",
      List([createPassage("p", 0, createText("Welcome to scene B"))]),
      createChoice(
        List([
          createOption(createText("Go to home"), "home"),
          createOption(createText("Go to A"), "scene_a")
        ])
      )
    )
  ])
});
const store = createStore(reducer, state);
const stage = document.getElementById("stage");
const renderer = new Renderer(stage.getContext("2d"));
const engine = new Engine(renderer, store);

// engine.init();
// engine.start();

// window.engine = engine;

export default engine;
