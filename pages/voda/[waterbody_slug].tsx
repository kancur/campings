import Search from '../../components/search/SearchWrapper';
import LocationHeading from '../../components/locationPage/LocationHeading';
import { CampListing } from '../../components/general/CampListing';
import Main from '../../components/base/Main';
import { GetStaticPaths, GetStaticProps } from 'next';

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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.BACKEND_HOST}/api/waterbody/list/`);
  const data = await res.json();
  const paths = data.map(({ slug }) => {
    return {
      params: {
        waterbody_slug: slug,
      },
    };
  });

  const pathsToBePrerendered = paths.slice(0, 3);

  return { paths: pathsToBePrerendered, fallback: 'blocking' };
};

type ContextParams = {
  waterbody_slug: string;
}

type Props = {
  waterbody: object;
}

export const getStaticProps: GetStaticProps<Props, ContextParams> = async (context) => {
  const slug = context.params.waterbody_slug;
  const encodedSlug = encodeURI(slug);

  try {
    const response = await fetch(
      `${process.env.BACKEND_HOST}/api/waterbody/slug/${encodedSlug}`
    );
    const data = await response.json();

    return {
      props: {
        waterbody: data,
      },
      revalidate: 60 * 60 * 12, // in seconds
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default WaterbodyPage;
