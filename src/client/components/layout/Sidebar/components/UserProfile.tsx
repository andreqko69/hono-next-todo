import React from 'react';

import { getCurrentUser } from '@/client/features/user/api/queries';

const UserProfile = async () => {
  const user = await getCurrentUser();
  console.log('user', user);

  return <>Text</>;
};

export default UserProfile;
