import React from 'react';
import { useAuth } from '../../../context/authContext';
import classNames from 'classnames';
import MenuItems from './MenuItems';
import { BurgerMenu } from './BurgerMenu';
import { FaBars } from 'react-icons/fa';

export default function HeaderMenu({setIsMobileMenuOpen}) {
  const auth = useAuth();

  const navClasses = classNames(
    { 'opacity-0': auth.isLoading },
    { 'opacity-100': !auth.isLoading },
    'transition-opacity',
    'duration-100',
    'self-center'
  );

  return (
    <>
      <div className={navClasses}>
        {!auth.isLoading ? (
          <nav>
            <ul className="font-semibold text-gray-600 hidden sm:flex">
              <MenuItems auth={auth} />
            </ul>
              <FaBars onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="w-6 h-6 block text-gray-600 sm:hidden" />
          </nav>
        ) : (
          ''
        )}
      </div>
    </>
  );
}


