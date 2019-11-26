import runtime from "./index";
import { GameState } from "./State/Game/GameState";
import { Scene } from "./Entities/Scene";
import { Text } from "./Entities/Text";
import { Choice } from "./Entities/Choice";
import { createPassage } from "./Factories/passageFactory";
import { createOption } from "./Factories/optionFactory";

const scene = new Scene(
  "Home",
  [
    createPassage("You enter the kitchen"),
    createPassage("As your heart races you look around frantically")
  ],
  new Choice(new Text("What should you grab?"), [
    createOption("The phone", true),
    createOption("A knife")
  ])
);
const state = new GameState([scene]);

runtime.init();
runtime.load(state);
runtime.start();
