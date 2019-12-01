import { StateManager } from "./Manager/StateManager";
import { Runtime } from "./Runtime/Runtime";
import { Application } from "pixi.js";
import { PassageView } from "./View/PassageView";
import { ChoiceView } from "./View/ChoiceView";
import { PassageController } from "./Controller/PassageController";
import { Animator } from "./Animation/Animator";
import { ChoiceController } from "./Controller/ChoiceController";
import { LoadGameStateManager } from "./Manager/LoadGameStateManager";
import { UiView } from "./View/UiView";
import { UiController } from "./Controller/UiController";

const pixi = new Application({
  width: 256,
  height: 256,
  view: document.getElementById("stage") as HTMLCanvasElement,
  backgroundColor: 0xffffff
});

const passageView = new PassageView(pixi);
const choiceView = new ChoiceView(pixi);
const uiView = new UiView(pixi);

passageView.init();
choiceView.init();
uiView.init();

const animator = new Animator();

new PassageController(animator, passageView);
new ChoiceController(animator, choiceView);
new UiController(animator, uiView);

const stateManager = new StateManager();
const runtime = new Runtime(stateManager, new LoadGameStateManager());

export default runtime;
