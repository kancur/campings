import React, { useState } from 'react';
import Image from 'next/image';
import background from '../../public/media/trusalova.jpg';
import SearchForm from './SearchForm';
import PopularLocations from './PopularLocations';

export default function Search() {

  return (
    <>
      <div /* style={{backgroundImage: `url(/media/bonfire.jpg)`}} */ className="p-6 bg-green-500">
        <div className="text-center flex flex-col items-center justify-center space-y-5">
          <SearchForm />          {/* <PopularLocations /> */}
        </div>
      </div>
    </>
  );
}
