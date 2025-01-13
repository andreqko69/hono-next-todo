import { HTTPException } from 'hono/http-exception';
import { ContentfulStatusCode } from 'hono/utils/http-status';

import { FieldError } from '@/shared/validation/errors';

type ExtraExceptionData = { fieldErrors?: FieldError[] };

export class AppError extends HTTPException {
  constructor(
    public message: string,
    public statusCode: ContentfulStatusCode,
    public extraExceptionData?: ExtraExceptionData
  ) {
    super(statusCode, { message });
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    { fieldErrors }: { fieldErrors?: FieldError[] } = {}
  ) {
    super(message, 400, { fieldErrors });
    this.name = 'ValidationError';
  }
}

export class AuthError extends AppError {
  constructor(
    message: string,
    { fieldErrors }: { fieldErrors?: FieldError[] } = {}
  ) {
    super(message, 401, { fieldErrors });
    this.name = 'AuthError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
