import { CampListingInterface } from '../../../../interfaces/baseInterfaces';
import { CampListing } from '../../../general/CampListing';

type CampPreviewProps = {
  camp: CampListingInterface | undefined;
  previewImage?: string;
}

export default function CampPreview({ camp, previewImage }: CampPreviewProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl">Preview</h2>
      <div className="mx- flex p-4 border-2 border-dashed  border-gray-300 rounded-lg justify-center">
        <CampListing camp={camp} previewImage={previewImage} />
      </div>
    </div>
  );
}
