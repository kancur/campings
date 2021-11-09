import React, { useEffect } from 'react';
import {
  FaCampground,
  FaChartLine,
  FaChevronDown,
  FaFire,
  FaSignInAlt,
  FaStar,
  FaUserPlus,
} from 'react-icons/fa';
import Link from 'next/link';
import classNames from 'classnames';


export default function MenuItems({auth}) {
  const IconClasses = classNames('w-5 h-5');

  return (
    <>
      <MenuItem>
        <FaChartLine className={`${IconClasses} text-purple-500`} /> Populárne
      </MenuItem>
      <MenuItem>
        <FaStar className={`${IconClasses} w-5 h-5 text-yellow-500 mb-0.5`} />
        Moje obľúbené
      </MenuItem>
      {!auth.isLoading &&
        (auth.user ? (
          <LoggedInMenuItems auth={auth} />
        ) : (
          <LoggedOutMenuItems auth={auth} />
        ))}
    </>
  );
}

const MenuItem = ({ children, ...props }) => {
  const menuItemClassnames = classNames(
    'flex',
    'items-center',
    'gap-1',
    'py-2 px-3',
    'rounded-2xl',
    'hover:bg-white',
    'shadow-none',
    'hover:shadow-sm',
    'transition-all',
    'duration-100',
    'cursor-pointer',
    'whitespace-nowrap'
  );
  return (
    <li {...props} className={menuItemClassnames}>
      {children}
    </li>
  );
};


function LoggedInMenuItems({ auth }) {
  return (
    <MenuItem className="flex items-center gap-1">
      {auth.user?.email}
      <FaChevronDown />
    </MenuItem>
  );
}

function LoggedOutMenuItems({ auth }) {
  return (
    <>
      <MenuItem>
        <Link href="/prihlasenie">
          <a className="flex items-center gap-1">
            <FaSignInAlt />
            Prihlásiť sa
          </a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/registracia">
          <a className="flex items-center gap-1">
            <FaUserPlus />
            Registrovať sa
          </a>
        </Link>
      </MenuItem>
    </>
  );
}
