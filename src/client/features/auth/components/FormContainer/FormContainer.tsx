import React from 'react';

const FormContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="rounded mx-auto bg-color-bg-main p-8 w-full max-w-[1000px]">
      {children}
    </div>
  );
};

export default FormContainer;
