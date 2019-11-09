import { List, Map } from "immutable";
import {
  COMPLETE_PASSAGE,
  COMPLETE_SCENE,
  ENGINE_START,
  NEXT_PASSAGE
} from "./actions";
import {
  activateScene,
  setSceneComplete,
  updatePassages,
  updateScene
} from "../entities/scene";
import {
  activatePassage,
  getNextPassage,
  setPassageComplete
} from "../entities/passage";

const initialState = Map({
  scenes: List()
});

export default (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case ENGINE_START:
      return state.set(
        "scenes",
        activateScene(state.get("scenes"), action.scene)
      );

    case COMPLETE_PASSAGE: {
      const newPassages = setPassageComplete(
        action.scene.passages,
        action.passage
      );
      const newScene = updatePassages(action.scene, newPassages);
      return state.set("scenes", updateScene(state.get("scenes"), newScene));
    }

    case NEXT_PASSAGE: {
      const { passages } = action.scene;
      const newPassages = activatePassage(passages, getNextPassage(passages));
      const newScene = updatePassages(action.scene, newPassages);
      return state.set("scenes", updateScene(state.get("scenes"), newScene));
    }

    case COMPLETE_SCENE:
      return state.set(
        "scenes",
        updateScene(state.get("scenes"), setSceneComplete(action.scene))
      );

    default:
      return state;
  }
};
