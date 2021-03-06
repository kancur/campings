import Main from '../components/base/Main';
import Search from '../components/search/SearchWrapper';
import LocationHeading from '../components/locationPage/LocationHeading';
import { CampListing } from '../components/general/CampListing';
import { Camp } from '../interfaces/baseInterfaces';

type LocationType = {
  location: {
    properties: {
      name: string;
    };
    campings: Camp[];
  };
};

const LocationPage = ({ location }: LocationType) => {
  return (
    <>
      <Search />
      <Main>
        <LocationHeading pretitle="Skvelé kempy v lokalite" title={location?.properties.name} />

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
  const res = await fetch(`${process.env.BACKEND_HOST}/api/geo/list/`);
  const data = await res.json();
  const paths = data.map(({ slug }: { slug: string }) => {
    return {
      params: {
        location_slug: slug,
      },
    };
  });

  const pathsToBePrerendered = paths.slice(0, 3);

  return { paths: pathsToBePrerendered, fallback: 'blocking' };
}

export async function getStaticProps({ params }: {params: {location_slug: string}}) {
  const location_slug = params.location_slug;
  const encodedName = encodeURI(location_slug);

  const res = await fetch(`${process.env.BACKEND_HOST}/api/geo/slug/${encodedName}`);
  const data = await res.json();
  return {
    props: {
      location: data,
    }, // will be passed to the page component as props
  };
}

export default LocationPage;
