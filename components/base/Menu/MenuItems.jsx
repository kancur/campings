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
      <MenuLinkWrapper className="flex items-center gap-1">
        {auth.user?.email}
        <FaChevronDown className={iconclasses} />
      </MenuLinkWrapper>
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
