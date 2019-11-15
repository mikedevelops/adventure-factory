import {
  completePassage,
  completeScene,
  focusChoiceOption,
  gameOver,
  nextPassage,
  nextScene,
  presentChoice,
  selectChoiceOption,
  startEngine
} from "../state/actions";
import {
  getActiveChoice,
  getActiveScene,
  getNextScene,
  isChoiceActive,
  isSceneComplete
} from "../entities/scene";
import {
  getActivePassage,
  getNextPassage,
  isPassagesComplete
} from "../entities/passage";
import { batchActions } from "redux-batched-actions";
import { getFocusedOption, getOptionFromChoice } from "../entities/choice";

const KEY_ENTER = "Enter";
const KEY_DOWN = "ArrowDown";
const KEY_UP = "ArrowUp";

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
  }

  init() {
    this.store.subscribe(this.update.bind(this));
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  start() {
    const scenes = this.store.getState().get("scenes");
    this.store.dispatch(startEngine(getNextScene(scenes)));
  }

  update() {
    const scenes = this.store.getState().get("scenes");
    const choice = getActiveChoice(scenes);

    if (choice !== null) {
      this.renderer.printChoice(choice);
      return;
    }

    const passage = getActivePassage(scenes);

    if (passage === null) {
      this.next();
      return;
    }

    this.renderer.printPassage(passage);
    this.next();
  }

  next() {
    const scenes = this.store.getState().get("scenes");
    const activeScene = getActiveScene(scenes);

    if (activeScene === null) {
      throw new Error("No active scene");
    }

    const activePassage = getActivePassage(scenes);

    if (isPassagesComplete(activeScene.passages)) {
      if (isChoiceActive(activeScene)) {
        return;
      }

      this.store.dispatch(presentChoice(activeScene));
      return;
    }

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

  selectOption() {
    const scenes = this.store.getState().get("scenes");
    const choice = getActiveChoice(scenes);

    if (choice === null) {
      throw new Error("No active choice to select");
    }

    this.store.dispatch(selectChoiceOption(choice));
  }

  focusOption(optionIndex) {
    const scenes = this.store.getState().get("scenes");
    const choice = getActiveChoice(scenes);

    this.store.dispatch(
      focusChoiceOption(getActiveScene(scenes), choice, optionIndex)
    );
  }

  handleKeyDown(event) {
    const scenes = this.store.getState().get("scenes");
    const choice = getActiveChoice(scenes);

    if (this.renderer.drawing || choice === null) {
      return;
    }

    switch (event.code) {
      case KEY_ENTER:
        this.selectOption();
        return;
      case KEY_DOWN: {
        const focusedOption = getFocusedOption(choice);
        const optionIndex = choice.options.findIndex(o => focusedOption === o);
        this.focusOption((optionIndex + 1) % choice.options.size);
        return;
      }
      case KEY_UP: {
        const focusedOption = getFocusedOption(choice);
        const optionIndex = choice.options.findIndex(o => focusedOption === o);
        this.focusOption(Math.abs((optionIndex - 1) % choice.options.size));
        return;
      }
    }
  }
}
