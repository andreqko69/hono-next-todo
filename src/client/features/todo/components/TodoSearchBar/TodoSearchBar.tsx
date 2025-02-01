import React from 'react';

import { Input } from '@/client/components/ui/input';

const TodoSearchBar = (props: any) => {
  return (
    <Input className="w-full max-w-xl" placeholder="Search your task here" />
  );
};

export default TodoSearchBar;
