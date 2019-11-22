import Engine from "./Engine";
import { createStore } from "redux";
import reducer from "../state/reducer";
import TextEngine from "../text/TextEngine";
import Animator from "../animation/Animator";
import UiEngine from "../ui/UiEngine";
import { Application } from "pixi.js";

/**
 * @return {Engine}
 */
export const createEngine = root => {
  const store = createStore(reducer);
  const renderer = new Application({
    width: 512,
    height: 512,
    view: root,
    transparent: true
  });
  const text = new TextEngine(renderer);
  const animator = new Animator();
  const ui = new UiEngine(animator, renderer);
  const engine = new Engine(ui, text, store);

  return engine;
};
