import * as PIXI from "pixi.js";

export const TextStyle = (maxWidth: number): PIXI.TextStyle =>
  new PIXI.TextStyle({
    wordWrap: true,
    wordWrapWidth: maxWidth
  });
