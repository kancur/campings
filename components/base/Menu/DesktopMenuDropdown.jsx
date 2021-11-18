import React from 'react';
import { useTransition, animated } from 'react-spring';

export function DesktopMenuDropdown({ auth, isDropOpen }) {
  const transitions = useTransition(isDropOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isDropOpen,
    delay: 100,

  });

  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <div
            role="menu"
            className="absolute mt-2 bg-white border border-gray-100 p-3 shadow-md rounded-md w-56 text-gray-600 z-20 -right-4 text-center space-y-2"
          >
            <p>{auth.user?.email}</p>
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
