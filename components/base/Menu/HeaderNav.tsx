import React, { Dispatch, SetStateAction } from 'react';
import { useAuth } from '../../../context/authContext';
import classNames from 'classnames';
import { FaBars } from 'react-icons/fa';
import { CommonMenuItems, LoggedInMenuItems, LoggedOutMenuItems } from './MenuItems';
import { useRouter } from 'next/router';

export default function HeaderNav({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const auth = useAuth();

  const handleLogOut = () => {
    auth.logout();
    router.push('/dovidenia');
  };

  const navClasses = classNames(
    { 'opacity-0': auth.isLoading },
    { 'opacity-100': !auth.isLoading },
    'transition-opacity',
    'duration-100',
    'self-center'
  );

  return (
    <div className={navClasses}>
      {!auth.isLoading && (
        <>
          <nav className="hidden sm:flex text-gray-600">
            <ul className="flex">
              <CommonMenuItems />
              {auth.user ? <LoggedInMenuItems auth={auth} /> : <LoggedOutMenuItems />}
            </ul>
          </nav>
          <FaBars
            onClick={() => setIsMobileMenuOpen((prev: boolean) => !prev)}
            className="w-6 h-6 text-gray-500 flex sm:hidden"
          />
        </>
      )}
    </div>
  );
}
