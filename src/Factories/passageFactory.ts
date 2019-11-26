import { Passage } from "../Entities/Passage";
import { Text } from "../Entities/Text";

export const createPassage = (content: string): Passage => {
  const text = new Text(content);
  return new Passage(text);
};
