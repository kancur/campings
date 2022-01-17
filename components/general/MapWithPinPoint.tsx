import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FiCrosshair } from 'react-icons/fi';
import { useMeasure } from 'react-use';
import { Coords } from '../../interfaces/baseInterfaces';

/**
 * Slovakia Bounding Box Constraints
 */
const SLOVAKIA_BBOX = {
  west: 16.833247270788636,
  east: 22.56553492155819,
  north: 49.613779270388235,
  south: 47.7314465886913,
};

type MapWithPinPointProps = {
  /**
   * Array of coordinates (can display multiple pins on the map)
   */
  coords: Coords[];
  className?: string;
};

/**
 * Returns a map of slovakia with pins on the map.
 */
function MapWithPinPoints({ coords, className, ...props }: MapWithPinPointProps & React.HTMLAttributes<HTMLDivElement>) {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const height = width / 2.10542168675;
    setHeight(height);
  }, [width]);

  const lonWidth = SLOVAKIA_BBOX.east - SLOVAKIA_BBOX.west;
  const latHeight = SLOVAKIA_BBOX.north - SLOVAKIA_BBOX.south;

  /**
   * Get X and Y image coordinates from longitude and latitude
   */
  function getXY(coords: Coords): [number, number] {
    const image_x = (width * (coords.lon - SLOVAKIA_BBOX.west)) / lonWidth;

    //const latRad = deg2rad(coords.lat);
    //const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    //console.log('mercn -->', mercN)
    //const image_y = (height / 2) - ( height*mercN/(2*Math.PI));
    const image_y = height * (1 - (coords.lat - SLOVAKIA_BBOX.south) / latHeight);

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
    width: '100%',
  };

  return (
    <div
      {...props}
      ref={ref}
      className={'relative filter drop-shadow-md ' + (className || '')}
      style={mapStyles}
    >
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
