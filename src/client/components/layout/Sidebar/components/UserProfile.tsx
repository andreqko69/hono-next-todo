import React from 'react';

import { getCurrentUser } from '@/client/features/user/api/queries';

const UserProfile = (props: any) => {
  const user = getCurrentUser();

  return <>Text</>;
};

export default UserProfile;
