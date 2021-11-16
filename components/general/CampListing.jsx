import Image from 'next/image';
import { FRONTEND_API_ROUTE } from '../../OPTIONS';

export function CampListing({ camp, previewImage }) {
  const featured = `${FRONTEND_API_ROUTE}/${camp.featured_image}`;

  const parentVillage = camp.villages ? camp.villages[0] : null;
  const distance = camp.distance
    ? `${Math.round(camp.distance / 1000)} km`
    : '';

  return (
    <div className="shadow-md border border-gray-100 p-3 bg-white grid gap-4 grid-cols-3 rounded-md max-w-screen-md flex-1">
      <div className="col-span-1 relative">
        <div className="w-48 h-48">
          <Image
            layout="fill"
            objectFit="cover"
            src={
              previewImage
                ? previewImage
                : camp.featured_image
                ? featured
                : '/camp_placeholder.png'
            }
          />
        </div>
      </div>
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold">{camp?.name}</h2>
        <div className="flex">
          <p className="text-gray-400 text-s mb-2">
            {parentVillage && `${parentVillage?.name}`}
            {parentVillage?.parents?.county_name
              ? `, Okres ${parentVillage.parents.county_name}`
              : ''}
          </p>
        </div>
        <p className="text-gray-500">{distance}</p>
        <p className="">{camp?.shortDescription}</p>
      </div>
    </div>
  );
}
