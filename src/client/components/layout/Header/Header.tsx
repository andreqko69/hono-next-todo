import React from 'react';

import HeaderActions from '@/client/components/layout/Header/HeaderActions';
import Logo from '@/client/components/Logo/Logo';
import TodosSearchBar from '@/client/features/todo/components/TodoSearchBar/TodoSearchBar';

const Header = (props: any) => {
  return (
    <div className="bg-color-bg-header h-24 px-8">
      <div className="container flex items-center justify-between h-full mx-auto gap-4">
        <Logo />
        <TodosSearchBar />
        <HeaderActions />
      </div>
    </div>
  );
};

export default Header;
