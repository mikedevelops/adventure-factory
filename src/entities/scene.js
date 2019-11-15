import { List } from "immutable";
import {
  activatePassage,
  deactivatePassages,
  getNextPassage,
  setPassagesInComplete
} from "./passage";
import { setChoiceComplete } from "./choice";

/**
 * @typedef {Object} Scene
 * @property {string} id
 * @property {string} name
 * @property {List<Passage>} passages
 * @property {SceneChoice} choice
 * @property {boolean} isFirstScene
 * @property {boolean} isActive
 * @property {boolean} isComplete
 */

/**
 * @param {string} id
 * @param {string} name
 * @param {List<Passage>} passages
 * @param {SceneChoice} choice
 * @param {boolean} isFirstScene
 * @param {boolean} isActive
 * @param {boolean} isComplete
 * @return {Scene}
 */
export const createScene = (
  id,
  name,
  passages,
  choice,
  isFirstScene = false,
  isActive = false,
  isComplete = false
) => ({
  id,
  name,
  isFirstScene,
  isActive,
  isComplete,
  passages,
  choice
});

/**
 * @param {List<Scene>} scenes
 * @return {Scene|null}
 */
export const getActiveScene = scenes => {
  const scene = scenes.find(s => s.isActive && !s.isComplete);

  if (scene === undefined) {
    return null;
  }

  return scene;
};

/**
 * @param {List<Scene>}scenes
 * @return {Scene}
 */
export const getNextScene = scenes => {
  const active = getActiveScene(scenes);

  if (active !== null) {
    return active;
  }

  const first = scenes.find(s => s.isFirstScene);

  if (first !== undefined && !first.isComplete) {
    return first;
  }

  const next = scenes.find(s => !s.isComplete);

  return next === undefined ? null : next;
};

/**
 * @param {List<Scene>} scenes
 * @param {Scene} scene
 * @return {List<Scene>}
 */
export const activateScene = (scenes, scene) => {
  return scenes.map(s => {
    if (s.id === scene.id) {
      const passages = activatePassage(
        scene.passages,
        getNextPassage(scene.passages)
      );
      return Object.assign({}, scene, { isActive: true, passages });
    }

    return deactivateScene(s);
  });
};

/**
 * @param {Scene} scene
 * @return {Scene}
 */
export const deactivateScene = scene => {
  const passages = deactivatePassages(scene.passages);
  return Object.assign({}, scene, {
    isActive: false,
    passages
  });
};

/**
 * @param {Scene} scene
 * @param {List<Passage>} passages
 * @return {Scene}
 */
export const updatePassages = (scene, passages) => {
  return Object.assign({}, scene, { passages });
};

/**
 * @param {List<Scene>} scenes
 * @param {Scene} scene
 * @return {List<Scene>}
 */
export const updateScene = (scenes, scene) => {
  const sceneIndex = scenes.findIndex(s => s.id === scene.id);

  if (sceneIndex === -1) {
    return scenes.push(scene);
  }

  return scenes.set(sceneIndex, scene);
};

/**
 * @param {Scene} scene
 * @return {boolean}
 */
export const isSceneComplete = scene => {
  const incompletePassages = scene.passages.filter(p => !p.isComplete);

  if (incompletePassages.size > 0) {
    return false;
  }

  return scene.choice.isComplete;
};

/**
 * @param {Scene} scene
 * @return {Scene}
 */
export const setSceneComplete = scene => {
  return Object.assign({}, scene, { isComplete: true, isActive: false });
};

/**
 * @param {Scene} scene
 * @return {Scene}
 */
export const setSceneIncomplete = scene => {
  const inCompletePassages = setPassagesInComplete(scene.passages);
  return Object.assign({}, scene, {
    isComplete: false,
    passages: inCompletePassages
  });
};

/**
 * @param {Scene} scene
 * @param {SceneChoice} choice
 * @return {Scene}
 */
export const updateChoice = (scene, choice) => {
  return Object.assign({}, scene, { choice });
};

/**
 * @param {Scene} scene
 * @return {boolean}
 */
export const isChoiceActive = scene => {
  return scene.choice.isActive;
};

/**
 * @param {List<Scene>} scenes
 * @return {SceneChoice|null}
 */
export const getActiveChoice = scenes => {
  const activeScene = scenes.find(s => s.isActive);

  if (activeScene === undefined) {
    return null;
  }

  if (!activeScene.choice.isActive) {
    return null;
  }

  return activeScene.choice;
};

/**
 * @param {List<Scene>} scenes
 * @param {string} newSceneId
 * @return {List<Scene>}
 */
export const goToScene = (scenes, newSceneId) => {
  const activeScene = getActiveScene(scenes);
  const sceneWithCompletedChoice = setChoiceComplete(activeScene);
  const completedScenes = updateScene(
    scenes,
    setSceneComplete(sceneWithCompletedChoice)
  );
  const newScene = completedScenes.find(s => s.id === newSceneId);

  if (newScene === undefined) {
    throw new Error(`Could not find scene "${newSceneId}"`);
  }

  return activateScene(completedScenes, setSceneIncomplete(newScene));
};
