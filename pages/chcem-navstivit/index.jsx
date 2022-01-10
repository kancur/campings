import classNames from 'classnames';
import React from 'react';
import { useFavoriteCamps } from '../../context/favoriteCampsContext';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import PopularDestinations from '../../components/base/Popular/PopularDestinations';
import Image from 'next/image';
import { STATIC_HOST } from '../../OPTIONS';

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
  };

  return (
    <div>
      <h1 className="text-xl text-center p-4 text-white bg-emerald-500 font-semibold">
        Kempy ktoré plánujem navštíviť
      </h1>
      {favorite.camps.length === 0 && (
        <div className="p-4 flex flex-col items-center gap-4">
          <p className="text-lg p-4 text-center text-pink-500">
            Zatiaľ nemáš pridané žiadne obľúbené kempy.
          </p>
          <h2 className="text-2xl">
            Nájdi kemp v niektorých z obľúbených lokalít:
          </h2>
          <PopularDestinations />
        </div>
      )}
      <ul className="p-2 divide-y divide-gray-300 max-w-3xl mx-auto">
        {favorite.camps.map(({ camp }) => {
          const featuredImageSrc = camp.featured_image;

          return (
            <li key={camp._id} className={listItemStyle}>
              <div className="flex gap-4">
                <div className="col-span-1 relative">
                  <div className="w-24 h-24">
                    <Image
                      src={
                        featuredImageSrc
                          ? `${STATIC_HOST}/${featuredImageSrc}`
                          : '/camp_placeholder.png'
                      }
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>

                <div className="flex flex-grow items-center">
                  <Link href={`kemp/${camp.slug}`}>
                    <a>
                      <h2 className="">{camp.name}</h2>
                    </a>
                  </Link>
                </div>
                <div className="flex items-center p-2">
                  <FaTrash
                    onClick={() => handleDelete(camp._id)}
                    className="w-5 h-5 text-red-500"
                  />
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
