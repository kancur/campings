import { useEffect, useState } from 'react';
import { Input } from '../Input';
import { inputClasses } from '../EditOrAddCamp';

export function InputCoords({ mergeCoords, fetchedCoords }) {
  const [coords, setCoords] = useState();
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (fetchedCoords) {
      setCoords(coordsToString(fetchedCoords));
    }
  }, [fetchedCoords]);

  const coordsToString = ({ lat, lon }) => [lat, lon].join(', ');

  const isLatitude = (lat) =>
    lat !== undefined && lat.length > 0 && isFinite(lat) && Math.abs(lat) <= 90;
  const isLongitude = (lon) =>
    lon !== undefined && lon.length > 0 && isFinite(lon) && Math.abs(lon) <= 180;

  const handleCoordsInput = (e) => {
    setCoords(e.target.value);
    try {
      const raw = e.target.value;
      const removedWhitespace = raw.replace(/\s/g, '');
      const [lat, lon] = removedWhitespace.split(',');
      console.log('lat', lat, 'lon', lon);
      if (!isLatitude(lat)) {
        throw new Error('invalid latitude');
      }
      if (!isLongitude(lon)) {
        throw new Error('invalid longitude');
      }
      mergeCoords({ lat, lon });
      setIsInvalid(false);
    } catch (error) {
      console.log(error.message);
      setIsInvalid(true);
    }
  };

  return (
    <Input
      onInput={handleCoordsInput}
      type="text"
      id="coords"
      name="coords"
      className={`${inputClasses} `}
      placeholder="49.140164025449074, 19.05241555840758"
      value={coords}
      invalid={isInvalid && coords?.length > 0}
      valid={!isInvalid && coords?.length > 0}
    />
  );
}
