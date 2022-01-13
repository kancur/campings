import React from 'react';
import { mountains, towns, waterBodies } from '../../../data/popularDestinations';

const merged = [...mountains, ...towns, ...waterBodies];
import SectionHeading from './SectionHeading';
import PopularDestinationCard from './PopularDestinationCard';

export default function PopularDestinations() {
  return (
    <div>
      <SectionHeading text="Obľúbené destinácie" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center sm:text-left">
        {merged.map((dest) => (
          <PopularDestinationCard key={dest.slug} destination={dest} />
        ))}
      </div>
    </div>
  );
}
