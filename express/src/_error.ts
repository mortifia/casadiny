export interface ValidationError {
  field: string
  message: string
}

export class ErrorResponse {
  public code: number
  public message: string
  public validationErrors?: ValidationError[]

  constructor(
    code: number,
    message: string,
    validationErrors?: ValidationError[]
  ) {
    this.code = code
    this.message = message
    this.validationErrors = validationErrors
  }

  toJson() {
    return {
      code: this.code,
      message: this.message,
      validationErrors: this.validationErrors,
    }
  }
}
