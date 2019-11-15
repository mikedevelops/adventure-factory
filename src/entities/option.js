/**
 * @typedef {Object} ChoiceOption
 * @property {Text} text
 * @property {string} location
 * @property {boolean} isFocused
 */

/**
 * @param {PassageText} text
 * @param {string} location
 * @param {boolean} isFocused
 * @return {ChoiceOption}
 */
export const createOption = (text, location, isFocused = false) => ({
  text,
  location,
  isFocused
});
