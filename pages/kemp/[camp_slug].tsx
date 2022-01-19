import React from 'react';
import Main from '../../components/base/Main';
import Link from 'next/link';
import Image from 'next/image';
import MapWithPinPoints from '../../components/general/MapWithPinPoint';
import AddWantToVisit from '../../components/camp/AddWantToVisit';
import { useAuth } from '../../context/authContext';
import { CampData, CampListingInterface } from '../../interfaces/baseInterfaces';

const Camppage = ({ camp }: { camp: CampData }) => {
  const haveVillageInfo = camp?.villages && camp?.villages.length > 0;
  const closestVillage = haveVillageInfo ? camp?.closest_village : null;
  const closestVillageDistance = camp.villages ? camp.villages[0].distance : null;
  const auth = useAuth();

  const distanceSpelledOut = (meters: number | null) => {
    if (meters === null) {
      return 'N/A';
    }
    if (meters < 1000) {
      const rounded = Math.round(meters / 10) * 10;
      return `${rounded} metrov`;
    }

    const roundedToKm = Math.round(meters / 100) / 10;

    if (!Number.isInteger(roundedToKm)) {
      return `${roundedToKm} kilometra`;
    }

    if (roundedToKm > 4) {
      return `${roundedToKm} kilometrov`;
    }

    if (roundedToKm > 1) {
      return `${roundedToKm} kilometre`;
    }

    return `${roundedToKm} kilometer`;
  };

  return (
    <>
      <Main className="flex flex-col items-center">
        {camp.featured_image && (
          <div className="relative h-40 w-full">
            <Image
              priority
              src={`${process.env.NEXT_PUBLIC_STATIC_HOST}/${camp.featured_image}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}

        <div className="max-w-3xl w-full border-gray-100 space-y-4 p-3 sm:p-4">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl font-semibold text-pink-500">{camp.name}</h1>

            {haveVillageInfo && (
              <p className="sm:text-lg text-gray-500">
                <Link href={`/obec/${closestVillage?.slug}`}>
                  <a>{closestVillage?.name}</a>
                </Link>
                , okres {closestVillage?.parents?.county_name}
              </p>
            )}

            <div className="flex gap-1 items-center">
              {!auth.isLoading && <AddWantToVisit id={camp._id} />}
            </div>
          </div>

          <div className="flex justify-center mx-auto max-w-xs">
            {camp.coords && <MapWithPinPoints coords={[camp.coords]} />}
          </div>

          {haveVillageInfo && (
            <p className="sm:text-lg">
              Kemp vzdialený {distanceSpelledOut(closestVillageDistance)} od obce{' '}
              <Link href={`/obec/${closestVillage?.slug}`}>
                <a>{closestVillage?.name}</a>
              </Link>{' '}
              v okrese {closestVillage?.parents?.county_name}.
            </p>
          )}
        </div>
      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND_HOST}/api/camping/list/`);
  const data = await res.json();
  const paths = data.map(({ slug }: { slug: string }) => {
    return {
      params: {
        camp_slug: slug,
      },
    };
  });

  // only prerender first x paths, other will be server rendered on demand
  const pathsToBePrerendered = paths.slice(0, 3);

  return { paths: pathsToBePrerendered, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { camp_slug: string } }) {
  const campSlug = params.camp_slug;
  const encodedSlug = encodeURI(campSlug);

  const res = await fetch(`${process.env.BACKEND_HOST}/api/camping/slug/${encodedSlug}`);

  if (res.status !== 200) {
    return {
      notFound: true,
    };
  }

  const campData = await res.json();

  if (!campData) {
    return {
      notFound: true,
    };
  }

  const { ...campInfo } = campData;

  return {
    props: {
      //villages: villages,
      camp: campInfo,
    },
    revalidate: 60 * 60 * 12, // in seconds
  };
}

export default Camppage;
