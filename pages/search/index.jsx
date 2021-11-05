import SearchWrapper from '../../components/search/SearchWrapper';
import { useRouter } from 'next/router';
import LocationHeading from '../../components/locationPage/LocationHeading';
import { useEffect, useState } from 'react';
import { campSearch } from '../../helpers/search';
import { CampListing } from '../../components/general/CampListing';
import { ImSpinner, ImSpinner2 } from 'react-icons/im';
import LoaderJumpingTents from '../../components/general/LoaderJumpingTents';

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    setIsLoading(true);
    setResults([]);
    if (q && q.length >= 3) {
      campSearch(q)
        .then((res) => {
          if (res?.error) {
            setIsLoading(false);
            console.error(res.error);
          }
          if (Array.isArray(res)) {
            setIsLoading(false);
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
      <div className="camp-listing-wrapper h-full w-full">
        {isLoading && <LoaderJumpingTents className="my-auto" />}

        {results.length > 0 &&
          results.map((camp) => <CampListing key={camp._id} camp={camp} />)}

        {results.length === 0 && !isLoading && (
          <p className="mx-auto m-4 text-base sm:text-lg">Pre tvoju frázu sme nenašli žiadny kemp.😟</p>
        )}

        {error && <p>Pri vyhľadávaní došlo k chybe. 😟</p>}
      </div>
    </>
  );
}
