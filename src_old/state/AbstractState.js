export default class AbstractState {
  /**
   * @return {string}
   */
  getName() {
    throw new Error("getName() Not implemented!");
  }

  /**
   * @return {AbstractState|null}
   */
  update() {
    throw new Error("update() Not implemented!");
  }
}
