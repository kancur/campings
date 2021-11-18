import Image from 'next/image';
import React, { useState } from 'react';
import { FiCrosshair } from 'react-icons/fi';

const SIZE_MULTIPLIER = 0.1;

const testCoords = [
  {
    lat: 49.092540418409406,
    lon: 19.58358797023151,
  },
  {
    lat: 48.064507660398505,
    lon: 17.17280150297176,
  },
  {
    lat: 49.613779270388235,
    lon: 19.44844326884067,
  },
  {
    lat: 49.08740106561592,
    lon: 22.565793659101345,
  },
  {
    lat: 48.3805929863123,
    lon: 16.833258596479702,
  },
  {
    lat: 48.572355485744495,
    lon: 19.131136112801542,
  },
  {
    lat: 47.7342806652939,
    lon: 18.290097174996074,
  },
];


function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}

function MapWithPinPoints({ coords }) {
  const height = 1328 * SIZE_MULTIPLIER;
  const width = 2796 * SIZE_MULTIPLIER;

  const constraints = {
    west: 16.833247270788636,
    east: 22.56553492155819,
    north: 49.613779270388235,
    south: 47.7314465886913,
  };
  const lonWidth = constraints.east - constraints.west;
  const latHeight = constraints.north - constraints.south;

  function getXY(coords) {
    const image_x = (width * (coords.lon - constraints.west)) / lonWidth;

    //const latRad = deg2rad(coords.lat);
    //const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    //console.log('mercn -->', mercN)
    //const image_y = (height / 2) - ( height*mercN/(2*Math.PI));
    const image_y = height * (1 - (coords.lat - constraints.south) / latHeight);

    return [image_x, image_y];
  }

  /* // convert from degrees to radians
  var latRad = (coords.lat * Math.PI) / 180;
  // get y value
  var mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const image_y = height / 2 - (width * mercN) / (2 * Math.PI);
 */
  /* const latRad = deg2rad(coords.lat)
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const image_y = (height/2)-(width*mercN/(2*Math.PI));
 */


  const mapStyles = {
    height: `${height}px`,
    width: `${width}px`,
  };

  return (
    <div className="relative" style={mapStyles}>
      <Image src="/slovakia-map.png" layout="fill" />
      {coords.map((coordinates, index) => {
        const [image_x, image_y] = getXY(coordinates);
        const pinpointStyles = {
          left: `${image_x}px`,
          top: `${image_y}px`,
          color: 'red',
        };
        return (
          <div key={index} className="absolute" style={pinpointStyles}>
            <div className="absolute -top-3 -left-3">
              <FiCrosshair className="w-6 h-6 text-red-500 animate-pulse" />
              </div>
          </div>
        );
      })}
    </div>
  );
}

export default MapWithPinPoints;
