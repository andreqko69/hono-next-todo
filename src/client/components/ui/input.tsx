import * as React from 'react';

import Icon, { IconName } from './icon';
import { cn } from '@/client/utils/shadcn';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { iconName?: IconName }
>(({ className, type, iconName, ...props }, ref) => {
  return (
    <div className="relative">
      {iconName && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon name={iconName} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
          className,
          iconName ? 'pl-12' : ''
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
