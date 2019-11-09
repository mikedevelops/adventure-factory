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
