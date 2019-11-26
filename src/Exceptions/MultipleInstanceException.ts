export class MultipleInstanceException extends Error {
  constructor(name: string) {
    super(`Attempted to create multiple instances of singleton ${name}`);
  }
}
