export const ENGINE_START = "ENGINE_START";
export const startEngine = scene => ({ type: ENGINE_START, scene });

export const NEXT_SCENE = "NEXT_SCENE";
export const nextScene = currentScene => ({ type: NEXT_SCENE, currentScene });

export const COMPLETE_PASSAGE = "COMPLETE_PASSAGE";
/**
 * @param {Scene} scene
 * @param {Passage} passage
 * @return {{passage: Passage, type: string, scene: Scene}}
 */
export const completePassage = (scene, passage) => ({
  type: COMPLETE_PASSAGE,
  passage,
  scene
});

export const COMPLETE_SCENE = "COMPLETE_SCENE";
export const completeScene = scene => ({
  type: COMPLETE_SCENE,
  scene
});

export const NEXT_PASSAGE = "NEXT_PASSAGE";
export const nextPassage = scene => ({
  type: NEXT_PASSAGE,
  scene
});

export const GAME_OVER = "GAME_OVER";
export const gameOver = () => ({ type: GAME_OVER });

export const PRESENT_CHOICE = "PRESENT_CHOICE";
/**
 * @param {Scene} scene
 * @return {{type: string, scene: Scene}}
 */
export const presentChoice = scene => ({
  type: PRESENT_CHOICE,
  scene
});

export const SELECT_CHOICE_OPTION = "SELECT_CHOICE_OPTION";
/**
 * @param {SceneChoice} choice
 * @return {{type: string, choice: SceneChoice}}
 */
export const selectChoiceOption = choice => ({
  type: SELECT_CHOICE_OPTION,
  choice
});

export const FOCUS_CHOICE_OPTION = "FOCUS_CHOICE_OPTION";
/**
 * @param {Scene} scene
 * @param {SceneChoice} choice
 * @param {number} optionIndex
 * @return {{type: string, option: ChoiceOption, choice: SceneChoice}}
 */
export const focusChoiceOption = (scene, choice, optionIndex) => ({
  type: FOCUS_CHOICE_OPTION,
  scene,
  choice,
  optionIndex
});

export const LOAD_SCENES = "LOAD_SCENES";
export const loadScenes = scenes => ({
  type: LOAD_SCENES,
  scenes
});

export const INPUT = "INPUT";
export const input = () => ({ type: INPUT });
