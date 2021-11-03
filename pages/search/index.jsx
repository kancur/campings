import SearchWrapper from '../../components/search/SearchWrapper';
import { useRouter } from 'next/router';
import LocationHeading from '../../components/locationPage/LocationHeading';
import { useEffect, useState } from 'react';
import { campSearch } from '../../helpers/search';
import { CampListing } from '../../components/general/CampListing';

export default function SearchPage() {
  const [results, setResults] = useState();
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    if (q && q.length >= 3) {
      campSearch(q)
        .then((res) => {
          if (res?.error) {
            console.error(res.error);
          }
          if (Array.isArray(res)) {
            if (res.length > 0) {
              setResults(res);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [q]);

  return (
    <>
      <SearchWrapper />
      <LocationHeading pretitle="Výsledky vyhľadávania pre výraz" title={q} />
      <div className="camp-listing-wrapper">
        {results &&
          results.map((camp) => <CampListing key={camp._id} camp={camp} />)}
        {!results && <div>Pre tvoje hľadanie sme nenašli žiadny kemp.😟</div>}
      </div>
    </>
  );
}
