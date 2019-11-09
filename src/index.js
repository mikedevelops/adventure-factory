import Engine from "./engine/Engine";
import Renderer from "./renderer/Renderer";
import { createStore } from "redux";
import reducer from "./state/reducer";
import { createScene } from "./entities/scene";
import { Map, List } from "immutable";
import { createPassage } from "./entities/passage";
import { createText } from "./entities/text";

const state = Map({
  scenes: List([
    createScene(
      "home",
      "start",
      List([
        createPassage("home_1", 0, createText("Greetings")),
        createPassage("home_2", 1, createText("Welcome to the party, pal")),
        createPassage("home_3", 2, createText("Let's go!"))
      ]),
      true
    )
  ])
});
const store = createStore(reducer, state);
const renderer = new Renderer();
const engine = new Engine(renderer, store);

engine.init();
engine.start();

window.engine = engine;
