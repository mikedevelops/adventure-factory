import { Passage } from "../Entities/Passage";
import { TextHydraytor } from "./TextHydraytor";

export class PassageHydraytor {
  public static hydrate(passageObj: any): Passage {
    const passage = new Passage();

    passage.setComplete(passageObj.complete);
    passage.setText(TextHydraytor.hydrate(passageObj.text));

    return passage;
  }
}
