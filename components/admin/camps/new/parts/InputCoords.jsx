import { useEffect, useState } from 'react';
import { Input } from '../Input';
import { inputClasses } from '../EditOrAddCamp';
import { DB_HOST } from '../../../../../OPTIONS';

export function InputCoords({ mergeCoords, fetchedCoords }) {
  const [coords, setCoords] = useState('');
  const [coordsObj, setCoordsObj] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [closestVillage, setClosestVillage] = useState({});

  function fetchClosestVillage() {
    const params = {
      ...coordsObj,
      limit: 1,
    };
    const searchParams = new URLSearchParams(params);
    fetch(`${DB_HOST}/api/village/close/?${searchParams.toString()}`)
      .then((res) => res.json())
      .then((json) => setClosestVillage(json[0]));
  }

  useEffect(() => {
    if (isValid && coordsObj) {
      fetchClosestVillage()
    }
  }, [coordsObj, isValid]);

  useEffect(() => {
    if (fetchedCoords) {
      setCoords(coordsToString(fetchedCoords));
      setCoordsObj(fetchedCoords)
    }
  }, [fetchedCoords]);

  const coordsToString = ({ lat, lon }) => [lat, lon].join(', ');

  const isLatitude = (lat) =>
    lat !== undefined && lat.length > 0 && isFinite(lat) && Math.abs(lat) <= 90;
  const isLongitude = (lon) =>
    lon !== undefined &&
    lon.length > 0 &&
    isFinite(lon) &&
    Math.abs(lon) <= 180;

  const handleCoordsInput = (e) => {
    setCoords(e.target.value);
    try {
      const raw = e.target.value;
      const removedWhitespace = raw.replace(/\s/g, '');
      const [lat, lon] = removedWhitespace.split(',');
      setCoordsObj({ lat, lon });
      if (!isLatitude(lat)) {
        throw new Error('invalid latitude');
      }
      if (!isLongitude(lon)) {
        throw new Error('invalid longitude');
      }
      setIsValid(true);
      mergeCoords({ lat, lon });
    } catch (error) {
      console.log(error.message);
      setIsValid(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Input
        onInput={handleCoordsInput}
        type="text"
        id="coords"
        name="coords"
        className={`${inputClasses} `}
        placeholder="49.140164025449074, 19.05241555840758"
        value={coords}
        invalid={!isValid && coords?.length > 0}
        valid={isValid && coords?.length > 0}
      />
      <p><span className="font-semibold">Closest village:</span> {closestVillage?.name}</p>
    </div>
  );
}
