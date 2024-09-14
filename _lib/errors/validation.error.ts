type ValidationErrorCause = { path: string; message: string }[];

export class ValidationError extends Error {
  cause: ValidationErrorCause;

  constructor(message: string, cause: ValidationErrorCause) {
    super(message);
    this.cause = cause;
    this.name = "ValidationError";
  }
}
