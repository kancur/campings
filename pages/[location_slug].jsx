import { useRouter } from 'next/router';
import Main from '../components/Main';
import Search from '../components/search/Search';
import LocationHeading from '../components/locationPage/LocationHeading';

const LocationView = ({ data }) => {
  const router = useRouter();
  const { locationName } = router.query;

  return (
    <>
      <Search />
      <Main>
        <LocationHeading title={data.properties.name} />
        Hey, you visited a location with slug {locationName}
        <div>Slug: {data.properties.name}</div>
      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/geo/list/');
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

  const res = await fetch(`http://localhost:3000/api/geo/slug/${encodedName}`);
  const data = await res.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

export default LocationView;
