import React from 'react';

import { auth } from '@/auth';
import UserProfile from '@/client/components/layout/Sidebar/components/UserProfile';

const Sidebar = async () => {
  const session = await auth();
  console.log('session:', session);

  return (
    <aside>
      <UserProfile />
      <nav>
        <ul>
          <li>Home</li>
          <li>Dashboard</li>
          <li>Profile</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
