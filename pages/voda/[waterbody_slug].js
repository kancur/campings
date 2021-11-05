import Search from '../../components/search/SearchWrapper';
import LocationHeading from '../../components/locationPage/LocationHeading';
import { CampListing } from '../../components/general/CampListing';
import Main from '../../components/base/Main';

const WaterbodyPage = ({ waterbody }) => {
  return (
    <>
      <Search />
      <Main>
        <LocationHeading
          pretitle="Skvelé kempy neďaleko vodnej plochy"
          title={waterbody.name}
        />

        <div className="camp-listing-wrapper">
          {waterbody.campings.map((camp) => (
            <CampListing key={camp._id} camp={camp} />
          ))}
        </div>

      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const { BACKEND_HOST } = require('../../OPTIONS');
  const res = await fetch(`${BACKEND_HOST}/api/waterbody/list/`);
  const data = await res.json();
  const parametersArray = data.map(({ slug }) => {
    return {
      params: {
        waterbody_slug: slug,
      },
    };
  });
  return { paths: parametersArray, fallback: false };
}

export async function getStaticProps({ params }) {
  const encodedSlug = encodeURI(params.waterbody_slug);

  const response = await fetch(
    `${process.env.BACKEND_HOST}/api/waterbody/slug/${encodedSlug}`
  );
  const data = await response.json();
  return {
    props: {
      waterbody: data
    },
  };
}

export default WaterbodyPage;
