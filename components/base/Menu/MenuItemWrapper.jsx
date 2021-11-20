import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

export function MenuItemWrapper({ children, href, ...props }) {
  const menuItemClassnames = classNames(
    'flex',
    'items-center',
    'gap-1',
    'py-2 px-3',
    'hover:bg-gray-200',
    'hover:text-gray-900',
    'text-gray-600',
    'rounded-2xl',
    'cursor-pointer',
    'whitespace-nowrap',
    'no-highlight'
  );
  return (
    <li tabIndex={0} {...props}>
      {href ? (
        <Link href={href}>
          <a className={menuItemClassnames}>{children}</a>
        </Link>
      ) : (
        <a className={menuItemClassnames}>{children}</a>
      )}
    </li>
  );
}
