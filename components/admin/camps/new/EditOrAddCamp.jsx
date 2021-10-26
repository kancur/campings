import classNames from 'classnames';
import { useEffect, useState } from 'react';
import ButtonAdmin from '../../general/ButtonAdmin';
import CampPreview from './CampPreview';
import ImageDropzone from './ImageDropzone';
import { Input } from './Input';
import { InputCoords } from './parts/InputCoords';
import toSlug from '../../../../helpers/toSlug';

export const inputClasses = classNames(
  'rounded-lg',
  'flex-1',
  'appearance-none',
  'border',
  'border-gray-200',
  'w-full',
  'py-2',
  'my-1',
  'px-4',
  'bg-white',
  'text-gray-700',
  'placeholder-gray-300',
  'shadow',
  'text-base',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-blue-400',
  'focus:border-transparent'
);

export default function EditOrAddCamp({ campDataFetched }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [campData, setCampData] = useState({});
  const [uploadedFile, setUploadedFile] = useState('');

  useEffect(() => {
    mergeCampData({ featuredImage: uploadedFile.preview });
  }, [uploadedFile]);

  const mergeCampData = (data) => {
    setCampData((prevData) => ({ ...prevData, ...data }));
  };

  useEffect(() => {
    if (campDataFetched) {
      setCampData(campDataFetched);
      setIsEditMode(true);
    }
  }, [campDataFetched]);

  const handleSlugInput = (e) => {
    mergeCampData({ slug: e.target.value.replace(/\s/g, '') });
  };

  const handleNameInput = (e) => {
    mergeCampData({ name: e.target.value });
    if (!campDataFetched?.slug) {
      mergeCampData({ slug: toSlug(e.target.value) });
    }
  };

  const mergeCoords = (coords) => {
    mergeCampData({ coords });
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      {isEditMode ? (
        <h1 className="font-semibold text-2xl">
          Editing camp ID:{' '}
          <span className="font-mono font-normal text-pink-700">
            {campDataFetched._id}
          </span>
        </h1>
      ) : (
        <h1 className="font-semibold text-2xl">Adding new camp</h1>
      )}

      <div className="admin-main-wrapper">
        <form autoComplete="off" className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Camp name
              <span className="text-red-500 required-dot">*</span>
              <Input
                onInput={handleNameInput}
                type="text"
                id="name"
                name="name"
                minLength={3}
                maxLength={60}
                className={inputClasses}
                placeholder="The name of the camp"
                value={campData?.name || ''}
                valid={(campData?.name?.length > 3)}
              />
            </label>

            <label className="text-gray-700">
              Slug
              <span className="text-red-500 required-dot">*</span>
              {campDataFetched?.slug && <span className="px-2 text-red-400 text-sm">Editing is disabled - slug is already set</span>}
              <Input
                onInput={handleSlugInput}
                type="text"
                id="slug"
                name="slug"
                maxLength={90}
                className={inputClasses}
                placeholder="atc-horna-marikova"
                value={campData?.slug || ''}
              />
            </label>

            <label className="text-gray-700">
              Lat, lon
              <span className="text-red-500 required-dot">*</span>
              <InputCoords
                mergeCoords={mergeCoords}
                fetchedCoords={campDataFetched?.coords}
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Short description
              <Input
                onInput={(e) =>
                  mergeCampData({ shortDescription: e.target.value })
                }
                type="text"
                id="shortDescription"
                name="shortDescription"
                className={inputClasses}
                placeholder="Nádherný kemp na úpätí Malej Fatry"
                value={campData.shortDescription || ''}
              />
            </label>

            <label className="text-gray-700">
              Description
              <textarea
                onInput={(e) => mergeCampData({ description: e.target.value })}
                rows={1}
                type="text"
                id="description"
                name="description"
                className={inputClasses}
                placeholder="Description"
                value={campData.description || ''}
              />
            </label>
            <p>Featured image</p>
            <ImageDropzone
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
            />
          </div>
        </form>
      </div>
      <ButtonAdmin className="w-32 h-10 ml-auto bg-green-500 justify-self-end">
        Save camp
      </ButtonAdmin>
      <CampPreview camp={campData} />
    </div>
  );
}
