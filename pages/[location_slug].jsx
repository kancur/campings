import { useRouter } from 'next/router';
import Main from '../components/base/Main';
import Search from '../components/search/SearchWrapper';
import LocationHeading from '../components/locationPage/LocationHeading';
import { BACKEND_HOST } from '../OPTIONS';
import { CampListing } from '../components/general/CampListing';

const LocationPage = ({ location }) => {
  return (
    <>
      <Search />
      <Main>
        <LocationHeading
          pretitle="Skvelé kempy v lokalite"
          title={location?.properties.name}
        />

        <div className="camp-listing-wrapper">
          {location.campings.map((camp) => (
            <CampListing key={camp._id} camp={camp} />
          ))}
        </div>
      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${BACKEND_HOST}/api/geo/list/`);
  const data = await res.json();
  const paths = data.map(({ slug }) => {
    return {
      params: {
        location_slug: slug,
      },
    };
  });
  
  const pathsToBePrerendered = paths.slice(0, 10);

  return { paths: pathsToBePrerendered, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const location_slug = params.location_slug;
  const encodedName = encodeURI(location_slug);

  const res = await fetch(`${BACKEND_HOST}/api/geo/slug/${encodedName}`);
  const data = await res.json();
  return {
    props: {
      location: data,
    }, // will be passed to the page component as props
  };
}

export default LocationPage;
