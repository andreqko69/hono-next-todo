import { SignInResponse } from 'next-auth/react';
import { Path, UseFormReturn } from 'react-hook-form';

import { toast } from '@/client/hooks/use-toast';
import { CustomAPIError, NextAuthErrorData } from '@/client/utils/errors';

class ErrorHandler {
  /**
   * Handle form errors and display them to the user
   */
  static handleFormError<T extends Record<string, unknown>>({
    error,
    form,
  }: {
    error: unknown;
    form: UseFormReturn<T>;
  }) {
    if (error instanceof CustomAPIError) {
      error.fieldErrors?.forEach((e) => {
        form.setError(e.fieldName as Path<T>, {
          type: 'server',
          message: e.message,
        });
      });

      return;
    }

    const description =
      error instanceof Error ? error.message : 'An unknown error occurred';

    toast({
      title: 'Error',
      variant: 'destructive',
      description,
    });
  }
  /**
   * Throw an error from a NextAuth response if it exists
   */
  static throwErrorFromNextAuthResponse(response: SignInResponse | undefined) {
    const errorData = ErrorHandler.getNextAuthErrorDataFromResponse(response);

    if (typeof errorData === 'object' && errorData.fieldErrors) {
      throw new CustomAPIError(errorData.message, errorData.fieldErrors);
    }

    const errorMessage =
      typeof errorData === 'object' ? errorData.message : errorData;

    if (errorMessage) {
      throw new Error(errorMessage);
    }
  }
  /**
   * Extract error data from NextAuth response if it exists.
   * A small utility function to help with error handling,
   * since NextAuth doesn't allow throwing errors with custom data.
   */
  static getNextAuthErrorDataFromResponse(
    response: SignInResponse | undefined
  ) {
    if (!response?.code) {
      return;
    }

    try {
      return JSON.parse(response.code) as NextAuthErrorData;
    } catch {}

    return response.code;
  }
}

export default ErrorHandler;
