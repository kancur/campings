import React, { useEffect } from 'react';
import {
  FaCampground,
  FaChevronDown,
  FaSignInAlt,
  FaStar,
  FaUserPlus,
} from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import Link from 'next/link';
import classNames from 'classnames';

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
  'cursor-pointer'
);

const MenuItem = ({ children, ...props }) => (
  <li {...props} className={menuItemClassnames}>
    {children}
  </li>
);

const IconClasses = classNames('w-5 h-5');

function HeaderMenu() {
  const auth = useAuth();

  const navClasses = classNames(
    {'opacity-0': auth.isLoading},
    {'opacity-100': !auth.isLoading},
    'transition-opacity',
    'duration-75'
  )

  return (
    <>
      <div className={navClasses}>
      {!auth.isLoading ? (
        <nav>
          <ul className="flex font-semibold text-lg text-gray-600">
            <MenuItem>
              <FaCampground className={`${IconClasses} text-pink-500`} />{' '}
              Populárne kempy
            </MenuItem>
            <MenuItem>
              <FaStar
                className={`${IconClasses} w-5 h-5 text-yellow-500 mb-0.5`}
              />
              Moje obľúbené
            </MenuItem>
            {!auth.isLoading &&
              (auth.user ? (
                <LoggedInMenuItems auth={auth} />
              ) : (
                <LoggedOutMenuItems auth={auth} />
              ))}
          </ul>
        </nav>
      ) : (
        ''
      )}
      </div>
    </>
  );
}

export default HeaderMenu;

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
      <li>
        <Link href="/prihlasenie">
          <a className="flex items-center gap-1">
            <FaSignInAlt />
            Prihlásiť sa
          </a>
        </Link>
      </li>
      <li>
        <Link href="/registracia">
          <a className="flex items-center gap-1">
            <FaUserPlus />
            Registrovať sa
          </a>
        </Link>
      </li>
    </>
  );
}
