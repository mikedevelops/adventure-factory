import runtime from "./index";
import { GameState } from "./State/Game/GameState";
import { Scene } from "./Entities/Scene";
import { Text } from "./Entities/Text";
import { Choice } from "./Entities/Choice";
import { createPassage } from "./Factories/passageFactory";
import { createOption } from "./Factories/optionFactory";
import { GameStateSerialiser } from "./Service/GameStateSerialiser";

const scene = new Scene(
  "Test",
  [createPassage("Test Passage")],
  new Choice(new Text("Test Choice"), [
    createOption("Option A", "TEST", 0, true),
    createOption("Option B", "TEST", 1)
  ])
);
const state = new GameState([scene]);
const saveFile = GameStateSerialiser.serialise(state);

runtime.init();
runtime.load(saveFile);
