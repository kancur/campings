import React from 'react';
import { useTransition, animated } from 'react-spring';
import Link from 'next/link';
import classNames from 'classnames';
import { AuthContext } from '../../../interfaces/baseInterfaces';

export function DesktopMenuDropdown({ auth, isDropOpen }: { auth: AuthContext, isDropOpen: boolean }) {
  const transitions = useTransition(isDropOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isDropOpen,
    delay: 100,
  });

  const listItemStyle = classNames('p-2');

  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <div
            role="menu"
            className="absolute mt-2 bg-white border border-gray-100 p-3 shadow-md rounded-md w-56 text-gray-600 z-20 -right-4 space-y-2 divide-y divide-gray-400"
          >
            <div>
              <p className="text-center text-sm font-semibold">Tvoj email:</p>
              <p className="text-center text-sm">{auth.user?.email}</p>
            </div>
            <ul>
              {auth.user?.is_admin && (
                <li className={listItemStyle}>
                  <Link href="/admin">Administrácia</Link>
                </li>
              )}
            </ul>
            <button
              onClick={auth.logout}
              className="px-2 py-1 text-white font-semibold bg-red-500 hover:bg-red-400 rounded-md shadow-sm mx-auto block"
            >
              Odhlásiť
            </button>
          </div>
        </animated.div>
      )
  );
}
