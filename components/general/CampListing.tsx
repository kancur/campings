import Image from 'next/image';
import Link from 'next/link';
import {
  CampData,
  CampDataEdit,
  CampListingInterface,
  Village,
} from '../../interfaces/baseInterfaces';

export function CampListing({ camp, previewImage }: { camp: CampData; previewImage?: string }) {
  const featured = `${process.env.NEXT_PUBLIC_STATIC_HOST}/${camp?.featured_image}`;

  const parentVillage: Village | null = camp?.villages ? camp?.villages[0] : null;
  const distance = camp?.distance ? `${Math.round(camp?.distance / 1000)} km` : null;

  return (
    <Link href={`/kemp/${camp?.slug}`}>
      <a>
        <div className="overflow-hidden hover:shadow-lg hover:scale-101 duration-75 transition-all shadow-md bg-white grid grid-cols-1 sm:grid-cols-3 rounded-lg max-w-screen-md flex-1">
          <div className="col-span-1 relative">
            <div className="w-48 h-48 rounded-md">
              <Image
                layout="fill"
                objectFit="cover"
                src={
                  previewImage
                    ? previewImage
                    : camp?.featured_image
                    ? featured
                    : '/camp_placeholder.png'
                }
              />
            </div>
          </div>
          <div className="col-span-2 p-4">
            <h2 className="text-2xl font-semibold">{camp?.name}</h2>
            <div className="flex">
              <p className="text-gray-400 text-s mb-2">
                {parentVillage && `${parentVillage?.name}`}
                {parentVillage?.parents?.county_name
                  ? `, Okres ${parentVillage.parents.county_name}`
                  : ''}
              </p>
            </div>
            {distance && <p className="text-gray-500">{distance}</p>}
            <p className="">{camp?.shortDescription}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
