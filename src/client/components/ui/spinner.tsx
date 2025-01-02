import clsx from 'clsx';
import React from 'react';

const sizes = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
  xl: 'h-16 w-16 border-4',
};

export const Spinner = ({ size }: { size: keyof typeof sizes }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          'inline-block rounded-full border-solid animate-spin color-text-secondary border-t-transparent border-l-transparent border-r-transparent',
          sizes[size]
        )}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
