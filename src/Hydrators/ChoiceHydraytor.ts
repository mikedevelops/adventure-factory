import { Choice } from "../Entities/Choice";
import { TextHydraytor } from "./TextHydraytor";
import { OptionHydraytor } from "./OptionHydraytor";

export class ChoiceHydraytor {
  public static hydrate(choiceObj: any): Choice {
    const choice = new Choice();

    choice.setText(TextHydraytor.hydrate(choiceObj.text));
    choiceObj.options.forEach((optionObj: any) => {
      choice.addOption(OptionHydraytor.hydrate(optionObj));
    });

    return choice;
  }
}
