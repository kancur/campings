import React from 'react';
import Image from 'next/image';
//import background from '../../public/media/trusalova.jpg';
import background from '../../public/media/trusalova.jpg';
import SearchBar from './SearchBar';

export default function SearchWrapper() {
  return (
    <>
      <div /* style={{backgroundImage: `url(/media/bonfire.jpg)`}} */ className="p-12 bg-gray-400">
        <div className="text-center flex justify-center">
          <SearchBar />
        </div>
      </div>
    </>
  );
}
