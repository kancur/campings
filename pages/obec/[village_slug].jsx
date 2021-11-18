import Search from '../../components/search/SearchWrapper';
import LocationHeading from '../../components/locationPage/LocationHeading';
import { CampListing } from '../../components/general/CampListing';
import Main from '../../components/base/Main';

const VillagePage = ({ village, campings }) => {
  return (
    <>
      <Search />
      <Main>
        <LocationHeading
          pretitle="Skvelé kempy neďaleko obce"
          title={village.name}
          subtitle={'Okres ' + village.parents.county_name}
        />

        <div className="camp-listing-wrapper">
          {campings.map((camp) => (
            <CampListing key={camp._id} camp={camp} />
          ))}
        </div>

      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const { BACKEND_HOST } = require('../../OPTIONS');
  const res = await fetch(`${process.env.BACKEND_HOST}/api/village/list/`);
  const data = await res.json();
  const paths = data.map(({ slug }) => {
    return {
      params: {
        village_slug: slug,
      },
    };
  });

  // only prerender first 10 paths, other will be server rendered on demand
  const pathsToBePrerendered = paths.slice(0, 3);

  return { paths: pathsToBePrerendered, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const village_slug = params.village_slug;
  const encodedName = encodeURI(village_slug);

  const villageResponse = await fetch(
    `${process.env.BACKEND_HOST}/api/village/slug/${encodedName}`
  );
  
  const villageJson = await villageResponse.json();

  if (!villageJson) {
    return {
      notFound: true,
    };
  }

  const { campings, ...villageData } = villageJson;


  return {
    props: {
      village: villageData,
      campings: campings,
    },
  };
}

export default VillagePage;
