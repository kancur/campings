import React from 'react';
import { FaChartLine, FaStar, FaUserPlus, FaSignInAlt, FaChevronDown } from 'react-icons/fa';
import { MenuItemWrapper } from './MenuItemWrapper';
import Link from 'next/link';
import classNames from 'classnames';

const iconclasses = classNames('w-5 h-5');

export function CommonMenuItems() {
  return (
    <>
      <MenuItemWrapper>
        <FaChartLine className={`${iconclasses} text-purple-500`} /> Populárne
      </MenuItemWrapper>
      <MenuItemWrapper>
        <FaStar className={`${iconclasses} w-5 h-5 text-yellow-500 mb-0.5`} />
        Moje obľúbené
      </MenuItemWrapper>
    </>
  );
}

export function LoggedInMenuItems({ auth }) {
  return (
    <>
      <MenuItemWrapper className="flex items-center gap-1">
        {auth.user?.email}
        <FaChevronDown className={iconclasses} />
      </MenuItemWrapper>
      {/*       <MenuItemWrapper>
              <button type="button" className="flex items-center gap-1">
                <FaSignOutAlt className={iconclasses} />
                Odhlásiť
              </button>
            </MenuItemWrapper> */}
    </>
  );
}

export function LoggedOutMenuItems({ auth }) {
  return (
    <>
      <MenuItemWrapper>
        <Link href="/prihlasenie">
          <a className="flex items-center gap-1 text-gray-600">
            <FaSignInAlt className={iconclasses} />
            Prihlásiť sa
          </a>
        </Link>
      </MenuItemWrapper>
      <MenuItemWrapper>
        <Link href="/registracia">
          <a className="flex items-center gap-1 text-gray-600">
            <FaUserPlus className={iconclasses} />
            Registrovať sa
          </a>
        </Link>
      </MenuItemWrapper>
    </>
  );
}
