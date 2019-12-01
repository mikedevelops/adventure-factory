import { Option } from "../Entities/Option";
import { TextHydraytor } from "./TextHydraytor";

export class OptionHydraytor {
  public static hydrate(optionObj: any): Option {
    const option = new Option();

    option.setFocused(optionObj.focused);
    option.setText(TextHydraytor.hydrate(optionObj.text));
    option.setLocation(optionObj.location);
    option.setOrder(optionObj.order);

    return option;
  }
}
