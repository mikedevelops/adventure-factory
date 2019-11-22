import {
  completePassage,
  completeScene,
  focusChoiceOption,
  input,
  loadScenes,
  nextPassage,
  presentChoice,
  selectChoiceOption,
  startEngine
} from "../state/actions";
import {
  getActiveChoice,
  getActiveScene,
  getNextScene,
  isChoiceActive,
  isPassageNext,
  isSceneComplete
} from "../entities/scene";
import {
  getActivePassage,
  getNextPassage,
  isPassagesComplete
} from "../entities/passage";
import { activateChoice, getFocusedOption } from "../entities/choice";
import { createStore } from "redux";
import reducer from "../state/reducer";
import { List, Map } from "immutable";

const KEY_ENTER = "Enter";
const KEY_DOWN = "ArrowDown";
const KEY_UP = "ArrowUp";

const BASE_UNIT = 16;

// TODO: state machine approach might be nicer here........

export default class Engine {
  /**
   * @param {UiEngine} ui
   * @param {TextEngine} textEngine
   * @param {Store} store
   */
  constructor(ui, textEngine, store) {
    /**
     * @type {UiEngine}
     */
    this.ui = ui;
    /**
     * @type {TextEngine}
     */
    this.textEngine = textEngine;
    /**
     * @type {Store}
     */
    this.store = store;
    /**
     * @type {List<Scene>|null}
     */
    this.checkpoint = null;
    /**
     * @type {boolean}
     */
    this.resume = false;
    /**
     * @type {boolean}
     */
    this.waitingForPassage = false;
  }

  init() {
    this.store.subscribe(this.update.bind(this));
    window.addEventListener("keydown", this.handleKeyDown.bind(this));

    this.textEngine.init();
  }

  /**
   * @param {List<Scene>} scenes
   */
  load(scenes) {
    this.checkpoint = scenes.slice();
    this.store.dispatch(loadScenes(scenes));
  }

  reload() {
    if (this.checkpoint === null) {
      throw new Error("No checkpoint to reload");
    }

    this.store.dispatch(loadScenes(this.checkpoint));
  }

  async update() {
    const scenes = this.store.getState().get("scenes");
    const scene = getActiveScene(scenes);
    const passage = getNextPassage(scene.passages);
    const choice = getActiveChoice(scenes);

    if (choice !== null) {
      await this.textEngine.processChoice(scene.choice);
      return;
    }

    if (this.waitingForPassage) {
      return;
    }

    if (passage === null) {
      this.store.dispatch(presentChoice(scene));
      return;
    }

    this.textEngine.clearChoice();
    await this.textEngine.processText(passage.text);
    this.waitingForPassage = true;
  }

  selectOption() {
    const scenes = this.store.getState().get("scenes");
    const choice = getActiveChoice(scenes);

    if (choice === null) {
      throw new Error("No active choice to select");
    }

    this.store.dispatch(selectChoiceOption(choice));
  }

  focusOption(optionIndex = 0) {
    const scenes = this.store.getState().get("scenes");
    const choice = getActiveChoice(scenes);

    this.store.dispatch(
      focusChoiceOption(getActiveScene(scenes), choice, optionIndex)
    );
  }

  handleKeyDown(event) {
    const scenes = this.store.getState().get("scenes");
    const activeScene = getActiveScene(scenes);
    const choice = getActiveChoice(scenes);

    switch (event.code) {
      case KEY_ENTER: {
        if (this.waitingForPassage) {
          this.waitingForPassage = false;
          this.store.dispatch(
            completePassage(activeScene, getActivePassage(scenes))
          );
          return;
        }

        this.selectOption();
        return;
      }
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

  static getUnit(u) {
    return u * BASE_UNIT;
  }
}
