type ValidationErrorCause = { path: string; message: string }[];

export class ValidationError extends Error {
  message: string;
  cause: ValidationErrorCause;

  constructor(message: string, cause: ValidationErrorCause) {
    super();
    this.message = message;
    this.cause = cause;
  }
}
