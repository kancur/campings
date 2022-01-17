import { useEffect, useState } from 'react';
import { CampWithVillages } from '../../../interfaces/baseInterfaces';
import CampTable from './CampTable';

export default function CampListPage() {
  const [campData, setCampData] = useState<CampWithVillages[]>();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_API_ROUTE}/camping/list/`);
        const json = await res.json();
        setCampData(json);
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, []);

  return <div className="p-6">{campData && <CampTable camps={campData} />}</div>;
}
