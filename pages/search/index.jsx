import Search from '../../components/search/Search';
import { useRouter } from 'next/router';
import LocationHeading from '../../components/locationPage/LocationHeading';

export default function SearchPage() {
  const router = useRouter();
  const {q} = router.query
  return (
    <>
      <Search />
      <LocationHeading
          pretitle="Výsledky vyhľadávania pre výraz"
          title={q}
        />
    </>
  );
}
