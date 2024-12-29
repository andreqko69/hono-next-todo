import NextLink from 'next/link';
import React from 'react';

import { Routes } from '@/common/navigation/constants';

const Link = ({ text, href }: { text: string; href: Routes }) => {
  return (
    <NextLink href={href} className="text-color-text-link">
      {text}
    </NextLink>
  );
};

export default Link;
