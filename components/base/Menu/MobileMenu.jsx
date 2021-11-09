import React from 'react';
import { useAuth } from '../../../context/authContext';
import {
  CommonMenuItems,
  LoggedInMenuItems,
  LoggedOutMenuItems,
} from './MenuItems';

function MobileMenu() {
  const auth = useAuth();

  return (
    <div>
      <nav className="p-2 bg-gray-50">
        <ul className="font-semibold text-gray-600 flex flex-col gap-1">
          <CommonMenuItems />
          {!auth.user && <LoggedOutMenuItems auth={auth} />}
        </ul>
      </nav>
      {auth.user && <UserInformationMobile auth={auth} />}
    </div>
  );
}

export default MobileMenu;

function UserInformationMobile({ auth }) {
  return (
    <div className="px-4">
      <div className="border-t-2 border-gray-200 py-4 text-sm text-gray-600 space-y-2">
        <div className="flex gap-2">
          <span className="font-semibold">Tvoj email:</span>
          <span className="font-mono">{auth.user.email}</span>
        </div>
        <button className="px-2 py-1 text-white font-semibold bg-red-500 hover:bg-red-400 rounded-md shadow-sm mx-auto block">Odhlásiť</button>
      </div>
    </div>
  );
}
