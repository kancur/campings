import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function PopularDestinationCard({ destination }) {
  return (
    <div className="rounded-xl shadow-md hover:scale-101 hover:shadow-lg transition-all ease-in-out duration-300">
      <Link href={destination.slug}>
        <a>
          <div className="relative">
            <div key={destination.slug} className="w-60 h-60">
              <Image
                src={destination.featured || '/camp_placeholder.png'}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <div className="z-20 absolute bottom-4 bg-gray-900/40 w-full p-2">
                <h2 className="pl-2 text-3xl font-semibold text-gray-50  drop-shadow-sm ">
                  {destination.name}
                </h2>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default PopularDestinationCard;
