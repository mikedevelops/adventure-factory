import runtime from "./index";
import { GameState } from "./State/Game/GameState";
import { Scene } from "./Entities/Scene";
import { Text } from "./Entities/Text";
import { Choice } from "./Entities/Choice";
import { createPassage } from "./Factories/passageFactory";
import { createOption } from "./Factories/optionFactory";

const anotherScene = new Scene(
  "no knife",
  [
    createPassage("You reach for the knife..."),
    createPassage("It isn't there."),
    createPassage(
      "As you scan the kitchen looking for where it could be," +
        " you notice the hallway light is on"
    )
  ],
  new Choice(new Text("What should you do?"), [
    createOption("Investigate the hallway", "TEST", true),
    createOption("Grab the phone", "TEST")
  ])
);

const scene = new Scene(
  "Kitchen",
  [
    createPassage("You enter the kitchen"),
    createPassage("As your heart races you look around frantically")
  ],
  new Choice(new Text("What should you grab?"), [
    createOption("The phone", "TEST", true),
    createOption("A knife", anotherScene.getId())
  ])
);
const state = new GameState([scene, anotherScene]);

runtime.init();
runtime.load(state);
runtime.start();
