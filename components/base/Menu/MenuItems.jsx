import React, { useState } from 'react';
import {
  FaChartLine,
  FaUserPlus,
  FaSignInAlt,
  FaChevronDown,
  FaHeart,
} from 'react-icons/fa';
import { MenuItemWrapper } from './MenuItemWrapper';
import classNames from 'classnames';
import { DesktopMenuDropdown } from './DesktopMenuDropdown';
import OutsideClickHandler from 'react-outside-click-handler';

const iconclasses = classNames('w-5 h-5');

export function CommonMenuItems() {
  return (
    <>
      {/* <MenuLinkWrapper>
        <FaChartLine className={`${iconclasses} text-purple-500`} /> Populárne
      </MenuLinkWrapper> */}
      <MenuItemWrapper href="/chcem-navstivit">
        <FaHeart className={`${iconclasses} w-4 h-4 text-red-500`} />
        Chcem navštíviť
      </MenuItemWrapper>
    </>
  );
}



export function LoggedInMenuItems({ auth }) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  
  return (
    <>
      <div className="relative">
        <OutsideClickHandler onOutsideClick={() => setIsDropOpen(false)} >
        <MenuItemWrapper onClick={() => setIsDropOpen((prev) => !prev)} className="flex items-center gap-1">
          Môj účet
          <FaChevronDown className="w-4 h-4" />
        </MenuItemWrapper>
        <DesktopMenuDropdown auth={auth} isDropOpen={isDropOpen} />
        </OutsideClickHandler>
      </div>
    </>
  );
}

export function LoggedOutMenuItems({ auth }) {
  return (
    <>
      <MenuItemWrapper href="/prihlasenie">
        <FaSignInAlt className={iconclasses} />
        Prihlásiť sa
      </MenuItemWrapper>
      <MenuItemWrapper href="/registracia">
        <FaUserPlus className={iconclasses} />
        Registrovať sa
      </MenuItemWrapper>
    </>
  );
}
