import React from 'react';
import classNames from 'classnames';

export function MenuItemWrapper({ children, ...props }) {
  const menuItemClassnames = classNames(
    'flex',
    'items-center',
    'gap-1',
    'py-2 px-3',
    'hover:bg-blue-100',
    'rounded-lg',
    'cursor-pointer',
    'whitespace-nowrap',
    'font-semibold'
  );
  return (
    <li tabIndex={0} {...props} className={menuItemClassnames}>
      {children}
    </li>
  );
}
