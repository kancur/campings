import { useEffect, useState } from 'react';
import { Input, inputClasses } from '../../../../general/Input';
import { FRONTEND_API_ROUTE } from '../../../../../OPTIONS';

export function InputCoords({ mergeCoords, fetchedCoords }) {
  const [coords, setCoords] = useState('');
  const [coordsObj, setCoordsObj] = useState();
  const [isValid, setIsValid] = useState(true);
  const [closestVillage, setClosestVillage] = useState();

  function fetchClosestVillage(controller) {
    const params = {
      ...coordsObj,
      limit: 1,
    };
    const searchParams = new URLSearchParams(params);
    fetch(`${FRONTEND_API_ROUTE}/village/close/?${searchParams.toString()}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => setClosestVillage(json[0]))
      .then(() => (controller = null))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (isValid && coordsObj) {
      let controller = new AbortController();
      fetchClosestVillage(controller);
      return () => controller?.abort();
    }
  }, [coordsObj, isValid]);

  useEffect(() => {
    if (fetchedCoords) {
      setCoords(coordsToString(fetchedCoords));
      setCoordsObj(fetchedCoords);
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
      const coordsObj = {lat: Number(lat), lon: Number(lon)}
      setCoordsObj(coordsObj);
      if (!isLatitude(lat)) {
        throw new Error('invalid latitude');
      }
      if (!isLongitude(lon)) {
        throw new Error('invalid longitude');
      }
      setIsValid(true);
      e.target.setCustomValidity('')
      mergeCoords(coordsObj);
    } catch (error) {
      console.log(error.message);
      e.target.setCustomValidity(error.message)
      setIsValid(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Input
        required
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
      {closestVillage && (
        <p className="text-gray-500">Closest village: {closestVillage?.name}</p>
      )}
    </div>
  );
}
