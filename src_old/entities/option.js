/**
 * @typedef {Object} ChoiceOption
 * @property {number} order
 * @property {Text} text
 * @property {string} location
 * @property {boolean} isFocused
 * @property {string} id
 */

/**
 * @param {string} id
 * @param {number} order
 * @param {EngineText} text
 * @param {string} location
 * @param {boolean} isFocused
 * @return {ChoiceOption}
 */
export const createOption = (id, order, text, location, isFocused = false) => ({
  id,
  text,
  location,
  isFocused,
  order
});
