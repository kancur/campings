import React, { Children } from 'react';

function FormWrapper({title, children}) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-300">
      <div className="p-6 max-w-md w-full shadow-md rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 m-4">
        <h1 className="text-3xl font-semibold text-center mb-4">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default FormWrapper;
