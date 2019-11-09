export default class Renderer {
  /**
   * @param {PassageText} text
   * @param next
   */
  print(text, next) {
    // console.log(JSON.stringify(state.toObject(), null, 2));
    console.log(text.content);
    setTimeout(next, 1000);
  }
}
