import React from 'react';

import Header from '@/client/components/layout/Header/Header';
import Sidebar from '@/client/components/layout/Sidebar/Sidebar';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        {children}
      </main>
    </>
  );
}
