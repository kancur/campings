import React, { useEffect } from 'react';
import Main from '../../components/base/Main';
import Link from 'next/link';
import Image from 'next/image';
import MapWithPinPoints from '../../components/general/MapWithPinPoint';
import { STATIC_HOST } from '../../OPTIONS';

const Camppage = ({ camp }) => {
  const closestVillageDistance = camp.villages[0].distance;
  const closestVillage = camp.closest_village;

  const distanceSpelledOut = (meters) => {
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
        <div className="relative h-40 w-full">
          {camp.featured_image && (
            <Image
              src={`${STATIC_HOST}/${camp.featured_image}`}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <div className="max-w-7xl w-full border-gray-100 space-y-4 p-3 sm:p-4">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl font-semibold text-blue-500">
              {camp.name}
            </h1>
            <p className="sm:text-lg">
              {closestVillage.name}, okres {closestVillage.parents.county_name}
            </p>
          </div>
          <div className="flex justify-center">
            <MapWithPinPoints coords={[camp.coords]} />
          </div>
          <p className="text-center text-lg">
            Kemp vzdialený {distanceSpelledOut(closestVillageDistance)} od obce{' '}
            <Link href={`/obec/${closestVillage.slug}`}>
              <a>{closestVillage.name}</a>
            </Link>{' '}
            v okrese {closestVillage.parents.county_name}.
          </p>
        </div>
      </Main>
    </>
  );
};

export async function getStaticPaths() {
  const { BACKEND_HOST, STATIC_HOST } = require('../../OPTIONS');
  const res = await fetch(`${process.env.BACKEND_HOST}/api/camping/list/`);
  const data = await res.json();
  const paths = data.map(({ slug }) => {
    return {
      params: {
        camp_slug: slug,
      },
    };
  });

  // only prerender first 10 paths, other will be server rendered on demand
  const pathsToBePrerendered = paths.slice(0, 3);

  return { paths: pathsToBePrerendered, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const campSlug = params.camp_slug;
  const encodedSlug = encodeURI(campSlug);

  const res = await fetch(
    `${process.env.BACKEND_HOST}/api/camping/slug/${encodedSlug}`
  );

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
  };
}

export default Camppage;
