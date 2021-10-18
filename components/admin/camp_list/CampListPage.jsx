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
      console.log('error', error);
    }
  }, []);

  return (
    <div className="p-6">{campData && <CampTable camps={campData} />}</div>
  );
}
