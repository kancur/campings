import Image from 'next/image';
import React, { useState } from 'react';

const SIZE_MULTIPLIER = 0.2;

function deg2rad(degrees){
  return degrees * (Math.PI/180);
}

function MapWithPinPoint({coords}) {
  const height = 1328 * SIZE_MULTIPLIER;
  const width = 2796 * SIZE_MULTIPLIER;
  
  const coordsInRadians = Object.keys(coords).map((degrees) => deg2rad(degrees))
  //console.log(coordsInRadians)

  const constraints = {
    west: 16.833247270788636,
    east: 22.56553492155819,
    north: 49.613779270388235,
    south: 47.7314465886913,
  }
  const lonWidth = constraints.east - constraints.west
  const latHeight = constraints.north - constraints.south

  console.log(constraints)

  console.log('lon', coords.lon)
  console.log('width', width)
  console.log('constraints.east - constraints.west', constraints.east - constraints.west)

  const image_x = width * (coords.lon - constraints.west) / lonWidth;
  const image_y = height * (1 - (coords.lat - constraints.south) / latHeight);

  /* const latRad = deg2rad(coords.lat)
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const image_y = (height/2)-(width*mercN/(2*Math.PI));
 */
  console.log(image_x, image_y)

  const pinpointStyles = {
    left: `${image_x}px`,
    top: `${image_y}px`,
    color: 'red',
  }

  const mapStyles = {
    height: `${height}px`,
    width: `${width}px`,
  };

  return (
    <div className="relative" style={mapStyles}>
      <Image src="/slovakia-map.jpg" layout="fill" />
      <div className="absolute w-0.5 h-0.5 bg-pink-500" style={pinpointStyles}></div>
    </div>
  );
}

export default MapWithPinPoint;
