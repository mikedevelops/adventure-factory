/**
 * @typedef {Object} PassageOption
 * @param {Text} text
 * @param {string} location
 */

/**
 * @param {PassageText} text
 * @param {string} location
 * @return {PassageOption}
 */
export const createOption = (text, location) => ({
  text,
  location
});
