import Image from 'next/image';

export function CampListing({ camp }) {
  const parentVillage = camp.villages ? camp.villages[0] : null;
  const distance = camp.distance ? `${Math.round(camp.distance / 1000)} km` : '';

  return (
    <div className="shadow-md border border-gray-100 p-5 bg-white flex gap-4 rounded-md max-w-screen-md flex-1">
      <Image src="/camp_placeholder.png" height={200} width={200} />
      <div>
        <h2 className="text-2xl font-semibold">{camp?.name}</h2>
        <div className="flex">
          <p className="text-gray-400">
            {parentVillage
              ? `${parentVillage?.name}, okres
            ${parentVillage?.parents.county_name}`
              : ''}
          </p>
        </div>
        <p className="text-gray-500">{distance}</p>
        <p>{camp.shortDescription}</p>
      </div>
    </div>
  );
}
