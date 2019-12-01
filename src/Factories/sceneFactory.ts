import { Scene } from "../Entities/Scene";

export const createScene = (name: string): Scene => {
  return new Scene(name);
};
