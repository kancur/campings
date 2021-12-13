import { mountains, towns, waterBodies } from '../../../data/popularDestinations';
import Link from 'next/link';

export default function PopularDestinations() {
  return (
    <div className="grid sm:grid-cols-3 gap-2 text-center sm:text-left max-w-xl">
      <DestinationWrapper title="Hory" destinations={mountains} />
      <DestinationWrapper title="Obce" destinations={towns} />
      <DestinationWrapper title="Vodné plochy" destinations={waterBodies} />
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
