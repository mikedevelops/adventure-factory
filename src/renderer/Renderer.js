const FONT_SIZE = 32;

export default class Renderer {
  /**
   * @param {CanvasRenderingContext2D} context
   */
  constructor(context) {
    this.ctx = context;
    this.ctx.font = `${FONT_SIZE}px Arial`;
    this.drawing = false;
  }

  /**
   * @param {Passage} passage

   */
  printPassage(passage) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "black";
    this.drawText(passage.text.content);
  }

  /**
   * @param {SceneChoice} choice
   */
  printChoice(choice) {
    choice.options.forEach((option, index) => {
      this.ctx.fillStyle = option.isFocused ? "red" : "black";
      this.drawOption(option.text.content, index);
    });
  }

  /**
   * @param {string} text
   */
  drawText(text) {
    this.ctx.fillText(text, 0, this.getUnit(1));
  }

  drawOption(label, optionIndex) {
    this.ctx.fillText(
      label,
      0,
      optionIndex * this.getUnit(1) + this.getUnit(3)
    );
  }

  /**
   * @param {number} unit
   * @return {number}
   */
  getUnit(unit) {
    return unit * FONT_SIZE;
  }
}
