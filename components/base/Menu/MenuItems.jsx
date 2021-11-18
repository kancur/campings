import React, { useState } from 'react';
import {
  FaChartLine,
  FaStar,
  FaUserPlus,
  FaSignInAlt,
  FaChevronDown,
} from 'react-icons/fa';
import { MenuLinkWrapper } from './MenuItemWrapper';
import classNames from 'classnames';
import { DesktopMenuDropdown } from './DesktopMenuDropdown';
import OutsideClickHandler from 'react-outside-click-handler';

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
  const [isDropOpen, setIsDropOpen] = useState(false);
  
  return (
    <>
      <div className="relative">
        <OutsideClickHandler onOutsideClick={() => setIsDropOpen(false)} >
        <MenuLinkWrapper onClick={() => setIsDropOpen((prev) => !prev)} className="flex items-center gap-1">
          Môj účet
          <FaChevronDown className="w-4 h-4" />
        </MenuLinkWrapper>
        <DesktopMenuDropdown auth={auth} isDropOpen={isDropOpen} />
        </OutsideClickHandler>
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
