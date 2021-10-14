import React from 'react';
import Image from 'next/image';
//import background from '../../public/media/trusalova.jpg';
import background from '../../public/media/trusalova.jpg';
import SearchBar from './SearchBar';
import PopularLocations from './PopularLocations';

export default function SearchWrapper() {
  return (
    <>
      <div /* style={{backgroundImage: `url(/media/bonfire.jpg)`}} */ className="p-6 bg-gray-400">
        <div className="text-center flex flex-col items-center justify-center space-y-5">
          <SearchBar />
          {/* <PopularLocations /> */}
        </div>
      </div>
    </>
  );
}
