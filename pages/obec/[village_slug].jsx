import Search from '../../components/search/Search';
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

        <div></div>
      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const { BACKEND_HOST } = require('../../OPTIONS');
  const res = await fetch(`${BACKEND_HOST}/api/village/list/`);
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
  const {
    VILLAGE_CAMP_MAX_DISTANCE,
    VILLAGE_CAMP_MAX_RESULTS,
    BACKEND_HOST,
  } = require('../../OPTIONS');
  const village_slug = params.village_slug;
  const encodedName = encodeURI(village_slug);

  // cant do following requests in parallel because the second one needs data from the first one

  const villageRes = await fetch(
    `${process.env.BACKEND_HOST}/api/village/slug/${encodedName}`
  );
  const {campings, ...villageData} = await villageRes.json();

  return {
    props: {
      village: villageData,
      campings: campings,
    },
  };
}

export default VillagePage;
