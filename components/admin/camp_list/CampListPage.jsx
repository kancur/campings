import { useEffect, useState } from 'react';
import CampTable from './CampTable';
import { DB_HOST } from '../SETTINGS';

export default function CampListPage() {
  const [campData, setCampData] = useState();

  useEffect(async () => {
    try {
      const res = await fetch(`${DB_HOST}/api/camping/list/`);
      const json = await res.json();
      setCampData(json);
    } catch (error) {
      console.log('error', error)
    }
  }, []);

  useEffect(() => {
    console.log('campdata',campData);
  }, [campData]);

  return (
    <div>
      <div>
        <h2 className="text-center text-3xl font-semibold text-gray-600 p-4">All campings</h2>
      </div>
      <div className="px-4">
      {campData && <CampTable camps={campData} />}
      </div>
    </div>
  );
}
