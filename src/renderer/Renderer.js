const FONT_SIZE = 32;

export default class Renderer {
  /**
   * @param {CanvasRenderingContext2D} context
   */
  constructor(context) {
    this.ctx = context;
    this.ctx.font = `${FONT_SIZE}px Arial`;
    this.drawing = false;

    /**
     * @type {Map<string, CanvasRenderingContext2D>}
     */
    this.layers = new Map();
  }

  createLayer(name) {
    const canvas = new OffscreenCanvas(
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    const ctx = canvas.getContext("2d");

    this.layers.set(name, ctx);
  }

  getLayer(name) {
    return this.layers.get(name);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  /**
   * @param {string} text
   * @param {CanvasRenderingContext2D} ctx
   */
  drawText(text, ctx) {
    const { width } = ctx.measureText(text);

    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(0, this.getUnit(1) / 4, width, FONT_SIZE);
    ctx.restore();
    ctx.fillText(text, 0, this.getUnit(1));

    this.ctx.drawImage(ctx.canvas, 0, 0);
  }

  getWaitingForInputBounds() {
    const size = this.getUnit(1);
    return {
      x: this.ctx.canvas.width - size * 2,
      y: this.ctx.canvas.height - size * 2,
      width: size,
      height: size
    };
  }

  drawWaitingForInput() {
    this.ctx.fillRect(...Object.values(this.getWaitingForInputBounds()));
  }

  clearWaitingForInput() {
    this.ctx.clearRect(...Object.values(this.getWaitingForInputBounds()));
  }

  /**
   * @param {number} unit
   * @return {number}
   */
  getUnit(unit) {
    return unit * FONT_SIZE;
  }
}
