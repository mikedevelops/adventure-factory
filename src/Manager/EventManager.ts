import { EventHandler, EventListener } from "../Event/EventListener";
import { EventPayload, isEventWithPromise } from "../Event/EventPayload";

export class EventManager {
  public static instance: EventManager;

  constructor() {
    if (EventManager.instance !== undefined) {
      throw new Error("More than 1 instance of EventManager");
    }

    EventManager.instance = this;
  }

  private listeners: Map<string, EventListener[]> = new Map<
    string,
    EventListener[]
  >();

  public listen(type: string, handler: EventHandler): void {
    const listener = new EventListener(type, handler);
    const listeners = this.listeners.get(type);

    if (listeners !== undefined) {
      listeners.push(listener);
      return;
    }

    this.listeners.set(type, [listener]);
  }

  public dispatch(type: string, payload: EventPayload = {}): void {
    const listeners = this.listeners.get(type);

    if (listeners === undefined || listeners.length === 0) {
      return;
    }

    listeners.forEach(listener => {
      listener.getHandler().call(null, payload);

      if (isEventWithPromise(payload)) {
        payload.resolve();
      }
    });
    this.listeners.set(type, []);
  }
}
