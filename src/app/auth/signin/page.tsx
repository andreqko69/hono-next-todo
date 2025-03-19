import React, { Suspense } from 'react';

import SignInForm from '@/client/features/auth/components/SignInForm';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
};

export default page;
