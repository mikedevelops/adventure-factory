export interface EventPayload {
  [index: string]: any;
}

export interface EventWithPromise {
  resolve: () => void;
}

export const isEventWithPromise = (
  event: EventPayload
): event is EventWithPromise =>
  (event as EventWithPromise).resolve !== undefined;
