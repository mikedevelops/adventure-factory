import { Text, Container, TextStyle, Graphics } from "pixi.js";
import Engine from "../engine/Engine";
import { getFocusedOption } from "../entities/choice";

const TEXT_STYLE = new TextStyle({ fontSize: Engine.getUnit(1) });

export default class TextEngine {
  /**
   * @param {PIXI.Application} renderer
   */
  constructor(renderer) {
    this.renderer = renderer;
    this.passage = new Text("", TEXT_STYLE);
    this.choice = new Container();
    this.optionFocus = new Graphics();
  }

  init() {
    this.renderer.stage.addChild(this.passage);
    this.renderer.stage.addChild(this.choice);
  }

  /**
   * @param {EngineText} text
   */
  async processText(text) {
    const timeout = 50;
    await this.type(text, timeout);
  }

  /**
   * @param {SceneChoice} choice
   * @return {Promise<void>}
   */
  async processChoice(choice) {
    const focusedOption = getFocusedOption(choice);

    // Reset choice
    this.optionFocus.clear();
    this.choice.removeChildren();
    this.choice.addChild(this.optionFocus);
    this.renderer.render();

    choice.options.forEach((option, index) => {
      const o = new Text(option.text.content, TEXT_STYLE);
      o.y = Engine.getUnit(index * 1 + 1);
      o.zIndex = 5;

      if (focusedOption === option) {
        console.log("drawing focus!", option);
        this.optionFocus.beginFill(0xff0000);
        this.optionFocus.drawRect(o.x, o.y, o.width, o.height);
        this.optionFocus.endFill();
      }

      this.choice.addChild(o);
    });

    this.renderer.render();
  }

  clearChoice() {
    this.choice.removeChildren();
    this.renderer.render();
  }

  /**
   * @param {EngineText} text
   * @param {number} timeout
   * @param {number} index
   * @return {Promise<void>}
   */
  async type(text, timeout, index = 0) {
    if (index > text.content.length) {
      return;
    }

    this.passage.text = text.content.slice(0, index);

    await this.draw(timeout);
    return this.type(text, timeout, index + 1);
  }

  /**
   * @param {number} timeout
   * @return {Promise<void>}
   */
  draw(timeout = 0) {
    return new Promise(done => {
      setTimeout(() => {
        this.renderer.render();
        done();
      }, timeout);
    });
  }
}
