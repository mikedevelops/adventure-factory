import { Option } from "../Entities/Option";
import { Text } from "../Entities/Text";
import { Speed } from "../Animation/Speed";

export const createOption = (
  content: string,
  focused = false,
  speed = Speed.NORMAL
): Option => {
  const option = new Option(new Text(content, speed), focused);

  return option;
};
