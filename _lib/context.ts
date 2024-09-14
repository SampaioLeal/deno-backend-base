interface ClassConstructor<T = unknown> {
  new (...args: unknown[]): T;
}

export class Context {
  private bindings = new Map<string, unknown>();

  bind<T>(identifier: string, value: T): void {
    this.bindings.set(identifier, value);
  }

  get<T>(identifier: string): T {
    const value = this.bindings.get(identifier);

    if (value === undefined) {
      throw new Error(`Identifier ${identifier} not bound`);
    }

    try {
      const constructor = value as ClassConstructor;
      const instantiatedClass = new constructor();

      this.bind(identifier, instantiatedClass);

      return instantiatedClass as T;
    } catch (_) {
      return value as T;
    }
  }
}
