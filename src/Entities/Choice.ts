import { Text } from "./Text";
import { Option } from "./Option";

export class Choice {
  constructor(private text: Text, private options: Option[]) {}

  public getText(): Text {
    return this.text;
  }

  public getOptions(): Option[] {
    return this.options;
  }

  public focusOption(offset: number): Option {
    const option = this.options.find(option => option.isFocused());

    if (option === undefined) {
      throw new Error("No focused Option in Choice");
    }

    const focusedIndex = this.options.indexOf(option);

    // Set all options unfocused
    this.options.forEach(option => {
      option.setFocused(false);
    });

    const newFocusedIndex = Math.abs(
      (focusedIndex + offset) % this.options.length
    );
    const newFocusedOption = this.options[newFocusedIndex];

    newFocusedOption.setFocused(true);

    return newFocusedOption;
  }

  public getOption(index: number): Option {
    if (this.options[index] === undefined) {
      throw new Error("Cannot find option: " + index);
    }

    return this.options[index];
  }

  public getFocusedOption(): Option {
    const focused = this.options.find(o => o.isFocused());

    if (focused === undefined) {
      throw new Error("Choice does not have focused option");
    }

    return focused;
  }
}
