import React, { useState } from 'react';
import { FaUserPlus, FaSignInAlt, FaChevronDown, FaHeart } from 'react-icons/fa';
import { MenuItemWrapper } from './MenuItemWrapper';
import classNames from 'classnames';
import { DesktopMenuDropdown } from './DesktopMenuDropdown';
import OutsideClickHandler from 'react-outside-click-handler';
import { AuthContext } from '../../../interfaces/baseInterfaces';

const iconClasses = classNames('w-5 h-5');

export function CommonMenuItems() {
  return (
    <MenuItemWrapper href="/chcem-navstivit">
      <FaHeart className={`${iconClasses} w-4 h-4 text-red-500`} />
      Chcem navštíviť
    </MenuItemWrapper>
  );
}

export function LoggedInMenuItems({ auth }: { auth: AuthContext }) {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <div className="relative">
      <OutsideClickHandler onOutsideClick={() => setIsDropOpen(false)}>
        <MenuItemWrapper
          onClick={() => setIsDropOpen((prev) => !prev)}
          className="flex items-center gap-1"
        >
          Môj účet
          <FaChevronDown className="w-4 h-4" />
        </MenuItemWrapper>
        <DesktopMenuDropdown auth={auth} isDropOpen={isDropOpen} />
      </OutsideClickHandler>
    </div>
  );
}

export function LoggedOutMenuItems() {
  return (
    <>
      <MenuItemWrapper href="/prihlasenie">
        <FaSignInAlt className={iconClasses} />
        Prihlásiť sa
      </MenuItemWrapper>
      <MenuItemWrapper href="/registracia">
        <FaUserPlus className={iconClasses} />
        Registrovať sa
      </MenuItemWrapper>
    </>
  );
}
