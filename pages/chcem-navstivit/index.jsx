import classNames from 'classnames';
import React from 'react';
import { useFavoriteCamps } from '../../context/favoriteCampsContext';

function index() {
  const favorite = useFavoriteCamps();

  const listItemStyle = classNames(
    'bg-gray-50',
    'shadow-md',
    'px-2',
    'py-1',
    'rounded-md',
    'border',
    'border-gray-100',
    'text-gray-700'
  );

  return (
    <div>
      <h1 className="text-xl text-center p-4 text-white bg-green-500 font-semibold">
        Kempy ktoré plánujem navštíviť
      </h1>
      <ul className="p-2 space-y-1">
        {favorite.camps.map((camp) => {
          return <li key={camp._id} className={listItemStyle}>{camp.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default index;
