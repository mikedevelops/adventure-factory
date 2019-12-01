import { Text } from "../Entities/Text";

export class TextHydraytor {
  public static hydrate(textObj: any): Text {
    const text = new Text();

    text.setContent(textObj.content);
    text.setSpeed(textObj.speed);

    return text;
  }
}
