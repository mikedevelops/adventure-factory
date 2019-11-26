import { Event } from "./Event";
import { EventPayload } from "./EventPayload";

export type EventHandler = (event: EventPayload) => void;

export class EventListener {
  constructor(private type: string, private handler: EventHandler) {}

  public getType(): string {
    return this.type;
  }

  public getHandler(): EventHandler {
    return this.handler;
  }
}
