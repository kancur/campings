import SearchWrapper from '../../components/search/SearchWrapper';
import { useRouter } from 'next/router';
import LocationHeading from '../../components/locationPage/LocationHeading';
import { useEffect, useState } from 'react';
import { campSearch } from '../../helpers/search';
import { CampListing } from '../../components/general/CampListing';
import LoaderJumpingTents from '../../components/general/LoaderJumpingTents';
import { CampData } from '../../interfaces/baseInterfaces';

export default function SearchPage() {
  const [results, setResults] = useState<CampData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const router = useRouter();

  const { q } = router.query;

  let query: string = '';

  if (Array.isArray(q)) {
    query = q[0];
  } else {
    if (q !== undefined) {
      query = q;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setResults([]);
    if (query && query.length >= 3) {
      campSearch(query)
        .then((res) => {
          if (Array.isArray(res)) {
            setIsLoading(false);
            if (res.length > 0) {
              setResults(res);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setError(err);
        });
    }
  }, [query]);

  return (
    <>
      <SearchWrapper />
      <LocationHeading pretitle="Výsledky vyhľadávania pre výraz" title={query} />
      <div className="camp-listing-wrapper h-full w-full">
        {isLoading && <LoaderJumpingTents className="my-auto" />}

        {results.length > 0 && results.map((camp: CampData) => <CampListing key={camp._id} camp={camp} />)}

        {results.length === 0 && !isLoading && (
          <p className="mx-auto m-4 text-base sm:text-lg">
            Pre tvoju frázu sme nenašli žiadny kemp.😟
          </p>
        )}

        {error && <p>Pri vyhľadávaní došlo k chybe. 😟</p>}
      </div>
    </>
  );
}
