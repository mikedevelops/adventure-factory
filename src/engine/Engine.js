import {
  completePassage,
  completeScene,
  gameOver,
  nextPassage,
  nextScene,
  startEngine
} from "../state/actions";
import {
  getActiveScene,
  getNextScene,
  isSceneComplete
} from "../entities/scene";
import { getActivePassage, getNextPassage } from "../entities/passage";
import { batchActions } from "redux-batched-actions";

export default class Engine {
  /**
   * @param {Renderer} renderer
   * @param {Store} store
   */
  constructor(renderer, store) {
    /**
     * @type {Renderer}
     */
    this.renderer = renderer;
    /**
     * @type {Store}
     */
    this.store = store;
    /**
     * @type {Scene|null}
     */
    this.scene = null;
  }

  init() {
    this.store.subscribe(this.update.bind(this));
  }

  start() {
    const scenes = this.store.getState().get("scenes");
    this.store.dispatch(startEngine(getNextScene(scenes)));
  }

  update() {
    const state = this.store.getState();
    const passage = getActivePassage(state.get("scenes"));

    if (passage === null) {
      this.next();
      return;
    }

    this.renderer.print(passage.text, this.next.bind(this));
  }

  next() {
    const scenes = this.store.getState().get("scenes");
    const activeScene = getActiveScene(scenes);

    if (activeScene === null) {
      throw new Error("No active scene");
    }

    const activePassage = getActivePassage(scenes);

    if (isSceneComplete(activeScene)) {
      this.store.dispatch(completeScene(activeScene));
      return;
    }

    if (activePassage === null || activePassage.isComplete) {
      this.store.dispatch(nextPassage(activeScene));
      return;
    }

    this.store.dispatch(completePassage(activeScene, activePassage));
  }
}
