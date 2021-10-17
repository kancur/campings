import { useRouter } from 'next/router';
import Main from '../../components/Main';
import Search from '../../components/search/Search';
import LocationHeading from '../../components/locationPage/LocationHeading';

const VillagePage = ({ data }) => {
  const router = useRouter();
  const { locationName } = router.query;

  return (
    <>
      <Search />
      <Main>
        <LocationHeading pretitle="Skvelé kempy v obci" title={data.name} />
        Hey, you visited a location with slug {locationName}
        <div>Slug: {data.name}</div>
      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/village/list/');
  const data = await res.json();
  const namesArray = data.map(({ slug }) => {
    return {
      params: {
        village_slug: slug,
      },
    };
  });
  return { paths: namesArray, fallback: false };
}

export async function getStaticProps({ params }) {
  const village_slug = params.village_slug;
  const encodedName = encodeURI(village_slug);

  const res = await fetch(`http://localhost:3000/api/village/slug/${encodedName}`);
  const data = await res.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

export default VillagePage;
