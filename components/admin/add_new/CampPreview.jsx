import { CampListing } from '../../general/CampListing';

export default function CampPreview({camp}) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl">Preview</h2>
      <div className="mx- flex p-4 border-2 border-dashed  border-gray-300 rounded-lg justify-center">
        <CampListing camp={camp} />
      </div>
    </div>
  );
}
