import { Path, UseFormReturn } from 'react-hook-form';

import { toast as toastFn } from '@/client/hooks/use-toast';
import { CustomAPIError } from '@/client/utils/errors';

class ErrorHandler {
  static handleFormError<T extends Record<string, unknown>>({
    error,
    form,
    toast,
  }: {
    error: unknown;
    form: UseFormReturn<T>;
    toast?: typeof toastFn;
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

    if (toast) {
      const description =
        error instanceof Error ? error.message : 'An unknown error occurred';

      toast({
        title: 'Error',
        variant: 'destructive',
        description,
      });
    }
  }
}

export default ErrorHandler;
