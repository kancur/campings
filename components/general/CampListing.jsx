import Image from 'next/image';

export function CampListing({ camp }) {
  return (
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
        <p className="text-gray-500">{Math.round(camp.distance / 1000)} km</p>
      </div>
    </div>
  );
}
