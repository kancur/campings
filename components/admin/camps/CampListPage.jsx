import { useEffect, useState } from 'react';
import CampTable from './CampTable';
const { FRONTEND_API_ROUTE } = require('../../../OPTIONS')

export default function CampListPage() {
  const [campData, setCampData] = useState();

  useEffect(async () => {
    try {
      const res = await fetch(`${FRONTEND_API_ROUTE}/camping/list/`);
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
