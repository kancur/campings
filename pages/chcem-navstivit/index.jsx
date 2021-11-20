import classNames from 'classnames';
import React from 'react';
import { useFavoriteCamps } from '../../context/favoriteCampsContext';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';

function index() {
  const favorite = useFavoriteCamps();

  const listItemStyle = classNames(
    /*     'bg-gray-50',
    'shadow-md',
    'px-3',
    'py-2',
    'rounded-lg',
    'border',
    'border-gray-100', */
    'text-gray-700',
    'py-2'
  );

  const handleDelete = (id) => {
    favorite.delete(id);
  }

  return (
    <div>
      <h1 className="text-xl text-center p-4 text-white bg-green-500 font-semibold">
        Kempy ktoré plánujem navštíviť
      </h1>
      <ul className="p-2 divide-y divide-gray-300 max-w-md mx-auto">
        {favorite.camps.map(({camp}) => {
          return (
            <li key={camp._id} className={listItemStyle}>
              <div className="flex">
                <div className="flex flex-grow items-center">
                  <Link href={`kemp/${camp.slug}`}>
                    <a>
                      <h2 className="">{camp.name}</h2>
                    </a>
                  </Link>
                </div>
                <div className="flex items-center p-2">
                  <FaTrash onClick={() => handleDelete(camp._id)} className="w-5 h-5 text-red-500"/>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default index;
