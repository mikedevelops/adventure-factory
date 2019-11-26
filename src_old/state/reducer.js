import { List, Map } from "immutable";
import {
  COMPLETE_PASSAGE,
  COMPLETE_SCENE,
  ENGINE_START,
  FOCUS_CHOICE_OPTION,
  LOAD_SCENES,
  NEXT_PASSAGE,
  PRESENT_CHOICE,
  SELECT_CHOICE_OPTION
} from "./actions";
import {
  activateScene,
  getNextScene,
  goToScene,
  setSceneComplete,
  updateChoice,
  updatePassages,
  updateScene
} from "../entities/scene";
import {
  activatePassage,
  getNextPassage,
  setPassageComplete
} from "../entities/passage";
import {
  activateChoice,
  setOptionFocused,
  getFocusedOption
} from "../entities/choice";

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

    case PRESENT_CHOICE:
      return state.set(
        "scenes",
        updateScene(state.get("scenes"), activateChoice(action.scene))
      );

    case SELECT_CHOICE_OPTION: {
      const option = getFocusedOption(action.choice);
      return state.set(
        "scenes",
        goToScene(state.get("scenes"), option.location)
      );
    }

    case FOCUS_CHOICE_OPTION: {
      const choice = setOptionFocused(action.choice, action.optionIndex);
      return state.set(
        "scenes",
        updateScene(state.get("scenes"), updateChoice(action.scene, choice))
      );
    }

    case LOAD_SCENES: {
      const { scenes } = action;
      const loadedScenes = activateScene(scenes, getNextScene(scenes));
      return state.set("scenes", loadedScenes);
    }

    default:
      return state;
  }
};
