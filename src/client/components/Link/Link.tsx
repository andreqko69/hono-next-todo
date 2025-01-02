import NextLink from 'next/link';
import React from 'react';

import { Route } from '@/shared/navigation/constants';

const Link = ({ text, href }: { text: string; href: Route }) => {
  return (
    <NextLink href={href} className="text-color-text-link">
      {text}
    </NextLink>
  );
};

export default Link;
