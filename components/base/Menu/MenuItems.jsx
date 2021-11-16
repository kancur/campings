import React from 'react';
import {
  FaChartLine,
  FaStar,
  FaUserPlus,
  FaSignInAlt,
  FaChevronDown,
} from 'react-icons/fa';
import { MenuLinkWrapper } from './MenuItemWrapper';
import Link from 'next/link';
import classNames from 'classnames';
import { Dropdown } from '../../general/SearchSuggestionsDropdown';

const iconclasses = classNames('w-5 h-5');

export function CommonMenuItems() {
  return (
    <>
      <MenuLinkWrapper>
        <FaChartLine className={`${iconclasses} text-purple-500`} /> Populárne
      </MenuLinkWrapper>
      <MenuLinkWrapper>
        <FaStar className={`${iconclasses} w-5 h-5 text-yellow-500 mb-0.5`} />
        Moje obľúbené
      </MenuLinkWrapper>
    </>
  );
}

export function LoggedInMenuItems({ auth }) {
  return (
    <>
      <div className="relative">
        <MenuLinkWrapper className="flex items-center gap-1">
          {auth.user?.email}
          <FaChevronDown className="w-4 h-4" />
        </MenuLinkWrapper>

        <div
          role="menu"
          className="absolute mt-2 bg-gray-50 border border-gray-100 p-2 shadow-md rounded-md w-52 text-gray-600 z-20 left-2/4 -translate-x-2/4"
        >
          <button
            onClick={auth.logout}
            className="px-2 py-1 text-white font-semibold bg-red-500 hover:bg-red-400 rounded-md shadow-sm mx-auto block"
          >
            Odhlásiť
          </button>
        </div>
      </div>
    </>
  );
}

export function LoggedOutMenuItems({ auth }) {
  return (
    <>
      <MenuLinkWrapper href="/prihlasenie">
        <FaSignInAlt className={iconclasses} />
        Prihlásiť sa
      </MenuLinkWrapper>
      <MenuLinkWrapper href="/registracia">
        <FaUserPlus className={iconclasses} />
        Registrovať sa
      </MenuLinkWrapper>
    </>
  );
}
