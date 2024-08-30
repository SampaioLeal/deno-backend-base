interface ClassConstructor {
  new (...args: unknown[]): unknown;
}

export class Context {
  private bindings = new Map<string, unknown>();

  constructor() {}

  bind(identifier: string, value: unknown) {
    this.bindings.set(identifier, value);
  }

  get(identifier: string) {
    const value = this.bindings.get(identifier);

    try {
      const constructor = value as ClassConstructor;
      const instantiatedClass = new constructor();

      this.bind(identifier, instantiatedClass);

      return instantiatedClass;
    } catch (_) {
      return value;
    }
  }
}
