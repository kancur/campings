import Image from 'next/image';
import { DB_HOST } from '../../OPTIONS';

export function CampListing({ camp, previewImage }) {
  console.log('preview image:', camp.featured_image)

  const featured = `${DB_HOST}/${camp.featured_image}`

  const parentVillage = camp.villages ? camp.villages[0] : null;
  const distance = camp.distance
    ? `${Math.round(camp.distance / 1000)} km`
    : '';

  return (
    <div className="shadow-md border border-gray-100 p-3 bg-white flex gap-4 rounded-md max-w-screen-md flex-1">
      
      <Image
        className="object-cover"
        src={previewImage ? previewImage : camp.featured_image ? featured : '/camp_placeholder.png'}
        height={200}
        width={200}
      />

      <div>
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
