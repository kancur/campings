import { useRouter } from 'next/router';
import parseToURLpath from '../helper_functions/parseToURLpath';

const LocationView = (props) => {
  const router = useRouter();
  const { locationName } = router.query;

  return (
    <div>
      Hey, you visited a location with slug {locationName}
      <div>Slug: {props.data.properties.name}</div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/geo/list/');
  const data = await res.json();
  const namesArray = data.map(({properties}) => {
    const parsed = parseToURLpath(properties.name)
    return {
      params: {
        location_slug: parsed,
      },
    };
  });
  return { paths: namesArray, fallback: false };
}

export async function getStaticProps({params}) {
  const location_slug = params.location_slug
  const parsedName = location_slug.split('_').join(' ').toString();
  const encodedName = encodeURI(parsedName);

  const res = await fetch(
    `http://localhost:3000/api/geo/find/?q=${encodedName}`
  );
  const data = await res.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

export default LocationView;
