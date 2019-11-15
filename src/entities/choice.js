import { updateChoice } from "./scene";

/**
 * @typedef {Object} SceneChoice
 * @property {List<ChoiceOption>} options
 * @property {boolean} isComplete
 * @property {boolean} isActive
 */

/**
 * @param {List<ChoiceOption>} options
 * @param {boolean} isComplete
 * @param {boolean} isActive
 * @return {SceneChoice}
 */
export const createChoice = (
  options,
  isComplete = false,
  isActive = false
) => ({
  options,
  isComplete,
  isActive
});

/**
 * @param {Scene} scene
 * @return {Scene}
 */
export const activateChoice = scene => {
  const choice = Object.assign({}, scene.choice, { isActive: true });
  const activatedChoice = setOptionFocused(choice);

  return Object.assign({}, scene, { choice: activatedChoice });
};

/**
 * @param {Scene} scene
 * @return {Scene}
 */
export const setChoiceComplete = scene => {
  const choice = Object.assign({}, scene.choice, {
    isActive: false,
    isComplete: true
  });

  return updateChoice(scene, choice);
};

/**
 * @param {SceneChoice} choice
 * @param {number} optionIndex
 * @return {ChoiceOption}
 */
export const getOptionFromChoice = (choice, optionIndex) => {
  return choice.options.get(optionIndex, null);
};

/**
 * @param {SceneChoice} choice
 * @param {List<ChoiceOption>} options
 * @return {SceneChoice}
 */
export const updateOptions = (choice, options) => {
  return Object.assign({}, choice, { options });
};

/**
 * @param {SceneChoice} choice
 * @param {number} index
 * @return {SceneChoice}
 */
export const setOptionFocused = (choice, index = 0) => {
  const options = choice.options.map((option, i) => {
    if (i === index) {
      return Object.assign({}, option, { isFocused: true });
    }

    return Object.assign({}, option, { isFocused: false });
  });

  return updateOptions(choice, options);
};

/**
 * @param {SceneChoice} choice
 * @return {ChoiceOption}
 */
export const getFocusedOption = choice => {
  const option = choice.options.find(option => option.isFocused);

  if (option === undefined) {
    throw new Error("Cannot find focused option in choice");
  }

  return option;
};
