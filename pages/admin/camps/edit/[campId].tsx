import dynamic from 'next/dynamic';
import AdminLayout from '../../../../components/admin/AdminLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FRONTEND_API_ROUTE } from '../../../../OPTIONS';
import { CampData, CampDataEdit } from '../../../../interfaces/baseInterfaces';

const EditCampPage = dynamic(() => import('../../../../components/admin/camps/new/EditOrAddCamp'), {
  ssr: false,
});

function EditCampPageComponent() {
  const [campData, setCampData] = useState<CampData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const campId = router?.query?.campId;

  useEffect(() => {
    if (campId) {
      fetch(`${FRONTEND_API_ROUTE}/camping/${campId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res;
        })
        .then((data) => data.json())
        .then((jsonData) => jsonData && setCampData(jsonData))
        .catch((error) => {
          setError(error);
          console.error(error);
        });
    }
  }, [campId]);

  // implement loader later on
  return (
    <>
      {campData && <EditCampPage campDataFetched={campData} />}
      {error && (
        <>
          <p className="text-center text-3xl p-5 font-mono text-red-500">
            ERROR: Unable to fetch data for the camp ID: {campId}
          </p>
        </>
      )}
    </>
  );
}

export default EditCampPageComponent;

EditCampPageComponent.Layout = AdminLayout;
