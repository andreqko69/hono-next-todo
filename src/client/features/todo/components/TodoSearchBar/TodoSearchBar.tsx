'use client';

import React, { useState } from 'react';

import { Input } from '@/client/components/ui/input';

const TodoSearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <Input
      className="w-full max-w-xl"
      placeholder="Search your task here"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default TodoSearchBar;
