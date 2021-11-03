import React, { useState } from 'react';
import SearchForm from './SearchForm';

// https://depositphotos.com/stock-photos/spruce-forest.html?filter=all&qview=50904623

export default function Search() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(/media/bg3.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPositionY: 'center',
        }}
        className="p-6"
      >
        <div className="text-center flex flex-col items-center justify-center py-16">
          <SearchForm /> 
        </div>
      </div>
    </>
  );
}