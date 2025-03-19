import React from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-color-bg-secondary h-screen w-screen flex flex-col justify-center align-middle p-4">
      {children}
    </div>
  );
}
