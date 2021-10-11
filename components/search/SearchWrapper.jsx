import React from 'react';
import Image from 'next/image';
//import background from '../../public/media/trusalova.jpg';
import background from '../../public/media/trusalova.jpg';

export default function SearchWrapper(props) {
  return (
    <>
      <div /* style={{backgroundImage: `url(/media/bonfire.jpg)`}} */ className="p-12 bg-gray-400">
        {/* <Image src={background} /> */}
        <div className="text-center flex justify-center">{props.children}</div>
      </div>
    </>
  );
}
