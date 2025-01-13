import { FieldError } from '@/shared/validation/errors';

export class CustomAPIError extends Error {
  constructor(
    message: string,
    public fieldErrors?: FieldError[]
  ) {
    super(message);
    this.name = 'CustomAPIError';
    this.fieldErrors = fieldErrors;
  }
}
