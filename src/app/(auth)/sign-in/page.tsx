import React, { Suspense } from 'react';

import SignInForm from '@/client/features/auth/components/SignInForm';

const page = () => {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
};

export default page;
