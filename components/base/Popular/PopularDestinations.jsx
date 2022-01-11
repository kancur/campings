import {
  mountains,
  towns,
  waterBodies,
} from '../../../data/popularDestinations';

const merged = [...mountains, ...towns, ...waterBodies];
import Link from 'next/link';
import SectionHeading from './SectionHeading';
import Image from 'next/image';
import PopularDestinationCard from './PopularDestinationCard';

export default function PopularDestinations() {
  return (
    <div className=''>
      <SectionHeading text="Obľúbené destinácie" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center sm:text-left">
        {merged.map((dest) => (
          <PopularDestinationCard key={dest.slug} destination={dest} />
        ))}
      </div>
    </div>
  );
}

function DestinationWrapper({ title, destinations }) {
  return (
    <div className="space-y-1">
      <h3 className="text-2xl font-semibold text-emerald-600">{title}</h3>
      <DestinationList destinations={destinations} />
    </div>
  );
}

function DestinationList({ destinations }) {
  return (
    <ul>
      {destinations.map((dest) => (
        <li key={dest.slug}>
          <Link href={dest.slug}>{dest.name}</Link>
        </li>
      ))}
    </ul>
  );
}
