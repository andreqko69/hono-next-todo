'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

const Dashboard = () => {
  const handleSignOut = async () => {
    signOut();
  };

  return (
    <>
      Dashboard
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Dashboard;
