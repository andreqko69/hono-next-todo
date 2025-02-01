import NextLink from 'next/link';
import React from 'react';

import { Route } from '@/shared/navigation/constants';

const Logo = () => {
  return (
    <NextLink href={Route.Dashboard} className="cursor-pointer">
      <div className="text-2xl font-bold flex align-middle">
        <div className="text-color-text-accent">
          <span className="hidden md:inline">Hono</span>
          <span className="inline md:hidden">H</span>
        </div>
        <div className="text-color-text-primary">
          <span className="hidden md:inline">Todo</span>
          <span className="inline md:hidden">T</span>
        </div>
      </div>
    </NextLink>
  );
};

export default Logo;
