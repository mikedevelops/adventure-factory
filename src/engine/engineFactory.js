import Engine from "./Engine";
import { createStore } from "redux";
import reducer from "../state/reducer";
import Renderer from "../renderer/Renderer";

/**
 * @param root
 * @return {Engine}
 */
export const createEngine = root => {
  const ctx = root.getContext("2d");
  const store = createStore(reducer);
  const renderer = new Renderer(ctx);
  const engine = new Engine(renderer, store);

  return engine;
};
