import { StateManager } from "./Manager/StateManager";
import { Runtime } from "./Runtime/Runtime";
import { EventManager } from "./Manager/EventManager";
import { TextService } from "./Service/TextService";
import { Application } from "pixi.js";
import { UiService } from "./Service/UiService";
import { PassageView } from "./View/PassageView";
import { ChoiceView } from "./View/ChoiceView";

const pixi = new Application({
  width: 256,
  height: 256,
  view: document.getElementById("stage") as HTMLCanvasElement,
  backgroundColor: 0xffffff
});

const passageView = new PassageView(pixi);
const choiceView = new ChoiceView(pixi);

passageView.init();
choiceView.init();

new EventManager();
new TextService(pixi, passageView, choiceView);
new UiService(pixi, choiceView);

const stateManager = new StateManager();
const runtime = new Runtime(stateManager);

export default runtime;
