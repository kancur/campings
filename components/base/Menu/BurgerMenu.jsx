import React, { useState } from 'react';
import classNames from 'classnames';
import MenuItems from './MenuItems';
import { useAuth } from '../../../context/authContext';

export function BurgerMenu() {
  const auth = useAuth();

  const burgerClassnames = classNames(
    'bg-white',
    'p-4',
  );

  return (
      <div className={burgerClassnames}>
        <MenuItems auth={auth} />
      </div>
  );
}
