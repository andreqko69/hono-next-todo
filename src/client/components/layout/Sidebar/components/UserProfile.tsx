import React from 'react';

import { getCurrentUser } from '@/client/features/user/api/queries';

const UserProfile = async () => {
  const user = await getCurrentUser();

  return <>Text</>;
};

export default UserProfile;
