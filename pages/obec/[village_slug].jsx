import Image from 'next/image';
import Main from '../../components/Main';
import Search from '../../components/search/Search';
import LocationHeading from '../../components/locationPage/LocationHeading';

const VillagePage = ({ village, campings }) => {
  return (
    <>
      <Search />
      <Main>
        <LocationHeading
          pretitle="Skvelé kempy neďaleko obce"
          title={village.name}
          subtitle={village.parents.county_name}
        />

        <div className="p-4 flex flex-col gap-4 max-w-screen-md mx-auto">
          {campings.map((camp) => (
            <div className="shadow-lg border border-opacity-40 p-5 bg-white flex gap-4">
              <Image src="/camp_placeholder.png" height={200} width={200} />
              <div>
                <h2 className="text-2xl font-semibold">{camp.name}</h2>
                <div className="flex">
                  <p className="text-gray-400">
                    {camp.villages[0].name}, {'okres '}
                    {camp.villages[0].parents.county_name}
                  </p>
                </div>
                <p className="text-gray-500">
                  {Math.round(camp.distance / 1000)} km
                </p>
              </div>
            </div>
          ))}
        </div>

        <div></div>
      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const {
    DB_HOST,
  } = require('../../OPTIONS');
  const res = await fetch(`${DB_HOST}/api/village/list/`);
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
    DB_HOST,
  } = require('../../OPTIONS');
  const village_slug = params.village_slug;
  const encodedName = encodeURI(village_slug);

  // cant do following requests in parallel because the second one needs data from the first one

  const villageRes = await fetch(
    `${process.env.DB_HOST}/api/village/slug/${encodedName}`
  );
  const villageData = await villageRes.json();

  const closeCampingsURL = new URL(`${process.env.DB_HOST}/api/camping/close`);
  closeCampingsURL.searchParams.append('lat', villageData.coords[1]);
  closeCampingsURL.searchParams.append('lon', villageData.coords[0]);
  closeCampingsURL.searchParams.append('limit', VILLAGE_CAMP_MAX_RESULTS);
  closeCampingsURL.searchParams.append('distance', VILLAGE_CAMP_MAX_DISTANCE);
  const campingsRes = await fetch(closeCampingsURL.toString());
  const campingsData = await campingsRes.json();

  return {
    props: {
      village: villageData,
      campings: campingsData,
    },
  };
}

export default VillagePage;
