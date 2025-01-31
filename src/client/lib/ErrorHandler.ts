import { Path, UseFormReturn } from 'react-hook-form';

import { toast } from '@/client/hooks/use-toast';
import { CustomAPIError } from '@/client/utils/errors';

class ErrorHandler {
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
}

export default ErrorHandler;
