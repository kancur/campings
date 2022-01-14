import React from 'react';

type FormWrapperProps = {
  /**
   * Title of the form
   */
  title: string;
  /**
   * Children of the wrapper (most likely the form itself)
   */
  children: React.ReactNode;
};

/**
 * A wrapper for login / signup forms
 */
function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-200 to-blue-300">
      <div className="p-6 max-w-md w-full shadow-md rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 m-4">
        <h1 className="text-3xl font-semibold text-center mb-4">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default FormWrapper;
