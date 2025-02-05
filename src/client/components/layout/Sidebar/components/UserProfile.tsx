import React from 'react';

import { getCurrentUser } from '@/client/features/user/api/queries';

const UserProfile = () => {
  const user = getCurrentUser();
  console.log(user);

  return <>Text</>;
};

export default UserProfile;
