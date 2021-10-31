import { useRouter } from 'next/router';
import Main from '../components/base/Main';
import Search from '../components/search/Search';
import LocationHeading from '../components/locationPage/LocationHeading';
import { BACKEND_HOST } from '../OPTIONS';

const LocationPage = ({ data }) => {
  const router = useRouter();
  const { locationName } = router.query;

  return (
    <>
      <Search />
      <Main>
        <LocationHeading pretitle="Skvelé kempy v lokalite" title={data.properties.name} />
        Hey, you visited a location with slug {locationName}
        <div>Slug: {data.properties.name}</div>
      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${BACKEND_HOST}/api/geo/list/`);
  const data = await res.json();
  const namesArray = data.map(({ slug }) => {
    return {
      params: {
        location_slug: slug,
      },
    };
  });
  return { paths: namesArray, fallback: false };
}

export async function getStaticProps({ params }) {
  const location_slug = params.location_slug;
  const encodedName = encodeURI(location_slug);

  const res = await fetch(`${BACKEND_HOST}/api/geo/slug/${encodedName}`);
  const data = await res.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

export default LocationPage;
