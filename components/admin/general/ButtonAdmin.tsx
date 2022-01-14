import React from 'react';

interface ButtonAdminProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
  className?: string;
  children: React.ReactNode;
};

export default function ButtonAdmin({ className, children, ...rest }: ButtonAdminProps) {
  return (
    <button {...rest} className={`${className} button-admin`}>
      {children}
    </button>
  );
}
