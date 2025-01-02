interface ErrorDetails {
  fieldName: string;
  error?: string;
}

export class CustomAPIError extends Error {
  constructor(
    message: string,
    public details?: ErrorDetails | ErrorDetails[]
  ) {
    super(message);
    this.name = 'CustomAPIError';
    this.details = details;
  }
}
